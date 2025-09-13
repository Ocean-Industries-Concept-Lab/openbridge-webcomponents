import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-radar-target-acquisition-state-auto-iec')
export class ObiRadarTargetAcquisitionStateAutoIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 6C11.0532 6 10.1198 6.22409 9.27617 6.65396L8.36819 4.87195C9.49307 4.29879 10.7376 4 12.0001 4C13.2626 4 14.5072 4.29879 15.632 4.87195L14.7241 6.65396C13.8804 6.22409 12.947 6 12.0001 6Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.7063 10.1461C17.4137 9.24557 16.9121 8.42709 16.2426 7.75755L17.6568 6.34334C18.5495 7.23605 19.2183 8.32737 19.6084 9.52806C19.9986 10.7288 20.099 12.0047 19.9015 13.2517L17.9261 12.9388C18.0742 12.0036 17.9989 11.0466 17.7063 10.1461Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.29366 10.146C6.00107 11.0465 5.92575 12.0035 6.07387 12.9387L4.09849 13.2516C3.901 12.0046 4.00142 10.7287 4.39155 9.52797C4.78168 8.32728 5.45044 7.23596 6.34315 6.34325L7.75736 7.75747C7.08783 8.427 6.58626 9.24549 6.29366 10.146Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.5267 16.8542C16.2927 16.2977 16.9162 15.5677 17.346 14.7241L19.1281 15.632C18.5549 16.7569 17.7237 17.7302 16.7023 18.4722C15.6809 19.2143 14.4984 19.7041 13.2515 19.9016L12.9386 17.9262C13.8738 17.7781 14.7607 17.4108 15.5267 16.8542Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.47327 16.8541C9.2393 17.4107 10.1262 17.778 11.0614 17.9261L10.7485 19.9015C9.50157 19.704 8.31907 19.2142 7.2977 18.4721C6.27633 17.7301 5.44509 16.7568 4.87193 15.6319L6.65395 14.724C7.08381 15.5676 7.70724 16.2976 8.47327 16.8541Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 6C11.0532 6 10.1198 6.22409 9.27617 6.65396L8.36819 4.87195C9.49307 4.29879 10.7376 4 12.0001 4C13.2626 4 14.5072 4.29879 15.632 4.87195L14.7241 6.65396C13.8804 6.22409 12.947 6 12.0001 6Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.7063 10.1461C17.4137 9.24557 16.9121 8.42709 16.2426 7.75755L17.6568 6.34334C18.5495 7.23605 19.2183 8.32737 19.6084 9.52806C19.9986 10.7288 20.099 12.0047 19.9015 13.2517L17.9261 12.9388C18.0742 12.0036 17.9989 11.0466 17.7063 10.1461Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.29366 10.146C6.00107 11.0465 5.92575 12.0035 6.07387 12.9387L4.09849 13.2516C3.901 12.0046 4.00142 10.7287 4.39155 9.52797C4.78168 8.32728 5.45044 7.23596 6.34315 6.34325L7.75736 7.75747C7.08783 8.427 6.58626 9.24549 6.29366 10.146Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.5267 16.8542C16.2927 16.2977 16.9162 15.5677 17.346 14.7241L19.1281 15.632C18.5549 16.7569 17.7237 17.7302 16.7023 18.4722C15.6809 19.2143 14.4984 19.7041 13.2515 19.9016L12.9386 17.9262C13.8738 17.7781 14.7607 17.4108 15.5267 16.8542Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.47327 16.8541C9.2393 17.4107 10.1262 17.778 11.0614 17.9261L10.7485 19.9015C9.50157 19.704 8.31907 19.2142 7.2977 18.4721C6.27633 17.7301 5.44509 16.7568 4.87193 15.6319L6.65395 14.724C7.08381 15.5676 7.70724 16.2976 8.47327 16.8541Z" style="fill: var(--element-active-color)"/>
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
    'obi-radar-target-acquisition-state-auto-iec': ObiRadarTargetAcquisitionStateAutoIec;
  }
}
