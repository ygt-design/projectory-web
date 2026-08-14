# Projectory

Marketing site for Projectory, the audience engagement company — product
catalogue, case studies, pricing and lead capture, plus a few standalone
audience-participation activities used live at events.

React 18 · TypeScript · Vite 6 · React Router 7 · CSS Modules. Deployed on
Vercel from the `docs/` build output.

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:5173
```

No environment variables are needed for the marketing site.

The activity forms proxy to Google Apps Script and need two, set in the Vercel
project settings for production and in a local `.env` if you are working on
them:

| Variable                         | Purpose                                                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `VENTING_MACHINE_API_KEY`        | Shared secret the venting-machine Apps Script checks before accepting a write                                                    |
| `VENTING_MACHINE_DEPLOYMENT_URL` | Deployed Apps Script web-app URL (`https://script.google.com/macros/s/<id>/exec`) that `api/venting-machine-form.cjs` proxies to |

## Scripts

| Script              | What it does                                          |
| ------------------- | ----------------------------------------------------- |
| `npm run dev`       | Vite dev server, with `/api/*` proxied to Apps Script |
| `npm run build`     | Production build into `docs/`                         |
| `npm run preview`   | Serve the built output                                |
| `npm run typecheck` | `tsc --noEmit`. See the note below                    |
| `npm run lint`      | ESLint                                                |
| `npm run format`    | Prettier write · `format:check` to verify only        |
| `npm run knip`      | Unused files, exports and dependencies                |

> **`typecheck` reports 6 known errors**, all in `src/pages/activities/`. They
> are a frozen baseline, not new breakage — see `CLEANUP-REPORT.md`, open item 5. Anything _outside_ that directory should be zero; treat a 7th error as a
> regression. This is also why `build` does not yet run `typecheck`.

## Project structure

```
src/
  assets/       images, fonts, documents — all assets are global
  components/
    layout/     app chrome: Layout, Navbar, Footer, SlideInMenu, …
    sections/   page sections used by more than one page
    <Name>/     shared UI: ProductCard, CloudinaryImage, FaqAccordion, …
  config/       site.ts (keys, endpoints), seo.ts (per-route metadata)
  context/      LikedProductsContext
  data/         products.ts, caseStudies.ts, faq.ts — app-wide data
  hooks/        useEscapeKey, usePageEntrance, useDocumentMeta
  lib/          web3forms.ts, findProduct.ts
  pages/<Page>/ <Page>.tsx + <Page>.module.css + components/<Name>/
  styles/       tokens.css (design tokens), global.css
  types/        product.ts
```

**Where does a component go?** By how many places use it:

| Consumers                     | Home                                                 |
| ----------------------------- | ---------------------------------------------------- |
| 3+, or 2 in _different_ pages | `src/components/`                                    |
| 1                             | that page's `components/`                            |
| App chrome                    | `src/components/layout/` — global by role, not count |

**Import style.** `@/` for anything crossing a unit boundary, relative for
anything inside the same page or component group. So a relative path means
"mine" and `@/` means "shared". No barrel/`index.ts` files — they defeat Vite's
tree-shaking.

**Colour** comes from `src/styles/tokens.css`. Add a token when a colour is
used twice or more; one-off colours stay literal at the call site.

## Activities

`src/pages/activities/` holds the live-event apps (Combo Convo, Laser Focus,
Venting Machine). They are self-contained — they import nothing from the rest
of `src/` — and they post to Google Apps Script through the serverless
functions in `api/`. The Apps Script sources live in `apps-script-*/`.

In production these routes redirect to `activity.projectory.live` (see
`vercel.json`).

## Deployment

Vercel builds `docs/` and serves it, rewriting all unmatched paths to
`index.html` for client-side routing. `api/*.cjs` deploy as serverless
functions.

The canonical host is **`https://projectory.live`** — `www` permanently
redirects to it. That host is encoded in four places, which must stay in step:
`src/config/seo.ts`, `public/robots.txt`, `public/sitemap.xml`, and the
redirect in `vercel.json`.

`public/sitemap.xml` is a static file listing every product and case study.
**Regenerate it when either data file changes.**

## Notes

- `vite.config.ts` inlines critical CSS and defers the main stylesheet. It
  reads the `:root` block out of `styles/tokens.css` at build time, so keep
  tokens there rather than duplicating them.
- `LoadingScreen` must stay _eagerly_ imported in `App.tsx`. The critical-CSS
  plugin inlines the first `._container_*` rule it finds in the index CSS
  chunk, and that rule is LoadingScreen's overlay. Making it lazy ships the
  loader unstyled.
- There is no test suite. `CLEANUP-REPORT.md` documents known issues and the
  manual route walk that currently serves as the gate.
