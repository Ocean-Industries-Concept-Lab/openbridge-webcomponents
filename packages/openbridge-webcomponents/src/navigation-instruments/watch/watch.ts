import {
  LitElement,
  SVGTemplateResult,
  html,
  nothing,
  svg,
  unsafeCSS,
} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {circle} from '../../svghelpers';
import {roundedArch} from '../../svghelpers/roundedArch';
import {InstrumentState} from '../types';
import compentStyle from './watch.css?inline';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import {AngleAdviceRaw, renderAdvice} from './advice';
import {Tickmark, TickmarkStyle, tickmark} from './tickmark';

@customElement('obc-watch')
export class ObcWatch extends LitElement {
  @property({type: String}) state: InstrumentState = InstrumentState.inCommand;
  @property({type: Number}) angleSetpoint: number | undefined;
  @property({type: Boolean}) atAngleSetpoint: boolean = false;
  @property({type: Number}) padding = 24;
  @property({type: Number}) cutAngleStart: number | null = null;
  @property({type: Number}) cutAngleEnd: number | null = null;
  @property({type: Boolean}) roundOutsideCut = false;
  @property({type: Boolean}) roundInsideCut = false;
  @property({type: Array, attribute: false}) tickmarks: Tickmark[] = [];
  @property({type: Array, attribute: false}) advices: AngleAdviceRaw[] = [];

  // @ts-expect-error TS6133: The controller unsures that the render
  // function is called on resize of the element
  private _resizeController = new ResizeController(this, {});

  private watchCircle(): SVGTemplateResult {
    if (this.cutAngleStart === null || this.cutAngleEnd === null) {
      return svg`
        <defs>
          <mask id="mask1" x="0" y="0" width="100%" height="100%">
            <rect x="-200" y="-200" width="400" height="400" fill="white" />
            <circle cx="0" cy="0" r="160" fill="black" />
          </mask>
        </defs>
        ${
          this.state === InstrumentState.off
            ? null
            : svg`
        <circle
          cx="0"
          cy="0"
          r="184"
          fill="var(--instrument-frame-primary-color)"
          mask="url(#mask1)"
        />`
        }
        ${circle('innerRing', {
          radius: 320 / 2,
          strokeWidth: 1,
          strokeColor: 'var(--instrument-frame-tertiary-color)',
          strokePosition: 'center',
          fillColor: 'none',
        })}
        ${
          this.state === InstrumentState.off
            ? null
            : circle('outerRing', {
                radius: 368 / 2,
                strokeWidth: 1,
                strokeColor: 'var(--instrument-frame-tertiary-color)',
                strokePosition: 'center',
                fillColor: 'none',
              })
        }
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
      `;
    }
  }

  override render() {
    const width = (176 + this.padding) * 2;
    const viewBox = `-${width / 2} -${width / 2} ${width} ${width}`;
    const angleSetpoint = this.renderSetpoint();
    const scale = this.clientWidth / width;
    const tickmarks = this.tickmarks.map((t) =>
      tickmark(t.angle, t.type, TickmarkStyle.hinted, scale, t.text)
    );
    const advices = this.advices
      ? this.advices.map((a) => renderAdvice(a))
      : nothing;
    return html`
      <svg
        width="100%"
        height="100%"
        viewBox=${viewBox}
        style="--scale: ${scale}"
      >
        ${this.watchCircle()} ${tickmarks} ${advices} ${angleSetpoint}
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
    } else if (this.state === InstrumentState.inCommand) {
      return svg`
        <defs>
          <path id="angularSetpointInCommand" d="M47.1845 88.5803C47.3724 88.8413 47.6744 88.9961 47.9961 88.9961C48.3178 88.9961 48.6198 88.8413 48.8077 88.5803L60.3235 72.5803C61.941 70.333 60.4604 66.9961 57.5926 66.9961L38.3996 66.9961C35.5318 66.9961 34.0512 70.333 35.6686 72.5803L47.1845 88.5803Z" vector-effect="non-scaling-stroke" />
          <mask id="clipAngularSetpointInCommand">
            <rect x="-50" y="-50" width="200" height="200" fill="white" />
            <use href="#angularSetpointInCommand" fill="black" />
          </mask>
        </defs>
        <g transform="rotate(${this.angleSetpoint}) translate(-48 -256) ">
          <use href="#angularSetpointInCommand" fill=${setPointColor} stroke-width="0" />
          
          <use href="#angularSetpointInCommand" vector-effect="non-scaling-stroke" fill="none" stroke="var(--border-silhouette-color)" stroke-width="2" stroke-linejoin="round" mask="url(#clipAngularSetpointInCommand)" />
        </g>
      `;
    } else {
      return svg`
      <defs>
          <path id="angularSetpoint" d="M47.5903 88.2921C47.6842 88.4226 47.8353 88.5 47.9961 88.5C48.1569 88.5 48.308 88.4226 48.4019 88.2921L59.9177 72.2921C61.3195 70.3444 60.015 67.5 57.5926 67.5L38.3996 67.5C35.9772 67.5 34.6727 70.3444 36.0745 72.2921L47.5903 88.2921ZM53.6077 72.5L47.9961 80.2967L42.3845 72.5L53.6077 72.5Z" vector-effect="non-scaling-stroke" />
          <mask id="clipAngularSetpoint">
            <rect x="-50" y="-50" width="200" height="200" fill="white" />
            <use href="#angularSetpoint" fill="black" />
          </mask>
        </defs>
        <g transform="rotate(${this.angleSetpoint}) translate(-48 -256) ">
          <use href="#angularSetpoint" fill=${setPointColor} stroke-width="0" />
          
          <use href="#angularSetpoint" vector-effect="non-scaling-stroke" fill="none" stroke="var(--border-silhouette-color)" stroke-width="2" stroke-linejoin="round" mask="url(#clipAngularSetpoint)" />
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
