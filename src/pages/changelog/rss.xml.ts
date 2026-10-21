import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { sortChangelog } from "../../lib/content";

export async function GET(context: { site: URL }) {
  const entries = sortChangelog(await getCollection("changelog"));

  return rss({
    title: "Xyfos Code — Changelog",
    description: "Nuevas versiones y cambios de todos los proyectos de Xyfos Code.",
    customData: "<language>es-es</language>",
    site: context.site,
    items: entries.map((e) => ({
      title: `${e.data.version} — ${e.data.title}`,
      pubDate: e.data.date,
      link: `/changelog/${e.slug}/`,
    })),
  });
}