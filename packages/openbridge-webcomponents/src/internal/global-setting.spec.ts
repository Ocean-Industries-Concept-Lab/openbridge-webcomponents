import {beforeEach, describe, expect, it} from 'vitest';
import {LitElement, html} from 'lit';
import {GlobalSetting} from './global-setting.js';

const label = new GlobalSetting('one');

class SettingHost extends LitElement {
  private readonly label = label.controller(this);
  renders = 0;

  override render() {
    this.renders++;
    return html`${this.label.value}`;
  }
}
customElements.define('test-global-setting-host', SettingHost);

/** Leaves the page from inside its own update, and changes the setting before the update completes. */
class SelfRemovingHost extends SettingHost {
  private removedOnce = false;

  override update(changed: Map<PropertyKey, unknown>) {
    super.update(changed);
    if (!this.removedOnce) {
      this.removedOnce = true;
      this.remove();
      label.set('two');
    }
  }
}
customElements.define(
  'test-global-setting-self-removing-host',
  SelfRemovingHost
);

function mount(): SettingHost {
  const host = document.createElement(
    'test-global-setting-host'
  ) as SettingHost;
  document.body.appendChild(host);
  return host;
}

describe('GlobalSetting', () => {
  beforeEach(() => {
    label.set('one');
    document.body.replaceChildren();
  });

  it('renders the value, and set() re-renders every connected host', async () => {
    const first = mount();
    const second = mount();
    await first.updateComplete;
    await second.updateComplete;
    expect(first.shadowRoot!.textContent).toBe('one');

    label.set('two');
    await first.updateComplete;
    await second.updateComplete;

    expect(first.shadowRoot!.textContent).toBe('two');
    expect(second.shadowRoot!.textContent).toBe('two');
    expect(first.renders).toBe(2);
  });

  it('does nothing when the same value is set again', async () => {
    const host = mount();
    await host.updateComplete;

    label.set('one');
    await host.updateComplete;

    expect(host.renders).toBe(1);
  });

  it('leaves a detached host alone and lets it catch up on reconnect', async () => {
    const host = mount();
    await host.updateComplete;

    host.remove();
    label.set('two');
    await host.updateComplete;
    expect(host.renders).toBe(1);

    document.body.appendChild(host);
    await host.updateComplete;
    expect(host.renders).toBe(2);
    expect(host.shadowRoot!.textContent).toBe('two');
  });

  it('counts a change during a render that left the page as not rendered', async () => {
    const host = document.createElement(
      'test-global-setting-self-removing-host'
    ) as SelfRemovingHost;
    document.body.appendChild(host);
    await host.updateComplete;
    expect(host.isConnected).toBe(false);
    expect(host.shadowRoot!.textContent).toBe('one');

    document.body.appendChild(host);
    await host.updateComplete;

    expect(host.shadowRoot!.textContent).toBe('two');
    expect(host.renders).toBe(2);
  });

  it('does not re-render a host reattached while nothing changed', async () => {
    const host = mount();
    await host.updateComplete;

    host.remove();
    document.body.appendChild(host);
    await host.updateComplete;

    expect(host.renders).toBe(1);
  });
});
