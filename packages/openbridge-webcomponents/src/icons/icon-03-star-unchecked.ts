import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-03-star-unchecked')
export class Obi03StarUnchecked extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 3.95297L14.217 9.28339L14.3929 9.70636L14.8496 9.74297L20.6042 10.2043L16.2198 13.96L15.8719 14.2581L15.9781 14.7037L17.3177 20.3192L12.3909 17.3099L12 17.0712L11.609 17.3099L6.68224 20.3192L8.02175 14.7037L8.12804 14.2581L7.78014 13.96L3.39571 10.2043L9.15035 9.74297L9.60698 9.70636L9.7829 9.28339L12 3.95297Z" stroke="#1A1A1A" stroke-width="1.5"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 3.95297L14.217 9.28339L14.3929 9.70636L14.8496 9.74297L20.6042 10.2043L16.2198 13.96L15.8719 14.2581L15.9781 14.7037L17.3177 20.3192L12.3909 17.3099L12 17.0712L11.609 17.3099L6.68224 20.3192L8.02175 14.7037L8.12804 14.2581L7.78014 13.96L3.39571 10.2043L9.15035 9.74297L9.60698 9.70636L9.7829 9.28339L12 3.95297Z" style="stroke: var(--element-active-color)" stroke-width="1.5"/>
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
    'obi-03-star-unchecked': Obi03StarUnchecked;
  }
}
