/**
 * Interactive component scaffolder — `npm run new:component`.
 *
 * Writes a component, its story and an empty stylesheet that already pass
 * `npm run lint` and `npm run format:check`, so the first run of the gates
 * reports the author's work rather than the scaffold's. Name derivation and the
 * templates live in `script/new-component/scaffold.ts`, which is unit-tested.
 *
 * It stops short of the rest of the creation checklist (AGENTS.md § 5) and
 * prints it instead: the JSDoc body, the keyboard spec for an interactive
 * component, and `npm run analyze` are the author's, and a generated
 * placeholder test would assert nothing.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

import {question, select, multiselect} from '@topcli/prompts';
import {globSync} from 'glob';
import * as prettier from 'prettier';

import {
  FAMILIES,
  NAME_PATTERN,
  TAG_PATTERN,
  baseName,
  componentDir,
  renderFiles,
  toKebabCase,
  type ComponentType,
  type Lifecycle,
} from './script/new-component/scaffold.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, 'src');

/** Every tag already registered, so a collision is refused rather than shadowed. */
function registeredTags(): Set<string> {
  const files = globSync('**/*.ts', {
    cwd: SRC,
    ignore: ['icons/**', 'generated/**'],
    nodir: true,
    absolute: true,
  });
  const tags = new Set<string>();
  for (const file of files) {
    for (const match of fs
      .readFileSync(file, 'utf8')
      .matchAll(/@customElement\('([^']+)'\)/g)) {
      tags.add(match[1]);
    }
  }
  return tags;
}

const name = await question(
  'Component name (without the Obc prefix, UpperCamelCase)',
  {
    validators: [
      {
        validate: (value) => NAME_PATTERN.test(value),
        message: 'Must be UpperCamelCase, e.g. HydraulicValveX2',
      },
    ],
  }
);

const type = await select<ComponentType>('Family', {
  choices: Object.entries(FAMILIES).map(([value, family]) => ({
    value: value as ComponentType,
    label: family.label,
  })),
  maxVisible: 10,
});

// Acronyms and digit groups make the derived tag a suggestion, not a result:
// `Valve43` is as likely to be `valve-4-3` as `valve-43`.
const suggestedTag = `obc-${toKebabCase(name)}`;
const tag =
  (await question(`Element tag [${suggestedTag}]`, {
    defaultValue: suggestedTag,
    validators: [
      {
        validate: (value) => !value || TAG_PATTERN.test(value),
        message: 'Must look like obc-hydraulic-valve-x-2',
      },
    ],
  })) || suggestedTag;

// Checked here rather than in a validator: accepting the suggested tag with
// Enter returns the default without running them.
const dir = path.join(SRC, componentDir({tag, type}));
const clash = registeredTags().has(tag)
  ? `${tag} is already registered`
  : fs.existsSync(dir)
    ? `${path.relative(ROOT, dir)} already exists`
    : null;
if (clash) {
  console.error(`\n${clash}. Pick another name, or delete it first.`);
  process.exit(1);
}

const lifecycle = await select<Lifecycle>('Lifecycle (class JSDoc tag)', {
  choices: [
    {value: 'experimental', label: 'experimental — early stage, API will move'},
    {value: 'beta', label: 'beta — feature-complete, API may still change'},
    {value: 'stable', label: 'stable — production-ready'},
  ],
});

const version = await select('Design version tag', {
  choices: [
    {value: '6.1', label: '6.1'},
    {value: '6.0', label: '6.0'},
    {value: 'none', label: 'none — not tied to a design release'},
  ],
});

const title = await question(
  `Storybook title under ${FAMILIES[type].group}/ (Title Case)`,
  {
    defaultValue: name.replace(/([a-z0-9])([A-Z])/g, '$1 $2'),
  }
);

const files = await multiselect('Create files', {
  choices: ['css'],
  preSelectedChoices: ['css'],
});

const spec = {
  name,
  tag,
  type,
  lifecycle,
  title: title || name.replace(/([a-z0-9])([A-Z])/g, '$1 $2'),
  version: version === 'none' ? undefined : version,
  hasCss: files.includes('css'),
};

/** Format with the repo's own config, so `format:check` cannot disagree. */
async function format(content: string, absPath: string): Promise<string> {
  if (!content.trim()) return content;
  const config = await prettier.resolveConfig(absPath);
  return prettier.format(content, {...config, filepath: absPath});
}

fs.mkdirSync(dir, {recursive: true});
const written: string[] = [];
for (const [relPath, content] of Object.entries(renderFiles(spec))) {
  const absPath = path.join(SRC, relPath);
  fs.writeFileSync(absPath, await format(content, absPath));
  written.push(path.join('src', relPath));
}

const base = baseName(spec);
console.log(`\nCreated:\n${written.map((file) => `  ${file}`).join('\n')}`);
console.log(`
Next (AGENTS.md § 5):
  1. Read the nearest sibling in src/${FAMILIES[type].dir}/ before writing —
     it carries the mixins, the story set and the JSDoc shape to follow.
  2. Replace the TODO(designer) block in ${base}.ts with the real JSDoc, and
     document each public property with an @property tag in that class block.
  3. Interactive? Name the APG pattern in the JSDoc and pin its keys in
     ${base}-keyboard.spec.ts (docs/agents/a11y.md § 1, § 9).
  4. npm run analyze     # story args reach the element only through the manifest
  5. npm run lint && npm run typecheck
  6. npx vitest run --project storybook ${base} --update   # then again without --update
`);
