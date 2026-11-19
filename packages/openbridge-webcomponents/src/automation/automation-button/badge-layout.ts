/**
 * Badge layout of the automation buttons.
 *
 * Says which badge kind each corner of an automation button shows. The app
 * sets one layout for every button with `setAutomationBadgeLayout()`; a
 * button's own `badgeLayout` property changes single corners on top of it.
 *
 * Merge rules, for both the global and the local layout:
 * - a corner left out keeps the layout underneath it,
 * - `null` leaves the corner empty,
 * - a kind moved to a new corner leaves the corner it came from, so it is
 *   never shown twice.
 *
 * ```ts
 * setAutomationBadgeLayout({
 *   topLeft: AutomationButtonBadgeKind.Alert,
 *   topRight: AutomationButtonBadgeKind.Control,
 * });
 * ```
 *
 * @module
 */
import type {ReactiveControllerHost} from 'lit';
import {
  GlobalSetting,
  GlobalSettingController,
} from '../../internal/global-setting.js';

export enum AutomationButtonBadgeKind {
  Control = 'control',
  Alert = 'alert',
  Interlock = 'interlock',
  CommandLocked = 'command-locked',
}

/** Which badge kind each corner shows. `null` leaves the corner empty. */
export interface AutomationButtonBadgeLayout {
  topLeft?: AutomationButtonBadgeKind | null;
  topRight?: AutomationButtonBadgeKind | null;
  bottomLeft?: AutomationButtonBadgeKind | null;
  bottomRight?: AutomationButtonBadgeKind | null;
}

export type ResolvedAutomationButtonBadgeLayout =
  Required<AutomationButtonBadgeLayout>;

const corners = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const;

export const defaultAutomationButtonBadgeLayout: Readonly<ResolvedAutomationButtonBadgeLayout> =
  Object.freeze({
    topLeft: AutomationButtonBadgeKind.Control,
    topRight: AutomationButtonBadgeKind.Alert,
    bottomLeft: AutomationButtonBadgeKind.Interlock,
    bottomRight: AutomationButtonBadgeKind.CommandLocked,
  });

/**
 * The `base` layout with the corners `override` names put on top of it.
 * A kind `override` names twice stays in the first corner, in reading order.
 */
export function resolveBadgeLayout(
  base: ResolvedAutomationButtonBadgeLayout,
  override: AutomationButtonBadgeLayout | undefined
): ResolvedAutomationButtonBadgeLayout {
  const result = {...base};
  if (!override) {
    return result;
  }
  const placed = new Set<AutomationButtonBadgeKind>();
  for (const corner of corners) {
    const kind = override[corner];
    if (kind === undefined) {
      continue;
    }
    result[corner] = kind !== null && placed.has(kind) ? null : kind;
    if (kind !== null) {
      placed.add(kind);
    }
  }
  for (const corner of corners) {
    const kind = result[corner];
    if (override[corner] === undefined && kind !== null && placed.has(kind)) {
      result[corner] = null;
    }
  }
  return result;
}

const globalLayout = new GlobalSetting<ResolvedAutomationButtonBadgeLayout>({
  ...defaultAutomationButtonBadgeLayout,
});

/**
 * Sets the badge layout of every automation button on the page, and
 * re-renders the ones already connected. `undefined` restores the default.
 */
export function setAutomationBadgeLayout(
  layout: AutomationButtonBadgeLayout | undefined
): void {
  globalLayout.set(
    resolveBadgeLayout(defaultAutomationButtonBadgeLayout, layout)
  );
}

export function getAutomationBadgeLayout(): ResolvedAutomationButtonBadgeLayout {
  return {...globalLayout.get()};
}

/** Re-renders its host when the global badge layout changes, and puts the host's own corners on top of it. */
export class BadgeLayoutController extends GlobalSettingController<ResolvedAutomationButtonBadgeLayout> {
  constructor(host: ReactiveControllerHost) {
    super(host, globalLayout);
  }

  resolve(
    local: AutomationButtonBadgeLayout | undefined
  ): ResolvedAutomationButtonBadgeLayout {
    return resolveBadgeLayout(this.value, local);
  }
}
