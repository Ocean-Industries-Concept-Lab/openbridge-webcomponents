import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-converter-filter-1-on')
export class ObiConverterFilter1On extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="25" height="25" viewBox="0 0 25 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.8817 11.9831L9.89317 10.1152V11.9831H12.8817Z" fill="currentColor"/>
<path d="M9.89317 13.0244V14.8923L12.8817 13.0244H9.89317Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.4898 1.47325L1.61391 12.3492L12.6514 23.3867L23.5273 12.5108L12.4898 1.47325ZM16.4018 11.9831L20.8277 11.9831V13.0244L16.4018 13.0244L16.4018 17.7107H14.8398L14.8397 13.6428L8.33109 17.7107L8.33109 13.0244L4.16554 13.0244V11.9831L8.33109 11.9831V7.29682L14.8397 11.3647V7.29682H16.4018L16.4018 11.9831Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.8277 11.9825L16.4018 11.9825L16.4018 7.29631H14.8397V11.3642L8.33102 7.29631V11.9825L4.16548 11.9825V13.0239L8.33102 13.0239L8.33102 17.7102L14.8397 13.6423L14.8397 17.7102H16.4018L16.4018 13.0239L20.8277 13.0239V11.9825ZM9.8931 10.1147L12.8817 11.9825H9.8931V10.1147ZM9.8931 14.8918V13.0239H12.8817L9.8931 14.8918Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.6514 24.8589L0.141106 12.3487L12.4898 0L25 12.5103L12.6514 24.8589ZM1.61385 12.3487L12.4898 1.47274L23.5273 12.5103L12.6514 23.3862L1.61385 12.3487Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.8817 11.9831L9.89317 10.1152V11.9831H12.8817Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M9.89317 13.0244V14.8923L12.8817 13.0244H9.89317Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.4898 1.47325L1.61391 12.3492L12.6514 23.3867L23.5273 12.5108L12.4898 1.47325ZM16.4018 11.9831L20.8277 11.9831V13.0244L16.4018 13.0244L16.4018 17.7107H14.8398L14.8397 13.6428L8.33109 17.7107L8.33109 13.0244L4.16554 13.0244V11.9831L8.33109 11.9831V7.29682L14.8397 11.3647V7.29682H16.4018L16.4018 11.9831Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.8277 11.9825L16.4018 11.9825L16.4018 7.29631H14.8397V11.3642L8.33102 7.29631V11.9825L4.16548 11.9825V13.0239L8.33102 13.0239L8.33102 17.7102L14.8397 13.6423L14.8397 17.7102H16.4018L16.4018 13.0239L20.8277 13.0239V11.9825ZM9.8931 10.1147L12.8817 11.9825H9.8931V10.1147ZM9.8931 14.8918V13.0239H12.8817L9.8931 14.8918Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.6514 24.8589L0.141106 12.3487L12.4898 0L25 12.5103L12.6514 24.8589ZM1.61385 12.3487L12.4898 1.47274L23.5273 12.5103L12.6514 23.3862L1.61385 12.3487Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-converter-filter-1-on': ObiConverterFilter1On;
  }
}
