import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-19-speed-low')
export class Obi19SpeedLow extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 12C13.1046 12 14 12.8954 14 14C14 15.1046 13.1046 16 12 16C10.8954 16 2 14 2 14C2 14 10.8954 12 12 12Z" fill="currentColor"/>
<path d="M3.69115 12.1991C4.51723 8.36969 7.92349 5.5 12 5.5C16.6944 5.5 20.5 9.30558 20.5 14C20.5 15.6548 20.0285 17.1962 19.2121 18.501H4.78792C4.27653 17.6836 3.90047 16.7735 3.69085 15.8008C3.65491 15.7929 3.61946 15.7851 3.5845 15.7774C3.15753 15.6833 2.80452 15.6049 2.55811 15.55L2.17097 15.4635C2.14839 15.4584 2.12603 15.4528 2.1039 15.4468C2.34915 17.1391 3.01822 18.6942 4.00001 20.001H20C21.2558 18.3295 22 16.2516 22 14C22 8.47715 17.5229 4 12 4C6.9685 4 2.8049 7.71597 2.1039 12.5532C2.12603 12.5472 2.14839 12.5416 2.17097 12.5365L2.55811 12.45C2.80452 12.3951 3.15753 12.3167 3.5845 12.2226C3.61956 12.2149 3.65511 12.2071 3.69115 12.1991Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 12C13.1046 12 14 12.8954 14 14C14 15.1046 13.1046 16 12 16C10.8954 16 2 14 2 14C2 14 10.8954 12 12 12Z" style="fill: var(--element-active-color)"/>
<path d="M3.69115 12.1991C4.51723 8.36969 7.92349 5.5 12 5.5C16.6944 5.5 20.5 9.30558 20.5 14C20.5 15.6548 20.0285 17.1962 19.2121 18.501H4.78792C4.27653 17.6836 3.90047 16.7735 3.69085 15.8008C3.65491 15.7929 3.61946 15.7851 3.5845 15.7774C3.15753 15.6833 2.80452 15.6049 2.55811 15.55L2.17097 15.4635C2.14839 15.4584 2.12603 15.4528 2.1039 15.4468C2.34915 17.1391 3.01822 18.6942 4.00001 20.001H20C21.2558 18.3295 22 16.2516 22 14C22 8.47715 17.5229 4 12 4C6.9685 4 2.8049 7.71597 2.1039 12.5532C2.12603 12.5472 2.14839 12.5416 2.17097 12.5365L2.55811 12.45C2.80452 12.3951 3.15753 12.3167 3.5845 12.2226C3.61956 12.2149 3.65511 12.2071 3.69115 12.1991Z" style="fill: var(--element-active-color)"/>
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
    'obi-19-speed-low': Obi19SpeedLow;
  }
}
