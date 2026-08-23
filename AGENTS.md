# AGENTS.md

Operating guide for AI coding agents working in this repo.

## What this repo is

A React + TypeScript Magic 8 Ball web app. Users think of a question and reveal a random classic 8 Ball answer. On mobile, shaking the device triggers the answer. On desktop, a button triggers it. All user-facing copy is internationalized (English and Spanish).

## Hard constraints

- **Node ≥ 18**, ESM only (`"type": "module"`). No CommonJS.
- **TypeScript everywhere** in `src/`. Use `type`, not `interface`, for object shapes.
- **Tests use Vitest** with `@testing-library/react` for hooks. Do not add Jest or Mocha.
- **i18n is mandatory** for all user-facing strings. Use `react-i18next`; never hardcode UI copy in components.
- **No new runtime dependencies** without justification. Current runtime deps: `react`, `react-dom`, `i18next`, `react-i18next`, `react-device-detect`.
- **CSS design tokens** live in `src/styles/tokens.css`. Use `var(--token-name)` in component styles; do not introduce one-off hex values in component CSS.

## Commands

```bash
npm install
npm run dev          # Vite dev server
npm test             # vitest run
npm run test:watch   # vitest in watch mode
npm run typecheck    # tsc -b
npm run build        # tsc -b && vite build
npm run preview      # preview production build
```

Run `npm test` and `npm run typecheck` after changes to hooks, components, or `magic8ball.ts`.

## Layout

```
src/
  main.tsx                     # React entry, imports i18n before App
  App.tsx                      # Main view, platform-specific UX
  App.css                      # App layout and component styles (uses tokens)
  magic8ball.ts                # Response keys + random picker (no UI strings)
  components/
    LanguageSelector.tsx       # Header language toggle (EN / ES)
  hooks/
    useShake.ts                # DeviceMotion shake detection
    useIsMobile.ts             # Mobile vs desktop detection
  i18n/
    index.ts                   # i18next setup, localStorage persistence
    locales/
      en.json                  # English translations
      es.json                  # Spanish translations
  styles/
    tokens.css                 # Design tokens (colors, spacing, typography)
```

Keep hooks focused and testable. Do not put i18n strings in `magic8ball.ts` — use stable response keys and translate via `responses.<KEY>` in locale files.

## Platform behavior

| Platform | Detection | Trigger | UI |
|----------|-----------|---------|-----|
| Mobile | `useIsMobile()` | Shake via `useShake` | Shake hint, no ask button |
| Desktop | `!useIsMobile()` | "Ask the 8 Ball" button | Button + desktop hint |

- Enable `useShake` only when `isMobile` is true (`enabled: isMobile`).
- The ball is display-only (`role="img"`). Do not make it the primary desktop CTA.
- Subtitles and hints must differ by platform (`subtitleMobile` / `subtitleDesktop`, etc.).

## Mobile detection

`useIsMobile` wraps [`react-device-detect`](https://www.npmjs.com/package/react-device-detect) (`isMobile`). Do not add custom user-agent or viewport heuristics — use the package.

## Shake detection

`useShake(onShake, options?)` listens to `devicemotion` and fires `onShake` when acceleration delta exceeds `threshold` (default `15`), respecting `cooldownMs` (default `1000`). Disable with `enabled: false` on desktop.

## Internationalization

- All UI strings go in `src/i18n/locales/en.json` and `es.json`.
- Magic 8 Ball answers use keys from `MAGIC_8_BALL_RESPONSE_KEYS` in `magic8ball.ts`, translated under `responses.<KEY>`.
- Language preference persists in `localStorage` (`magic8ball-language`).
- `LanguageSelector` lives in the page header. Update `document.documentElement.lang` on change (handled in `src/i18n/index.ts`).
- When adding a new language, add a locale file, register it in `src/i18n/index.ts`, and extend `LanguageSelector`.

## Magic 8 Ball responses

- `magic8ball.ts` exports `MAGIC_8_BALL_RESPONSE_KEYS`, `Magic8BallResponseKey`, and `getRandomMagic8BallResponseKey()`.
- Response keys are `SCREAMING_SNAKE_CASE` and map 1:1 to i18n keys.
- Renaming a response key is a breaking change for locale files and any stored state.

## TypeScript style

- Prefer `type` over `interface`.
- Named exports only; no default exports except `App` (Vite convention).
- Strict mode is on. Do not use `any`.
- Colocate tests as `*.test.ts` next to the module under test.

## CSS and design tokens

Design tokens are defined in `src/styles/tokens.css` as CSS custom properties on `:root`.

| Category | Token prefix | Examples |
|----------|--------------|----------|
| Colors | `--color-*` | `--color-text`, `--color-primary` |
| Typography | `--font-*`, `--line-height-*` | `--font-size-lg`, `--line-height-tight` |
| Spacing | `--space-*` | `--space-4`, `--space-8` |
| Radius | `--radius-*` | `--radius-full` |
| Shadows | `--shadow-*` | `--shadow-button` |
| Motion | `--duration-*`, `--ease-*` | `--duration-fast` |
| Layout | `--size-*`, `--layout-*` | `--size-ball`, `--layout-max-text` |

Rules:

- Import `tokens.css` once from `main.tsx` before component styles.
- Use semantic token names, not raw values, in `App.css` and future stylesheets.
- Add new tokens to `tokens.css` before using a new color, spacing step, or font size elsewhere.
- Use BEM-style class names for components (e.g. `ball__window`, `language-selector__button--active`).

## Accessibility

- Use `aria-live="polite"` for revealed answers.
- Provide `aria-label` / `aria-pressed` where interactive controls need context.
- Keep sufficient color contrast against the dark theme.

## What not to do

- Do not hardcode English or Spanish strings in JSX/TSX.
- Do not use `interface` for new object shapes.
- Do not add shake handling on desktop as the primary interaction.
- Do not put translated response strings in `magic8ball.ts`.
- Do not add inline styles or hardcoded colors when a token exists or should exist.
- Do not commit `dist/` or `node_modules/`.
