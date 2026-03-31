import {
  LitElement,
  SVGTemplateResult,
  html,
  nothing,
  svg,
  unsafeCSS,
} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './watch-flat.css?inline';
import {Tickmark, TickmarkStyle, tickmark} from './tickmark-flat.js';
import {rect} from '../../svghelpers/rectangular.js';
import {Label} from '../compass-flat/compass-flat.js';
import {customElement} from '../../decorator.js';
import {Priority} from '../types.js';
import {
  RotType,
  LinearRotPosition,
  renderLinearRotDots,
  renderLinearRotBarStatic,
  renderLinearRotBarDots,
  LINEAR_DOT_ANGLE_SPACING,
} from '../rate-of-turn/rot-renderer.js';
import {RateOfTurnController} from '../rate-of-turn/rate-of-turn.controller.js';

export {RotType, LinearRotPosition};

@customElement('obc-watch-flat')
export class ObcWatchFlat extends LitElement {
  @property({type: Number}) width = 352;
  @property({type: Number}) height = 72;
  @property({type: Number}) padding = 0;
  @property({type: Number}) rotation = 0;
  @property({type: Number}) tickmarkSpacing = 0;
  @property({type: Number}) angleSetpoint: number | undefined;
  @property({type: Array, attribute: false}) tickmarks: Tickmark[] = [];
  @property({type: Array, attribute: false}) labels: Label[] = [];
  @property({type: Array, attribute: false}) FOVIndicator: SVGTemplateResult[] =
    [];
  @property({type: Number}) trackHeight = (2 / 3) * this.height;
  @property({type: Number}) ticksHeight = this.height - this.trackHeight;
  @property({type: Number}) borderRadius = 8;
  @property({type: Boolean}) bottomBar = false;

  @property({type: String}) rotType: RotType | undefined;
  @property({type: String}) rotPosition: LinearRotPosition =
    LinearRotPosition.track;
  @property({type: Number}) rotStartX: number = 0;
  @property({type: Number}) rotEndX: number = 0;
  @property({type: Number}) rotDotSpacing: number = 0;
  @property({type: String}) rotPriority: Priority = Priority.regular;

  @property({type: Number})
  set rotationsPerMinute(value: number) {
    this._rotationsPerMinute = value;
    if (this._rotController) {
      this._rotController.rotationsPerMinute = value;
    }
  }
  get rotationsPerMinute() {
    return this._rotationsPerMinute;
  }

  private _rotationsPerMinute = 0;
  private _rotController?: RateOfTurnController;

  private get totalHeight(): number {
    return this.bottomBar ? this.height + this.ticksHeight : this.height;
  }

  private renderClipPath(offsetY: number = 0): SVGTemplateResult {
    return svg`
      <clipPath id="frameClipPath${offsetY === 0 ? '' : 'Tickmarks'}">
        <rect x="${-this.width / 2}" y="${-this.totalHeight / 2 + offsetY}" 
              width="${this.width}" height="${this.totalHeight}" 
              rx="${this.borderRadius}" />
      </clipPath>
    `;
  }

  private renderLabelMask(): SVGTemplateResult {
    return svg`
      <mask id="labelMask">
        <rect x="${-this.width / 2}" y="${-70}" 
              width="${this.width}" height="${32}"
               />
        <linearGradient id="fadeGradient" gradientUnits="userSpaceOnUse"
                        x1="${-this.width / 2}" y1="0" x2="${this.width / 2}" y2="0">
          <stop offset="0%" style="stop-color:black; stop-opacity:1;" />
          <stop offset="10%" style="stop-color:white; stop-opacity:1;" />
          <stop offset="50%" style="stop-color:white; stop-opacity:1;" />
          <stop offset="90%" style="stop-color:white; stop-opacity:1;" />
          <stop offset="100%" style="stop-color:black; stop-opacity:1;" />
        </linearGradient>
        <rect x="${-this.width / 2}" y="${-70}" 
              width="${this.width}" height="${32}"
              fill="url(#fadeGradient)" />
      </mask>
    `;
  }

  private renderLabels(scale: number): SVGTemplateResult[] {
    const labels: SVGTemplateResult[] = [];

    for (const l of this.labels) {
      labels.push(
        svg`<g transform="translate(${-this.rotation * this.tickmarkSpacing}, ${-6 / scale})">
          <text x=${l.x} y=${l.y} class="label" fill=${'var(--instrument-tick-mark-secondary-color)'}>
            ${l.text}
          </text>
          </g>`
      );
    }

    return labels;
  }

  private watchFace(): SVGTemplateResult {
    const strokeWidth = 1;
    const th = this.totalHeight;
    const topTicksY = -th / 2;

    return svg`
      ${this.renderClipPath()}
      ${this.renderClipPath(-40)}
      <g clip-path="url(#frameClipPath)">
        ${rect('frame-track', {
          width: this.width,
          height: this.trackHeight,
          y:
            th / 2 - this.trackHeight - (this.bottomBar ? this.ticksHeight : 0),
          strokeWidth: strokeWidth,
          strokeColor: 'var(--instrument-frame-secondary-color)',
          strokePosition: 'inside',
          fillColor: 'var(--instrument-frame-secondary-color)',
          borderRadius: 0,
        })}
        ${rect('frame-ticks', {
          width: this.width,
          height: this.ticksHeight,
          y: topTicksY,
          strokeWidth: strokeWidth,
          strokeColor: 'var(--instrument-frame-primary-color)',
          strokePosition: 'inside',
          fillColor: 'var(--instrument-frame-primary-color)',
          borderRadius: 0,
        })}
        ${
          this.bottomBar
            ? rect('frame-bottom-bar', {
                width: this.width,
                height: this.ticksHeight,
                y: th / 2 - this.ticksHeight,
                strokeWidth: strokeWidth,
                strokeColor: 'var(--instrument-frame-primary-color)',
                strokePosition: 'inside',
                fillColor: 'var(--instrument-frame-primary-color)',
                borderRadius: 0,
              })
            : nothing
        }
      </g>
      ${rect('frame-outline', {
        width: this.width,
        height: th,
        strokeWidth: strokeWidth,
        strokeColor: 'var(--instrument-frame-tertiary-color)',
        strokePosition: 'inside',
        fillColor: 'none',
        borderRadius: this.borderRadius,
      })}
    `;
  }

  // ---------------------------------------------------------------------------
  // ROT (Rate of Turn) — linear
  // ---------------------------------------------------------------------------

  private getRotTrackY(): number {
    const th = this.totalHeight;
    if (this.rotPosition === LinearRotPosition.scale) {
      return -th / 2 + this.ticksHeight / 2;
    }
    if (this.bottomBar) {
      return th / 2 - this.ticksHeight / 2;
    }
    return this.height / 2 - this.trackHeight / 2;
  }

  private getRotColors(): {
    dotColor: string;
    barBgColor: string;
    endDotFill: string;
    endDotStroke: string;
  } {
    const isEnhanced = this.rotPriority === Priority.enhanced;
    return {
      dotColor: isEnhanced
        ? 'var(--instrument-enhanced-tertiary-color)'
        : 'var(--instrument-regular-tertiary-color)',
      barBgColor: isEnhanced
        ? 'var(--instrument-enhanced-secondary-color)'
        : 'var(--instrument-regular-secondary-color)',
      endDotFill: 'var(--border-silhouette-color)',
      endDotStroke: isEnhanced
        ? 'var(--instrument-enhanced-secondary-color)'
        : 'var(--instrument-regular-secondary-color)',
    };
  }

  private renderRot(): SVGTemplateResult | typeof nothing {
    if (!this.rotType) return nothing;

    const trackY = this.getRotTrackY();
    const {dotColor, barBgColor, endDotFill, endDotStroke} =
      this.getRotColors();
    const canAnimateDots = this.rotDotSpacing > 0;

    if (this.rotType === RotType.bar) {
      const hasBar = Math.abs(this.rotEndX - this.rotStartX) >= 1;
      return svg`
        ${renderLinearRotBarStatic({
          startX: this.rotStartX,
          endX: this.rotEndX,
          color: dotColor,
          barColor: barBgColor,
          trackY,
          endDotFill,
          endDotStroke,
          maskId: 'rot-bar-mask-linear',
        })}
        ${
          hasBar && canAnimateDots
            ? svg`<g clip-path="url(#rot-bar-mask-linear)">
              <g id="rot-spinner">
                ${renderLinearRotBarDots(dotColor, trackY, this.rotDotSpacing, this.width)}
              </g>
            </g>`
            : nothing
        }
      `;
    }

    const dotsColor =
      this.rotPriority === Priority.enhanced
        ? 'var(--instrument-enhanced-secondary-color)'
        : 'var(--instrument-regular-secondary-color)';
    return canAnimateDots
      ? svg`
          <g id="rot-spinner">
            ${renderLinearRotDots(dotsColor, trackY, this.rotDotSpacing, this.width)}
          </g>
        `
      : nothing;
  }

  private disposeRotController(): void {
    if (this._rotController) {
      this._rotController.destroy();
      this.removeController(this._rotController);
      this._rotController = undefined;
    }
  }

  override updated(): void {
    const el = this.rotType
      ? this.renderRoot.querySelector('#rot-spinner')
      : null;

    if (!el) {
      this.disposeRotController();
      return;
    }

    const cyclePx = 360 * (this.rotDotSpacing / LINEAR_DOT_ANGLE_SPACING);

    if (!this._rotController || this._rotController.el !== el) {
      this.disposeRotController();
      this._rotController = new RateOfTurnController(
        this,
        el,
        this._rotationsPerMinute,
        cyclePx
      );
    } else {
      this._rotController.cyclePx = cyclePx;
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.disposeRotController();
  }

  override render() {
    const width = (this.width / 2 + this.padding) * 2;
    const th = this.totalHeight;
    const viewBox = `-${width / 2} -${th / 2} ${width} ${th}`;
    const scale = this.clientWidth / width;

    const contentOffsetY = this.bottomBar ? -this.ticksHeight / 2 : 0;

    return html`
      <svg
        width="100%"
        height="100%"
        viewBox=${viewBox}
        style="--scale: ${scale}"
      >
        ${this.watchFace()} ${this.renderLabelMask()}

        <g transform="translate(0, ${contentOffsetY})">
          <g clip-path="url(#frameClipPath)">
            ${this.tickmarks.map(
              (t) => svg`
              <g transform="translate(${-this.rotation * this.tickmarkSpacing}, 0)">
                ${tickmark(t.angle, t.type, TickmarkStyle.regular)}
              </g>
            `
            )}
          </g>

          <g mask="url(#labelMask)">${this.renderLabels(scale)}</g>
        </g>

        ${this.FOVIndicator}

        <g clip-path="url(#frameClipPath)">${this.renderRot()}</g>
      </svg>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-watch-flat': ObcWatchFlat;
  }
}
