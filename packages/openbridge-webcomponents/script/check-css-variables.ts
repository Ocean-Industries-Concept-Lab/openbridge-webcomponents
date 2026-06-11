/**
 * @module CSSVariableAudit
 * @description
 * This script audits CSS variables within the project's source directory. It scans all CSS files
 * to identify variable definitions (both standard `--var: value;` and `@property` rules)
 * and their usages via the `var()` function.
 *
 * Features:
 * - Scans all CSS files under the src directory (using glob src/\*\* / *.css).
 * - Identifies unique variable definitions and their locations.
 * - Identifies unique variable usages and their locations (including fallback detection).
 * - Detects duplicate variable definitions (warning).
 * - Detects usages of undefined variables (error), excluding a predefined set of allowed undefined variables.
 * - Scans `src/palettes/variables.css` for `var(...)` usages too: its semantic tokens reference primitives in the same file, so a missing primitive (e.g. a token dropped from the Figma export) would otherwise go undetected.
 * - Exits with code 1 if any undefined variable usages (without fallbacks) are found.
 *
 * Usage Examples:
 * ```bash
 * # Run via npm script
 * npm run lint:variables
 *
 * # Run directly using tsx
 * tsx script/check-css-variables.ts
 * ```
 *
 * Expected Output:
 * ```
 * CSS variable audit report
 * Scanned 195 CSS files under src/
 * Found 2755 unique variable definitions and 1103 unique variable usages
 *
 * Defined variables
 *   - --ob-color-primary (1) => src/palettes/variables.css:10
 *   ...
 *
 * ✅ CSS variable audit passed: no undefined variable usages found.
 * ```
 *
 * Note: This module is intended to be run as a standalone script. It does not export any public utilities.
 * It utilizes internal functions to process file content using fs, path, and globby.
 */

import fs from 'fs';
import path from 'path';
import {globby} from 'globby';

// Bucket B from issue #916 — undefined CSS variables that still need a design
// decision (token value, rename target, or removal). Tracked for follow-up.
// See https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/issues/916
const allowedUndefinedVariables = new Set([
  // B-1: notification icon size (alert-menu-item.css, message-menu-item.css)
  '--app-components-alert-components-general-notification-item-icon-size-large',
  // B-2: alert counter spacing (alert-button.css)
  '--app-components-global-alert-item-counter-spacing',
  // B-3: likely typo for --normal-enabled-background-color (sequence-toolbar.css)
  '--enabled-background-color',
  // B-4: date-item vertical padding (date-item.css) — sibling tokens exist
  '--menu-navigation-components-date-item-padding-vertical',
  // B-5/B-6: instrument-field internal widths — unusual --obc- prefix
  '--obc-instrument-field-source-width',
  '--obc-instrument-field-tag-width',
  // B-7: keyboard "nummeric" tokens missing from the (misspelled) family
  '--ui-components-keyboard-nummeric-component-height-min',
  '--ui-components-keyboard-nummeric-touch-target-size',
]);

interface VariableDefinitionLocation {
  file: string;
  line: number;
}

interface VariableUsageLocation {
  file: string;
  line: number;
  hasFallback: boolean;
}

function getLineNumber(text: string, index: number): number {
  return text.slice(0, index).split('\n').length;
}

function formatLocation(location: {file: string; line: number}): string {
  return `${path.relative(process.cwd(), location.file)}:${location.line}`;
}

function printSection(title: string, lines: string[]): void {
  console.log(`\n${title}`);
  if (lines.length === 0) {
    console.log('  - none');
    return;
  }

  for (const line of lines) {
    console.log(`  - ${line}`);
  }
}

async function run(): Promise<void> {
  const cssFiles = await globby('src/**/*.css', {
    cwd: process.cwd(),
    absolute: true,
  });

  const definitions = new Map<string, VariableDefinitionLocation[]>();
  const usages = new Map<string, VariableUsageLocation[]>();

  for (const file of cssFiles) {
    const content = fs.readFileSync(file, 'utf8');

    const definitionRegex = /(^|[;{\s])(\-\-[A-Za-z0-9_-]+)\s*:/gm;
    for (const match of content.matchAll(definitionRegex)) {
      const name = match[2];
      const index = match.index;
      if (index == null) {
        continue;
      }
      const location = {file, line: getLineNumber(content, index)};
      definitions.set(name, [...(definitions.get(name) ?? []), location]);
    }

    const propertyDefinitionRegex = /@property\s+(\-\-[A-Za-z0-9_-]+)/g;
    for (const match of content.matchAll(propertyDefinitionRegex)) {
      const name = match[1];
      const index = match.index;
      if (index == null) {
        continue;
      }
      const location = {file, line: getLineNumber(content, index)};
      definitions.set(name, [...(definitions.get(name) ?? []), location]);
    }

    let start = 0;
    while ((start = content.indexOf('var(', start)) !== -1) {
      let openParens = 1;
      let end = start + 4;
      let commaIndex = -1;
      while (openParens > 0 && end < content.length) {
        if (content[end] === '(') {
          openParens++;
        } else if (content[end] === ')') {
          openParens--;
        } else if (content[end] === ',' && openParens === 1) {
          if (commaIndex === -1) {
            commaIndex = end;
          }
        }
        end++;
      }

      if (openParens === 0) {
        const firstArg =
          commaIndex !== -1
            ? content.slice(start + 4, commaIndex)
            : content.slice(start + 4, end - 1);

        const nameMatch = firstArg.trim().match(/^--[A-Za-z0-9_-]+/);
        if (nameMatch) {
          const name = nameMatch[0];
          const hasFallback = commaIndex !== -1;
          const location = {
            file,
            line: getLineNumber(content, start),
            hasFallback,
          };
          usages.set(name, [...(usages.get(name) ?? []), location]);
        }
      }
      start += 4; // Move past 'var(' to find next occurrence (including nested ones)
    }
  }

  const definedNames = [...definitions.keys()].sort();
  const usedNames = [...usages.keys()].sort();

  const duplicateDefinitions = definedNames.filter(
    (name) => (definitions.get(name)?.length ?? 0) > 1
  );
  const undefinedUsages = usedNames.filter((name) => {
    if (allowedUndefinedVariables.has(name)) {
      return false;
    }

    if (definitions.has(name)) {
      return false;
    }

    const entries = usages.get(name) ?? [];
    return entries.some((entry) => !entry.hasFallback);
  });

  const definitionLines = definedNames.map((name) => {
    const entries = definitions.get(name) ?? [];
    return `${name} (${entries.length}) => ${entries
      .map((entry) => formatLocation(entry))
      .join(', ')}`;
  });

  const usageLines = usedNames.map((name) => {
    const entries = usages.get(name) ?? [];
    return `${name} (${entries.length}) => ${entries
      .map((entry) => formatLocation(entry))
      .join(', ')}`;
  });

  const duplicateDefinitionLines = duplicateDefinitions.map((name) => {
    const entries = definitions.get(name) ?? [];
    return `${name} (${entries.length}) => ${entries
      .map((entry) => formatLocation(entry))
      .join(', ')}`;
  });

  const undefinedUsageLines = undefinedUsages.map((name) => {
    const entries = usages.get(name) ?? [];
    return `${name} (${entries.length}) => ${entries
      .map((entry) => formatLocation(entry))
      .join(', ')}`;
  });

  console.log('CSS variable audit report');
  console.log(`Scanned ${cssFiles.length} CSS files under src/`);
  console.log(
    `Found ${definedNames.length} unique variable definitions and ${usedNames.length} unique variable usages`
  );

  printSection('Defined variables', definitionLines);
  printSection('Used variables', usageLines);
  printSection(
    'Duplicate variable definitions (warning)',
    duplicateDefinitionLines
  );
  printSection('Used but undefined variables (error)', undefinedUsageLines);

  if (undefinedUsages.length > 0) {
    console.error(
      `\n❌ CSS variable audit failed: ${undefinedUsages.length} undefined variable name(s) found.`
    );
    process.exitCode = 1;
    return;
  }

  console.log(
    '\n✅ CSS variable audit passed: no undefined variable usages found.'
  );
}

run().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(
    `❌ CSS variable audit failed with an unexpected error: ${message}`
  );
  process.exitCode = 1;
});
