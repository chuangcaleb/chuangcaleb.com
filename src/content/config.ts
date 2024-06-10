import { defineCollection, reference, z } from "astro:content";

const highlightCollection = defineCollection({
  type: "content",
  schema: z.object({
    date: z.date(),
    sequence: z.number(),
  }),
});

const projectCollection = defineCollection({
  type: "content",
  schema: z.object({
    sequence: z.number(),
    hidden: z.boolean().optional(),
    title: z.string(),
    kind: z.string(),
    links: z
      .array(
        z.object({
          icon: z.string(),
          href: z.string(),
          label: z.string(),
        }),
      )
      .optional(),
  }),
});

const obsidianCollectionsCollection = defineCollection({
  type: "data",
  schema: z.array(reference("obsidian-note")),
});

const obsidianNoteCollection = defineCollection({
  type: "content",
  schema: z
    .object({
      title: z.string(),
      tags: z.array(z.string()).nullable(),
      collection: z.union([
        reference("obsidian-note"), //FIXME: should be obsidian-collections
        z.array(reference("obsidian-note")),
      ]),
      prev: z.string(),
      next: z.string(),
      date: z.string(),
      created: z.string(),
      modified: z.string(),
      published: z.string(),
    })
    .partial(),
});
// tags: z.array(z.string()).optional(),

export const collections = {
  highlight: highlightCollection,
  project: projectCollection,
  "obsidian-note": obsidianNoteCollection,
  "obsidian-collection": obsidianCollectionsCollection,
};
