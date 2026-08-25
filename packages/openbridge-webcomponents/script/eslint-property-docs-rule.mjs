const TAG_BLOCK_RE = /^@(slot|fires|event|ignore|stable|beta|experimental|deprecated|attr|attribute|csspart|cssprop|cssproperty|cssstate|tag|tagname)\b/;
const PROP_LINE_RE = /^@(?:property|prop)\s+(\{[^}]*\}\s+)?([\w$]+)/;
const AVAIL_LINE_RE = /^@availableWhen\s+([\w$]+)\s+(.+)$/;
const ANY_TAG_RE = /^@(\w+)(?:\s+(.*))?$/;
const MARKDOWN_RE = /^(\s*[-*+] |\s*\d+\. |\s*\||#|```)/;
const TYPEDEF_RE = /^@typedef\b/;
// A tag glued onto the end of a description on the same physical line (e.g.
// `/** Desc. @availableWhen off==true */`) — split it off before tag
// detection, since ANY_TAG_RE only recognizes a tag at the start of a line.
const INLINE_TAG_RE = / (@availableWhen|@default)(?=\s)/;

export const isJsDoc = (c) => c.type === 'Block' && c.value.startsWith('*');

export function jsDocLines(comment) {
  const lines = comment.value.split('\n').map((l) => l.replace(/^\s*\*\s?/, '').replace(/\s+$/, ''));
  if (lines.length && lines[0].trim() === '') lines.shift();
  if (lines.length && lines[lines.length - 1].trim() === '') lines.pop();
  return lines;
}

export function classifyFieldDoc(lines, initializerText) {
  // Pull any same-line `@availableWhen`/`@default` off the end of a
  // description (`'Desc. @availableWhen x==true'` -> two lines) so the
  // line-anchored tag detection below sees it as a tag, not prose.
  const split = lines.flatMap((l) => {
    const m = INLINE_TAG_RE.exec(l);
    return m ? [l.slice(0, m.index), l.slice(m.index + 1)] : [l];
  });
  const text = [];
  const tags = [];
  for (const l of split) {
    const m = ANY_TAG_RE.exec(l.trim());
    if (m) tags.push({tag: m[1], rest: m[2] || ''});
    else if (tags.length) tags[tags.length - 1].rest += ' ' + l.trim();
    else text.push(l);
  }
  const foreign = tags.find((t) => t.tag !== 'availableWhen' && t.tag !== 'default');
  if (foreign) return {ok: false, reason: `contains @${foreign.tag}`};
  if (text.some((l) => MARKDOWN_RE.test(l))) return {ok: false, reason: 'markdown structure'};
  while (text.length && text[text.length - 1] === '') text.pop();
  if (text.some((l) => l === '')) return {ok: false, reason: 'multiple paragraphs'};
  const def = tags.find((t) => t.tag === 'default');
  // `initializerText` is only supplied by the rule's own call site — direct
  // unit tests of classifyFieldDoc omit it — so `undefined` means "not
  // checked" rather than "no initializer" — that's `null`, which never
  // matches a present @default tag and correctly falls through to `manual`.
  if (def && initializerText !== undefined && def.rest.trim() !== (initializerText ?? '').trim()) {
    return {ok: false, reason: '@default differs from the initializer'};
  }
  const avail = tags.find((t) => t.tag === 'availableWhen');
  return {ok: true, text, availableWhen: avail ? avail.rest.trim() : null};
}

export function tagLinesFor(name, doc) {
  const out = [];
  if (doc.text.length) {
    out.push(`@property ${name} - ${doc.text[0].trim()}`);
    for (const l of doc.text.slice(1)) out.push(`  ${l.trim()}`);
  }
  if (doc.availableWhen) out.push(`@availableWhen ${name} ${doc.availableWhen}`);
  return out;
}

export function insertionPoint(lines) {
  let lastProp = -1;
  let firstTag = -1;
  lines.forEach((l, i) => {
    if (PROP_LINE_RE.test(l) || AVAIL_LINE_RE.test(l)) lastProp = i;
    else if (firstTag < 0 && TAG_BLOCK_RE.test(l)) firstTag = i;
  });
  if (lastProp >= 0) {
    let i = lastProp + 1;
    while (i < lines.length && lines[i] !== '' && !lines[i].startsWith('@')) i++;
    return {insertAt: i, needsBlank: false};
  }
  if (firstTag >= 0) return {insertAt: firstTag, needsBlank: firstTag > 0 && lines[firstTag - 1] !== ''};
  return {insertAt: lines.length, needsBlank: lines.length > 0 && lines[lines.length - 1] !== ''};
}

function decoratorName(d) {
  const e = d.expression;
  if (e.type === 'CallExpression') return e.callee.type === 'Identifier' ? e.callee.name : null;
  return e.type === 'Identifier' ? e.name : null;
}

function leadingJsDoc(sourceCode, node) {
  const exported =
    node.parent &&
    (node.parent.type === 'ExportNamedDeclaration' || node.parent.type === 'ExportDefaultDeclaration') &&
    node.parent.declaration === node;
  const first = node.decorators && node.decorators.length ? node.decorators[0] : exported ? node.parent : node;
  const comments = sourceCode.getCommentsBefore(first);
  const last = comments[comments.length - 1];
  if (!last || !isJsDoc(last)) return null;
  // Tolerate blank lines between the doc and its anchor (decorator, export
  // keyword, or the node itself) — reject only when something else (code,
  // another comment) sits in the gap.
  if (sourceCode.text.slice(last.range[1], first.range[0]).trim() !== '') return null;
  return {comment: last, first};
}

export const propertyDocsRule = {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {description: 'Public properties are documented in the class JSDoc (`@property name - description`), not inline above the field.'},
    schema: [{type: 'object', properties: {allowFiles: {type: 'array', items: {type: 'string'}}}, additionalProperties: false}],
    messages: {
      inline: '`{{name}}` is documented above its field; move the text to the class JSDoc as `@property {{name}} - …` (run --fix).',
      manual: '`{{name}}` has an inline JSDoc the fixer will not move ({{reason}}); move it by hand or leave it.',
      hoist: '{{count}} inline property doc(s) can be hoisted into the class JSDoc — run `npm run lint:fix:property-docs`.',
      typed: '`@property {{name}}` carries a type; drop it — the manifest takes the type from the TypeScript declaration.',
      duplicate: '`@property {{name}}` appears more than once in the class JSDoc.',
      ghost: '`@property {{name}}` names no `@property()` field of this class — it would become a ghost manifest member.',
      unknownRef: '`@availableWhen` refers to `{{name}}`, which is not a property of this class.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode();
    const allow = (context.options[0]?.allowFiles ?? []).some((f) => context.filename.replace(/\\/g, '/').endsWith(f));
    if (allow) return {};
    return {
      ClassDeclaration(node) {
        const fields = node.body.body.filter(
          (m) => m.type === 'PropertyDefinition' && m.key.type === 'Identifier' && (m.decorators ?? []).some((d) => decoratorName(d) === 'property')
        );
        const fieldNames = new Set(fields.map((f) => f.key.name));
        const direct = node.superClass && node.superClass.type === 'Identifier' && node.superClass.name === 'LitElement';
        const classDoc = leadingJsDoc(sourceCode, node);
        const headerLines = classDoc ? jsDocLines(classDoc.comment) : [];
        // cem ignores every class-level tag of a JSDoc block that contains
        // @typedef, so hoisting @property tags into such a header produces
        // empty manifest descriptions. Treat it like "no usable class doc".
        const hasTypedef = headerLines.some((l) => TYPEDEF_RE.test(l));
        const seen = new Set();
        headerLines.forEach((l) => {
          const p = PROP_LINE_RE.exec(l);
          if (p) {
            if (p[1]) context.report({loc: classDoc.comment.loc, messageId: 'typed', data: {name: p[2]}});
            if (seen.has(p[2])) context.report({loc: classDoc.comment.loc, messageId: 'duplicate', data: {name: p[2]}});
            seen.add(p[2]);
            if (direct && !fieldNames.has(p[2])) context.report({loc: classDoc.comment.loc, messageId: 'ghost', data: {name: p[2]}});
          }
          const a = AVAIL_LINE_RE.exec(l);
          if (a) {
            if (direct && !fieldNames.has(a[1])) context.report({loc: classDoc.comment.loc, messageId: 'unknownRef', data: {name: a[1]}});
            if (direct) for (const ref of a[2].match(/[A-Za-z_$][\w$]*(?=\s*(?:==|!=|\s+in\s))/g) ?? []) {
              if (!fieldNames.has(ref)) context.report({loc: classDoc.comment.loc, messageId: 'unknownRef', data: {name: ref}});
            }
          }
        });
        const hoistable = [];
        for (const f of fields) {
          const doc = leadingJsDoc(sourceCode, f);
          if (!doc) continue;
          const cls = classifyFieldDoc(jsDocLines(doc.comment), f.value ? sourceCode.getText(f.value) : null);
          if (!cls.ok || !classDoc || hasTypedef) {
            const reason = !classDoc ? 'class has no JSDoc' : hasTypedef ? 'class JSDoc contains @typedef' : cls.reason;
            context.report({loc: doc.comment.loc, messageId: 'manual', data: {name: f.key.name, reason}});
            continue;
          }
          context.report({loc: doc.comment.loc, messageId: 'inline', data: {name: f.key.name}});
          hoistable.push({name: f.key.name, doc: cls, comment: doc.comment, first: doc.first});
        }
        if (hoistable.length) {
          context.report({node: node.id ?? node, messageId: 'hoist', data: {count: hoistable.length}, fix: buildHoistFix(classDoc.comment, headerLines, hoistable)});
        }
      },
    };
  },
};

export function buildHoistFix(classComment, headerLines, hoistable) {
  return (fixer) => {
    const {insertAt, needsBlank} = insertionPoint(headerLines);
    const added = hoistable.flatMap((h) => tagLinesFor(h.name, h.doc));
    const lines = [...headerLines.slice(0, insertAt), ...(needsBlank ? [''] : []), ...added, ...headerLines.slice(insertAt)];
    const indent = ' '.repeat(classComment.loc.start.column);
    const text = ['/**', ...lines.map((l) => (l === '' ? `${indent} *` : `${indent} * ${l}`)), `${indent} */`].join('\n');
    return [
      fixer.replaceText(classComment, text),
      ...hoistable.map((h) => fixer.removeRange([h.comment.range[0], h.first.range[0]])),
    ];
  };
}
