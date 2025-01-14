import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-speed-good')
export class ObiSpeedGood extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 14C2 9.00924 5.65598 4.87241 10.4358 4.12158C10.2776 4.83217 10.131 5.54553 9.97898 6.25746C6.53919 7.15283 4 10.2799 4 14C4 15.4597 4.38939 16.8247 5.0704 18.001H18.9296C19.6106 16.8247 20 15.4597 20 14C20 10.2799 17.4608 7.15283 14.021 6.25746C13.869 5.54553 13.7224 4.83217 13.5642 4.12158C15.3566 4.40314 16.991 5.16086 18.3338 6.2612C20.5719 8.09511 22 10.8808 22 14C22 16.2516 21.2558 18.3295 20 20.0009L4 20.001C2.74418 18.3295 2 16.2516 2 14Z" fill="currentColor"/>
<path d="M12 16C13.1046 16 14 15.1046 14 14C14 13.1349 12.7733 7.49116 12.2413 5.08447C12.1837 4.82404 11.8163 4.82404 11.7587 5.08446C11.2267 7.49116 10 13.1349 10 14C10 15.1046 10.8954 16 12 16Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 14C2 9.00924 5.65598 4.87241 10.4358 4.12158C10.2776 4.83217 10.131 5.54553 9.97898 6.25746C6.53919 7.15283 4 10.2799 4 14C4 15.4597 4.38939 16.8247 5.0704 18.001H18.9296C19.6106 16.8247 20 15.4597 20 14C20 10.2799 17.4608 7.15283 14.021 6.25746C13.869 5.54553 13.7224 4.83217 13.5642 4.12158C15.3566 4.40314 16.991 5.16086 18.3338 6.2612C20.5719 8.09511 22 10.8808 22 14C22 16.2516 21.2558 18.3295 20 20.0009L4 20.001C2.74418 18.3295 2 16.2516 2 14Z" style="fill: var(--element-active-color)"/>
<path d="M12 16C13.1046 16 14 15.1046 14 14C14 13.1349 12.7733 7.49116 12.2413 5.08447C12.1837 4.82404 11.8163 4.82404 11.7587 5.08446C11.2267 7.49116 10 13.1349 10 14C10 15.1046 10.8954 16 12 16Z" style="fill: var(--element-active-color)"/>
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
    'obi-speed-good': ObiSpeedGood;
  }
}