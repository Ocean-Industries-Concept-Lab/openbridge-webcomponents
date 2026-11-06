import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-valve-corner-left-bottom-static')
export class ObiValveCornerLeftBottomStatic extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 6.92042C2 6.11147 2.91048 5.63735 3.57324 6.10109L9.5992 10.3188C9.76727 10.4364 9.96746 10.4995 10.1726 10.4995H12.5C13.0523 10.4995 13.5 10.9472 13.5 11.4995V13.8269C13.5 14.0321 13.5631 14.2323 13.6807 14.4003L17.8984 20.4263C18.3624 21.0891 17.8881 21.9995 17.0791 21.9995H6.9209C6.11187 21.9995 5.63762 21.0891 6.10156 20.4263L10.4117 14.2683C10.4692 14.1862 10.5 14.0883 10.5 13.9881C10.5 13.7183 10.2813 13.4995 10.0114 13.4995C9.91118 13.4995 9.81338 13.5304 9.73126 13.5878L3.57324 17.898C2.91046 18.3619 2 17.8877 2 17.0786V6.92042Z" fill="currentColor" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 6.92042C2 6.11147 2.91048 5.63735 3.57324 6.10109L9.5992 10.3188C9.76727 10.4364 9.96746 10.4995 10.1726 10.4995H12.5C13.0523 10.4995 13.5 10.9472 13.5 11.4995V13.8269C13.5 14.0321 13.5631 14.2323 13.6807 14.4003L17.8984 20.4263C18.3624 21.0891 17.8881 21.9995 17.0791 21.9995H6.9209C6.11187 21.9995 5.63762 21.0891 6.10156 20.4263L10.4117 14.2683C10.4692 14.1862 10.5 14.0883 10.5 13.9881C10.5 13.7183 10.2813 13.4995 10.0114 13.4995C9.91118 13.4995 9.81338 13.5304 9.73126 13.5878L3.57324 17.898C2.91046 18.3619 2 17.8877 2 17.0786V6.92042Z" style="fill: var(--automation-symbol-static-background-color); stroke: var(--automation-symbol-static-border-color)"/>
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
    'obi-valve-corner-left-bottom-static': ObiValveCornerLeftBottomStatic;
  }
}
