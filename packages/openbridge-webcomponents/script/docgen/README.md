# 📄 OpenBridge Doc-Generator

A tiny CLI that injects rich JSDoc comments into any OpenBridge web-component source file.  
It reads the component’s `.ts` plus sibling `.stories.ts` / `.css` (if present),  
feeds them to GPT-4o using a shared prompt, and writes a  
`*.generated.ts` review copy next to the original.

---

## 1 · Install dev-dependencies

```bash
npm i -D tsx typescript dotenv openai globby
```

---

## 2 · Create `.env` in the repo root (git-ignored)

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_MODEL=gpt-4.1      (or whichever you prefer)
```

---

## 3 · Run

### A single component file

```bash
npx tsx script/docgen/docs-gen.ts \
  src/components/button/button.ts
```

### Every `*.ts` in one folder (non-recursive) (easiest to use)

```bash
npx tsx script/docgen/docs-gen.ts \
  src/components/button
```

### The whole component tree (recursive)

```bash
npx tsx script/docgen/docs-gen.ts --all
```

Each run produces `<name>.generated.ts`.  
Inspect the diff, then rename or copy the new JSDoc into the real file.

---

## ✅ What gets added

- Component-level doc block (Overview → Features → Usage → Slots …)  
- Inline `/** … */` for each `@property`  
- Final tag block with `@slot` and `@fires` so `custom-elements.json` stays complete  
- *(No extra `@property` tags — the inline comments cover those)*  
- Executable code is **never** modified.

---

## 🛠 Extras

| Need               | One-liner                                             |
|--------------------|-------------------------------------------------------|
| VS Code task       | `"command": "npx tsx script/docgen/docs-gen.ts \${file}"` |
| Interactive picker | `node script/docgen/agent.ts` (prompts for file)      |

---

## 🐞 Troubleshooting

| Error                                | Fix                                         |
|-------------------------------------|---------------------------------------------|
| `OPENAI_API_KEY missing`            | Add key to `.env`.                          |
| `ERR_UNKNOWN_FILE_EXTENSION ".ts"`  | Always run via `tsx`, not plain `node`.     |
| `insufficient_quota`                | Add billing to your OpenAI account. |

---

All helper scripts live in `script/docgen/` so they never ship with the web-component bundle.