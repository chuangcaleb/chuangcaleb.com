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
  }),
});

export const collections = {
  highlight: highlightCollection,
  project: projectCollection,
};
