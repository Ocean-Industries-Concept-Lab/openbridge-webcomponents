/**
 * docs-gen.ts  —  generate JSDoc for an OpenBridge web-component file.
 *
 * Usage:
 *   pnpm ts-node script/docgen/docs-gen.ts <path/to/component.ts>
 *   pnpm ts-node script/docgen/docs-gen.ts --all
 */
import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';
import {config} from 'dotenv';
import OpenAI from 'openai';
import {globby} from 'globby';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config(); // loads .env
const MODEL = process.env.OPENAI_MODEL ?? 'gpt-4o';
const apiKey = process.env.OPENAI_API_KEY!;
if (!apiKey) throw new Error('OPENAI_API_KEY missing in .env');

// ---------- static system-prompt ----------
const SYSTEM_PROMPT = await fs.readFile(
  path.join(__dirname, 'prompt-system.txt'),
  'utf8'
);

// ---------- helper ----------
async function readIf(file: string) {
  try {
    return await fs.readFile(file, 'utf8');
  } catch {
    return '(no file found)';
  }
}

// ---------- main ----------
async function generateDocsFor(tsPath: string) {
  const tsCode = await fs.readFile(tsPath, 'utf8');
  const story = await readIf(tsPath.replace(/\.ts$/, '.stories.ts'));
  const css = await readIf(tsPath.replace(/\.ts$/, '.css'));

  const compName = path.basename(tsPath).replace(/\.ts$/, '');
  const guidelines = ''; // no live lookup in this version

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
Do NOT modify executable code.  If usage guidance is missing,
add a TODO(designer) note.  Return ONLY the full .ts file with
JSDoc comments inserted.`;

  const openai = new OpenAI({apiKey});
  const chat = await openai.chat.completions.create({
    model: MODEL,
    temperature: 0.2,
    messages: [
      {role: 'system', content: SYSTEM_PROMPT},
      {role: 'user', content: userPrompt},
    ],
  });

  const newCode = chat.choices[0].message!.content!;
  const outPath = tsPath.replace(/\.ts$/, '.generated.ts');
  await fs.writeFile(outPath, newCode);
  console.log('✅  Wrote', outPath);
}

// ---------- CLI ----------
const arg = process.argv[2];
if (!arg) {
  console.error('Usage: docs-gen.ts <component.ts>  |  --all');
  process.exit(1);
}

if (arg === '--all') {
  const files = await globby('src/components/**/*.{ts,tsx}', {
    gitignore: true,
    ignore: ['**/*.stories.*', '**/*.test.*', '**/*.generated.*'],
  });
  for (const f of files) await generateDocsFor(f);
} else {
  await generateDocsFor(arg);
}
