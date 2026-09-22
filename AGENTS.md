# Ordly Exercises — ChatGPT maintenance guide

This repository is designed to be maintained from **ChatGPT browser-based chat sessions**. The user does not plan to maintain it locally with Codex or an IDE as part of the normal workflow.

## Purpose

`ordly-exercises` is a dedicated hosted practice surface for Danish learning. It is completely separate from the main `Sevastian-Bahynskyi/ordly` application.

- Do not move product features from Ordly into this repo.
- Do not treat this repo as an Ordly staging deployment.
- Do not modify the Ordly repo when the user merely asks for a new practice session.
- The normal operation here is to regenerate practice content while reusing the exercise engine.

## Canonical learning data

The main Ordly application automatically creates or updates `learning-stats.csv` in the root of this repository when the learner uses **Save to GitHub** on the Material page.

**For normal practice requests, this repository CSV is authoritative.**

- Always fetch the current `learning-stats.csv` from the `main` branch immediately before generating a session.
- Never use a previously remembered CSV or statistics from an older chat as a substitute for reading the current file.
- Do not ask the learner to upload a CSV in chat unless `learning-stats.csv` is missing, empty, invalid, or the learner explicitly wants to override it with an uploaded file.
- If the file is unavailable or invalid, tell the learner to use **Material → Save to GitHub** in Ordly and retry.
- The practice web app does not read this CSV at runtime. ChatGPT consumes it while authoring the next static session.

Full workflow: `docs/CHATGPT_WORKFLOW.md`.

## Default workflow for ChatGPT

When the user asks for a practice session, even with a minimal request such as “create 20 exercises”:

1. Fetch the latest root `learning-stats.csv` from `main`.
2. Analyse the available learning signals. Prioritise weak, missed, due, fragile/building items and a controlled amount of new vocabulary. Avoid wasting exercises on secure words.
3. Respect explicit count, CEFR level, focus, difficulty or requested exercise types. Default to **A1** and **20 exercises** when those are omitted.
4. Prefer practical comprehension and use over raw translation testing.
5. Choose a varied mix of exercise types from the existing library.
6. Update `src/session/currentSession.ts` with a new unique `session.id`. A materially new session must get fresh `localStorage` progress.
7. Reuse components. Only add/change a component if the requested learning interaction cannot be expressed cleanly with the existing types.
8. Build/validate when tooling is available.
9. Push to `main`.
10. Verify the GitHub Pages workflow for the **final commit**. If it fails, inspect and fix it. Do not tell the learner the session is ready before the final deployment succeeds.
11. Report completion concisely and give the stable PWA URL.

## Learning design rules

- iPhone-first. Every exercise must work well at 320–430 CSS px and with touch only.
- Keep touch targets around 44 px or larger.
- Dragging must always have a tap-based alternative because touch dragging can be awkward or inaccessible.
- Keep A1 text short and literal. Avoid hiding the answer in labels such as “focus: WORD”.
- Do not show the target answer before the learner responds unless the exercise is explicitly a reveal/flashcard exercise.
- Randomise every unordered answer bank at runtime. Do not rely on the order written in `currentSession.ts`; correct answers must not acquire a predictable position across generated sessions.
- `match` exercises are stricter: the meaning column must be a derangement of the Danish column whenever there is more than one pair, so no correct pair may appear on the same row by chance.
- Sentence-order token banks, drag-gap options, choice/dialogue options, odd-one-out items and category-sort item banks should all start shuffled unless their order itself is pedagogically meaningful.
- Mix recognition and production. A session should not become only multiple choice.
- Avoid repeatedly testing words already known well. Weak words should reappear through different exercise types and contexts.
- Prefer realistic Danish someone living in Denmark could use.
- Use Russian glosses where useful for this learner, but do not make every exercise Danish → Russian translation.
- Assume supporting vocabulary can be unknown even in an A1 sentence. Add `glosses` for potentially unfamiliar supporting Danish words so the learner can tap them for a small translation tooltip.
- Glosses are assistance, not answer keys. **Never gloss the target word, blank answer, or decisive answer option before submission if the translation would reveal the answer.**
- Prefer glossing concrete supporting content words (nouns, verbs, adjectives, useful phrases) that are not clearly mastered according to the uploaded CSV. Do not clutter every sentence with translations for obvious function words.
- If a supporting word is outside the uploaded Ordly vocabulary, do not assume the learner knows it merely because it is common. Add a gloss when it matters for understanding the exercise.
- Give immediate, concise feedback.
- For uncertain Danish grammar, pronunciation, idiom or frequency, verify using authoritative Danish sources rather than guessing.
- Do not generate listening exercises or synthesize exercise audio with browser/device text-to-speech. Audio in this app is limited to real per-word recordings referenced by `audio_path` in `learning-stats.csv`.
- When generating a session, copy available recording paths for used vocabulary into `currentSession.audioByWord`. The app signs the learner into the same Supabase project once and requests short-lived URLs from the private `word-audio` bucket.
- Pronunciation audio is supplementary and must only appear after the learner has answered the current exercise, so it can never reveal a hidden target. There is no TTS fallback; a word without a real recording gets no audio button.

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

`learning-stats.csv`
: Canonical latest learner statistics exported automatically from the main Ordly app. Read this fresh before every generated practice session.

`src/session/currentSession.ts`
: The generated session. This is the file that should change most often. Include `audioByWord` entries copied from the latest CSV for vocabulary used in the session when `audio_path` is available.

`src/types.ts`
: Schema for every supported exercise type.

`src/exercises/`
: Reusable exercise implementations. Keep them generic and content-agnostic.

`src/components/`
: Shared visual primitives. `GlossText.tsx` is the standard tap-to-translate renderer for supporting vocabulary.

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
10. `flash-reveal` — active recall, reveal answer, self-rate.

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
