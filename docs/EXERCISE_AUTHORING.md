# Exercise authoring

Most practice updates should only edit `src/session/currentSession.ts`.

## Session shape

A session has a unique `id`, title, subtitle, CEFR level and ordered `exercises` array. The `id` is also the browser persistence namespace. Change it when replacing the session.

Every exercise may include `focusWords`. The end-of-session weak-word summary uses these tags when the learner misses an exercise.

Every exercise may also include `glosses: Record<string, string>`. Keys are visible Danish word forms and values are short learner-language translations, normally Russian for the current learner. The shared `GlossText` component turns those words into subtle tap-to-translate text.

## Variety target

For a normal 15–25 exercise session, prefer at least 6 different interaction types. A longer session should normally use 8 or more.

Use difficulty progression rather than random variety:

- recognition: `choice`, `match`, `binary`, `listen-choice`
- supported use: `drag-gap`, `dialogue`, `category-sort`, `odd-one-out`
- production: `order`, `type`
- active recall: `flash-reveal`, `type`

A weak word can appear twice if the second appearance changes the task. Example: first map `besøge → навещать`, later build `Jeg besøger min ven.`

## Tap-to-translate supporting words

The learner may understand the target but not every supporting word in the sentence. Do not force them to leave the exercise or guess the context.

- Add `glosses` for supporting Danish words that may be unfamiliar.
- Base this decision on the latest uploaded Ordly CSV when available. Words absent from the export can still be unknown.
- Keep translations short and contextual: e.g. `{ besked: 'сообщение' }`.
- Use the exact visible inflected form as the key where possible.
- Never add a pre-answer gloss for the current target/answer if it would reveal what the learner is supposed to recall.
- Avoid glossing every function word. The interface should stay visually quiet.
- Context text in choice, drag-gap, dialogue, typed, binary, odd-one-out and reveal exercises supports gloss rendering. Answer controls should remain answer controls; do not overload them with translation taps that make selection frustrating.
- If an exercise would require many unknown answer tokens, redesign it with simpler supporting vocabulary rather than making every answer token a dictionary entry.

## A1 constraints

- Prefer one-clause sentences.
- Prefer present tense unless tense itself is the target.
- Keep distractors plausible but not obscure.
- Avoid unnecessary subordinate clauses.
- Reuse high-frequency nouns and verbs so sentence comprehension does not depend on unknown vocabulary.
- Do not expose the answer in headings, focus labels or explanatory copy before submission.

## Typed answers

Keep typed answers short at A1: one word, a short phrase, or a very short sentence. List reasonable accepted variants in `accepted`.

## Listening

`listen-choice` uses browser `speechSynthesis` with `da-DK`. Voice quality depends on the device. It is useful for recognition variety but is not an authoritative pronunciation source. Do not use it to teach fine pronunciation distinctions.
