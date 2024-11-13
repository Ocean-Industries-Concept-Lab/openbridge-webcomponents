import {LitElement, css, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import '../watch/watch';
import {Tickmark, TickmarkType} from '../watch/tickmark';
import {arrow, ArrowStyle} from './arrow';
import {
  AdviceState,
  AdviceType,
  AngleAdvice,
  AngleAdviceRaw,
} from '../watch/advice';
import {radialTickmarks} from './radial-tickmark';

/**
 * 
 * @ignition-base-height: 512px
 * @ignition-base-width: 512px
 */
@customElement('obc-compass')
export class ObcCompass extends LitElement {
  @property({type: Number}) heading = 0;
  @property({type: Number}) courseOverGround = 0;
  @property({type: Number}) padding = 48;
  @property({type: Array, attribute: false}) headingAdvices: AngleAdvice[] = [];
  @state() containerWidth = 0;

  private resizeObserver: ResizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      this.containerWidth = Math.min(
        entry.contentRect.width,
        entry.contentRect.height
      );
      this.adjustPadding();
    }
  });

  override connectedCallback() {
    super.connectedCallback();
    this.resizeObserver.observe(this);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this);
  }

  private adjustPadding() {
    const deltaWidth = 512 - this.containerWidth;
    const steps = deltaWidth / 128;
    let deltaPadding = 0;
    if (deltaWidth > 0) {
      deltaPadding = steps * 48;
    } else {
      deltaPadding = steps * 6;
    }

    this.padding = 72 + deltaPadding;
  }

  private get angleAdviceRaw(): AngleAdviceRaw[] {
    return this.headingAdvices.map(({minAngle, maxAngle, hinted, type}) => {
      const state =
        this.heading >= minAngle && this.heading <= maxAngle
          ? AdviceState.triggered
          : hinted
            ? AdviceState.hinted
            : AdviceState.regular;
      return {minAngle, maxAngle, type, state};
    });
  }

  override render() {
    const tickmarks: Tickmark[] = [
      {angle: 0, type: TickmarkType.main},
      {angle: 90, type: TickmarkType.main},
      {angle: 180, type: TickmarkType.main},
      {angle: 270, type: TickmarkType.main},
    ];

    const rt = this.headingAdvices.map(({minAngle, maxAngle, type}) =>
      radialTickmarks(
        minAngle,
        maxAngle,
        type === AdviceType.caution ? TickmarkType.secondary : undefined
      )
    );

    const width = (176 + this.padding) * 2;
    const viewBox = `-${width / 2} -${width / 2} ${width} ${width}`;

    return html`
      <div class="container">
        <obc-watch
          .padding=${this.padding}
          .advices=${this.angleAdviceRaw}
          .tickmarks=${tickmarks}
          .labelFrameEnabled=${true}
          .crosshairEnabled=${true}
        >
        </obc-watch>
        <svg viewBox="${viewBox}">
          ${rt} ${arrow(ArrowStyle.HDG, this.heading)}
          ${arrow(ArrowStyle.COG, this.courseOverGround)}
        </svg>
      </div>
    `;
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

    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-compass': ObcCompass;
  }
}
