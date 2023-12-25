import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-19-speed')
export class Obi19Speed extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 5.52441C7.30558 5.52441 3.5 9.32999 3.5 14.0244C3.5 15.6685 3.96543 17.2006 4.77209 18.5H19.2279C20.0346 17.2006 20.5 15.6685 20.5 14.0244C20.5 12.3662 20.0252 10.8189 19.2041 9.51102C19.331 9.31305 19.4505 9.12614 19.561 8.95325C19.7723 8.62254 19.9504 8.34289 20.0826 8.13499C21.2884 9.78697 22 11.8226 22 14.0244C22 16.2647 21.2633 18.3329 20.019 20H3.98099C2.73667 18.3329 2 16.2647 2 14.0244C2 8.50157 6.47715 4.02441 12 4.02441C14.1892 4.02441 16.2141 4.72787 17.8609 5.92108C17.6535 6.05295 17.3756 6.22994 17.0474 6.43965C16.8725 6.55143 16.6832 6.67255 16.4826 6.80113C15.1813 5.99184 13.6452 5.52441 12 5.52441Z" fill="currentColor"/>
<path d="M10.5852 15.4141C11.3662 16.1952 12.6326 16.1952 13.4136 15.4141C14.1947 14.6331 19.0705 6.92886 19.0705 6.92886C19.0705 6.92886 11.3662 11.8047 10.5852 12.5857C9.80413 13.3668 9.80413 14.6331 10.5852 15.4141Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 5.52441C7.30558 5.52441 3.5 9.32999 3.5 14.0244C3.5 15.6685 3.96543 17.2006 4.77209 18.5H19.2279C20.0346 17.2006 20.5 15.6685 20.5 14.0244C20.5 12.3662 20.0252 10.8189 19.2041 9.51102C19.331 9.31305 19.4505 9.12614 19.561 8.95325C19.7723 8.62254 19.9504 8.34289 20.0826 8.13499C21.2884 9.78697 22 11.8226 22 14.0244C22 16.2647 21.2633 18.3329 20.019 20H3.98099C2.73667 18.3329 2 16.2647 2 14.0244C2 8.50157 6.47715 4.02441 12 4.02441C14.1892 4.02441 16.2141 4.72787 17.8609 5.92108C17.6535 6.05295 17.3756 6.22994 17.0474 6.43965C16.8725 6.55143 16.6832 6.67255 16.4826 6.80113C15.1813 5.99184 13.6452 5.52441 12 5.52441Z" style="fill: var(--element-active-color)"/>
<path d="M10.5852 15.4141C11.3662 16.1952 12.6326 16.1952 13.4136 15.4141C14.1947 14.6331 19.0705 6.92886 19.0705 6.92886C19.0705 6.92886 11.3662 11.8047 10.5852 12.5857C9.80413 13.3668 9.80413 14.6331 10.5852 15.4141Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${this.useCssColor ? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: var(--size);
      width: var(--size);
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-19-speed': Obi19Speed;
  }
}
