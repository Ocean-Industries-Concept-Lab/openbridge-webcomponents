## [2.0.0-next.19](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/compare/v2.0.0-next.18...v2.0.0-next.19) (2026-05-06)

### Features

- **storybook:** add release channel link in storybook sidebar and intro page ([#821](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/821)) ([f5caf42](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/f5caf420a0c75d569264a187831749b09daf7c09))

## [2.0.0-next.18](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/compare/v2.0.0-next.17...v2.0.0-next.18) (2026-05-04)

### Features

- **navigation-instruments:** add zoomToFitArc to pitch, roll and pitch-roll ([#836](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/836)) ([7438fa9](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/7438fa9dfb1f859023d24041a58241ef005452ff)), closes [#835](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/835)

## [2.0.0-next.17](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/compare/v2.0.0-next.16...v2.0.0-next.17) (2026-05-04)

### ⚠ BREAKING CHANGES

- **instruments:** `rotMaxValue` on `obc-compass`, `obc-compass-sector`,
  and `obc-compass-flat` is now interpreted in **degrees per minute**
  instead of rotations per minute. The default value was bumped from `10`
  to `60` (per ES-TRIN 2025/1 Art. 3.02) to match the new unit. Consumers
  that set `rotMaxValue` explicitly must convert their value: a previous
  `rotMaxValue=10` (rpm) corresponds to `rotMaxValue=3600` (°/min), but
  in practice the typical operating range is `30`–`90` °/min.

Co-authored-by: Copilot <copilot@github.com>

### Features

- **instruments:** add rateOfTurnDegreesPerMinute API and deprecate rotationsPerMinute ([#818](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/818)) ([172943a](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/172943ad298b1740f6dbbe2649a8ef05fef11239)), closes [#802](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/802) [#802](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/802)

## [2.0.0-next.16](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/compare/v2.0.0-next.15...v2.0.0-next.16) (2026-05-04)

### Features

- add wind propulsion radial instrument ([#778](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/778)) ([c0da8af](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/c0da8afb609da11fbb57e87d8a24f70cdf9ae46d)), closes [#745](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/745)

## [2.0.0-next.15](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/compare/v2.0.0-next.14...v2.0.0-next.15) (2026-04-29)

### Features

- **navigation:** add fore image scaling support for pitch-roll and roll component ([#833](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/833)) ([5c1ab7b](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/5c1ab7b266ce8b5e9641f7b1dbeb822b337356ca))

## [2.0.0-next.14](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/compare/v2.0.0-next.13...v2.0.0-next.14) (2026-04-29)

### ⚠ BREAKING CHANGES

- **automation-buttons:** Automation button has new api for badges, allowing more types
- **automation-buttons:** Automation badge has new types, and new names for some types
  duty -> interlock
  AlertOff -> AlertSilenced

### Features

- **automation-buttons:** add new badge api ([#839](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/839)) ([4f08f1c](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/4f08f1c6d9970e6c0183ba90a9cb7e6af2edabbf))

## [2.0.0-next.13](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/compare/v2.0.0-next.12...v2.0.0-next.13) (2026-04-28)

### Bug Fixes

- align action components visual height ([#830](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/830)) ([ef5097d](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/ef5097d47c32f85c687f619fd9ebd864a74abe05))

## [2.0.0-next.12](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/compare/v2.0.0-next.11...v2.0.0-next.12) (2026-04-28)

### Bug Fixes

- **alert-list-page-small:** add silence-click event ([#823](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/823)) ([c8f9526](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/c8f95265e3ab262d11c7e67b5fe996f5e4a1b4ce))

## [2.0.0-next.11](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/compare/v2.0.0-next.10...v2.0.0-next.11) (2026-04-27)

### Features

- **slider-double:** make readouts optional and slottable ([#804](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/804)) ([#816](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/816)) ([501665e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/501665efa03e0b697c4c96f9b9c2648bf707a03c)), closes [#744](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/744)

## [2.0.0-next.10](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/compare/v2.0.0-next.9...v2.0.0-next.10) (2026-04-27)

### Bug Fixes

- **watch:** guard roundedArch to prevent NaN SVG paths ([#822](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/822)) ([ec3fd44](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/ec3fd444555b8a9a6394e247d5c3cb08513b0024)), closes [#819](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/819)

## [2.0.0-next.9](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/compare/v2.0.0-next.8...v2.0.0-next.9) (2026-04-24)

### Features

- **alert-menu:** add props to toggle silence and alert list buttons ([#820](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/820)) ([ea5c320](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/ea5c3204d36554652e8d1fd41eb5b6b2837f0697))

## [2.0.0-next.8](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/compare/v2.0.0-next.7...v2.0.0-next.8) (2026-04-23)

### Bug Fixes

- normalize radial gauge ranges and advice arc rendering ([f0121f8](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/f0121f87715f035d2cbb6f47eb279beee86f04f1)), closes [#808](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/808)

## [2.0.0-next.7](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/compare/v2.0.0-next.6...v2.0.0-next.7) (2026-04-23)

### Bug Fixes

- improve keyboard accessibility for menu and split buttons ([#811](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/811)) ([6a0cfbc](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/6a0cfbcc837a2e748cd3e7bf93b12865a702cd88))

## [2.0.0-next.6](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/compare/v2.0.0-next.5...v2.0.0-next.6) (2026-04-22)

### Bug Fixes

- **compass:** add missing center line to compass-sector and compass-flat ([#798](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/798)) ([858bdf7](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/858bdf70f4bbc551f93cc0bbab24bf269e46414b))

## [2.0.0-next.5](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/compare/v2.0.0-next.4...v2.0.0-next.5) (2026-04-22)

### Features

- **vue-demo:** click-to-copy icon snippets with detail panel ([#790](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/790)) ([032dcad](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/032dcadbd2489fbe0637e18aa73783db29da2eba))

## [2.0.0-next.4](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/compare/v2.0.0-next.3...v2.0.0-next.4) (2026-04-22)

### ⚠ BREAKING CHANGES

- **ar:** new poi position logic (#761)

### Features

- **ar:** new poi position logic ([#761](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/761)) ([61b4b17](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/61b4b177c37ea899cd0ac9d92bcf37fe88570264))

## [2.0.0-next.3](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/compare/v2.0.0-next.2...v2.0.0-next.3) (2026-04-21)

### Bug Fixes

- update font asset paths in Storybook configuration ([#757](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/757)) ([c8f6653](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/c8f6653db8de1ac181da37e750e425e270cb3faf))

## [2.0.0-next.2](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/compare/v2.0.0-next.1...v2.0.0-next.2) (2026-04-21)

### Bug Fixes

- **bundle:** remove spec file from bundle ([#801](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/801)) ([4e3e6c2](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/4e3e6c22d65a930dfa9da295c6b3d3a6defc5012))

## [2.0.0-next.1](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/compare/v2.0.0-next.0...v2.0.0-next.1) (2026-04-20)

### Bug Fixes

- restore visual snapshot testing config ([#799](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/799)) ([a1ef835](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/a1ef8358f2252973b8981d0563357258cf5f6924)), closes [79da15b#diff-98da398d44d37a907da86a76d2cf1d1117ecd4b44096683bb63b349de6b9c303](https://github.com/Ocean-Industries-Concept-Lab/79da15b/issues/diff-98da398d44d37a907da86a76d2cf1d1117ecd4b44096683bb63b349de6b9c303)

## [1.0.0-next.3](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/compare/v1.0.0-next.2...v1.0.0-next.3) (2026-04-20)

### ⚠ BREAKING CHANGES

- **ci:** update GitHub Actions to newer versions of checkout and setup-node steps (#800)

### Features

- **ci:** update GitHub Actions to newer versions of checkout and setup-node steps ([#800](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/800)) ([a85837f](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/a85837f0974cbf81af463c74c8ff9e3882afabdb))

## [1.0.0-next.2](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/compare/v1.0.0-next.1...v1.0.0-next.2) (2026-04-20)

### ⚠ BREAKING CHANGES

- **changelog:** clean up changelog and set the basis as v1.0.0

### Features

- **changelog:** clean up changelog and set the basis as v1.0.0 ([71a4b16](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/71a4b16d03a86ec0540ff8d36a24c21d16ec9309))

### Changelog

All notable changes to this project will be documented in this file. Dates are displayed in UTC.

Generated by [`auto-changelog`](https://github.com/CookPete/auto-changelog).

## 1.0.0 (2026-04-20)

### Initial 1.0.0 Release
