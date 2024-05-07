import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {LineMedium, LineType, lineColor, lineWidth} from '..';
export enum EndPointDirection {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
}

@customElement('obc-end-point-line')
export class ObcEndPointLine extends LitElement {
  @property({type: String}) medium: LineMedium = LineMedium.normal;
  @property({type: String}) direction: EndPointDirection =
    EndPointDirection.top;
  @property({type: String}) lineType: LineType = LineType.fluid;

  override render() {
    let rotation = 0;
    if (this.direction === EndPointDirection.top) {
      rotation = 180;
    } else if (this.direction === EndPointDirection.right) {
      rotation = 270;
    } else if (this.direction === EndPointDirection.bottom) {
      rotation = 0;
    } else if (this.direction === EndPointDirection.left) {
      rotation = 90;
    }

    if (this.lineType === LineType.connector) {
      throw new Error(
        'Connector line type is not supported for end-point line'
      );
    }

    const color = lineColor(this.medium);
    const width = lineWidth(this.lineType) + 1;
    const h = width / 2;
    let terminalWidth: number;
    if (this.lineType === LineType.electric) {
      terminalWidth = 15;
    } else if (this.lineType === LineType.air) {
      terminalWidth = 22;
    } else if (this.lineType === LineType.fluid) {
      terminalWidth = 16;
    } else {
      throw new Error('Invalid line type');
    }
    terminalWidth -= 1;

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
          d="M${12 - h} 25 V${12 + h}h-${(terminalWidth - width) /
          2}v-${width}h${terminalWidth}v${width}h-${(terminalWidth - width) /
          2}V25Z"
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
    'obc-end-point-line': ObcEndPointLine;
  }
}
