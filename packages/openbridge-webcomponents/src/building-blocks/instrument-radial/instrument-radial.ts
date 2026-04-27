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
import {VisualConfigMixin} from '../../svghelpers/visual-config-mixin.js';
import {TickmarkIntervalMixin} from '../../svghelpers/tickmark-interval-mixin.js';
import {
  OUTER_RING_RADIUS,
  innerRingRadiusFor,
} from '../../navigation-instruments/watch/watch.js';
import {
  computeZoomToFitArcFrame,
  type ZoomToFitArcFrame,
} from '../../svghelpers/arc-frame.js';

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

function rangeIncludesZero(minValue: number, maxValue: number): boolean {
  return minValue <= 0 && maxValue >= 0;
}

function strongerTickmarkType(
  existing: TickmarkType,
  candidate: TickmarkType
): TickmarkType {
  const priority: Record<TickmarkType, number> = {
    [TickmarkType.zeroLineThick]: 6,
    [TickmarkType.zeroLine]: 5,
    [TickmarkType.main]: 4,
    [TickmarkType.primary]: 3,
    [TickmarkType.secondary]: 2,
    [TickmarkType.tertiary]: 1,
    [TickmarkType.textOnly]: 0,
  };

  return priority[candidate] > priority[existing] ? candidate : existing;
}

@customElement('obc-instrument-radial')
export class ObcInstrumentRadial extends TickmarkIntervalMixin(
  VisualConfigMixin(SetpointMixin(LitElement)),
  {defaultPrimary: 50, defaultSecondary: 10}
) {
  // setpoint, newSetpoint, atSetpoint, touching, autoAtSetpoint,
  // autoAtSetpointDeadband, setpointAtZeroDeadband, setpointOverride
  // — all inherited from SetpointMixin
  // state, priority, tickmarkStyle, showLabels, tickmarksInside
  // — all inherited from VisualConfigMixin
  // primaryTickmarkInterval, secondaryTickmarkInterval, tertiaryTickmarkInterval
  // — all inherited from TickmarkIntervalMixin

  @property({type: Number}) value = 0;
  @property({type: Number}) maxValue = 100;
  @property({type: Number}) minValue = 0;
  @property({attribute: false}) getAngle!: (v: number) => number;
  @property({type: String}) needleColor: string | undefined;
  @property({type: String}) barColor: string | undefined;
  @property({type: String}) type: ObcGaugeRadialType =
    ObcGaugeRadialType.filled;
  @property({type: String}) needleType: ObcGaugeRadialType =
    ObcGaugeRadialType.filled;
  @property({type: Array, attribute: false}) advices: GaugeRadialAdvice[] = [];
  @property({type: Number}) clipTop: number = 0; // in percent of height
  @property({type: Number}) clipBottom: number = 0; // in percent of height
  @property({type: Boolean}) zoomToFitArc: boolean = false;

  private _radiusOffset = 0;
  private _arcFrame: ZoomToFitArcFrame | undefined;

  private get clampedValue(): number {
    const lowerBound = Math.min(this.minValue, this.maxValue);
    const upperBound = Math.max(this.minValue, this.maxValue);
    return Math.max(lowerBound, Math.min(this.value, upperBound));
  }

  private get minAngle(): number {
    return this.getAngle(this.minValue);
  }

  private get maxAngle(): number {
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
    const barStartValue = Math.max(this.minValue, Math.min(0, this.maxValue));
    const value = this.clampedValue;
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
              startAngle: this.getAngle(barStartValue),
              endAngle: this.getAngle(value),
              fillColor: barColor,
            },
          ];

    const areas = [
      {
        startAngle: this.minAngle,
        endAngle: this.maxAngle,
        roundInsideCut: true,
        roundOutsideCut: true,
      },
    ];

    const watchCircleType =
      this.type === ObcGaugeRadialType.needle
        ? WatchCircleType.single
        : WatchCircleType.double;

    let viewBox: string;
    if (this.zoomToFitArc) {
      const ext = 48;
      const targetSize = (176 + ext) * 2;
      const frame = computeZoomToFitArcFrame({
        areas,
        outerRadius: OUTER_RING_RADIUS,
        innerRadius: innerRingRadiusFor(watchCircleType),
        extension: ext,
        targetSize,
      });
      viewBox = frame.viewBox;
      this._radiusOffset = frame.radiusOffset;
      this._arcFrame = frame;
    } else {
      this._radiusOffset = 0;
      this._arcFrame = undefined;
      const width = 448;
      const height = width * (1 - this.clipTop / 100 - this.clipBottom / 100);
      const top = -width / 2 + (width * this.clipTop) / 100;
      viewBox = `${-width / 2} ${top} ${width} ${height}`;
    }

    return html`
      <div class="container">
        <obc-watch
          .state=${this.state}
          .priority=${this.priority}
          .angleSetpoint=${setpointAngle}
          .newAngleSetpoint=${newSetpointAngle}
          .atAngleSetpoint=${this.computeAtSetpoint(value)}
          .angleSetpointAtZeroDeadband=${this.setpointAtZeroDeadband}
          .setpointOverride=${this.setpointOverride}
          .animateSetpoint=${this.animateSetpoint}
          .padding=${48}
          .tickmarks=${this.tickmarks}
          .tickmarksInside=${this.tickmarksInside}
          .tickmarkStyle=${this.tickmarkStyle}
          .advices=${this._advices}
          .areas=${areas}
          .watchCircleType=${watchCircleType}
          .barAreas=${barAreas}
          .clipTop=${this.zoomToFitArc ? 0 : this.clipTop}
          .clipBottom=${this.zoomToFitArc ? 0 : this.clipBottom}
          .zoomToFitArc=${this.zoomToFitArc}
          .arcFrame=${this._arcFrame}
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
    const rOff = this._radiusOffset;
    const value = this.clampedValue;
    if (this.type === ObcGaugeRadialType.needle) {
      return svg`<g transform="rotate(${this.getAngle(value)}) translate(-256, -256)">
      <circle cx="256" cy="256" r="14" fill=${needleColor}/>
      <rect x="250" y="${96 - rOff}" width="12" height="${192 + rOff}" rx="6" fill=${needleColor}/>
      <rect x="252" y="${98 - rOff}" width="8" height="${188 + rOff}" rx="4" stroke=${needleColor} fill=${needleColor} stroke-width="4"/>
      </g>
`;
    } else {
      return svg`<g transform="rotate(${this.getAngle(value)}) translate(-256, -256)">
<rect x="252" y="${96 - rOff}" width="8" height="48" rx="4" fill=${needleColor} stroke="var(--border-silhouette-color)"/>
</g>
      `;
    }
  }

  get tickmarks(): Tickmark[] {
    const tickmarksByValue = new Map<number, Tickmark>();
    const normalizeValue = (value: number) =>
      Math.abs(value) < 1e-9 ? 0 : Number(value.toFixed(6));

    const upsertTickmark = (
      value: number,
      type: TickmarkType,
      text?: string
    ) => {
      if (
        !Number.isFinite(value) ||
        value < this.minValue ||
        value > this.maxValue
      ) {
        return;
      }

      const normalizedValue = normalizeValue(value);
      const existing = tickmarksByValue.get(normalizedValue);
      if (existing) {
        existing.type = strongerTickmarkType(existing.type, type);
        if (text !== undefined) {
          existing.text = text;
        }
        return;
      }

      tickmarksByValue.set(normalizedValue, {
        angle: this.getAngle(normalizedValue),
        type,
        text,
      });
    };

    const addTickmarksAtInterval = (
      interval: number | undefined,
      type: TickmarkType,
      withLabels = false
    ) => {
      if (
        interval === undefined ||
        interval <= 0 ||
        !Number.isFinite(interval)
      ) {
        return;
      }

      const epsilon = Math.abs(interval) * 1e-6;
      const startValue =
        Math.ceil((this.minValue - epsilon) / interval) * interval;

      for (
        let value = startValue;
        value < this.maxValue - epsilon;
        value += interval
      ) {
        const normalizedValue = normalizeValue(value);
        if (
          normalizedValue <= this.minValue + epsilon ||
          normalizedValue >= this.maxValue - epsilon
        ) {
          continue;
        }

        upsertTickmark(
          normalizedValue,
          type,
          withLabels && this.showLabels ? normalizedValue.toString() : undefined
        );
      }
    };

    addTickmarksAtInterval(
      this.primaryTickmarkInterval,
      TickmarkType.primary,
      true
    );
    addTickmarksAtInterval(
      this.secondaryTickmarkInterval,
      TickmarkType.secondary
    );
    addTickmarksAtInterval(
      this.tertiaryTickmarkInterval,
      TickmarkType.tertiary
    );

    if (rangeIncludesZero(this.minValue, this.maxValue)) {
      upsertTickmark(
        0,
        this.minValue < 0 ? TickmarkType.main : TickmarkType.textOnly,
        this.showLabels ? '0' : undefined
      );
    }

    if (this.showLabels) {
      upsertTickmark(
        this.minValue,
        TickmarkType.textOnly,
        this.minValue.toString()
      );
      upsertTickmark(
        this.maxValue,
        TickmarkType.textOnly,
        this.maxValue.toString()
      );
    }

    return [...tickmarksByValue.values()].sort((a, b) => a.angle - b.angle);
  }

  private get _advices(): AngleAdviceRaw[] {
    const value = this.clampedValue;

    return this.advices.map((advice) => {
      const minAngle = this.getAngle(advice.minValue);
      const maxAngle = this.getAngle(advice.maxValue);
      let state = advice.hinted ? AdviceState.hinted : AdviceState.regular;
      if (value >= advice.minValue && value <= advice.maxValue) {
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
