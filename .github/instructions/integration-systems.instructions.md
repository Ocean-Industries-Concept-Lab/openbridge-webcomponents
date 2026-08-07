---
applyTo: "packages/openbridge-webcomponents/src/integration-systems/**"
---

<!-- GENERATED FILE — DO NOT EDIT.
     Source: docs/agents/integration-systems.md
     Regenerate: npm run agents:sync -w packages/openbridge-webcomponents -->

# Integration System Components

Nine components for the integration surface — the app bar, tabs, and the fleet /
vessel selection controls that sit above the instrument panels.

## `obc-integration-button` is the shared primitive

Four of the nine compose it: `integration-bar`, `integration-bar-dropdown`,
`integration-dropdown-button` and `integration-vessel-selector`. It carries the
family's variant and type enums (`IntegrationButtonVariant`,
`IntegrationButtonType`) plus the slot flags — `hasLeadingIcon`,
`hasTrailingIcon`, `hasTrailingIcon2`, `hasStatus`.

Add a shared visual or interaction concern **to the primitive**, not to each
consumer. The relationship mirrors `obc-watch` in the radial family: one place
owns the appearance, the rest configure it.

The remaining four — `integration-app-bar`, `integration-fleet-button`,
`integration-tabs`, `integration-vessel-menu` — stand alone.

## Conventions

- The boolean slot flags follow the repo's **positive naming** rule, so they
  default to `false` and read naturally in templates. Adding a slot means adding
  a matching `hasX` flag and a `@slot` tag — see [`jsdoc.md`](../../docs/agents/jsdoc.md).
- These are interactive controls, so the keyboard and ARIA obligations in
  [`a11y.md`](../../docs/agents/a11y.md) apply. Dropdowns need arrow-key navigation, `Enter` to
  select and `Escape` to close, per the APG menu pattern.
- Styling follows the standard two-layer touch/visual target model — see
  [`css-postcss.md`](../../docs/agents/css-postcss.md).

## Icon-heavy stories

The integration bar renders many icons, so its stories are among the first to
drift when the icon library is regenerated from Figma. After an icon refresh,
expect to refresh these baselines:

```bash
npx vitest run --project storybook 'integration'
```

[IMPLEMENTATION_GUIDELINES.md § Icons](../../IMPLEMENTATION_GUIDELINES.md#-icons)
names `integration-bar` explicitly as a path needing a baseline update after a
family rename.
