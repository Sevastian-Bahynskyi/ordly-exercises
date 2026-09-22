# Exercise authoring

Read `CHATGPT_WORKFLOW.md` first. Most practice updates should only edit `src/session/currentSession.ts` after analysing the latest root `learning-stats.csv`.

## Source of learner state

`learning-stats.csv` on `main` is the default and authoritative input.

Before authoring a session:

1. fetch the file fresh from the repository;
2. inspect the available scheduling, review, practice and memory-strength fields;
3. favour weak/due/fragile items, then new items;
4. use strong vocabulary mainly as context or occasional interleaving;
5. never substitute statistics remembered from an earlier chat.

If the learner gives only an exercise count, infer the content from these statistics. If no count is given, use 20. If no CEFR level is given, use A1.

## Session shape

A session has a unique `id`, title, subtitle, CEFR level and ordered `exercises` array. The `id` is also the browser persistence namespace. Change it when replacing the session.

Every exercise may include `focusWords`. The end-of-session weak-word summary uses these tags when the learner misses an exercise.

Every exercise may also include `glosses: Record<string, string>`. Keys are visible Danish word forms and values are short learner-language translations, normally Russian for the current learner. The shared `GlossText` component turns those words into subtle tap-to-translate text.

A session should also include `suggestedWords`. Each suggestion has a Danish word, learner-language translation, short Danish example, optional translated example, and optionally `connectsTo` words from the learner's active vocabulary. These are recommendations for what to learn next, not exercises and not automatic additions to Ordly.

## Variety target

For a normal 15–25 exercise session, prefer at least 6 different interaction types. A longer session should normally use 8 or more.

Use difficulty progression rather than random variety:

- recognition: `choice`, `match`, `binary`
- supported use: `drag-gap`, `dialogue`, `category-sort`, `odd-one-out`
- production: `order`, `type`
- active recall: `flash-reveal`, `type`

A weak word can appear twice if the second appearance changes the task. Example: first map `besøge → навещать`, later build `Jeg besøger min ven.`

## Related vocabulary suggestions

Use the latest CSV and the session targets to choose vocabulary that increases expressive range.

- Prefer words not already present in the learner's exported vocabulary.
- Do not simply suggest synonyms of the words being practised.
- Prefer words that form useful phrases, arguments, descriptions or sentence patterns with weak/active vocabulary.
- High-frequency connectors, nouns, verbs and adjectives are usually better than rare topic-specific words.
- Give each suggestion one short natural Danish example that demonstrates the connection.
- For a 1–10 exercise session, normally suggest about 3 words. For 15–25 exercises, usually 4–6. For longer sessions, usually 6–10. Never exceed 20 without an explicit request.
- The completion screen is the normal place to show them.

## Sentence presentation

Prompt sentences must visually read as one sentence. Tap-to-translate glosses may be inline, but the layout must not turn every token or punctuation mark into a separately spaced flex/grid item. Keep normal word spacing, punctuation spacing and line wrapping on iPhone.

## Answer ordering

Treat authored array order as content only, never as a hint.

- Unordered answer options and token banks are shuffled by the exercise engine at runtime. Do not design a task that depends on the first, second or last authored option being shown in that position.
- For `match`, the right-hand meanings must be a true non-aligned shuffle when there is more than one pair: no meaning may initially sit on the same row as its matching Danish word.
- Choice, dialogue, odd-one-out, drag-gap, sentence-order and category-sort banks should start shuffled unless ordering is explicitly part of the learning objective.
- Never disable runtime shuffling merely to make a generated session look deterministic.

## Tap-to-translate supporting words

The learner may understand the target but not every supporting word in the sentence. Do not force them to leave the exercise or guess the context.

- Add `glosses` for supporting Danish words that may be unfamiliar.
- Base this decision on the latest repository `learning-stats.csv`. Words absent from the export can still be unknown.
- Keep translations short and contextual: e.g. `{ besked: 'сообщение' }`.
- Use the exact visible inflected form as the key where possible.
- Never add a pre-answer gloss for the current target/answer if it would reveal what the learner is supposed to recall.
- Avoid glossing every function word. The interface should stay visually quiet.
- Context text in choice, drag-gap, dialogue, typed, binary, odd-one-out and reveal exercises supports gloss rendering. Answer controls should remain answer controls; do not overload them with translation taps that make selection frustrating.
- Gloss tooltips close on any outside tap so they never remain stuck over the exercise.
- If an exercise would require many unknown answer tokens, redesign it with simpler supporting vocabulary rather than making every answer token a dictionary entry.

## A1 constraints

- Prefer one-clause sentences.
- Prefer present tense unless tense itself is the target.
- Keep distractors plausible but not obscure.
- Avoid unnecessary subordinate clauses.
- Reuse high-frequency nouns and verbs so sentence comprehension does not depend on unknown vocabulary.
- Do not expose the answer in headings, focus labels or explanatory copy before submission.

## Drag-gap interaction

Dragging and tapping are equivalent answer methods. Dropping an option into the gap submits it immediately, and tapping an option must also submit it immediately. Do not require a second tap on the gap after the word is already shown there.

## Typed answers

Keep typed answers short at A1: one word, a short phrase, or a very short sentence. List reasonable accepted variants in `accepted`.

## Audio

Do not create listening exercises and do not use browser/device text-to-speech for exercise content.

The CSV may contain `audio_path` for individual words with real recordings stored in Ordly's private Supabase `word-audio` bucket. For vocabulary actually used in a generated session, copy those paths into the session-level `audioByWord` map. The practice app authenticates with the learner's normal Ordly account and creates short-lived signed URLs at runtime. Playback controls appear only after the current exercise has been answered, so pronunciation can never reveal a hidden target. Audio is supplementary pronunciation support, not a separate listening exercise. Never synthesize a fallback; words without a real recording simply have no audio control.
