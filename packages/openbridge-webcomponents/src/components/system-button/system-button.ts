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

export enum SystemButtonVariant {
  condensed = 'condensed',
  expanded = 'expanded',
  actions = 'actions',
}

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

@customElement('obc-system-button')
export class ObcSystemButton extends LitElement {
  @property({type: String}) variant: SystemButtonVariant =
    SystemButtonVariant.condensed;
  @property({type: Boolean}) disabled = false;
  @property({type: Object}) systemState: SystemState = {
    wifi: {enabled: false, connected: true, strength: 3},
    audio: {enabled: false, muted: false, volume: 65},
    microphone: {enabled: false, muted: false, sensitivity: 80},
    battery: {enabled: false, level: 78, charging: false},
    gps: {enabled: false, connected: false, quality: 'medium'},
  };

  @property({type: Boolean}) menuOpen = false;
  @property({type: String}) activePanel:
    | 'microphone'
    | 'volume'
    | 'system-icons'
    | null = null;

  private _handleExpandedTypeClick() {
    this.menuOpen = !this.menuOpen;
    this.dispatchEvent(
      new CustomEvent('menu-toggle', {
        detail: {open: this.menuOpen},
      })
    );
  }

  /**
   * Updates the system state and dispatches a change event
   * Called by the System Menu component
   */
  public updateSystemState(newState: Partial<SystemState>) {
    this.systemState = {...this.systemState, ...newState};
    this.dispatchEvent(
      new CustomEvent('system-state-change', {
        detail: {state: this.systemState},
      })
    );
  }

  /**
   * Closes the system menu panel
   * Called by the System Menu component
   */
  public closeMenu() {
    this.menuOpen = false;
    this.activePanel = null;
  }

  private _handleMicrophoneActionClick = () => {
    this.activePanel = 'microphone';
    this.menuOpen = true;
    this.dispatchEvent(new CustomEvent('microphone-panel-open'));
  };

  private _handleVolumeActionClick = () => {
    this.activePanel = 'volume';
    this.menuOpen = true;
    this.dispatchEvent(new CustomEvent('volume-panel-open'));
  };

  private _handleSystemIconsActionClick = () => {
    this.activePanel = 'system-icons';
    this.menuOpen = true;
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

    // Show strength-based icon when connected
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
          class="expanded-visually-hidden"
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
