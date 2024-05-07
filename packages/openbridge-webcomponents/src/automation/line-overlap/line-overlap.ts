import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {LineMedium, LineType, lineColor, lineWidth} from '..';

@customElement('obc-line-overlap')
export class ObcLineOverlap extends LitElement {
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
          d="M${12 - h} -1V25h${width}V-1z"
          fill="var(${color.inner})"
          stroke="var(${color.outer})"
        />

        <path
          d="M-1 ${12 - h}H25v${width}H-1z"
          fill="var(${color.inner})"
          stroke="var(${color.outer})"
        />

        <defs>
          <mask id="clip">
            <rect x="0" y="0" width="24" height="24" fill="white" />
            <rect
              x="0"
              y="${12 - 2 - h}"
              width="24"
              height="${width + 4}"
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
    'obc-line-overlap': ObcLineOverlap;
  }
}
