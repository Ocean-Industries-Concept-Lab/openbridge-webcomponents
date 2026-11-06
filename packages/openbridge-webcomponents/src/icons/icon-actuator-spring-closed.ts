import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-actuator-spring-closed')
export class ObiActuatorSpringClosed extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 24V16.0781C12 16.0322 12.0312 15.9922 12.0757 15.9811L15.6119 15.097C15.7129 15.0718 15.7129 14.9282 15.6119 14.903L8.38806 13.097C8.28706 13.0718 8.28706 12.9282 8.38806 12.903L15.6119 11.097C15.7129 11.0718 15.7129 10.9282 15.6119 10.903L8.38806 9.09703C8.28706 9.07178 8.28706 8.92825 8.38806 8.903L15.6119 7.09703C15.7129 7.07178 15.7129 6.92825 15.6119 6.903L8.38806 5.09703C8.28706 5.07178 8.28706 4.92825 8.38806 4.903L16 3" stroke-miterlimit="10.4334" stroke-linecap="round" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 24V16.0781C12 16.0322 12.0312 15.9922 12.0757 15.9811L15.6119 15.097C15.7129 15.0718 15.7129 14.9282 15.6119 14.903L8.38806 13.097C8.28706 13.0718 8.28706 12.9282 8.38806 12.903L15.6119 11.097C15.7129 11.0718 15.7129 10.9282 15.6119 10.903L8.38806 9.09703C8.28706 9.07178 8.28706 8.92825 8.38806 8.903L15.6119 7.09703C15.7129 7.07178 15.7129 6.92825 15.6119 6.903L8.38806 5.09703C8.28706 5.07178 8.28706 4.92825 8.38806 4.903L16 3" stroke-miterlimit="10.4334" stroke-linecap="round" style="stroke: var(--automation-symbol-off-line-color)"/>
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
    'obi-actuator-spring-closed': ObiActuatorSpringClosed;
  }
}
