/*─────────────────────────────────────────────────────────────────────────*\
│ docs-gen.ts – generate JSDoc comments for OpenBridge source files.      │
│                                                                         │
│ Supports three code patterns:                                           │
│   a) Concrete web components  (class with @customElement)               │
│   b) Pure function modules    (no class, only exported functions)       │
│   c) Abstract base classes    (class without @customElement)            │
│                                                                         │
│ Usage examples (run from packages/openbridge-webcomponents/):           │
│   npx tsx script/docgen/docs-gen.ts src/components/radio/radio.ts       │
│   npx tsx script/docgen/docs-gen.ts src/building-blocks/external-scale  │
│   npx tsx script/docgen/docs-gen.ts --all                               │
\*─────────────────────────────────────────────────────────────────────────*/

/* ▲1  Standard library + deps  */
import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';
import {config} from 'dotenv';
import OpenAI from 'openai';
import {globby} from 'globby';
import {statSync} from 'node:fs';

/* ▲2  __dirname shim because we're in ESM land  */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ▲3  Load secrets from .env  */
config(); // populates process.env
const MODEL = process.env.OPENAI_MODEL ?? 'gpt-4.1';
const apiKey = process.env.OPENAI_API_KEY!;
if (!apiKey) throw new Error('OPENAI_API_KEY missing in .env');

/* ▲4  Read the big, static system-prompt once  */
const SYSTEM_PROMPT = await fs.readFile(
  path.join(__dirname, 'prompt-system.txt'),
  'utf8'
);

/* ▲5  Tiny helper: read a file if it exists, otherwise stub text  */
async function readIf(file: string) {
  try {
    return await fs.readFile(file, 'utf8');
  } catch {
    return '(no file found)';
  }
}

/* ▲5b  Detect which code pattern the file uses  */
enum CodePattern {
  concreteComponent = 'concrete-component',
  pureFunctionModule = 'pure-function-module',
  abstractBaseClass = 'abstract-base-class',
}

function detectCodePattern(tsCode: string): CodePattern {
  const hasCustomElement = /@customElement\s*\(/.test(tsCode);
  const hasClassDecl = /\bclass\s+\w+/.test(tsCode);
  const hasAbstract = /\babstract\s+class\b/.test(tsCode);

  if (hasCustomElement) return CodePattern.concreteComponent;
  if (
    hasAbstract ||
    (hasClassDecl &&
      /extends\s+LitElement/.test(tsCode) &&
      !hasCustomElement)
  ) {
    return CodePattern.abstractBaseClass;
  }
  return CodePattern.pureFunctionModule;
}

function patternInstructions(pattern: CodePattern): string {
  switch (pattern) {
    case CodePattern.concreteComponent:
      return [
        'This file is a CONCRETE WEB COMPONENT (has @customElement decorator).',
        'Insert JSDoc for the class and every public property/event.',
        "The JSDoc should go right before @customElement('name').",
        'Use @slot and @fires tags at the end of the class JSDoc.',
        'Do NOT include @property tags in the tag block.',
      ].join('\n');

    case CodePattern.pureFunctionModule:
      return [
        'This file is a PURE FUNCTION MODULE (no component class - only exported functions).',
        'Place a comprehensive JSDoc block comment at the TOP of the module (above the first export).',
        'Document the module purpose, what it renders/computes, layout model, and usage examples.',
        'Also add short JSDoc to each exported function, interface, enum, and type.',
        'There is no @customElement - do NOT invent one.',
      ].join('\n');

    case CodePattern.abstractBaseClass:
      return [
        'This file is an ABSTRACT BASE CLASS (not registered as a custom element).',
        'Insert JSDoc for the class and every public property/event.',
        'At the end of the class JSDoc tag block, include @ignore to signal this is not a standalone API.',
        'Document which concrete subclasses use this base (if visible from imports/comments).',
        'Include @slot and @fires tags as usual.',
      ].join('\n');
  }
}

/*─────────────────────────────────────────────────────────────────────────*\
|  ▲6  Core routine: generateDocsFor                                     |
|       • Loads component TS, story, CSS                                 |
|       • Detects code pattern (concrete / pure-fn / abstract)           |
|       • Builds GPT prompt                                              |
|       • Calls OpenAI                                                   |
|       • Writes <name>.generated.ts next to original                    |
\*─────────────────────────────────────────────────────────────────────────*/
async function generateDocsFor(tsPath: string) {
  // 6a. Pull in main file + optional siblings
  const tsCode = await fs.readFile(tsPath, 'utf8');
  const story = await readIf(tsPath.replace(/\.ts$/, '.stories.ts'));
  const css = await readIf(tsPath.replace(/\.ts$/, '.css'));

  // 6b. Detect code pattern to tailor the prompt
  const pattern = detectCodePattern(tsCode);
  console.log('  📂 %s  →  pattern: %s', tsPath, pattern);

  // 6c. At the moment we don't do live web guideline fetch → keep blank
  const guidelines = '';

  // 6d. Compose the per-file USER prompt (system prompt is separate)
  const userPrompt = [
    '<---CODE--->',
    tsCode,
    '',
    '<---STORY--->',
    story,
    '',
    '<---CSS--->',
    css,
    '',
    '<---GUIDELINE--->',
    guidelines,
    '',
    '<---PATTERN--->',
    patternInstructions(pattern),
    '',
    '<---END--->',
    patternInstructions(pattern),
    '',
    'Do NOT modify code, ONLY add documentation. This includes imports and enums.',
    "DON'T change or remove any code. It is very IMPORTANT that you don't remove anything.",
    'You can modify comments and documentation, but ONLY that.',
    'Remember that comments in code is not good code. Only docs.',
    'If usage guidance is missing, add a TODO(designer) note.',
    '',
    'Return ONLY the full .ts file with JSDoc comments inserted - also document enums.',
    'DO NOT wrap in Markdown (no triple backticks).',
  ].join('\n');

  // 6e. One OpenAI chat completion
  const openai = new OpenAI({apiKey});
  const chat = await openai.chat.completions.create({
    model: MODEL,
    temperature: 0.2, // low → deterministic
    messages: [
      {role: 'system', content: SYSTEM_PROMPT}, // rules/template
      {role: 'user', content: userPrompt}, // file-specific
    ],
  });

  // 6f. Write output next to source (<name>.generated.ts)
  const newCode = chat.choices[0].message!.content!;
  const generatedPath = tsPath.replace(/\.ts$/, '.generated.ts');
  await fs.writeFile(generatedPath, newCode);
  console.log('  ✅ Wrote', generatedPath);
}

/*─────────────────────────────────────────────────────────────────────────*\
|  ▲7  CLI dispatcher                                                     |
|       • <folder> → every *.ts in that folder (ignores stories/tests)    |
|       • <file.ts> → exactly that file                                   |
|       • --all     → whole source tree                                   |
\*─────────────────────────────────────────────────────────────────────────*/

const IGNORE = [
  '**/*.stories.*',
  '**/*.story.*', // covers .story.ts if you ever use that pattern
  '**/*.test.*',
  '**/*.generated.*',
];

const arg = process.argv[2];
if (!arg) {
  console.error(`Usage:
    docs-gen.ts <component.ts>
    docs-gen.ts <component-folder>
    docs-gen.ts --all`);
  process.exit(1);
}

if (arg === '--all') {
  const files = await globby(
    [
      'src/building-blocks/**/*.{ts,tsx}',
      'src/navigation-instruments/**/*.{ts,tsx}',
      'src/bars-graphs/**/*.{ts,tsx}',
      'src/components/**/*.{ts,tsx}',
      'src/automation/**/*.{ts,tsx}',
      'src/integration-systems/**/*.{ts,tsx}',
      'src/pages/**/*.{ts,tsx}',
      'src/svghelpers/**/*.{ts,tsx}',
      'src/charthelpers/**/*.{ts,tsx}',
    ],
    {
      gitignore: true,
      ignore: IGNORE,
    }
  );
  for (const f of files) await generateDocsFor(f);
} else if (statSync(arg).isDirectory()) {
  // process every .ts/.tsx directly inside that folder
  const files = await globby([`${arg}/*.ts`, `${arg}/*.tsx`], {
    ignore: IGNORE,
  });
  if (files.length === 0) {
    console.error('No .ts files found in', arg);
    process.exit(1);
  }
  for (const f of files) await generateDocsFor(f);
} else {
  await generateDocsFor(arg); // treat arg as explicit file path
}
