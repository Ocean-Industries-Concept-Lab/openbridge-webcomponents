/**
 * `alert-standard` – The alert standard an application follows by default.
 *
 * Every alert names its own standard (`StandardAlert.standard`). The default
 * is for what draws without an alert, such as an icon given only a
 * criticality and a state, or a menu deciding whether to offer "ACK
 * visible"; a component's own `standard` overrides it.
 *
 * Features:
 * - `setDefaultAlertStandard(id)` and `getDefaultAlertStandard()`;
 *   `iec-62923` until set.
 * - `onDefaultAlertStandardChange(listener)` tells a listener about each
 *   change; components follow through `AlertStandardController`.
 *
 * Usage:
 * ```ts
 * import {setDefaultAlertStandard} from './alert-system/alert-standard.js';
 *
 * setDefaultAlertStandard('isa-18.2');
 * ```
 */

let current = 'iec-62923';
const listeners = new Set<() => void>();

export function getDefaultAlertStandard(): string {
  return current;
}

/** Sets the default standard and re-renders the components that follow it. */
export function setDefaultAlertStandard(id: string): void {
  if (id === current) {
    return;
  }
  current = id;
  for (const listener of [...listeners]) {
    listener();
  }
}

/** Calls `listener` after each change of the default; returns the function that stops it. */
export function onDefaultAlertStandardChange(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
