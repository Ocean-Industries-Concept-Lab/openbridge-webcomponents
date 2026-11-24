import {describe, expect, it} from 'vitest';
import './button.js';
import {ObcButton} from './button.js';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';

describe('obc-button accessible name', () => {
  async function setup(template: ReturnType<typeof html>) {
    const screen = render(template);
    const el = screen.baseElement.querySelector('obc-button') as ObcButton;
    await el.updateComplete;
    return el;
  }

  function control(el: ObcButton) {
    return el.shadowRoot!.querySelector<HTMLElement>('.wrapper')!;
  }

  it('forwards the host aria-label to the shadow button', async () => {
    const el = await setup(
      html`<obc-button aria-label="Cancel the pending request"
        >Pending</obc-button
      >`
    );

    expect(control(el).tagName).toBe('BUTTON');
    expect(control(el).getAttribute('aria-label')).toBe(
      'Cancel the pending request'
    );
  });

  it('forwards it to the anchor when href is set', async () => {
    const el = await setup(
      html`<obc-button href="#settings" aria-label="Open the settings"
        >Settings</obc-button
      >`
    );

    expect(control(el).tagName).toBe('A');
    expect(control(el).getAttribute('aria-label')).toBe('Open the settings');
  });

  it('follows later changes to the host aria-label', async () => {
    const el = await setup(
      html`<obc-button aria-label="Pending, press to cancel"
        >Pending</obc-button
      >`
    );

    el.setAttribute('aria-label', 'Confirmed');
    await el.updateComplete;
    expect(control(el).getAttribute('aria-label')).toBe('Confirmed');

    el.removeAttribute('aria-label');
    await el.updateComplete;
    expect(control(el).hasAttribute('aria-label')).toBe(false);
  });

  it('leaves the name to the slotted text when no aria-label is set', async () => {
    const el = await setup(html`<obc-button>Save</obc-button>`);

    expect(control(el).hasAttribute('aria-label')).toBe(false);
  });

  it('does not forward aria-labelledby, which cannot resolve across the shadow boundary', async () => {
    const el = await setup(
      html`<obc-button aria-label="Save" aria-labelledby="external-label"
        >Save</obc-button
      >`
    );

    expect(control(el).hasAttribute('aria-labelledby')).toBe(false);
    expect(control(el).getAttribute('aria-label')).toBe('Save');
  });
});
