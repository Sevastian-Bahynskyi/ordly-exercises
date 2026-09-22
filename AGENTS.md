# Ordly Exercises — ChatGPT maintenance guide

This repository is designed to be maintained primarily from ChatGPT chat sessions, not as a normal local coding project.

## Purpose

`ordly-exercises` is a dedicated hosted practice surface for Danish learning. It is completely separate from the main `Sevastian-Bahynskyi/ordly` application.

- Do not move product features from Ordly into this repo.
- Do not treat this repo as an Ordly staging deployment.
- Do not modify the Ordly repo when the user merely asks for a new practice session.
- The normal operation here is to regenerate practice content while reusing the exercise engine.

## Default workflow for ChatGPT

When the user uploads a fresh Ordly export or asks for a practice session:

1. Analyse learning state before generating questions. Prioritise weak/due words and interleave a smaller number of new or strong words.
2. Respect the requested CEFR level. Default to A1 unless the user asks for another level.
3. Prefer practical comprehension and use over raw translation testing.
4. Choose a varied set of exercise types from the existing library.
5. Update `src/session/currentSession.ts` with a new unique `session.id` when the exercise set changes materially. This intentionally gives the new session its own `localStorage` progress.
6. Reuse components. Only add/change a component if the requested exercise cannot be expressed cleanly with the existing types.
7. Build before pushing when tooling is available.
8. Push to `main`; GitHub Pages then republishes the stable site.

## Learning design rules

- iPhone-first. Every exercise must work well at 320–430 CSS px and with touch only.
- Keep touch targets around 44 px or larger.
- Dragging must always have a tap-based alternative because touch dragging can be awkward or inaccessible.
- Keep A1 text short and literal. Avoid hiding the answer in labels such as “focus: WORD”.
- Do not show the target answer before the learner responds unless the exercise is explicitly a reveal/flashcard exercise.
- Mix recognition and production. A session should not become only multiple choice.
- Avoid repeatedly testing words already known well. Weak words should reappear through different exercise types and contexts.
- Prefer realistic Danish someone living in Denmark could use.
- Use Russian glosses where useful for this learner, but do not make every exercise Danish → Russian translation.
- Give immediate, concise feedback.
- For uncertain Danish grammar, pronunciation, idiom or frequency, verify using authoritative Danish sources rather than guessing.

## Visual design

The practice surface should feel native to modern iPhone and visually close to Apple's current design language without copying Apple branding.

- Follow current Apple Human Interface Guidelines when changing shared UI.
- Use the system font stack and strong typographic hierarchy.
- Keep accent colour restrained; use it for progress, selection and status rather than flooding the whole interface.
- Prefer clear content surfaces. Use translucent/glass treatment mainly for navigation and lightweight controls.
- Use generous whitespace, subtle hairlines, soft depth and large rounded geometry.
- Controls must feel familiar and remain at least ~44 CSS px on touch devices.
- Motion should communicate state changes: short fades, small translations, press feedback and progress transitions. Avoid decorative bouncing, spinning, parallax or constant animation.
- Always support `prefers-reduced-motion`.
- Support iOS light and dark appearance.
- Do not place branding above learning content or let visual decoration reduce room for the exercise itself.

Shared styling lives in `src/styles.css`. A generated practice session should almost never need custom CSS.

## Architecture

`src/session/currentSession.ts`
: The generated session. This is the file that should change most often.

`src/types.ts`
: Schema for every supported exercise type.

`src/exercises/`
: Reusable exercise implementations. Keep them generic and content-agnostic.

`src/components/`
: Shared visual primitives.

`src/storage/progress.ts`
: Browser `localStorage` persistence keyed by session id.

`.github/workflows/pages.yml`
: Static GitHub Pages build/deploy pipeline.

## Existing exercise types

1. `choice` — one-answer contextual multiple choice.
2. `match` — map Danish words to meanings/phrases.
3. `drag-gap` — drag or tap a word into a sentence gap.
4. `order` — build and reorder a sentence from tokens.
5. `type` — short typed production/recall.
6. `binary` — true/false semantic or grammar judgement.
7. `odd-one-out` — identify which item does not belong.
8. `category-sort` — group words by meaning/function/category.
9. `dialogue` — choose the natural reply in a short exchange.
10. `listen-choice` — browser speech synthesis + recognition choice.
11. `flash-reveal` — active recall, reveal answer, self-rate.

Add genuinely different formats over time when useful, for example timeline ordering, mini memory grid, error spotting, picture association, conjugation grids, route/scenario choices or pronunciation contrasts. Do not add variants that are visually different but cognitively identical just to increase the count.

## Persistence

Progress is stored only in the browser. It survives closing the tab, leaving ChatGPT, refreshing, and reopening the Pages URL on the same browser/device.

A new session id creates a fresh progress namespace. Never silently reuse an old session id for a structurally different session.

## Deployment

The site is static and free to host. GitHub Pages should use **GitHub Actions** as its source.

Stable target URL:

`https://sevastian-bahynskyi.github.io/ordly-exercises/`

If Pages is not yet enabled for this repository, the only manual setup is:

`Repository Settings → Pages → Build and deployment → Source → GitHub Actions`

After that, pushes to `main` deploy automatically.
