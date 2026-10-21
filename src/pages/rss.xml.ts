import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: { site: URL }) {
  const posts = (await getCollection("blog"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: "Xyfos Code — Blog",
    description: "Notas sobre desarrollo de software, datos y los proyectos de Xyfos Code.",
    customData: "<language>es-es</language>",
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description ?? "",
      link: `/blog/${p.slug}/`,
    })),
  });
}