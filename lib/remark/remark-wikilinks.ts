/* eslint-disable regexp/prefer-named-capture-group, regexp/no-super-linear-move, regexp/no-super-linear-backtracking, require-unicode-regexp, unicorn/no-confusing-array-splice -- Pre-existing regex patterns in this legacy remark plugin. Rewriting would risk breaking note parsing. */
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

const IMAGE_BASE_URL = (() => {
	dotenv.config();
	const url = process.env.IMAGE_BASE_URL;
	if (url === undefined || url === null) {
		throw new Error('Missing IMAGE_BASE_URL env secret');
	}

	return url;
})();

const NOTES_DIR = path.resolve('src/content/obsidian-note');

// Collect all markdown files recursively
function collectMarkdownFiles(directory: string): string[] {
	const entries = fs.readdirSync(directory, {withFileTypes: true});

	return entries.flatMap(entry => {
		const fullPath = path.join(directory, entry.name);
		if (entry.isDirectory()) {
			return collectMarkdownFiles(fullPath);
		}

		if (entry.isFile() && fullPath.endsWith('.md')) {
			return fullPath;
		}

		return [];
	});
}

function extractSlug(fileContent: string): string | undefined {
	// Match frontmatter block (first `---` to next `---`)
	const match = /^---\n([\s\S]*?)\n---/.exec(fileContent);
	if (match === undefined || match === null) {
		return undefined;
	}

	// Match a line like `slug: something`
	const slugLine = /^\s*slug\s*:\s*(.+)$/m.exec(match[1]);
	if (slugLine === undefined || slugLine === null) {
		return undefined;
	}

	// Remove quotes if present
	return slugLine[1].trim().replaceAll(/^["']|["']$/g, '');
}

// Build a map of filename (stem) → slug
function buildNoteSlugMap(): Map<string, string> {
	const filePaths = collectMarkdownFiles(NOTES_DIR);
	const map = new Map<string, string>();

	for (const filePath of filePaths) {
		const stem = path.basename(filePath, '.md');
		const fileContent = fs.readFileSync(filePath, 'utf8');
		const slug = extractSlug(fileContent);
		if (slug === undefined || slug === null) {
			throw new Error(`Missing 'slug' in frontmatter of file: ${filePath}`);
		}

		map.set(stem.toLowerCase(), slug);
	}

	return map;
}

const noteSlugMap = buildNoteSlugMap();

const remarkWikilinks: Plugin<void[], Root> = () => tree => {
	// Handle standalone image paragraphs (![[image.png]])
	visit(tree, 'paragraph', (node, index, parent) => {
		if (parent === undefined || parent === null || typeof index !== 'number') {
			return;
		}

		/* eslint-disable-next-line unicorn/better-dom-traversing -- mdast nodes, not DOM */
		if (node.children.length === 1 && node.children[0].type === 'text') {
			/* eslint-disable-next-line unicorn/better-dom-traversing -- mdast nodes, not DOM */
			const text = node.children[0].value.trim();
			const match = /^!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]$/.exec(text);
			if (match) {
				const [, filename, altText] = match;
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
		if (parent === undefined || parent === null || typeof index !== 'number') {
			return;
		}

		const text = node.value;
		const newNodes: Array<Text | Html> = [];
		let lastIndex = 0;

		const wikilinkRegex = /(!?)\[\[([\s\S]+?)\]\]/g;
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
			} else {
				// Note link
				const normalizedTarget = rawTarget.trim().toLowerCase();

				// extract text before `#`
				const segments = (() => {
					// basic note link
					if (!normalizedTarget.includes('#')) {
						return {title: normalizedTarget, hash: undefined};
					}

					// local hash link
					if (normalizedTarget.startsWith('#')) {
						return {title: undefined, hash: normalizedTarget.slice(1)};
					}

					// note link with hash
					const titleRegex = /^(.*)#(.*)/;
					const titleMatch = titleRegex.exec(normalizedTarget);
					if (titleMatch === undefined || titleMatch === null) {
						return undefined;
					}

					return {title: titleMatch[1], hash: titleMatch[2]};
				})();

				if (segments === undefined || segments === null) {
					return;
				}

				const finalSlug = (() => {
					// local hash
					if (segments.title === undefined) {
						return `#${githubSlug(segments.hash)}`;
					}

					const matchedNoteSlug = noteSlugMap.get(segments.title);

					// handle note note found?
					if (matchedNoteSlug === undefined || matchedNoteSlug === null) {
						return;
					}

					// single note link
					if (segments.hash === undefined) {
						return gnr(matchedNoteSlug);
					}

					// note link with hash
					return `${gnr(matchedNoteSlug)}#${githubSlug(segments.hash)}`;
				})();

				if (finalSlug !== undefined && finalSlug !== null) {
					newNodes.push({
						type: 'html',
						value: `<a href="${finalSlug}">${alias ?? rawTarget}</a>`,
					});
				} else {
					// fallback: keep as plain text
					newNodes.push({
						type: 'html',
						value: `<span class="note-not-found underline">${fullMatch}<span class="visually-hidden"> (broken link, note not found)</span></span>`,
					});
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

export default remarkWikilinks;
