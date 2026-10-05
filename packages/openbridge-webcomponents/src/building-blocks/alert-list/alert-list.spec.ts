import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import './alert-list.js';
import type {ObcAlertList} from './alert-list.js';

describe('obc-alert-list', () => {
  it('tells its controllers when it is removed, as well as when it is added', async () => {
    const screen = render(html`<obc-alert-list></obc-alert-list>`);
    const el = screen.container.querySelector('obc-alert-list') as ObcAlertList;
    await el.updateComplete;
    const calls: string[] = [];
    el.addController({
      hostConnected: () => calls.push('connected'),
      hostDisconnected: () => calls.push('disconnected'),
    });

    el.remove();
    screen.container.append(el);
    expect(calls).toEqual(['connected', 'disconnected', 'connected']);
  });
});
