import {LitElement, TemplateResult, html, nothing, unsafeCSS} from 'lit';
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
import {IconButtonVariant} from '../icon-button/icon-button.js';
import '../../icons/icon-chevron-left-google.js';
import '../radio/radio.js';
import '../toggle-switch/toggle-switch.js';
import '../navigation-item/navigation-item.js';
import '../accordion-item/accordion-item.js';
import '../button/button.js';

export interface WifiState {
  enabled: boolean;
  connected: boolean;
  networkName?: string;
  strength: number; // 0-100, 0 is no signal, 100 is full signal
  status: string; // Example: "Connected, Secure"
  networks?: {
    name: string;
    signalStrength: number; // 0-100, 0 is no signal, 100 is full signal
  }[];
  otherNetworks?: {
    name: string;
    signalStrength: number; // 0-100, 0 is no signal, 100 is full signal
  }[];
}

export interface AudioState {
  muted: boolean;
  volume: number; // 0-100, 0 is muted, 100 is full volume
  outputs?: {
    name: string;
  }[];
  selectedOutput?: string;
}

export interface MicrophoneState {
  muted: boolean;
  currentLevel: number; // 0-100, 0 is no sound, 100 is full sound
  inputs?: {
    name: string;
  }[];
  selectedInput?: string;
  pushToTalk?: boolean;
}

export interface BatteryState {
  level: number; // 0-100, 0 is empty, 100 is full
  charging: boolean; // true if charging, false if not charging,
  batterySavingMode?: boolean; // true if battery saving mode is enabled, false if not enabled, undefined if not supported
  hasUsageButton: boolean; // true if usage button is should be shown, false if not shown
  modes?: {
    name: string;
  }[];
  selectedMode?: string;
}

export enum SystemSubMenu {
  main = 'main',
  wifi = 'wifi',
  audio = 'audio',
  microphone = 'microphone',
  battery = 'battery',
}

export type VolumeChangeEvent = CustomEvent<number>;

/**
 * @fires wifi-click - When the Wi-Fi button is clicked
 * @fires audio-click - When the Audio button is clicked
 * @fires audio-volume-change - {VolumeChangeEvent} - When the Audio volume is changed
 * @fires microphone-click - When the Microphone button is clicked
 * @fires battery-usage-click - When the Battery usage button is clicked
 * @fires battery-saving-mode-change - When the Battery saving mode is changed
 * @fires battery-mode-change - When the Battery mode is changed
 * @fires wifi-network-change - When the Wi-Fi network is changed
 * @fires audio-output-change - When the Audio output is changed
 * @fires microphone-input-change - When the Microphone input is changed
 * @fires settings-click - When the Settings button is clicked
 * @fires to-sub-menu-click - When the sub menu is clicked
 * @fires wifi-options-click - When the Wi-Fi options are clicked
 * @fires wifi-disconnect-click - When the Wi-Fi disconnect is clicked
 */
@customElement('obc-system-menu')
@localized()
export class ObcSystemMenu extends LitElement {
  @property({attribute: false}) wifiState: WifiState | undefined;
  @property({attribute: false}) audioState: AudioState | undefined;
  @property({attribute: false}) microphoneState: MicrophoneState | undefined;
  @property({attribute: false}) batteryState: BatteryState | undefined;
  @property({type: Boolean}) condensed: boolean = true;
  @property({type: Boolean}) showSettingsButton: boolean = true;
  @property({type: String}) activeSubMenu: SystemSubMenu = SystemSubMenu.main;
  @property({type: Boolean}) externalControl: boolean = false;

  override render() {
    let content: (TemplateResult | symbol)[];
    switch (this.activeSubMenu) {
      case SystemSubMenu.main:
        content = [
          this.renderWifi(),
          this.renderAudio(),
          this.renderMicrophone(),
          this.renderBattery(),
          this.renderSettingsButton(),
        ];
        break;
      case SystemSubMenu.wifi:
        content = [
          this.renderSubMenuTitle(msg('Wi-Fi')),
          this.renderWifiSubMenuHeader(),
          this.renderWifMenuOptions(),
          this.renderSettingsButton(),
        ];
        break;
      case SystemSubMenu.audio:
        content = [
          this.renderSubMenuTitle(msg('Audio')),
          this.renderAudioSubMenuHeader(),
          this.renderAudioSubMenuOptions(),
          this.renderSettingsButton(),
        ];
        break;
      case SystemSubMenu.microphone:
        content = [
          this.renderSubMenuTitle(msg('Microphone')),
          this.renderMicrophoneSubMenuHeader(),
          this.renderMicrophoneSubMenuOptions(),
          this.renderSettingsButton(),
        ];
        break;
      case SystemSubMenu.battery:
        content = [
          this.renderSubMenuTitle(msg('Battery')),
          this.renderBatterySubMenuHeader(),
          this.renderBatterySubMenuOptions(),
          this.renderSettingsButton(),
        ];
        break;
    }
    return html`<div class="wrapper ${this.condensed ? 'condensed' : ''}">
      ${content}
    </div> `;
  }

  private dispatchClickEvent(eventName: string) {
    this.dispatchEvent(new CustomEvent(eventName));
  }

  private handleAudioClick(event: CustomEvent) {
    this.dispatchEvent(
      new CustomEvent('audio-click', {detail: {muted: !event.detail.checked}})
    );
  }

  private handleAudioVolumeChange(event: ObcSliderValueEvent) {
    this.dispatchEvent(
      new CustomEvent('audio-volume-change', {detail: {volume: event.detail}})
    );
  }

  private handleToSubMenuClick(subMenu: SystemSubMenu) {
    if (!this.externalControl) {
      this.activeSubMenu = subMenu;
    }
    this.dispatchClickEvent('to-sub-menu-click');
  }

  private renderWifi() {
    if (!this.wifiState) {
      return nothing;
    }
    const showMoreButton =
      this.wifiState.networks && this.wifiState.networks.length > 0;
    const title = showMoreButton
      ? html`<button
          class="title-container"
          @click=${() => this.handleToSubMenuClick(SystemSubMenu.wifi)}
        >
          <div class="title">${msg('Wi-Fi')}</div>
          <div class="icon-container">
            <obi-chevron-right-google class="icon"></obi-chevron-right-google>
          </div>
        </button>`
      : html`<div class="title-container">
          <div class="title">${msg('Wi-Fi')}</div>
        </div>`;
    return html`<div class="group">
      ${this.condensed ? nothing : title}
      <div class="content-container">
        <obc-icon-check-button
          class="content-item-btn"
          .checked=${!!this.wifiState.enabled}
          @icon-check-button-click=${() =>
            this.dispatchClickEvent('wifi-click')}
        >
          ${this.wifiState?.enabled
            ? html`<obi-wifi2-google slot="icon"></obi-wifi2-google>`
            : html`<obi-wifi2-off-google slot="icon"></obi-wifi2-off-google>`}
        </obc-icon-check-button>
        <div
          class="content-item-value ${this.wifiState.enabled
            ? 'enabled'
            : 'disabled'}"
        >
          ${this.wifiState?.networkName}
        </div>
        ${this.condensed && showMoreButton
          ? html` <obc-icon-button
              .variant=${IconButtonVariant.flat}
              @click=${() => this.handleToSubMenuClick(SystemSubMenu.wifi)}
            >
              <obi-chevron-right-google></obi-chevron-right-google>
            </obc-icon-button>`
          : nothing}
      </div>
    </div>`;
  }

  private renderAudio() {
    if (!this.audioState) {
      return nothing;
    }
    const showMoreButton =
      this.audioState.outputs && this.audioState.outputs.length > 0;

    const title = showMoreButton
      ? html`<button
          class="title-container"
          @click=${() => this.handleToSubMenuClick(SystemSubMenu.audio)}
        >
          <div class="title">${msg('Audio')}</div>
          <div class="icon-container">
            <obi-chevron-right-google class="icon"></obi-chevron-right-google>
          </div>
        </button>`
      : html`<div class="title-container">
          <div class="title">${msg('Audio')}</div>
        </div>`;
    return html`<div class="group">
      ${this.condensed ? nothing : title}
      <div class="content-container">
        <obc-icon-check-button
          class="content-item-btn"
          .checked=${!this.audioState.muted}
          @icon-check-button-click=${() =>
            this.dispatchClickEvent('audio-click')}
        >
          ${this.audioState.muted
            ? html`<obi-sound-muted slot="icon"></obi-sound-muted>`
            : html`<obi-sound slot="icon"></obi-sound>`}
        </obc-icon-check-button>
        <obc-slider
          class="content-item-slider"
          .value=${this.audioState.volume}
          @value=${this.handleAudioVolumeChange}
        ></obc-slider>
        ${this.condensed && showMoreButton
          ? html` <obc-icon-button
              .variant=${IconButtonVariant.flat}
              @click=${() => this.handleToSubMenuClick(SystemSubMenu.audio)}
            >
              <obi-chevron-right-google></obi-chevron-right-google>
            </obc-icon-button>`
          : nothing}
      </div>
    </div>`;
  }

  private renderMicrophone() {
    if (!this.microphoneState) {
      return nothing;
    }
    const hasInputs =
      this.microphoneState.inputs && this.microphoneState.inputs.length > 0;
    const hasPushToTalk = this.microphoneState.pushToTalk !== undefined;
    const showMoreButton = hasInputs || hasPushToTalk;

    const title = showMoreButton
      ? html`<button
          class="title-container"
          @click=${() => this.handleToSubMenuClick(SystemSubMenu.microphone)}
        >
          <div class="title">${msg('Microphone')}</div>
          <div class="icon-container">
            <obi-chevron-right-google class="icon"></obi-chevron-right-google>
          </div>
        </button>`
      : html`<div class="title-container">
          <div class="title">${msg('Microphone')}</div>
        </div>`;
    return html`<div class="group">
      ${this.condensed ? nothing : title}
      <div class="content-container">
        <obc-icon-check-button
          class="content-item-btn"
          .checked=${!this.microphoneState.muted}
          @icon-check-button-click=${this.handleMicrophoneClick}
        >
          ${this.microphoneState.muted
            ? html`<obi-com-mic-muted-google
                slot="icon"
              ></obi-com-mic-muted-google>`
            : html`<obi-com-microphone slot="icon"></obi-com-microphone>`}
        </obc-icon-check-button>
        <div class="content-item-value">
          <obc-audio-visual
            .volume=${(this.microphoneState.currentLevel / 100) * 8}
          ></obc-audio-visual>
        </div>
        ${this.condensed && showMoreButton
          ? html` <obc-icon-button
              .variant=${IconButtonVariant.flat}
              @click=${() =>
                this.handleToSubMenuClick(SystemSubMenu.microphone)}
            >
              <obi-chevron-right-google></obi-chevron-right-google>
            </obc-icon-button>`
          : nothing}
      </div>
    </div>`;
  }

  private renderBattery() {
    if (!this.batteryState) {
      return nothing;
    }
    const hasModes =
      this.batteryState.modes && this.batteryState.modes.length > 0;
    const hasUsageButton = this.batteryState.hasUsageButton;
    const hasBatterySavingMode =
      this.batteryState.batterySavingMode !== undefined;
    const showMoreButton = hasModes || hasUsageButton || hasBatterySavingMode;
    const title = showMoreButton
      ? html`<button
          class="title-container"
          @click=${() => this.handleToSubMenuClick(SystemSubMenu.battery)}
        >
          <div class="title">${msg('Battery')}</div>
          <div class="icon-container">
            <obi-chevron-right-google class="icon"></obi-chevron-right-google>
          </div>
        </button>`
      : html`<div class="title-container">
          <div class="title">${msg('Battery')}</div>
        </div>`;
    return html`<div class="group">
      ${this.condensed ? nothing : title}
      <div class="content-container battery-container">
        <div class="battery">
          <obc-battery-icon
            .level=${this.batteryState.level}
            .charging=${this.batteryState.charging}
          ></obc-battery-icon>
          <div class="percentage">${this.batteryState.level}%</div>
          <div class="status">
            ${this.batteryState.charging ? msg('Charging') : msg('On battery')}
          </div>
        </div>
        ${this.condensed && showMoreButton
          ? html` <obc-icon-button
              .variant=${IconButtonVariant.flat}
              @click=${() => this.handleToSubMenuClick(SystemSubMenu.battery)}
            >
              <obi-chevron-right-google></obi-chevron-right-google>
            </obc-icon-button>`
          : nothing}
      </div>
    </div>`;
  }

  private renderSettingsButton() {
    if (!this.showSettingsButton) {
      return nothing;
    }
    return html`<div class="group">
      <button
        class="title-container settings"
        @click=${() => this.dispatchClickEvent('settings-click')}
      >
        <div class="icon-container">
          <obi-settings-iec class="icon"></obi-settings-iec>
        </div>
        <div class="title">${msg('Settings')}</div>
      </button>
    </div>`;
  }

  private renderSubMenuTitle(title: string) {
    return html`
      <div class="title-container sub-menu-title">
        <obc-icon-button
          .variant=${IconButtonVariant.normal}
          @click=${() => this.handleToSubMenuClick(SystemSubMenu.main)}
        >
          <obi-chevron-left-google></obi-chevron-left-google>
        </obc-icon-button>
        <div class="title">${title}</div>
      </div>
    `;
  }

  private renderWifiSubMenuHeader() {
    return html` <div class="sub-container">
      <div class="row wifi-container">
        <obi-wifi2-google class="icon large"></obi-wifi2-google>
        <div class="title wifi-name">${this.wifiState?.networkName}</div>
        <div class="wifi-status">${this.wifiState?.status}</div>
      </div>
      <div class="row">
        <obc-button
          @click=${() => this.dispatchClickEvent('wifi-options-click')}
          fullWidth
          >${msg('Options')}</obc-button
        >
        ${this.wifiState?.connected
          ? html`<obc-button
              @click=${() => this.dispatchClickEvent('wifi-disconnect-click')}
              fullWidth
              >${msg('Disconnect')}</obc-button
            >`
          : nothing}
      </div>
    </div>`;
  }

  private renderAudioSubMenuHeader() {
    return html` <div class="sub-container">
      <div class="row">
        ${this.audioState?.muted
          ? html`<obi-sound-muted class="icon large off"></obi-sound-muted>`
          : html`<obi-sound class="icon large"></obi-sound>`}
        <div class="title">
          ${this.audioState?.volume}
          <div class="unit">%</div>
        </div>
      </div>
      <div class="row">
        <obc-icon-check-button
          .checked=${!this.audioState?.muted}
          @icon-check-button-click=${this.handleAudioClick}
        >
          ${this.audioState?.muted
            ? html`<obi-sound-muted slot="icon"></obi-sound-muted>`
            : html`<obi-sound slot="icon"></obi-sound>`}
        </obc-icon-check-button>
        <obc-slider
          class="content-item-slider"
          .value=${this.audioState?.volume ?? 0}
          @value=${this.handleAudioVolumeChange}
        ></obc-slider>
      </div>
    </div>`;
  }

  private handleMicrophoneClick(event: CustomEvent<{checked: boolean}>) {
    this.dispatchEvent(
      new CustomEvent('microphone-click', {
        detail: {muted: !event.detail.checked},
      })
    );
  }

  private handlePushToTalkClick(event: CustomEvent<{checked: boolean}>) {
    this.dispatchEvent(
      new CustomEvent('push-to-talk-change', {
        detail: {pushToTalk: event.detail.checked},
      })
    );
  }

  private handleBatterySavingModeClick(event: CustomEvent<{checked: boolean}>) {
    this.dispatchEvent(
      new CustomEvent('battery-saving-mode-change', {
        detail: {batterySavingMode: event.detail.checked},
      })
    );
  }

  private renderMicrophoneSubMenuHeader() {
    return html` <div class="sub-container">
      <div class="row">
        ${this.microphoneState?.muted
          ? html`<obi-com-mic-muted-google
              class="icon large"
            ></obi-com-mic-muted-google>`
          : html`<obi-com-microphone class="icon large"></obi-com-microphone>`}
        <div class="title">
          ${this.microphoneState?.currentLevel}
          <div class="unit">dB</div>
        </div>
      </div>
      <div class="row">
        <obc-icon-check-button
          .checked=${!this.microphoneState?.muted}
          externalControl
          @icon-check-button-click=${this.handleMicrophoneClick}
        >
          ${this.microphoneState?.muted
            ? html`<obi-com-mic-muted-google
                slot="icon"
              ></obi-com-mic-muted-google>`
            : html`<obi-com-microphone slot="icon"></obi-com-microphone>`}
        </obc-icon-check-button>
        <obc-audio-visual
          .volume=${((this.microphoneState?.currentLevel ?? 0) / 100) * 8}
        ></obc-audio-visual>
      </div>
      ${this.microphoneState?.pushToTalk !== undefined
        ? html`<div class="row no-padding">
            <obc-toggle-switch
              .checked=${this.microphoneState?.pushToTalk}
              @input=${this.handlePushToTalkClick}
              label=${msg('Push to talk')}
            ></obc-toggle-switch>
          </div>`
        : nothing}
    </div>`;
  }

  private handleBatteryUsageClick() {
    this.dispatchEvent(
      new CustomEvent('battery-usage-click', {detail: {usage: true}})
    );
  }

  private renderBatterySubMenuHeader() {
    if (!this.batteryState) {
      return nothing;
    }
    return html` <div class="sub-container">
      <div class="row">
        <obc-battery-icon
          class="icon large"
          .level=${this.batteryState.level}
          .charging=${this.batteryState.charging}
        ></obc-battery-icon>
        <div class="title">
          ${this.batteryState.level}
          <div class="unit">%</div>
        </div>
      </div>
      <div class="row">
        <obc-button @click=${this.handleBatteryUsageClick} fullWidth>
          ${msg('Usage')}
        </obc-button>
      </div>
      ${this.batteryState.batterySavingMode !== undefined
        ? html`<div class="row no-padding">
            <obc-toggle-switch
              .checked=${this.batteryState.batterySavingMode}
              @toggle-switch-click=${this.handleBatterySavingModeClick}
              label=${msg('Battery saving mode')}
            ></obc-toggle-switch>
          </div>`
        : nothing}
    </div>`;
  }

  private handleWifiNetworkClick(name: string) {
    this.dispatchEvent(
      new CustomEvent('wifi-network-change', {detail: {network: name}})
    );
  }

  private renderWifMenuOptions() {
    if (this.wifiState?.networks?.length === 0) {
      return nothing;
    }
    return html`
      <div class="sub-container sub-container-title">
        <div class="row title2">${msg('Wi-Fi')}</div>
      </div>
      <div class="sub-container">
        <div class="row navigation-items">
          ${this.wifiState?.networks?.map(
            (option) => html`
              <obc-navigation-item
                .label=${option.name}
                .checked=${option.name === this.wifiState?.networkName}
                @click=${() => this.handleWifiNetworkClick(option.name)}
                hasIcon
              >
                <obi-wifi2-google slot="icon"></obi-wifi2-google>
              </obc-navigation-item>
            `
          )}
          <obc-accordion-item title=${msg('Other networks')}>
            <div slot="expanded-content">
              ${this.wifiState?.otherNetworks?.map(
                (option) => html`
                  <obc-navigation-item
                    .label=${option.name}
                    .checked=${option.name === this.wifiState?.networkName}
                    @click=${() => this.handleWifiNetworkClick(option.name)}
                    hasIcon
                  >
                    <obi-wifi2-google slot="icon"></obi-wifi2-google>
                  </obc-navigation-item>
                `
              )}
            </div>
          </obc-accordion-item>
        </div>
      </div>
    `;
  }

  private handleAudioOutputClick(name: string) {
    this.dispatchEvent(
      new CustomEvent('audio-output-change', {detail: {output: name}})
    );
  }

  private handleMicrophoneInputClick(name: string) {
    this.dispatchEvent(
      new CustomEvent('microphone-input-change', {detail: {input: name}})
    );
  }

  private handleBatteryModeClick(name: string) {
    this.dispatchEvent(
      new CustomEvent('battery-mode-change', {detail: {mode: name}})
    );
  }

  private renderAudioSubMenuOptions() {
    return this.renderSubMenuOptions(
      msg('Output'),
      this.audioState?.outputs ?? [],
      this.audioState?.selectedOutput ?? '',
      (name: string) => this.handleAudioOutputClick(name)
    );
  }

  private renderMicrophoneSubMenuOptions() {
    return this.renderSubMenuOptions(
      msg('Input'),
      this.microphoneState?.inputs ?? [],
      this.microphoneState?.selectedInput ?? '',
      (name: string) => this.handleMicrophoneInputClick(name)
    );
  }

  private renderBatterySubMenuOptions() {
    return this.renderSubMenuOptions(
      msg('Mode'),
      this.batteryState?.modes ?? [],
      this.batteryState?.selectedMode ?? '',
      (name: string) => this.handleBatteryModeClick(name)
    );
  }

  private renderSubMenuOptions(
    title: string,
    options: {name: string}[],
    selectedOption: string,
    handleOptionClick: (name: string) => void
  ) {
    if (options.length === 0) {
      return nothing;
    }
    return html`
      <div class="sub-container sub-container-title">
        <div class="row title2">${title}</div>
      </div>
      <div class="sub-container">
        <div class="row radio">
          ${options.map(
            (option) => html`
              <obc-radio
                .name=${title}
                .label=${option.name}
                .checked=${option.name === selectedOption}
                @change=${() => handleOptionClick(option.name)}
              ></obc-radio>
            `
          )}
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}
