import { ui, defaultLang } from "./ui";

export type Lang = keyof typeof ui;
export type UIKey = keyof (typeof ui)[typeof defaultLang];

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split("/");
  if (first in ui) return first as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    const dict = ui[lang] as Record<string, string>;
    const fallback = ui[defaultLang] as Record<string, string>;
    return dict[key] ?? fallback[key] ?? key;
  };
}

export function getLocalePath(lang: Lang, path: string): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path === "/" ? "" : path}`;
}

/**
 * Returns the equivalent path in targetLang.
 * e.g. getAlternatePath("/blog", "en", "es") → "/es/blog"
 *      getAlternatePath("/es/blog", "es", "en") → "/blog"
 */
export function getAlternatePath(
  currentPath: string,
  currentLang: Lang,
  targetLang: Lang
): string {
  if (currentLang === targetLang) return currentPath;
  if (targetLang !== defaultLang) {
    // en → es: prepend /es (or other locale)
    const path = currentPath === "/" ? "" : currentPath;
    return `/${targetLang}${path}`;
  }
  // es → en: strip the /es prefix
  return currentPath.replace(new RegExp(`^/${currentLang}`), "") || "/";
}
