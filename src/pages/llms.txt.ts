// llms.txt (https://llmstxt.org): resumen en Markdown del sitio para agentes y LLMs
import { getCollection } from "astro:content";
import { site } from "../config/site";
import { services } from "../data/services";
import { sortProjects } from "../lib/content";

export async function GET(context: { site: URL }) {
  const abs = (path: string) => new URL(path, context.site).href;

  const projects = sortProjects(await getCollection("projects"));
  const posts = (await getCollection("blog"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const lines = [
    `# ${site.name}`,
    "",
    `> Estudio de desarrollo de software a medida de ${site.author}: apps de escritorio y móviles, SaaS, automatizaciones y soluciones de datos para pequeñas empresas y profesionales. Web en español.`,
    "",
    "## Servicios",
    "",
    ...services.map((s) => `- ${s.title}: ${s.text}`),
    "",
    "## Proyectos",
    "",
    ...projects.map((p) => `- [${p.data.title}](${abs(`/projects/${p.slug}/`)}): ${p.data.description}`),
    "",
    "## Blog",
    "",
    ...posts.map((p) =>
      `- [${p.data.title}](${abs(`/blog/${p.slug}/`)})${p.data.description ? `: ${p.data.description}` : ""}`
    ),
    "",
    "## Contacto",
    "",
    `- Email: ${site.email}`,
    `- [GitHub](${site.github})`,
    `- [LinkedIn](${site.linkedin})`,
    "",
    "## Optional",
    "",
    `- [Changelog](${abs("/changelog/")}): versiones publicadas de cada proyecto`,
    `- [Roadmap](${abs("/roadmap/")}): próximas funcionalidades`,
    `- [RSS del blog](${abs("/rss.xml")})`,
    `- [Aviso legal](${abs("/aviso-legal/")})`,
    `- [Política de privacidad](${abs("/privacidad/")})`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
