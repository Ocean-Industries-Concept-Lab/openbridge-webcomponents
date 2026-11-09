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
  'alarm-acknowledged-outlined': 'alarm-unacknowledged-outlined',
  'converter-acdc': 'converter-acdc-static',
  'converter-dcac': 'converter-dcac-static',
  'log-open-google': 'log-open',
  'threeway-acuator-generic-closed': 'threeway-actuator-generic-closed',
  'threeway-acuator-generic-closed-bottom':
    'threeway-actuator-generic-closed-bottom',
  'threeway-acuator-generic-closed-left':
    'threeway-actuator-generic-closed-left',
  'threeway-acuator-generic-closed-right':
    'threeway-actuator-generic-closed-right',
  'threeway-acuator-generic-inleft-bottom-0':
    'threeway-actuator-generic-inleft-bottom-0',
  'threeway-acuator-generic-inleft-bottom-100':
    'threeway-actuator-generic-inleft-bottom-100',
  'threeway-acuator-generic-inleft-bottom-25':
    'threeway-actuator-generic-inleft-bottom-25',
  'threeway-acuator-generic-inleft-bottom-50':
    'threeway-actuator-generic-inleft-bottom-50',
  'threeway-acuator-generic-inleft-bottom-75':
    'threeway-actuator-generic-inleft-bottom-75',
  'threeway-acuator-generic-inleft-left-0':
    'threeway-actuator-generic-inleft-left-0',
  'threeway-acuator-generic-inleft-left-100':
    'threeway-actuator-generic-inleft-left-100',
  'threeway-acuator-generic-inleft-left-25':
    'threeway-actuator-generic-inleft-left-25',
  'threeway-acuator-generic-inleft-left-50':
    'threeway-actuator-generic-inleft-left-50',
  'threeway-acuator-generic-inleft-left-75':
    'threeway-actuator-generic-inleft-left-75',
  'threeway-acuator-generic-inleft-right-0':
    'threeway-actuator-generic-inleft-right-0',
  'threeway-acuator-generic-inleft-right-100':
    'threeway-actuator-generic-inleft-right-100',
  'threeway-acuator-generic-inleft-right-25':
    'threeway-actuator-generic-inleft-right-25',
  'threeway-acuator-generic-inleft-right-50':
    'threeway-actuator-generic-inleft-right-50',
  'threeway-acuator-generic-inleft-right-75':
    'threeway-actuator-generic-inleft-right-75',
  'threeway-acuator-generic-open': 'threeway-actuator-generic-open',
  'threeway-acuator-piston-closed': 'threeway-actuator-piston-closed',
  'threeway-acuator-piston-closed-bottom':
    'threeway-actuator-piston-closed-bottom',
  'threeway-acuator-piston-closed-left': 'threeway-actuator-piston-closed-left',
  'threeway-acuator-piston-closed-right':
    'threeway-actuator-piston-closed-right',
  'threeway-acuator-piston-inleft-bottom-0':
    'threeway-actuator-piston-inleft-bottom-0',
  'threeway-acuator-piston-inleft-bottom-100':
    'threeway-actuator-piston-inleft-bottom-100',
  'threeway-acuator-piston-inleft-bottom-25':
    'threeway-actuator-piston-inleft-bottom-25',
  'threeway-acuator-piston-inleft-bottom-50':
    'threeway-actuator-piston-inleft-bottom-50',
  'threeway-acuator-piston-inleft-bottom-75':
    'threeway-actuator-piston-inleft-bottom-75',
  'threeway-acuator-piston-inleft-left-0':
    'threeway-actuator-piston-inleft-left-0',
  'threeway-acuator-piston-inleft-left-100':
    'threeway-actuator-piston-inleft-left-100',
  'threeway-acuator-piston-inleft-left-25':
    'threeway-actuator-piston-inleft-left-25',
  'threeway-acuator-piston-inleft-left-50':
    'threeway-actuator-piston-inleft-left-50',
  'threeway-acuator-piston-inleft-left-75':
    'threeway-actuator-piston-inleft-left-75',
  'threeway-acuator-piston-inleft-right-0':
    'threeway-actuator-piston-inleft-right-0',
  'threeway-acuator-piston-inleft-right-100':
    'threeway-actuator-piston-inleft-right-100',
  'threeway-acuator-piston-inleft-right-25':
    'threeway-actuator-piston-inleft-right-25',
  'threeway-acuator-piston-inleft-right-50':
    'threeway-actuator-piston-inleft-right-50',
  'threeway-acuator-piston-inleft-right-75':
    'threeway-actuator-piston-inleft-right-75',
  'threeway-acuator-piston-open': 'threeway-actuator-piston-open',
  'timer-google': 'timer',
  'twoway-acuator-general-10': 'twoway-actuator-general-10',
  'twoway-acuator-general-25': 'twoway-actuator-general-25',
  'twoway-acuator-general-50': 'twoway-actuator-general-50',
  'twoway-acuator-general-75': 'twoway-actuator-general-75',
  'twoway-acuator-general-closed': 'twoway-actuator-general-closed',
  'twoway-acuator-general-closed-left': 'twoway-actuator-general-closed-left',
  'twoway-acuator-general-closed-right': 'twoway-actuator-general-closed-right',
  'twoway-acuator-general-open': 'twoway-actuator-general-open',
  'twoway-acuator-piston-10': 'twoway-actuator-piston-10',
  'twoway-acuator-piston-25': 'twoway-actuator-piston-25',
  'twoway-acuator-piston-50': 'twoway-actuator-piston-50',
  'twoway-acuator-piston-75': 'twoway-actuator-piston-75',
  'twoway-acuator-piston-closed': 'twoway-actuator-piston-closed',
  'twoway-acuator-piston-closed-left': 'twoway-actuator-piston-closed-left',
  'twoway-acuator-piston-closed-right': 'twoway-actuator-piston-closed-right',
  'twoway-acuator-piston-open': 'twoway-actuator-piston-open',
};

/**
 * The aliases to write for one export, checked against the names it generated.
 *
 * Two ways the map can go stale, both of which stop the run rather than
 * quietly writing the wrong thing: the icon an alias extends is gone, so the
 * alias would not compile, and the export carries the old name again, where
 * writing the alias would overwrite a generated icon and leave its name in
 * `names.ts`. Either way the map needs reconciling against the export.
 */
export function planRenamedIconAliases(
  generatedNames: Iterable<string>,
  renamed: Record<string, string> = RENAMED_ICONS
): Array<{oldName: string; currentName: string}> {
  const generated = new Set(generatedNames);
  return Object.entries(renamed).map(([oldName, currentName]) => {
    if (generated.has(oldName)) {
      throw new Error(
        `[icon-aliases] This export carries obi-${oldName} again, which RENAMED_ICONS keeps as an alias of obi-${currentName}. Drop the entry so the generated icon stands on its own.`
      );
    }
    if (!generated.has(currentName)) {
      throw new Error(
        `[icon-aliases] RENAMED_ICONS points obi-${oldName} at obi-${currentName}, which this export does not have. Point it at the current name or drop the entry.`
      );
    }
    return {oldName, currentName};
  });
}

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
