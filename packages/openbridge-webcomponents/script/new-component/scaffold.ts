/**
 * @module
 * Name derivation and file templates for `npm run new:component`.
 *
 * The prompting and the writing live in `new-component.ts`; everything that can
 * be decided from the answers alone lives here so `new-component.test.ts` can
 * check the generated source against the gates it has to survive — a lifecycle
 * tag on the class, a story tag derived from it, and a tag name that matches
 * the element the author asked for.
 */

/** A component family: where its directory goes and which Storybook group it joins. */
export type ComponentType =
  | 'ui'
  | 'application'
  | 'instrument'
  | 'indicator'
  | 'page'
  | 'ar'
  | 'automation'
  | 'integration-system'
  | 'building-block'
  | 'bars-graphs';

/** The four values `openbridge/component-lifecycle-tag` accepts. */
export type Lifecycle = 'stable' | 'beta' | 'experimental' | 'deprecated';

interface FamilyEntry {
  /** Prompt label. */
  readonly label: string;
  /** Directory under `src/`. */
  readonly dir: string;
  /** Top-level Storybook group, as the existing stories spell it. */
  readonly group: string;
}

export const FAMILIES: Readonly<Record<ComponentType, FamilyEntry>> = {
  ui: {
    label: 'ui — inputs, buttons, tables',
    dir: 'components',
    group: 'UI Components',
  },
  application: {
    label: 'application — alerts, menus, top bar, lists',
    dir: 'components',
    group: 'Application Components',
  },
  instrument: {
    label: 'instrument — compass, azimuth, gauge',
    dir: 'navigation-instruments',
    group: 'Instruments',
  },
  indicator: {
    label: 'indicator — bearing, speed, rot',
    dir: 'navigation-instruments',
    group: 'Indicators',
  },
  page: {label: 'page — full-screen example', dir: 'pages', group: 'Pages'},
  ar: {label: 'ar — augmented reality', dir: 'ar', group: 'AR'},
  automation: {
    label: 'automation — valves, pumps, tanks',
    dir: 'automation',
    group: 'Automation',
  },
  'integration-system': {
    label: 'integration system — fleet and vessel selection',
    dir: 'integration-systems',
    group: 'Integration Systems',
  },
  'building-block': {
    label: 'building-block — scales, bars, chart bases',
    dir: 'building-blocks',
    group: 'Building Blocks',
  },
  'bars-graphs': {
    label: 'bars-graphs — line, area, donut, pie',
    dir: 'bars-graphs',
    group: 'Bars and Graphs',
  },
};

/**
 * UpperCamelCase into its words, an acronym counting as one.
 *
 * A naive `([a-z0-9])([A-Z])` split misses the acronym boundary, which leaves
 * `GNSSSkyplot` as a single word and `GPSWidget` as a single title. Digits stay
 * attached: the tag wants them separated, a Storybook title does not
 * (`Valve X-2` is how the shipped story spells it), so each caller decides.
 */
export function splitWords(name: string): string[] {
  return name
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(' ')
    .filter(Boolean);
}

/**
 * UpperCamelCase to the kebab-case half of an element tag.
 *
 * Digit groups cannot be inferred — `Valve43` could be `valve-43` or the
 * shipped `valve-4-3` — which is why the caller confirms the tag rather than
 * trusting this.
 */
export function toKebabCase(name: string): string {
  return splitWords(name)
    .join('-')
    .replace(/([a-zA-Z])(\d)/g, '$1-$2')
    .replace(/(\d)([a-zA-Z])/g, '$1-$2')
    .toLowerCase();
}

/** The Storybook title offered as the prompt default, in Title Case. */
export function toDefaultTitle(name: string): string {
  return splitWords(name).join(' ');
}

/** UpperCamelCase, so `Obc${name}` is a legal class name. */
export const NAME_PATTERN = /^[A-Z][a-zA-Z0-9]*$/;

/** A custom element tag: the `obc-` prefix and lowercase dash-separated words. */
export const TAG_PATTERN = /^obc-[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * A string literal prettier will leave alone.
 *
 * The prompts are free text, so a legitimate Title Case name like
 * `Captain's Chair` reaches the template and an unescaped apostrophe closes the
 * literal early — prettier then refuses to parse the story at all. Prettier
 * prefers the configured single quote but switches to double when that needs
 * strictly fewer escapes, so matching it here keeps the generated source
 * byte-identical to its formatted form.
 */
export function quote(value: string): string {
  const singles = (value.match(/'/g) ?? []).length;
  const doubles = (value.match(/"/g) ?? []).length;
  const mark = doubles < singles ? '"' : "'";
  const escaped = value.replace(/\\/g, '\\\\').replaceAll(mark, `\\${mark}`);
  return `${mark}${escaped}${mark}`;
}

/**
 * A prompt validator response `@topcli/prompts` actually honours.
 *
 * Its `isValid()` returns `true` for anything that is not an object, so a
 * `validate` returning a plain boolean passes every answer — and a non-empty
 * string counts as valid too, not as the error it looks like. The `message`
 * property that used to sit beside these validators is not in the library's
 * interface either. `{isValid: false, error}` is the only rejection it reads.
 */
export function rejectUnless(
  ok: boolean,
  error: string
): null | {isValid: false; error: string} {
  return ok ? null : {isValid: false, error};
}

export interface ScaffoldSpec {
  /** UpperCamelCase name without the `Obc` prefix. */
  readonly name: string;
  /** Full element tag, including the `obc-` prefix. */
  readonly tag: string;
  readonly type: ComponentType;
  readonly lifecycle: Lifecycle;
  /** Storybook title after the group, in Title Case. */
  readonly title: string;
  /** `'6.1'`, `'6.0'`, or none. */
  readonly version?: string;
  readonly hasCss: boolean;
}

/** Directory name inside the family directory: the tag without its prefix. */
export function baseName(spec: Pick<ScaffoldSpec, 'tag'>): string {
  return spec.tag.replace(/^obc-/, '');
}

/** Path from `src/` to the component's directory. */
export function componentDir(spec: Pick<ScaffoldSpec, 'tag' | 'type'>): string {
  return `${FAMILIES[spec.type].dir}/${baseName(spec)}`;
}

/**
 * Story `meta.tags`, with the lifecycle entry derived from the class tag.
 *
 * `@stable` deliberately emits nothing, so a badge always means there is a
 * caveat (docs/agents/jsdoc.md § Component lifecycle tags). The entry is never
 * hand-written: here it comes from the same answer that writes the class JSDoc,
 * which is what `npm run lint:fix:stories` would otherwise copy over.
 */
export function storyTags(spec: ScaffoldSpec): string[] {
  const tags = ['autodocs'];
  if (spec.version) tags.push(spec.version);
  if (spec.lifecycle !== 'stable') tags.push(spec.lifecycle);
  return tags;
}

export function renderComponent(spec: ScaffoldSpec): string {
  const base = baseName(spec);
  const cssImport = spec.hasCss
    ? `import componentStyle from './${base}.css?inline';\n`
    : '';
  const styles = spec.hasCss
    ? '\n  static override styles = unsafeCSS(componentStyle);\n'
    : '';
  const litImports = spec.hasCss
    ? 'LitElement, html, unsafeCSS'
    : 'LitElement, html';

  return `import {${litImports}} from 'lit';
import {customElement} from '../../decorator.js';
${cssImport}
/**
 * ${spec.title}.
 *
 * **TODO(designer)**: what this component is for, which variants it has, and
 * when to reach for it instead of a neighbouring one. Document every public
 * property with an \`@property name - description\` tag, every rendered
 * \`<slot>\` with \`@slot\`, and every event with \`@fires {Type} name - …\`
 * (docs/agents/jsdoc.md).
 *
 * @${spec.lifecycle}
 */
@customElement('${spec.tag}')
export class Obc${spec.name} extends LitElement {
  override render() {
    return html\`<div class="wrapper"></div>\`;
  }
${styles}}

declare global {
  interface HTMLElementTagNameMap {
    '${spec.tag}': Obc${spec.name};
  }
}
`;
}

export function renderStories(spec: ScaffoldSpec): string {
  const base = baseName(spec);
  const tags = storyTags(spec)
    .map((tag) => `'${tag}'`)
    .join(', ');

  return `import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {Obc${spec.name}} from './${base}.js';
import './${base}.js';

const meta: Meta<typeof Obc${spec.name}> = {
  title: ${quote(`${FAMILIES[spec.type].group}/${spec.title}`)},
  tags: [${tags}],
  component: '${spec.tag}',
  args: {},
} satisfies Meta<Obc${spec.name}>;

export default meta;
type Story = StoryObj<Obc${spec.name}>;

export const Default: Story = {
  args: {},
};
`;
}

/** The files the scaffolder writes, keyed by path relative to `src/`. */
export function renderFiles(spec: ScaffoldSpec): Record<string, string> {
  const dir = componentDir(spec);
  const base = baseName(spec);
  const files: Record<string, string> = {
    [`${dir}/${base}.ts`]: renderComponent(spec),
    [`${dir}/${base}.stories.ts`]: renderStories(spec),
  };
  if (spec.hasCss) files[`${dir}/${base}.css`] = '';
  return files;
}
