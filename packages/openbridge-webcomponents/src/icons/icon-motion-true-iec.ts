import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-motion-true-iec')
export class ObiMotionTrueIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M14.9141 17.0001L12.7661 10.1961H12.7181C12.7261 10.3561 12.7381 10.5921 12.7541 10.9041C12.7701 11.2081 12.7861 11.5401 12.8021 11.9001C12.8181 12.2521 12.8261 12.5801 12.8261 12.8841V17.0001H11.2781V8.43213H13.6541L15.7421 15.0321H15.7781L17.9981 8.43213H20.3621V17.0001H18.7421V12.8121C18.7421 12.5321 18.7461 12.2241 18.7541 11.8881C18.7701 11.5441 18.7821 11.2201 18.7901 10.9161C18.8061 10.6041 18.8181 10.3681 18.8261 10.2081H18.7781L16.4981 17.0001H14.9141Z" fill="currentColor"/>
<path d="M7.592 17.0001H5.864V9.88413H3.5V8.43213H9.956V9.88413H7.592V17.0001Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.9141 17.0001L12.7661 10.1961H12.7181C12.7261 10.3561 12.7381 10.5921 12.7541 10.9041C12.7701 11.2081 12.7861 11.5401 12.8021 11.9001C12.8181 12.2521 12.8261 12.5801 12.8261 12.8841V17.0001H11.2781V8.43213H13.6541L15.7421 15.0321H15.7781L17.9981 8.43213H20.3621V17.0001H18.7421V12.8121C18.7421 12.5321 18.7461 12.2241 18.7541 11.8881C18.7701 11.5441 18.7821 11.2201 18.7901 10.9161C18.8061 10.6041 18.8181 10.3681 18.8261 10.2081H18.7781L16.4981 17.0001H14.9141Z" style="fill: var(--element-active-color)"/>
<path d="M7.592 17.0001H5.864V9.88413H3.5V8.43213H9.956V9.88413H7.592V17.0001Z" style="fill: var(--element-active-color)"/>
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
    'obi-motion-true-iec': ObiMotionTrueIec;
  }
}
