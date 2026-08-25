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

export function collectEnums(ts, sourceFile, seen = new Set()) {
  const map = new Map();
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
    }
  });
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
      const classDoc = moduleDoc.declarations?.find(
        (d) => d.name === node.name.text
      );
      if (!classDoc) return;
      const tags = [];
      for (const jsDoc of node.jsDoc ?? []) {
        for (const tag of jsDoc.tags ?? []) {
          if (tag.tagName.text !== 'availableWhen') continue;
          const m = /^([\w$]+)\s+(.+)$/.exec(tagText(tag));
          if (m) tags.push({name: m[1], cond: m[2]});
        }
      }
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
              tags.push({name: member.name.text, cond: tagText(tag)});
          }
        }
      }
      if (!tags.length) return;
      const sf = node.getSourceFile();
      if (!enumCache.has(sf.fileName))
        enumCache.set(sf.fileName, collectEnums(ts, sf));
      const enums = enumCache.get(sf.fileName);
      for (const {name, cond} of tags) {
        const member = classDoc.members?.find((m) => m.name === name);
        if (!member) continue;
        const sentence = `Available when \`${cond}\`.`;
        member.availableWhen = cond;
        member.description = member.description
          ? `${member.description}\n\n${sentence}`
          : sentence;
        const attr = classDoc.attributes?.find((a) => a.fieldName === name);
        if (attr) attr.description = member.description;
        const mapped = parseCondition(cond, (id) => enums.get(id));
        if (mapped) member.availableWhenIf = mapped;
      }
    },
  };
}
