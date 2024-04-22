import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-03-settings-default-alt2')
export class Obi03SettingsDefaultAlt2 extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16.274 10.1332L14.726 8.86676L10.9258 13.5115L9.20711 11.7929L7.79289 13.2071L11.0742 16.4885L16.274 10.1332Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.0498 18.95L17.0975 18.1659C16.414 18.7316 15.6349 19.1859 14.788 19.5008L14.4898 21.58C14.4598 21.82 14.2498 22 13.9998 22H9.99984C9.74984 22 9.53984 21.82 9.50984 21.58L9.21167 19.5007C8.36486 19.1857 7.58581 18.7315 6.90238 18.1658L4.94984 18.95C4.72984 19.03 4.45984 18.95 4.33984 18.73L2.33984 15.27C2.21984 15.05 2.26984 14.78 2.45984 14.63L4.11147 13.3384C4.03816 12.9032 4 12.4561 4 12C4 11.5439 4.03816 11.0968 4.11147 10.6616L2.45984 9.37C2.26984 9.22 2.20984 8.95 2.33984 8.73L4.33984 5.27C4.45984 5.05 4.71984 4.96 4.94984 5.05L6.90238 5.83415C7.58581 5.26848 8.36486 4.81426 9.21167 4.49934L9.50984 2.42C9.53984 2.18 9.74984 2 9.99984 2H13.9998C14.2498 2 14.4598 2.18 14.4898 2.42L14.788 4.49921C15.6349 4.81412 16.414 5.26836 17.0975 5.83406L19.0498 5.05C19.2698 4.97 19.5398 5.05 19.6598 5.27L21.6598 8.73C21.7798 8.95 21.7298 9.22 21.5398 9.37L19.8885 10.6613C19.9618 11.0966 20 11.5439 20 12C20 12.4561 19.9618 12.9034 19.8885 13.3387L21.5398 14.63C21.7298 14.78 21.7798 15.05 21.6598 15.27L19.6598 18.73C19.5398 18.95 19.2798 19.04 19.0498 18.95ZM12 17.5C15.0376 17.5 17.5 15.0376 17.5 12C17.5 8.96243 15.0376 6.5 12 6.5C8.96243 6.5 6.5 8.96243 6.5 12C6.5 15.0376 8.96243 17.5 12 17.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.274 10.1332L14.726 8.86676L10.9258 13.5115L9.20711 11.7929L7.79289 13.2071L11.0742 16.4885L16.274 10.1332Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.0498 18.95L17.0975 18.1659C16.414 18.7316 15.6349 19.1859 14.788 19.5008L14.4898 21.58C14.4598 21.82 14.2498 22 13.9998 22H9.99984C9.74984 22 9.53984 21.82 9.50984 21.58L9.21167 19.5007C8.36486 19.1857 7.58581 18.7315 6.90238 18.1658L4.94984 18.95C4.72984 19.03 4.45984 18.95 4.33984 18.73L2.33984 15.27C2.21984 15.05 2.26984 14.78 2.45984 14.63L4.11147 13.3384C4.03816 12.9032 4 12.4561 4 12C4 11.5439 4.03816 11.0968 4.11147 10.6616L2.45984 9.37C2.26984 9.22 2.20984 8.95 2.33984 8.73L4.33984 5.27C4.45984 5.05 4.71984 4.96 4.94984 5.05L6.90238 5.83415C7.58581 5.26848 8.36486 4.81426 9.21167 4.49934L9.50984 2.42C9.53984 2.18 9.74984 2 9.99984 2H13.9998C14.2498 2 14.4598 2.18 14.4898 2.42L14.788 4.49921C15.6349 4.81412 16.414 5.26836 17.0975 5.83406L19.0498 5.05C19.2698 4.97 19.5398 5.05 19.6598 5.27L21.6598 8.73C21.7798 8.95 21.7298 9.22 21.5398 9.37L19.8885 10.6613C19.9618 11.0966 20 11.5439 20 12C20 12.4561 19.9618 12.9034 19.8885 13.3387L21.5398 14.63C21.7298 14.78 21.7798 15.05 21.6598 15.27L19.6598 18.73C19.5398 18.95 19.2798 19.04 19.0498 18.95ZM12 17.5C15.0376 17.5 17.5 15.0376 17.5 12C17.5 8.96243 15.0376 6.5 12 6.5C8.96243 6.5 6.5 8.96243 6.5 12C6.5 15.0376 8.96243 17.5 12 17.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-03-settings-default-alt2': Obi03SettingsDefaultAlt2;
  }
}