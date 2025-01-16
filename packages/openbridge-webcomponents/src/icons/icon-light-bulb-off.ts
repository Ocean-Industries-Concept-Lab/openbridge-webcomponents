import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-bulb-off')
export class ObiLightBulbOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 22C14.3539 22 16.5178 21.1867 18.2262 19.8258L12.0006 13.6002L5.77452 19.8263C7.48273 21.1869 9.64641 22 12 22Z" fill="currentColor"/>
<path d="M13.6006 12.0002L19.8261 18.2257C21.1868 16.5175 22 14.3537 22 12C22 9.64641 21.1869 7.48273 19.8263 5.77452L13.6006 12.0002Z" fill="currentColor"/>
<path d="M12.0006 10.4002L18.2264 4.17443C16.5181 2.81338 14.354 2 12 2C9.64629 2 7.48251 2.81317 5.77427 4.17389L12.0006 10.4002Z" fill="currentColor"/>
<path d="M2 12C2 9.6461 2.8133 7.48216 4.17423 5.77385L10.4006 12.0002L4.17443 18.2264C2.81338 16.5181 2 14.354 2 12Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM18.2262 19.8258C16.5178 21.1867 14.3539 22 12 22C9.64641 22 7.48273 21.1869 5.77452 19.8263L12.0006 13.6002L18.2262 19.8258ZM19.8261 18.2257L13.6006 12.0002L19.8263 5.77452C21.1869 7.48273 22 9.64641 22 12C22 14.3537 21.1868 16.5175 19.8261 18.2257ZM18.2264 4.17443L12.0006 10.4002L5.77427 4.17389C7.48251 2.81317 9.64629 2 12 2C14.354 2 16.5181 2.81338 18.2264 4.17443ZM4.17423 5.77385C2.8133 7.48216 2 9.6461 2 12C2 14.354 2.81338 16.5181 4.17443 18.2264L10.4006 12.0002L4.17423 5.77385Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 22C14.3539 22 16.5178 21.1867 18.2262 19.8258L12.0006 13.6002L5.77452 19.8263C7.48273 21.1869 9.64641 22 12 22Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M13.6006 12.0002L19.8261 18.2257C21.1868 16.5175 22 14.3537 22 12C22 9.64641 21.1869 7.48273 19.8263 5.77452L13.6006 12.0002Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M12.0006 10.4002L18.2264 4.17443C16.5181 2.81338 14.354 2 12 2C9.64629 2 7.48251 2.81317 5.77427 4.17389L12.0006 10.4002Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M2 12C2 9.6461 2.8133 7.48216 4.17423 5.77385L10.4006 12.0002L4.17443 18.2264C2.81338 16.5181 2 14.354 2 12Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM18.2262 19.8258C16.5178 21.1867 14.3539 22 12 22C9.64641 22 7.48273 21.1869 5.77452 19.8263L12.0006 13.6002L18.2262 19.8258ZM19.8261 18.2257L13.6006 12.0002L19.8263 5.77452C21.1869 7.48273 22 9.64641 22 12C22 14.3537 21.1868 16.5175 19.8261 18.2257ZM18.2264 4.17443L12.0006 10.4002L5.77427 4.17389C7.48251 2.81317 9.64629 2 12 2C14.354 2 16.5181 2.81338 18.2264 4.17443ZM4.17423 5.77385C2.8133 7.48216 2 9.6461 2 12C2 14.354 2.81338 16.5181 4.17443 18.2264L10.4006 12.0002L4.17423 5.77385Z" style="fill: var(--undefined)"/>
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
    'obi-light-bulb-off': ObiLightBulbOff;
  }
}
