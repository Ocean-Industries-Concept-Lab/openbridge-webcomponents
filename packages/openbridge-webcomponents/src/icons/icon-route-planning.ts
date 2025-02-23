import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-route-planning')
export class ObiRoutePlanning extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.5485 7.94998C12.3706 7.98283 12.1873 8 12 8C11.7951 8 11.595 7.97945 11.4016 7.94031L5.74641 17.7353C5.52529 18.1183 5.41473 18.3098 5.3147 18.3366C5.22843 18.3598 5.13638 18.3351 5.07322 18.2719C5 18.1987 5 17.9776 5 17.5353V15.4569C5 15.2972 5 15.2174 5.01231 15.1397C5.02324 15.0706 5.04138 15.003 5.06642 14.9377C5.09462 14.8642 5.13454 14.7951 5.21436 14.6569L9.6868 6.91039C9.25778 6.39151 9 5.72586 9 5C9 3.34314 10.3431 2 12 2C13.6569 2 15 3.34314 15 5C15 5.74425 14.729 6.42519 14.2803 6.94954L18.7856 14.7531C18.8655 14.8913 18.9054 14.9605 18.9336 15.0339C18.9586 15.0992 18.9768 15.1669 18.9877 15.2359C19 15.3136 19 15.3934 19 15.5531V17.6315C19 18.0738 19 18.2949 18.9268 18.3681C18.8636 18.4313 18.7716 18.4559 18.6853 18.4328C18.5853 18.406 18.4747 18.2145 18.2536 17.8315L12.5485 7.94998ZM13 5C13 5.55229 12.5523 6 12 6C11.4477 6 11 5.55229 11 5C11 4.44771 11.4477 4 12 4C12.5523 4 13 4.44771 13 5Z" fill="currentColor"/>
<path d="M2 20H6V22H2V20Z" fill="currentColor"/>
<path d="M11 20H8V22H11V20Z" fill="currentColor"/>
<path d="M13 20H16V22H13V20Z" fill="currentColor"/>
<path d="M22 20H18V22H22V20Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.5485 7.94998C12.3706 7.98283 12.1873 8 12 8C11.7951 8 11.595 7.97945 11.4016 7.94031L5.74641 17.7353C5.52529 18.1183 5.41473 18.3098 5.3147 18.3366C5.22843 18.3598 5.13638 18.3351 5.07322 18.2719C5 18.1987 5 17.9776 5 17.5353V15.4569C5 15.2972 5 15.2174 5.01231 15.1397C5.02324 15.0706 5.04138 15.003 5.06642 14.9377C5.09462 14.8642 5.13454 14.7951 5.21436 14.6569L9.6868 6.91039C9.25778 6.39151 9 5.72586 9 5C9 3.34314 10.3431 2 12 2C13.6569 2 15 3.34314 15 5C15 5.74425 14.729 6.42519 14.2803 6.94954L18.7856 14.7531C18.8655 14.8913 18.9054 14.9605 18.9336 15.0339C18.9586 15.0992 18.9768 15.1669 18.9877 15.2359C19 15.3136 19 15.3934 19 15.5531V17.6315C19 18.0738 19 18.2949 18.9268 18.3681C18.8636 18.4313 18.7716 18.4559 18.6853 18.4328C18.5853 18.406 18.4747 18.2145 18.2536 17.8315L12.5485 7.94998ZM13 5C13 5.55229 12.5523 6 12 6C11.4477 6 11 5.55229 11 5C11 4.44771 11.4477 4 12 4C12.5523 4 13 4.44771 13 5Z" style="fill: var(--element-active-color)"/>
<path d="M2 20H6V22H2V20Z" style="fill: var(--element-active-color)"/>
<path d="M11 20H8V22H11V20Z" style="fill: var(--element-active-color)"/>
<path d="M13 20H16V22H13V20Z" style="fill: var(--element-active-color)"/>
<path d="M22 20H18V22H22V20Z" style="fill: var(--element-active-color)"/>
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
    'obi-route-planning': ObiRoutePlanning;
  }
}
