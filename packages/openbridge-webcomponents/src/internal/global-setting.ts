import type {ReactiveController, ReactiveControllerHost} from 'lit';

/**
 * One app-wide setting the components render from.
 *
 * The application sets it once through a module setter such as
 * `setAutomationBadgeLayout()` or `setAlertStandard()`. Every connected host
 * that holds a controller for it re-renders on each change; a host detached
 * while the value changed catches up on its next connect, and one reattached
 * unchanged renders nothing extra. Setting the same value again is a no-op.
 *
 * It is a plain subscriber set rather than a signal: the value rarely changes
 * and derives nothing, and the library stays off a pre-standard polyfill. A
 * setter built on it can move to a signal later without changing its signature.
 *
 * ```ts
 * const alertStandard = new GlobalSetting<AlertStandard | undefined>(undefined);
 * export const setAlertStandard = (s?: AlertStandard) => alertStandard.set(s);
 *
 * class ObcAlertIcon extends LitElement {
 *   private readonly standard = alertStandard.controller(this);
 *   render() { return draw(this.standard.value); }
 * }
 * ```
 */
export class GlobalSetting<T> {
  private currentVersion = 0;
  private readonly hosts = new Set<ReactiveControllerHost>();

  constructor(private value: T) {}

  get(): T {
    return this.value;
  }

  /** Stores the value and re-renders every connected host. */
  set(value: T): void {
    if (Object.is(value, this.value)) {
      return;
    }
    this.value = value;
    this.currentVersion++;
    for (const host of this.hosts) {
      host.requestUpdate();
    }
  }

  /** Re-renders `host` whenever the value changes; create it once, in the host's constructor. */
  controller(host: ReactiveControllerHost): GlobalSettingController<T> {
    return new GlobalSettingController(host, this);
  }

  /** Counts the changes, so a controller can tell whether its host rendered the current value. */
  get version(): number {
    return this.currentVersion;
  }

  attach(host: ReactiveControllerHost): void {
    this.hosts.add(host);
  }

  detach(host: ReactiveControllerHost): void {
    this.hosts.delete(host);
  }
}

/** Keeps one host rendered with the current value of a `GlobalSetting`. */
export class GlobalSettingController<T> implements ReactiveController {
  private renderedVersion: number;

  constructor(
    private readonly host: ReactiveControllerHost,
    private readonly setting: GlobalSetting<T>
  ) {
    this.renderedVersion = setting.version;
    host.addController(this);
  }

  get value(): T {
    return this.setting.get();
  }

  /** A value set while the host was detached never reached it. */
  hostConnected(): void {
    this.setting.attach(this.host);
    if (this.renderedVersion !== this.setting.version) {
      this.host.requestUpdate();
    }
  }

  hostDisconnected(): void {
    this.setting.detach(this.host);
  }

  hostUpdated(): void {
    this.renderedVersion = this.setting.version;
  }
}
