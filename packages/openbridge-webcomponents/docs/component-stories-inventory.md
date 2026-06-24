# Component / Story inventory

`component-stories-inventory.csv` lists every web component in
`packages/openbridge-webcomponents` that has a Storybook story — one row per
component (241 components total).

Regenerate with:

```bash
python3 scripts/component-stories-inventory.py
```

## How a component is matched to a story

A component is included when a `*.stories.ts` file declares it via the
Storybook `component: 'obc-…'` meta field, and that tag resolves to a class
decorated with `@customElement('obc-…')`. (A few stories without a
`component:` field — `icons.stories.ts`, `automation/line.stories.ts`,
`wind-indicator`, `instrument-linear` — are intentionally excluded.)

## Columns

| Column | Meaning |
|---|---|
| `tag` | Custom element tag, e.g. `obc-badge` |
| `class` | Implementing class, e.g. `ObcBadge` |
| `file` | Source file of the class |
| `story_title` | Storybook `title` of the story |
| `story_file` | Path to the `*.stories.ts` |
| `superclass_chain` | Ancestor classes the component extends, in order, ending implicitly at `LitElement`. `LitElement` means it extends `LitElement` directly. Mixins are shown, e.g. `SetpointMixin -> ObcChartLineBase`. |
| `own_count` / `own_props` | Reactive `@property` declarations on the class itself |
| `own_props_last_changed` | Same own properties, each annotated with **the most recent commit that changed that property's declaration**: `prop [YYYY-MM-DD hash]`. `import` instead of a hash means it has not changed since the initial import. |
| `inherited_count` / `inherited_props` | Reactive `@property` declarations inherited from superclasses / mixins, annotated with their source class (`prop <- SourceClass`) |
| `inherited_props_last_changed` | Same inherited properties, each annotated with its source class **and** the most recent commit that changed it: `prop <- SourceClass [YYYY-MM-DD hash]` |
| `all_count` | `own_count` + `inherited_count` |
| `newest_prop_change_date` / `newest_prop_change_commit` | The single most recent property change across all of the component's properties (own + inherited) |
| `any_prop_changed_since_import` | `yes` if any property changed after the initial import; `no (unchanged since import)` otherwise |

The per-property "last changed" commit is found with
`git log -G '<declaration-regex>'` over the file that declares the property
(the component's own file for own properties, the superclass file for
inherited ones), taking the newest matching commit.

## Note on git history

This repository begins with a single squashed import commit
(`9289a0a`, *"chore(release): 2.0.0-next.66"*, 2026-06-12) that adds the
entire codebase. There is no history before it. So a
`last_prop_commit` of `9289a0a` (shown as `import` in the per-property columns) means *the
property has not been changed since the codebase was imported* — 212 of the
241 components have all properties unchanged since import. The remaining 29
components had at least one property added/changed in a later commit and
show that real commit instead.
