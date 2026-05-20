import fs from 'fs';
import path from 'path';
import {globby} from 'globby';

const allowedUndefinedVariables = new Set([
  '--alert-components-badge-label-spacing',
  '--app-components-alert-components-general-notification-item-icon-size-large',
  '--app-components-badge-border-radius',
  '--app-components-badge-icon-size',
  '--app-components-badge-icon-size-flat',
  '--app-components-badge-icon-size-large',
  '--app-components-badge-label-spacing',
  '--app-components-badge-min-size-large',
  '--app-components-badge-padding',
  '--app-components-global-alert-item-counter-spacing',
  '--color-container-background-color',
  '--course',
  '--critical-enabled-background-color',
  '--critical-enabled-border-color',
  '--critical-focused-background-color',
  '--critical-focused-border-color',
  '--critical-hover-background-color',
  '--critical-hover-border-color',
  '--critical-pressed-background-color',
  '--critical-pressed-border-color',
  '--custom-width',
  '--enabled-background-color',
  '--global-size-spacing-list-item-menu-padding-horizonal-list-item',
  '--grid-columns',
  '--grid-columns-rest',
  '--heading',
  '--image-size',
  '--menu-navigation-components-date-item-padding-vertical',
  '--menu-navigation-components-tab-item-divider-height',
  '--on-container-active-color',
  '--percent',
  '--scale',
  '--spinner-progress-deg',
  '--ui-components-icon-toggle-button-horizontal-item-touch-target-size',
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
    const isPaletteFile = file.endsWith(
      `${path.sep}src${path.sep}palettes${path.sep}variables.css`
    );

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

    if (isPaletteFile) {
      continue;
    }

    const usageRegex = /var\(\s*(\-\-[A-Za-z0-9_-]+)\s*([^)]*)\)/g;
    for (const match of content.matchAll(usageRegex)) {
      const name = match[1];
      const hasFallback = match[2].includes(',');
      const index = match.index;
      if (index == null) {
        continue;
      }
      const location = {file, line: getLineNumber(content, index), hasFallback};
      usages.set(name, [...(usages.get(name) ?? []), location]);
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
