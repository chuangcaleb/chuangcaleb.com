import { defineCollection, z } from "astro:content";
const highlightCollection = defineCollection({
  type: "content",
  schema: z.object({
    date: z.date(),
    sequence: z.number(),
  }),
});

export const collections = {
  highlight: highlightCollection,
};