import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {LineMedium, LineType, lineColor, lineWidth} from '..';

@customElement('obc-direction-line')
export class ObcDirectionLine extends LitElement {
  @property({type: String}) medium: LineMedium = LineMedium.normal;
  @property({type: String}) lineType: LineType = LineType.fluid;

  override render() {
    if (this.lineType === LineType.connector) {
      throw new Error('Connector line type not supported for line overlap');
    }

    const color = lineColor(this.medium);
    const width = lineWidth(this.lineType) + 1;
    const h = width / 2;
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
          mask="url(#clip)"
          d="M-1 ${12 - h}H25v${width}H-1z"
          fill="var(${color.inner})"
          stroke="var(${color.outer})"
        />
        <path
          transform="translate(8 6)"
          d="M0.5 0L6.5 6L0.5 12H3.31068L9.31068 6L3.31068 0H0.5Z"
          fill="var(${color.outer})"
        />
        <defs>
          <mask id="clip">
            <rect width="100%" height="100%" fill="white" />
            <path
              transform="translate(6.5 6)"
              d="M0.5 0L6.5 6L0.5 12v1H6.31068v-1L12.31068 6L6.31068 0v-1H0.5v1Z"
              fill="black"
            />
          </mask>
        </defs>
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
    'obc-direction-line': ObcDirectionLine;
  }
}
