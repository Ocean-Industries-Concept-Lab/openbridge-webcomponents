import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-star-selected')
export class ObiStarSelected extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2L14.9095 8.99537L22.4616 9.60081L16.7077 14.5296L18.4656 21.8992L12 17.95L5.53431 21.8992L7.29222 14.5296L1.53833 9.60081L9.09041 8.99537L12 2Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2L14.9095 8.99537L22.4616 9.60081L16.7077 14.5296L18.4656 21.8992L12 17.95L5.53431 21.8992L7.29222 14.5296L1.53833 9.60081L9.09041 8.99537L12 2Z" style="fill: var(--element-active-color)"/>
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
    'obi-star-selected': ObiStarSelected;
  }
}