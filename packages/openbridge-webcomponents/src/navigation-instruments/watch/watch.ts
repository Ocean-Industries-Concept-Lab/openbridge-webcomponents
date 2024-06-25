import { LitElement, SVGTemplateResult, html, nothing, svg, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { circle } from '../../svghelpers';
import { roundedArch } from '../../svghelpers/roundedArch';
import { InstrumentState } from '../types';
import compentStyle from './watch.css?inline';

export enum TickmarkType {
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
}

function tickmark(
  angle: number,
  tickmarkSize: TickmarkType,
  colorName: string,
  text?: string
): SVGTemplateResult | SVGTemplateResult[] {
  let innerRadius: number = 328 / 2;
  let outerRadius: number = 368 / 2;
  const textRadius = outerRadius + 20;
  if (tickmarkSize === TickmarkType.secondary) {
    innerRadius = 164.5;
    outerRadius = 172.5;
  } else if (tickmarkSize === TickmarkType.tertiary) {
    throw new Error('Tertiary tickmarks are not supported');
  }

  const rad = (angle * Math.PI) / 180;
  const x1 = Math.sin(rad) * innerRadius;
  const y1 = -Math.cos(rad) * innerRadius;
  const x2 = Math.sin(rad) * outerRadius;
  const y2 = -Math.cos(rad) * outerRadius;
  const tick = svg`<line x1=${x1} y1=${y1} x2=${x2} y2=${y2} stroke="var(--${colorName}" stroke-width="1" vector-effect="non-scaling-stroke"/>`;
  if (text) {
    const textX = Math.sin(rad) * textRadius;
    const textY = -Math.cos(rad) * textRadius;
    return [
      tick,
      svg`<text x=${textX} y=${textY} class="label">${text}</text>`
    ];
  }
  return tick;
}

function tickmarks(
  tickmarksDeg: number,
  tickmarkSize: TickmarkType,
  colorName: string,
) {
  let innerRadius: number = 328 / 2;
  let outerRadius: number = 368 / 2;
  if (tickmarkSize === TickmarkType.secondary) {
    innerRadius = 164.5;
    outerRadius = 172.5;
  } else if (tickmarkSize === TickmarkType.tertiary) {
    throw new Error('Tertiary tickmarks are not supported');
  }

  let svgPath = '';
  for (let i = tickmarksDeg; i < 360; i += tickmarksDeg) {
    const angle = (i * Math.PI) / 180;
    const x1 = Math.sin(angle) * innerRadius;
    const y1 = -Math.cos(angle) * innerRadius;
    const x2 = Math.sin(angle) * outerRadius;
    const y2 = -Math.cos(angle) * outerRadius;
    svgPath += `M ${x1} ${y1} L ${x2} ${y2} `;
  }
  return svg`<path d=${svgPath} stroke="var(--${colorName}" stroke-width="1" vector-effect="non-scaling-stroke"/>`;
}

export interface Tickmark {
  angle: number;
  type: TickmarkType;
  text?: string;
}

@customElement('obc-watch')
export class ObcWatch extends LitElement {
  @property({ type: Boolean }) hideAllTickmarks = false;
  @property({ type: String }) state: InstrumentState = InstrumentState.inCommand;
  @property({ type: Number }) angleSetpoint: number | undefined;
  @property({ type: Boolean }) atAngleSetpoint: boolean = false;
  @property({ type: Number }) padding = 24;
  @property({ type: Number }) cutAngleStart: number | null = null;
  @property({ type: Number }) cutAngleEnd: number | null = null;
  @property({ type: Boolean }) roundOutsideCut = false;
  @property({ type: Boolean }) roundInsideCut = false;
  @property({ type: Array, attribute: false }) tickmarks: Tickmark[] = [];

  private watchCircle(): SVGTemplateResult {
    if (this.cutAngleStart === null || this.cutAngleEnd === null) {
      return svg`
        <defs>
          <mask id="mask1" x="0" y="0" width="100%" height="100%">
            <rect x="-200" y="-200" width="400" height="400" fill="white" />
            <circle cx="0" cy="0" r="160" fill="black" />
          </mask>
        </defs>
        ${this.state === InstrumentState.off
          ? null
          : svg`
        <circle
          cx="0"
          cy="0"
          r="184"
          fill="var(--instrument-frame-primary-color)"
          mask="url(#mask1)"
        />`}
        ${circle('innerRing', {
            radius: 320 / 2,
            strokeWidth: 1,
            strokeColor: 'var(--instrument-frame-tertiary-color)',
            strokePosition: 'center',
            fillColor: 'none',
          })}
        ${this.state === InstrumentState.off
          ? null
          : circle('outerRing', {
            radius: 368 / 2,
            strokeWidth: 1,
            strokeColor: 'var(--instrument-frame-tertiary-color)',
            strokePosition: 'center',
            fillColor: 'none',
          })}
        ${this.hideAllTickmarks
          ? null
          : tickmarks(
            90,
            TickmarkType.primary,
            'instrument-frame-tertiary-color'
          )}
        ${this.hideAllTickmarks
          ? null
          : svg`
        <line
          x2="0"
          x1="0"
          y2="-160"
          y1="-184"
          stroke="var(--instrument-frame-tertiary-color)"
          vector-effect="non-scaling-stroke"
        />`}
    `;
    } else {
      const R = 184;
      const r = 160;
      const svgPath = roundedArch({
        startAngle: this.cutAngleStart,
        endAngle: this.cutAngleEnd,
        R,
        r,
        roundOutsideCut: this.roundOutsideCut,
        roundInsideCut: this.roundInsideCut,

      });
      return svg`
        <path d=${svgPath} fill="var(--instrument-frame-primary-color)" 
        stroke="var(--instrument-frame-tertiary-color)"
          vector-effect="non-scaling-stroke"/>
      `
    }
  }

  override render() {
    const width = (176 + this.padding) * 2;
    const viewBox = `-${width / 2} -${width / 2} ${width} ${width}`;
    const angleSetpoint = this.renderSetpoint();
    const tickmarks = this.tickmarks.map((t) => tickmark(t.angle, t.type, 'instrument-frame-tertiary-color', t.text));
    return html`
      <svg width="100%" height="100%" viewBox=${viewBox}>
        ${this.watchCircle()}
        ${tickmarks}
        ${angleSetpoint}
      </svg>
      `
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
    } else if (this.state === InstrumentState.inCommand) {
      return svg`<g transform="rotate(${this.angleSetpoint}) translate(-48 -256) ">
        <path d="M47.1845 88.5803C47.3724 88.8413 47.6744 88.9961 47.9961 88.9961C48.3178 88.9961 48.6198 88.8413 48.8077 88.5803L60.3235 72.5803C61.941 70.333 60.4604 66.9961 57.5926 66.9961L38.3996 66.9961C35.5318 66.9961 34.0512 70.333 35.6686 72.5803L47.1845 88.5803Z" vector-effect="non-scaling-stroke" fill=${setPointColor} stroke="var(--border-silhouette-color)" stroke-width="2" stroke-linejoin="round" />
          </g>
      `;
    } else {
      return svg`<g transform="rotate(${this.angleSetpoint}) translate(-48 -256) ">
        <path d="M47.1845 92.5842C47.3724 92.8452 47.6744 93 47.9961 93C48.3178 93 48.6198 92.8452 48.8077 92.5842L60.3235 76.5842C61.941 74.3369 60.4604 71 57.5926 71L38.3996 71C35.5318 71 34.0512 74.3369 35.6686 76.5842L47.1845 92.5842ZM52.6318 77L47.9961 83.4408L43.3604 77L52.6318 77Z" vector-effect="non-scaling-stroke" fill=${setPointColor} stroke="var(--border-silhouette-color)" stroke-width="2" stroke-linejoin="round"  />
          </g>
          `;
    }
  }

  static override styles = unsafeCSS(compentStyle);
}



declare global {
  interface HTMLElementTagNameMap {
    'obc-watch': ObcWatch;
  }
}
