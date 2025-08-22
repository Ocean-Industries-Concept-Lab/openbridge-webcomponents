import {css, LitElement, html, svg, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {
  AdviceState,
  AdviceType,
  AngleAdviceRaw,
} from '../../navigation-instruments/watch/advice.js';
import {WatchCircleType} from '../../navigation-instruments/watch/watch.js';
import {Tickmark} from '../../navigation-instruments/watch/tickmark.js';
import {TickmarkType} from '../../navigation-instruments/watch/tickmark.js';

export enum ObcGaugeRadialType {
  filled = 'filled',
  bar = 'bar',
  needle = 'needle',
}

export interface GaugeRadialAdvice {
  minValue: number;
  maxValue: number;
  type: AdviceType;
  hinted: boolean;
}
@customElement('obc-instrument-radial')
export class ObcInstrumentRadial extends LitElement {
  @property({type: Number}) value = 0;
  @property({type: Number}) setpoint: number | undefined;
  @property({type: Boolean}) atSetpoint: boolean = false;
  @property({type: Boolean}) touching: boolean = false;
  @property({type: Boolean}) disableAutoAtSetpoint: boolean = false;
  @property({type: Number}) autoAtSetpointDeadband: number = 2;
  @property({type: Number}) maxValue = 100;
  @property({type: Number}) minValue = 0;
  @property({attribute: false}) getAngle!: (v: number) => number;
  @property({type: String}) needleColor!: string;
  @property({type: String}) barColor!: string;
  @property({type: Boolean}) labels: boolean = false;
  @property({type: Number}) primaryTickmarkInterval = 50;
  @property({type: Number}) secondaryTickmarkInterval = 10;
  @property({type: String}) type: ObcGaugeRadialType =
    ObcGaugeRadialType.filled;
  @property({type: String}) needleType: ObcGaugeRadialType =
    ObcGaugeRadialType.filled;
  @property({type: Array, attribute: false}) advices: GaugeRadialAdvice[] = [];
  @property({type: Number}) clipTop: number = 0; // in percent of height
  @property({type: Number}) clipBottom: number = 0; // in percent of height

  atSetpointCalc(): boolean {
    if (this.setpoint === undefined) {
      return false;
    }

    if (this.touching) {
      return false;
    }

    if (!this.disableAutoAtSetpoint) {
      return Math.abs(this.value - this.setpoint) < this.autoAtSetpointDeadband;
    }
    return this.atSetpoint;
  }

  get minAngle(): number {
    return this.getAngle(this.minValue);
  }

  get maxAngle(): number {
    return this.getAngle(this.maxValue);
  }

  override render() {
    const barColor = this.barColor;
    const setpointAngle =
      this.setpoint !== undefined ? this.getAngle(this.setpoint) : undefined;

    const barAreas =
      this.type === ObcGaugeRadialType.needle
        ? []
        : [
            {
              startAngle: this.getAngle(0),
              endAngle: this.getAngle(this.value),
              fillColor: barColor,
            },
          ];

    const width = 448;
    const height = width * (1 - this.clipTop / 100 - this.clipBottom / 100);
    const top = -width / 2 + (width * this.clipTop) / 100;
    const viewBox = `-${width / 2} ${top} ${width} ${height}`;

    return html`
      <div class="container">
        <obc-watch
          .angleSetpoint=${setpointAngle}
          .atAngleSetpoint=${this.atSetpointCalc()}
          .padding=${48}
          .tickmarks=${this.tickmarks}
          .advices=${this._advices}
          .areas=${[
            {
              startAngle: this.minAngle,
              endAngle: this.maxAngle,
              roundInsideCut: true,
              roundOutsideCut: true,
            },
          ]}
          .watchCircleType=${this.type === ObcGaugeRadialType.needle
            ? WatchCircleType.single
            : WatchCircleType.double}
          .barAreas=${barAreas}
          .clipTop=${this.clipTop}
          .clipBottom=${this.clipBottom}
        ></obc-watch>
        <svg class="gauge-radial" viewBox=${viewBox}>${this._needle}</svg>
      </div>
    `;
  }

  private get _needle() {
    if (this.type === ObcGaugeRadialType.filled) {
      return nothing;
    }
    const needleColor = this.needleColor;
    if (this.type === ObcGaugeRadialType.needle) {
      return svg`<g transform="rotate(${this.getAngle(this.value)}) translate(-256, -256)">
      <circle cx="256" cy="256" r="14" fill=${needleColor}/>
      <rect x="250" y="96" width="12" height="192" rx="6" fill=${needleColor}/>
      <rect x="252" y="98" width="8" height="188" rx="4" stroke=${needleColor} fill=${needleColor} stroke-width="4"/>
      </svg> 
`;
    } else {
      return svg`<g transform="rotate(${this.getAngle(this.value)}) translate(-256, -256)">
<rect x="252" y="96" width="8" height="48" rx="4" fill=${needleColor} stroke="var(--border-silhouette-color)"/>
</svg>
      `;
    }
  }

  get tickmarks(): Tickmark[] {
    const tickmarks: Tickmark[] = [];
    for (
      let i = this.primaryTickmarkInterval;
      i < this.maxValue;
      i += this.primaryTickmarkInterval
    ) {
      tickmarks.push({
        angle: this.getAngle(i),
        type: TickmarkType.primary,
        text: this.labels ? i.toString() : undefined,
      });
    }

    if (this.labels && this.maxValue % this.primaryTickmarkInterval === 0) {
      tickmarks.push({
        angle: this.getAngle(this.maxValue),
        type: TickmarkType.textOnly,
        text: this.labels ? this.maxValue.toString() : undefined,
      });
    }

    for (
      let i = -this.primaryTickmarkInterval;
      i > this.minValue;
      i -= this.primaryTickmarkInterval
    ) {
      tickmarks.push({
        angle: this.getAngle(i),
        type: TickmarkType.primary,
        text: this.labels ? i.toString() : undefined,
      });
    }

    if (this.labels && this.minValue % this.primaryTickmarkInterval === 0) {
      tickmarks.push({
        angle: this.getAngle(this.minValue),
        type: TickmarkType.textOnly,
        text: this.labels ? this.minValue.toString() : undefined,
      });
    }

    const existingTickmarks = tickmarks.map((t) => t.angle);

    for (
      let i = this.secondaryTickmarkInterval;
      i < this.maxValue;
      i += this.secondaryTickmarkInterval
    ) {
      if (existingTickmarks.includes(this.getAngle(i))) {
        continue;
      }
      tickmarks.push({
        angle: this.getAngle(i),
        type: TickmarkType.secondary,
      });
    }

    for (
      let i = -this.secondaryTickmarkInterval;
      i > this.minValue;
      i -= this.secondaryTickmarkInterval
    ) {
      if (existingTickmarks.includes(this.getAngle(i))) {
        continue;
      }
      tickmarks.push({
        angle: this.getAngle(i),
        type: TickmarkType.secondary,
      });
    }

    // Add the zero tickmark

    const zeroTickmark = tickmarks.find((t) => t.angle === this.getAngle(0));
    if (zeroTickmark) {
      zeroTickmark.type =
        this.minValue < 0 ? TickmarkType.main : TickmarkType.textOnly;
    } else {
      tickmarks.push({
        angle: this.getAngle(0),
        type: this.minValue < 0 ? TickmarkType.main : TickmarkType.textOnly,
        text: this.labels ? '0' : undefined,
      });
    }

    return tickmarks;
  }

  private get _advices(): AngleAdviceRaw[] {
    return this.advices.map((advice) => {
      const minAngle = this.getAngle(advice.minValue);
      const maxAngle = this.getAngle(advice.maxValue);
      let state = advice.hinted ? AdviceState.hinted : AdviceState.regular;
      if (this.value >= advice.minValue && this.value <= advice.maxValue) {
        state = AdviceState.triggered;
      }

      return {
        minAngle,
        maxAngle,
        type: advice.type,
        state,
        hideMinTickmark: advice.minValue === this.minValue,
        hideMaxTickmark: advice.maxValue === this.maxValue,
      };
    });
  }

  static override styles = css`
    * {
      box-sizing: border-box;
    }

    .container {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .container > * {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    obc-watch {
      anchor-name: --watch;
    }

    .speed-gauge-value {
      position: absolute;
      top: clamp(
        70%,
        calc(80% - (anchor-size(--watch height) - 200px) * 0.2),
        80%
      );
      left: 50%;
      transform: translateX(-50%);
      width: fit-content;
      height: fit-content;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-instrument-radial': ObcInstrumentRadial;
  }
}
