import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: { site: URL }) {
  const entries = (await getCollection("changelog")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: "Xyfos Code — Changelog",
    description: "Product releases and updates.",
    site: context.site,
    items: entries.map((e) => ({
      title: `${e.data.version} — ${e.data.title}`,
      pubDate: e.data.date,
      link: `/changelog/${e.slug}/`,
    })),
  });
}