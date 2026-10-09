import {afterEach, describe, expect, it} from 'vitest';
import type {ReactiveController} from 'lit';
import {
  getDefaultAlertStandard,
  onDefaultAlertStandardChange,
  setDefaultAlertStandard,
} from './alert-standard.js';
import {AlertStandardController} from './alert-systems.js';

afterEach(() => setDefaultAlertStandard('iec-62923'));

describe('the default alert standard', () => {
  it('starts as IEC 62923', () => {
    expect(getDefaultAlertStandard()).toBe('iec-62923');
  });

  it('tells its listeners once per change, until they leave', () => {
    const seen: string[] = [];
    const leave = onDefaultAlertStandardChange(() =>
      seen.push(getDefaultAlertStandard())
    );
    setDefaultAlertStandard('isa-18.2');
    setDefaultAlertStandard('isa-18.2');
    setDefaultAlertStandard('iec-62923');
    leave();
    setDefaultAlertStandard('isa-18.2');
    expect(seen).toEqual(['isa-18.2', 'iec-62923']);
  });
});

/**
 * A plain host rather than an element: the wrapper generator wraps every
 * LitElement subclass it finds, spec files included.
 */
function standardHost(standard?: string) {
  const controllers: ReactiveController[] = [];
  const host = {
    standard,
    requests: 0,
    addController: (controller: ReactiveController) =>
      controllers.push(controller),
    removeController: () => {},
    requestUpdate: () => {
      host.requests++;
    },
    updateComplete: Promise.resolve(true),
    connect: () => controllers.forEach((c) => c.hostConnected?.()),
    disconnect: () => controllers.forEach((c) => c.hostDisconnected?.()),
  };
  const controller = new AlertStandardController(host);
  host.connect();
  return {host, controller};
}

describe('AlertStandardController', () => {
  it('follows the default and re-renders its host when it changes', () => {
    const {host, controller} = standardHost();
    setDefaultAlertStandard('isa-18.2');
    expect([controller.id, controller.system.id, host.requests]).toEqual([
      'isa-18.2',
      'isa-18.2',
      1,
    ]);
    host.disconnect();
  });

  it("prefers the host's own standard", () => {
    const {host, controller} = standardHost('isa-18.2');
    expect(controller.system.id).toBe('isa-18.2');
    host.disconnect();
  });

  it('stops re-rendering a disconnected host', () => {
    const {host} = standardHost();
    host.disconnect();
    setDefaultAlertStandard('isa-18.2');
    expect(host.requests).toBe(0);
  });
});
