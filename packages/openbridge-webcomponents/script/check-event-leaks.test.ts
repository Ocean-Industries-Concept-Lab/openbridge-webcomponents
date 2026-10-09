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

describe('parseComponent across files', () => {
  const files: Record<string, string> = {
    'src/base/base.ts': `
export class Base extends LitElement {
  protected report() {
    this.dispatchEvent(new CustomEvent('base-change', {bubbles: true, composed: true}));
  }
  render() { return html\`<obc-inner @inner-click=\${stopPropagation}></obc-inner>\`; }
}
`,
    'src/helpers/render.ts': `
export function renderPart() { return html\`<obc-part @part-close=\${stopPropagation}></obc-part>\`; }
`,
  };
  const read = (file: string) => files[file] ?? null;

  it('reads a base class for its children, listeners and dispatches, and a helper for its template', () => {
    const parsed = parseComponent(
      `
import {Base} from '../base/base.js';
import {renderPart} from '../helpers/render.js';
/**
 * A sub.
 * @stable
 */
@customElement('obc-sub')
export class ObcSub extends Base {
  render() { return html\`\${renderPart()}\`; }
}
`,
      'src/sub/sub.ts',
      read
    )!;
    expect([...parsed.children].sort()).toEqual(['obc-inner', 'obc-part']);
    expect([...parsed.composed]).toEqual(['base-change']);
    expect(Object.fromEntries(parsed.listeners)).toEqual({
      'inner-click': true,
      'part-close': true,
    });
  });

  it('attributes an event held in a type-annotated variable', () => {
    const parsed = parseComponent(
      list(`
  private handleClick() {
    const event: ObcListClickEvent = new CustomEvent('obc-click', {bubbles: true, composed: true});
    this.dispatchEvent(event);
  }`),
      'list.ts'
    )!;
    expect([...parsed.composed]).toEqual(['obc-click']);
  });

  it('follows a method that dispatches the name it is given, and the ones forwarding to it', () => {
    const parsed = parseComponent(
      list(`
  private emit(eventName: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(eventName, {detail, bubbles: true, composed: true}));
  }
  private emitIfEnabled(eventName: string, detail?: unknown) {
    if (!this.disabled) this.emit(eventName, detail);
  }
  private send() {
    this.emitIfEnabled('send-click', {value: 1});
    this.emit('voice-action');
  }`),
      'list.ts'
    )!;
    expect([...parsed.composed].sort()).toEqual(['send-click', 'voice-action']);
  });
});
