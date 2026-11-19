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
import type {ReactiveController, ReactiveControllerHost} from 'lit';

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

/** The `base` layout with the corners `override` names put on top of it. */
export function resolveBadgeLayout(
  base: ResolvedAutomationButtonBadgeLayout,
  override: AutomationButtonBadgeLayout | undefined
): ResolvedAutomationButtonBadgeLayout {
  const result = {...base};
  if (!override) {
    return result;
  }
  const named = corners.filter((corner) => override[corner] !== undefined);
  const moved = new Set(named.map((corner) => override[corner]));
  for (const corner of corners) {
    if (named.includes(corner)) {
      result[corner] = override[corner]!;
    } else if (result[corner] !== null && moved.has(result[corner])) {
      result[corner] = null;
    }
  }
  return result;
}

let globalLayout: ResolvedAutomationButtonBadgeLayout = {
  ...defaultAutomationButtonBadgeLayout,
};
const hosts = new Set<ReactiveControllerHost>();

/**
 * Sets the badge layout of every automation button on the page, and
 * re-renders the ones already connected. `undefined` restores the default.
 */
export function setAutomationBadgeLayout(
  layout: AutomationButtonBadgeLayout | undefined
): void {
  globalLayout = resolveBadgeLayout(defaultAutomationButtonBadgeLayout, layout);
  hosts.forEach((host) => host.requestUpdate());
}

export function getAutomationBadgeLayout(): ResolvedAutomationButtonBadgeLayout {
  return {...globalLayout};
}

/** Re-renders its host when the global badge layout changes. */
export class BadgeLayoutController implements ReactiveController {
  constructor(private readonly host: ReactiveControllerHost) {
    host.addController(this);
  }

  hostConnected(): void {
    hosts.add(this.host);
  }

  hostDisconnected(): void {
    hosts.delete(this.host);
  }

  /** The global layout with the host's own corners on top. */
  resolve(
    local: AutomationButtonBadgeLayout | undefined
  ): ResolvedAutomationButtonBadgeLayout {
    return resolveBadgeLayout(globalLayout, local);
  }
}
