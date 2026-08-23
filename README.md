# Magic 8 Ball

A React + TypeScript web app that recreates the classic Magic 8 Ball. Think of a yes-or-no question, trigger the ball, and get one of twenty classic answers. The UI is fully internationalized (English and Spanish), and on mobile you can shake your device to ask.

## Features

- **Classic answers** — All 20 standard Magic 8 Ball responses, grouped as Yes / Maybe / No on the die
- **Platform-aware UX** — Shake on mobile, button + Space key on desktop
- **Internationalization** — English and Spanish via `react-i18next`; language choice persists in `localStorage`
- **Accessible** — Live regions for answers, keyboard support, and automated a11y checks with `vitest-axe`
- **Design tokens** — Shared CSS custom properties in `src/styles/tokens.css`

## Prerequisites

- **Node.js 26+** (see `.nvmrc`). If you use [nvm](https://github.com/nvm-sh/nvm): `nvm use`

## Quick start

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

To build and preview a production bundle:

```bash
npm run build
npm run preview
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Typecheck and build for production (`dist/`) |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run all tests once (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run typecheck` | TypeScript check only |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint with auto-fix |

Before opening a PR, run `npm run lint`, `npm run typecheck`, and `npm test` — CI runs the same checks on every push to `main`.

## Using the app

| Platform | How to ask |
|----------|------------|
| **Desktop** | Click **Ask the ball** or press **Space** |
| **Mobile** | Shake the device, or tap **Or tap to ask** |

Use the **EN / ES** toggle in the header to switch languages. The ball shows a brief “revealing” animation (~1.5 s) before the answer appears on the slip below.

> **Note:** Shake detection uses the `devicemotion` API. It requires a real mobile device (or a browser that exposes motion events). It will not work in most desktop browser devtools device emulation.

## Project structure

```
src/
  main.tsx              # React entry; loads i18n before App
  App.tsx               # Main layout and platform-specific UI
  App.css               # Component styles (uses design tokens)
  magic8ball.ts         # Response keys, random picker, verdict mapping
  constants.ts          # Shared timing constants
  components/
    Ball.tsx            # The 8 Ball visual
    LanguageSelector.tsx
    icons.tsx
  hooks/
    useRevealAnswer.ts  # Answer reveal state and animation timing
    useShake.ts         # Device shake detection
    useAskKey.ts        # Space key shortcut (desktop)
    useIsMobile.ts    # Mobile vs desktop detection
  i18n/
    index.ts            # i18next setup and localStorage persistence
    locales/
      en.json           # English strings
      es.json           # Spanish strings
  styles/
    tokens.css          # Design tokens (colors, spacing, typography)
  test/
    setup.ts            # Vitest setup
    axe.ts              # Accessibility test helpers
public/                 # Static assets (favicons, etc.)
```

Path alias `@/` maps to `src/` (configured in `vite.config.ts` and `tsconfig.json`).

## How it works

1. **`magic8ball.ts`** holds the canonical list of 20 response keys (`SCREAMING_SNAKE_CASE`). UI strings live in locale files under `responses.<KEY>` — never in the logic module.
2. **`useRevealAnswer`** picks a random key, runs a short delay, then sets status to `revealed`.
3. **`useShake`** listens for acceleration spikes via `devicemotion` (enabled only on mobile).
4. **`useAskKey`** binds Space to the same reveal action on desktop.
5. **`Ball`** displays the die verdict (Yes / Maybe / No) derived from the full response key.

## Internationalization

All user-facing copy goes in `src/i18n/locales/en.json` and `es.json`. To add a language:

1. Add a new locale JSON file.
2. Register it in `src/i18n/index.ts`.
3. Extend `LanguageSelector.tsx`.

Response keys in `magic8ball.ts` must have matching entries in every locale file under `responses`.

## Testing

Tests use [Vitest](https://vitest.dev/) with `@testing-library/react` for hooks and components. Accessibility tests use `vitest-axe` (see `*.a11y.test.tsx` files).

```bash
npm test              # run once
npm run test:watch    # watch mode
```

Test files are colocated next to the modules they cover (e.g. `useShake.test.ts` beside `useShake.ts`).

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 8](https://vite.dev/) for dev and build
- [i18next](https://www.i18next.com/) / [react-i18next](https://react.i18next.com/) for translations
- [react-device-detect](https://www.npmjs.com/package/react-device-detect) for mobile detection
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) for tests

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs lint, typecheck, test, and build on pushes and pull requests to `main`. Dependabot keeps npm dependencies up to date.
