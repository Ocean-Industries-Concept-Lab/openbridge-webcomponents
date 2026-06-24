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
| `inherited_count` / `inherited_props` | Reactive `@property` declarations inherited from superclasses / mixins, annotated with their source class (`prop <- SourceClass`) |
| `all_count` | `own_count` + `inherited_count` |
| `last_prop_commit_date` / `last_prop_commit` | The most recent commit that changed a `@property` line in the component's own file **or any of its superclass files** (newest wins). Found via `git log -G '@property'`. |
| `last_prop_commit_source` | Which file (own or a superclass) that commit touched |
| `prop_changed_since_import` | `yes` if a property changed after the initial import; `no (unchanged since import)` otherwise |

## Note on git history

This repository begins with a single squashed import commit
(`9289a0a`, *"chore(release): 2.0.0-next.66"*, 2026-06-12) that adds the
entire codebase. There is no history before it. So a
`last_prop_commit` of `9289a0a` means *the property has not been changed
since the codebase was imported* — 210 of the 241 components fall in this
bucket. The remaining 31 components had a property added/changed in one of
the later commits and show that real commit instead.
