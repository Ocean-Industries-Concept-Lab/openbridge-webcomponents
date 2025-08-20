/*─────────────────────────────────────────────────────────────────────────*\
│ docs-gen.ts – generate JSDoc comments for an OpenBridge web component.  │
│                                                                         │
│ Usage examples (run from repo root):                                    │
│   npx tsx script/docgen/docs-gen.ts src/components/radio/radio.ts       │
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

/* ▲2  __dirname shim because we’re in ESM land  */
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

/*─────────────────────────────────────────────────────────────────────────*\
|  ▲6  Core routine: generateDocsFor                                     |
|       • Loads component TS, story, CSS                                 |
|       • Builds GPT prompt                                              |
|       • Calls OpenAI                                                   |
|       • Writes <name>.generated.ts next to original                    |
\*─────────────────────────────────────────────────────────────────────────*/
async function generateDocsFor(tsPath: string) {
  // 6a. Pull in main file + optional siblings
  const tsCode = await fs.readFile(tsPath, 'utf8');
  const story = await readIf(tsPath.replace(/\.ts$/, '.stories.ts'));
  const css = await readIf(tsPath.replace(/\.ts$/, '.css'));

  // 6b. At the moment we don’t do live web guideline fetch → keep blank
  const guidelines = '';

  // 6c. Compose the per-file USER prompt (system prompt is separate)
  const userPrompt = `
  <---CODE--->
  ${tsCode}

  <---STORY--->
  ${story}

  <---CSS--->
  ${css}

  <---GUIDELINE--->
  ${guidelines}

  <---END--->
  Insert JSDoc for the class and every public property/event.
  Do NOT modify code, ONLY add documentation. This includes imports, and enums, DON't change or remove any code. It's very IMPORTANT that you don't remove anything. You can modify comments and documentation, but ONLY that. Remember that comments in code is not good code. Only docs. 
  If usage guidance is missing, add a TODO(designer) note.

  Return ONLY the full .ts file with JSDoc comments inserted — remember that if there are enums, are docs to these as well, and make sure the docs comes right before @customElement('name').
  DO NOT wrap in Markdown (no triple backticks).
  `;

  // 6d. One OpenAI chat completion
  const openai = new OpenAI({apiKey});
  const chat = await openai.chat.completions.create({
    model: MODEL,
    temperature: 0.2, // low → deterministic
    messages: [
      {role: 'system', content: SYSTEM_PROMPT}, // rules/template
      {role: 'user', content: userPrompt}, // file-specific
    ],
  });

  // 6e. Write output next to source (<name>.generated.ts)
  const newCode = chat.choices[0].message!.content!;
  await fs.writeFile(tsPath, newCode);
  console.log('✅  Overwrote', tsPath);
}

/*─────────────────────────────────────────────────────────────────────────*\
|  ▲7  CLI dispatcher                                                     |
|       • <folder> → every *.ts in that folder (ignores stories/tests)    |
|       • <file.ts> → exactly that file                                   |
|       • --all     → whole component tree  (optional)                    |
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
  const files = await globby('src/components/**/*.{ts,tsx}', {
    gitignore: true,
    ignore: IGNORE,
  });
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
