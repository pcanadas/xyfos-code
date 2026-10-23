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
    project: z.string().optional(),
    /** For projects with several editions (Cuadra: Escritorio / Android). Must match an edition name. */
    platform: z.string().optional(),
  }),
});

const roadmap = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    status: z.enum(["planned", "in-progress", "done"]).default("planned"),
    project: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url(),
    status: z.enum(["private", "public", "alpha", "beta", "live"]).default("alpha"),
    order: z.number().default(99),
    problem: z.string().optional(),
    platform: z.string().optional(),
    stack: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    /** Separate editions of the same product, each with its own release line. */
    editions: z
      .array(
        z.object({
          name: z.string(),
          platform: z.string(),
          availability: z.string(),
          tone: z.enum(["live", "testing"]).default("live"),
          summary: z.string(),
          link: z.object({ href: z.string(), label: z.string() }).optional(),
        })
      )
      .default([]),
  }),
});

export const collections = { blog, changelog, roadmap, projects };