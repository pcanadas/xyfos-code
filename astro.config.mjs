import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.xyfos.com",
  integrations: [
    tailwind(),
    sitemap({
      // /cuadra/* son URLs antiguas con canonical a /zenit/*: no van al sitemap
      filter: (page) => !page.startsWith("https://www.xyfos.com/cuadra/"),
    }),
  ],
  // Cuadra pasó a llamarse Zenit
  redirects: { "/projects/cuadra": "/projects/zenit" },
});