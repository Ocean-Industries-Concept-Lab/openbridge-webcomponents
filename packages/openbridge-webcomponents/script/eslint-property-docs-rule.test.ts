// script/eslint-property-docs-rule.test.ts
import {describe, expect, it} from 'vitest';
import {RuleTester} from 'eslint';
import tsParser from '@typescript-eslint/parser';
// @ts-expect-error - untyped JavaScript module
import {propertyDocsRule, classifyFieldDoc, insertionPoint} from './eslint-property-docs-rule.mjs';

const tester = new RuleTester({
  languageOptions: {parser: tsParser, ecmaVersion: 2022, sourceType: 'module'},
});

const cls = (header: string, body: string) =>
  `import {LitElement} from 'lit';\n/**\n${header}\n */\n@customElement('obc-x')\nexport class ObcX extends LitElement {\n${body}\n}\n`;

describe('property-docs-in-class-jsdoc — reports', () => {
  it('accepts header tags and undocumented fields', () => {
    tester.run('property-docs', propertyDocsRule, {
      valid: [
        cls(' * Thing.\n *\n * @property value - The value.\n * @availableWhen value flag==true\n * @stable', '  @property({type: Number}) value = 0;\n  @property({type: Boolean}) flag = false;'),
        cls(' * Thing.\n * @stable', '  @property({type: Number}) value = 0;'),
        cls(' * Thing.\n * @stable', '  /** internal */\n  @state() private _x = 0;'),
      ],
      invalid: [],
    });
  });

  it('reports inline docs, typed tags, duplicates, ghosts and unknown references', () => {
    tester.run('property-docs', propertyDocsRule, {
      valid: [],
      invalid: [
        {
          code: cls(' * Thing.\n * @property {number} value - The value.\n * @stable', '  @property({type: Number}) value = 0;'),
          errors: [{messageId: 'typed'}],
          output: null,
        },
        {
          code: cls(' * Thing.\n * @property value - A.\n * @property value - B.\n * @stable', '  @property({type: Number}) value = 0;'),
          errors: [{messageId: 'duplicate'}],
          output: null,
        },
        {
          code: cls(' * Thing.\n * @property ghost - Nope.\n * @stable', '  @property({type: Number}) value = 0;'),
          errors: [{messageId: 'ghost'}],
          output: null,
        },
        {
          code: cls(' * Thing.\n * @availableWhen value nope==true\n * @stable', '  @property({type: Number}) value = 0;'),
          errors: [{messageId: 'unknownRef'}],
          output: null,
        },
        {
          code: cls(' * Thing.\n * @stable', '  /**\n   * The value.\n   * @deprecated use other\n   */\n  @property({type: Number}) value = 0;'),
          errors: [{messageId: 'manual'}],
          output: null,
        },
      ],
    });
  });

  it('finds the class JSDoc on an undecorated export and across a blank line before the decorator', () => {
    tester.run('property-docs', propertyDocsRule, {
      valid: [],
      invalid: [
        {
          // No class decorator at all — the JSDoc sits directly before `export`.
          code: "import {LitElement} from 'lit';\n/**\n * Thing.\n * @property {number} value - The value.\n * @stable\n */\nexport class ObcX extends LitElement {\n  @property({type: Number}) value = 0;\n}\n",
          errors: [{messageId: 'typed'}],
          output: null,
        },
        {
          // No class decorator; a header @property naming no real field.
          code: "import {LitElement} from 'lit';\n/**\n * Thing.\n * @property ghost - x\n * @stable\n */\nexport class ObcX extends LitElement {\n  @property({type: Number}) value = 0;\n}\n",
          errors: [{messageId: 'ghost'}],
          output: null,
        },
        {
          // Class decorator present, but a blank line separates it from the JSDoc above.
          code: "import {LitElement} from 'lit';\n/**\n * Thing.\n * @stable\n */\n\n@customElement('obc-x')\nexport class ObcX extends LitElement {\n  /** The value. */\n  @property({type: Number}) value = 0;\n}\n",
          errors: [{messageId: 'hoist'}, {messageId: 'inline'}],
          output: "import {LitElement} from 'lit';\n/**\n * Thing.\n *\n * @property value - The value.\n * @stable\n */\n\n@customElement('obc-x')\nexport class ObcX extends LitElement {\n  @property({type: Number}) value = 0;\n}\n",
        },
        {
          // Field JSDoc separated from its own @property() decorator by a blank line.
          code: cls(' * Thing.\n * @stable', '  /** The value. */\n\n  @property({type: Number}) value = 0;'),
          errors: [{messageId: 'hoist'}, {messageId: 'inline'}],
          output: cls(' * Thing.\n *\n * @property value - The value.\n * @stable', '  @property({type: Number}) value = 0;'),
        },
      ],
    });
  });

  // Exercises the hoist output now that buildHoistFix is implemented (Task 6).
  it('hoists an inline doc into the header', () => {
    tester.run('property-docs', propertyDocsRule, {
      valid: [],
      invalid: [
        {
          code: cls(' * Thing.\n * @stable', '  /** The value. */\n  @property({type: Number}) value = 0;'),
          errors: [{messageId: 'hoist'}, {messageId: 'inline'}],
          output: cls(' * Thing.\n *\n * @property value - The value.\n * @stable', '  @property({type: Number}) value = 0;'),
        },
      ],
    });
  });
});

describe('property-docs-in-class-jsdoc — fixer', () => {
  it('hoists multi-line text with continuation lines and @availableWhen; drops @default', () => {
    tester.run('property-docs', propertyDocsRule, {
      valid: [],
      invalid: [
        {
          code: cls(
            ' * Thing.\n *\n * @slot - Content.\n * @stable',
            '  /**\n   * Reference size.\n   * Second line.\n   * @default 384\n   * @availableWhen fixedAspectRatio==true\n   */\n  @property({type: Number}) scaleReferenceSize = 384;\n  @property({type: Boolean}) fixedAspectRatio = false;'
          ),
          errors: [{messageId: 'hoist'}, {messageId: 'inline'}],
          output: cls(
            ' * Thing.\n *\n * @property scaleReferenceSize - Reference size.\n *   Second line.\n * @availableWhen scaleReferenceSize fixedAspectRatio==true\n * @slot - Content.\n * @stable',
            '  @property({type: Number}) scaleReferenceSize = 384;\n  @property({type: Boolean}) fixedAspectRatio = false;'
          ),
        },
        {
          code: cls(' * Thing.\n *\n * @property a - A.\n * @stable', '  /** B. */\n  @property({type: Number}) b = 0;\n  @property({type: Number}) a = 0;'),
          errors: [{messageId: 'hoist'}, {messageId: 'inline'}],
          output: cls(' * Thing.\n *\n * @property a - A.\n * @property b - B.\n * @stable', '  @property({type: Number}) b = 0;\n  @property({type: Number}) a = 0;'),
        },
      ],
    });
  });
});

describe('classifyFieldDoc', () => {
  it('hoists plain text and keeps @availableWhen', () => {
    expect(classifyFieldDoc(['Reference size.', 'Second line.', '@default 384', '@availableWhen fixedAspectRatio==true'])).toEqual({
      ok: true, text: ['Reference size.', 'Second line.'], availableWhen: 'fixedAspectRatio==true',
    });
  });
  it('refuses markdown structure and foreign tags', () => {
    expect(classifyFieldDoc(['Modes:', '- `a`: one', '- `b`: two']).ok).toBe(false);
    expect(classifyFieldDoc(['Old.', '@deprecated use x']).ok).toBe(false);
    expect(classifyFieldDoc(['Para one.', '', 'Para two.']).ok).toBe(false);
  });
});

describe('insertionPoint', () => {
  it('inserts before the first tag with a blank line, or after existing property lines', () => {
    expect(insertionPoint(['Thing.', '@slot - x', '@stable'])).toEqual({insertAt: 1, needsBlank: true});
    expect(insertionPoint(['Thing.', '', '@property a - A.', '  more', '@slot - x'])).toEqual({insertAt: 4, needsBlank: false});
    expect(insertionPoint(['Thing.'])).toEqual({insertAt: 1, needsBlank: true});
  });
});
