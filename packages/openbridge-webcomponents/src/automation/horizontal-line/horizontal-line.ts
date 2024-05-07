import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {LineMedium, lineColor, LineType, lineWidth} from '../index';

@customElement('obc-horizontal-line')
export class ObcHorizontalLine extends LitElement {
  @property({type: String}) medium: LineMedium = LineMedium.normal;
  @property({type: String}) lineType: LineType = LineType.fluid;
  @property({type: Number}) length: number = 1;

  override render() {
    if (this.lineType === LineType.connector) {
      const length = this.length * 24;
      return html`<svg
        width="${length}"
        height="24"
        viewBox="0 0 ${length} 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0"
          y1="12"
          x2="${length}"
          y2="12"
          stroke-width="1"
          stroke="var(--element-neutral-color)"
          stroke-dasharray="4,2"
          stroke-dashoffset="2"
        />
      </svg> `;
    }

    const color = lineColor(this.medium);
    const length = this.length * 24 + 1;
    const width = lineWidth(this.lineType);

    return html`
      <div class="wrapper" style="height: 24px; width: ${this.length * 24}px;">
        <svg
          class="line"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-.5 0 ${length} 24"
          height="24"
          width=${length}
        >
          <line
            x1="-0.5"
            y1="12"
            x2="${length - 0.5}"
            y2="12"
            stroke-width=${width}
            stroke="var(${color.inner})"
          />
          <line
            x1="-0.5"
            y1="${12 - 0.5 - width / 2}"
            x2="${length - 0.5}"
            y2="${12 - 0.5 - width / 2}"
            stroke-width="1"
            stroke="var(${color.outer})"
          />
          <line
            x1="-0.5"
            y1="${12 + 0.5 + width / 2}"
            x2="${length - 0.5}"
            y2="${12 + 0.5 + width / 2}"
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
      left: -0.5px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-horizontal-line': ObcHorizontalLine;
  }
}
