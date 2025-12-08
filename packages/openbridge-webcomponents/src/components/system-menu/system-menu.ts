import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './system-menu.css?inline';
import {property} from 'lit/decorators.js';
import {localized, msg} from '@lit/localize';
import '../../icons/icon-chevron-right-google.js';
import '../../icons/icon-wifi2-google.js';
import '../icon-check-button/icon-check-button.js';
import '../../icons/icon-wifi2-off-google.js';
import '../../icons/icon-sound-muted.js';
import '../../icons/icon-sound.js';
import '../../icons/icon-com-mic-muted-google.js';
import '../../icons/icon-com-microphone.js';
import '../slider/slider.js';
import {ObcSliderValueEvent} from '../slider/slider.js';
import '../audio-visual/audio-visual.js';
import '../battery-icon/battery-icon.js';
import '../../icons/icon-settings-iec.js';
import '../icon-button/icon-button.js';
import { IconButtonVariant } from '../icon-button/icon-button.js';

export interface WifiState {
  enabled: boolean;
  connected: boolean;
  networkName?: string;
  strength: number; // 0-100, 0 is no signal, 100 is full signal
}

export interface AudioState {
  muted: boolean;
  volume: number; // 0-100, 0 is muted, 100 is full volume
}

export interface MicrophoneState {
  muted: boolean;
  currentLevel: number; // 0-100, 0 is no sound, 100 is full sound
}

export interface BatteryState {
  level: number; // 0-100, 0 is empty, 100 is full
  charging: boolean; // true if charging, false if not charging
}

export type VolumeChangeEvent = CustomEvent<number>;

/**
 * @fires wifi-click - When the Wi-Fi button is clicked
 * @fires audio-click - When the Audio button is clicked
 * @fires audio-volume-change - {VolumeChangeEvent} - When the Audio volume is changed
 * @fires microphone-click - When the Microphone button is clicked
 */
@customElement('obc-system-menu')
@localized()
export class ObcSystemMenu extends LitElement {
  @property() wifiState: WifiState | undefined;
  @property() audioState: AudioState | undefined;
  @property() microphoneState: MicrophoneState | undefined;
  @property() batteryState: BatteryState | undefined;
  @property() condensed: boolean = true;
  @property() showSettingsButton: boolean = true;

  override render() {
    return html`<div class="wrapper ${this.condensed ? 'condensed' : ''}">
      ${this.renderWifi()}
      ${this.renderAudio()}
      ${this.renderMicrophone()}
      ${this.renderBattery()}
      ${this.renderSettingsButton()}
    </div> `;
  }

  private handleWifiClick(event: CustomEvent) {
    this.dispatchEvent(
      new CustomEvent('wifi-click', {detail: {enabled: event.detail.checked}})
    );
  }

  private handleAudioClick(event: CustomEvent) {
    this.dispatchEvent(
      new CustomEvent('audio-click', {detail: {muted: event.detail.checked}})
    );
  }

  private handleAudioVolumeChange(event: ObcSliderValueEvent) {
    this.dispatchEvent(
      new CustomEvent('audio-volume-change', {detail: {volume: event.detail}})
    );
  }

  private handleBatteryClick(event: CustomEvent) {
    this.dispatchEvent(
      new CustomEvent('battery-click', {detail: {charging: event.detail.checked}})
    );
  }

  private handleSettingsClick(event: CustomEvent) {
    this.dispatchEvent(
      new CustomEvent('settings-click', {detail: {showSettings: event.detail.checked}})
    );
  }

  private renderWifi() {
    if (!this.wifiState) {
      return nothing;
    }
    return html`<div class="group">
      ${this.condensed ? nothing : html`
      <button class="title-container" @click=${this.handleWifiClick}>
        <div class="title">${msg('Wi-Fi')}</div>
        <div class="icon-container">
          <obi-chevron-right-google class="icon"></obi-chevron-right-google>
        </div>
      </button>`}
      <div class="content-container">
        <obc-icon-check-button
          class="content-item-btn"
          .checked=${!!this.wifiState.enabled}
          externalControl
          @icon-check-button-click=${this.handleWifiClick}
        >
          ${this.wifiState?.enabled
            ? html`<obi-wifi2-google slot="icon"></obi-wifi2-google>`
            : html`<obi-wifi2-off-google slot="icon"></obi-wifi2-off-google>`}
        </obc-icon-check-button>
        <div class="content-item-value ${this.wifiState.enabled ? 'enabled' : 'disabled'}">${this.wifiState?.networkName}</div>
        ${this.condensed ?  html`
        <obc-icon-button .variant=${IconButtonVariant.flat} @click=${this.handleWifiClick}>
          <obi-chevron-right-google></obi-chevron-right-google>
        </obc-icon-button>` : nothing}
      </div>
    </div>`;
  }

  private renderAudio() {
    if (!this.audioState) {
      return nothing;
    }
    return html`<div class="group">
      ${this.condensed ? nothing : html`
      <button class="title-container" @click=${this.handleAudioClick}>
        <div class="title">${msg('Audio')}</div>
        <div class="icon-container">
          <obi-chevron-right-google class="icon"></obi-chevron-right-google>
        </div>
      </button>`}
      <div class="content-container">
        <obc-icon-check-button
          class="content-item-btn"
          .checked=${!this.audioState.muted}
          externalControl
          @icon-check-button-click=${this.handleAudioClick}
        >
          ${this.audioState.muted
            ? html`<obi-sound-muted slot="icon"></obi-sound-muted>`
            : html`<obi-sound slot="icon"></obi-sound>`}
        </obc-icon-check-button>
        <obc-slider
          class="content-item-slider"
          .value=${this.audioState.volume}
          @change=${this.handleAudioVolumeChange}
        ></obc-slider>
        ${this.condensed ?  html`
        <obc-icon-button .variant=${IconButtonVariant.flat} @click=${this.handleAudioClick}>
          <obi-chevron-right-google></obi-chevron-right-google>
        </obc-icon-button>` : nothing}
      </div>
    </div>`;
  }

  private handleMicrophoneClick(event: CustomEvent) {
    this.dispatchEvent(
      new CustomEvent('microphone-click', {detail: {muted: event.detail.checked}})
    );
  }

  private renderMicrophone() {
    if (!this.microphoneState) {
      return nothing;
    }
    return html`<div class="group">
      ${this.condensed ? nothing : html`
      <button class="title-container" @click=${this.handleMicrophoneClick}>
        <div class="title">${msg('Microphone')}</div>
        <div class="icon-container">
          <obi-chevron-right-google class="icon"></obi-chevron-right-google>
        </div>
      </button>`}
      <div class="content-container">
        <obc-icon-check-button
          class="content-item-btn"
          .checked=${!this.microphoneState.muted}
          externalControl
          @icon-check-button-click=${this.handleMicrophoneClick}
        >
          ${this.microphoneState.muted
            ? html`<obi-com-mic-muted-google slot="icon"></obi-com-mic-muted-google>`
            : html`<obi-com-microphone slot="icon"></obi-com-microphone>`}
        </obc-icon-check-button>
        <div class="content-item-value">
          <obc-audio-visual
            .volume=${this.microphoneState.currentLevel / 100 * 8}
          ></obc-audio-visual>
        </div>
        ${this.condensed ?  html`
        <obc-icon-button .variant=${IconButtonVariant.flat} @click=${this.handleMicrophoneClick}>
          <obi-chevron-right-google></obi-chevron-right-google>
        </obc-icon-button>` : nothing}
      </div>
    </div>`;
  }

  private renderBattery() {
    if (!this.batteryState) {
      return nothing;
    }
    return html`<div class="group">
      ${this.condensed ? nothing : html`
      <button class="title-container" @click=${this.handleBatteryClick}>
        <div class="title">${msg('Battery')}</div>
        <div class="icon-container">
          <obi-chevron-right-google class="icon"></obi-chevron-right-google>
        </div>
      </button>`}
      <div class="content-container battery-container">
        <div class="battery">
          <obc-battery-icon
            .level=${this.batteryState.level}
            .charging=${this.batteryState.charging}
          ></obc-battery-icon>
          <div class="percentage">${this.batteryState.level}%</div>
          <div class="status">${this.batteryState.charging ? msg('Charging') : msg('On battery')}</div>
        </div>
        ${this.condensed ?  html`
        <obc-icon-button .variant=${IconButtonVariant.flat} @click=${this.handleBatteryClick}>
          <obi-chevron-right-google></obi-chevron-right-google>
        </obc-icon-button>` : nothing}
      </div>
    </div>`;
  }

  private renderSettingsButton() {
    if (!this.showSettingsButton) {
      return nothing;
    }
    return html`<div class="group">
      <button class="title-container settings" @click=${this.handleSettingsClick}>
        <div class="icon-container">
          <obi-settings-iec class="icon"></obi-settings-iec>
        </div>
        <div class="title">${msg('Settings')}</div>
      </button>
    </div>`;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-system-menu': ObcSystemMenu;
  }
}
