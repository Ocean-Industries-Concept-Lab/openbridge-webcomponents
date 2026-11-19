/**
 * Badge symbols of the automation devices, and letters that replace them.
 *
 * Maps each value of the four badge properties (`badgeControl`, `badgeAlert`,
 * `badgeInterlock`, `badgeCommandLocked`) to the `obc-automation-badge` type
 * it draws. An app can draw a letter instead of a symbol: for every device
 * with `setAutomationBadgeSymbolOverride()`, for one device with its
 * `badgeSymbolOverride` property, which wins over the app-wide one.
 *
 * Merge rules, per badge value:
 * - a value left out keeps the letter underneath it, or the symbol,
 * - `null` brings the symbol back, over an app-wide letter.
 *
 * ```ts
 * setAutomationBadgeSymbolOverride({commandLocked: {simulation: 's'}});
 * ```
 *
 * The buttons, `obc-automation-tank` and the specialty tanks all read this
 * module, so the four enums map to the same badge everywhere.
 *
 * @module
 */
import type {
  AutomationButtonBadgeAlert,
  AutomationButtonBadgeCommandLocked,
  AutomationButtonBadgeControl,
  AutomationButtonBadgeInterlock,
} from './abstract-automation-button.js';
import {ObcAutomationBadgeType} from '../automation-badge/automation-badge.js';
import {GlobalSetting} from '../../internal/global-setting.js';

/** The letters `obc-automation-badge` draws: `letter-a` to `letter-z`. */
type LowercaseLetter = `${ObcAutomationBadgeType}` extends infer Type
  ? Type extends `letter-${infer Letter}`
    ? Letter
    : never
  : never;

/** One letter, either case; the badge draws it as a capital. */
export type AutomationBadgeLetter =
  LowercaseLetter | Uppercase<LowercaseLetter>;

/** A letter per badge value. `null` keeps the symbol. */
export type AutomationBadgeLetters<Value extends string> = Partial<
  Record<Exclude<`${Value}`, 'none'>, AutomationBadgeLetter | null>
>;

/** Letters that replace badge symbols, per badge property. */
export interface AutomationBadgeSymbolOverride {
  control?: AutomationBadgeLetters<AutomationButtonBadgeControl>;
  alert?: AutomationBadgeLetters<AutomationButtonBadgeAlert>;
  interlock?: AutomationBadgeLetters<AutomationButtonBadgeInterlock>;
  commandLocked?: AutomationBadgeLetters<AutomationButtonBadgeCommandLocked>;
}

export type AutomationBadgeGroup = keyof AutomationBadgeSymbolOverride;

const groups: AutomationBadgeGroup[] = [
  'control',
  'alert',
  'interlock',
  'commandLocked',
];

const T = ObcAutomationBadgeType;

const symbols = {
  control: {
    local: T.Local,
    'local-only': T.LocalOnly,
    manual: T.Manual,
    'manual-only': T.ManualOnly,
    auto: T.Auto,
  },
  alert: {
    silence: T.AlertSilenced,
    shelved: T.AlertShelved,
    caution: T.Caution,
    warning: T.Warning,
    alarm: T.Alarm,
    'level-critical': T.LevelCritical,
    'level-high': T.LevelHigh,
    'level-medium': T.LevelMedium,
    'level-low': T.LevelLow,
    'level-diagnostic': T.LevelDiagnostic,
  },
  interlock: {
    interlock: T.Interlock,
    'interlock-inhibit': T.InterlockInhibit,
    simulation: T.Simulation,
  },
  commandLocked: {
    'command-locked': T.CommandLocked,
    simulation: T.Simulation,
  },
} satisfies {
  [G in AutomationBadgeGroup]-?: Record<
    keyof NonNullable<AutomationBadgeSymbolOverride[G]>,
    ObcAutomationBadgeType
  >;
};

/**
 * The badge type a badge property value draws: the letter `override` names
 * for it, else its symbol. `null` for `none`.
 */
export function automationBadgeType(
  group: AutomationBadgeGroup,
  value: string,
  override?: AutomationBadgeSymbolOverride
): ObcAutomationBadgeType | null {
  const symbol = (symbols[group] as Record<string, ObcAutomationBadgeType>)[
    value
  ];
  if (!symbol) {
    return null;
  }
  const letters = override?.[group] as
    Record<string, AutomationBadgeLetter | null | undefined> | undefined;
  const letter = letters?.[value];
  return letter
    ? (`letter-${letter.toLowerCase()}` as ObcAutomationBadgeType)
    : symbol;
}

/** `base` with the letters `override` names put on top of it. */
export function mergeBadgeSymbolOverride(
  base: AutomationBadgeSymbolOverride | undefined,
  override: AutomationBadgeSymbolOverride | undefined
): AutomationBadgeSymbolOverride {
  const result: AutomationBadgeSymbolOverride = {...base};
  if (!override) {
    return result;
  }
  for (const group of groups) {
    if (override[group]) {
      Object.assign(result, {[group]: {...base?.[group], ...override[group]}});
    }
  }
  return result;
}

/** The app-wide letters; a device re-renders on a change through `BadgeSettingsController`. */
export const badgeSymbolOverrideSetting =
  new GlobalSetting<AutomationBadgeSymbolOverride>({});

/**
 * Sets the letters that replace badge symbols on every automation device on
 * the page, and re-renders the ones already connected. `undefined` restores
 * the symbols.
 */
export function setAutomationBadgeSymbolOverride(
  override: AutomationBadgeSymbolOverride | undefined
): void {
  badgeSymbolOverrideSetting.set(mergeBadgeSymbolOverride(undefined, override));
}

export function getAutomationBadgeSymbolOverride(): AutomationBadgeSymbolOverride {
  return mergeBadgeSymbolOverride(undefined, badgeSymbolOverrideSetting.get());
}

/** The app-wide letters with a device's own letters on top. */
export function currentBadgeSymbolOverride(
  local: AutomationBadgeSymbolOverride | undefined
): AutomationBadgeSymbolOverride {
  return mergeBadgeSymbolOverride(badgeSymbolOverrideSetting.get(), local);
}
