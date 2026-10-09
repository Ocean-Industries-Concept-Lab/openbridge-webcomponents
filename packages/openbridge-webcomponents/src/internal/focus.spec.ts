import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import {composedTabbables, deepActiveElement} from './focus.js';

function withShadow(host: HTMLElement, markup: string): HTMLElement {
  host.attachShadow({mode: 'open'}).innerHTML = markup;
  return host;
}

describe('composedTabbables', () => {
  it('lists controls in rendered order across shadow roots and slots', () => {
    const screen = render(html`<div id="root"></div>`);
    const root = screen.container.querySelector('#root') as HTMLElement;
    const host = withShadow(
      document.createElement('div'),
      `<button id="shadow-first"></button><slot></slot><button id="shadow-last"></button>`
    );
    host.innerHTML = `<input id="slotted" /><a id="unslotted-no-href"></a>`;
    root.appendChild(host);

    expect(composedTabbables(root).map((el) => el.id)).toEqual([
      'shadow-first',
      'slotted',
      'shadow-last',
    ]);
  });

  it('skips disabled, negative-tabindex and hidden controls', () => {
    const screen = render(
      html`<div id="root">
        <button id="ok"></button>
        <button id="disabled" disabled></button>
        <div id="landing" tabindex="-1"></div>
        <button id="hidden" hidden></button>
        <div id="custom" tabindex="0"></div>
      </div>`
    );
    const root = screen.container.querySelector('#root') as HTMLElement;

    expect(composedTabbables(root).map((el) => el.id)).toEqual([
      'ok',
      'custom',
    ]);
  });
});

describe('deepActiveElement', () => {
  it('follows focus into a shadow root', () => {
    const screen = render(html`<div id="root"></div>`);
    const root = screen.container.querySelector('#root') as HTMLElement;
    const host = withShadow(
      document.createElement('div'),
      `<button id="inner"></button>`
    );
    root.appendChild(host);
    (host.shadowRoot!.getElementById('inner') as HTMLElement).focus();

    expect(document.activeElement).toBe(host);
    expect(deepActiveElement()?.id).toBe('inner');
  });
});
