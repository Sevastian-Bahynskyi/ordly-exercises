# Ordly Exercises

A separate, iPhone-first Danish practice app generated and maintained through ChatGPT conversations.

This repository is intentionally independent from `Sevastian-Bahynskyi/ordly`. Ordly is the vocabulary/product app. This repository exists only for interactive practice sessions.

## Workflow

This repo is intended to be operated directly from **ChatGPT browser chat**. Local Codex/IDE use is not part of the normal workflow.

1. The learner uploads a fresh Ordly CSV export in ChatGPT and asks for a number/type of exercises.
2. ChatGPT analyses weak, due, new and already-strong vocabulary from the export.
3. ChatGPT designs a varied session at the learner's current level, A1 by default.
4. ChatGPT regenerates `src/session/currentSession.ts`, reusing the permanent exercise engine and components.
5. ChatGPT commits the changes to `main`.
6. GitHub Pages republishes the same stable URL.
7. Session progress persists in browser `localStorage` on the same device/browser.

Supporting Danish words that may be unfamiliar should receive tap-to-translate glosses. The learner can tap an underlined word in context to see a small translation without leaving the exercise. Glosses must never reveal the answer currently being tested.

Intended public URL:

`https://sevastian-bahynskyi.github.io/ordly-exercises/`

## Stack

- React + TypeScript
- Vite
- `dnd-kit` for touch-friendly drag and drop
- `lucide-react` for interface icons
- GitHub Pages for free static hosting
- No backend and no paid runtime services

## Exercise library

The reusable engine supports contextual choice, meaning matching, touch drag-and-drop gaps, sentence ordering, typed recall, true/false checks, odd-one-out, category sorting, dialogue selection, listening-style recognition, and reveal/self-rate recall.

Future sessions should mix formats rather than drilling one interaction repeatedly.

## Important

Read `AGENTS.md` before changing this repo. The current session data is in `src/session/currentSession.ts`; reusable UI should normally remain stable between practice generations.
