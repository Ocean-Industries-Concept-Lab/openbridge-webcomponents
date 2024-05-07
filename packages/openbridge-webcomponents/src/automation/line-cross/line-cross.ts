import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {LineMedium, LineType, lineColor, lineWidth} from '..';

@customElement('obc-line-cross')
export class ObcLineCross extends LitElement {
  @property({type: String}) medium: LineMedium = LineMedium.normal;
  @property({type: String}) lineType: LineType = LineType.fluid;

  override render() {
    if (this.lineType === LineType.connector) {
      return html`
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5 1.83333V0H12.5V1.83333H11.5Z"
            fill="var(--element-neutral-color)"
          />
          <path
            d="M11.5 7.33333V3.66667H12.5V7.33333H11.5Z"
            fill="var(--element-neutral-color)"
          />
          <path
            d="M11.5 11V9.16667H12.5V11H11.5Z"
            fill="var(--element-neutral-color)"
          />
          <path
            d="M0 12.5H2V11.5H0V12.5Z"
            fill="var(--element-neutral-color)"
          />
          <path
            d="M4 12.5H8V11.5H4V12.5Z"
            fill="var(--element-neutral-color)"
          />
          <path
            d="M10 12.5H14V11.5H10V12.5Z"
            fill="var(--element-neutral-color)"
          />
          <path
            d="M16 12.5H20V11.5H16V12.5Z"
            fill="var(--element-neutral-color)"
          />
          <path
            d="M22 12.5H24V11.5H22V12.5Z"
            fill="var(--element-neutral-color)"
          />
          <path
            d="M11.5 13V14.8333H12.5V13H11.5Z"
            fill="var(--element-neutral-color)"
          />
          <path
            d="M11.5 16.6667V20.3333H12.5V16.6667H11.5Z"
            fill="var(--element-neutral-color)"
          />
          <path
            d="M11.5 22.1667V24H12.5V22.1667H11.5Z"
            fill="var(--element-neutral-color)"
          />
        </svg>
      `;
    }

    const color = lineColor(this.medium);
    const width = lineWidth(this.lineType) + 1;
    const h = width / 2;

    let r: number;
    if (this.lineType === LineType.electric) {
      r = 4.5;
    } else if (this.lineType === LineType.air) {
      r = 10;
    } else if (this.lineType === LineType.fluid) {
      r = 6;
    } else {
      throw new Error('Invalid line type');
    }

    return html`
      <svg
        class="line"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-1 ${12 - h} H${12 - r} A${r} ${r} 0 0 1 ${12 - h} ${12 -
          r} V${-1}
            h${width} V${12 - r} A${r} ${r} 0 0 1 ${12 + r} ${12 - h} H25
            V${12 + h} H${12 + r} A${r} ${r} 0 0 1 ${12 + h} ${12 + r} V25
            h-${width} V${12 + r} A${r} ${r} 0 0 1 ${12 - r} ${12 + h} H-1 Z"
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
    'obc-line-cross': ObcLineCross;
  }
}
