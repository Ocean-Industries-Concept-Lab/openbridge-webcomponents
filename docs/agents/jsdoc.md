---
name: jsdoc
description: JSDoc template, slot/event tags, lifecycle tags, and the three documentation patterns
globs:
  - packages/openbridge-webcomponents/src/**/*.ts
  - "!packages/openbridge-webcomponents/src/icons/**"
  - "!packages/openbridge-webcomponents/src/generated/**"
  - "!packages/openbridge-webcomponents/src/manual-icon/**"
---

# JSDoc Documentation Rules

The full JSDoc template, the `@slot`/`@fires` contract, `@availableWhen`,
component lifecycle tags, and the three documentation patterns. `AGENTS.md` § 3
carries the summary; this file is the source of truth.

Key points:

1. **One-line summary** with the tag name and a brief description.
2. **Features / Variants** — bullet list of capabilities and configuration options.
3. **Usage Guidelines** — when and how to use the component; contrast with similar components.
4. **Slots** — table of slot names, conditions, and purposes.
5. **Events** — a `@fires` tag for every event the component exposes, custom **and** native (a passthrough `<button>`'s `click` included). See below.
6. **Properties are documented in the class JSDoc**, one tag per public property, without a type — `@property name - description` — placed after the Markdown sections and before `@slot`/`@fires`. Conditional properties add a line `@availableWhen name condition` directly under their tag. No inline JSDoc above `@property()` fields (`npm run lint:comments` warns; `--fix` hoists them). A tag naming a property that does not exist is a ghost manifest member — `npm run lint:slots` fails on it. Mixin-provided properties (`svghelpers/setpoint-mixin.ts`) keep their inline docs.
7. **Tone:** Do NOT mention "maritime", "industrial", "bridge", or domain qualifiers; keep text domain-agnostic.
8. If purpose is unclear, insert `**TODO(designer)**` instead of guessing.
9. **`@availableWhen` for conditional properties** — see below.
10. **Exactly one lifecycle tag** on every `@customElement` class — see below.

## Component lifecycle tags (`@stable` / `@beta` / `@experimental` / `@deprecated`)

Every class registered with `@customElement` carries **exactly one** lifecycle
tag in its class JSDoc. This tag is the **single source of truth** for the
component's API maturity — Storybook mirrors it, never the other way around.

| Tag             | Meaning                                |
| --------------- | -------------------------------------- |
| `@stable`       | Production-ready, stable API           |
| `@beta`         | Feature-complete, API may still change |
| `@experimental` | Early stage, API likely to change      |
| `@deprecated`   | Slated for removal                     |

```ts
/**
 * Speed readout.
 *
 * @slot value-icon - Icon shown beside the value.
 * @fires change {CustomEvent<{value: number}>} When the value changes.
 * @experimental
 */
@customElement("obc-readout")
export class ObcReadout extends LitElement {}
```

Put the tag **last** in the block, after `@slot` / `@fires`. It must be in a
real JSDoc block (`/** … */`) — a plain `/* … */` comment is invisible to
`cem analyze` and to the lint rules.

**Mapping to Storybook `meta.tags`:**

| Class JSDoc     | `meta.tags` entry | Sidebar badge |
| --------------- | ----------------- | ------------- |
| `@stable`       | _(none)_          | —             |
| `@beta`         | `'beta'`          | Beta          |
| `@experimental` | `'experimental'`  | Experimental  |
| `@deprecated`   | `'deprecated'`    | Deprecated    |

`@stable` deliberately emits no story tag, so a badge always means "there is a
caveat here". The retired `'wip'` and `'alpha'` tags no longer exist — use the
code-side tag instead.

**Never hand-write the lifecycle entry in `meta.tags`.** Set the tag on the
class, then let the lint rule write the story:

```bash
npm run lint:fix:stories
```

That script is deliberately scoped to `src/**/*.stories.ts`. Do **not** run a
repo-wide `eslint 'src/**/*.ts' --fix`: `--fix` applies every fixable rule at
every severity, so it silently rewrites unrelated files (today it strips
`eslint-disable` directives out of the generated `src/generated/locales/*`).

Two ESLint rules enforce this, both part of `npm run lint:eslint`:

- **`openbridge/component-lifecycle-tag`** (warning) — fires on a source file
  whose `@customElement` class has no lifecycle tag, or more than one. Not
  auto-fixable: classifying a component is a human decision.
- **`openbridge/story-lifecycle-tags`** (error, auto-fixable) — fires on a
  `*.stories.ts` whose `meta.tags` disagrees with the class JSDoc of its
  `meta.component`. Stories without a `meta.component` (the pure function
  module pattern below) are skipped.

Version tags (`'6.0'`, `'6.1'`) and tooling tags (`'autodocs'`, `'skip-test'`,
`'!snapshot'`) are unrelated to lifecycle, stay hand-written, and are preserved
by the autofix.

## Slots and events are consumer-critical (`@slot` / `@fires`)

Two independent tools read these tags, and they do **not** read the same thing.
This is the single most important fact in this section:

| Consumer                                                                                                       | Reads                                       | Consequence of a missing/malformed tag                                                             |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `lit labs gen` (`npm run wrappers`) → `-react`, `-vue`, `-ng`, `-svelte`                                       | the **source JSDoc**, class-level tags only | the wrapper has **no `onX` binding at all** — the event is unreachable from the framework packages |
| `cem analyze` (`npm run analyze`) → `custom-elements.json` → IDE autocomplete, Storybook autodocs, playgrounds | the source, but more leniently              | blank or type-polluted entry in the manifest                                                       |

**The wrappers do not read `custom-elements.json`.** A correct manifest is
therefore _not_ evidence that a component is correctly documented. `obc-poi-group`
demonstrated this: `cem analyze` inferred `obc-poi-group-target-released` from the
`dispatchEvent(...)` call and listed it in the manifest, while the React wrapper
had no binding for it whatsoever (issue #1109, PR #1110).

The two tags behave differently, and both are easy to get silently wrong
(issue #1033):

- **Slots are detected ONLY from `@slot` tags.** The analyzer never reads
  `<slot>` elements in the template. A `<slot name="leading-icon">` with no
  `@slot leading-icon` tag is **invisible** to every consumer even though it
  works at runtime — this is the exact "wrappers don't know about the slot" bug.
  Every rendered `<slot>`/`<slot name="…">` needs a matching `@slot` tag (`@slot -`
  for the default slot).
- **Do not confuse a slot with a projection.** `<slot name="x">` **exposes** a
  slot to _your_ consumers. `<el slot="x">` (a `slot` attribute on a non-`<slot>`
  element) **projects** that element _into a child_ component's slot — it exposes
  nothing. Writing `@slot x` for a projection creates a **phantom** slot (a
  documented control that does nothing). Only tag real `<slot>` elements.
- **Dynamic slot names** (`<slot name="tab-${id}-icon">`) can't be enumerated;
  document them once with a placeholder, e.g. `@slot tab-<id>-icon`.
- **An untagged event costs you the wrapper, not just a description.**
  `cem analyze` infers events from `this.dispatchEvent(new CustomEvent('x'))`, so
  an untagged event still reaches the manifest (with an empty description) — but
  `lit labs gen` infers nothing, so the framework wrappers get **no binding**.
  Every event a component dispatches needs an explicit `@fires` tag.
- **Write the type first: `@fires {Type} name - description`.** `lit labs gen`
  parses either order, but `cem analyze` only strips `{Type}` when it _precedes_
  the name. The name-first form `@fires name {Type} desc` leaves a literal
  `{Type}` at the head of the manifest description and drops the payload type
  from the `type` field. PR #1110 normalized 190 tags for this reason — do not
  reintroduce the name-first form.
- **Tags must be class-level.** Only the JSDoc block attached to the
  `@customElement` class is read. A `@fires` tag inside a method docblock reaches
  **neither** tool. Document the event on the class; if a method docblock also
  mentions it, keep the method's own summary line and leave the tag bare
  (`@fires name`) so the two do not compete.
- **Inherited slots/events:** the `@slot`/`@fires` tag must live on the concrete
  `@customElement` class, because CEM emits one manifest entry per registered
  element. A subclass that renders slots via its base class's `render()` still
  needs its own tags. A tag on an unregistered base class documents the dispatch
  site only — it produces no manifest entry and no wrapper binding.
- **Native `click` needs a tag too.** A component whose template is a passthrough
  `<button>`/`<a>` with no `dispatchEvent` still has a public activation event:
  the native `click` is `composed`, so it crosses the shadow boundary. Tag it
  untyped — `@fires click - Fired when the button is clicked.` — matching
  `obc-button` and `obc-icon-button`. Do **not** type it as `{CustomEvent<…>}`;
  what consumers receive is the native event.
  **React consequence:** in `@lit/react`, any prop named in the generated `events`
  map is attached with `addEventListener` instead of being forwarded to
  `React.createElement`. Declaring `@fires click` therefore moves `onClick` off
  React's synthetic delegation onto a direct DOM listener — handlers receive a
  native `PointerEvent`, and `stopPropagation()` inside one will stop the event
  before React's root delegation, killing `onClick` on React ancestors. This is a
  public-API change; note it in the release notes when adding the tag to an
  existing component.
- **Always dispatch with `this.`.** A bare `dispatchEvent(new CustomEvent('x'))`
  inside a class method resolves to `globalThis.dispatchEvent`, firing the event
  on `window` where no consumer of the element can observe it (fixed in
  `obc-navigation-item`, PR #1112). Caught by `npm run lint:slots`.

Run **`npm run lint:slots`** (part of `npm run lint`) to catch missing/phantom
`@slot` tags, undocumented events, and bare `dispatchEvent(` calls automatically.
It reports empty descriptions as warnings for class-level tags only.

## Conditional properties (`@availableWhen`)

A property whose value only has an observable effect when **another** property is set a certain way is a _conditional property_. Document the dependency with an `@availableWhen` tag in the property's inline JSDoc, directly above its `@property` declaration:

```ts
@property({type: Boolean}) alert = false;
/** @availableWhen alert==true */
@property({type: String}) alertFrameStatus: AlertType = AlertType.Alarm;
/** @availableWhen alert==true && alertFrameType in [LargeSideFlip, BottomFlip, TopFlip] */
@property({type: Boolean, attribute: false}) showAlertCategoryIcon = true;
```

Syntax:

- **Boolean:** `@availableWhen showFoo==true` or `@availableWhen showFoo==false`.
- **Enum / string equality:** `@availableWhen type==label` — use the declared value, **no quotes**.
- **Enum / string inequality:** `@availableWhen state!=overlapped` — handy for "all values except one".
- **Set membership:** `@availableWhen type in [LargeSideFlip, BottomFlip, TopFlip]` — use the **enum member identifier names**, not the string values.
- **Non-empty string:** `@availableWhen label!=''` — for `string` props (default `''`) that gate another prop by being non-empty.
- **Empty / non-empty array:** `@availableWhen centerReadouts==[]` (available only while the array is empty) or `@availableWhen advices!=[]` — for `Array` props whose emptiness gates another prop.
- **Defined / non-null:** `@availableWhen courseArrowPx!=undefined` (for `X | undefined`) or `@availableWhen headingSetpoint!=null` (for `X | null`).
- **Combine:** join with `&&` (all required) or `||` (any sufficient). Always use `==`/`!=` (never a single `=`).

Rules:

- **Never annotate the gate itself** — only the dependent property. In the example, `alert` is the gate and stays unannotated.
- **Self-gated props are not conditional** — a prop that does nothing when its _own_ value is `0`/`''`/`undefined` is not `@availableWhen` (that dependency is on itself, not another property).
- **Multi-path props are not conditional** — if a prop still has an observable effect via some always-on path (e.g. it is also emitted in an event or applied as a CSS class regardless of the gate), do not annotate it.
- The condition must hold against the **actual render/behavior logic** (trace into helpers, getters, and child components the prop is forwarded to), not just the prop's name.
- For properties added by `SetpointMixin`, the `@availableWhen` tags live in `svghelpers/setpoint-mixin.ts`; components that consume the mixin inherit them and must not re-annotate.

> The three documentation patterns (concrete components, pure function modules,
> abstract base classes) are covered in full below — see
> [Documentation by code pattern](#documentation-by-code-pattern-regular-components-pure-functions-abstract-classes).

---

## Comment style

Implementation comments follow `AGENTS.md` § 2 _Comments_ (why-only, three
lines, no history, state-then-cite, CSS one-liners, writing style). The class
and module JSDoc described in this file is separate and always required.

The JSDoc _content_ template (overview, features, usage, slots, events,
example) is maintained in `script/docgen/prompt-system.txt`, which the docgen
CLI feeds to the model — edit it there; this file only carries the rules the
tooling enforces.

## Documentation by code pattern (regular components, pure functions, abstract classes)

Not all code in this repo is a concrete Lit web component. The three main patterns require different documentation approaches because Storybook's autodocs system relies on the `custom-elements.json` manifest, which only contains entries for registered custom elements.

### a) Regular concrete components (default case)

Examples: `obc-area-graph`, `obc-line-graph`, `obc-bar-vertical`

- JSDoc lives **on the class** (following the full template above).
- Properties are documented in the class JSDoc tag block (`@property name - description`); Storybook reads them from the manifest exactly as it read inline docs.
- The story meta uses `component: 'obc-tag-name'` to link Storybook autodocs to the `custom-elements.json` entry.
- Storybook **automatically extracts** the class JSDoc, `@property` types, `@slot` tags, and `@fires` events.
- The story file does **not** need `parameters.docs.description.component` — autodocs handles it.

This is the standard path. The template sections above (Overview, Features, Slots, Events, etc.) apply directly.

### b) Pure function modules (no component class)

Examples: `external-scale.ts` (exports `renderExternalScale()`, `computeExternalScaleLayout()`, etc.)

These modules export pure functions that return `SVGTemplateResult` fragments, not a LitElement. There is no custom element tag and no `custom-elements.json` entry, so autodocs cannot extract anything automatically.

**Source file:**

- Place a comprehensive JSDoc block comment at the **top of the module** (above the first export). Use the same structure as a component JSDoc (overview, features, usage examples) — but write it as a module description rather than a component description.

**Story file:**

- **Omit** `component:` (there is no tag to point to).
- Read the module JSDoc from the manifest: `parameters: {docs: {description: {component: moduleDocs('building-blocks/external-scale/external-scale.ts')}}}` (`moduleDocs` from `.storybook/manifest-docs.js`). The `/** @module … */` block at the top of the source is the single source; `npm run analyze` copies it into `custom-elements.json`.
- **Manually define** `argTypes` (no manifest members to extract from).

### c) Abstract base classes

Examples: `ObcChartLineBase` (abstract base for `obc-line-graph` and `obc-area-graph`)

The class has rich JSDoc and `@property` declarations, but it cannot be instantiated and is not registered as a custom element. Storybook cannot auto-extract its docs via `custom-elements.json`.

**Source file:**

- Place the full JSDoc on the abstract class just like a regular component. Do **not** add `@ignore` — the class must stay in the manifest so subclasses inherit its property docs and stories can read its description with `classDocs('ObcChartLineBase')`.

**Story file:**

- Set `component:` to a concrete subclass tag and `parameters.docs.description.component: classDocs('ObcChartLineBase')`.

**Keeping docs in sync:** Same as pure functions — the abstract class JSDoc is the source of truth, and the story description should mirror/replicate it. Update both when making changes.

### Summary table

| Aspect                              | Concrete component | Pure function module       | Abstract base class                     |
| ----------------------------------- | ------------------ | -------------------------- | --------------------------------------- |
| JSDoc location                      | On the class       | Module-level block comment | On the abstract class (no `@ignore`)    |
| Story `meta.component`              | `'obc-tag-name'`   | Omitted                    | Concrete subclass tag                   |
| Story `parameters.docs.description` | Not needed (auto)  | `moduleDocs()`             | `classDocs()`                           |
| `argTypes`                          | Auto from manifest | Manual                     | Partially auto (from concrete subclass) |
| Rendering in story                  | Direct `<obc-tag>` | Throwaway inline wrapper   | Concrete subclass element               |

## Structured-tag rules (apply to EVERY component)

● After all Markdown sections, append a short **tag block**, in this order:

1. one `@slot` tag for each content slot
2. one `@fires` (or `@event`) tag for each event the component exposes — custom
   events **and** native ones that cross the shadow boundary, such as the `click`
   from a passthrough `<button>`
3. `@ignore` — **abstract base classes only** (see
   [c) Abstract base classes](#c-abstract-base-classes))
4. exactly one lifecycle tag, **last** — `@stable` / `@beta` / `@experimental` /
   `@deprecated` (see
   [Component lifecycle tags](#component-lifecycle-tags-stable--beta--experimental--deprecated))

Items 1 and 2 are the block's content; 3 and 4 are required by their own rules
and belong in the same block, after them. Nothing else goes here.

● **Why this matters — two separate tools read these tags, and they do not read
the same thing.** The full contract, including the two-consumer table, the
`obc-poi-group` worked example, inherited slots/events, and the React
`onClick` consequence of tagging native `click`, is in
[Slots and events are consumer-critical](#slots-and-events-are-consumer-critical-slot--fires)
above. Getting the tags wrong produces the exact symptoms in issue #1033
(ghost attribute, missing slot, phantom slot) and issue #1109 (an event present
in `custom-elements.json` but absent from every framework wrapper).

● Run `npm run lint:slots` (`script/check-slot-event-docs.ts`, part of
`npm run lint`) to automatically catch missing/phantom `@slot` tags, undocumented
events, and bare `dispatchEvent(` calls.

● `@property name - description` tags go in this block, before `@slot`/`@fires`;
conditional properties add `@availableWhen name condition` on the next line.

● Do **NOT** mix Markdown headings inside the tag block.  
 Example skeleton:

```js
/**
 * <markdown sections …>
 *
 * @property showIcon - Whether to show the leading-icon slot.
 * @slot - Default leading-icon slot (shown when `showIcon` is true)
 * @fires {CustomEvent<{label:string}>} remove-chip - Fired when the chip's remove button is clicked.
 * @stable
 */
```

For an abstract base class, `@ignore` precedes the lifecycle tag:

```js
/**
 * <markdown sections …>
 *
 * @slot - Default slot rendered by this base class's `render()`.
 * @ignore
 * @experimental
 */
```

● When you're using icons as examples, instead of writing emojis, use
`<obi-placeholder></obi-placeholder>`, or other similar icons. OpenBridge has
1000+ icons and you can use them in slots by using this format. Another working
icon import example: `<obi-arrow></obi-arrow>`, `<obi-search></obi-search>`.
