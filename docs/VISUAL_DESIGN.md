# Visual design rules

This app is iPhone-first and follows the spirit of Apple's current Human Interface Guidelines.

## Principles

1. **Content first.** The exercise is the visual focus. Branding stays small and quiet.
2. **Familiar controls.** Buttons, inputs, progress, navigation and gestures should behave predictably.
3. **Restrained colour.** Purple is the accent for progress, selection and small status elements, not a page-filling brand wash.
4. **Material hierarchy.** Navigation may use translucent glass/backdrop blur. Learning content stays on clear, highly legible surfaces.
5. **Typography does the work.** Use the Apple system stack, large compact headlines, readable body text and minimal all-caps text.
6. **Touch first.** Interactive targets should be at least about 44 CSS px. Drag interactions always require a tap alternative.
7. **Motion with purpose.** Exercise changes, feedback and button presses may use short subtle transitions. No perpetual decorative motion.
8. **Accessibility.** Respect `prefers-reduced-motion`, system light/dark appearance, focus states and readable contrast.
9. **iPhone geometry.** Test 320–430 px widths, safe areas, the iOS keyboard, long Danish words and Russian translations.

## Current shared patterns

- Sticky translucent top toolbar
- Large session title and compact progress counter
- Five-pixel progress track with accent fill
- White/near-black content cards with soft depth
- Rounded 50+ px tap controls
- Semantic green/red feedback surfaces
- Small enter animations and tactile press scaling
- Automatic dark mode

Do not style individual generated sessions differently unless the exercise itself requires a new reusable interaction pattern.


## Generated learning content

Practice content is generated from the latest repository `learning-stats.csv` according to `CHATGPT_WORKFLOW.md`. Session generation should not introduce one-off styling.

Tap-to-translate supporting words are a standard learning interaction. Keep their dotted affordance and tooltip visually subtle so they help comprehension without competing with the target exercise or revealing the answer.
