/**
 * Re-rendering for the app-wide badge settings.
 *
 * The badge layout (`setAutomationBadgeLayout()`) and the badge symbol
 * override (`setAutomationBadgeSymbolOverride()`) are plain module values.
 * Each setter calls `notifyBadgeSettingsChanged()`, which re-renders every
 * device that holds a `BadgeSettingsController`.
 *
 * @module
 */
import type {ReactiveController, ReactiveControllerHost} from 'lit';

let version = 0;
const hosts = new Set<ReactiveControllerHost>();

/** Re-renders every connected device that shows badges. */
export function notifyBadgeSettingsChanged(): void {
  version++;
  hosts.forEach((host) => host.requestUpdate());
}

/** Re-renders its host when an app-wide badge setting changes. */
export class BadgeSettingsController implements ReactiveController {
  private renderedVersion = version;

  constructor(private readonly host: ReactiveControllerHost) {
    host.addController(this);
  }

  /** A setting changed while the host was detached never reached it. */
  hostConnected(): void {
    hosts.add(this.host);
    if (this.renderedVersion !== version) {
      this.host.requestUpdate();
    }
  }

  hostDisconnected(): void {
    hosts.delete(this.host);
  }

  hostUpdate(): void {
    this.renderedVersion = version;
  }
}
