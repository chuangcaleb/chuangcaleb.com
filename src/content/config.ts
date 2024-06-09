import { defineCollection, z } from "astro:content";

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

const obsidianNoteCollection = defineCollection({
  type: "content",
  schema: z
    .object({
      title: z.string(),
      tags: z.array(z.string()).nullable(),
      collectionItems: z.array(z.string()),
      prev: z.string(),
      next: z.string(),
      date: z.string(),
      collection: z.union([z.string(), z.array(z.string())]),
    })
    .partial(),
});
// tags: z.array(z.string()).optional(),

export const collections = {
  highlight: highlightCollection,
  project: projectCollection,
  "obsidian-note": obsidianNoteCollection,
};
