import {describe, it, expect, afterEach} from 'vitest';
import '../pump/pump.js';
import type {ObcPump} from '../pump/pump.js';
import {
  AutomationButtonBadgeAlert,
  AutomationButtonBadgeCommandLocked,
  AutomationButtonBadgeControl,
  AutomationButtonBadgeInterlock,
} from './abstract-automation-button.js';
import {ObcAutomationBadgeType} from '../automation-badge/automation-badge.js';
import {
  AutomationButtonBadgeKind as Kind,
  defaultAutomationButtonBadgeLayout,
  getAutomationBadgeLayout,
  resolveBadgeLayout,
  setAutomationBadgeLayout,
} from './badge-layout.js';

describe('resolveBadgeLayout', () => {
  const base = defaultAutomationButtonBadgeLayout;

  it('keeps the base when nothing overrides it', () => {
    expect(resolveBadgeLayout(base, undefined)).toEqual(base);
    expect(resolveBadgeLayout(base, {})).toEqual(base);
  });

  it('empties a corner set to null', () => {
    expect(resolveBadgeLayout(base, {bottomRight: null})).toEqual({
      ...base,
      bottomRight: null,
    });
  });

  it('moves a kind out of the corner it came from', () => {
    expect(resolveBadgeLayout(base, {topLeft: Kind.Alert})).toEqual({
      topLeft: Kind.Alert,
      topRight: null,
      bottomLeft: Kind.Interlock,
      bottomRight: Kind.CommandLocked,
    });
  });

  it('keeps a kind named twice in the first corner only', () => {
    expect(
      resolveBadgeLayout(base, {topRight: Kind.Alert, bottomLeft: Kind.Alert})
    ).toEqual({...base, bottomLeft: null});
  });

  it('swaps two kinds when both corners are named', () => {
    expect(
      resolveBadgeLayout(base, {topLeft: Kind.Alert, topRight: Kind.Control})
    ).toEqual({...base, topLeft: Kind.Alert, topRight: Kind.Control});
  });
});

const mounted: HTMLElement[] = [];
afterEach(() => {
  mounted.splice(0).forEach((el) => el.remove());
  setAutomationBadgeLayout(undefined);
});

async function mountPump() {
  const el = document.createElement('obc-pump') as ObcPump;
  el.badgeControl = AutomationButtonBadgeControl.Auto;
  el.badgeAlert = AutomationButtonBadgeAlert.Alarm;
  el.badgeInterlock = AutomationButtonBadgeInterlock.Interlock;
  el.badgeCommandLocked = AutomationButtonBadgeCommandLocked.CommandLocked;
  document.body.appendChild(el);
  mounted.push(el);
  await el.updateComplete;
  return el;
}

function badgeIn(el: ObcPump, corner: string): string | null {
  const badge = el.shadowRoot!.querySelector(
    `slot[name="${corner}"] obc-automation-badge`
  ) as unknown as {type: ObcAutomationBadgeType} | null;
  return badge?.type ?? null;
}

describe('badge layout on a device', () => {
  it('renders the default layout', async () => {
    const el = await mountPump();
    expect(badgeIn(el, 'badge-top-left')).toBe(ObcAutomationBadgeType.Auto);
    expect(badgeIn(el, 'badge-top-right')).toBe(ObcAutomationBadgeType.Alarm);
    expect(badgeIn(el, 'badge-bottom-left')).toBe(
      ObcAutomationBadgeType.Interlock
    );
    expect(badgeIn(el, 'badge-bottom-right')).toBe(
      ObcAutomationBadgeType.CommandLocked
    );
  });

  it('re-renders a connected device when the global layout changes', async () => {
    const el = await mountPump();
    setAutomationBadgeLayout({topLeft: Kind.Alert, topRight: Kind.Control});
    await el.updateComplete;
    expect(badgeIn(el, 'badge-top-left')).toBe(ObcAutomationBadgeType.Alarm);
    expect(badgeIn(el, 'badge-top-right')).toBe(ObcAutomationBadgeType.Auto);
  });

  it('lets the local layout override corners of the global one', async () => {
    setAutomationBadgeLayout({bottomLeft: Kind.CommandLocked});
    expect(getAutomationBadgeLayout().bottomRight).toBeNull();
    const el = await mountPump();
    el.badgeLayout = {bottomRight: Kind.Interlock};
    await el.updateComplete;
    expect(badgeIn(el, 'badge-bottom-left')).toBe(
      ObcAutomationBadgeType.CommandLocked
    );
    expect(badgeIn(el, 'badge-bottom-right')).toBe(
      ObcAutomationBadgeType.Interlock
    );
  });

  it('stops updating a disconnected device', async () => {
    const el = await mountPump();
    el.remove();
    setAutomationBadgeLayout({topLeft: null});
    expect(el.isUpdatePending).toBe(false);
  });

  it('picks up a layout set while it was detached', async () => {
    const el = await mountPump();
    el.remove();
    setAutomationBadgeLayout({topLeft: null});
    document.body.appendChild(el);
    await el.updateComplete;
    expect(badgeIn(el, 'badge-top-left')).toBeNull();
  });

  it('does not re-render on reconnect when nothing changed', async () => {
    const el = await mountPump();
    el.remove();
    document.body.appendChild(el);
    expect(el.isUpdatePending).toBe(false);
  });
});
