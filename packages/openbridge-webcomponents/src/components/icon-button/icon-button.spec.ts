import {describe, expect, it} from 'vitest';
import './icon-button.js';
import {ObcIconButton} from './icon-button.js';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';

describe('obc-icon-button accessible name', () => {
  async function setup(template: ReturnType<typeof html>) {
    const screen = render(template);
    const el = screen.baseElement.querySelector(
      'obc-icon-button'
    ) as ObcIconButton;
    await el.updateComplete;
    return el;
  }

  function shadowButton(el: ObcIconButton) {
    return el.shadowRoot!.querySelector('button')!;
  }

  it('forwards the host aria-label to the shadow button', async () => {
    const el = await setup(
      html`<obc-icon-button aria-label="Play"></obc-icon-button>`
    );

    expect(shadowButton(el).getAttribute('aria-label')).toBe('Play');
  });

  it('follows later changes to the host aria-label', async () => {
    const el = await setup(
      html`<obc-icon-button aria-label="Play"></obc-icon-button>`
    );

    el.setAttribute('aria-label', 'Pause');
    await el.updateComplete;

    expect(shadowButton(el).getAttribute('aria-label')).toBe('Pause');
  });

  it('does not forward aria-labelledby, which cannot resolve across the shadow boundary', async () => {
    const el = await setup(
      html`<obc-icon-button
        aria-label="Play"
        aria-labelledby="external-label"
      ></obc-icon-button>`
    );

    const button = shadowButton(el);
    expect(button.hasAttribute('aria-labelledby')).toBe(false);
    expect(button.getAttribute('aria-label')).toBe('Play');
  });
});
