# Projectory Design System

Extracted from **Who We Are**, **Pricing** and **Get Started** — the three
newest pages. It describes what those pages already do, rather than inventing
a scheme and retrofitting it. Anything built from here on should be buildable
out of these pieces; when it isn't, that's a design conversation, not a
reason to add a one-off value.

Everything lives in two files:

| File                             | Holds                                    |
| -------------------------------- | ---------------------------------------- |
| `src/styles/tokens.css`          | every token, in one `:root`              |
| `src/styles/patterns.module.css` | constructions repeated across components |

---

## The three tiers

```
component  ──▶  semantic / scale  ──▶  primitive
--card-inline   --color-surface        --neutral-800
```

Reference only ever flows left to right, and **components read the middle
column**. That middle layer is what lets the palette be repainted without
touching a component, and it is why `--color-surface` exists rather than
components reaching for `--neutral-800` directly.

**Primitives** (`--neutral-*`, `--brand-*`) are raw values with no opinion
about use. You will almost never write one in a component. The two places that
legitimately do are documented at their call site: a `mask-image`, where black
means _opaque_ rather than a colour, and the Calendly close glyph, which wants
pure black for contrast.

**Semantic tokens** say what a value is _for_. Reach for these first.

**Component tokens** are declared on a component's own root class and are that
component's API. `TeamScrollStack` exposes `--member-count`, `--strip-h` and
`--card-inline`; `Team` drives both its heading sizes from one
`--team-heading-size`. Use one only when a value is reused _within_ the
component — and point it at a scale token, never a raw px or hex.

## Why brand colours aren't behind `--color-accent`

Neutrals get a semantic layer because "what colour is a card" has one right
answer. Brand hues don't: the Who We Are eyebrow is yellow because it _is_
yellow, not because it is "the accent". A single accent token would be a lie
that every component immediately works around. So brand hues stay addressable
by name, and the six of them are the palette.

---

## The tokens

### Colour

|              |                                                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Surfaces     | `--color-bg` · `--color-surface` · `--color-surface-hover` · `--color-surface-inverse` · `--color-surface-inverse-hover` |
| Text         | `--color-text` · `--color-text-muted` · `--color-text-dim` · `--color-text-inverse`                                      |
| Lines        | `--color-line` · `--border-hairline`                                                                                     |
| Brand        | `--brand-coral` · `--brand-teal` · `--brand-lime` · `--brand-yellow` · `--brand-violet` · `--brand-plum`                 |
| Brand tints  | `--brand-coral-soft` · `--brand-pink` — gradients and hover fills only                                                   |
| Translucency | `--alpha-white-12` · `--alpha-white-20` · `--alpha-black-10`                                                             |

Hover surfaces are derived: `--color-surface-hover` is
`color-mix(in srgb, var(--color-surface) 94%, var(--neutral-0))`, which
resolves to exactly the `#2a2a2a` that was there before. Encoding the
_relationship_ means a change to the base carries into the hover.

Where a hue shift isn't a straight darkening, `color-mix` can't express it and
the literal stays with a comment saying why — coral's press state is the
example.

### Scales

| Scale                | Steps                                                        |
| -------------------- | ------------------------------------------------------------ |
| `--space-1…6`        | 4 · 8 · 12 · 16 · 20 · 24 — inside a component               |
| `--block-1…5`        | 28 · 40 · 56 · 80 · 100 — rhythm between sections            |
| `--font-size-xs…2xl` | 13 · 16 · 18 · 20 · 24 · 32, plus `--font-size-display` (55) |
| `--leading-*`        | 1 · 1.15 · 1.2 · 1.25 · 1.3 · 1.4                            |
| `--radius-*`         | sm 8 · md 12 · lg 20 · xl 24 · pill 999                      |
| `--transition-*`     | fast 0.2s · base 0.3s                                        |

Six steps is the constraint, not the leftovers of one. A seventh value should
be a decision someone makes on purpose.

### Breakpoints

Four categories: **Wide** 2000 · **Desktop** 1024 · **Tablet** 768 ·
**Mobile** 480. Custom properties can't be used inside `@media`, so they're a
convention in CSS and live in `src/config/breakpoints.ts` for JS. Change both
together.

Prefer not to need one. A grid that stacks with `auto-fit`, or a row that
wraps with `flex-wrap`, responds to the space it actually has.

But check the substitution is real. Delivery Options' footer row looks like an
obvious `flex-wrap` candidate and isn't: with `nowrap` the price squeezes and
re-wraps internally while the button holds the right edge, and only below
385px does it stack. Switching to `flex-wrap` dropped the button onto its own
row at 390px — the width of most phones. That rule kept its breakpoint, with a
comment recording why.

---

## Patterns

`composes` is resolved at build time and needs no change in the TSX:

```css
.buttonPrimary {
  composes: button from '@/styles/patterns.module.css';
  background: var(--color-surface-inverse);
  color: var(--brand-teal);
}
```

| Pattern                       | Was duplicated in                                                             |
| ----------------------------- | ----------------------------------------------------------------------------- |
| `.button`                     | Who We Are CTA ×2, Catalogue CTA, Whitelabel CTA, Delivery Options            |
| `.floatBadge`                 | Who We Are CTA, Catalogue CTA — identical to the `-16.545deg`                 |
| `.bobbing` + `@keyframes bob` | the two badges and all four Get Started floaters                              |
| `.hairlineSurface`            | team cards, scroll-stack cards, case-study and whitelabel images, video panel |

Two rules govern this file:

**It must already be duplicated.** A pattern invented ahead of its second use
is a guess, and every consumer inherits the guess.

**Patterns carry geometry and behaviour, never colour.** Consumers add their
own paint. This is also what makes composing safe: the two class names have
equal specificity, so anything a consumer redeclared would be settled by
bundle order rather than intent. Keeping the concerns apart means that never
comes up.

The keyframes are worth a note. `@keyframes` is scoped per file by CSS
Modules, so the same drift animation declared in three files was three
separate animations. It's one now, and callers vary only `animation-duration`
and `animation-delay` so the floaters stay out of phase.

---

## Working in it

Add a token when a value is used **twice or more** and has a name someone
would search for. A token wrapping a single literal is indirection, not a
system — three alpha values were cut for exactly that reason.

Leave a value literal when it is genuinely one-off, and say so in a comment.
About 25 raw values remain across the three pages and each is deliberate: a
single hero size, a gradient stop that must match its neighbour's channels,
one hover shade.

**Don't round a number just to make it fit.** The rule that survived contact
with the pixel diff: snap a value only when doing so _merges two or more real
occurrences_. Rounding a one-off changes the design and consolidates nothing —
19px on the founder bios reflowed the paragraph and bought no consistency, so
it stayed 19px. 17px recurs four times and is a real size in this design; it
also reflowed, so it stayed too, and is flagged for reconciliation with 16px
at design level rather than in CSS.

**Line-height converts to a ratio only when the ratio is exact.** 25px on 20px
is 1.25 and converts cleanly. 25px on 18px is 1.389 and stays in px. When a
font size snaps, its line-height stays in px so the rendered leading doesn't
move twice.

---

## Known issues

**Home's CSS is global and reaches every page.** `src/pages/Home/Home.module.css`
declares bare `h1`, `h2`, `h5` and `iframe` selectors. CSS Modules only scopes
classes, so those compile to global rules, and Home is imported eagerly in
`App.tsx` — they apply everywhere from first paint. `h2 { font-size: 53px }`
reaches Pricing and Who We Are; the `iframe` rule rounds the Calendly embed on
Get Started.

Scoping it was tried and reverted, measured by screenshot diff:

- effect on the three migrated pages — **0.00–0.04%**
- cost to Products / Case Studies / Get Estimate / product + case-study pages —
  **3–8%, with page heights shifting**

Several old pages lean on those globals for heading sizes they never declared.
Fixing it means giving those pages explicit type, which changes the rest of
the site rather than cleaning it. Do it when those pages migrate — they'll
have explicit sizes then and the rules can just be deleted. The reasoning is
also recorded in the file itself.

**The legacy block in `tokens.css`** serves the pages not yet migrated.
Nothing new should reference it. It shrinks as pages move across; when it
empties, delete it. Six tokens went in this pass — `--gray-alt`, `--mid-gray`,
`--mid-gray-alt`, `--coral-light`, `--yellow`, `--border-subtle` — because the
three pages were their only consumers.

**`tokens.css` must keep one `:root`.** `vite.config.ts` extracts the first
`:root` block by regex and inlines it as critical CSS. Split it, or add a
token used above the fold to a second block, and first paint ships with that
variable undefined — visibly, because the real stylesheet loads deferred
behind `media="print"`.
