import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-bipolar_transistor-04')
export class ObiBipolar_transistor04 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM17.9107 21.2787C16.2036 22.3684 14.1755 23 12 23C6.17694 23 1.41067 18.4753 1.02517 12.75H6V18C6 18.5523 6.44772 19 7 19C7.55228 19 8 18.5523 8 18V15.5567L17.9107 21.2787ZM19.2176 20.3012L8 13.8246V6C8 5.44772 7.55228 5 7 5C6.44772 5 6 5.44772 6 6V11.25H1.02517C1.41067 5.52466 6.17694 1 12 1C14.5182 1 16.8388 1.84618 18.6929 3.26971L12.327 6.94506L13.3224 3.23003L11.8735 2.8418L10.2153 9.03034L16.4039 10.6886L16.7921 9.23967L13.0768 8.24417L19.8746 4.31948C21.8085 6.30189 23 9.0118 23 12C23 15.3133 21.5351 18.2845 19.2176 20.3012ZM1.00017 11.9386C1.00006 11.959 1 11.9795 1 12C1 12.0205 1.00006 12.041 1.00017 12.0614V11.9386Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM17.9107 21.2787C16.2036 22.3684 14.1755 23 12 23C6.17694 23 1.41067 18.4753 1.02517 12.75H6V18C6 18.5523 6.44772 19 7 19C7.55228 19 8 18.5523 8 18V15.5567L17.9107 21.2787ZM19.2176 20.3012L8 13.8246V6C8 5.44772 7.55228 5 7 5C6.44772 5 6 5.44772 6 6V11.25H1.02517C1.41067 5.52466 6.17694 1 12 1C14.5182 1 16.8388 1.84618 18.6929 3.26971L12.327 6.94506L13.3224 3.23003L11.8735 2.8418L10.2153 9.03034L16.4039 10.6886L16.7921 9.23967L13.0768 8.24417L19.8746 4.31948C21.8085 6.30189 23 9.0118 23 12C23 15.3133 21.5351 18.2845 19.2176 20.3012ZM1.00017 11.9386C1.00006 11.959 1 11.9795 1 12C1 12.0205 1.00006 12.041 1.00017 12.0614V11.9386Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-bipolar_transistor-04': ObiBipolar_transistor04;
  }
}
