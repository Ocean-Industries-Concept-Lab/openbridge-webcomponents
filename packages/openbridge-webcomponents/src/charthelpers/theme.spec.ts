import {afterEach, describe, expect, it} from 'vitest';
import type {ReactiveController, ReactiveControllerHost} from 'lit';
import {ObcPalette, PaletteController} from './theme.js';

interface FakeHost extends ReactiveControllerHost {
  updates: number;
  controllers: ReactiveController[];
}

/** The controller touches only `addController` and `requestUpdate`. */
function fakeHost(): FakeHost {
  return {
    updates: 0,
    controllers: [],
    addController(controller) {
      this.controllers.push(controller);
    },
    removeController() {},
    requestUpdate() {
      this.updates++;
    },
    updateComplete: Promise.resolve(true),
  };
}

function setTheme(theme: string): Promise<void> {
  document.documentElement.setAttribute('data-obc-theme', theme);
  return new Promise((resolve) => setTimeout(resolve));
}

describe('PaletteController', () => {
  let controller: PaletteController | undefined;

  afterEach(() => {
    controller?.hostDisconnected();
    controller = undefined;
    document.documentElement.removeAttribute('data-obc-theme');
  });

  it('registers itself, and tracks data-obc-theme while connected', async () => {
    const host = fakeHost();
    controller = new PaletteController(host);
    expect(host.controllers).toEqual([controller]);
    expect(controller.current).toBe(ObcPalette.day);

    controller.hostConnected();
    expect(host.updates).toBe(1);

    await setTheme('night');
    expect(controller.current).toBe(ObcPalette.night);
    expect(host.updates).toBe(2);
  });

  it('catches up on reconnect after a palette change while detached', async () => {
    const host = fakeHost();
    controller = new PaletteController(host);
    controller.hostConnected();
    controller.hostDisconnected();
    const updatesBefore = host.updates;

    await setTheme('dusk');
    expect(controller.current).toBe(ObcPalette.day);
    expect(host.updates).toBe(updatesBefore);

    controller.hostConnected();
    expect(controller.current).toBe(ObcPalette.dusk);
    expect(host.updates).toBe(updatesBefore + 1);

    await setTheme('bright');
    expect(controller.current).toBe(ObcPalette.bright);
    expect(host.updates).toBe(updatesBefore + 2);
  });
});
