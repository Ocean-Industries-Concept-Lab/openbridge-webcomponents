import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {LineMedium, LineType, lineColor, lineWidth} from '..';

export enum ThreeWayLineDirection {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
}

@customElement('obc-three-way-line')
export class ObcThreeWayLine extends LitElement {
  @property({type: String}) medium: LineMedium = LineMedium.normal;
  @property({type: String}) direction: ThreeWayLineDirection =
    ThreeWayLineDirection.top;
  @property({type: String}) lineType: LineType = LineType.fluid;

  override render() {
    let rotation = 0;
    if (this.direction === ThreeWayLineDirection.top) {
      rotation = 180;
    } else if (this.direction === ThreeWayLineDirection.right) {
      rotation = 270;
    } else if (this.direction === ThreeWayLineDirection.bottom) {
      rotation = 0;
    } else if (this.direction === ThreeWayLineDirection.left) {
      rotation = 90;
    }

    if (this.lineType === LineType.connector) {
      return html`
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          transform="rotate(${rotation})"
        >
          <path
            d="M10 11.5H14V12.5L10 12.5V11.5Z"
            fill="var(--element-neutral-color)"
          />
          <path
            d="M4 11.5H8V12.5L4 12.5V11.5Z"
            fill="var(--element-neutral-color)"
          />
          <path
            d="M0 11.5H2L2 12.5L0 12.5V11.5Z"
            fill="var(--element-neutral-color)"
          />
          <path
            d="M22 11.5L24 11.5V12.5L22 12.5V11.5Z"
            fill="var(--element-neutral-color)"
          />
          <path
            d="M16 11.5H20V12.5L16 12.5V11.5Z"
            fill="var(--element-neutral-color)"
          />
          <path
            d="M12.5 24V22.1667H11.5V24H12.5Z"
            fill="var(--element-neutral-color)"
          />
          <path
            d="M12.5 20.3333L12.5 16.6667H11.5L11.5 20.3333H12.5Z"
            fill="var(--element-neutral-color)"
          />
          <path
            d="M12.5 14.8333V13L11.5 13V14.8333H12.5Z"
            fill="var(--element-neutral-color)"
          />
        </svg>
      `;
    }

    const color = lineColor(this.medium);
    const width = lineWidth(this.lineType) + 1;
    const h = width / 2;
    const c = 13 - h; // inner corner lenght

    return html`
      <svg
        class="line"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        transform="rotate(${rotation})"
      >
        <path
          d="M-1 ${12 + h} v${-width}h26v${width}h-${c}v${c}h-${width}v-${c}Z"
          fill="var(${color.inner})"
          stroke="var(${color.outer})"
        />
      </svg>
    `;
  }

  static override styles = css`
    :host {
      display: block;
      line-height: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-three-way-line': ObcThreeWayLine;
  }
}
