/**
 * @module IconAliases
 * @description
 * The old tags of renamed icons, emitted by `download:icons` beside the
 * generated set.
 *
 * Figma renames an icon from time to time, and the generated set then carries
 * only the new name: the old tag resolves to nothing and renders nothing. An
 * entry here keeps that tag alive as an element extending the current icon, so
 * markup and deep imports written against an earlier release still work and the
 * drawing is the current one. Dropping an alias removes a published element and
 * belongs in a major release.
 */
import {kebabToUpperCamelCase} from './convert-icons.js';

/** Old icon name to the name it carries now. */
export const RENAMED_ICONS: Record<string, string> = {
  'log-open-google': 'log-open',
  'timer-google': 'timer',
};

/**
 * The source of one alias element.
 *
 * The alias stays out of `names.ts`, so an icon picker built from `iconIds`
 * lists every icon once, under its current name.
 */
export function renamedIconAlias(oldName: string, currentName: string): string {
  const oldClass = `Obi${kebabToUpperCamelCase(oldName)}`;
  const currentClass = `Obi${kebabToUpperCamelCase(currentName)}`;
  return `import {customElement} from '../decorator.js';
import {${currentClass}} from './icon-${currentName}.js';

/**
 * \`<obi-${oldName}>\` is the name this icon had before it was renamed to
 * \`<obi-${currentName}>\`, kept so markup from an earlier release keeps working.
 * It draws what \`<obi-${currentName}>\` draws.
 *
 * @deprecated Use \`obi-${currentName}\`.
 */
@customElement('obi-${oldName}')
export class ${oldClass} extends ${currentClass} {}

declare global {
  interface HTMLElementTagNameMap {
    'obi-${oldName}': ${oldClass};
  }
}
`;
}
