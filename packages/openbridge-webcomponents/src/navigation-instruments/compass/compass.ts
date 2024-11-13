import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
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
import {ResizeController} from '@lit-labs/observers/resize-controller.js';

/**
 *
 * @ignition-base-height: 512px
 * @ignition-base-width: 512px
 */
@customElement('obc-compass')
export class ObcCompass extends LitElement {
  @property({type: Number}) heading = 0;
  @property({type: Number}) courseOverGround = 0;
  @property({type: Array, attribute: false}) headingAdvices: AngleAdvice[] = [];

  // @ts-expect-error TS6133: The controller ensures that the render
  // function is called on resize of the element
  private _resizeController = new ResizeController(this, {});

  private getPadding() {
    const size = Math.min(this.clientHeight, this.clientWidth);
    const deltaWidth = 512 - size;
    const steps = deltaWidth / 128;
    let deltaPadding = 0;
    if (deltaWidth > 0) {
      deltaPadding = steps * 48;
    } else {
      deltaPadding = steps * 6;
    }

    return 72 + deltaPadding;
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

    const padding = this.getPadding();
    const width = (176 + padding) * 2;
    const viewBox = `-${width / 2} -${width / 2} ${width} ${width}`;

    return html`
      <div class="container">
        <obc-watch
          .padding=${padding}
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
