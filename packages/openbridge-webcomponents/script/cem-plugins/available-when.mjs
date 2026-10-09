import fs from 'node:fs';
import path from 'node:path';

const SINGLE = /^([\w$]+)\s*(==|!=)\s*(.+)$/;

export function parseCondition(cond, resolveEnum) {
  if (/&&|\|\||\bin\s*\[/.test(cond)) return undefined;
  const m = SINGLE.exec(cond.trim());
  if (!m) return undefined;
  const [, arg, op, raw] = m;
  const rhs = raw.trim();
  const eq = op === '==';
  if (rhs === 'true') return {arg, truthy: eq};
  if (rhs === 'false') return {arg, truthy: !eq};
  if (rhs === 'undefined' || rhs === 'null') return {arg, exists: !eq};
  if (rhs === "''" || rhs === '""') return {arg, truthy: !eq};
  if (rhs === '[]') return eq ? {arg, eq: []} : {arg, neq: []};
  if (/^-?\d+(\.\d+)?$/.test(rhs))
    return eq ? {arg, eq: Number(rhs)} : {arg, neq: Number(rhs)};
  const q = /^(['"])(.*)\1$/.exec(rhs);
  if (q) return eq ? {arg, eq: q[2]} : {arg, neq: q[2]};
  const v = resolveEnum(rhs);
  if (v === undefined) return undefined;
  return eq ? {arg, eq: v} : {arg, neq: v};
}

function tagText(tag) {
  const c = tag.comment;
  return (
    typeof c === 'string' ? c : (c ?? []).map((p) => p.text).join('')
  ).trim();
}

// A Lit mixin factory (`function XMixin(superClass) { class XMixinClass
// extends superClass {…} return XMixinClass; }`) is registered in the
// manifest under the *outer* function's name with `kind: 'mixin'` — CEM's
// own class-plugin also pushes a second, `kind: 'class'` entry for the
// inner class declaration while walking the same AST, but that entry is
// unexported and dropped by CEM's post-processing before the manifest is
// written. Mutating it (a lookup by `node.name.text` alone would find it)
// is silently thrown away, so walk up to the enclosing factory and target
// the surviving mixin declaration instead.
function enclosingMixinName(ts, node) {
  for (let n = node.parent; n; n = n.parent) {
    if (ts.isFunctionDeclaration(n) && n.name) return n.name.text;
    if (
      ts.isVariableDeclaration(n) &&
      n.name &&
      ts.isIdentifier(n.name) &&
      n.initializer &&
      (ts.isArrowFunction(n.initializer) ||
        ts.isFunctionExpression(n.initializer))
    )
      return n.name.text;
  }
  return undefined;
}

// Keys are member names (`Linear`, `T.Linear`) and, when nothing else claims
// the name, string values (`linear`) — the grammar allows either spelling.
export function collectEnums(ts, sourceFile, seen = new Set()) {
  const map = new Map();
  const values = [];
  ts.forEachChild(sourceFile, (n) => {
    if (!ts.isEnumDeclaration(n)) return;
    let auto = 0;
    for (const mem of n.members) {
      const key = mem.name.getText(sourceFile);
      let value;
      const init = mem.initializer;
      if (
        init &&
        (ts.isStringLiteral(init) || ts.isNoSubstitutionTemplateLiteral(init))
      )
        value = init.text;
      else if (init && ts.isNumericLiteral(init)) value = Number(init.text);
      else if (!init) value = auto;
      if (typeof value === 'number') auto = value + 1;
      if (value === undefined) continue;
      if (!map.has(key)) map.set(key, value);
      map.set(`${n.name.text}.${key}`, value);
      if (typeof value === 'string') values.push(value);
    }
  });
  for (const v of values) if (!map.has(v)) map.set(v, v);
  if (seen.size === 0) {
    seen.add(sourceFile.fileName);
    ts.forEachChild(sourceFile, (n) => {
      if (!ts.isImportDeclaration(n) || !ts.isStringLiteral(n.moduleSpecifier))
        return;
      const spec = n.moduleSpecifier.text;
      if (!spec.startsWith('.')) return;
      const file = path.resolve(
        path.dirname(sourceFile.fileName),
        spec.replace(/\.js$/, '.ts')
      );
      if (!fs.existsSync(file) || seen.has(file)) return;
      seen.add(file);
      const sf = ts.createSourceFile(
        file,
        fs.readFileSync(file, 'utf8'),
        ts.ScriptTarget.ES2020,
        true
      );
      for (const [k, v] of collectEnums(ts, sf, seen))
        if (!map.has(k)) map.set(k, v);
    });
  }
  return map;
}

export function availableWhenPlugin() {
  const enumCache = new Map();
  return {
    name: 'obc-available-when',
    analyzePhase({ts, node, moduleDoc}) {
      if (!ts.isClassDeclaration(node) || !node.name) return;
      const mixinName = enclosingMixinName(ts, node);
      const classDoc =
        (mixinName &&
          moduleDoc.declarations?.find(
            (d) => d.kind === 'mixin' && d.name === mixinName
          )) ||
        moduleDoc.declarations?.find((d) => d.name === node.name.text);
      if (!classDoc) return;
      // Field-level tags first, class-level second: a Map keeps one entry
      // per property name, and the later (class-level) write for the same
      // name overwrites the earlier (field-level) one — so a property
      // documented both ways (a transitional file the Task 8 hoist left
      // partially inline) is applied exactly once, from the class-level tag.
      const tags = new Map();
      for (const member of node.members) {
        if (
          !ts.isPropertyDeclaration(member) ||
          !member.name ||
          !ts.isIdentifier(member.name)
        )
          continue;
        for (const jsDoc of member.jsDoc ?? []) {
          for (const tag of jsDoc.tags ?? []) {
            if (tag.tagName.text === 'availableWhen')
              tags.set(member.name.text, tagText(tag));
          }
        }
      }
      for (const jsDoc of node.jsDoc ?? []) {
        for (const tag of jsDoc.tags ?? []) {
          if (tag.tagName.text !== 'availableWhen') continue;
          const m = /^([\w$]+)\s+(.+)$/.exec(tagText(tag));
          if (m) tags.set(m[1], m[2]);
        }
      }
      if (!tags.size) return;
      const sf = node.getSourceFile();
      if (!enumCache.has(sf.fileName))
        enumCache.set(sf.fileName, collectEnums(ts, sf));
      const enums = enumCache.get(sf.fileName);
      for (const [name, cond] of tags) {
        const member = classDoc.members?.find((m) => m.name === name);
        if (!member) continue;
        const sentence = `Available when \`${cond}\`.`;
        member.availableWhen = cond;
        if (!member.description || !member.description.endsWith(sentence)) {
          member.description = member.description
            ? `${member.description}\n\n${sentence}`
            : sentence;
        }
        const attr = classDoc.attributes?.find((a) => a.fieldName === name);
        if (
          attr &&
          (!attr.description || !attr.description.endsWith(sentence))
        ) {
          attr.description = member.description;
        }
        const mapped = parseCondition(cond, (id) => enums.get(id));
        if (mapped) member.availableWhenIf = mapped;
      }
    },
  };
}
