import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const changelog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    version: z.string(),
  }),
});

const roadmap = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    status: z.enum(["planned", "in-progress", "done"]).default("planned"),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url(),
    status: z.enum(["private", "public", "alpha", "beta", "live"]).default("alpha"),
  }),
});

export const collections = { blog, changelog, roadmap, projects };