import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-target-cancel-all-iec')
export class ObiTargetCancelAllIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 2V5H0V1C0 0.447716 0.447715 0 1 0H5V2H2Z" fill="currentColor"/>
<path d="M0 23V19H2V22H5V24H1C0.447716 24 0 23.5523 0 23Z" fill="currentColor"/>
<path d="M19 24H23C23.5523 24 24 23.5523 24 23V19H22V22H19V24Z" fill="currentColor"/>
<path d="M24 5H22V2H19V0H23C23.5523 0 24 0.447715 24 1V5Z" fill="currentColor"/>
<path d="M8.00107 9.4143L10.2938 11.707L11.708 10.2928L9.41528 8.00009L11.7082 5.70722L10.2939 4.29301L8.00107 6.58588L5.70816 4.29297L4.29395 5.70718L6.58685 8.00009L4.2941 10.2928L5.70831 11.7071L8.00107 9.4143Z" fill="currentColor"/>
<path d="M19.7082 13.7072L17.4153 16.0001L19.708 18.2928L18.2938 19.707L16.0011 17.4143L13.7083 19.7071L12.2941 18.2928L14.5869 16.0001L12.2939 13.7072L13.7082 12.293L16.0011 14.5859L18.2939 12.293L19.7082 13.7072Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 2V5H0V1C0 0.447716 0.447715 0 1 0H5V2H2Z" style="fill: var(--element-active-color)"/>
<path d="M0 23V19H2V22H5V24H1C0.447716 24 0 23.5523 0 23Z" style="fill: var(--element-active-color)"/>
<path d="M19 24H23C23.5523 24 24 23.5523 24 23V19H22V22H19V24Z" style="fill: var(--element-active-color)"/>
<path d="M24 5H22V2H19V0H23C23.5523 0 24 0.447715 24 1V5Z" style="fill: var(--element-active-color)"/>
<path d="M8.00107 9.4143L10.2938 11.707L11.708 10.2928L9.41528 8.00009L11.7082 5.70722L10.2939 4.29301L8.00107 6.58588L5.70816 4.29297L4.29395 5.70718L6.58685 8.00009L4.2941 10.2928L5.70831 11.7071L8.00107 9.4143Z" style="fill: var(--element-active-color)"/>
<path d="M19.7082 13.7072L17.4153 16.0001L19.708 18.2928L18.2938 19.707L16.0011 17.4143L13.7083 19.7071L12.2941 18.2928L14.5869 16.0001L12.2939 13.7072L13.7082 12.293L16.0011 14.5859L18.2939 12.293L19.7082 13.7072Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-target-cancel-all-iec': ObiTargetCancelAllIec;
  }
}