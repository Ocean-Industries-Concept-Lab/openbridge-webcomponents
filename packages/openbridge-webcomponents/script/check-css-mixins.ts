/**
 * @module CSSMixinAudit
 * @description
 * This script audits CSS mixins within the project's source directory. It performs a comprehensive
 * scan of all CSS files to match mixin definitions (@define-mixin) against their usages (@mixin).
 *
 * Features:
 * - Scans all CSS files under the src directory (using glob src/\*\* / *.css).
 * - Identifies unique mixin definitions and their locations.
 * - Identifies unique mixin usages and their locations.
 * - Detects duplicate definitions (warning).
 * - Detects usages of undefined mixins (error).
 * - Detects unused mixin definitions (warning).
 * - Exits with code 1 if any undefined mixin usages are found, suitable for CI pipelines.
 *
 * Usage Examples:
 * ```bash
 * # Run via npm script
 * npm run lint:mixins
 *
 * # Run directly using tsx
 * tsx script/check-css-mixins.ts
 * ```
 *
 * Expected Output:
 * ```
 * CSS mixin audit report
 * Scanned 73 CSS files under src/
 * Found 73 unique mixin definitions and 41 unique mixin usages
 *
 * Defined mixins
 *   - font-label (1) => src/mixins/fonts.css:1
 *   ...
 *
 * ✅ CSS mixin audit passed: no undefined mixin usages found.
 * ```
 *
 * Note: This module is intended to be run as a standalone script. It does not export any public utilities.
 * It utilizes internal functions to process file content using fs, path, and globby.
 */

import fs from 'fs';
import path from 'path';
import {globby} from 'globby';

interface MixinDefinitionLocation {
  file: string;
  line: number;
}

interface MixinUsageLocation {
  file: string;
  line: number;
}

const jsDefinedMixins = new Set(['style']);

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

  const definitions = new Map<string, MixinDefinitionLocation[]>();
  const usages = new Map<string, MixinUsageLocation[]>();

  for (const file of cssFiles) {
    const content = fs.readFileSync(file, 'utf8');

    const defineRegex = /@define-mixin\s+([A-Za-z0-9_-]+)/g;
    for (const match of content.matchAll(defineRegex)) {
      const name = match[1];
      const index = match.index;
      if (index == null) {
        continue;
      }
      const location = {file, line: getLineNumber(content, index)};
      definitions.set(name, [...(definitions.get(name) ?? []), location]);
    }

    const usageRegex = /@mixin\s+([A-Za-z0-9_-]+)/g;
    for (const match of content.matchAll(usageRegex)) {
      const name = match[1];
      const index = match.index;
      if (index == null) {
        continue;
      }
      const location = {file, line: getLineNumber(content, index)};
      usages.set(name, [...(usages.get(name) ?? []), location]);
    }
  }

  const definedNames = [...definitions.keys()].sort();
  const usedNames = [...usages.keys()].sort();

  const duplicateDefinitions = definedNames.filter(
    (name) => (definitions.get(name)?.length ?? 0) > 1
  );
  const undefinedUsages = usedNames.filter(
    (name) => !definitions.has(name) && !jsDefinedMixins.has(name)
  );
  const unusedDefinitions = definedNames.filter((name) => !usages.has(name));

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

  const unusedDefinitionLines = unusedDefinitions.map((name) => {
    const entries = definitions.get(name) ?? [];
    return `${name} (${entries.length}) => ${entries
      .map((entry) => formatLocation(entry))
      .join(', ')}`;
  });

  console.log('CSS mixin audit report');
  console.log(`Scanned ${cssFiles.length} CSS files under src/`);
  console.log(
    `Found ${definedNames.length} unique mixin definitions and ${usedNames.length} unique mixin usages`
  );

  printSection('Defined mixins', definitionLines);
  printSection('Used mixins', usageLines);
  printSection(
    'Duplicate mixin definitions (warning)',
    duplicateDefinitionLines
  );
  printSection('Used but undefined mixins (error)', undefinedUsageLines);
  printSection('Defined but unused mixins (warning)', unusedDefinitionLines);

  if (undefinedUsages.length > 0) {
    console.error(
      `\n❌ CSS mixin audit failed: ${undefinedUsages.length} undefined mixin name(s) found.`
    );
    process.exitCode = 1;
    return;
  }

  console.log('\n✅ CSS mixin audit passed: no undefined mixin usages found.');
}

run().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(
    `❌ CSS mixin audit failed with an unexpected error: ${message}`
  );
  process.exitCode = 1;
});
