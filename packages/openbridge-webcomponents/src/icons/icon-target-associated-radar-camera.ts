import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-target-associated-radar-camera')
export class ObiTargetAssociatedRadarCamera extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.0001 11.9999C18.0001 15.3136 15.3138 17.9998 12.0001 17.9998C8.68645 17.9998 6.00018 15.3136 6.00018 11.9999C6.00018 8.68621 8.68645 5.99994 12.0001 5.99994C15.3138 5.99994 18.0001 8.68621 18.0001 11.9999ZM16.0001 11.9999C16.0001 14.209 14.2092 15.9998 12.0001 15.9998C9.79101 15.9998 8.00016 14.209 8.00016 11.9999C8.00016 9.79076 9.79101 7.99992 12.0001 7.99992C14.2092 7.99992 16.0001 9.79076 16.0001 11.9999Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.000244138 1.99998C0.000244138 0.895421 0.895666 0 2.00022 0L22 0C23.1046 0 24 0.895422 24 1.99998L24 21.9998C24 23.1043 23.1046 23.9998 22 23.9998L2.00022 23.9998C0.895665 23.9998 0.000244138 23.1043 0.000244138 21.9998L0.000244138 1.99998ZM2.00022 0.99999L22 0.99999C22.5523 0.99999 23 1.4477 23 1.99998L23 21.9998C23 22.5521 22.5523 22.9998 22 22.9998L2.00022 22.9998C1.44794 22.9998 1.00023 22.5521 1.00023 21.9998L1.00023 1.99998C1.00023 1.4477 1.44794 0.99999 2.00022 0.99999Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.0001 11.9999C18.0001 15.3136 15.3138 17.9998 12.0001 17.9998C8.68645 17.9998 6.00018 15.3136 6.00018 11.9999C6.00018 8.68621 8.68645 5.99994 12.0001 5.99994C15.3138 5.99994 18.0001 8.68621 18.0001 11.9999ZM16.0001 11.9999C16.0001 14.209 14.2092 15.9998 12.0001 15.9998C9.79101 15.9998 8.00016 14.209 8.00016 11.9999C8.00016 9.79076 9.79101 7.99992 12.0001 7.99992C14.2092 7.99992 16.0001 9.79076 16.0001 11.9999Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.000244138 1.99998C0.000244138 0.895421 0.895666 0 2.00022 0L22 0C23.1046 0 24 0.895422 24 1.99998L24 21.9998C24 23.1043 23.1046 23.9998 22 23.9998L2.00022 23.9998C0.895665 23.9998 0.000244138 23.1043 0.000244138 21.9998L0.000244138 1.99998ZM2.00022 0.99999L22 0.99999C22.5523 0.99999 23 1.4477 23 1.99998L23 21.9998C23 22.5521 22.5523 22.9998 22 22.9998L2.00022 22.9998C1.44794 22.9998 1.00023 22.5521 1.00023 21.9998L1.00023 1.99998C1.00023 1.4477 1.44794 0.99999 2.00022 0.99999Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper">${this.useCssColor ? this.iconCss : this.icon}</div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: 100%;
      width: 100%;
      line-height: 0;
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-target-associated-radar-camera': ObiTargetAssociatedRadarCamera;
  }
}
