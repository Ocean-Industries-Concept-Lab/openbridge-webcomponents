// script/eslint-comment-rules.test.ts
import {describe, it} from 'vitest';
import {RuleTester} from 'eslint';
import tsParser from '@typescript-eslint/parser';
// @ts-expect-error - untyped JavaScript module
import {commentRules} from './eslint-comment-rules.mjs';

const tester = new RuleTester({
  languageOptions: {parser: tsParser, ecmaVersion: 2020, sourceType: 'module'},
});

describe('comment-max-lines', () => {
  it('warns on runs longer than max, ignores JSDoc', () => {
    tester.run('comment-max-lines', commentRules['comment-max-lines'], {
      valid: [
        '// one\n// two\n// three\nconst a = 1;',
        '/**\n * a\n * b\n * c\n * d\n * e\n * f\n * g\n */\nconst a = 1;',
      ],
      invalid: [
        {
          code: '// 1\n// 2\n// 3\n// 4\n// 5\n// 6\nconst a = 1;',
          errors: [{messageId: 'tooLong'}],
        },
        {
          code: '/* 1\n2\n3\n4\n5\n6 */\nconst a = 1;',
          errors: [{messageId: 'tooLong'}],
        },
      ],
    });
  });
});

describe('no-commented-out-code', () => {
  it('flags commented-out statements', () => {
    tester.run('no-commented-out-code', commentRules['no-commented-out-code'], {
      valid: [
        '// Fall back to 1:1 until the element is laid out\nconst a = 1;',
        '// import path.\nconst a = 1;',
        '// return the cached value when present\nconst a = 1;',
      ],
      invalid: [
        {
          code: '// console.debug(a);\nconst a = 1;',
          errors: [{messageId: 'code'}],
        },
        {
          code: '// this.requestUpdate();\nconst a = 1;',
          errors: [{messageId: 'code'}],
        },
        {code: '// const x = 1;\nconst a = 1;', errors: [{messageId: 'code'}]},
        {
          code: "// import {x} from './x.js';\nconst a = 1;",
          errors: [{messageId: 'code'}],
        },
        {code: '// return value;\nconst a = 1;', errors: [{messageId: 'code'}]},
      ],
    });
  });
});

describe('todo-format', () => {
  it('requires an owner, an issue or designer', () => {
    tester.run('todo-format', commentRules['todo-format'], {
      valid: [
        '// TODO(designer): confirm the spacing\nconst a = 1;',
        '// TODO(#1234): remove after the migration\nconst a = 1;',
        '/** TODO(theming): move to a token */\nconst a = 1;',
      ],
      invalid: [
        {
          code: '// TODO fix this later\nconst a = 1;',
          errors: [{messageId: 'format'}],
        },
      ],
    });
  });
});

describe('comment-style', () => {
  it('flags filler and inflated vocabulary', () => {
    tester.run('comment-style', commentRules['comment-style'], {
      valid: ['// Chart.js measures the wrapper, not the canvas\nconst a = 1;'],
      invalid: [
        {
          code: '// Note that this ensures that the value is robust\nconst a = 1;',
          errors: [
            {messageId: 'phrase'},
            {messageId: 'phrase'},
            {messageId: 'phrase'},
          ],
        },
        {
          code: '/** Leverage the comprehensive helper */\nconst a = 1;',
          errors: [{messageId: 'phrase'}, {messageId: 'phrase'}],
        },
      ],
    });
  });

  it('anchors punctuation-adjacent and short bans to real word boundaries', () => {
    tester.run('comment-style', commentRules['comment-style'], {
      valid: ['// simplyfy this later\nconst a = 1;'],
      invalid: [
        {
          code: '// Certainly, this works\nconst a = 1;',
          errors: [{messageId: 'phrase'}],
        },
        {
          code: '// simply return\nconst a = 1;',
          errors: [{messageId: 'phrase'}],
        },
      ],
    });
  });

  it('flags the three phrases AGENTS.md § 2 lists that were missing', () => {
    tester.run('comment-style', commentRules['comment-style'], {
      valid: [
        '// The fallback keeps the old value until layout settles\nconst a = 1;',
      ],
      invalid: [
        {
          code: '// Overall, the layout adapts.\nconst a = 1;',
          errors: [{messageId: 'phrase'}],
        },
        {
          code: '// Let me explain the fallback.\nconst a = 1;',
          errors: [{messageId: 'phrase'}],
        },
        {
          code: "// I've updated the cache key.\nconst a = 1;",
          errors: [{messageId: 'phrase'}],
        },
      ],
    });
  });

  it('detects the "Overall" opener on a JSDoc continuation line', () => {
    tester.run('comment-style', commentRules['comment-style'], {
      valid: ['// The fix works well overall.\nconst a = 1;'],
      invalid: [
        {
          code: '/**\n * Overall, this component handles X.\n */\nconst a = 1;',
          errors: [{messageId: 'phrase'}],
        },
      ],
    });
  });
});
