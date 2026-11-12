---
paths:
  - "packages/openbridge-norvar/**"
---

<!-- GENERATED FILE — DO NOT EDIT.
     Source: docs/agents/norvar.md
     Regenerate: npm run agents:sync -w packages/openbridge-webcomponents -->

# openbridge-norvar

`packages/openbridge-norvar` (`@oicl/openbridge-norvar`) holds the components
that draw the symbols of NORVAR report 153/2007 from Norsk Vann BA. They are
not part of the OpenBridge standard, which is why they live outside the core
package, have their own Storybook, and have tags without the `obc-` prefix.

## Rules

- **Import the core from its `dist/`**, by package name:
  `@oicl/openbridge-webcomponents/dist/automation/automation-button/automation-button.js`.
  Never a relative path into `packages/openbridge-webcomponents/src`. The
  package is built, typechecked, tested and rendered against the core's
  build output, so build the core first: `npm run build` in
  `packages/openbridge-webcomponents` (or `build:ts:watch` while editing it).
- **No component of the OpenBridge standard goes here, and no NORVAR
  component goes into the core.** A core helper a NORVAR component needs is
  exported from the core's build, not copied.
- **The class names keep the `Obc` prefix** (`ObcNorvarValve`); only the tag
  drops it. Renaming a class is a breaking change of the package's API.
- Stories are titled `Components/<Name>`. The landing page is
  `docs/Introduction.mdx`; it states that the package is outside the
  OpenBridge standard and links the report and the core's Storybook.
- `.storybook/preview.ts` copies the core's theme attribute, size class and
  backgrounds, and `src/storybook-util.ts` the core's `crossDecorator`, so a
  story renders as it would in the core's Storybook. Change them with the
  core's.

## The components

`norvar-valve` draws the valve symbols.

- **The art and the actuators are its own** (`norvar-valve-art.ts`, `NorvarValveActuator`), so they stay out of the core's `ObcValveHandle` and of the standard valves.
- **The triangles show the alarm, the middle field the position.** `progress` draws the middle position, which the design file calls `NORVAR-valve-caution`.

`norvar-water-station`, `norvar-wastewater-station` and `norvar-map-symbol` take their symbols from the same report. They share `ObcNorvarStationBase` and `norvar-station-art.ts`.

- **The shape follows the network:** water is square, wastewater round, and the symbols are drawn for that shape. `norvar-map-symbol` holds the symbols of neither network and takes the shape from the symbol: the discharge point is round, the rest square.
- **The state colours the symbol:** `state` gives black, green or grey, `alert` red with a darker outline. An unmonitored symbol also gets the grey button of a static device, through the base's `_static` getter. There is no state row. `flat` is the default, like `norvar-valve`.
- **`static` shows the medium:** light blue for water; brown or grey for wastewater, chosen by `medium`; grey for the map symbols, which carry none.

## Build and test

From `packages/openbridge-norvar`, after building the core:

```bash
npm run check            # typecheck, format:check, the browser specs
npm run build            # tsc to dist/
npm run storybook        # Storybook on port 6008
npm run test-storybook   # snapshot project (Playwright)
```

CI runs `check`'s members in the `openbridge-norvar` job of `build.yml` and
the snapshot project in the `openbridge-norvar` job of `visual-testing.yml`.
Baselines live under `__vis__/linux/__baselines__/`, keyed by story file
path; regenerate them on Linux as in [`testing-visual.md`](../../docs/agents/testing-visual.md).

## Release

`.releaserc.json` releases the package with the core, at the core's version:
`scripts/prepare-wrappers.js` stamps the version and the `^version` core
dependency, then builds it. Its `@semantic-release/npm` entry has
`npmPublish: false` until the package goes public; remove that flag to start
publishing.

The Storybook deploys from `firebase-hosting-merge.yml`: develop to
`openbridge-next-norvar-storybook`, stable to `openbridge-norvar-storybook`.
