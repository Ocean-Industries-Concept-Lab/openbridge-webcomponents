---
paths:
  - "packages/connector-diagram/**"
---

<!-- GENERATED FILE — DO NOT EDIT.
     Source: docs/agents/connector-diagram.md
     Regenerate: npm run agents:sync -w packages/openbridge-webcomponents -->

# connector-diagram

`packages/connector-diagram` is a TypeScript library that draws pipe segments
onto a `CanvasRenderingContext2D` (`renderSegments`). It has no runtime
dependencies, registers no `<obc-*>` element and has no custom-elements
manifest, so the core's `analyze`, wrapper and JSDoc tooling do not apply.

## Rules

- Colours reach the drawing code as a `ThemeVars` object, built by
  `themeFromCss` from the palette custom properties. Drawing code never reads
  CSS; `DEFAULT_THEME` is the fallback for a page without the stylesheet.
- The package has no Prettier or ESLint configuration and no lint-staged
  entry, so `format:check` and `lint` do not cover it.
- `npm run typecheck` covers `src/` but excludes tests and stories; vitest runs
  the tests without type-checking them.

## Build and test

From `packages/connector-diagram`:

```bash
npm run typecheck        # tsc --noEmit
npm test                 # unit project (node)
npm run build            # tsc to dist/
npm run storybook        # Storybook on port 6007
npm run test-storybook   # snapshot project (Playwright)
```

CI runs `typecheck` and `test` in the lint job of `build.yml`, and the
snapshot project in the `connector-diagram` job of `visual-testing.yml`.

`npm run example` serves `example/`, which imports the core's `dist/`: build
the core first.

## Snapshot baselines

The package has its own Storybook and its own baselines under
`__vis__/linux/__baselines__/`, keyed by story file path. Regenerate them on
Linux with the filter before `--update`, then re-run without it, as in
[`testing-visual.md`](../../docs/agents/testing-visual.md):

```bash
npx vitest run --project storybook corner --update
npx vitest run --project storybook corner
```

## Dependencies and the root lockfile

- The package is a workspace member; the root `package-lock.json` pins its
  dependencies.
- `storybook`, `@storybook/addon-vitest`, `@storybook/html` and
  `@storybook/html-vite` are pinned to the version the root lock resolves for
  the core. A caret range resolves a newer Storybook and nests a second copy.
- `@oicl/openbridge-webcomponents` is `"*"`: `build.yml` rewrites the core
  version before its `npm install`, and a caret range stops matching the
  workspace copy.
- Update the root lock with the generated wrapper `package.json` files present
  (`npm run build:full` in the core writes them); without them, `npm install`
  drops the wrapper workspaces from the lock. Check the lock diff afterwards:
  wrapper version lines follow those generated files, which can lag the
  release.
