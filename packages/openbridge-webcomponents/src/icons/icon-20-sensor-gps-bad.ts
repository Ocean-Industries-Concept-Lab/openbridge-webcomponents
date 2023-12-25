import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-20-sensor-gps-bad')
export class Obi20SensorGpsBad extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.40381 1.03996C7.01328 0.649439 6.38012 0.649439 5.98959 1.03996L3.86827 3.16128C3.47775 3.55181 3.47775 4.18497 3.86827 4.5755L8.11091 8.81814C8.50119 9.20841 9.13379 9.20866 9.52438 8.81889L9.87868 8.46458L10.5858 9.17169L9.17157 10.5859C9.02306 10.7344 8.93103 10.918 8.89547 11.11C8.83753 11.4229 8.92956 11.7581 9.17157 12.0001L12 14.8285C12.242 15.0706 12.5772 15.1626 12.8901 15.1046C13.0821 15.0691 13.2657 14.9771 13.4142 14.8285L14.8284 13.4143L15.5355 14.1214L15.182 14.475C14.7915 14.8655 14.7915 15.4987 15.182 15.8892L19.4246 20.1318C19.8151 20.5224 20.4483 20.5224 20.8388 20.1318L22.9602 18.0105C23.3507 17.62 23.3507 16.9868 22.9602 16.5963L18.7175 12.3537C18.327 11.9631 17.6938 11.9631 17.3033 12.3537L16.9497 12.7072L16.2426 12.0001L19.0711 9.17169C19.4616 8.78117 19.4616 8.148 19.0711 7.75748L16.2426 4.92905C15.8521 4.53853 15.219 4.53853 14.8284 4.92905L12 7.75748L11.2929 7.05037L11.6472 6.69607C12.037 6.30549 12.0367 5.67288 11.6464 5.2826L7.40381 1.03996ZM15.5355 7.05037L16.9497 8.46458L12.7071 12.7072L11.2929 11.293L15.5355 7.05037Z" fill="currentColor"/>
<path d="M4.41384 14.0001L2.99963 15.4143L5.12072 17.5354L2.99902 19.6571L4.41324 21.0713L6.53493 18.9496L8.65648 21.0712L10.0707 19.657L7.94915 17.5354L10.0701 15.4145L8.65588 14.0003L6.53493 16.1212L4.41384 14.0001Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.40381 1.03996C7.01328 0.649439 6.38012 0.649439 5.98959 1.03996L3.86827 3.16128C3.47775 3.55181 3.47775 4.18497 3.86827 4.5755L8.11091 8.81814C8.50119 9.20841 9.13379 9.20866 9.52438 8.81889L9.87868 8.46458L10.5858 9.17169L9.17157 10.5859C9.02306 10.7344 8.93103 10.918 8.89547 11.11C8.83753 11.4229 8.92956 11.7581 9.17157 12.0001L12 14.8285C12.242 15.0706 12.5772 15.1626 12.8901 15.1046C13.0821 15.0691 13.2657 14.9771 13.4142 14.8285L14.8284 13.4143L15.5355 14.1214L15.182 14.475C14.7915 14.8655 14.7915 15.4987 15.182 15.8892L19.4246 20.1318C19.8151 20.5224 20.4483 20.5224 20.8388 20.1318L22.9602 18.0105C23.3507 17.62 23.3507 16.9868 22.9602 16.5963L18.7175 12.3537C18.327 11.9631 17.6938 11.9631 17.3033 12.3537L16.9497 12.7072L16.2426 12.0001L19.0711 9.17169C19.4616 8.78117 19.4616 8.148 19.0711 7.75748L16.2426 4.92905C15.8521 4.53853 15.219 4.53853 14.8284 4.92905L12 7.75748L11.2929 7.05037L11.6472 6.69607C12.037 6.30549 12.0367 5.67288 11.6464 5.2826L7.40381 1.03996ZM15.5355 7.05037L16.9497 8.46458L12.7071 12.7072L11.2929 11.293L15.5355 7.05037Z" fill="currentColor"/>
<path d="M4.41384 14.0001L2.99963 15.4143L5.12072 17.5354L2.99902 19.6571L4.41324 21.0713L6.53493 18.9496L8.65648 21.0712L10.0707 19.657L7.94915 17.5354L10.0701 15.4145L8.65588 14.0003L6.53493 16.1212L4.41384 14.0001Z" fill="currentColor"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${this.useCssColor ? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: var(--size);
      width: var(--size);
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-20-sensor-gps-bad': Obi20SensorGpsBad;
  }
}
