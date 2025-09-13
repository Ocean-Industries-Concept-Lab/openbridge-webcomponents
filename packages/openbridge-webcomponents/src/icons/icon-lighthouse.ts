import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-lighthouse')
export class ObiLighthouse extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.4753 1.46268C12.3256 1.00202 11.6739 1.00202 11.5243 1.46268L9.41788 7.94546C9.35095 8.15147 9.15897 8.29095 8.94236 8.29095H2.12596C1.6416 8.29095 1.44021 8.91076 1.83207 9.19546L7.34665 13.202C7.52189 13.3294 7.59522 13.555 7.52828 13.7611L5.4219 20.2438C5.27222 20.7045 5.79946 21.0875 6.19132 20.8028L11.7059 16.7963C11.8811 16.6689 12.1184 16.6689 12.2937 16.7963L17.8083 20.8028C18.2001 21.0875 18.7274 20.7045 18.5777 20.2438L16.4713 13.7611C16.4044 13.555 16.4777 13.3294 16.6529 13.202L22.1675 9.19546C22.5594 8.91076 22.358 8.29095 21.8736 8.29095H15.0572C14.8406 8.29095 14.6486 8.15147 14.5817 7.94546L12.4753 1.46268ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.4753 1.46268C12.3256 1.00202 11.6739 1.00202 11.5243 1.46268L9.41788 7.94546C9.35095 8.15147 9.15897 8.29095 8.94236 8.29095H2.12596C1.6416 8.29095 1.44021 8.91076 1.83207 9.19546L7.34665 13.202C7.52189 13.3294 7.59522 13.555 7.52828 13.7611L5.4219 20.2438C5.27222 20.7045 5.79946 21.0875 6.19132 20.8028L11.7059 16.7963C11.8811 16.6689 12.1184 16.6689 12.2937 16.7963L17.8083 20.8028C18.2001 21.0875 18.7274 20.7045 18.5777 20.2438L16.4713 13.7611C16.4044 13.555 16.4777 13.3294 16.6529 13.202L22.1675 9.19546C22.5594 8.91076 22.358 8.29095 21.8736 8.29095H15.0572C14.8406 8.29095 14.6486 8.15147 14.5817 7.94546L12.4753 1.46268ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" style="fill: var(--element-active-color)"/>
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
    'obi-lighthouse': ObiLighthouse;
  }
}
