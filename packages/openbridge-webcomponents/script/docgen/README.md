# OpenBridge Doc-Generator

A tiny CLI that injects rich JSDoc comments into any OpenBridge source file.
It reads the `.ts` plus sibling `.stories.ts` / `.css` (if present),
auto-detects the code pattern (concrete component, pure function module, or abstract base class),
feeds everything to GPT using a shared prompt, and writes a
`*.generated.ts` review copy next to the original.

---

## 1 - Install dev-dependencies

```bash
npm i -D tsx typescript dotenv openai globby
```

---

## 2 - Create `.env` in the repo root (git-ignored)

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_MODEL=gpt-4.1      (or whichever you prefer)
```

---

## 3 - Run

### A single source file

```bash
npx tsx script/docgen/docs-gen.ts \
  src/building-blocks/external-scale/external-scale.ts
```

### Every `*.ts` in one folder (non-recursive) (easiest to use)

```bash
npx tsx script/docgen/docs-gen.ts \
  src/building-blocks/external-scale
```

### The whole source tree (recursive)

```bash
npx tsx script/docgen/docs-gen.ts --all
```

Each run produces `<name>.generated.ts` next to the original.
Inspect the diff, then rename or copy the new JSDoc into the real file.

---

## Code pattern detection

The script auto-detects three patterns and tailors the GPT prompt accordingly:

| Pattern                  | Detection heuristic                                        | Prompt behavior                                                           |
| ------------------------ | ---------------------------------------------------------- | ------------------------------------------------------------------------- |
| **Concrete component**   | Has `@customElement(...)` decorator                        | JSDoc on class + properties; `@slot`/`@fires` tags                        |
| **Pure function module** | No class or no LitElement - only exported functions        | Module-level JSDoc at top of file; short JSDoc per exported function/type |
| **Abstract base class**  | Has `class ... extends LitElement` but no `@customElement` | JSDoc on class + properties; `@ignore` tag; documents concrete subclasses |

---

## What gets added

- Component/module-level doc block (Overview, Features, Usage, Slots, etc.)
- Inline `/** ... */` for each `@property`
- Final tag block with `@slot` and `@fires` so `custom-elements.json` stays complete
- _(No extra `@property` tags - the inline comments cover those)_
- Executable code is **never** modified.

---

## Extras

| Need         | One-liner                                                |
| ------------ | -------------------------------------------------------- |
| VS Code task | `"command": "npx tsx script/docgen/docs-gen.ts ${file}"` |

---

## Troubleshooting

| Error                              | Fix                                     |
| ---------------------------------- | --------------------------------------- |
| `OPENAI_API_KEY missing`           | Add key to `.env`.                      |
| `ERR_UNKNOWN_FILE_EXTENSION ".ts"` | Always run via `tsx`, not plain `node`. |
| `insufficient_quota`               | Add billing to your OpenAI account.     |

---

All helper scripts live in `script/docgen/` so they never ship with the web-component bundle.
