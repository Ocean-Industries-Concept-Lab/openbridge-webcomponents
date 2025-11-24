import {LitElement, unsafeCSS, nothing, TemplateResult} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './chart-object-vessel-button.css?inline';
import {property} from 'lit/decorators.js';

import {classMap} from 'lit/directives/class-map.js';
import {html, literal, svg} from 'lit/static-html.js';
import {
  VesselImage,
  vesselImages,
} from '../../navigation-instruments/watch/vessel.js';

export enum SpeedIndicator {
  Stopped = 'stopped',
  One = 'one',
  Two = 'two',
  Three = 'three',
  Anchored = 'anchored',
}

export enum State {
  Enabled = 'enabled',
  Active = 'active',
  Disabled = 'disabled',
  Caution = 'caution',
  Warning = 'warning',
  Alarm = 'alarm',
}

export enum Type {
  Flat = 'flat',
  Button = 'button',
  FlatLarge = 'flat-large',
  Large = 'large',
  FlatSpeedRot = 'flat-speed-rot',
  ButtonSpeedRot = 'button-speed-rot',
}

@customElement('obc-chart-object-vessel-button')
export class ObcChartObjectVesselButton extends LitElement {
  @property({type: Number}) heading = 0;
  @property({type: Number}) course = 0;
  @property({type: String}) speedIndicator: SpeedIndicator = SpeedIndicator.Two;
  @property({type: Number}) turnRate = 0; // -100 (PORT) to 100 (STBD)
  @property({type: Number}) number: number | undefined = undefined;
  @property({type: String}) name: string | undefined = undefined;
  @property({type: String}) state: State = State.Enabled;
  @property({type: String}) type: Type = Type.Flat;
  @property({type: Boolean}) selected = false;
  @property({type: Number}) courseArrowPx: number | undefined = undefined;
  @property({type: Boolean}) crossLine: boolean = false;
  @property({type: Number}) crossLineLength: number = 48;
  @property({type: String}) vesselImage: VesselImage | null = null;

  override render() {
    const isButton = [Type.Button, Type.Large, Type.ButtonSpeedRot].includes(
      this.type
    );
    const tag = isButton ? literal`button` : literal`div`;
    const hasAlert = [State.Alarm, State.Warning, State.Caution].includes(
      this.state
    );
    return html`
      <${tag}
        class=${classMap({
          wrapper: true,
          [`state-${this.state}`]: true,
          [`type-${this.type}`]: true,
          'has-alert': hasAlert,
          selected: this.selected,
        })}
        style="--heading: ${this.heading}deg;"
      >
      ${this.getCrossLineIcon()}
      ${this.getCourseArrowIcon()}
      ${this.getVesselImageIcon()}
        <div class="visible-wrapper" style="transform: rotate(${this.heading}deg);">
          ${this.getTurnRateIcon()}
        <div
            class="icon-wrapper" 
          >
            <span class="icon-silhouette">
              <slot name="silhouette"></slot>
            </span>
            <span class="icon-primary">
              <slot></slot>
            </span>

          </div>
          ${this.getSpeedIndicatorIcon()}
          ${hasAlert ? html`<div class="alert-ring"></div>` : nothing}
        </div>
        ${this.selected ? html`<div class="selection-frame"></div>` : nothing}
        ${
          this.number
            ? html`<div class="number-wrapper">
                <slot name="number">${this.number}</slot></div>
              </div>`
            : nothing
        }
        ${
          this.name
            ? html`<div class="name-wrapper">
                <slot name="name">${this.name}</slot>
              </div>`
            : nothing
        }
        
      </${tag}>
    `;
  }

  private getSpeedIndicatorIcon() {
    const hasSpeedIndicator = [Type.ButtonSpeedRot, Type.FlatSpeedRot].includes(
      this.type
    );
    if (!hasSpeedIndicator) {
      return nothing;
    }
    let x: number[] = [];
    switch (this.speedIndicator) {
      case SpeedIndicator.One:
        x = [0];
        break;
      case SpeedIndicator.Two:
        x = [-2, 2];
        break;
      case SpeedIndicator.Three:
        x = [-4, 0, 4];
        break;
    }
    let extra: TemplateResult | undefined = undefined;
    if (this.speedIndicator === SpeedIndicator.Stopped) {
      extra = svg`
        <circle cx="0" cy="0" r="4" fill="none" stroke="currentColor" stroke-width="1.5" />
      `;
    } else if (this.speedIndicator === SpeedIndicator.Anchored) {
      return svg`
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.75 3.25H10.75V4.75H8.75V8.38379C8.81975 8.36184 8.88925 8.33765 8.95703 8.30957C9.26022 8.18394 9.53551 7.99964 9.76758 7.76758C9.99964 7.53551 10.1839 7.26022 10.3096 6.95703C10.4352 6.65372 10.5 6.3283 10.5 6H12C12 6.52517 11.8962 7.04506 11.6953 7.53027C11.4943 8.01558 11.1996 8.45669 10.8281 8.82812C10.4567 9.19956 10.0156 9.49429 9.53027 9.69531C9.04506 9.89624 8.52517 10 8 10C7.47483 10 6.95494 9.89624 6.46973 9.69531C5.98442 9.49429 5.54331 9.19956 5.17188 8.82812C4.80044 8.45669 4.50571 8.01558 4.30469 7.53027C4.10376 7.04506 4 6.52517 4 6H5.5C5.5 6.3283 5.56479 6.65372 5.69043 6.95703C5.81606 7.26022 6.00036 7.53551 6.23242 7.76758C6.46449 7.99964 6.73978 8.18394 7.04297 8.30957C7.11075 8.33765 7.18025 8.36184 7.25 8.38379V4.75H5.25V3.25H7.25V1.25H8.75V3.25Z" fill="currentColor" />
      </svg>
      `;
    }
    return html`
      <svg
        width="16"
        height="12"
        viewBox="-8 -6 16 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${x.map(
          (x: number) => svg`
          <line
            x1="${x}"
            y1="-3"
            x2="${x}"
            y2="3"
            stroke-linecap="round"
            stroke-width="1.5"
            stroke="currentColor"
          />
        `
        )}
        ${extra}
      </svg>
    `;
  }

  private getTurnRateIcon() {
    const hasTurnRate = [Type.ButtonSpeedRot, Type.FlatSpeedRot].includes(
      this.type
    );
    if (!hasTurnRate) {
      return nothing;
    }
    const deg = (this.turnRate / 100) * 12;
    const R = 24;
    const x = -R * Math.cos((deg * Math.PI) / 180) + R + 3;
    const y = R * Math.sin((deg * Math.PI) / 180) + 8;

    return html`
      <svg
        width="16"
        height="12"
        viewBox="0 0 16 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 9 V 3 A ${R} ${R} 0 0 1 ${y} ${x}"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    `;
  }

  private getCourseArrowIcon() {
    if (this.courseArrowPx === undefined) {
      return nothing;
    }
    let delta = 12;
    if ([Type.Button, Type.FlatLarge].includes(this.type)) {
      delta = 16;
    } else if (
      [Type.Large, Type.ButtonSpeedRot, Type.FlatSpeedRot].includes(this.type)
    ) {
      delta = 24;
    }
    const l = this.courseArrowPx + delta;
    const height = l + 24;
    let color = 'var(--element-active-color)';
    if (this.state === State.Alarm) {
      color = 'var(--alert-alarm-color)';
    }
    return html`
      <svg
        width="256"
        height=${height}
        viewBox="-128 0 256 ${height}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="course-arrow"
        style="--course: ${this.course}deg; --color: ${color}"
      >
        <line
          x1="0"
          y1="24"
          x2="0"
          y2=${height}
          stroke-width="4"
          stroke="var(--border-silhouette-color)"
          stroke-linecap="round"
        />
        <line
          x1="0"
          y1="24"
          x2="0"
          y2=${height}
          stroke-width="2"
          stroke="var(--color)"
          stroke-linecap="square"
          stroke-dasharray="4 4"
          stroke-linejoin="square"
        />
        <g transform="translate(-12 0)">
          <path
            d="M11.5457 11.2919L13.3638 12.1253L13.3638 12.1252L11.5457 11.2919ZM12.4548 11.2919L10.6367 12.1252L10.6367 12.1253L12.4548 11.2919ZM16.7136 20.5829L18.5317 19.7496L18.5317 19.7495L16.7136 20.5829ZM15.8044 21.9999L15.8044 23.9999L15.805 23.9999L15.8044 21.9999ZM14.8953 21.4169L13.0772 22.2503L13.0774 22.2507L14.8953 21.4169ZM11.9998 15.1005L13.8178 14.2671L11.9994 10.3004L10.1816 14.2673L11.9998 15.1005ZM9.10522 21.4169L10.9233 22.2504L10.9234 22.2501L9.10522 21.4169ZM8.19604 21.9999L8.19604 23.9999L8.1964 23.9999L8.19604 21.9999ZM7.28687 20.5829L5.46877 19.7495L5.46874 19.7496L7.28687 20.5829ZM11.5457 2.2919L13.3638 3.12527L13.3638 3.12521L11.5457 2.2919ZM12.4548 2.2919L10.6367 3.12521L10.6367 3.12527L12.4548 2.2919ZM16.7136 11.5829L18.5317 10.7496L18.5317 10.7495L16.7136 11.5829ZM15.8044 12.9999L15.8044 14.9999L15.805 14.9999L15.8044 12.9999ZM14.8953 12.4169L13.0772 13.2503L13.0774 13.2507L14.8953 12.4169ZM11.9998 6.10049L13.8178 5.26706L11.9994 1.30035L10.1816 5.2673L11.9998 6.10049ZM9.10522 12.4169L10.9233 13.2504L10.9234 13.2501L9.10522 12.4169ZM8.19604 12.9999L8.19604 14.9999L8.19643 14.9999L8.19604 12.9999ZM7.28687 11.5829L5.46877 10.7495L5.46874 10.7496L7.28687 11.5829ZM11.5457 11.2919L13.3638 12.1252C12.829 13.2919 11.1714 13.2919 10.6367 12.1252L12.4548 11.2919L14.273 10.4586C13.3817 8.5141 10.6187 8.5141 9.72752 10.4586L11.5457 11.2919ZM12.4548 11.2919L10.6367 12.1253L14.8955 21.4163L16.7136 20.5829L18.5317 19.7495L14.2729 10.4585L12.4548 11.2919ZM16.7136 20.5829L14.8955 21.4162C14.5917 20.7534 15.076 20.0001 15.8039 19.9999L15.8044 21.9999L15.805 23.9999C17.9899 23.9993 19.4426 21.737 18.5317 19.7496L16.7136 20.5829ZM15.8044 21.9999V19.9999C16.1945 19.9999 16.5498 20.227 16.7132 20.5831L14.8953 21.4169L13.0774 22.2507C13.5666 23.3174 14.6325 23.9999 15.8044 23.9999V21.9999ZM14.8953 21.4169L16.7133 20.5835L13.8178 14.2671L11.9998 15.1005L10.1817 15.9339L13.0772 22.2503L14.8953 21.4169ZM11.9998 15.1005L10.1816 14.2673L7.28704 20.5837L9.10522 21.4169L10.9234 22.2501L13.8179 15.9337L11.9998 15.1005ZM9.10522 21.4169L7.28718 20.5834C7.45077 20.2266 7.80642 20 8.19569 19.9999L8.19604 21.9999L8.1964 23.9999C9.36748 23.9997 10.4339 23.3179 10.9233 22.2504L9.10522 21.4169ZM8.19604 21.9999L8.19604 19.9999C8.92502 19.9999 9.40845 20.7541 9.10499 21.4162L7.28687 20.5829L5.46874 19.7496C4.55809 21.7365 6.00978 23.9999 8.19604 23.9999V21.9999ZM7.28687 20.5829L9.10496 21.4163L13.3638 12.1253L11.5457 11.2919L9.72755 10.4585L5.46877 19.7495L7.28687 20.5829ZM11.5457 2.2919L13.3638 3.12521C12.829 4.2919 11.1714 4.2919 10.6367 3.12521L12.4548 2.2919L14.273 1.45859C13.3817 -0.485895 10.6187 -0.485895 9.72752 1.45859L11.5457 2.2919ZM12.4548 2.2919L10.6367 3.12527L14.8955 12.4163L16.7136 11.5829L18.5317 10.7495L14.2729 1.45852L12.4548 2.2919ZM16.7136 11.5829L14.8955 12.4162C14.5917 11.7534 15.076 11.0001 15.8039 10.9999L15.8044 12.9999L15.805 14.9999C17.9899 14.9993 19.4427 12.7371 18.5317 10.7496L16.7136 11.5829ZM15.8044 12.9999V10.9999C16.1946 10.9999 16.5498 11.227 16.7131 11.5831L14.8953 12.4169L13.0774 13.2507C13.5666 14.3174 14.6325 14.9999 15.8044 14.9999V12.9999ZM14.8953 12.4169L16.7133 11.5835L13.8178 5.26706L11.9998 6.10049L10.1817 6.93392L13.0772 13.2503L14.8953 12.4169ZM11.9998 6.10049L10.1816 5.2673L7.28704 11.5837L9.10522 12.4169L10.9234 13.2501L13.8179 6.93368L11.9998 6.10049ZM9.10522 12.4169L7.28717 11.5834C7.45078 11.2265 7.80645 11 8.19566 10.9999L8.19604 12.9999L8.19643 14.9999C9.36745 14.9997 10.4339 14.3179 10.9233 13.2504L9.10522 12.4169ZM8.19604 12.9999V10.9999C8.92502 10.9999 9.40845 11.7541 9.10499 12.4162L7.28687 11.5829L5.46874 10.7496C4.55809 12.7365 6.00978 14.9999 8.19604 14.9999V12.9999ZM7.28687 11.5829L9.10496 12.4163L13.3638 3.12527L11.5457 2.2919L9.72755 1.45852L5.46877 10.7495L7.28687 11.5829Z"
            fill="var(--border-silhouette-color)"
          />
          <path
            d="M11.5457 11.2919C11.7239 10.903 12.2766 10.903 12.4548 11.2919L16.7136 20.5829C17.0172 21.2452 16.5329 21.9997 15.8044 21.9999C15.4135 21.9999 15.0582 21.7722 14.8953 21.4169L11.9998 15.1005L9.10522 21.4169C8.94231 21.7722 8.58695 21.9998 8.19604 21.9999C7.4674 21.9999 6.98327 21.2453 7.28687 20.5829L11.5457 11.2919ZM11.5457 2.2919C11.7239 1.903 12.2766 1.903 12.4548 2.2919L16.7136 11.5829C17.0172 12.2452 16.5329 12.9997 15.8044 12.9999C15.4135 12.9999 15.0582 12.7722 14.8953 12.4169L11.9998 6.10049L9.10522 12.4169C8.94232 12.7722 8.58695 12.9998 8.19604 12.9999C7.4674 12.9999 6.98327 12.2453 7.28687 11.5829L11.5457 2.2919Z"
            fill="var(--color)"
          />
        </g>
      </svg>
    `;
  }

  private getCrossLineIcon() {
    if (!this.crossLine) {
      return nothing;
    }
    return html`
      <svg
        width=${this.crossLineLength}
        height="256"
        viewBox="${-this.crossLineLength / 2} -128 ${this.crossLineLength} 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="cross-line"
      >
        <circle cx="0" cy="0" r="2" fill="var(--element-active-color)" />
        <line
          x1=${-this.crossLineLength / 2}
          x2="-4"
          y1="0"
          y2="0"
          stroke="var(--element-active-color)"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <line
          x1=${this.crossLineLength / 2}
          x2="4"
          y1="0"
          y2="0"
          stroke="var(--element-active-color)"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <line
          x1="0"
          x2="0"
          y1="-4"
          y2="-128"
          stroke="var(--element-active-color)"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <line
          x1="0"
          x2="0"
          y1="4"
          y2="128"
          stroke="var(--element-active-color)"
          stroke-width="1"
          stroke-dasharray="1 2"
        />
      </svg>
    `;
  }

  private getVesselImageIcon() {
    if (!this.vesselImage) {
      return html`<div class="vessel-image-wrapper">
        <slot name="vessel-image"></slot>
      </div>`;
    }
    return html`<div class="vessel-image-wrapper">
      ${vesselImages[this.vesselImage]}
    </div>`;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-chart-object-vessel-button': ObcChartObjectVesselButton;
  }
}
