# Cleanup Report

Branch `chore/cleanup-phase-1`, from `f14c6c4`.
**22 commits · 198 files changed · −4,060 net lines · −13.4 MB assets**

All six phases complete. This document records what changed, what was
deliberately left alone, and what still needs a decision from you.

---

## Ground rules

Two constraints shaped every decision.

**1. Zero design changes.** No visual, motion, spacing, type or colour
difference versus what was on screen before. This ruled out a lot of what was
originally planned — see [Not done, and why](#not-done-and-why).

**2. Nothing backend, nothing activities.** Frozen at zero diff and verified
after every single commit:

```
api/*.cjs                    apps-script-laser-focus/
scripts/*.cjs                apps-script-venting-machine/
.clasp.json                  src/pages/activities/**
vite.config.ts server.proxy
```

One authorized exception, granted explicitly: the `www → apex` redirect added
to `vercel.json`. Redirects array only; `builds` and `rewrites` untouched.

---

## What changed

### 1 — Safety gate

Nothing could be verified before this existed.

|                     | Before                                                  | After                                      |
| ------------------- | ------------------------------------------------------- | ------------------------------------------ |
| `npm run lint`      | crashed on `--ext`, removed in ESLint 9 — had never run | runs, 0 problems                           |
| `npm run typecheck` | did not exist; `tsc` never ran                          | exists, 0 errors outside frozen activities |
| `npm run format`    | Prettier installed, no config, no script                | exists, repo formatted                     |
| `npx knip`          | did not exist                                           | exists, 0 unused files                     |
| `npm run build`     | passed                                                  | passes                                     |

Also: ESLint was ignoring `dist` while the build emits to `docs` (104 files /
44 MB were being linted); `eslint-config-prettier` was installed but never
wired up; `tsconfig` included a `loadtest-k6.js` that does not exist; `docs/`
was listed twice in `.gitignore`. Added a `@/` alias to tsconfig and Vite.

`.prettierignore` matters more than it looks — without it the first format pass
would have rewritten every frozen backend and activities file.

### 2 — Deletions

**−5,995 lines, −13.4 MB.** Every deletion confirmed by knip before removal.

Dead modules: `components/FAQ/` and `components/Intro/` (both shadowed by
page-local copies that are the ones actually rendered) · `PricingInformation/`
· `data-archive/productsData.ts` (2,645-line stale duplicate) ·
`utils/cloudinary.ts` · `Layout.module.css`.

Unreachable code: the `video`, `case-study` and `testimonialSizzle` branches in
`ProductPage` dispatched on section types occurring **zero times** in the data.
Removing them orphaned `VideoFeature/` and `CaseStudyHighlight/`, deleted too.

Also: two commented-out `imageGrid` blocks holding Figma S3 URLs that expired
2025-03-31; `index.css`, whose `*` reset was a strict subset of the identical
rule in `global.css`; two `console.log` calls printing form-submission
responses to the production browser console.

Dependencies removed: `@cloudinary/url-gen`, `gh-pages`, `eslint-plugin-react`.

### 3 — Shared primitives

| Module                  | Replaces                                                     |
| ----------------------- | ------------------------------------------------------------ |
| `types/product.ts`      | 4 drifted `interface Product` declarations                   |
| `lib/findProduct.ts`    | 3 duplicated `.find()` scans + 2 identical `.filter()` calls |
| `lib/web3forms.ts`      | 3 hand-rolled submits, access key hardcoded in each          |
| `config/site.ts`        | Web3Forms key/endpoint, Calendly URL                         |
| `hooks/useEscapeKey.ts` | 5 hand-rolled Escape handlers                                |
| `data/faq.ts`           | 2 byte-identical FAQ declarations                            |

`web3forms` owns plumbing only. It deliberately does **not** decide what
success means: `ContactForm` checks `response.ok` alone while the other two
also require `result.success !== false`, and each shows different copy.
Unifying that would change what users see.

`findProduct` builds a Map once at module load — `HowWeBuilt` was calling
`.find()` inside a `.map()`, re-scanning all 20 products per button per render.

### 4 — Structure

Every page now follows the `src/pages/Pricing/` reference pattern.

```
src/
  assets/       all images, fonts, documents (global)
  components/   layout/    app chrome (7)
                sections/  dual-use page sections (4)
                + 7 shared UI components
  config/ data/ hooks/ lib/ types/ context/ styles/ utils/
  pages/<Page>/ <Page>.tsx + .module.css + components/<Name>/
```

- **No page imports from another page any more.** That was 8 edges, including
  `CaseStudyPage` reaching into `ProductPages/components/` for four components.
- `types/`, `lib/` and `components/` no longer import _upward_ into `pages/` —
  `productsData` (7 consumers) and `caseStudiesData` moved to `src/data/`.
- 8 single-consumer components moved out of `src/components/` into their page.
- All 20 imports at 3+ levels of `../` are gone. 194 rewritten to `@/`, then 43
  intra-unit ones back to relative — so a relative path reads as "mine" and
  `@/` as "shared".
- `TestimonalSizzle/` → `TestimonialSizzle/` (dir was missing an `i`).

### 5 — Bug fixes

**Liked products persist.** The context was a bare `useState([])`, so a refresh
silently emptied the selection — including mid-flow on `/get-estimate`, which
is built entirely around it. The reader tolerates unavailable storage,
malformed JSON, non-array payloads and non-string entries, and drops ids for
products no longer in the data (otherwise the navbar badge would count a
product the drawer cannot render). Provider value is memoised and `toggleLike`
stabilised, restoring the `React.memo` on `ProductCard`.

**Per-page SEO.** All 15 routes served `<title>Projectory</title>` with no
description, Open Graph or canonical, and there was no `document.title`
assignment anywhere. A ~60-line `useDocumentMeta` hook now sets title,
description, canonical and og/twitter tags per route — not a library, because
React 18.3 has no native metadata hoisting and `react-helmet-async` is
effectively unmaintained. Copy lives in `config/seo.ts` and is taken from what
each page already says on screen.

Canonical host is **`https://projectory.live`** (apex), consistent across all
four places that encode it: `config/seo.ts`, `robots.txt`, `sitemap.xml`
(32 URLs) and the `www → apex` redirect in `vercel.json`.

**Favicon 404 fixed.** `index.html` used `href="images/…"` with no leading
slash, so on `/products/:id` the browser requested `/products/images/…`.

### 6 — Colour tokens

Colour was 220 hex literals while a 10-token `:root` sat in `global.css` being
bypassed — `#1c1c1c` appeared 19 times next to a `--background-dark-gray` that
already meant it. `styles/tokens.css` now holds 21 tokens covering 196 of those
literals (188 substitutions, 36 files). A colour earns a token at 2+
occurrences; the 24 used exactly once stay literal.

**Values were only named, never re-picked.** Verified two ways: every token
checked against `tokens.css`, and the full multiset of colours in the built CSS
— every `var()` resolved back to a literal, hex and `rgba()` normalised to the
same RGBA identity — unchanged at **119 distinct colours over 580 occurrences**.

This also fixed a latent first-paint bug: `vite.config.ts` carried a
hand-maintained copy of the tokens for its inlined critical CSS, drifted to 7
of 10 and **missing `--white`**. Since the real stylesheet loads deferred via
`media="print"`, any above-the-fold rule using an absent token had no value
until the CSS arrived — and tokenising 74 more `#fff` would have widened that.
The plugin now reads `:root` out of `tokens.css` at build time.

---

## Open items — need your decision

None of these were fixed, because each changes visible behaviour or content.

**1. `/build-your-program` is a dead link.** The case-study CTA button points
at it, but it is not a declared route in `App.tsx`. With no `<Route path="*">`,
clicking it renders empty chrome. Needs a destination — probably `/get-started`.

**2. The shared FAQ mislabels a question.** `caseStudiesFAQ` answers _"What
discounts can you provide?"_ with text describing the estimate process that
never mentions a discount. Note the original audit had this backwards:
`pricingData.ts` is the **correct** copy — it has a real discounts answer _and_
this estimate answer, each under the right question.

**3. Scroll-lock implementations fight each other.** Five implementations in
two incompatible idioms. Open the mobile nav and the liked-products drawer
together, close the nav first, and the drawer's cleanup restores
`overflow: hidden` — **the page becomes permanently unscrollable.** Left alone
at your instruction; the fix is a ref-counted hook.

**4. Five backend dependencies are unused.** `cors`, `dotenv`, `express`,
`googleapis`, `nodemailer` show zero references anywhere including `api/`. They
are the backend's runtime dependency set, so removal needs sign-off.

**5. Six type errors in the activities forms.** `SelectInput`/`TextArea` do not
declare `onFocus`/`onBlur`/`className`, so React silently drops those props and
two selects and a textarea do not scroll into view like their sibling text
inputs do. An 8-line type-only fix would resolve it — and would unblock adding
`typecheck` to `build`, which is currently impossible because the check cannot
reach zero.

**6. Pricing model conflict.** `pricingData.ts` states "Every Product. One
Price." at **$9,000**, while all 20 products carry two-tier ladders from
**$2,500 to $23,000**, none of which equals $9,000 except two DIY entries. This
is invisible today only because `ProductPage` has no `case 'pricing'`, so
roughly 1,566 lines of pricing data render nothing. Needs a business decision.

---

## Not done, and why

**Would have changed pixels or motion:**

- **Marquee swap** (`ClientLogos` hand-rolled → `react-fast-marquee`) — changes
  the scroll animation.
- **`CtaBanner` + `CatalogueCTA` merge** — structurally alike, but backed by
  two different CSS modules.
- **`CloudinaryImage`'s two contracts** — `ProductCard` passes an
  already-optimised URL while 6 other call sites pass raw URLs. Settling on one
  changes which image URL is actually requested.
- **`lib/motion.ts`** — framer variants vary between sites; consolidating risks
  differences invisible in a diff.
- **Palette / breakpoint / type-scale consolidation** — six near-blacks remain
  between `#131313` and `#35343f`, two pairs differing by only 2–3
  (`--gray`/`--gray-alt`, `--mid-gray`/`--mid-gray-alt`), and there are 36
  distinct breakpoints. Merging any of them is a design decision, not cleanup.
  Custom properties also cannot be used inside `@media`, so breakpoints cannot
  be tokenised at all.
- **Disabling submit buttons in flight** — all three forms are click-spammable.
  Real bug, visible fix.

**Wrong abstraction:**

- **`SectionRenderer`** — the two section dispatchers share type _names_, not
  behaviour. `case 'image'` renders an embla carousel with
  `ProductPage.module.css` classes in one and a bare `<img>` with
  `CaseStudyPage.module.css` in the other. Only the 10-line `detailsContent`
  builder genuinely duplicates, at 2 sites.
- **`Portal` component** — 6 identical one-liners, no divergence, no bug.
  `createPortal(x, document.body)` is already the primitive.
- **`useMediaQuery`** — collapses to 2 clean sites. `Home`'s 764-vs-1024
  self-contradiction and `ProductPage`'s missing resize listener are
  load-bearing: "fixing" either changes what renders at specific widths.
- **`config/routes.ts`** — its value was catching route drift, which a one-off
  check delivered instead (and found the dead link above).

**Corrections to the original audit.** Three claims did not survive checking:

- **The "malformed `clamp()`" is not malformed.** `clamp(48px, 2.5vw + 32px,
80px)` was reported as invalid CSS that browsers drop entirely. `clamp()`'s
  grammar is `clamp( <calc-sum>#{3} )` and `<calc-sum>` permits `+` with
  surrounding whitespace, so it is valid and renders. "Fixing" it would have
  been the actual visual change.
- **All `.otf` fonts are referenced** by `@font-face`. Only `FoundersGrotesk.ttc`
  and `GT-Alpina-Standard-Regular.ttf` were true orphans.
- **`src/index.css` was imported**, not dead — it was merged, not deleted.

The asset audit also undercounted: the original scan reported 7 orphans / 12.4
MB. Path-aware re-checking found **19 files / 13.4 MB** — it had missed `.avif`
entirely and produced false negatives on `jeff/oren/paddy.webp`, which only
_look_ referenced because identically-named live files exist elsewhere. It also
nearly produced false positives: `cemaLogo.png` looked used because `cema.png`
is imported, and `Apricot_1.png` because `Apricot_15` is. Deleting on the first
scan's output would have broken the Home page and the case-study logos.

---

## Also worth knowing

- **A trial font ships to production.** `GT-Alpina-Standard-Light-Trial.*` is
  the source for the `GT-Alpina-Regular` family. Licensing risk.
- **39 MB of `.mp4` is tracked in git**, most of the pack size. Consider Git LFS
  or Cloudinary.
- **Dead Figma URLs** in `TestimonialSizzle.module.css` — two `url()` references
  to `figma.com/file/…`, which are not durable asset hosts.
- **Security, in the frozen backend:** `apps-script-venting-machine/Code.gs`
  hardcodes a `SPREADSHEET_ID` fallback directly beneath a comment reading
  "Never hardcode it here — this file is in a public repo".
  `apps-script-laser-focus/Code.gs` has no API-key check. That directory also
  contains both `Code.gs` and `Code.js` — two drifted copies that `clasp push`
  would upload into one global scope, colliding on `CONFIG`, `doGet`, `doPost`.
- **Root `.clasp.json` sets `rootDir: "apps-script"`, a directory that does not
  exist.**
- **`MultiStepForm` and `MultiStepFormAlt` are ~93% identical** — an entire
  forked form to remove one email field.
- **No tests, no CI.** Recommend Vitest with a smoke test rendering each route,
  and a GitHub Action running `typecheck` / `lint` / `knip` / `build`.

---

## Verifying any of this

```bash
npm run typecheck   # 6 errors, all under src/pages/activities/
npm run lint        # 0 problems
npm run format:check
npx knip            # 0 unused files
npm run build

# the constraint check — must print nothing
git diff --stat f14c6c4..HEAD -- src/pages/activities api scripts \
  apps-script-laser-focus apps-script-venting-machine .clasp.json
```

No test suite exists, so a manual route walk is the real gate: all 15 routes,
paying attention to `/` (loading screen on first paint), `/products/:id`
(gallery + section types), `/case-study/:id` (all four), `/who-we-are` and
`/pricing` (images resolve after the asset move), `/get-estimate` (like
products → hard refresh → selections survive), and the three activity routes,
which must be bit-for-bit unchanged.
