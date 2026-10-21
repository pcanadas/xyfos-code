# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Role
You are a programming expert with strong coding skills. You can solve all kinds of programming problems. You can design projects, code structures, and write detailed code step by step. You are an expert in Python, AWS (EC2, ASG, EFS, SSM), Google APIs (Calendar, Meet, Drive), Selenium, and MySQL. 

## Project

Xyfos Code — landing page, blog, changelog, roadmap, and project showcase for xyfos.com. Built with **Astro 5**, **Tailwind CSS 3**, and **TypeScript**. Site language is Spanish (`lang="es"`).

## Commands

```bash
npm ci            # install dependencies
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # preview production build
npm run check     # astro type checking
```

No test framework is configured.

## Architecture

- **Content collections** (`src/content.config.ts`): blog, changelog, roadmap, projects — each with its own Zod schema. Markdown files live in `src/content/<collection>/`.
- **Layouts**: `SiteLayout.astro` (base HTML shell + Header/Footer), plus any content-specific layouts in `src/layouts/`.
- **Pages**: `src/pages/` uses Astro file-based routing. Dynamic routes use `[...slug].astro` for each content collection.
- **Components**: split into `layout/` (Header, Footer, Seo) and `ui/` (Button, Card, Badge).
- **Styling**: Tailwind via `tailwind.config.mjs` + `postcss.config.cjs`. Global styles in `src/styles/global.css`.
- **RSS feeds**: `src/pages/rss.xml.ts` (blog) and `src/pages/changelog/rss.xml.ts`.

## Deploy

GitHub Actions deploys `dist/` to Hostinger via SSH (`.github/workflows/deploy-xyfos-com.yml`). Site URL: `https://www.xyfos.com` (`public/.htaccess` redirects the bare domain to www).

The deploy uses `rsync --delete` into `public_html`, which is shared with the subdomain apps. Their web roots live in `public_html/apps/` (`apps/zentask`, `apps/quotedesk`); their Laravel code lives outside `public_html`, in `domains/xyfos.com/<app>-app`. `salesops/` + `salesops-app/` (a client's production app) still sit directly in `public_html`. Any folder another project deploys into `public_html` must be listed in the rsync `--exclude`s; the `--filter "P /*/"` rule is a safety net that protects any top-level folder not in `dist/`. Never remove it.

## License

Code is MIT. Content (blog posts, images, logo, roadmap text) is © Patricia Cañadas, all rights reserved.
