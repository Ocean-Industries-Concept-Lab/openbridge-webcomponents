import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-stw')
export class ObiStw extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M18 7L14 3H11L15 7L11 11H14L18 7Z" fill="currentColor"/>
<path d="M6 3H9L13 7L9 11H6L10 7L6 3Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.58291 15.8135C7.85211 16.0987 8.10922 16.3937 8.40666 16.6497C9.39829 17.5034 10.6731 18.1253 12 18.1253C13.3269 18.1253 14.6017 17.5034 15.5933 16.6497C15.8908 16.3937 16.1479 16.0987 16.4171 15.8135C16.7489 16.0789 17.0696 16.3493 17.4229 16.5848C18.7658 17.4801 20.3708 18.1253 22 18.1253V19.8753C20.0688 19.8753 18.1743 19.1592 16.5672 18.1166C15.2832 19.163 13.6748 19.8753 12 19.8753C10.3252 19.8753 8.7168 19.163 7.4328 18.1166C5.82574 19.1592 3.93116 19.8753 2 19.8753V18.1253C3.6292 18.1253 5.23419 17.4801 6.57714 16.5848C6.93011 16.3495 7.25151 16.0786 7.58291 15.8135Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 7L14 3H11L15 7L11 11H14L18 7Z" style="fill: var(--element-active-color)"/>
<path d="M6 3H9L13 7L9 11H6L10 7L6 3Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.58291 15.8135C7.85211 16.0987 8.10922 16.3937 8.40666 16.6497C9.39829 17.5034 10.6731 18.1253 12 18.1253C13.3269 18.1253 14.6017 17.5034 15.5933 16.6497C15.8908 16.3937 16.1479 16.0987 16.4171 15.8135C16.7489 16.0789 17.0696 16.3493 17.4229 16.5848C18.7658 17.4801 20.3708 18.1253 22 18.1253V19.8753C20.0688 19.8753 18.1743 19.1592 16.5672 18.1166C15.2832 19.163 13.6748 19.8753 12 19.8753C10.3252 19.8753 8.7168 19.163 7.4328 18.1166C5.82574 19.1592 3.93116 19.8753 2 19.8753V18.1253C3.6292 18.1253 5.23419 17.4801 6.57714 16.5848C6.93011 16.3495 7.25151 16.0786 7.58291 15.8135Z" style="fill: var(--element-active-color)"/>
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
    'obi-stw': ObiStw;
  }
}