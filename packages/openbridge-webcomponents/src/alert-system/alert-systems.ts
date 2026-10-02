/**
 * `alert-systems` – The registry of alert standards, and the controller that
 * gives a component the standard it follows.
 *
 * Features:
 * - `alertSystem(id)` returns the standard registered under an id, or the
 *   default standard's for an id nothing is registered under.
 * - `registerAlertSystem(system)` adds a standard, or replaces the one with
 *   its id; `registeredAlertSystems()` lists them in the order they came.
 * - `AlertStandardController` resolves a component's standard, its own
 *   `standard` before the default, and re-renders the component when the
 *   default changes.
 *
 * Usage:
 * ```ts
 * class MyAlert extends LitElement {
 *   standard?: string;
 *   private readonly standardController = new AlertStandardController(this);
 *   override render() {
 *     const {system} = this.standardController;
 *     return html`${system.label(this.criticality)}`;
 *   }
 * }
 * ```
 */
import type {ReactiveController, ReactiveControllerHost} from 'lit';
import {
  getDefaultAlertStandard,
  onDefaultAlertStandardChange,
} from './alert-standard.js';
import type {AlertSystem} from './alert-system.js';
import {maritimeAlertSystem} from './maritime-alert-system.js';
import {automationAlertSystem} from './automation-alert-system.js';

const systems = new Map<string, AlertSystem>(
  [maritimeAlertSystem, automationAlertSystem].map((system) => [
    system.id,
    system as AlertSystem,
  ])
);

export function registerAlertSystem(system: AlertSystem): void {
  systems.set(system.id, system);
}

export function alertSystem(id: string): AlertSystem {
  return (
    systems.get(id) ??
    systems.get(getDefaultAlertStandard()) ??
    (maritimeAlertSystem as AlertSystem)
  );
}

/** The built-in standards first, then the others in the order they were registered. */
export function registeredAlertSystems(): AlertSystem[] {
  return [...systems.values()];
}

/** A component that can follow the default alert standard. */
export interface AlertStandardHost extends ReactiveControllerHost {
  /** The component's own standard; the default applies when it is unset. */
  standard?: string;
}

export class AlertStandardController implements ReactiveController {
  private stopListening?: () => void;

  /**
   * `own` reads the host's own standard; a host that keeps it elsewhere than
   * `standard` passes its own reader.
   */
  constructor(
    private readonly host: AlertStandardHost,
    private readonly own: () => string | undefined = () => host.standard
  ) {
    host.addController(this);
  }

  get id(): string {
    return this.own() ?? getDefaultAlertStandard();
  }

  get system(): AlertSystem {
    return alertSystem(this.id);
  }

  hostConnected() {
    this.stopListening = onDefaultAlertStandardChange(() =>
      this.host.requestUpdate()
    );
  }

  hostDisconnected() {
    this.stopListening?.();
    this.stopListening = undefined;
  }
}
