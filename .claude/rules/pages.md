---
paths:
  - "packages/openbridge-webcomponents/src/pages/**"
---

<!-- GENERATED FILE — DO NOT EDIT.
     Source: docs/agents/pages.md
     Regenerate: npm run agents:sync -w packages/openbridge-webcomponents -->

# Page Composites

Two registered elements — `obc-alert-list-page-small` and
`obc-alert-detail-page` — that assemble many smaller components into a complete
screen.

They are **compositions, not primitives**. Nothing else in the library depends
on them, and they should not grow behaviour of their own: if a page needs a new
capability, it belongs in the component being composed, so every other consumer
gets it too.

Their value is as an integration surface. A page story exercises the alert
components together — spacing, overflow, and interaction between neighbours —
which the individual component stories cannot show.

## Consequences for changes elsewhere

Because a page renders many components at once, it is a **broad blast radius**
for visual tests. A change to any alert component, card, or list row can move
these baselines even when the component's own story is unaffected. When a page
baseline moves unexpectedly, look at what it composes rather than at the page.

```bash
npx vitest run --project storybook 'page'
```

## Related

- [`ui-components.md`](../../docs/agents/ui-components.md) — the alert, list and card components
  these pages assemble.
- [`a11y.md`](../../docs/agents/a11y.md) — page-level composites are where focus order and modal
  focus trapping actually get exercised.
