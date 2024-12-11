import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-radar-target-acquisition-state-auto-iec')
export class ObiRadarTargetAcquisitionStateAutoIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 6C11.0531 6 10.1197 6.22409 9.27605 6.65396L8.36806 4.87195C9.49295 4.29879 10.7375 4 12 4C13.2625 4 14.507 4.29879 15.6319 4.87195L14.7239 6.65396C13.8803 6.22409 12.9469 6 12 6Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.7062 10.1461C17.4136 9.24557 16.912 8.42709 16.2425 7.75755L17.6567 6.34334C18.5494 7.23605 19.2182 8.32737 19.6083 9.52806C19.9984 10.7288 20.0989 12.0047 19.9014 13.2517L17.926 12.9388C18.0741 12.0036 17.9988 11.0466 17.7062 10.1461Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.29354 10.146C6.00094 11.0465 5.92563 12.0035 6.07375 12.9387L4.09837 13.2516C3.90088 12.0046 4.0013 10.7287 4.39143 9.52797C4.78156 8.32728 5.45031 7.23596 6.34303 6.34325L7.75724 7.75747C7.08771 8.427 6.58614 9.24549 6.29354 10.146Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.5266 16.8542C16.2926 16.2977 16.916 15.5677 17.3459 14.7241L19.1279 15.632C18.5548 16.7569 17.7235 17.7302 16.7022 18.4722C15.6808 19.2143 14.4983 19.7041 13.2514 19.9016L12.9385 17.9262C13.8737 17.7781 14.7606 17.4108 15.5266 16.8542Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.47315 16.8541C9.23918 17.4107 10.126 17.778 11.0613 17.9261L10.7484 19.9015C9.50145 19.704 8.31895 19.2142 7.29758 18.4721C6.27621 17.7301 5.44497 16.7568 4.87181 15.6319L6.65382 14.724C7.08369 15.5676 7.70712 16.2976 8.47315 16.8541Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 6C11.0531 6 10.1197 6.22409 9.27605 6.65396L8.36806 4.87195C9.49295 4.29879 10.7375 4 12 4C13.2625 4 14.507 4.29879 15.6319 4.87195L14.7239 6.65396C13.8803 6.22409 12.9469 6 12 6Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.7062 10.1461C17.4136 9.24557 16.912 8.42709 16.2425 7.75755L17.6567 6.34334C18.5494 7.23605 19.2182 8.32737 19.6083 9.52806C19.9984 10.7288 20.0989 12.0047 19.9014 13.2517L17.926 12.9388C18.0741 12.0036 17.9988 11.0466 17.7062 10.1461Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.29354 10.146C6.00094 11.0465 5.92563 12.0035 6.07375 12.9387L4.09837 13.2516C3.90088 12.0046 4.0013 10.7287 4.39143 9.52797C4.78156 8.32728 5.45031 7.23596 6.34303 6.34325L7.75724 7.75747C7.08771 8.427 6.58614 9.24549 6.29354 10.146Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.5266 16.8542C16.2926 16.2977 16.916 15.5677 17.3459 14.7241L19.1279 15.632C18.5548 16.7569 17.7235 17.7302 16.7022 18.4722C15.6808 19.2143 14.4983 19.7041 13.2514 19.9016L12.9385 17.9262C13.8737 17.7781 14.7606 17.4108 15.5266 16.8542Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.47315 16.8541C9.23918 17.4107 10.126 17.778 11.0613 17.9261L10.7484 19.9015C9.50145 19.704 8.31895 19.2142 7.29758 18.4721C6.27621 17.7301 5.44497 16.7568 4.87181 15.6319L6.65382 14.724C7.08369 15.5676 7.70712 16.2976 8.47315 16.8541Z" style="fill: var(--element-active-color)"/>
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
