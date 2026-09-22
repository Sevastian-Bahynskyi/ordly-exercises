# Exercise authoring

Most practice updates should only edit `src/session/currentSession.ts`.

## Session shape

A session has a unique `id`, title, subtitle, CEFR level and ordered `exercises` array. The `id` is also the browser persistence namespace. Change it when replacing the session.

Every exercise may include `focusWords`. The end-of-session weak-word summary uses these tags when the learner misses an exercise.

## Variety target

For a normal 15–25 exercise session, prefer at least 6 different interaction types. A longer session should normally use 8 or more.

Use difficulty progression rather than random variety:

- recognition: `choice`, `match`, `binary`, `listen-choice`
- supported use: `drag-gap`, `dialogue`, `category-sort`, `odd-one-out`
- production: `order`, `type`
- active recall: `flash-reveal`, `type`

A weak word can appear twice if the second appearance changes the task. Example: first map `besøge → навещать`, later build `Jeg besøger min ven.`

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
