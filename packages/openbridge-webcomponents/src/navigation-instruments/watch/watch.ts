import {
  LitElement,
  SVGTemplateResult,
  html,
  nothing,
  svg,
  unsafeCSS,
} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {circle} from '../../svghelpers/index.js';
import {roundedArch} from '../../svghelpers/roundedArch.js';
import {InstrumentState} from '../types.js';
import compentStyle from './watch.css?inline';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import {AngleAdviceRaw, renderAdvice} from './advice.js';
import {Tickmark, TickmarkStyle, tickmark} from './tickmark.js';
import {renderLabels} from './label.js';
import {VesselImage, VesselImageSize, vesselImages} from './vessel.js';
import {renderCurrent, renderWind} from './environment.js';
export {VesselImage, VesselImageSize};

export enum WatchCircleType {
  single = 'single',
  double = 'double',
  doubleThin = 'doubleThin',
  triple = 'triple',
}

const OUTER_RING_RADIUS = 368 / 2;
const RING2_RADIUS = 320 / 2;
const RING3_RADIUS = 224 / 2;
const RING3B_RADIUS = 272 / 2;
const RING4_RADIUS = 176 / 2;

@customElement('obc-watch')
export class ObcWatch extends LitElement {
  @property({type: String}) state: InstrumentState = InstrumentState.inCommand;
  @property({type: String}) watchCircleType: WatchCircleType =
    WatchCircleType.single;
  @property({type: Boolean}) northArrow: boolean = false;
  @property({type: Number}) angleSetpoint: number | undefined;
  @property({type: Boolean}) atAngleSetpoint: boolean = false;
  @property({type: Number}) padding = 24;
  @property({type: Number}) cutAngleStart: number | null = null;
  @property({type: Number}) cutAngleEnd: number | null = null;
  @property({type: Boolean}) roundOutsideCut = false;
  @property({type: Boolean}) roundInsideCut = false;

  @property({type: Array, attribute: false}) tickmarks: Tickmark[] = [];
  @property({type: Array, attribute: false}) advices: AngleAdviceRaw[] = [];
  @property({type: Boolean}) crosshairEnabled: boolean = false;
  @property({type: Boolean}) labelFrameEnabled: boolean = false;
  @property({type: String}) vesselImageSize: VesselImageSize =
    VesselImageSize.none;
  @property({type: String}) vesselImage: VesselImage = VesselImage.carFerryAft;
  @property({type: String}) vesselImageTransform: string = '';
  @property({type: Number}) wind: number | null = null;
  @property({type: Number}) windFromDirectionDeg: number | null = null;
  @property({type: Number}) windSymbolRadius: number | null = null;
  @property({type: Number}) current: number | null = null;
  @property({type: Number}) currentFromDirectionDeg: number | null = null;
  @property({type: Number}) currentSymbolRadius: number | null = null;

  // @ts-expect-error TS6133: The controller ensures that the render
  // function is called on resize of the element
  private _resizeController = new ResizeController(this, {});

  private get innerRingRadius(): number {
    if (this.watchCircleType === WatchCircleType.single) {
      return RING2_RADIUS;
    } else if (this.watchCircleType === WatchCircleType.double) {
      return RING3_RADIUS;
    } else if (this.watchCircleType === WatchCircleType.doubleThin) {
      return RING3B_RADIUS;
    } else if (this.watchCircleType === WatchCircleType.triple) {
      return RING4_RADIUS;
    }
    throw new Error(`Invalid watch circle type: ${this.watchCircleType}`);
  }

  private watchCircle(): SVGTemplateResult | SVGTemplateResult[] {
    const rings = [];
    if (this.state !== InstrumentState.off) {
      rings.push(svg`
        <circle
          cx="0"
          cy="0"
          r="172"
          stroke="var(--instrument-frame-primary-color)"
          fill="none"
          stroke-width="24"
        />`);

      if (this.watchCircleType !== WatchCircleType.single) {
        const r1 = RING2_RADIUS;
        const r2 =
          this.watchCircleType === WatchCircleType.doubleThin
            ? RING3B_RADIUS
            : RING3_RADIUS;
        const r = (r1 + r2) / 2;
        const strokeWidth = r1 - r2;
        rings.push(
          svg`<circle cx="0" cy="0" r=${r} stroke="var(--instrument-frame-secondary-color)" stroke-width=${strokeWidth} fill="none" />`
        );
      }
      if (this.watchCircleType === WatchCircleType.triple) {
        const r1 = RING3_RADIUS;
        const r2 = RING4_RADIUS;
        const r = (r1 + r2) / 2;
        const strokeWidth = r1 - r2;
        rings.push(
          svg`<circle cx="0" cy="0" r=${r} stroke="var(--instrument-frame-primary-color)" stroke-width=${strokeWidth} fill="none" />`
        );
      }
    }

    let result = rings;
    if (this.cutAngleStart !== null && this.cutAngleEnd !== null) {
      const svgPath = roundedArch({
        startAngle: this.cutAngleStart,
        endAngle: this.cutAngleEnd,
        R: OUTER_RING_RADIUS,
        r: this.innerRingRadius,
        roundOutsideCut: this.roundOutsideCut,
        roundInsideCut: this.roundInsideCut,
      });
      const mask = svg`<mask id="cutMask">
        <rect x="-200" y="-200" width="400" height="400" fill="black" />
        <path d=${svgPath} fill="white" />
      </mask>`;
      result = [mask, svg`<g mask="url(#cutMask)">${rings}</g>`];
      result.push(
        svg`<path d=${svgPath} fill="none" stroke="var(--instrument-frame-tertiary-color)" vector-effect="non-scaling-stroke"/>`
      );
    } else {
      if (this.state !== InstrumentState.off) {
        result.push(
          circle('outerRing', {
            radius: 368 / 2,
            strokeWidth: 1,
            strokeColor: 'var(--instrument-frame-tertiary-color)',
            strokePosition: 'center',
            fillColor: 'none',
          })
        );

        result.push(svg`
          ${circle('innerRing', {
            radius: this.innerRingRadius,
            strokeWidth: 1,
            strokeColor: 'var(--instrument-frame-tertiary-color)',
            strokePosition: 'center',
            fillColor: 'none',
          })}
        `);
      } else {
        result.push(svg`
          ${circle('innerRing', {
            radius: RING2_RADIUS,
            strokeWidth: 1,
            strokeColor: 'var(--instrument-frame-tertiary-color)',
            strokePosition: 'center',
            fillColor: 'none',
          })}
        `);
      }
    }
    return result;
  }

  private renderCrosshair(radius: number): SVGTemplateResult {
    return svg`
      <line
        x1="-${radius}"
        y1="0"
        x2="${radius}"
        y2="0"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="1"
        vector-effect="non-scaling-stroke"
      />
      <line
        x1="0"
        y1="-${radius}"
        x2="0"
        y2="${radius}"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="1"
        vector-effect="non-scaling-stroke"
      />
    `;
  }

  override render() {
    const width = (176 + this.padding) * 2;
    const viewBox = `-${width / 2} -${width / 2} ${width} ${width}`;
    const angleSetpoint = this.renderSetpoint();
    const scale = Math.min(this.clientWidth, this.clientHeight) / width;
    const tickmarks = this.tickmarks.map((t) =>
      tickmark(t.angle, t.type, TickmarkStyle.hinted, scale, t.text)
    );
    const advices = this.advices
      ? this.advices.map((a) => renderAdvice(a))
      : nothing;
    const labels = this.labelFrameEnabled ? renderLabels(scale) : nothing;
    const wind =
      this.wind != null && this.windFromDirectionDeg != null
        ? renderWind({
            wind: this.wind,
            fromDirectionDeg: this.windFromDirectionDeg,
            radius: this.windSymbolRadius ?? 192,
          })
        : nothing;
    const current =
      this.current != null && this.currentFromDirectionDeg != null
        ? renderCurrent({
            current: this.current,
            fromDirectionDeg: this.currentFromDirectionDeg,
            radius: this.currentSymbolRadius ?? 192,
          })
        : nothing;
    return html`
      <svg
        width="100%"
        height="100%"
        viewBox=${viewBox}
        style="--scale: ${scale}"
      >
        ${current} ${wind} ${this.watchCircle()}
        ${this.crosshairEnabled ? this.renderCrosshair(184) : nothing}
        ${this.renderNorthArrow()} ${tickmarks} ${advices} ${angleSetpoint}
        ${labels} ${this.renderVesselImage()}
      </svg>
    `;
  }

  private renderSetpoint(): SVGTemplateResult | typeof nothing {
    let setPointColor = 'var(--instrument-enhanced-primary-color)';
    if (this.atAngleSetpoint) {
      setPointColor = 'var(--instrument-enhanced-secondary-color)';
    }
    if (this.state === InstrumentState.active) {
      setPointColor = 'var(--instrument-regular-primary-color)';
      if (this.atAngleSetpoint) {
        setPointColor = 'var(--instrument-regular-secondary-color)';
      }
    } else if (this.state === InstrumentState.loading) {
      setPointColor = 'var(--instrument-frame-tertiary-color)';
    } else if (this.state === InstrumentState.off) {
      setPointColor = 'var(--instrument-frame-tertiary-color)';
    }

    if (this.angleSetpoint === undefined) {
      return nothing;
    } else {
      let path;
      if (this.state === InstrumentState.inCommand) {
        path =
          'M23.5119 8C24.6981 6.35191 23.5696 4 21.5926 4L2.39959 4C0.422598 4 -0.705911 6.35191 0.480283 8L11.9961 24L23.5119 8Z';
      } else {
        path =
          'M18.5836 8L5.4086 8L11.9961 17.1526L18.5836 8ZM23.5119 8C24.6981 6.35191 23.5696 4 21.5926 4L2.39959 4C0.422598 4 -0.705911 6.35191 0.480283 8L11.9961 24L23.5119 8Z';
      }
      return svg`
        <defs>
          <g id="setpoint">
            <path fill-rule="evenodd" clip-rule="evenodd" transform="translate(-24 12) rotate(-90)" d=${path} vector-effect="non-scaling-stroke"/>
          </g>
          <mask id="setpointMask">
            <rect x="-20" y="-20" width="50" height="50" fill="white" />
            <use href="#setpoint" fill="black" />
          </mask>
        </defs>
        <g transform="rotate(${this.angleSetpoint + 90}) translate(-168 0) ">
          <use href="#setpoint" fill=${setPointColor} stroke-width="0" />
          
          <use href="#setpoint" vector-effect="non-scaling-stroke" fill="none" stroke="var(--border-silhouette-color)" stroke-width="2" stroke-linejoin="round" mask="url(#setpointMask)" />
        </g>
      `;
    }
  }

  private renderNorthArrow(): SVGTemplateResult | typeof nothing {
    if (!this.northArrow) {
      return nothing;
    }
    return svg`
<path transform="translate(-256, -256)" fill-rule="evenodd" clip-rule="evenodd" d="M238.152 96.9842L255.998 72L273.844 96.9839C267.985 96.3338 262.031 96 256 96C249.967 96 244.012 96.3339 238.152 96.9842Z" fill="var(--instrument-frame-tertiary-color)"/>
    `;
  }
  private renderVesselImage(): SVGTemplateResult | typeof nothing {
    if (
      this.vesselImageSize === VesselImageSize.none ||
      this.vesselImage == null
    ) {
      return nothing;
    }
    // assert that the vessel image is a valid value
    if (!Object.values(VesselImage).includes(this.vesselImage)) {
      throw new Error(`Invalid vessel image: ${this.vesselImage}`);
    }

    let size;
    switch (this.vesselImageSize) {
      case VesselImageSize.large:
        size = 224;
        break;
      case VesselImageSize.medium:
        size = 160;
        break;
      default:
        size = 100;
    }

    const scale = size / 160;
    return svg`<g style="transform: ${this.vesselImageTransform} scale(${scale}) translate(-80px, -80px) ">${vesselImages[this.vesselImage]}</g>`;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-watch': ObcWatch;
  }
}
