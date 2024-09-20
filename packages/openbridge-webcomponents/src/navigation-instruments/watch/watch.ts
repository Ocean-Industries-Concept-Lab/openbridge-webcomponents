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
import {renderLabels} from './label';

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
  @property({type: Boolean}) crosshairEnabled: boolean = false;
  @property({type: Boolean}) labelFrameEnabled: boolean = false;

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
    const scale = this.clientWidth / width;
    const tickmarks = this.tickmarks.map((t) =>
      tickmark(t.angle, t.type, TickmarkStyle.hinted, scale, t.text)
    );
    const advices = this.advices
      ? this.advices.map((a) => renderAdvice(a))
      : nothing;
    const labels = this.labelFrameEnabled ? renderLabels(scale) : nothing;
    console.log(scale);
    return html`
      <svg
        width="100%"
        height="100%"
        viewBox=${viewBox}
        style="--scale: ${scale}"
      >
        ${this.watchCircle()} ${tickmarks} ${advices} ${angleSetpoint} ${labels}
        ${this.crosshairEnabled ? this.renderCrosshair(320 / 2) : nothing}
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

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-watch': ObcWatch;
  }
}
