import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-paint-bucket')
export class ObiPaintBucket extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M19.4997 15.5C19.5116 15.5147 21.7495 18.2894 21.7497 19.6787C21.7496 20.9607 20.7423 21.9999 19.4997 22C18.2573 21.9999 17.2498 20.9607 17.2497 19.6787C17.25 18.291 19.483 15.5207 19.4997 15.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.737 10.7373C17.529 11.5293 17.9256 11.9252 18.074 12.3818C18.2044 12.7835 18.2035 13.2165 18.073 13.6182C17.9245 14.0747 17.529 14.471 16.737 15.2627L12.7615 19.2363C11.9694 20.0282 11.5736 20.4249 11.1169 20.5732C10.7153 20.7037 10.2822 20.7037 9.88059 20.5732C9.4241 20.4248 9.02785 20.0281 8.23606 19.2363L4.26243 15.2627C3.4706 14.4709 3.07494 14.0747 2.92649 13.6182C2.79597 13.2165 2.796 12.7835 2.92649 12.3818C3.07489 11.9253 3.47062 11.5292 4.26243 10.7373L9.08469 5.91406L6.58469 3.41406L7.99973 2L16.737 10.7373ZM4.82786 13H16.1716L10.4988 7.32812L4.82786 13Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.4997 15.5C19.5116 15.5147 21.7495 18.2894 21.7497 19.6787C21.7496 20.9607 20.7423 21.9999 19.4997 22C18.2573 21.9999 17.2498 20.9607 17.2497 19.6787C17.25 18.291 19.483 15.5207 19.4997 15.5Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.737 10.7373C17.529 11.5293 17.9256 11.9252 18.074 12.3818C18.2044 12.7835 18.2035 13.2165 18.073 13.6182C17.9245 14.0747 17.529 14.471 16.737 15.2627L12.7615 19.2363C11.9694 20.0282 11.5736 20.4249 11.1169 20.5732C10.7153 20.7037 10.2822 20.7037 9.88059 20.5732C9.4241 20.4248 9.02785 20.0281 8.23606 19.2363L4.26243 15.2627C3.4706 14.4709 3.07494 14.0747 2.92649 13.6182C2.79597 13.2165 2.796 12.7835 2.92649 12.3818C3.07489 11.9253 3.47062 11.5292 4.26243 10.7373L9.08469 5.91406L6.58469 3.41406L7.99973 2L16.737 10.7373ZM4.82786 13H16.1716L10.4988 7.32812L4.82786 13Z" style="fill: var(--element-active-color)"/>
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
    'obi-paint-bucket': ObiPaintBucket;
  }
}
