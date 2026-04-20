## 1.0.0-next.1 (2026-04-20)

### ⚠ BREAKING CHANGES

* removed obc-context-menu. Use obc-context-input-menu (#737)
* **automation-button:** `progress` boolean on automation-button no longer renders
a simple spinner; use `progressMode` and `progressValue` to control behavior. Fix typo `icon-siluette` --> `icon-silhouette`
* Remove `hinted` variant from TickmarkStyle enum.
All internal references replaced with `regular`. Consumers using
`TickmarkStyle.hinted` must switch to `TickmarkStyle.regular`.

Affected components and modules:
- tickmark.ts, tickmark-flat.ts: enum + tickmarkColor()
- watch.ts, instrument-radial.ts: new property + forwarding
- advice.ts (watch, instrument-linear, thruster, external-scale):
  AdviceState.hinted mapping now uses TickmarkStyle.regular
- compass/radial-tickmark.ts, thruster.ts, watch-flat.ts: defaults
- All 6 story files: added tickmarkStyle argType + meta.args default
* remove duplicate components (#662)
* All negative boolean properties have been renamed to positive
(affirmative) phrasing so the default value is `true` and opt-out is explicit.
All renamed properties use `attribute: false` (JS-only, no HTML attribute).
CSS class names are unchanged; only the JS logic was flipped.

## Renamed Properties

| #  | Component(s)                      | Old                      | New                      | Default | attribute: false |
|----|-----------------------------------|--------------------------|--------------------------|---------|------------------|
| 1  | obc-communication-table           | noLeadingIcon            | showLeadingIcon          | true    | Yes              |
| 2  | obc-communication-table           | noLabel                  | showLabel                | true    | Yes              |
| 3  | obc-communication-table           | noActionIcon             | showActionIcon           | true    | Yes              |
| 4  | obc-card                          | noTitle                  | showTitle                | true    | Yes              |
| 5  | obc-topbar-message-item           | hideTitle                | showTitle                | true    | Yes              |
| 6  | obc-topbar-message-item           | hideDescription          | showDescription          | true    | Yes              |
| 7  | obc-topbar-message-item           | hideTimestamp            | showTimestamp            | true    | Yes              |
| 8  | obc-toggle-button-option          | noDivider                | showDivider              | true    | No (reflect)     |
| 9  | obc-event-list                    | hideHeader               | showHeader               | true    | Yes              |
| 10 | obc-command-menu                  | hideLocation             | showLocation             | true    | Yes              |
| 11 | obc-textarea-field                | hideLabel                | showLabel                | true    | Yes              |
| 12 | obc-textarea-field                | hideToolbar              | showToolbar              | true    | Yes              |
| 13 | obc-textarea-field                | hideVoiceRecording       | showVoiceRecording       | true    | Yes              |
| 14 | obc-toggle-button-vertical-option | noDivider                | showDivider              | true    | No (reflect)     |
| 15 | obc-clock                         | noClick                  | isClickable              | true    | Yes              |
| 16 | obc-notification-message-item     | hideTitle                | showTitle                | true    | Yes              |
| 17 | obc-notification-message-item     | hideDescription          | showDescription          | true    | Yes              |
| 18 | obc-notification-message-item     | hideTimestamp            | showTimestamp            | true    | Yes              |
| 19 | obc-advice-message-item           | hideTitle                | showTitle                | true    | Yes              |
| 20 | obc-advice-message-item           | hideDescription          | showDescription          | true    | Yes              |
| 21 | obc-advice-message-item           | hideTimestamp            | showTimestamp            | true    | Yes              |
| 22 | obc-app-button                    | hideLabel                | showLabel                | true    | Yes              |
| 23 | obc-elevated-card                 | notClickable             | isClickable              | true    | Yes              |
| 24 | obc-badge                         | hideNumber               | showNumber               | true    | Yes              |
| 25 | obc-sequence-item                 | hideStepInputConnector   | showStepInputConnector   | true    | Yes              |
| 26 | obc-sequence-item                 | hideStepOutputConnector  | showStepOutputConnector  | true    | Yes              |
| 27 | obc-sequence-step                 | hideStepInputConnector   | showStepInputConnector   | true    | Yes              |
| 28 | obc-sequence-step                 | hideStepOutputConnector  | showStepOutputConnector  | true    | Yes              |
| 29 | obc-tab-item                      | badgeHideNumber          | badgeShowNumber          | true    | Yes              |

## Consumer / pass-through updates

- **obc-tab-row** (`TabData` interface): `badgeHideNumber` → `badgeShowNumber`; binding fixed from `|| false` to `?? true`
- **obc-toggle-button-group**: divider logic inverted (`option.showDivider = true` / `nextOption.showDivider = false`)
- **obc-toggle-button-vertical-group**: divider logic inverted (`opt.showDivider = idx !== last`)
- **obc-sequence-toolbar**: pass-through bindings flipped
- **obc-sequence-card**: pass-through bindings flipped
- **command-menu.stories.ts**: wrapper class property renamed, added `showLocation: true` to meta args

## CSS changes

- **toggle-button-group.css**: `::slotted([nodivider])::before` → `::slotted(:not([showdivider]))::before`

## Story updates

- All story files updated: property names renamed, boolean values flipped, `?hideX` attribute bindings → `.showX` property bindings
- **app-button.stories.ts**: `SmallHidelabel` → `SmallHideLabel` (casing fix); added `showLabel: true` to meta args
- **command-menu.stories.ts**: added `showLocation: true` to meta args
- **integration-app-bar.stories.ts**: `hidelabel` HTML attribute → `.showLabel=${false}` property binding
- **textarea-field.stories.ts**: added `?? true` fallback to `.showToolbar` and `.showVoiceRecording` bindings
- **badge.stories.ts**: bare `hideNumber` attributes → `.showNumber=${false}` property bindings
- **diagram-playground.stories.ts**: local variables renamed (`hideInputConnector` → `showInputConnector`) with inverted logic
- **sequence-step.stories.ts**: `.hideStepInputConnector=${!variant.hasInput}` → `.showStepInputConnector=${variant.hasInput}` (double negation simplified)

## JSDoc updates

- All JSDoc comments updated to reference new property names
- **toggle-button-option / toggle-button-vertical-option**: eslint-disable added for `prefer-boolean-property-default-false` (legitimate `reflect: true` + default `true`)
- **badge.ts**: removed redundant `!!` on `this.showNumber`
- **elevated-card.ts**: all `notClickable` references updated to `isClickable` with inverted phrasing

## Other fixes

- **react-demo/PoiTargetsWrapper.tsx**: updated stale import (`ObcPoiTarget` → `ObcPoiData`, `height` → `y`) — unrelated to boolean rename but fixed broken build
- **custom-elements.json**: regenerated, 0 old property names remain
- Snapshot baselines updated

* address @coderabbitai comments

* keep JSDoc consistent with the positive boolean pattern
* The public property names listed above have changed
on all affected instrument and chart components.

* feat: add tertiary tickmark interval support across instruments

* fix 'autoAtSetpoint' rename errors

* address @coderabbitai comments

* address minor @coderabbitai comments
* **new API:** instrument API update (#577)
* some properties for setpoints are renamed for consistency (SetPoint -> Setpoint)

* feat: mixin to unify instrument setpoint behavior

* fix duplicate imports

* remove inline comments and deprecated properties

* address coderabbit comments: JSDoc updates

* address Torstein's feedback

* address coderabbit comments

* adjust setpoint and SVG coordinate system for linear instruments

* unify usage of the setpoint mixin in linear instruments
* TopBar: the clock in the topbar must now be added by use of slot instead of the prop
* TopBar: the clock in the topbar must now be added by use of slot instead of the prop
* use props for optional slots (#247)
* make prop for optional icons (#245)
* files imported from the vue wrapper must now end with .vue
* all multi word attributes has changed names from "multi-word" into "multiWord"

### Features

* abstract automation button ([#200](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/200)) ([49213bc](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/49213bc9b846073dbde35eeeaed4a910231e3edf))
* ack alarms in demo ([d377466](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/d377466ece783e707503286e2d8ea623bd9f9ec5))
* add 44px touch target for the slider button in start stop switch ([d0dd2cc](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/d0dd2cc8c0302f5e16eb3dee4afdb8e514a71627))
* add accordion item component with styles and stories ([465a1aa](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/465a1aa11bc8aeff509a21f52a0763b0b02657b8))
* add advice button component with various styles and snapshot images ([0c9d9be](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/0c9d9bed869dfb79ec160d4c480276b564dcdc12))
* add advice floating and message item components with styles ([e1947f8](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/e1947f8dfc3efdf8b607731bbe1d53bf36ea8b41))
* add alertlist ([ad1283f](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/ad1283f08bd10490b3a67df54f23d637bd8499dd))
* add all icons ([754ddc6](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/754ddc6a699a752cc2f6dca684f5535521a77088))
* add audio recording item component with styles and Storybook stories ([bb1d136](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/bb1d136caf007138b99185e56cbb22a2a3fb7f62))
* add auto-disable functionality to slide button component ([2142591](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/2142591ede049453a855041a68ed7519d5a6fee7))
* add baseline images for text and number input field components ([83600a5](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/83600a5a02f5b1f50f6bd9cdc02277b20c6fef27))
* add breadcrumb and pixel perfect ([0d4bf6f](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/0d4bf6fcdac5c0a5a92d6240a9bbacc235c5b52c))
* add build step for openbridge-webcomponents in release workflow ([#639](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/639)) ([fd1de26](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/fd1de26986235b57fe19523329dff72336592789))
* add centerContent property to tab-item component for flexible badge alignment ([93babbf](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/93babbf89315c6164e349a25914840f21e4a4669))
* add checked button variant ([#25](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/25)) ([ebee8ff](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/ebee8ffcaef3345f159449b3980a903d5b4bee40))
* add configurable tickmarkStyle property to radial instruments ([#666](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/666)) ([12ed2a9](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/12ed2a9f8167c7e2bedd46d8ff7aea5b55693c2b))
* add detailed documentation and properties for accordion item component ([546c976](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/546c97645c03d4e8a6b49e6e46eb8d39dc55d674))
* add disabled property to icon button  ([#16](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/16)) ([7c8af4c](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/7c8af4c1ada2f500dd0bf2a680231aedf2ca493d))
* add disabled state support to toggle button vertical ([67ca795](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/67ca795fc6923dc4dd2462052fad42517b140e4d))
* add electric devises obc-router, obc-resistor, obc-capacitor, obc-logic, obc-ground, obc-diodes, obc-converter, obc-filter, obc-bipolar-transistor, obc-mosfet, obc-transformer, obc-source ([#557](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/557)) ([5e11df3](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/5e11df3f1b11f1dedb1d0f9baf99b30268ad97e2))
* add emtpy styling when show icon and show number is false ([aa8499d](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/aa8499d08f289f9b0a7ac7d48ea960fd6d301b88))
* add error state story and improve event documentation for textarea field ([8c7da00](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/8c7da0059d0fc78ce5df5401fc84c3444f087d18))
* add event name to brilliance menus events ([#82](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/82)) ([3c5092d](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/3c5092d56e6644e3c940a433c675ba1859ce6dce))
* add heading instrument ([#396](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/396)) ([12978c6](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/12978c66c3b3f1b2218dfcc41d539f4981a74bfe))
* add Husky pre-commit hook ([#499](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/499)) ([c642afa](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/c642afa0f0869379181e624e92e661cffaca84fa))
* add icon check button component with styles and stories ([bc16b74](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/bc16b74992c2ca6c6abbd12f7a18e80c6e4d186e))
* add icon check button component with styles and stories ([83e05ec](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/83e05ec201495936980105f556e938502d117fc8))
* add image and attachment click handlers in rich text input field ([930a01c](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/930a01cdb190f36cb5deba1652440ef525493806))
* add input modal ([#185](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/185)) ([7f8295e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/7f8295ea96a8a24d76271c15d857d198bb070a9d))
* add keyboard numeric component with styling and layout ([8bb0658](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/8bb0658953bd6bc74e9ced6d44f59026b9524913))
* add label support to radio button component and update snapshots ([3c5638d](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/3c5638de39a9a75f6d7c6177b81ae3fee461f16e))
* add large variant support and normal style to toggle button group and options ([d8a079a](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/d8a079ab30595d8df0ee6015c4e6fec681013481))
* add lines ([#144](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/144)) ([32ac959](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/32ac9597f4b0ad1241e7b44addf2c25d0bbb5232))
* add modal window component with customizable sizes and actions ([9defbe6](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/9defbe69310ac368fd47aac5849155a3bda4f554))
* add more action props for message-menu-item ([b4de0a7](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/b4de0a771a757e76789d1769f87ee7df4735cb7f))
* add new snapshot images for notification button and badge button components ([f7f5dd7](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/f7f5dd797f557104bf382415da6a7db0f45401e9))
* add normal variant support and improve click handling for toggle button vertical option ([04ad0b4](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/04ad0b4e84a946b9568821eb23495c57fc3b2f0d))
* add notification floating item component with styles and stories ([05a098f](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/05a098fd343771446833e832e15401484457c627))
* add notification floating item component with styles and stories ([6a3ed30](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/6a3ed30a65df2e0d612772a67f35d4b52b6651ee))
* add number input field component with customizable properties and slots ([3b33b75](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/3b33b75fbdb77348b7df16c491fd1bbac96dd5a0))
* add obc-form-item component ([#598](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/598)) ([9554e44](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/9554e4439cf6aaa4933ab3f72d2e39f137da168e))
* add obc-poi-object-aton component ([#641](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/641)) ([68c0dbf](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/68c0dbf2c4cedda0b37e6aa32babdea379eae6a3))
* add OffWithAngleSetpointOverride story for azimuth thruster ([#610](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/610)) ([d3ef96e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/d3ef96e2f3c2032ae7ba2a25b506cf5dc122577d))
* add part attribute for label in navigation item ([9496e39](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/9496e39b38197d4f8441e2083d6f7e6f47221f9a))
* add progress-indicator-dots component with styles and stories ([#241](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/241)) ([0079a56](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/0079a567aaf9ec2af95171884f599fc8b96ddcd2))
* add radio button component with label support ([6b531e2](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/6b531e2022de1d4e5b30b243c322ac191d026648))
* add react wrapper and demo ([#40](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/40)) ([cd81b77](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/cd81b77cddb6fb9e10871e3c469e6b574f946591))
* add rich button component with customizable directions and icons ([#279](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/279)) ([5bfaf7c](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/5bfaf7c832102e5f3bcdc9207141a4192e5880d3))
* add slide button component with styles and stories ([21d5889](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/21d5889b17fc8d39b53bbe8f21640f58006877fa))
* add snapshot images and update slide button stories for new configurations ([f659043](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/f659043167f6157cc664ef10b920456940932e0b))
* add snapshot images for accordion item component states ([df14548](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/df14548024010346c12551e408ec619a5053ebad))
* add snapshot images for advice message item variations ([788bf40](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/788bf407ccc688560d5e94403bb18ab441b9fe7d))
* add snapshot images for modal window component in various sizes ([10a6f52](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/10a6f52c67cd76c9adc13b450e6e60082c7218b1))
* add snapshot images for rich text input field states ([7543e62](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/7543e622235187308018c550ab87c850e7a6b602))
* add snapshots for large and normal variants of toggle buttons ([7a47f2d](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/7a47f2d9ce45d1e02fd3734d67311ef8470712ed))
* add stack direction and enhanced icon options in stories ([6ec88d6](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/6ec88d61fb8d8fed083d0655866e9d7e427b1a8e))
* add stories for title and required indicator in rich text input field ([92e68b8](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/92e68b8a4f899255e8fcdeef96302a81a27ba655))
* add tab item component with customizable properties and styles ([78a0303](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/78a0303626fbefaf2adee51d0b2e4d9041aa03d8))
* add tab-row component ([327b84c](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/327b84c9c2d6d1c8db71cb57b2c484bf959c8baf))
* add textarea field component with styling and layout ([c17b449](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/c17b4497417c8a0e936614fd78e2236b18781d9b))
* add theme color to demo ([#42](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/42)) ([8560be3](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/8560be385f2b3ce381ce9cf082999798c9e1411f))
* add three-state toggle button component with styles and stories ([fa7f194](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/fa7f1944bf196307f63d581224f77ccb7312bc80))
* add title and required indicator to rich text input field ([a810b12](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/a810b12997d4ceb354b1d0e9b7114b302adfe2e7))
* add user button to top bar component ([#53](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/53)) ([dd67e06](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/dd67e063b1ec5e57473e73043a79cfa609c4c1f4))
* add value property and event handling for input changes ([12ee5ae](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/12ee5aef0810cde7911fe0e828900f32f75574d8))
* add vertical stack direction and update structure ([f9db6ec](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/f9db6ec15eddb9d536f3a0758f5a3d55b760d2aa))
* add vertical toggle button component with styles ([4161fc3](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/4161fc3eac3e80e4c61bcdf963229c1e92f2f979))
* add vertical toggle button group component with styles ([8c87ab5](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/8c87ab5756f6c4ae08092b177b1deccf93142144))
* add wide property to icon button ([150a563](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/150a563ed4584335fcfd2714d82e4975438d87ad))
* add/update Vite configuration for React and Vue demos ([#454](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/454)) ([e38d983](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/e38d9834e7e20e7688b2fd02994975d8e01203b7))
* added react 19 as allowed versions ([#68](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/68)) ([2235858](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/2235858904bb2e6631aed9b5f67fec376d1443e9))
* alert button ([986ffa7](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/986ffa74a629e6391041387a94e045f0b1f8ec7c))
* alert list page small ([#239](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/239)) ([b88eea6](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/b88eea64541bdfc913cbac2e224286017cbf0082))
* alert menu ([65d50c8](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/65d50c864e40c8a9a3dcdc6b878ee1ba5d7ed6f9))
* alert menu ([#107](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/107)) ([39d5ac3](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/39d5ac30386079fd9b7c3065ffa91ffe281fc349))
* alert panel ([#249](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/249)) ([25e8cb4](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/25e8cb42109f39dedb4ce1fea4565d34594f92de))
* **ar:** add building-block POI primitives ([#563](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/563)) ([7960041](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/79600418ac5e6507004c9eaebb435abd9dde9755))
* audio-visual ([#201](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/201)) ([64e116f](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/64e116f5f8c7618b34b2415df257f09d8ef3e81c))
* automation button ([#167](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/167)) ([523731a](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/523731a49ab5580d8f53401fc24f1910ecdcbd49))
* **automation-button:** add determinate/indeterminate progress modes ([#680](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/680)) ([e098085](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/e0980851c9191bcae97c5f2fb2f8fea37d511ac9))
* azimuth label ([#162](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/162)) ([184e447](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/184e44743d339f07bc9fe88cf93bdf47e24b3395))
* blinking alert button ([#72](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/72)) ([8283bcc](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/8283bcc9dcf326ad465f1e6b9e7cc5a3904448b4))
* **brilliance-menu:** add option to disable palette items. ([#541](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/541)) ([4849153](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/48491531e55210c0ff4c83590b8f2870c32a0ba2)), closes [#538](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/538)
* **brilliance-menu:** update to 6.0 ([#308](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/308)) ([61e6e3b](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/61e6e3b2039bdf34444c784103d397b047ff9be5))
* change negative boolean to positive; documentation update ([#637](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/637)) ([159b877](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/159b877a16c955bd30a000f5e247de1fda384508))
* chat message ([#342](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/342)) ([f1e1585](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/f1e1585acb1d8d4a832c422a9f05b6152ab348d5))
* chat message ([#342](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/342)) ([33e0db3](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/33e0db313bfb516239d32dbf51d6b797eb461b9e))
* checkbox ([827c403](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/827c403f62fb4419e94278c17958454eb9f32d12))
* **ci:** validate pr title in workflow ([#749](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/749)) ([3b44c8f](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/3b44c8fe8b3e55d48d513e0375e1a10a2ef00a27))
* command button ([#143](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/143)) ([5bd965e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/5bd965e0442f62b5f2b00982be4a59bff9a7e38b))
* command-menu ([#142](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/142)) ([10db1f4](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/10db1f47943df20a9d79eb6736e7be83de5bfc44))
* company logo in navbar ([#103](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/103)) ([31beee7](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/31beee7a1a1f8f22141709e4f297bc99c9926e9c))
* compass ([#308](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/308)) ([c942f1e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/c942f1eccd2493b3c52188b8551231e5e13246a0))
* compass indicator ([#146](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/146)) ([7e33156](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/7e331567cd6bd7676b2e04fdbc0b645a58dae2a6))
* compass-sector and 'zoomToFitArc' feature ([#722](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/722)) ([c9a9bde](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/c9a9bde8dd9447d0164cdd109b8dd747569dfdf9))
* comunication table ([#347](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/347)) ([f7403af](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/f7403affd77f4bbc079cbc757307ca0a45e9d8f1))
* comunication table ([#347](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/347)) ([dc51c5d](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/dc51c5dfdd88d17bf7f820b6fef92099f0be61d6))
* create calendar ([#727](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/727)) ([1d0a485](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/1d0a485cad75a21c1ac550f0d149b64043a2c8fd))
* depth-actual ([#393](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/393)) ([55cd521](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/55cd5217429a77f874924c1ee4de73b63d564eae))
* document usage of ::part(label) CSS pseudo-element for styling in navigation item ([e9b2abf](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/e9b2abf3d313fbdf5d74963611e1e34006ba0db8))
* donut, pie, polar and radial bar charts (using Chart.js) ([7e4e5bc](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/7e4e5bc4f860d44c0388dfde445b203b4619e981))
* elevated card and radio button ([99fc92a](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/99fc92ab37415ebe3355c7b413a896290401d193))
* enhance audio recording item with playback functionality and slider ([c2428fe](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/c2428fe5078b55f7690699bb8a0745a0c9901b0d))
* enhance badge component with new icon types and variant support ([3e0be8f](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/3e0be8f5a112ff65d9ef10bdc69cac61c293e00e))
* enhance build process for openbridge-webcomponents ([#625](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/625)) ([1e2c919](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/1e2c9199c5eca4639715b69292c706295ee1adb3))
* enhance icon button styles for improved touch target and layout ([77ae1d4](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/77ae1d4a86f4f6cd2401ebf910ed83978605858f))
* enhance input field with toolbar and icon buttons ([2fda347](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/2fda34777b01b5f9bda508b5730d2f84de0f996e))
* enhance large variant styles and add normal variant support for toggle buttons ([19c5003](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/19c50033f19cca0420d96f50e37b567430b9f8b5))
* enhance obc-icon-check-button with detailed documentation and new properties ([d8ddcea](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/d8ddcea3d7ccad7a0e361052348d169541c8d2ac))
* enhance obc-icon-check-button with detailed documentation and new properties ([6c60b3e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/6c60b3e11bb18f635c2004b378f7f1e2f9db31de))
* enhance sidebar item styles and fix hover states for better UI consistency ([84b44f5](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/84b44f59e9383b32111468a306b7050290d4eed2))
* enhance start-stop switch component with improved styles and disabled state handling ([53e8067](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/53e8067d98a3b1984c63de191ba073d2d820282a))
* enhance start-stop switch with bug fixes and new figma styles ([c4a63bb](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/c4a63bba81ec29e9c9f2d516bad1048d0ea8f1f6))
* enhance Storybook themes with improved color contrast and readability for dark and light modes ([37befda](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/37befdad0e6d7015e51c5d68c95e27470464bf30))
* enhance tab item and badge components with new properties and styles ([4a3839c](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/4a3839ce6082ffae89e26d8bdebb11a622ae7bec))
* enhance three-state toggle button accessibility with ARIA roles and labels ([cd5441e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/cd5441ed798d379984a924fac2553c3fa3bb7f5a))
* expose POI icon rotation as CSS ::part(icon) ([#638](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/638)) ([293ada3](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/293ada31eb2faef63a88d7a27a71ef1facf5aa54))
* external scale and horizontal/vertical bar bulding blocks ([#450](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/450)) ([6971ee4](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/6971ee492942fc1325e68abcbac23bf52110099b))
* fixedAspectRatio scaling mode for External Scale ([#460](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/460)) ([86490ae](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/86490aedecbd2b512a387b16e3d12a55876df46e))
* gauge trend ([#473](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/473)) ([070df00](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/070df00ff8a1f7766727be201bd16f5c95b8aff9))
* gauge vertical/horizontal ([#474](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/474)) ([6ff6265](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/6ff6265b6b418daa75542f9f22379c910750b6bd))
* gauge-radial ([#327](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/327)) ([fc42e18](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/fc42e181e3aec90c08c343a58f39e944c7e792e8))
* gauge-radial ([#327](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/327)) ([9806648](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/9806648ba8666618a494c87d018f35f544116408))
* have eslint prefer enum over string literal ([#503](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/503)) ([cf4b0f8](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/cf4b0f84947a23c170959bddd4822264c2221e8d))
* heave instrument ([#359](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/359)) ([0657b26](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/0657b2601f6d9cce2a5225db43e1aefdbc879781))
* heave instrument ([#359](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/359)) ([c64bb7d](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/c64bb7d08862bcb8695073ad9cd54fc94846a5c6))
* implement 'tickmarksInside/showLabels' in Compass and Heading ([#622](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/622)) ([f7a6358](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/f7a6358bc09331179a490f09436072375ec7ba3d))
* implement accordion card ([#248](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/248)) ([ec6079f](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/ec6079fbe9b53879c16817049f36f3942746eb9b))
* implement accordion item ([69e7d99](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/69e7d99caf5fec9df5952f010ed12047ec6341ca))
* implement advice button ([975d01b](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/975d01b4256c0b7fffa910857a4652ed3cb38bdc))
* implement advice-floating-item and advice message item ([55d60cf](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/55d60cf53e0ac7bdc803407c27341674f1980ff1))
* implement advice-menu-item ([1ef38e3](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/1ef38e39b7f59766419eb7f0931e4c549ee97c85))
* implement advice-menu-item ([7bed401](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/7bed401c58cf08aec2403d8e8bbe65a311e5d78e))
* implement audio-recording-item ([bd7b522](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/bd7b52251b23ec09ac307bb0df39d81f2e8cdc6c))
* implement base input field mixin styles and text- and number input field components ([0981b2e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/0981b2e47f1bf8804fd039a141016a18513ff338))
* implement check button and update button styling ([#237](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/237)) ([f816e0f](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/f816e0f695226c51aaabea0a4c245501f5572c5f))
* implement collapsible sticky preview in Storybook template ([babc8a6](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/babc8a69c72973bf3b8eb55f39b26c69281502ce))
* implement floating-message-component ([#258](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/258)) ([ae9a8cc](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/ae9a8cc1b352835754d85296ece18cede9fc680c))
* implement form group ([#599](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/599)) ([10c6c3b](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/10c6c3b68237bf5ca781d97305eadb8c39bd802c))
* implement icon-check-button ([ea7a732](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/ea7a732de33462296052c2988698f0f0410e590f))
* implement keyboard-full component ([5e8ebcb](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/5e8ebcb9873724c7c60d101757d0f455440e58db))
* implement keyboard-full component ([7154c78](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/7154c786fa96ff7d7c3c889c25d18c8b02d7e2e2))
* implement modal-window ([65e13b1](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/65e13b1755c5d0ac760cdb4517c8341b5e4faba6))
* implement notification button ([352f773](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/352f773961da17619972d8e538bbbb661d259b29))
* implement notification floating item ([ceb25c3](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/ceb25c3273047be6c4b0b5ef3b315a497ec1e213))
* implement notification menu item ([#516](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/516)) ([c5b0826](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/c5b08262dd893023ae8dfb4264fbc1382205410d))
* implement notification-button component ([c71823e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/c71823eb369977ca09c456340cde0b6da108aefc))
* implement poi-card, poi-card-header and poi-object-vessel ([3fcb0b8](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/3fcb0b851f91499019092094be05c211d8500116))
* implement pump component ([#199](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/199)) ([e7c94aa](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/e7c94aaa7a44b5e8d84a998ab3eb0a6c484914c1))
* implement rich-text-input-field component ([cd3f5ba](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/cd3f5ba8ac4babcbe87cfe2af80e3ee9630ab48d))
* implement slide button UI component ([2a65584](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/2a655848fab3d635f0bd7880815988c41e26169a))
* implement tag component ([c28a342](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/c28a3428f5101b035b01c31ffefa76ad7985b2b8))
* implement tag component with customizable colors and icon support ([ac63faf](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/ac63fafbb41562bff98037887ade1662f69cbbb8))
* implement tag component with customizable colors and icon support ([31b7099](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/31b70999c3f1cd98669ed1b1aaaaad5f7f0ffff4))
* implement textarea field ([2f4f268](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/2f4f268009d89e70544c2925090a48cf30e98ad4))
* implement the ui component toggletip ([d25c5c0](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/d25c5c050b61d7adb3d894f5fc34da345e2fb5fa))
* implement title-container ([#600](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/600)) ([8f4dff5](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/8f4dff55a91b76c03ca8f2ae3ee0b7ccb07cd6e7))
* implement toggle button vertical and update horizontal ([85c6323](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/85c632318836b2aa77211303e8ad6ead73da57c1))
* implemented alert logic and disabled buttons ([79e37c8](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/79e37c82205cafe45f64755e977b01628e50ee60))
* improve Storybook UI with enhanced sticky behavior and color contrast adjustments ([2b98a1d](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/2b98a1dc3801bb9637ac77f216c1ebc4e446e389))
* inside label on watch ([27279ec](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/27279ecebba479af9990da76ff59b7710cfde41e))
* instrument vertical label ([#161](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/161)) ([0f726da](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/0f726da46fc0e34d49e5b34794a349ad2ff23eed))
* **instrument-field:** fraction digits ([4e07b2a](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/4e07b2ac5c3178477fe54691b6de78ab6e6b25c3))
* **instruments:** add partial enhancement via priorityElements property ([#665](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/665)) ([8ed5acc](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/8ed5acc5391a90883c9eaf432e56ff738e5bd362))
* integration bar ([#314](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/314)) ([240ee40](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/240ee40d0cc4bd51bf0607204516cc3db13fb70f))
* **integration bar:** status to dropdown ([fc946b7](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/fc946b723823f0703b47b10898c4491aa902ebec))
* integration button ([#449](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/449)) ([c8b1047](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/c8b1047d3d4373b0bc0f656788d2d63444f7d80f))
* integration dropdown ([#646](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/646)) ([ecb86b2](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/ecb86b2ff466c8fa06038cbb8cb3113361c67fcf))
* integration fleet button ([#468](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/468)) ([8393424](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/83934240f0ce8c67fef757dd33e03309dfdbf288))
* integration top bar with dropdown ([#664](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/664)) ([3afddfa](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/3afddfacf5c5bc5ccc178354946018b1f44fdde0))
* integration vessel selector ([#462](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/462)) ([4d1e815](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/4d1e81568bb48660693e656539fc0dc329e0a92d))
* line and area graphs (using Chart.js) ([838abcd](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/838abcd70eb593be8d42ec699584e8c6500779e9))
* link to alert list ([ffa44e7](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/ffa44e7a3fca777d0d2e171f6357d2591257880c))
* main engine ([23f42dd](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/23f42dd4a65e6b3cf416c76987b55fd1b30001e7))
* make prop for optional icons ([#245](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/245)) ([612618e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/612618ede230fdd213aa04278b2a6088c6b0d2e2))
* **message-menu-item:** rename action properties and add trailing icon support ([48931c0](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/48931c08b970aa69bf1c3ef7746786658c005c84))
* **message-menu-item:** update story configurations for action and icon properties ([8f73cd6](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/8f73cd6c1108f680ae8ea7ebf229aa87efd0ae0f))
* move rich-text-input-field files to current branch ([8de58ed](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/8de58ed4ae710c3240cd62b3700d50e4bd0f28d3))
* multi color icons ([ab4bfa2](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/ab4bfa27034e5fc78a50b80fcab926dae01ba977))
* navigation sub menu ([#100](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/100)) ([5300ade](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/5300adee2fd7475d15d9e0ccdadcbaf3f31cd270))
* new alert menu api ([#253](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/253)) ([ee8d779](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/ee8d7791035807af1d713bc3aab773436b433b0e))
* **new API:** instrument API update ([#577](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/577)) ([7ffcc95](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/7ffcc95206795ed033bca0718588deb675f4e2ff))
* notification button ([9039f16](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/9039f16b432a7950c6e939d63d85f0095ff9cc73))
* notification message ([7fbc9b7](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/7fbc9b72764435a265c27d6bae2144e7509c2cda))
* pagination and update toggle button ([#252](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/252)) ([3335c4a](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/3335c4a9aabb7ed36cca8125488e35a95dad8ff6))
* poi target ([#375](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/375)) ([2f3305b](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/2f3305b2e37155644eadf125f78482e91cd8651f))
* progress bar ([#306](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/306)) ([b47933e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/b47933e372977e218fe6f4ca0943eff3c0390303))
* progress bar ([#306](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/306)) ([3e9741e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/3e9741e146bd4d3d438b45d3553057bf9b2d42e5))
* radial setpoint ([#548](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/548)) ([1b66aa1](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/1b66aa1798a50ccc453ff5c09e98bd0ac6b28c9a))
* radio button ([49c2fc1](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/49c2fc1733e09e4a9e72250619786da9110c466c))
* reactive brightness ([#31](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/31)) ([be5a97e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/be5a97e82857babfb5239117547d1d1c70b636bd))
* readout ([#177](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/177)) ([72f30e9](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/72f30e9a8dfcfe41e544eb7b629049616fe2b044))
* refactor tab-row component to enhance interactivity and state management ([ded2dfe](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/ded2dfe78e489b17bafc133b5e2e1887955359ee))
* refactor useStickyOnSmall to accept a function for max height calculation and improve resize handling ([4171f7f](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/4171f7f153af06a3f5e17f346b2b0cdaaa9b8e22))
* remaining lines ([#166](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/166)) ([390e5f0](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/390e5f0086a39255415f3e4a0791c0385246b373))
* remove hasHelperText property from rich text input field ([639e261](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/639e261bc4c2873d17d7a986840ce8bafc846a1f))
* rename attributes to not using dash style ([#222](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/222)) ([618526d](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/618526d5c468d461dbfe84b7459a8dccdcef0499))
* rename audio visual to audio output ([817184a](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/817184ae81266ecd2a5449d4c78b7d920bf30669))
* replace input with textarea for better text handling and add error/disabled states ([09cd2da](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/09cd2da03c4fea5bba80e1cf54ded06a78b90a43))
* rich button ([#80](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/80)) ([c3a4789](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/c3a47898206416cea9abf19f882f775e0810698c))
* **rich-button:** add full-width and full-height properties, update styles and stories ([#343](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/343)) ([93ed42d](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/93ed42d81adb898f0a6428604957327da82b1dee))
* **rich-button:** add full-width and full-height properties, update styles and stories ([#343](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/343)) ([bfcaa37](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/bfcaa3749dfb331ca0f1484e7ef3cc99c5e8665d))
* **rich-text-input-field:** remove event handlers from textarea for simplified input handling ([5fb847a](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/5fb847a09e140ab7c22838cc5bdfb61e9314b565))
* rot-sector ([#329](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/329)) ([de23f3a](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/de23f3a6e91b8f1a6aab7c304d71342af8e127fa))
* **rot:** add configurable rotAtZeroDeadband property ([#747](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/747)) ([f6b50c3](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/f6b50c3d5faf9c02e4da65fc8e6e21479f0c4345))
* **rot:** redesign ROT bar indicators with zero-pill, coloring, and visual refinements ([#742](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/742)) ([f9dee75](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/f9dee75cc67b8897aac867438ccfbc48cfd5ff20))
* rudder with needle ([#232](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/232)) ([f688139](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/f688139444e646f4f95f68e1f59671b9ef513ee7))
* seperate pitch and roll instruments ([#204](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/204)) ([8d907f5](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/8d907f5848188041568de54d36244c296bafd259))
* sequence modal ([#550](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/550)) ([ca987cc](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/ca987cc3810261c41e3611384f0f4ddb414a740c))
* sequence toolbar ([#507](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/507)) ([e99f26f](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/e99f26ffa3ae87bc5606badc1725be9d1f9826c3))
* **sequence-diagram:** add sequence-step and sequence-item components ([#443](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/443)) ([f28fc8a](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/f28fc8a50a0d2fbe54761c0fa1e620fcd7ff1838))
* setpoint animation on confirm ([#569](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/569)) ([017f425](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/017f425fcf8acdc89b47b4ee7639483fad27a562))
* settings topbar, corner icons, divider ([540188a](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/540188a7e59c5ec407673597f3a610ebc8e7b431))
* slider buttons ([#37](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/37)) ([69c3d24](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/69c3d24de7804507e058c7c46f9fc4842d3ffeb8))
* snapshots ([a90d612](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/a90d6123edcad8bb2c962d5b0961d33b343b5a25))
* speed and rot indicators ([#147](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/147)) ([2831932](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/2831932ef6be60f78c494a28fc545d47e19c85f2))
* start-stop-switch ([#141](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/141)) ([144889e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/144889e0edc70e58c242bdbb77275456028499ed))
* status indicator ([#378](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/378)) ([d1b2769](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/d1b276910d3bd12e7dc52ba1ae8adcb4345b520c))
* status indicator ([#378](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/378)) ([47d593b](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/47d593b76c467c50eddf5fd3c689db8d09c3cee2))
* stepper box ([#145](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/145)) ([d51e719](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/d51e719cf14d5957aaf3c48ebf48102e9db052c6))
* system menu ([#430](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/430)) ([a89a872](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/a89a87208cc88ca5273f9ce769d261b36b8f7e24))
* **table:** add sort animation and expose ::part(body) on grid-body ([#668](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/668)) ([25a0c6d](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/25a0c6d49dc33b93edeecf4c138665f45971cf4c))
* **table:** upgrade to 6.0 ([#312](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/312)) ([417905b](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/417905b823f668bdfbf824720480a691e7142109))
* tank ([#186](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/186)) ([fb56095](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/fb56095771a9e4506e84fab00d920806fc43500d))
* tooltip ([e85318a](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/e85318a36cbe1b9a1e65fe93b1b7eecbaf707f63))
* **topbar-message-item:** updated with more details ([fed1811](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/fed18113bfdf94f75bf9984c0893827b4fcaebf4))
* **topbar-message-item:** updated with more details ([0d61e4e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/0d61e4e53f79b5ff75f7b154945e463b871d08f4))
* update .gitignore and add new snapshot images for tag component ([8765d9c](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/8765d9cdef8e31345944948a340fb5aa62250f2a))
* update .gitignore and add new snapshot images for tag component ([583f72c](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/583f72cbd125d9e7a55c873c4ff37996cbe4a19c))
* update audio recording item to include play/pause button and playback indicator ([cfe6312](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/cfe631265496c1d29f5b683e4849d7e2607bc72f))
* update audio-visual and system-menu story assets with new baseline images ([a5c6b73](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/a5c6b73bacea7ae53855225c949828402533b707))
* update baseline images for text input, number input, keyboard full, and keyboard numeric components ([750aa5f](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/750aa5ffd58988dbdd194759e517740d9e490c29))
* update clock ([#377](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/377)) ([c479176](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/c47917655d134a0d8adc0432960ccf81f2cfb4f5))
* update clock ([#377](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/377)) ([004a3e4](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/004a3e4d27bc3a5d1abf29c0e9188ebccf99c5a7))
* update colors ([#145](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/145)) ([3e97f46](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/3e97f467bc0f33bedad98cc2df0c9c8b5d7d3034))
* update fonts ([e94e38e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/e94e38e9ef5601eef73c59ca15ffe536e971aa7b))
* update message menu item ([24ea8f4](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/24ea8f4f0917fcc20f985f132673a8b49e0fb91b))
* update message menu item dependencies and snapshots ([5a7229b](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/5a7229b342dcb74934b6e9d8b0f1c85159803907))
* update radio button stories to include version tag ([cef1263](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/cef12638dc5a476b6f628c6eca7b1769760ded6e))
* update setpoint API ([#529](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/529)) ([6eb3f9c](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/6eb3f9c9a28b80c7c0ff4d7cc862e37502486a15)), closes [#538](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/538)
* update setpoint behavior ([#555](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/555)) ([f6c8464](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/f6c8464505abc1b19182c2f6064170cde81ad156)), closes [#547](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/547)
* update sidebar item styles for improved hover states and selected item contrast ([ff85306](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/ff85306c8aaf8704dffe85276ae295712b4b5f82))
* update snapshot for primary alert list component ([d35b33b](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/d35b33bd9fedd19eb50a01c11f6d2bc85c7c0b29))
* update snapshot for primary alert list component ([fdbf506](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/fdbf506f9a31f64672f36413e81239d55662cc64))
* update snapshot images ([a3bb037](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/a3bb037430a7d062afe3d66aa7c434f8b7a2dcb4))
* update snapshot images for alert badge and button components ([bf5f273](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/bf5f2731c3ab2e42b38522b7cfc8cc00cc6ab681))
* update start-stop-switch component with new properties and variants ([00c03dd](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/00c03dd46afe91f4141ee1850777f514bf5625a3))
* update story title for icon button component ([9f8df6a](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/9f8df6a6a6218a9d53b1b89584c667d3ff616041))
* update system-menu with small-screen variant ([#603](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/603)) ([4fd9744](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/4fd974456202b98c450ba68ce2b24093aedb5aa6))
* update toggle button vertical styles and add label container ([2682c7b](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/2682c7b04094a26decef343f0fae7263b1b91f7d))
* update tooltip component to 6.0 ([c18b4f4](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/c18b4f48cd2cf22b61f1a17693747a58a60b4710))
* update tooltip component to 6.0 ([864b128](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/864b128843c77e692acd04635d6fb58444ba690d))
* use custom registration to allow reregistration ([#238](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/238)) ([c3a00f2](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/c3a00f24ee25fcfc5ad857a832ddaea05575f3e0))
* use props for optional slots ([#247](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/247)) ([2d7701f](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/2d7701f11664383f7c117b7677b352e465d55936))
* vendor button ([#79](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/79)) ([8216ddc](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/8216ddc8e6d63a54096ee8ac7cec72db5fd5ebf4))
* vessel chart button ([#412](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/412)) ([445c87d](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/445c87d658343f9ba8e9914ca2a63ab3305c00e8))
* **workflows:** add build step for Angular wrapper in release job ([f6c9f4c](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/f6c9f4c2577b38fc7360b72acc07d4af0df50297))

### Bug Fixes

* add .js ending to all file imports ([#90](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/90)) ([41d82f1](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/41d82f11a06f0d76d908971f39598ea44713fa18))
* add date item ([#491](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/491)) ([7e7f938](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/7e7f9382c59d1f2c118b048809782b9372136182))
* add disabled state to user button in top-bar ([#593](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/593)) ([1934aee](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/1934aeeab0556561f218ce548616f998df8ae8f7))
* add images ([ec7917d](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/ec7917d8a54f9ce3cae39a8bc35ad3a35b6e55b0))
* add missing newline at end of file in pagination.ts ([59baa2e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/59baa2e14c50c994fd946477eb0d6d7b5a1f57de))
* add missing newlines at end of files and clean up comments in webcomponents ([9d54de1](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/9d54de130308205add568068e448d338d855c6c5))
* add missing semicolons in badge component CSS for consistency ([e5c1eda](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/e5c1eda29c193af48c2dcf86397e1f046267f1db))
* add text-decoration none to navigation item CSS ([#70](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/70)) ([4ecd44e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/4ecd44e2ea2dd70dc1d3277318c69c8a71cbd4ea))
* adjust padding for toggle button option ([2552e6c](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/2552e6caed7dd09f152c6da816757a58c5f22011))
* alarm blink on condensed top menu ([#98](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/98)) ([39340f1](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/39340f1ddaeac758b88385c76d4f5170bc0a9899))
* alert list not showing ([#32](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/32)) ([ef282db](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/ef282db44684beda958f1d79b146329e329a5830))
* alert url ([886d2aa](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/886d2aa1ed96236e7b42190ab19e3386e61a1516))
* app menu ([#15](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/15)) ([3e31203](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/3e312037deb053b41e5d5c0ad2366870cb28064d))
* **app-menu:** centering of app menu items ([#740](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/740)) ([8251bf5](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/8251bf574926971d59d1cefe2939d92686394fbc))
* AR POI target ([25dd837](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/25dd83709cee8bc10b1545699cd9aa2ef8a746e7))
* **automation-button:** adjust spinner dimensions and simplify SVG rendering ([#679](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/679)) ([f89df48](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/f89df489f8b9e4cb067e8af899b6a00cbcbdb28d))
* **azimuth-thruster-labeled:** prevent overflow in narrow containers ([#720](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/720)) ([3a32ddd](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/3a32ddd2aab152a4ab52d8d2fb1b77f17c2238f2)), closes [#719](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/719)
* build and update custom-elements ([c5f8d94](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/c5f8d94f9dfc2242b1757109abcc425fd9b07a2b))
* cannot close dialogs ([cf8be0f](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/cf8be0f8cdd19279b04893fa785a96789a95141b))
* change prefix from ob- to obc- ([1dd2bf0](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/1dd2bf06010971d9affa930717b368e32e161e26))
* **charts:** add defensive guards to prevent Chart.js lifecycle errors ([#424](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/424)) ([b26b39b](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/b26b39b5711d120c8c020a9ae8aa6e7b2d40dfca))
* **check-button:** fix bug in label text color ([#674](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/674)) ([5ce3ded](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/5ce3ded01b8cb777648431aabfcad461db178b07))
* **ci:** npm ci may not work for wrappers as package.lock doesn't exist yet ([#772](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/772)) ([e3e259c](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/e3e259c92ed3494c80e7b7d73107618f032bc12e))
* click outside menu closes menu ([#53](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/53)) ([b16bdca](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/b16bdca8057933ff7f03e398c785bf48c3c0cbcb))
* compass use normal property ([#137](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/137)) ([6e96a6e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/6e96a6ee7ded4df236707047ebda35d19cac0883))
* correct formatting and remove unnecessary whitespace in toggle button components ([2f3373f](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/2f3373f057b802b3517917c2236cb069e37e7a66))
* correct scanning head direction in sequence loading spinner ([#723](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/723)) ([fd5dcd3](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/fd5dcd345f2eebd41bc10dd6cb07dbb1eea90d1f))
* deploy on PR ([#323](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/323)) ([acf825b](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/acf825b7e057f3158ca744185b306321813ef31a))
* ensure name and value attributes default to empty string in radio component ([c8bc353](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/c8bc353daff433f2a6aac227cc60e988e90b50e0))
* ensure value is set in toggle-button-group on option click ([a3fcc2c](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/a3fcc2ca9a2d828c1b0cc18de663a7176b12b91f))
* font color of images ([f699098](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/f6990985cdf7f9ae627cd23dbbcf3b6ce05b6067))
* format badge component in automation tank stories for consistency ([73debd0](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/73debd07651b09477456650c7dab186570f8742b))
* initiate screens if none exist on bridge ([#175](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/175)) ([32aa429](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/32aa4294ce028061e3aacb56c32be89a16a8109d))
* instrument field use enum ([#339](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/339)) ([850d4ac](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/850d4ac4d350b209ae459c88088dcd90da70aa3e))
* made alert message text clickable ([008fa50](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/008fa50394cf21af3142f23c1b9c690731509b1a))
* made storybook run ([3f74d8e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/3f74d8e41d6c4100b7b3a929019c6dbe75019a57))
* **message-menu-item:** render day-only timestamps ([653fb8c](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/653fb8c5631b0edf957c36afb7df164b4c696a74))
* minor ([#36](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/36)) ([4143a96](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/4143a96e09e3caf79bfd1a2aa67d7b6a856424b0))
* minor design corrections ([ac32c4f](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/ac32c4f0a2064508f1503c1eb48887cef17e00bc))
* move search icon to the left ([#45](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/45)) ([5be4143](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/5be4143dcb6e6e1a05714ee8b575d6b54cdf6477))
* moved style mixin ([756c4a2](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/756c4a209d276a629a43f36214b947cf00c9c00c))
* new id of icons ([582110c](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/582110c3bc4676e8dc41d84520deee61bd87c5d2))
* no hover on touch devices ([#86](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/86)) ([02e8717](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/02e8717ad957b66b13b070d23112ba3980fad446))
* not-allowed cursor when visibleWrapper is used ([#235](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/235)) ([5c97204](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/5c97204e16626d6c52f58d2c215fbd5d264373ff))
* not-lazy loading of company logo ([#52](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/52)) ([56f7b8e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/56f7b8e91c7199d4920303fb7b1bb564c813355e))
* optional slots for alert menu item ([#570](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/570)) ([a06de45](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/a06de454b5912954fc1bda44fb1b2a55b6202c04))
* override connectedCallback in toggle button vertical option ([812823f](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/812823f200fd808cece2d1985dd47d881b122032))
* padding last button in toggle button ([#54](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/54)) ([43ca15c](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/43ca15cee3488051cf95061d4e159061f8b63c22))
* passing 'state/priority' to radial instruments; tickmarks inside/outside ([#612](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/612)) ([cb4a4fe](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/cb4a4fe5e2ea4c545e0b3ab3af8500faaf223eed))
* poi-target values ([9748c75](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/9748c756d192db28311b532e9c829eebccad4ca1))
* PR deploy demo ([#315](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/315)) ([0f44fc0](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/0f44fc0025b0035bff218f73f653bf6fa9762bfe))
* range ([#34](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/34)) ([2dcb4be](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/2dcb4be665ea80c5febe451024d48b8d8156d3e5))
* **release:** get release 1.0.1 into develop ([#789](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/789)) ([79da15b](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/79da15bf003c94ef2a14e79399136f9424439905))
* remove duplicate components ([#662](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/662)) ([bb8934e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/bb8934e6bb02695bc4f127ef9aa549c9d9c038c4))
* Remove footer divider when the footer is empty. ([#760](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/760)) ([5900003](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/590000384c339a702c875eb3222477274c1e8e2b))
* remove unnecessary aria-controls attribute from accordion item button ([45d1000](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/45d1000b895610651dad2a2cd27b79e6ed1a1346))
* remove unnecessary blank line in preview-head.html ([e6f2282](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/e6f22824be6c8ebd166cebdd0abfbcfc9af89373))
* remove unnecessary ifDefined for name and value in radio component ([4aa8274](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/4aa8274b44d263a80e0e8c470575768bb0052208))
* remove unused import from rot-sector stories ([aca1787](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/aca1787b15a02fb508936b28c7d5cebea770a72b))
* resolve progress circular sizing issues ([#685](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/685)) ([dce0147](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/dce0147b0d47c4560f46801619d90282c7707350))
* **rudder:** needle moved out of position ([#319](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/319)) ([e9396c2](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/e9396c2c53d188e8bdf7a1e0e572f3567efa019b))
* scrollbar after review ([14cb0e1](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/14cb0e19e20219ad75163397fa7b43b827cabcc4))
* set minimum width for button touch target size ([5ae3252](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/5ae325200d175d8c64ebedc2776c243f1345d627))
* sizing of thruster ([d0fbc73](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/d0fbc737917c43b255c261d3e30ce5062ef061a4))
* **slider:** fix rendering and crash in Firefox ([#721](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/721)) ([#744](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/744)) ([47d527f](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/47d527f327c6c52496304e2a4bb460109c54643e))
* slow storybook loading ([#288](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/288)) ([1d042da](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/1d042da9610cf0e459ec83e4558dc64b00f3172d))
* stabilize sequence-step visual snapshots with play() ([#763](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/763)) ([7d7befd](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/7d7befda952c77b1b4092ea6025b4707d7e3f376))
* switch page name in demo ([#77](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/77)) ([64f9d04](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/64f9d04acd41e0413fb8eeea632fe97b5559ea05))
* **toggle-switch:** add cursor pointer to input checkbox element ([#675](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/675)) ([076d06c](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/076d06cc8090f32dbc09acb3bd3310c54d5cf677))
* **toggle-switch:** internal switch is not synced ([#715](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/715)) ([1ff9a7b](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/1ff9a7ba3469e7f2c2972204052cf022e2c0c956))
* update icons ([7e0bf86](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/7e0bf864b5be9476eac2022a0933581f07e77e5a))
* update import statements for ObcToggleButtonGroup and its type definition ([4954e99](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/4954e993fdf1ac41538256f9afb50e6254f8084e))
* update render method to use html template instead of svg ([#578](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/578)) ([3cbdbc8](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/3cbdbc8554e4f16ffe3d60340bafbd802380b0bd))
* update rov and drone images ([#718](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/718)) ([7c163f9](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/7c163f947aadf98dacaa8509aa7704e89a860263))
* update snapshot tags to use new syntax across various chart stories ([#429](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/429)) ([84a7885](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/84a78850870dad725990b5541ab7c1b9f0474755))
* use css anchor position for brilliance menu ([#96](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/96)) ([e69a4ab](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/e69a4ab42b6e552fd3a697f0b624115ec14cd08a))
* use web hash history ([d66898e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/d66898ec4c9a706b61c268ed35058a1faf74eb24))
* white inner border on focus ring ([#89](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/89)) ([cfd00c8](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/cfd00c86ae9448075f34d7a81e1d0c16ab2a04e0))

### Reverts

* Revert "feat: heave instrument ([#359](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/359))" ([#360](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/360)) ([817765b](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/817765bb60f27e3fedc594b0d2dcd7c2991e76b4))
* Revert "feat: heave instrument ([#359](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/359))" ([#360](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/360)) ([6df208e](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/6df208e03689a2331b96731ef5edabbc1b33017e))

### Miscellaneous Chores

* build on release only ([#69](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/69)) ([44f50b1](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/44f50b163247da77750909327d1b4076654e3acc))
* removed obc-context-menu. Use obc-context-input-menu ([#737](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/737)) ([e867b1a](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/e867b1a184f8164816d431066a7357ab6e4fc077))
* update lit ([#399](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/399)) ([fa19609](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/fa1960905bceeed10e100ed5fdfc3026b656ccab))

### Code Refactoring

* rename negative boolean properties to positive phrasing ([#644](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/644)) ([f7d6905](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/commit/f7d6905dcc865d764bbfc3556d8b26d74990c3cf))
