import {LitElement, svg, html} from 'lit';
import { customElement } from '../../decorator.js';

import { skyplotStyles } from './gnss-skyplot-legend-styles.js';
import { Colors } from '../interfaces.js';

enum Strength {
  None = 0,
  Weak = 1,
  Medium = 2, 
  Strong = 3
}

interface SignalIconOptions {
  id?: number;
  x?: number;
  y?: number;
  strength: number;
  scale?: number;
}

@customElement('ob-gnss-skyplot-legend')
export class GnssSkyplotLegend extends LitElement {

  override render() {
    return html`
      <div class="container">
        ${this.getSignalStrengthLegend()}
      </div>
    `;
  }
  
  static override styles = [
    skyplotStyles
  ];

  private renderSignalIcon({
    x = 0,
    y = 0,
    strength = 1,
    scale = 1
  }: SignalIconOptions)
  {

    return svg`
      <g transform="translate(${x}, ${y}) scale(${scale})">
        ${this.getStrengthFeature(strength)}
      </g>
    `;
  }

  /*
  private renderSignalIcon({
    id = 0,
    x = 0,
    y = 0,
    strength = 1,
    spoofing = false,
    jamming = false,
    spoJamConfirmed = false,
    scale = 1
  }) 
  {
    const spoofingStroke = spoofing ? Colors.alertAlarmColor : Colors.instrumentEnhancedTertiary;
    const jammingStroke = jamming ? Colors.alertCautionColor : Colors.instrumentEnhancedTertiary;
    const slashVisible = spoJamConfirmed;

    return svg`
      <g transform="translate(${x}, ${y}) scale(${scale})"
        @click=${() => this.handleClickOnSatellite(id ?? 0)}>

        ${this.getStrengthFeature(strength)}

        ${id !== undefined ? this.getText(id, strength) : ''}

        ${this.getSpoofing(spoofing, spoofingStroke)}
        ${this.getJamming(jamming, jammingStroke)}
        ${this.getSlash(slashVisible)}
      </g>
    `;
  }
  */

  private getStrengthFeature(strength: Strength) {
    const fillColor = this.getSectorStrengthFillColor(strength);
    const strokeColor = this.getSectorStrengthStrokeColor(strength);

    return svg`
      <path d="M378 216.5C392.083 216.5 403.5 227.917 403.5 242C403.5 256.083 392.083 267.5 378 267.5C363.917 267.5 352.5 256.083 352.5 242C352.5 227.917 363.917 216.5 378 216.5Z"
        fill="${this.getFrameStrengthColor(strength)}" stroke="${Colors.overlayBorderOutlineColor}"/>

      <path d="M380 222.298C380 221.111 381.022 220.172 382.188 220.396C392.335 222.352 400 231.278 400 241.996C400 244.509 399.577 246.922 398.801 249.171C398.413 250.294 397.088 250.71 396.059 250.115C395.167 249.6 394.817 248.5 395.134 247.52C395.695 245.78 396 243.924 396 241.996C396 233.353 389.909 226.134 381.785 224.395C380.778 224.18 380 223.327 380 222.298Z"
        stroke="${strokeColor}"/>

      <path d="M380 222.298C380 221.111 381.022 220.172 382.188 220.396C392.335 222.352 400 231.278 400 241.996C400 244.509 399.577 246.922 398.801 249.171C398.413 250.294 397.088 250.71 396.059 250.115C395.167 249.6 394.817 248.5 395.134 247.52C395.695 245.78 396 243.924 396 241.996C396 233.353 389.909 226.134 381.785 224.395C380.778 224.18 380 223.327 380 222.298Z"
        fill="${fillColor}"/>

      <path d="M394.051 253.577C395.081 254.171 395.382 255.529 394.602 256.426C390.569 261.063 384.628 263.996 378 263.996C371.371 263.996 365.429 261.063 361.397 256.425C360.617 255.528 360.918 254.172 361.947 253.577C362.837 253.063 363.963 253.309 364.652 254.071C367.946 257.71 372.706 259.996 378 259.996C383.294 259.996 388.052 257.709 391.345 254.071C392.035 253.309 393.16 253.063 394.051 253.577Z"
        stroke="${strength > 1 ? strokeColor : Colors.instrumentFrameTertiary}"/>

      <path d="M394.051 253.577C395.081 254.171 395.382 255.529 394.602 256.426C390.569 261.063 384.628 263.996 378 263.996C371.371 263.996 365.429 261.063 361.397 256.425C360.617 255.528 360.918 254.172 361.947 253.577C362.837 253.063 363.963 253.309 364.652 254.071C367.946 257.71 372.706 259.996 378 259.996C383.294 259.996 388.052 257.709 391.345 254.071C392.035 253.309 393.16 253.063 394.051 253.577Z"
        fill="${strength > 1 ? fillColor : Colors.instrumentFrameTertiary}"/>

      <path d="M376 222.298C376 223.327 375.222 224.18 374.215 224.395C366.091 226.134 360 233.353 360 241.996C360 243.923 360.304 245.78 360.865 247.52C361.181 248.5 360.831 249.6 359.939 250.115C358.91 250.709 357.585 250.293 357.197 249.17C356.422 246.922 356 244.508 356 241.996C356 231.278 363.665 222.352 373.812 220.396C374.978 220.172 376 221.111 376 222.298Z"
        stroke="${strength > 2 ? strokeColor : Colors.instrumentFrameTertiary}"/>

      <path d="M376 222.298C376 223.327 375.222 224.18 374.215 224.395C366.091 226.134 360 233.353 360 241.996C360 243.923 360.304 245.78 360.865 247.52C361.181 248.5 360.831 249.6 359.939 250.115C358.91 250.709 357.585 250.293 357.197 249.17C356.422 246.922 356 244.508 356 241.996C356 231.278 363.665 222.352 373.812 220.396C374.978 220.172 376 221.111 376 222.298Z"
        fill="${strength > 2 ? fillColor : Colors.instrumentFrameTertiary}"/>
    `;
  }

  private getFrameStrengthColor(strength: Strength) {
    if (strength == Strength.Strong) {
      return Colors.dataScalesMonochrome060;
    }
    else if (strength == Strength.Medium) {
      return Colors.dataScalesMonochrome020;
    }
    else if (strength == Strength.Weak || strength == Strength.None) {
      return Colors.overlayContainerBackground;
    }
    else {
      return Colors.overlayContainerBackground;
    }
  }

  private getSectorStrengthFillColor(strength: Strength) {
    if (strength == Strength.Strong) {
      return Colors.instrumentEnhancedSecondary;
    }
    else if (strength == Strength.Medium) {
      return Colors.instrumentEnhancedSecondaryDif;
    }
    else if (strength == Strength.Weak) {
      return Colors.instrumentEnhancedTertiary;
    }
    else { // strength == Strength.None
      return Colors.instrumentFrameTertiary;
    }
  }

  private getSectorStrengthStrokeColor(strength: Strength) {
    if (strength == Strength.Strong) {
      return Colors.instrumentEnhancedPrimary;
    }
    else if (strength == Strength.Medium) {
      return Colors.instrumentEnhancedSecondary;
    }
    else if (strength == Strength.Weak) {
      return Colors.instrumentEnhancedSecondaryDif; // TODO change
    }
    else { // strength == Strength.None
      return Colors.borderSilhouetteColor;
    }
  }

  private getSignalStrengthLegend() {
    return html`
      <div class="signal-strength-legend">
        <div class="signal-strength-title">
          Signal strength
        </div>

        <svg
          width="60"
          height="174"
          viewBox="0 20 80 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          ${this.renderSignalIcon({
            x: -205,
            y: -125,
            scale: 0.6,
            strength: 3
          })}

          ${this.renderSignalIcon({
            x: -205,
            y: -85,
            scale: 0.6,
            strength: 2
          })}

          ${this.renderSignalIcon({
            x: -205,
            y: -45,
            scale: 0.6,
            strength: 1
          })}

          ${this.renderSignalIcon({
            x: -205,
            y: -5,
            scale: 0.6,
            strength: 0
          })}
        </svg>

        <div class="signal-labels" style="transform: translate(${35}px, ${-113}px);">
          <span class="signal-strength-label">
            ${'Strong'}
          </span>
          <span class="signal-strength-label">
            ${'Medium'}
          </span>
          <span class="signal-strength-label">
            ${'Weak'}
          </span>
          <span class="signal-strength-label">
            ${'None'}
          </span>
        </div>
      </div>
    `;
  }

  /*
  private generateRandomSatellites(count = 30): SatelliteData[] {
    const types = [
      SatelliteType.GPS,
      SatelliteType.GLONASS,
      SatelliteType.Galileio,
      SatelliteType.BeiDou
    ];

    return Array.from({ length: count }, (_, i) => {
      const type = types[Math.floor(Math.random() * types.length)];

      return {
        id: i + 1,
        type,
        strength: this.mapStrength(Math.round(Math.random() * 100)), // 0–100

        azimuth: Math.floor(Math.random() * 360),   // 0–360°
        elevation: Math.floor(Math.random() * 91),  // 0–90°

        spoofing: Math.random() < 0.1,              // 10%
        jamming: Math.random() < 0.1,               // 10%
        spoJamConfirmed: false
      };
    });
  }
  */

}

declare global {
  interface HTMLElementTagNameMap {
    'ob-gnss-skyplot-legend': GnssSkyplotLegend;
  }
}