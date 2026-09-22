# ChatGPT practice workflow

This repository is operated primarily through **ChatGPT browser chat**.

The learner should not normally need to upload vocabulary data into the chat. The main Ordly application can export the latest learning state directly into this repository as:

`learning-stats.csv`

That file is the canonical input for generated practice sessions.

## Normal user interaction

The learner can make a short request such as:

- “Create 20 exercises.”
- “Create 30 A1 exercises.”
- “Give me 15 exercises focused on verbs.”
- “Make today’s practice slightly harder.”
- “Create a short 10-minute session.”

No repository instructions, CSV attachment, exercise format list, or implementation details should be required from the learner.

## Required ChatGPT flow

For every request to create or regenerate a practice session:

1. Fetch the latest `learning-stats.csv` from the `main` branch of `Sevastian-Bahynskyi/ordly-exercises` immediately before analysing the learner.
2. Do not rely on a CSV remembered from an earlier conversation or an earlier repository read.
3. Parse the available learning signals, including word/phrase identity, learning status, review history, practice history, recall/stability information, due state, memory tier and timestamps when present. In `practice_history_json`, distinguish supported choice/reveal evidence from unaided typed production and look for repeated skill-specific failures such as grammar, word order or collocation.
4. Prioritise:
   - weak or repeatedly missed items;
   - items currently due;
   - fragile/building vocabulary;
   - a controlled amount of new vocabulary.
5. Use strong/mastered vocabulary mainly as supporting context or occasional interleaving. Do not waste the session repeatedly testing words that are already secure.
6. Respect explicit user instructions for count, level, focus, exercise type or difficulty. If the user gives no level, default to **A1**. If the user gives no count, default to **20 exercises**.
7. Generate a varied session using the reusable exercise engine. A normal session should mix recognition, supported use, production and active recall rather than repeating one interaction.
8. Generate a small `suggestedWords` set for the completion screen. Choose useful new words that combine naturally with the session's weak/active vocabulary, preferably words absent from the latest CSV. Avoid synonym lists; favour vocabulary that broadens sentence-building possibilities. Include short Danish examples and learner-language translations. Scale the count with session length, from about 3 for a very short session up to at most 20 for unusually long sessions.
9. Add adaptive-evidence metadata before publishing: create a UUID `evidenceSessionId`, copy `entry_id` values from the latest CSV into `entryIdByWord` for vocabulary actually assessed, and tag each exercise with `evidenceWords` plus an `evidenceSkill`. Do not mark merely supporting/context words as assessed.
10. Keep the current learner support rules:
   - iPhone-first;
   - short, realistic Danish;
   - tap-to-translate glosses for potentially unknown supporting vocabulary;
   - never gloss the current target/answer before submission when that would reveal it;
   - concise immediate feedback;
   - compact practice layout: progress + exercise, without a large session hero/title block;
   - sentence prompts rendered as continuous natural text rather than visibly separated word chunks;
   - no listening exercises or browser/device text-to-speech;
   - copy available `audio_path` values for vocabulary used in the session into `currentSession.audioByWord`; real recordings are offered only after an exercise is answered through authenticated access to the private Supabase `word-audio` bucket.
11. Replace `src/session/currentSession.ts` with the newly generated session and assign a new unique `session.id`.
12. Reuse the existing UI/components unless a genuinely new learning interaction is needed.
13. Commit the changes to `main`.
14. Verify the GitHub Pages workflow for the final commit. Do not report the session as ready until the final deployment succeeds. If deployment fails, inspect the failure and fix it.
15. Report completion concisely to the learner. The normal completion message should say the session is ready and give the stable app URL.

Stable app URL:

`https://sevastian-bahynskyi.github.io/ordly-exercises/`

## If learning-stats.csv is unavailable

If `learning-stats.csv` does not exist, is empty, or cannot be parsed:

- do not silently generate from stale remembered statistics;
- do not pretend the latest state was read;
- tell the learner to open Ordly Material and use **Save to GitHub**, then retry.

A chat-uploaded CSV may still be used when the learner explicitly provides one and asks to use it, but the repository CSV is the default source.

## Data ownership boundary

`Sevastian-Bahynskyi/ordly`
: the actual Ordly vocabulary/product application. It produces learning data and can export it.

`Sevastian-Bahynskyi/ordly-exercises`
: the separate ChatGPT-managed practice application. It consumes `learning-stats.csv` and publishes generated practice sessions.

Do not add the practice-generation engine to the main Ordly product merely because Ordly now writes the CSV here.

## CSV update behaviour

Ordly creates or updates the same root file:

`learning-stats.csv`

Each new **Save to GitHub** action may therefore create a new commit without changing the path. Always read the current file from `main`; do not pin generation logic to a historical commit.

The practice app itself does not need to read the CSV at runtime. ChatGPT reads the CSV while authoring the next static session, then publishes that session to GitHub Pages. This keeps the installed PWA simple and free of backend/runtime credentials.
