import {describe, expect, it} from 'vitest';
import './command-menu.js';
import {ObcCommandMenu} from './command-menu.js';
import type {ObcStartStopSwitch} from '../start-stop-switch/start-stop-switch.js';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';

async function setup(template: ReturnType<typeof html>) {
  const screen = render(template);
  const el = screen.baseElement.querySelector(
    'obc-command-menu'
  ) as ObcCommandMenu;
  await el.updateComplete;
  const toggle = el.shadowRoot!.querySelector(
    'obc-start-stop-switch'
  ) as ObcStartStopSwitch;
  await toggle.updateComplete;
  return {el, toggle};
}

/** What the switch slot named `name` shows, through the menu's nested slots. */
function shown(el: ObcCommandMenu, name: string) {
  const slot = el.shadowRoot!.querySelector<HTMLSlotElement>(
    `slot[name="${name}"]`
  )!;
  return slot
    .assignedElements({flatten: true})
    .map((node) => node.textContent?.trim() || node.localName);
}

describe('obc-command-menu toggle slots', () => {
  it('renders the toggle-… slots in the switch', async () => {
    const {el} = await setup(html`
      <obc-command-menu>
        <div slot="toggle-action-to-in-command-label">Take</div>
        <div slot="toggle-action-to-no-command-label">Release</div>
        <div slot="toggle-state-in-command-label">In CMD</div>
        <div slot="toggle-state-no-command-label">Aft</div>
        <span slot="toggle-state-in-command-icon">icon</span>
      </obc-command-menu>
    `);

    expect(shown(el, 'toggle-action-to-in-command-label')).toEqual(['Take']);
    expect(shown(el, 'toggle-action-to-no-command-label')).toEqual(['Release']);
    expect(shown(el, 'toggle-state-in-command-label')).toEqual(['In CMD']);
    expect(shown(el, 'toggle-state-no-command-label')).toEqual(['Aft']);
    expect(shown(el, 'toggle-state-in-command-icon')).toEqual(['icon']);
  });

  it('still renders the deprecated toogle-… names while the new slot is empty', async () => {
    const {el} = await setup(html`
      <obc-command-menu>
        <div slot="toogle-action-to-in-command-label">Take</div>
        <div slot="toogle-action-to-no-command-label">Release</div>
        <div slot="toogle-state-in-command-label">In CMD</div>
        <div slot="toogle-state-no-command-label">Aft</div>
        <span slot="toogle-state-in-command-icon">icon</span>
      </obc-command-menu>
    `);

    expect(shown(el, 'toggle-action-to-in-command-label')).toEqual(['Take']);
    expect(shown(el, 'toggle-action-to-no-command-label')).toEqual(['Release']);
    expect(shown(el, 'toggle-state-in-command-label')).toEqual(['In CMD']);
    expect(shown(el, 'toggle-state-no-command-label')).toEqual(['Aft']);
    expect(shown(el, 'toggle-state-in-command-icon')).toEqual(['icon']);
  });

  it('prefers the toggle-… slot when both spellings are filled', async () => {
    const {el} = await setup(html`
      <obc-command-menu>
        <div slot="toogle-action-to-in-command-label">Old</div>
        <div slot="toggle-action-to-in-command-label">New</div>
      </obc-command-menu>
    `);

    expect(shown(el, 'toggle-action-to-in-command-label')).toEqual(['New']);
  });

  it('falls back to the command-in icon when neither icon slot is filled', async () => {
    const {el} = await setup(html`<obc-command-menu></obc-command-menu>`);

    expect(shown(el, 'toggle-state-in-command-icon')).toEqual([
      'obi-command-in',
    ]);
  });
});

describe('obc-command-menu switch state', () => {
  it('leaves the switch enabled and without a caption by default', async () => {
    const {toggle} = await setup(html`<obc-command-menu></obc-command-menu>`);

    expect(toggle.disabled).toBe(false);
    expect(toggle.shadowRoot!.querySelector('.description')).toBeNull();
  });

  it('forwards disabled to the switch', async () => {
    const {el, toggle} = await setup(
      html`<obc-command-menu disabled></obc-command-menu>`
    );

    expect(toggle.disabled).toBe(true);

    el.disabled = false;
    await el.updateComplete;
    expect(toggle.disabled).toBe(false);
  });

  it('shows the action description under the switch', async () => {
    const {el, toggle} = await setup(
      html`<obc-command-menu
        hasActionDescription
        actionDescription="Take command of the DP system"
      ></obc-command-menu>`
    );

    expect(
      toggle.shadowRoot!.querySelector('.description')?.textContent?.trim()
    ).toBe('Take command of the DP system');

    el.hasActionDescription = false;
    await el.updateComplete;
    await toggle.updateComplete;
    expect(toggle.shadowRoot!.querySelector('.description')).toBeNull();
  });
});
