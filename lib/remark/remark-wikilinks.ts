import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import type {HTML, Root, Text} from 'mdast';
import dotenv from 'dotenv';
import type {Plugin} from 'unified';
import type {Parent} from 'unist';
import {visit} from 'unist-util-visit';
import {slug as githubSlug} from 'github-slugger';
import {gnr} from '../../src/utils/note-route.js';

dotenv.config();
const {IMAGE_BASE_URL} = process.env;
if (!IMAGE_BASE_URL) throw new Error('Missing IMAGE_BASE_URL env secret');
const NOTES_DIR = path.resolve('src/content/obsidian-note');

// Recursively collect .md files in directory
function collectMarkdownFiles(directory: string): string[] {
	const entries = fs.readdirSync(directory, {withFileTypes: true});

	return entries.flatMap((entry) => {
		const fullPath = path.join(directory, entry.name);
		if (entry.isDirectory()) {
			return collectMarkdownFiles(fullPath);
		}

		if (entry.isFile() && fullPath.endsWith('.md')) {
			return [fullPath];
		}

		return [];
	});
}

// Recursively collect all .md files and return a lookup map
function buildNoteSlugMap(): Record<string, string> {
	const files = collectMarkdownFiles(NOTES_DIR);
	const map: Record<string, string> = {};

	for (const file of files) {
		const stem = path.basename(file, '.md');
		const relativePath = path.relative(NOTES_DIR, file);
		const slug = githubSlug(relativePath.replace(/\.md$/, ''));
		map[stem.toLowerCase()] = slug;
	}

	return map;
}

const noteSlugMap = buildNoteSlugMap();

const remarkWikilinks: Plugin<void[], Root> = () => {
	return (tree) => {
		visit(tree, 'text', (node, index, parent) => {
			if (!parent || typeof index !== 'number') return;

			const text = node.value;
			const newNodes: Array<Text | HTML> = [];
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
					// Image wikilink
					newNodes.push({
						type: 'html',
						value: `<Image src="${IMAGE_BASE_URL}/${rawTarget}" alt="${alias ?? rawTarget}" loading="lazy" decoding="async" />`,
					});
				} else if (rawTarget.startsWith('#')) {
					// Section heading link
					const heading = rawTarget.slice(1).trim();
					const slug = githubSlug(heading);

					newNodes.push({
						type: 'html',
						value: `<a href="#${slug}">${alias ?? heading}</a>`,
					});
				} else {
					// Normal note link
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
