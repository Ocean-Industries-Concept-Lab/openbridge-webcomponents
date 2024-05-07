import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {LineMedium, lineColor, LineType, lineWidth} from '../index';

/* Vertical line component
 *
 * The vertical line is 24px * length + 1px. +1 px to make sure that connecting lines are overlapping, to hide the gap between them.
 */
@customElement('obc-vertical-line')
export class ObcVerticalLine extends LitElement {
  @property({type: String}) medium: LineMedium = LineMedium.normal;
  @property({type: String}) lineType: LineType = LineType.fluid;
  @property({type: Number}) length: number = 1;

  override render() {
    if (this.lineType === LineType.connector) {
      const length = this.length * 24;
      return html`<svg
        width="24"
        height="${length}"
        viewBox="0 0 24 ${length}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          y1="0"
          x1="12"
          y2="${length}"
          x2="12"
          stroke-width="1"
          stroke="var(--element-neutral-color)"
          stroke-dasharray="4,2"
          stroke-dashoffset="2"
        />
      </svg> `;
    }

    const length = this.length * 24 + 1;
    const color = lineColor(this.medium);
    const width = lineWidth(this.lineType);
    return html`
      <div class="wrapper" style="width: 24px; height: ${this.length * 24}px;">
        <svg
          class="line"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -.5  24 ${length}"
          width="24"
          height=${length}
        >
          <line
            y1="-.5"
            x1="12"
            y2="${length - 0.5}"
            x2="12"
            stroke-width=${width}
            stroke="var(${color.inner})"
          />
          <line
            y1="-.5"
            x1=${12 - 0.5 - width / 2}
            y2="${length - 0.5}"
            x2=${12 - 0.5 - width / 2}
            stroke-width="1"
            stroke="var(${color.outer})"
          />
          <line
            y1="-.5"
            x1=${12 + 0.5 + width / 2}
            y2="${length - 0.5}"
            x2=${12 + 0.5 + width / 2}
            stroke-width="1"
            stroke="var(${color.outer})"
          />
        </svg>
      </div>
    `;
  }

  static override styles = css`
    :host {
      display: block;
      line-height: 0;
    }

    .line {
      position: relative;
      top: -0.5px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-vertical-line': ObcVerticalLine;
  }
}
