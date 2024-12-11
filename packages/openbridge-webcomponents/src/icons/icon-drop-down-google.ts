import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-drop-down-google')
export class ObiDropDownGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8.93142 10C8.3256 10 8.0227 10 7.88243 10.1198C7.76073 10.2237 7.69614 10.3797 7.7087 10.5392C7.72317 10.7231 7.93736 10.9373 8.36573 11.3657L11.4344 14.4343C11.6324 14.6323 11.7314 14.7313 11.8455 14.7684C11.946 14.8011 12.0541 14.8011 12.1546 14.7684C12.2687 14.7313 12.3677 14.6323 12.5657 14.4343L15.6344 11.3657C16.0627 10.9373 16.2769 10.7231 16.2914 10.5392C16.304 10.3797 16.2394 10.2237 16.1177 10.1198C15.9774 10 15.6745 10 15.0687 10H8.93142Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.93142 10C8.3256 10 8.0227 10 7.88243 10.1198C7.76073 10.2237 7.69614 10.3797 7.7087 10.5392C7.72317 10.7231 7.93736 10.9373 8.36573 11.3657L11.4344 14.4343C11.6324 14.6323 11.7314 14.7313 11.8455 14.7684C11.946 14.8011 12.0541 14.8011 12.1546 14.7684C12.2687 14.7313 12.3677 14.6323 12.5657 14.4343L15.6344 11.3657C16.0627 10.9373 16.2769 10.7231 16.2914 10.5392C16.304 10.3797 16.2394 10.2237 16.1177 10.1198C15.9774 10 15.6745 10 15.0687 10H8.93142Z" style="fill: var(--element-active-color)"/>
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
    'obi-drop-down-google': ObiDropDownGoogle;
  }
}