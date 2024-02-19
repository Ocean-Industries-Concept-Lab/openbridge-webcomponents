import {LitElement, html, css, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-wiper')
export class Obi08Wiper extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.8815 7.00003C14.3389 6.9961 16.7766 7.38598 19.1029 8.15092L16.7791 13.5752C15.1956 13.1066 13.5493 12.8684 11.8909 12.871C11.4934 12.8717 11.0967 12.8861 10.7013 12.9143L11.249 14.8858C11.4637 14.8763 11.6788 14.8714 11.8941 14.871C13.9493 14.8678 15.9836 15.2832 17.8729 16.0921L17.876 16.0935L21.7632 7.02003L21.7617 7.01938C21.1476 6.75636 20.5243 6.51849 19.8932 6.30609C17.3149 5.43827 14.6078 4.99566 11.8783 5.00003C9.14891 5.0044 6.44322 5.45567 3.86766 6.33174C3.23678 6.54633 2.6137 6.78641 2 7.05165L5.91616 16.1126C6.67519 15.7845 7.45791 15.5201 8.25624 15.3209L7.72079 13.3933C7.48089 13.4539 7.24225 13.5198 7.00505 13.5908L4.6639 8.17403C6.98771 7.40164 9.42417 7.00396 11.8815 7.00003Z" fill="currentColor"/>
<path d="M9.70479 16.7994C9.52761 16.9798 9.41833 17.2271 9.41833 17.5C9.41833 18.0523 9.86605 18.5 10.4183 18.5C10.9706 18.5 11.4183 18.0523 11.4183 17.5C11.4183 17.034 11.0996 16.6425 10.6682 16.5315L8.4001 8.36621L7.43658 8.63385L9.70479 16.7994Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.8815 7.00003C14.3389 6.9961 16.7766 7.38598 19.1029 8.15092L16.7791 13.5752C15.1956 13.1066 13.5493 12.8684 11.8909 12.871C11.4934 12.8717 11.0967 12.8861 10.7013 12.9143L11.249 14.8858C11.4637 14.8763 11.6788 14.8714 11.8941 14.871C13.9493 14.8678 15.9836 15.2832 17.8729 16.0921L17.876 16.0935L21.7632 7.02003L21.7617 7.01938C21.1476 6.75636 20.5243 6.51849 19.8932 6.30609C17.3149 5.43827 14.6078 4.99566 11.8783 5.00003C9.14891 5.0044 6.44322 5.45567 3.86766 6.33174C3.23678 6.54633 2.6137 6.78641 2 7.05165L5.91616 16.1126C6.67519 15.7845 7.45791 15.5201 8.25624 15.3209L7.72079 13.3933C7.48089 13.4539 7.24225 13.5198 7.00505 13.5908L4.6639 8.17403C6.98771 7.40164 9.42417 7.00396 11.8815 7.00003Z" style="fill: var(--element-active-color)"/>
<path d="M9.70479 16.7994C9.52761 16.9798 9.41833 17.2271 9.41833 17.5C9.41833 18.0523 9.86605 18.5 10.4183 18.5C10.9706 18.5 11.4183 18.0523 11.4183 17.5C11.4183 17.034 11.0996 16.6425 10.6682 16.5315L8.4001 8.36621L7.43658 8.63385L9.70479 16.7994Z" style="fill: var(--element-active-color)"/>
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
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-08-wiper': Obi08Wiper;
  }
}
