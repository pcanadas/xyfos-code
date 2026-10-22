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

/** "Cuadra — gastos fijos…" -> "gastos fijos…" when the project name is shown separately. */
export function releaseTitle(entry: CollectionEntry<"changelog">) {
  const { project, title } = entry.data;
  const prefix = `${project} — `;
  return project && title.startsWith(prefix) ? title.slice(prefix.length) : title;
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

export function latestReleaseByProject(entries: CollectionEntry<"changelog">[]) {
  const latest = new Map<string, CollectionEntry<"changelog">>();
  for (const e of sortChangelog(entries)) {
    if (e.data.project && !latest.has(e.data.project)) latest.set(e.data.project, e);
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
