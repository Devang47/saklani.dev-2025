# Portfolio — Devang Saklani

Personal portfolio site for Devang Saklani, a software engineer. Content (about, experience,
projects and writing) is managed in [DatoCMS](https://datocms.com/) and fetched at build time,
so the deployed site is fully static.

Design heavily inspired by [Brittany Chiang's portfolio](https://brittanychiang.com/).

🔗 Live: [saklani.dev](https://saklani.dev)

## Stack

- [Astro](https://astro.build/) — static site framework
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [Sass](https://sass-lang.com/)
- [DatoCMS](https://datocms.com/) — headless CMS (content source, queried via GraphQL)
- [PostHog](https://posthog.com/) — product analytics
- [Motion](https://motion.dev/) — animation library

## Getting started

Requires **Node.js 22.x** (see `.nvmrc`) and [pnpm](https://pnpm.io/).

```sh
# 1. install pnpm if you don't have it
npm install -g pnpm

# 2. install dependencies
pnpm install

# 3. create your local env file (see "Environment variables" below)
cp .env.example .env

# 4. start the dev server at http://localhost:4321
pnpm dev
```

## Environment variables

Copy `.env.example` to `.env` and fill in the values:

| Variable          | Required | Used for                                         |
| :---------------- | :------- | :----------------------------------------------- |
| `DATOCMS_API_KEY` | Yes      | Fetching page content from DatoCMS at build time |

> Note: the PostHog analytics key/host and the production site URL are currently hardcoded
> (in `src/components/Posthog.astro` and `astro.config.mjs`) rather than read from the other
> variables listed in `.env.example`. Reconciling this is tracked in the improvement plan.

## Commands

All commands are run from the project root:

| Command        | Action                                         |
| :------------- | :--------------------------------------------- |
| `pnpm dev`     | Start the local dev server at `localhost:4321` |
| `pnpm build`   | Build the production site to `./dist/`         |
| `pnpm preview` | Preview the production build locally           |
| `pnpm astro …` | Run Astro CLI commands (`astro check`, etc.)   |

## Project structure

```text
public/            static assets (fonts, favicons, OG images, robots.txt)
src/
├── assets/        images processed by Astro
├── components/    reusable UI (Project, Job, Blog, Posthog, Beams)
├── css/           global styles and Sass partials
├── icons/         inline SVG icon components
├── layouts/       Layout.astro — the shared HTML shell + <head> metadata
├── pages/         routes — index.astro (home) and 404.astro
├── sections/      page sections (Header, About, Experience, Projects, Writing, Footer, Game)
├── store.ts       the DatoCMS GraphQL query
└── utils.ts       small client-side helpers
index.d.ts         shared TypeScript types for the CMS response
```

## Content

Page content is defined by the `PAGE_CONTENT_QUERY` GraphQL query in `src/store.ts` and typed
in `index.d.ts`. Update content in the DatoCMS project rather than in this repo.

## Easter egg

The clock in the footer (and the 404 page) hides a playable tic-tac-toe game against a simple AI. 🎮
