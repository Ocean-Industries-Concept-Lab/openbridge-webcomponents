import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-truemotion-variant')
export class Obi07TruemotionVariant extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8.91952 10.3233L8.89227 10.3507L2.00012 17.2428L4.75729 20L11.6609 13.0964L11.6768 13.0806L11.6926 13.0647L11.7097 13.0477C11.7181 13.0393 11.7265 13.031 11.7348 13.0225C12.9653 11.7609 13.5876 10.1052 13.6213 8.37878C11.8948 8.41248 10.2392 9.03488 8.97761 10.2654L8.95999 10.2829L8.947 10.296L8.91952 10.3233Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 20.0001C19.6568 20.0001 21 18.657 21 17.0001C21 15.3433 19.6568 14.0001 18 14.0001C16.3431 14.0001 15 15.3433 15 17.0001C15 18.657 16.3431 20.0001 18 20.0001ZM18 19.0001C19.1046 19.0001 20 18.1047 20 17.0001C20 15.8956 19.1046 15.0001 18 15.0001C16.8954 15.0001 16 15.8956 16 17.0001C16 18.1047 16.8954 19.0001 18 19.0001Z" fill="currentColor"/>
<path d="M20.8378 1.44336L14.7528 2.11953L16.8023 4.16895L14.7602 6.21105L16.1744 7.62526L18.2165 5.58316L20.1616 7.52834L20.8378 1.44336Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.91952 10.3233L8.89227 10.3507L2.00012 17.2428L4.75729 20L11.6609 13.0964L11.6768 13.0806L11.6926 13.0647L11.7097 13.0477C11.7181 13.0393 11.7265 13.031 11.7348 13.0225C12.9653 11.7609 13.5876 10.1052 13.6213 8.37878C11.8948 8.41248 10.2392 9.03488 8.97761 10.2654L8.95999 10.2829L8.947 10.296L8.91952 10.3233Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 20.0001C19.6568 20.0001 21 18.657 21 17.0001C21 15.3433 19.6568 14.0001 18 14.0001C16.3431 14.0001 15 15.3433 15 17.0001C15 18.657 16.3431 20.0001 18 20.0001ZM18 19.0001C19.1046 19.0001 20 18.1047 20 17.0001C20 15.8956 19.1046 15.0001 18 15.0001C16.8954 15.0001 16 15.8956 16 17.0001C16 18.1047 16.8954 19.0001 18 19.0001Z" style="fill: var(--element-active-color)"/>
<path d="M20.8378 1.44336L14.7528 2.11953L16.8023 4.16895L14.7602 6.21105L16.1744 7.62526L18.2165 5.58316L20.1616 7.52834L20.8378 1.44336Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-truemotion-variant': Obi07TruemotionVariant;
  }
}
