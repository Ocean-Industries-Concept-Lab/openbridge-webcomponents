import {describe, expect, it} from 'vitest';
import {checkRecord, widgetRoles} from './check-apg-records.js';

const component = (doc: string, template: string) => `
/**
 * A widget.
${doc}
 * @stable
 */
@customElement('obc-widget')
export class ObcWidget extends LitElement {
  override render() {
    return html\`${template}\`;
  }
}
`;

describe('widgetRoles', () => {
  it('reads literal roles and the quoted roles of a bound expression', () => {
    expect(
      widgetRoles(
        component(
          '',
          `<div role="tablist"></div><div role=\${this.tree ? 'treegrid' : 'table'}></div><p role="note"></p>`
        )
      )
    ).toEqual(['tablist', 'treegrid']);
  });

  it('ignores an attribute selector in a query string', () => {
    expect(
      widgetRoles(
        component('', '<div></div>') +
          'const SELECTOR = \'button, [role="checkbox"]\';'
      )
    ).toEqual([]);
  });

  it('ignores roles mentioned in comments', () => {
    expect(
      widgetRoles(
        component(' * Renders `role="menu"` in prose.', '<div></div>')
      )
    ).toEqual([]);
  });
});

describe('checkRecord', () => {
  const template = '<div role="radiogroup"></div>';

  it('passes a JSDoc that links the APG pattern and says what it leaves out', () => {
    const source = component(
      ' * [APG Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/): arrows move.\n *\n * Left out: nothing.',
      template
    );
    expect(checkRecord(source, 'widget.ts')).toEqual([]);
  });

  it('names what is missing', () => {
    expect(checkRecord(component('', template), 'widget.ts')).toEqual([
      'widget.ts: <obc-widget> renders role="radiogroup" but its class JSDoc links no APG pattern (https://www.w3.org/WAI/ARIA/apg/patterns/…)',
      'widget.ts: <obc-widget> renders role="radiogroup" but its class JSDoc has no "Left out:" line (write "Left out: nothing." when it follows the whole pattern)',
    ]);
  });

  it('skips a component without a widget role', () => {
    expect(checkRecord(component('', '<div></div>'), 'widget.ts')).toEqual([]);
  });

  const recorded = (markup: string) =>
    component(
      ' * [APG](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)\n *\n * Left out: nothing.',
      markup
    );

  it('asks a composite widget for a keyboard spec', () => {
    expect(
      checkRecord(recorded(template), 'src/widget/widget.ts', false)
    ).toEqual([
      'src/widget/widget.ts: <obc-widget> renders role="radiogroup", a composite widget, but src/widget has no *-keyboard.spec.ts pinning its keys (docs/agents/a11y.md § 9)',
    ]);
    expect(
      checkRecord(recorded(template), 'src/widget/widget.ts', true)
    ).toEqual([]);
  });

  it('does not ask a single control for one', () => {
    expect(
      checkRecord(recorded('<div role="checkbox"></div>'), 'src/w/w.ts', false)
    ).toEqual([]);
  });
});
