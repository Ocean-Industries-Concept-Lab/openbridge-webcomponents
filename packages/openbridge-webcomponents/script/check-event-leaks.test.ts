import {describe, expect, it} from 'vitest';
import {findLeaks, parseComponent} from './check-event-leaks.js';

const item = `
/**
 * An item.
 * @fires {CustomEvent<{id: string}>} item-click - When the item is clicked.
 * @stable
 */
@customElement('obc-item')
export class ObcItem extends LitElement {
  private handleClick() {
    this.dispatchEvent(
      new CustomEvent('item-click', {detail: {id: 'a'}, bubbles: true, composed: true})
    );
  }
  private handleClose() {
    const close = new CustomEvent('item-close', {bubbles: true, composed: true});
    this.dispatchEvent(close);
  }
  private handleLocal() {
    this.dispatchEvent(new CustomEvent('item-local', {bubbles: true}));
    this.input.dispatchEvent(new CustomEvent('inner', {bubbles: true, composed: true}));
  }
}
`;

function list(body: string, fires = '') {
  return `
/**
 * A list.
 ${fires}
 * @stable
 */
@customElement('obc-list')
export class ObcList extends LitElement {
  ${body}
}
`;
}

describe('parseComponent', () => {
  it('collects the events the host dispatches with bubbles and composed', () => {
    const parsed = parseComponent(item, 'item.ts')!;
    expect(parsed.tag).toBe('obc-item');
    expect([...parsed.composed].sort()).toEqual(['item-click', 'item-close']);
    expect([...parsed.fires]).toEqual(['item-click']);
  });

  it('reads the child tags a template renders and the listeners bound on them', () => {
    const parsed = parseComponent(
      list(`
  private onClick(event: Event) {
    event.stopPropagation();
  }
  private onClose = (event: Event) => {
    event.stopPropagation();
  };
  override render() {
    return html\`<obc-item
      @item-click=\${this.onClick}
      @item-close=\${this.onClose}
      @item-other=\${stopPropagation}
      @item-seen=\${() => this.count++}
    ></obc-item>\`;
  }`),
      'list.ts'
    )!;
    expect([...parsed.children]).toEqual(['obc-item']);
    expect(Object.fromEntries(parsed.listeners)).toEqual({
      'item-click': true,
      'item-close': true,
      'item-other': true,
      'item-seen': false,
    });
  });

  it('skips files without a registered element', () => {
    expect(parseComponent('export const x = 1;', 'x.ts')).toBeNull();
  });
});

describe('findLeaks', () => {
  const child = parseComponent(item, 'item.ts')!;

  it('reports a composed child event the parent handles but neither stops nor declares', () => {
    const parent = parseComponent(
      list(`
  private onClick() {}
  override render() {
    return html\`<obc-item @item-click=\${this.onClick}></obc-item>\`;
  }`),
      'list.ts'
    )!;
    expect(findLeaks([child, parent])).toEqual([
      {
        parent: 'obc-list',
        file: 'list.ts',
        event: 'item-click',
        from: 'obc-item',
        handled: true,
      },
      {
        parent: 'obc-list',
        file: 'list.ts',
        event: 'item-close',
        from: 'obc-item',
        handled: false,
      },
    ]);
  });

  it('accepts an event the parent stops or declares', () => {
    const parent = parseComponent(
      list(
        `
  override render() {
    return html\`<obc-item @item-click=\${stopPropagation}></obc-item>\`;
  }`,
        '* @fires {CustomEvent<void>} item-close - Passed on from the item.'
      ),
      'list.ts'
    )!;
    expect(findLeaks([child, parent])).toEqual([]);
  });

  it('counts only the class JSDoc as a declaration, as the wrappers do', () => {
    const parent = parseComponent(
      list(`
  /**
   * Passes the item's click on.
   * @fires item-click
   */
  private onClick() {}
  override render() {
    return html\`<obc-item @item-click=\${this.onClick} @item-close=\${stopPropagation}></obc-item>\`;
  }`),
      'list.ts'
    )!;
    expect(findLeaks([child, parent]).map((leak) => leak.event)).toEqual([
      'item-click',
    ]);
  });

  it('follows an event through every component that lets it out', () => {
    const middle = parseComponent(
      list(`
  override render() {
    return html\`<obc-item @item-close=\${stopPropagation}></obc-item>\`;
  }`),
      'list.ts'
    )!;
    const top = parseComponent(
      `
/**
 * A panel.
 * @stable
 */
@customElement('obc-panel')
export class ObcPanel extends LitElement {
  override render() {
    return html\`<obc-list></obc-list>\`;
  }
}
`,
      'panel.ts'
    )!;
    expect(findLeaks([child, middle, top])).toEqual([
      {
        parent: 'obc-list',
        file: 'list.ts',
        event: 'item-click',
        from: 'obc-item',
        handled: false,
      },
      {
        parent: 'obc-panel',
        file: 'panel.ts',
        event: 'item-click',
        from: 'obc-item > obc-list',
        handled: false,
      },
    ]);
  });
});
