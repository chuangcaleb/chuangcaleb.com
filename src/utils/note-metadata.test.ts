import {describe, expect, it} from 'vitest';
import {NOTE_TAG_BUILDERS, noteToTags} from './note-metadata.ts';
import type {NoteMetadata} from 'lib/utils/types';

// Build a NoteMetadata-shaped object for the fields the tag builders read.
function meta(partial: Partial<NoteMetadata>): NoteMetadata {
	return partial as NoteMetadata;
}

describe('NOTE_TAG_BUILDERS.words', () => {
	it('returns undefined for zero words', () => {
		expect(NOTE_TAG_BUILDERS.words(meta({words: 0}))).toBeUndefined();
	});

	it('labels short notes ATOM', () => {
		expect(NOTE_TAG_BUILDERS.words(meta({words: 150}))?.label).toBe('ATOM');
	});

	it('labels mid-length notes PAGE', () => {
		expect(NOTE_TAG_BUILDERS.words(meta({words: 300}))?.label).toBe('PAGE');
	});

	it('labels long notes with a kW count', () => {
		expect(NOTE_TAG_BUILDERS.words(meta({words: 1500}))?.label).toBe('1.5kW');
	});
});

describe('NOTE_TAG_BUILDERS.status', () => {
	it('uppercases the status and maps an icon', () => {
		const tag = NOTE_TAG_BUILDERS.status(meta({status: 'wip'}));
		expect(tag?.label).toBe('WIP');
		expect(tag?.icon).toBe('lucide:construction');
	});

	it('returns undefined without a status', () => {
		expect(NOTE_TAG_BUILDERS.status(meta({}))).toBeUndefined();
	});
});

describe('noteToTags', () => {
	it('emits keyed tags for populated fields only', () => {
		const tags = noteToTags(meta({words: 300, status: 'wip'}));
		const keys = tags.map(t => t.key);
		expect(keys).toContain('words');
		expect(keys).toContain('status');
		expect(keys).not.toContain('fyi');
	});

	it('honours the omit list', () => {
		const tags = noteToTags(meta({words: 300, status: 'wip'}), ['status']);
		expect(tags.map(t => t.key)).not.toContain('status');
		expect(tags.map(t => t.key)).toContain('words');
	});
});
