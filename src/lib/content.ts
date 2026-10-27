import type { CollectionEntry } from "astro:content";

export const statusLabels: Record<string, string> = {
  alpha:   "Alfa",
  beta:    "Beta",
  live:    "Disponible",
  public:  "Público",
  private: "Privado",
};

export const statusColors: Record<string, string> = {
  alpha:   "bg-amber-100 text-amber-800 ring-amber-200",
  beta:    "bg-sky-100 text-sky-800 ring-sky-200",
  live:    "bg-emerald-100 text-emerald-800 ring-emerald-200",
  public:  "bg-slate-100 text-slate-700 ring-slate-200",
  private: "bg-slate-100 text-slate-500 ring-slate-200",
};

export const roadmapStatusLabels: Record<string, string> = {
  planned:       "Planificado",
  "in-progress": "En progreso",
  done:          "Completado",
};

export const roadmapStatusColors: Record<string, string> = {
  planned:       "bg-slate-100 text-slate-700 ring-slate-200",
  "in-progress": "bg-amber-100 text-amber-800 ring-amber-200",
  done:          "bg-emerald-100 text-emerald-800 ring-emerald-200",
};

/** "Zenit — gastos fijos…" -> "gastos fijos…" when the project name is shown separately. */
export function releaseTitle(entry: CollectionEntry<"changelog">) {
  const { project, title } = entry.data;
  const prefix = `${project} — `;
  if (!project || !title.startsWith(prefix)) return title;
  const rest = title.slice(prefix.length);
  return rest.charAt(0).toLocaleUpperCase("es-ES") + rest.slice(1);
}

export function sortProjects(projects: CollectionEntry<"projects">[]) {
  return [...projects].sort(
    (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title)
  );
}

function compareVersions(a: string, b: string) {
  const pa = a.replace(/^v/, "").split(".").map(Number);
  const pb = b.replace(/^v/, "").split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff) return diff;
  }
  return 0;
}

/** Newest first; same-day releases ordered by version. */
export function sortChangelog(entries: CollectionEntry<"changelog">[]) {
  return [...entries].sort(
    (a, b) =>
      b.data.date.valueOf() - a.data.date.valueOf() ||
      compareVersions(b.data.version, a.data.version)
  );
}

export const editionColors: Record<string, string> = {
  live:    "bg-emerald-100 text-emerald-800 ring-emerald-200",
  testing: "bg-amber-100 text-amber-800 ring-amber-200",
};

/** Release line of an entry: "Zenit · Android", or just the project. */
export function releaseLine(entry: CollectionEntry<"changelog">) {
  const { project, platform } = entry.data;
  return platform ? `${project} · ${platform}` : project;
}

export interface ProductRow {
  product: string;
  slug: string;
  platform?: string;
  status: string;
  tone: "live" | "testing";
  release?: CollectionEntry<"changelog">;
}

/** One row per product and edition, with its latest release: the home "products right now" panel. */
export function productRows(
  projects: CollectionEntry<"projects">[],
  releases: CollectionEntry<"changelog">[]
): ProductRow[] {
  const latest = latestReleasesByProject(releases);
  return sortProjects(projects).flatMap((p) => {
    const own = latest.get(p.data.title) ?? [];
    if (p.data.editions.length) {
      return p.data.editions.map((ed) => ({
        product: p.data.title,
        slug: p.slug,
        platform: `${ed.name} · ${ed.platform}`,
        status: ed.availability,
        tone: ed.tone,
        release: own.find((r) => r.data.platform === ed.name),
      }));
    }
    return [{
      product: p.data.title,
      slug: p.slug,
      platform: p.data.platform,
      status: statusLabels[p.data.status],
      tone: p.data.status === "live" ? ("live" as const) : ("testing" as const),
      release: own[0],
    }];
  });
}

/** Newest release per project and per edition (one entry for single-edition projects). */
export function latestReleasesByProject(entries: CollectionEntry<"changelog">[]) {
  const latest = new Map<string, CollectionEntry<"changelog">[]>();
  for (const e of sortChangelog(entries)) {
    const { project, platform } = e.data;
    if (!project) continue;
    const list = latest.get(project) ?? [];
    if (!list.some((r) => r.data.platform === platform)) list.push(e);
    latest.set(project, list);
  }
  return latest;
}

const dateFormat = new Intl.DateTimeFormat("es-ES", { dateStyle: "medium", timeZone: "UTC" });

export function formatDate(date: Date) {
  return dateFormat.format(date);
}

/** Machine-readable value for <time datetime>. */
export function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}
