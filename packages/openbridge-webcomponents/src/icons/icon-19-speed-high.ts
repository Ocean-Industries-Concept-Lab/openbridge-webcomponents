import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-19-speed-high')
export class Obi19SpeedHigh extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 14C3.5 9.30558 7.30558 5.5 12 5.5C15.9943 5.5 19.3452 8.25516 20.2558 11.9687C20.6792 12.0608 21.0715 12.1468 21.4155 12.2226C21.5743 12.2576 21.7229 12.2904 21.8596 12.3207C21.0609 7.59738 16.9506 4 12 4C6.47715 4 2 8.47715 2 14C2 16.2516 2.74418 18.3295 4 20.001H20C20.9366 18.7543 21.5887 17.2816 21.8596 15.6793C21.7229 15.7096 21.5743 15.7424 21.4155 15.7774C21.0716 15.8531 20.6794 15.9391 20.2561 16.0312C20.039 16.9174 19.6829 17.7485 19.2121 18.501H4.78791C3.97151 17.1962 3.5 15.6548 3.5 14Z" fill="currentColor"/>
<path d="M12 16C10.8954 16 10 15.1046 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 22 14 22 14C22 14 13.1046 16 12 16Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 14C3.5 9.30558 7.30558 5.5 12 5.5C15.9943 5.5 19.3452 8.25516 20.2558 11.9687C20.6792 12.0608 21.0715 12.1468 21.4155 12.2226C21.5743 12.2576 21.7229 12.2904 21.8596 12.3207C21.0609 7.59738 16.9506 4 12 4C6.47715 4 2 8.47715 2 14C2 16.2516 2.74418 18.3295 4 20.001H20C20.9366 18.7543 21.5887 17.2816 21.8596 15.6793C21.7229 15.7096 21.5743 15.7424 21.4155 15.7774C21.0716 15.8531 20.6794 15.9391 20.2561 16.0312C20.039 16.9174 19.6829 17.7485 19.2121 18.501H4.78791C3.97151 17.1962 3.5 15.6548 3.5 14Z" style="fill: var(--element-active-color)"/>
<path d="M12 16C10.8954 16 10 15.1046 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 22 14 22 14C22 14 13.1046 16 12 16Z" style="fill: var(--element-active-color)"/>
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
    'obi-19-speed-high': Obi19SpeedHigh;
  }
}
