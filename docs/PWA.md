# PWA / installed app

Ordly Exercises is configured as a standalone Progressive Web App.

## Installed identity

- App name: **Ordly Practice**
- Stable URL: `https://sevastian-bahynskyi.github.io/ordly-exercises/`
- Manifest: `public/manifest.webmanifest`
- Service worker: `public/sw.js`
- Apple Home Screen icon: `public/icons/icon-180.png`
- PWA icons: `public/icons/icon-192.png` and `public/icons/icon-512.png`

The icon source is `public/icon.svg`, using the Danish æ flashcard/speech-bubble artwork generated for this project. `scripts/generate-icons.mjs` renders the required PNG sizes during every build. Keep this visual identity consistent across Apple touch icons, manifest icons and favicons.

## iPhone

Open the GitHub Pages site in Safari, use **Share → Add to Home Screen**, then open it from the new Home Screen icon. iOS should use the explicit `apple-touch-icon` rather than taking a webpage screenshot.

## Desktop

Browsers that support PWA installation use the web app manifest and the 192/512 icons. The service worker gives the site an app-style install/offline shell while keeping network responses fresh when available.

## Future icon changes

If the icon is replaced, regenerate at least 180, 192 and 512 px PNG variants. Keep them square, opaque and readable at small sizes.


## Generated session updates

The installed PWA is the delivery surface, not the source of learner statistics. Ordly writes the latest statistics to the repository's root `learning-stats.csv`; ChatGPT reads that file when the learner asks for a new session and publishes the generated session to this PWA.

The browser does not need GitHub credentials or access to the CSV. See `CHATGPT_WORKFLOW.md`.
