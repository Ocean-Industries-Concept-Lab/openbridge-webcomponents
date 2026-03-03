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
import {InstrumentState, Priority} from '../../navigation-instruments/types.js';
import {SetpointMixin} from '../../svghelpers/setpoint-mixin.js';

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
export class ObcInstrumentRadial extends SetpointMixin(LitElement) {
  // setpoint, newSetpoint, atSetpoint, touching, disableAutoAtSetpoint,
  // autoAtSetpointDeadband, setpointAtZeroDeadband, setpointOverride
  // — all inherited from SetpointMixin

  @property({type: String}) state: InstrumentState = InstrumentState.active;
  @property({type: String}) priority: Priority = Priority.regular;

  @property({type: Number}) value = 0;
  @property({type: Number}) maxValue = 100;
  @property({type: Number}) minValue = 0;
  @property({attribute: false}) getAngle!: (v: number) => number;
  @property({type: String}) needleColor: string | undefined;
  @property({type: String}) barColor: string | undefined;
  @property({type: Boolean}) showLabels: boolean = false;
  @property({type: Number}) primaryTickmarkInterval = 50;
  @property({type: Number}) secondaryTickmarkInterval = 10;
  @property({type: String}) type: ObcGaugeRadialType =
    ObcGaugeRadialType.filled;
  @property({type: String}) needleType: ObcGaugeRadialType =
    ObcGaugeRadialType.filled;
  @property({type: Boolean}) tickmarksInside: boolean = false;
  @property({type: Array, attribute: false}) advices: GaugeRadialAdvice[] = [];
  @property({type: Number}) clipTop: number = 0; // in percent of height
  @property({type: Number}) clipBottom: number = 0; // in percent of height

  get minAngle(): number {
    return this.getAngle(this.minValue);
  }

  get maxAngle(): number {
    return this.getAngle(this.maxValue);
  }

  private get _derivedNeedleColor(): string {
    if (
      this.state === InstrumentState.loading ||
      this.state === InstrumentState.off
    ) {
      return 'transparent';
    }
    return this.priority === Priority.enhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';
  }

  private get _derivedBarColor(): string {
    if (
      this.state === InstrumentState.loading ||
      this.state === InstrumentState.off
    ) {
      return 'transparent';
    }
    if (this.type === ObcGaugeRadialType.filled) {
      return this.priority === Priority.enhanced
        ? 'var(--instrument-enhanced-secondary-color)'
        : 'var(--instrument-regular-secondary-color)';
    }
    return this.priority === Priority.enhanced
      ? 'var(--instrument-enhanced-tertiary-color)'
      : 'var(--instrument-regular-tertiary-color)';
  }

  override render() {
    const barColor = this.barColor ?? this._derivedBarColor;
    const setpointAngle =
      this.setpoint !== undefined ? this.getAngle(this.setpoint) : undefined;
    const newSetpointAngle =
      this.newSetpoint !== undefined
        ? this.getAngle(this.newSetpoint)
        : undefined;

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
          .state=${this.state}
          .priority=${this.priority}
          .angleSetpoint=${setpointAngle}
          .newAngleSetpoint=${newSetpointAngle}
          .atAngleSetpoint=${this.computeAtSetpoint(this.value)}
          .angleSetpointAtZeroDeadband=${this.setpointAtZeroDeadband}
          .setpointOverride=${this.setpointOverride}
          .animateSetpoint=${this.animateSetpoint}
          .padding=${48}
          .tickmarks=${this.tickmarks}
          .tickmarksInside=${this.tickmarksInside}
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
    const needleColor = this.needleColor ?? this._derivedNeedleColor;
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
        text: this.showLabels ? i.toString() : undefined,
      });
    }

    if (this.showLabels && this.maxValue % this.primaryTickmarkInterval === 0) {
      tickmarks.push({
        angle: this.getAngle(this.maxValue),
        type: TickmarkType.textOnly,
        text: this.showLabels ? this.maxValue.toString() : undefined,
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
        text: this.showLabels ? i.toString() : undefined,
      });
    }

    if (this.showLabels && this.minValue % this.primaryTickmarkInterval === 0) {
      tickmarks.push({
        angle: this.getAngle(this.minValue),
        type: TickmarkType.textOnly,
        text: this.showLabels ? this.minValue.toString() : undefined,
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
        text: this.showLabels ? '0' : undefined,
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
