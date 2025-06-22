import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import dotenv from 'dotenv';
import {slug as githubSlug} from 'github-slugger';
import type {Html, Root, Text} from 'mdast';
import type {Plugin} from 'unified';
import type {Parent} from 'unist';
import {visit} from 'unist-util-visit';
import {gnr} from '../../src/utils/note-route.js';

dotenv.config();

const {IMAGE_BASE_URL} = process.env;
if (!IMAGE_BASE_URL) throw new Error('Missing IMAGE_BASE_URL env secret');

const NOTES_DIR = path.resolve('src/content/obsidian-note');

// Collect all markdown files recursively
function collectMarkdownFiles(directory: string): string[] {
	const entries = fs.readdirSync(directory, {withFileTypes: true});

	return entries.flatMap((entry) => {
		const fullPath = path.join(directory, entry.name);
		if (entry.isDirectory()) return collectMarkdownFiles(fullPath);
		if (entry.isFile() && fullPath.endsWith('.md')) return fullPath;

		return [];
	});
}

function extractSlug(fileContent: string): string | undefined {
	// Match frontmatter block (first `---` to next `---`)
	const match = /^---\n([\s\S]*?)\n---/.exec(fileContent);
	if (!match) return undefined;

	// Match a line like `slug: something`
	const slugLine = /^\s*slug\s*:\s*(.+)$/m.exec(match[1]);
	if (!slugLine) return undefined;

	// Remove quotes if present
	return slugLine[1].trim().replaceAll(/^["']|["']$/g, '');
}

// Build a map of filename (stem) → slug
function buildNoteSlugMap(): Record<string, string> {
	const filePaths = collectMarkdownFiles(NOTES_DIR);
	const map: Record<string, string> = {};

	for (const filePath of filePaths) {
		const stem = path.basename(filePath, '.md');
		const fileContent = fs.readFileSync(filePath, 'utf8');
		const slug = extractSlug(fileContent);
		if (!slug) {
			throw new Error(`Missing 'slug' in frontmatter of file: ${filePath}`);
		}

		map[stem.toLowerCase()] = slug;
	}

	return map;
}

const noteSlugMap = buildNoteSlugMap();

const remarkWikilinks: Plugin<void[], Root> = () => {
	return (tree) => {
		// Handle standalone image paragraphs (![[image.png]])
		visit(tree, 'paragraph', (node, index, parent) => {
			if (!parent || typeof index !== 'number') return;

			if (node.children.length === 1 && node.children[0].type === 'text') {
				const text = node.children[0].value.trim();
				const match = /^!\[\[([^\]|]+)(?:\|([^\]]+))?]]$/.exec(text);
				if (match) {
					const [_, filename, altText] = match;
					const imageHtml: Html = {
						type: 'html',
						value: `<Image src="${IMAGE_BASE_URL}/${filename}" alt="${altText ?? filename}" class="border" loading="lazy" decoding="async" />`,
					};
					(parent as Parent).children.splice(index, 1, imageHtml);
				}
			}
		});

		// Handle inline wikilinks in text nodes
		visit(tree, 'text', (node, index, parent) => {
			if (!parent || typeof index !== 'number') return;

			const text = node.value;
			const newNodes: Array<Text | Html> = [];
			let lastIndex = 0;

			const wikilinkRegex = /(!?)\[\[([\s\S]+?)]]/g;
			let match;

			while ((match = wikilinkRegex.exec(text)) !== null) {
				const [fullMatch, isImage, body] = match;
				const pipeIndex = body.indexOf('|');
				const rawTarget = pipeIndex === -1 ? body : body.slice(0, pipeIndex);
				const alias = pipeIndex === -1 ? null : body.slice(pipeIndex + 1);

				if (match.index > lastIndex) {
					newNodes.push({
						type: 'text',
						value: text.slice(lastIndex, match.index),
					});
				}

				if (isImage === '!') {
					// Inline image (not standalone paragraph)
					newNodes.push({
						type: 'html',
						value: `<Image src="${IMAGE_BASE_URL}/${rawTarget}" alt="${alias ?? rawTarget}" class="border" loading="lazy" decoding="async" />`,
					});
				} else if (rawTarget.startsWith('#')) {
					// Heading link
					const heading = rawTarget.slice(1).trim();
					const slug = githubSlug(heading);
					newNodes.push({
						type: 'html',
						value: `<a href="#${slug}">${alias ?? heading}</a>`,
					});
				} else {
					// Note link
					const normalizedTarget = rawTarget.trim().toLowerCase();
					const matchedSlug = noteSlugMap[normalizedTarget];

					if (matchedSlug) {
						newNodes.push({
							type: 'html',
							value: `<a href="${gnr(matchedSlug)}">${alias ?? rawTarget}</a>`,
						});
					} else {
						// fallback: keep as plain text
						newNodes.push({type: 'text', value: fullMatch});
					}
				}

				lastIndex = match.index + fullMatch.length;
			}

			if (lastIndex < text.length) {
				newNodes.push({type: 'text', value: text.slice(lastIndex)});
			}

			(parent as Parent).children.splice(index, 1, ...newNodes);
		});
	};
};

export default remarkWikilinks;
