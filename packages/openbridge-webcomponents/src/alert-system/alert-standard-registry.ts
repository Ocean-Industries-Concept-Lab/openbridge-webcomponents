/**
 * `alert-standard-registry` – The alert standards the experimental alert
 * components can draw, and the one they follow by default.
 *
 * Features:
 * - `registerAlertStandard(standard)` adds a standard, or replaces the one
 *   with its id. `iec-62923` and `isa-18.2` are registered from the start.
 * - `findAlertStandard(id)` returns `undefined` for an id nothing is
 *   registered under.
 * - `setDefaultAlertStandard(id)` picks the standard for what draws without
 *   naming one, such as a menu deciding which tabs to show; `iec-62923`
 *   until set.
 * - `AlertStandardController` gives a component its standard, its own
 *   `standard` before the default, and re-renders it when the registry or
 *   the default changes.
 */
import type {ReactiveController, ReactiveControllerHost} from 'lit';
import type {AlertStandard} from './alert-standard.js';
import {iec62923AlertStandard} from './iec-62923-alert-standard.js';
import {isa182AlertStandard} from './isa-18-2-alert-standard.js';

const registeredAlertStandards = new Map<string, AlertStandard>([
  [iec62923AlertStandard.id, iec62923AlertStandard],
  [isa182AlertStandard.id, isa182AlertStandard],
]);

let defaultAlertStandardId: string = iec62923AlertStandard.id;

const registryChangeListeners = new Set<() => void>();

function notifyRegistryChangeListeners() {
  for (const listener of [...registryChangeListeners]) {
    listener();
  }
}

export function registerAlertStandard(standard: AlertStandard): void {
  registeredAlertStandards.set(standard.id, standard);
  notifyRegistryChangeListeners();
}

export function findAlertStandard(id: string): AlertStandard | undefined {
  return registeredAlertStandards.get(id);
}

export function getDefaultAlertStandardId(): string {
  return defaultAlertStandardId;
}

export function setDefaultAlertStandard(id: string): void {
  if (id === defaultAlertStandardId) {
    return;
  }
  defaultAlertStandardId = id;
  notifyRegistryChangeListeners();
}

/** A component that can follow the default alert standard. */
export interface AlertStandardHost extends ReactiveControllerHost {
  /** The component's own standard; the default applies when it is unset. */
  standard?: string;
}

export class AlertStandardController implements ReactiveController {
  private readonly requestHostUpdate = () => this.host.requestUpdate();

  constructor(private readonly host: AlertStandardHost) {
    host.addController(this);
  }

  get standardId(): string {
    return this.host.standard ?? defaultAlertStandardId;
  }

  get standard(): AlertStandard | undefined {
    return findAlertStandard(this.standardId);
  }

  hostConnected() {
    registryChangeListeners.add(this.requestHostUpdate);
  }

  hostDisconnected() {
    registryChangeListeners.delete(this.requestHostUpdate);
  }
}
