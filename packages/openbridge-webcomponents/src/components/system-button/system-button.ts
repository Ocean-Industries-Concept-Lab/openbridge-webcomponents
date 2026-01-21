import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './system-button.css?inline';
import {property} from 'lit/decorators.js';
import '../icon-button/icon-button.js';
import {IconButtonVariant} from '../icon-button/icon-button.js';
import '../../icons/icon-configure.js';
import '../../icons/icon-com-microphone.js';
import '../../icons/icon-com-mic-muted-google.js';
import '../../icons/icon-wifi2-google.js';
import '../../icons/icon-wifi2-off-google.js';
import '../../icons/icon-sensor-gps-bad.js';
import '../../icons/icon-sensor-gps-low.js';
import '../../icons/icon-sensor-gps-medium.js';
import '../../icons/icon-sensor-gps-full.js';
import '../../icons/icon-battery-horizontal-100.js';
import '../../icons/icon-battery-horizontal-75.js';
import '../../icons/icon-battery-horizontal-50.js';
import '../../icons/icon-battery-horizontal-25.js';
import '../../icons/icon-battery-horizontal-low.js';
import '../../icons/icon-battery-horizontal-empty.js';
import '../../icons/icon-battery-horizontal-charging-100.js';
import '../../icons/icon-battery-horizontal-charging-50.js';
import '../../icons/icon-battery-horizontal-charging-25.js';
import '../../icons/icon-battery-horizontal-charging-empty.js';
import '../../icons/icon-sound-muted.js';
import '../../icons/icon-sound-no.js';
import '../../icons/icon-sound-low.js';
import '../../icons/icon-sound.js';
import '../button/button.js';
import {classMap} from 'lit/directives/class-map.js';

export enum SystemButtonVariant {
  condensed = 'condensed',
  expanded = 'expanded',
  actions = 'actions',
}

/**
 * Describes the enabled state and current value for each system indicator displayed by `<obc-system-button>`.
 *
 * - `wifi`: WiFi status (enabled, connected, strength, network name)
 * - `audio`: Audio status (enabled, muted, volume)
 * - `microphone`: Microphone status (enabled, muted, sensitivity)
 * - `battery`: Battery status (enabled, level, charging)
 * - `gps`: GPS status (enabled, connected, quality)
 */
export interface SystemState {
  wifi: {
    enabled: boolean;
    connected: boolean;
    networkName?: string;
    strength: 0 | 1 | 2 | 3 | 4; // Maps directly to icon variants
  };
  audio: {
    enabled: boolean;
    muted: boolean;
    volume: number; // 0-100
  };
  microphone: {
    enabled: boolean;
    muted: boolean;
    sensitivity: number; // 0-100
  };
  battery: {
    enabled: boolean;
    level: number; // 0-100
    charging: boolean;
  };
  gps: {
    enabled: boolean;
    connected: boolean;
    quality: 'bad' | 'low' | 'medium' | 'full'; // Maps to GPS icon variants
  };
}

/**
 * `<obc-system-button>` – A multi-state system status and quick-action button for displaying and controlling core system indicators.
 *
 * This component provides a compact, interactive summary of system-level statuses such as WiFi, audio, microphone, battery, and GPS. It can be used as a single icon button, an expanded status display, or a segmented set of quick-action buttons, depending on the chosen variant. Designed for use in application toolbars, system menus, or quick-access panels where users need to view and interact with system controls at a glance.
 *
 * Appears as an icon or set of icons representing real-time system states. Supports toggling panels for detailed control or configuration, and adapts its layout to suit condensed, expanded, or action-oriented contexts.
 *
 * ## Features
 *
 * - **Variants**:
 *   - **Condensed**: Single icon button (typically a settings or system icon) for minimal space usage.
 *   - **Expanded**: Horizontal button displaying a row of system status icons (WiFi, audio, microphone, battery, GPS) for quick visual overview.
 *   - **Actions**: Segmented button group, each segment representing a system function (microphone, volume, system icons), with interactive actions for each.
 * - **Dynamic Iconography**: Icons update in real time to reflect system state (e.g., WiFi strength, battery level, mute status, GPS quality).
 * - **Quick Actions**: In actions variant, clicking a segment opens the corresponding control panel (e.g., microphone settings, volume slider).
 * - **State Awareness**: Each system indicator (WiFi, audio, microphone, battery, GPS) can be enabled/disabled independently, and their visual state reflects connection, mute, charge, or quality status.
 * - **Accessibility**: Button segments are keyboard accessible and support disabled state.
 * - **Customizable**: System state can be controlled via the `systemState` property, allowing for integration with live system data.
 *
 * ## Usage Guidelines
 *
 * Use `<obc-system-button>` to provide users with a compact, always-visible summary of key system statuses and quick access to related controls. Ideal for application toolbars, overlays, or system menus where users need to monitor and adjust system settings without leaving their current context.
 *
 * - Use the **condensed** variant for minimal UI or when only a single system menu entry is needed.
 * - Use the **expanded** variant to show multiple system statuses at a glance, especially when space allows and quick status recognition is important.
 * - Use the **actions** variant to provide direct access to system controls (e.g., mute/unmute, adjust volume, open system settings).
 *
 * Only enable system indicators that are relevant to your application context. For example, if GPS is not available, set `systemState.gps.enabled` to `false` to hide the GPS icon.
 *
 * **TODO(designer):** Provide guidance on when to use each variant and any best practices for grouping or prioritizing system indicators.
 *
 *
 * ## Properties and Attributes
 *
 * - `variant` (`condensed` | `expanded` | `actions`): Controls the visual and interactive mode of the button. Default is `condensed`.
 * - `disabled` (boolean): Disables all interactions and renders the button(s) in a disabled state.
 * - `systemState` (object): Object describing the enabled state and current value for each system indicator (WiFi, audio, microphone, battery, GPS). Each sub-property (e.g., `wifi.enabled`, `audio.volume`) controls the presence and state of its corresponding icon.
 * - `menuOpen` (boolean): Indicates whether a system panel is currently open (used internally for expanded/actions variants).
 * - `activePanel` (string or null): Indicates which panel (if any) is currently active (`microphone`, `volume`, `system-icons`, or `null`).
 *
 * ## Events
 *
 * - `menu-toggle` – Fired when the expanded variant is toggled open or closed.
 * - `system-state-change` – Fired when the system state is updated via `updateSystemState()`.
 * - `microphone-panel-open` – Fired when the microphone action segment is activated.
 * - `volume-panel-open` – Fired when the volume action segment is activated.
 * - `system-icons-panel-open` – Fired when the system icons action segment is activated.
 *
 * ## Best Practices and Constraints
 *
 * - Only enable system indicators that are relevant to your application context.
 * - In the actions variant, avoid overloading the UI with too many segments; keep the number of quick actions manageable.
 * - Each segment in the actions variant should have a clear, distinct purpose.
 * - The component is intended for summary/status and quick access, not for detailed configuration (which should be handled in dedicated panels).
 * - For accessibility, ensure that all interactive segments are reachable via keyboard and provide appropriate labels.
 *
 * ## Example
 *
 * ```html
 * <obc-system-button
 *   variant="actions"
 *   .systemState="${{
 *     wifi: {enabled: true, connected: true, strength: 3},
 *     audio: {enabled: true, muted: false, volume: 65},
 *     microphone: {enabled: true, muted: false, sensitivity: 80},
 *     battery: {enabled: true, level: 78, charging: false},
 *     gps: {enabled: true, connected: true, quality: 'medium'},
 *   }}"
 * >
 *   <span slot="icon"><obi-placeholder></obi-placeholder></span>
 * </obc-system-button>
 * ```
 *
 * @fires menu-toggle {CustomEvent<{open: boolean}>} When the expanded variant is toggled open or closed
 * @fires system-state-change {CustomEvent<{state: SystemState}>} When the system state is updated
 * @fires microphone-panel-open {CustomEvent<void>} When the microphone action segment is activated
 * @fires volume-panel-open {CustomEvent<void>} When the volume action segment is activated
 * @fires system-icons-panel-open {CustomEvent<void>} When the system icons action segment is activated
 */
@customElement('obc-system-button')
export class ObcSystemButton extends LitElement {
  /**
   * Controls the visual and interactive mode of the system button.
   *
   * - `condensed`: Single icon button for minimal UI.
   * - `expanded`: Horizontal button showing a row of system status icons.
   * - `actions`: Segmented button group for quick access to system controls.
   *
   * Default: `condensed`
   */
  @property({type: String}) variant: SystemButtonVariant =
    SystemButtonVariant.condensed;

  /**
   * Disables all interactions and renders the button(s) in a disabled state.
   */
  @property({type: Boolean}) disabled = false;

  /**
   * Object describing the enabled state and current value for each system indicator (WiFi, audio, microphone, battery, GPS).
   *
   * Each sub-property (e.g., `wifi.enabled`, `audio.volume`) controls the presence and state of its corresponding icon.
   *
   * Default: all indicators disabled except WiFi (connected), audio (volume 65), microphone (sensitivity 80), battery (level 78), GPS (quality medium).
   */
  @property({type: Object}) systemState: SystemState = {
    wifi: {enabled: false, connected: true, strength: 3},
    audio: {enabled: false, muted: false, volume: 65},
    microphone: {enabled: false, muted: false, sensitivity: 80},
    battery: {enabled: false, level: 78, charging: false},
    gps: {enabled: false, connected: false, quality: 'medium'},
  };

  /**
   * Indicates whether a system panel is currently open (used internally for expanded/actions variants).
   */
  @property({type: Boolean}) menuOpen = false;

  /**
   * Indicates which panel (if any) is currently active.
   * One of: `'microphone'`, `'volume'`, `'system-icons'`, or `null`.
   */
  @property({type: String}) activePanel:
    | 'microphone'
    | 'volume'
    | 'system-icons'
    | null = null;

  private _handleExpandedTypeClick() {
    /**
     * Fired when the expanded variant is toggled open or closed.
     *
     * @event menu-toggle
     * @type {CustomEvent<{open: boolean}>}
     */
    this.dispatchEvent(
      new CustomEvent('menu-toggle', {
        detail: {open: this.menuOpen},
      })
    );
  }

  /**
   * Updates the system state and dispatches a change event.
   * Called by the System Menu component.
   *
   * @param newState Partial system state to merge with the current state.
   * @fires system-state-change {CustomEvent<{state: SystemState}>} When the system state is updated
   */
  public updateSystemState(newState: Partial<SystemState>) {
    this.systemState = {...this.systemState, ...newState};
    this.dispatchEvent(
      new CustomEvent('system-state-change', {
        detail: {state: this.systemState},
      })
    );
  }

  private _handleMicrophoneActionClick = () => {
    this.activePanel = 'microphone';
    /**
     * Fired when the microphone action segment is activated.
     *
     * @event microphone-panel-open
     * @type {CustomEvent<void>}
     */
    this.dispatchEvent(new CustomEvent('microphone-panel-open'));
  };

  private _handleVolumeActionClick = () => {
    this.activePanel = 'volume';
    /**
     * Fired when the volume action segment is activated.
     *
     * @event volume-panel-open
     * @type {CustomEvent<void>}
     */
    this.dispatchEvent(new CustomEvent('volume-panel-open'));
  };

  private _handleSystemIconsActionClick = () => {
    this.activePanel = 'system-icons';
    /**
     * Fired when the system icons action segment is activated.
     *
     * @event system-icons-panel-open
     * @type {CustomEvent<void>}
     */
    this.dispatchEvent(new CustomEvent('system-icons-panel-open'));
  };

  private _renderActionsButtons() {
    const buttons = [];
    let buttonCount = 0;

    // Count enabled buttons first to determine segment positions
    if (this.systemState.microphone.enabled) buttonCount++;
    if (this.systemState.audio.enabled) buttonCount++;
    // Always show system icons button
    buttonCount++;

    let currentIndex = 0;

    // Microphone button
    if (this.systemState.microphone.enabled) {
      const segmentPosition =
        buttonCount === 1
          ? 'single'
          : currentIndex === 0
            ? 'start'
            : currentIndex === buttonCount - 1
              ? 'end'
              : 'middle';

      buttons.push(html`
        <obc-button
          .variant=${IconButtonVariant.normal}
          .segmentPosition=${segmentPosition}
          .showLeadingIcon=${true}
          @click=${this._handleMicrophoneActionClick}
          .disabled=${this.disabled}
        >
          <span slot="leading-icon">${this._renderMicrophoneIcon()}</span>
          ${this.systemState.microphone.muted ? 'Off' : 'On'}
        </obc-button>
      `);
      currentIndex++;
    }

    // Volume button
    if (this.systemState.audio.enabled) {
      const segmentPosition =
        buttonCount === 1
          ? 'single'
          : currentIndex === 0
            ? 'start'
            : currentIndex === buttonCount - 1
              ? 'end'
              : 'middle';

      buttons.push(html`
        <obc-button
          .variant=${IconButtonVariant.normal}
          .segmentPosition=${segmentPosition}
          .showLeadingIcon=${true}
          @click=${this._handleVolumeActionClick}
          .disabled=${this.disabled}
        >
          <span slot="leading-icon">${this._renderVolumeIcon()}</span>
          ${this.systemState.audio.volume}
        </obc-button>
      `);
      currentIndex++;
    }

    // System icons button (always shown)
    const segmentPosition =
      buttonCount === 1 ? 'single' : currentIndex === 0 ? 'start' : 'end';

    buttons.push(html`
      <obc-button
        .variant=${IconButtonVariant.normal}
        .segmentPosition=${segmentPosition}
        .showLeadingIcon=${true}
        @click=${this._handleSystemIconsActionClick}
        .disabled=${this.disabled}
      >
        <span slot="leading-icon" class="multiple-icons">
          ${this._renderWifiIcon()} ${this._renderGpsIcon()}
          ${this._renderBatteryIcon()}
        </span>
      </obc-button>
    `);

    return buttons;
  }

  private _renderMicrophoneIcon() {
    if (!this.systemState.microphone.enabled) return nothing;

    if (this.systemState.microphone.muted) {
      return html`<obi-com-mic-muted-google></obi-com-mic-muted-google>`;
    } else {
      return html`<obi-com-microphone></obi-com-microphone>`;
    }
  }

  private _renderVolumeIcon() {
    if (!this.systemState.audio.enabled) return nothing;

    const volume = this.systemState.audio.volume;
    const muted = this.systemState.audio.muted;

    if (muted) {
      return html`<obi-sound-muted></obi-sound-muted>`;
    }

    // Show different sound levels based on volume
    if (volume === 0) {
      return html`<obi-sound-no></obi-sound-no>`;
    } else if (volume <= 50) {
      return html`<obi-sound-low></obi-sound-low>`;
    } else {
      return html`<obi-sound></obi-sound>`;
    }
  }

  private _renderWifiIcon() {
    if (!this.systemState.wifi.enabled) return nothing;

    if (!this.systemState.wifi.connected) {
      return html`<obi-wifi2-off-google></obi-wifi2-off-google>`;
    }

    // Show strength-based icon when connected - update rendering icons when we get new icons
    switch (this.systemState.wifi.strength) {
      case 0:
        return html`<obi-wifi2-google></obi-wifi2-google>`;
      case 1:
        return html`<obi-wifi2-google></obi-wifi2-google>`;
      case 2:
        return html`<obi-wifi2-google></obi-wifi2-google>`;
      case 3:
        return html`<obi-wifi2-google></obi-wifi2-google>`;
      case 4:
        return html`<obi-wifi2-google></obi-wifi2-google>`;
      default:
        return html`<obi-wifi2-google></obi-wifi2-google>`;
    }
  }

  private _renderGpsIcon() {
    if (!this.systemState.gps.enabled) return nothing;

    if (!this.systemState.gps.connected) {
      return html`<obi-sensor-gps-bad></obi-sensor-gps-bad>`;
    }

    // Show GPS quality based on signal
    switch (this.systemState.gps.quality) {
      case 'bad':
        return html`<obi-sensor-gps-bad></obi-sensor-gps-bad>`;
      case 'low':
        return html`<obi-sensor-gps-low></obi-sensor-gps-low>`;
      case 'medium':
        return html`<obi-sensor-gps-medium></obi-sensor-gps-medium>`;
      case 'full':
        return html`<obi-sensor-gps-full></obi-sensor-gps-full>`;
      default:
        return html`<obi-sensor-gps-medium></obi-sensor-gps-medium>`;
    }
  }

  private _renderBatteryIcon() {
    if (!this.systemState.battery.enabled) return nothing;

    const level = this.systemState.battery.level;
    const charging = this.systemState.battery.charging;

    if (charging) {
      // Charging icons
      if (level >= 100)
        return html`<obi-battery-horizontal-charging-100></obi-battery-horizontal-charging-100>`;
      if (level >= 50)
        return html`<obi-battery-horizontal-charging-50></obi-battery-horizontal-charging-50>`;
      if (level >= 25)
        return html`<obi-battery-horizontal-charging-25></obi-battery-horizontal-charging-25>`;
      return html`<obi-battery-horizontal-charging-empty></obi-battery-horizontal-charging-empty>`;
    } else {
      // Regular battery icons
      if (level >= 100)
        return html`<obi-battery-horizontal-100></obi-battery-horizontal-100>`;
      if (level >= 75)
        return html`<obi-battery-horizontal-75></obi-battery-horizontal-75>`;
      if (level >= 50)
        return html`<obi-battery-horizontal-50></obi-battery-horizontal-50>`;
      if (level >= 25)
        return html`<obi-battery-horizontal-25></obi-battery-horizontal-25>`;
      if (level > 0)
        return html`<obi-battery-horizontal-low></obi-battery-horizontal-low>`;
      return html`<obi-battery-horizontal-empty></obi-battery-horizontal-empty>`;
    }
  }

  override render() {
    switch (this.variant) {
      case 'condensed':
        return html`
          <obc-icon-button
            variant=${IconButtonVariant.flat}
            .disabled=${this.disabled}
          >
            <obi-configure></obi-configure>
          </obc-icon-button>
        `;

      case 'expanded':
        return html` <button
          class=${classMap({
            'expanded-visually-hidden': true,
            activated: this.menuOpen,
          })}
          @click=${this._handleExpandedTypeClick}
          .disabled=${this.disabled}
        >
          <div class="expanded-inner-wrapper">
            <div class="expanded-icon-container">
              ${this._renderMicrophoneIcon()} ${this._renderVolumeIcon()}
              ${this._renderWifiIcon()} ${this._renderGpsIcon()}
              ${this._renderBatteryIcon()}
            </div>
          </div>
        </button>`;

      case 'actions':
        return html`
          <div class="system-button--actions">
            ${this._renderActionsButtons()}
          </div>
        `;
      default:
        return html`
          <obc-icon-button variant=${IconButtonVariant.normal}>
            <obi-configure></obi-configure>
          </obc-icon-button>
        `;
    }
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-system-button': ObcSystemButton;
  }
}
