import {beforeEach, describe, expect, it} from 'vitest';
import {LitElement, html, type PropertyValues} from 'lit';
import {GlobalSetting} from './global-setting.js';

const label = new GlobalSetting('one');

type SettingHost = LitElement & {renders: number};

// Registered on first use rather than at module scope: the wrapper
// generators read every module-level element definition, specs included.
function settingHost(leavesDuringUpdate = false): SettingHost {
  const tag = leavesDuringUpdate
    ? 'test-global-setting-leaving-host'
    : 'test-global-setting-host';
  if (!customElements.get(tag)) {
    const Host = class extends LitElement {
      private readonly label = label.controller(this);
      renders = 0;

      override render() {
        this.renders++;
        return html`${this.label.value}`;
      }
    };
    customElements.define(
      tag,
      leavesDuringUpdate
        ? class extends Host {
            private left = false;

            /** Leaves the page from inside its own update, and changes the setting before the update completes. */
            override update(changed: PropertyValues) {
              super.update(changed);
              if (!this.left) {
                this.left = true;
                this.remove();
                label.set('two');
              }
            }
          }
        : Host
    );
  }
  const host = document.createElement(tag) as SettingHost;
  document.body.appendChild(host);
  return host;
}

describe('GlobalSetting', () => {
  beforeEach(() => {
    label.set('one');
    document.body.replaceChildren();
  });

  it('renders the value, and set() re-renders every connected host', async () => {
    const first = settingHost();
    const second = settingHost();
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
    const host = settingHost();
    await host.updateComplete;

    label.set('one');
    await host.updateComplete;

    expect(host.renders).toBe(1);
  });

  it('leaves a detached host alone and lets it catch up on reconnect', async () => {
    const host = settingHost();
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
    const host = settingHost(true);
    await host.updateComplete;
    expect(host.isConnected).toBe(false);
    expect(host.shadowRoot!.textContent).toBe('one');

    document.body.appendChild(host);
    await host.updateComplete;

    expect(host.shadowRoot!.textContent).toBe('two');
    expect(host.renders).toBe(2);
  });

  it('does not re-render a host reattached while nothing changed', async () => {
    const host = settingHost();
    await host.updateComplete;

    host.remove();
    document.body.appendChild(host);
    await host.updateComplete;

    expect(host.renders).toBe(1);
  });
});
