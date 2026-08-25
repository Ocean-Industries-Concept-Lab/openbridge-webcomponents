const BANNED = [
  ['note that', 'Note that'],
  ["it's important to", "It's important to"],
  ['it is important to', 'It is important to'],
  ['it is worth noting', 'It is worth noting'],
  ['in summary', 'In summary'],
  ['(?:^|\\n)\\s*\\*?\\s*overall\\b|\\.\\s+overall\\b', 'filler opener'],
  ['in order to', 'in order to (use "to")'],
  ['ensures? that', 'ensures that'],
  ['comprehensive', 'comprehensive'],
  ['robust', 'robust'],
  ['seamless(?:ly)?', 'seamless'],
  ['leverag(?:e|es|ing)', 'leverage (use "use")'],
  ['utiliz(?:e|es|ing)', 'utilize (use "use")'],
  ['streamlin(?:e|es|ing)', 'streamline'],
  ['delv(?:e|es|ing)', 'delve'],
  ['essentially', 'essentially'],
  ['simply', 'simply'],
  ['great question', 'chatbot artefact'],
  ['certainly[,!]', 'chatbot artefact'],
  ['might potentially', 'hedging'],
  ['let me', 'chatbot artefact'],
  ["i've", 'chatbot artefact'],
];
// A source starting with `^` or `(?:^` supplies its own boundaries and is
// used as-is. Otherwise: a leading `\b`, plus a trailing `\b` only when the
// source ends on a word character or a group's `)` (never after e.g. `[,!]`).
const isAnchored = (source) => source.startsWith('^') || source.startsWith('(?:^');
const BANNED_RE = BANNED.map(([re, label]) => {
  if (isAnchored(re)) return [new RegExp(re, 'i'), label];
  const trailingBoundary = /[\w)]$/.test(re) ? '\\b' : '';
  return [new RegExp(`\\b${re}${trailingBoundary}`, 'i'), label];
});

const isJsDoc = (c) => c.type === 'Block' && c.value.startsWith('*');

export const commentRules = {
  'comment-max-lines': {
    meta: {
      type: 'suggestion',
      docs: {description: 'Comments outside JSDoc are limited to a few lines; longer text belongs in a test, a story or the family doc.'},
      schema: [{type: 'object', properties: {max: {type: 'integer', minimum: 1}}, additionalProperties: false}],
      messages: {tooLong: 'This comment spans {{lines}} lines (max {{max}}). Explain it in a test, a story description or the family doc instead.'},
    },
    create(context) {
      const max = context.options[0]?.max ?? 5;
      const sourceCode = context.sourceCode ?? context.getSourceCode();
      return {
        Program() {
          const comments = sourceCode.getAllComments();
          let run = [];
          const flush = () => {
            if (run.length > max) {
              context.report({loc: {start: run[0].loc.start, end: run[run.length - 1].loc.end}, messageId: 'tooLong', data: {lines: run.length, max}});
            }
            run = [];
          };
          for (const c of comments) {
            if (c.type === 'Block') {
              flush();
              if (isJsDoc(c)) continue;
              const lines = c.loc.end.line - c.loc.start.line + 1;
              if (lines > max) context.report({loc: c.loc, messageId: 'tooLong', data: {lines, max}});
              continue;
            }
            const prev = run[run.length - 1];
            if (prev && c.loc.start.line !== prev.loc.end.line + 1) flush();
            run.push(c);
          }
          flush();
        },
      };
    },
  },

  'no-commented-out-code': {
    meta: {
      type: 'suggestion',
      docs: {description: 'Commented-out code is deleted, not kept.'},
      schema: [],
      messages: {code: 'Commented-out code — delete it (git history keeps it).'},
    },
    create(context) {
      const sourceCode = context.sourceCode ?? context.getSourceCode();
      // console./this. calls and a bare closing `}`/`);` line are code on their
      // own; the other keywords also start ordinary sentences, so they only
      // count when the line also ends like code (`;`, `{`, `}` or `)`).
      const ALWAYS_CODE = /^\s*(console\.|this\.|\}\s*;?\s*$|\)\s*;\s*$)/;
      const KEYWORD = /^\s*(const |let |var |return\b|await |if \(|for \(|while \(|import |export )/;
      const ENDS_LIKE_CODE = /[;{})]\s*$/;
      const isCommentedOutCode = (value) =>
        ALWAYS_CODE.test(value) || (KEYWORD.test(value) && ENDS_LIKE_CODE.test(value));
      return {
        Program() {
          for (const c of sourceCode.getAllComments()) {
            if (c.type !== 'Line') continue;
            if (isCommentedOutCode(c.value)) context.report({loc: c.loc, messageId: 'code'});
          }
        },
      };
    },
  },

  'todo-format': {
    meta: {
      type: 'suggestion',
      docs: {description: 'TODO carries a designer marker, an issue number or an owner.'},
      schema: [],
      messages: {format: 'Write `TODO(designer): …`, `TODO(#1234): …` or `TODO(name): …`.'},
    },
    create(context) {
      const sourceCode = context.sourceCode ?? context.getSourceCode();
      const BAD = /\bTODO\b(?!\s*\((?:designer|#\d+|[\w.-]+)\))/;
      return {
        Program() {
          for (const c of sourceCode.getAllComments()) {
            if (BAD.test(c.value)) context.report({loc: c.loc, messageId: 'format'});
          }
        },
      };
    },
  },

  'comment-style': {
    meta: {
      type: 'suggestion',
      docs: {description: 'No filler, inflated vocabulary or chatbot artefacts in comments and JSDoc.'},
      schema: [],
      messages: {phrase: 'Comment contains "{{phrase}}" — say it plainly or delete it (docs/agents/coding-standards.md § Writing style).'},
    },
    create(context) {
      const sourceCode = context.sourceCode ?? context.getSourceCode();
      return {
        Program() {
          for (const c of sourceCode.getAllComments()) {
            for (const [re, label] of BANNED_RE) {
              if (re.test(c.value)) context.report({loc: c.loc, messageId: 'phrase', data: {phrase: label}});
            }
          }
        },
      };
    },
  },
};
