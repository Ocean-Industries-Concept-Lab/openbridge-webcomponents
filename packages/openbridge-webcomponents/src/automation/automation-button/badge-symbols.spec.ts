import {describe, it, expect, afterEach} from 'vitest';
import type {LitElement} from 'lit';
import '../pump/pump.js';
import '../automation-tank/automation-tank.js';
import '../heat-pump/heat-pump.js';
import {
  AutomationButtonBadgeAlert,
  AutomationButtonBadgeCommandLocked,
  AutomationButtonBadgeControl,
  AutomationButtonBadgeInterlock,
} from './abstract-automation-button.js';
import {ObcAutomationBadgeType as T} from '../automation-badge/automation-badge.js';
import {
  AutomationBadgeSymbolOverride,
  automationBadgeType,
  getAutomationBadgeSymbolOverride,
  mergeBadgeSymbolOverride,
  setAutomationBadgeSymbolOverride,
} from './badge-symbols.js';
import {setAutomationBadgeLayout} from './badge-layout.js';

describe('automationBadgeType', () => {
  it('maps every badge value to its symbol, and none to no badge', () => {
    expect(automationBadgeType('control', 'auto')).toBe(T.Auto);
    expect(automationBadgeType('alert', 'shelved')).toBe(T.AlertShelved);
    expect(automationBadgeType('interlock', 'simulation')).toBe(T.Simulation);
    expect(automationBadgeType('commandLocked', 'command-locked')).toBe(
      T.CommandLocked
    );
    expect(automationBadgeType('commandLocked', 'none')).toBeNull();
  });

  it('draws the letter an override names, in either case', () => {
    expect(
      automationBadgeType('commandLocked', 'simulation', {
        commandLocked: {simulation: 's'},
      })
    ).toBe(T.LetterS);
    expect(
      automationBadgeType('control', 'manual', {control: {manual: 'M'}})
    ).toBe(T.LetterM);
  });

  it('keeps the symbol of a value the override leaves out', () => {
    const override: AutomationBadgeSymbolOverride = {
      commandLocked: {simulation: 's'},
    };
    expect(
      automationBadgeType('commandLocked', 'command-locked', override)
    ).toBe(T.CommandLocked);
    expect(automationBadgeType('interlock', 'simulation', override)).toBe(
      T.Simulation
    );
  });

  it('draws no badge for a value that is not a badge value, inherited keys included', () => {
    expect(
      automationBadgeType('control', 'toString', {control: {auto: 'a'}})
    ).toBeNull();
    expect(automationBadgeType('alert', 'constructor')).toBeNull();
  });

  it('keeps no badge for none, whatever the override', () => {
    expect(
      automationBadgeType('commandLocked', 'none', {
        commandLocked: {none: 'n'} as never,
      })
    ).toBeNull();
  });
});

describe('mergeBadgeSymbolOverride', () => {
  it('puts local letters on top of the global ones, value by value', () => {
    expect(
      mergeBadgeSymbolOverride(
        {commandLocked: {simulation: 's', 'command-locked': 'c'}},
        {commandLocked: {simulation: 'x'}, interlock: {simulation: 'm'}}
      )
    ).toEqual({
      commandLocked: {simulation: 'x', 'command-locked': 'c'},
      interlock: {simulation: 'm'},
    });
  });

  it('keeps a global letter where the local value is undefined', () => {
    const merged = mergeBadgeSymbolOverride(
      {commandLocked: {simulation: 's'}},
      {commandLocked: {simulation: undefined}}
    );
    expect(merged.commandLocked?.simulation).toBe('s');
  });

  it('lets a local null bring the symbol back', () => {
    const merged = mergeBadgeSymbolOverride(
      {commandLocked: {simulation: 's'}},
      {commandLocked: {simulation: null}}
    );
    expect(automationBadgeType('commandLocked', 'simulation', merged)).toBe(
      T.Simulation
    );
  });
});

const mounted: HTMLElement[] = [];
afterEach(() => {
  mounted.splice(0).forEach((el) => el.remove());
  setAutomationBadgeSymbolOverride(undefined);
  setAutomationBadgeLayout(undefined);
});

type BadgeHost = LitElement & {
  badgeControl: string;
  badgeAlert: string;
  badgeInterlock: string;
  badgeCommandLocked: string;
  badgeSymbolOverride?: AutomationBadgeSymbolOverride;
};

async function mount(tag: string): Promise<BadgeHost> {
  const el = document.createElement(tag) as BadgeHost;
  el.badgeControl = AutomationButtonBadgeControl.Auto;
  el.badgeAlert = AutomationButtonBadgeAlert.Alarm;
  el.badgeInterlock = AutomationButtonBadgeInterlock.Simulation;
  el.badgeCommandLocked = AutomationButtonBadgeCommandLocked.Simulation;
  document.body.appendChild(el);
  mounted.push(el);
  await el.updateComplete;
  return el;
}

/** The badge types in control, alert, interlock, command-locked order. */
function badges(el: BadgeHost): string[] {
  const root = el.shadowRoot!;
  const typeOf = (badge: Element | null) =>
    (badge as unknown as {type: string} | null)?.type ?? null;
  if (root.querySelector('slot[name="badge-top-left"]')) {
    return ['top-left', 'top-right', 'bottom-left', 'bottom-right']
      .map((corner) =>
        typeOf(
          root.querySelector(
            `slot[name="badge-${corner}"] obc-automation-badge`
          )
        )
      )
      .filter((type): type is string => type !== null);
  }
  return [...root.querySelectorAll('obc-automation-badge')].map((badge) =>
    typeOf(badge)!
  );
}

describe.each(['obc-pump', 'obc-automation-tank', 'obc-heat-pump'])(
  'badge symbols on %s',
  (tag) => {
    it('draws the symbols by default', async () => {
      const el = await mount(tag);
      expect(badges(el)).toEqual([T.Auto, T.Alarm, T.Simulation, T.Simulation]);
    });

    it('re-renders when the global override changes', async () => {
      const el = await mount(tag);
      setAutomationBadgeSymbolOverride({commandLocked: {simulation: 's'}});
      await el.updateComplete;
      expect(badges(el)).toEqual([T.Auto, T.Alarm, T.Simulation, T.LetterS]);
    });

    it('lets the local override win over the global one', async () => {
      setAutomationBadgeSymbolOverride({
        commandLocked: {simulation: 's'},
        interlock: {simulation: 's'},
      });
      const el = await mount(tag);
      el.badgeSymbolOverride = {
        commandLocked: {simulation: null},
        interlock: {simulation: 'm'},
      };
      await el.updateComplete;
      expect(badges(el)).toEqual([T.Auto, T.Alarm, T.LetterM, T.Simulation]);
    });

    it('picks up an override set while it was detached', async () => {
      const el = await mount(tag);
      el.remove();
      setAutomationBadgeSymbolOverride({control: {auto: 'a'}});
      document.body.appendChild(el);
      await el.updateComplete;
      expect(badges(el)[0]).toBe(T.LetterA);
    });
  }
);

describe('global override', () => {
  it('returns a copy, and undefined restores the symbols', () => {
    setAutomationBadgeSymbolOverride({commandLocked: {simulation: 's'}});
    const copy = getAutomationBadgeSymbolOverride();
    copy.commandLocked!.simulation = 'x';
    expect(getAutomationBadgeSymbolOverride()).toEqual({
      commandLocked: {simulation: 's'},
    });
    setAutomationBadgeSymbolOverride(undefined);
    expect(getAutomationBadgeSymbolOverride()).toEqual({});
  });
});
