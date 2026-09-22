# Ordly Exercises

A separate, iPhone-first Danish practice app generated and maintained through ChatGPT conversations.

This repository is intentionally independent from `Sevastian-Bahynskyi/ordly`. Ordly is the vocabulary/product app. This repository exists only for interactive practice sessions.

## Workflow

This repo is operated directly from **ChatGPT browser chat**. Local Codex/IDE use is not part of the normal workflow.

The main Ordly application writes the learner's latest statistics to the root file:

`learning-stats.csv`

That file is the canonical input for new practice sessions. The learner does **not** normally upload CSV files in chat anymore.

A normal request can be as short as “create 20 exercises” or “make 15 A1 exercises focused on verbs”. ChatGPT then:

1. fetches the latest `learning-stats.csv` from `main`;
2. analyses weak, due, fragile, new and already-strong vocabulary;
3. generates a varied session at A1 by default unless another level is requested;
4. updates `src/session/currentSession.ts` with a fresh session id;
5. commits to `main`;
6. waits for the final GitHub Pages deployment to succeed;
7. reports that the session is ready at the stable PWA URL.

If no count is given, the default is **20 exercises**.

Supporting Danish words that may be unfamiliar should receive tap-to-translate glosses. The learner can tap an underlined word in context to see a small translation without leaving the exercise. Glosses must never reveal the answer currently being tested.

The exercise screen stays deliberately compact: progress and the current exercise are the focus. At the end of each session, a small generated list of related vocabulary suggests useful new words that combine naturally with what the learner is already practising.

Real word recordings from Ordly can be played after an exercise is answered. The learner signs into the same Supabase account once; the browser then requests short-lived URLs for objects in the private `word-audio` bucket. The Supabase URL and publishable key are public client configuration, so no GitHub Pages secret or service-role key is required.

See [`docs/CHATGPT_WORKFLOW.md`](./docs/CHATGPT_WORKFLOW.md) for the complete operating contract.

Intended public URL:

`https://sevastian-bahynskyi.github.io/ordly-exercises/`

## Stack

- React + TypeScript
- Vite
- `dnd-kit` for touch-friendly drag and drop
- `lucide-react` for interface icons
- GitHub Pages for free static hosting
- Supabase browser auth + private Storage for existing Ordly word recordings
- No custom backend and no paid runtime services

## Exercise library

The reusable engine supports contextual choice, meaning matching, touch drag-and-drop gaps, sentence ordering, typed recall, true/false checks, odd-one-out, category sorting, dialogue selection, and reveal/self-rate recall. It does not generate listening exercises or synthetic speech.

Future sessions should mix formats rather than drilling one interaction repeatedly.

## Important

Read `AGENTS.md` and `docs/CHATGPT_WORKFLOW.md` before changing this repo. The current learning input is `learning-stats.csv`; the generated session is `src/session/currentSession.ts`. Reusable UI should normally remain stable between practice generations.
