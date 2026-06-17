import {nothing, svg, type SVGTemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {
  VesselImage,
  VesselImageSize,
  vesselImages,
  type WatchVessel,
} from '../watch/watch.js';
import {customElement} from '../../decorator.js';
import {
  SingleAxisInclinometer,
  INCLINOMETER_WATCH_RADIUS,
} from '../../building-blocks/single-axis-inclinometer/single-axis-inclinometer.js';

const watchRadius = INCLINOMETER_WATCH_RADIUS;

export enum ObcPitchType {
  /** Single arc scale on the right (default). */
  singleScale = 'single-scale',
  /** Right scale duplicated to the opposite (left) arc as well. */
  dualScale = 'dual-scale',
}

/**
 * `<obc-pitch>` — Pitch (trim) indicator with a side arc scale.
 *
 * Shows `pitch` against a watch arc centred on the right, with an average-pitch
 * band and a rotating indicator. Supports an optional opposite-side scale
 * (`dual-scale`), a centre readout (`hasReadout`), and a `regular`/`enhanced`
 * palette.
 *
 * @element obc-pitch
 */
@customElement('obc-pitch')
export class ObcPitch extends SingleAxisInclinometer {
  @property({type: Number}) pitch = 0;
  @property({type: Number}) minAvgPitch = 0;
  @property({type: Number}) maxAvgPitch = 0;
  @property({type: String}) vesselImageSide: VesselImage = VesselImage.psvSide;
  @property({type: Number}) maxPitchAdvice: number | undefined = undefined;
  @property({type: Boolean}) triggerPitchAdvice = false;
  /** Readout label. Default `Pitch`. */
  @property({type: String}) override label = 'Pitch';
  /** Readout unit. Default `DEG`. */
  @property({type: String}) override unit = 'DEG';
  /** Number of fraction digits shown in the readout. Default `0`. */
  @property({type: Number}) override fractionDigits = 0;
  /**
   * `single-scale` shows one arc on the right (default); `dual-scale` also
   * shows the scale on the opposite (left) arc (the indicator's opposite end).
   */
  @property({type: String}) type: ObcPitchType = ObcPitchType.singleScale;

  protected override get centerAngle(): number {
    return 90;
  }
  protected override get value(): number {
    return this.pitch;
  }
  protected override get avgMin(): number {
    return this.minAvgPitch;
  }
  protected override get avgMax(): number {
    return this.maxAvgPitch;
  }
  protected override get maxAdvice(): number | undefined {
    return this.maxPitchAdvice;
  }
  protected override get triggerAdvice(): boolean {
    return this.triggerPitchAdvice;
  }
  protected override get defaultAdviceOuter(): number {
    return 30;
  }
  protected override get isDualScale(): boolean {
    return this.type === ObcPitchType.dualScale;
  }
  protected override get scaleVessels(): WatchVessel[] {
    return [
      {
        size: VesselImageSize.large,
        vesselImage: this.vesselImageSide,
        transform: `rotate(${this.pitch}deg)`,
      },
    ];
  }

  protected override renderIndicator(
    needleTransform: string
  ): SVGTemplateResult {
    return svg`
      <line
        x1="0"
        y1="0"
        x2="${watchRadius - 10}"
        y2="0"
        stroke="${this.indicatorColor}"
        transform="${needleTransform}"
      />
    `;
  }

  protected override renderVesselOverlay(
    vesselScale: number
  ): SVGTemplateResult {
    return svg`
      <g
        style="transform: rotate(${this.pitch}deg) scale(${vesselScale}) translate(-80px, -80px);"
      >
        ${this.zoomToFitArc ? vesselImages[this.vesselImageSide] : nothing}
      </g>
    `;
  }

  protected override renderComplement(arcAngle: number): SVGTemplateResult {
    // Outer thin-ring complement endpoints. The arc band is centred at watch
    // angle 90° (right side) and spans 90° ± arcAngle, so its edges sit at SVG
    // coords (R·cos(arcAngle), ±R·sin(arcAngle)).
    const x = watchRadius * Math.cos((arcAngle * Math.PI) / 180);
    const y = watchRadius * Math.sin((arcAngle * Math.PI) / 180);
    if (this.type === ObcPitchType.dualScale) {
      return svg`
        <path
          d="M ${x} ${-y} A ${watchRadius} ${watchRadius} 0 0 0 ${-x} ${-y}"
          fill="none"
          stroke="var(--instrument-frame-tertiary-color)"
        />
        <path
          d="M ${x} ${y} A ${watchRadius} ${watchRadius} 0 0 1 ${-x} ${y}"
          fill="none"
          stroke="var(--instrument-frame-tertiary-color)"
        />
      `;
    }
    return svg`
      <path
        d="M ${x} ${y} A ${watchRadius} ${watchRadius} 0 1 1 ${x} ${-y}"
        fill="none"
        stroke="var(--instrument-frame-tertiary-color)"
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pitch': ObcPitch;
  }
}
