# Ordly Exercises

A separate, iPhone-first Danish practice app generated and maintained through ChatGPT conversations.

This repository is intentionally independent from `Sevastian-Bahynskyi/ordly`. Ordly is the vocabulary/product app. This repository exists only for interactive practice sessions.

## Workflow

1. The learner sends ChatGPT an updated Ordly export or describes what should be practised.
2. ChatGPT analyses weak, due, new and already-strong vocabulary.
3. ChatGPT regenerates `src/session/currentSession.ts` using reusable exercise components.
4. Changes are pushed to `main`.
5. GitHub Pages deploys the app at one stable URL.
6. Session progress persists in browser `localStorage` on the same device/browser.

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
