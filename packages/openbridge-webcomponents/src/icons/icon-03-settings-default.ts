import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-03-settings-default')
export class Obi03SettingsDefault extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.3989 9C20.3989 9.238 20.3773 9.462 20.3485 9.686L21.8669 10.841C22.0037 10.946 22.0396 11.135 21.9533 11.289L20.514 13.711C20.4277 13.865 20.2405 13.928 20.075 13.865L18.2831 13.165C17.9089 13.438 17.5059 13.676 17.0669 13.851L16.7935 15.706C16.7719 15.874 16.6208 16 16.4409 16H13.5623C13.3824 16 13.2313 15.874 13.2097 15.706L12.9362 13.851C12.4973 13.676 12.0943 13.445 11.72 13.165L9.92815 13.865C9.76983 13.921 9.57552 13.865 9.48917 13.711L8.04989 11.289C7.96354 11.135 7.99952 10.946 8.13625 10.841L9.65468 9.686C9.6259 9.462 9.60431 9.231 9.60431 9C9.60431 8.769 9.6259 8.538 9.65468 8.314L8.13625 7.159C7.99952 7.054 7.95634 6.865 8.04989 6.711L9.48917 4.289C9.57552 4.135 9.76263 4.072 9.92815 4.135L11.72 4.835C12.0943 4.562 12.4973 4.324 12.9362 4.149L13.2097 2.294C13.2313 2.126 13.3824 2 13.5623 2H16.4409C16.6208 2 16.7719 2.126 16.7935 2.294L17.0669 4.149C17.5059 4.324 17.9089 4.555 18.2831 4.835L20.075 4.135C20.2334 4.079 20.4277 4.135 20.514 4.289L21.9533 6.711C22.0396 6.865 22.0037 7.054 21.8669 7.159L20.3485 8.314C20.3773 8.538 20.3989 8.762 20.3989 9ZM12.4829 9C12.4829 10.351 13.6127 11.45 15.0016 11.45C16.3905 11.45 17.5203 10.351 17.5203 9C17.5203 7.649 16.3905 6.55 15.0016 6.55C13.6127 6.55 12.4829 7.649 12.4829 9Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.9707 17.5C9.9707 17.653 9.95682 17.797 9.93832 17.941L10.9145 18.6835C11.0024 18.751 11.0255 18.8725 10.97 18.9715L10.0447 20.5285C9.98921 20.6275 9.86892 20.668 9.76252 20.6275L8.61059 20.1775C8.37002 20.353 8.11095 20.506 7.82875 20.6185L7.65296 21.811C7.63908 21.919 7.54193 22 7.42627 22H5.57577C5.46012 22 5.36297 21.919 5.34909 21.811L5.17329 20.6185C4.89109 20.506 4.63202 20.3575 4.39146 20.1775L3.23952 20.6275C3.13775 20.6635 3.01284 20.6275 2.95732 20.5285L2.03207 18.9715C1.97656 18.8725 1.99969 18.751 2.08759 18.6835L3.06373 17.941C3.04522 17.797 3.03134 17.6485 3.03134 17.5C3.03134 17.3515 3.04522 17.203 3.06373 17.059L2.08759 16.3165C1.99969 16.249 1.97193 16.1275 2.03207 16.0285L2.95732 14.4715C3.01284 14.3725 3.13312 14.332 3.23952 14.3725L4.39146 14.8225C4.63202 14.647 4.89109 14.494 5.17329 14.3815L5.34909 13.189C5.36297 13.081 5.46012 13 5.57577 13H7.42627C7.54193 13 7.63908 13.081 7.65296 13.189L7.82875 14.3815C8.11095 14.494 8.37002 14.6425 8.61059 14.8225L9.76252 14.3725C9.8643 14.3365 9.98921 14.3725 10.0447 14.4715L10.97 16.0285C11.0255 16.1275 11.0024 16.249 10.9145 16.3165L9.93832 17.059C9.95682 17.203 9.9707 17.347 9.9707 17.5ZM4.88183 17.5C4.88183 18.3685 5.60815 19.075 6.50102 19.075C7.39388 19.075 8.1202 18.3685 8.1202 17.5C8.1202 16.6315 7.39388 15.925 6.50102 15.925C5.60815 15.925 4.88183 16.6315 4.88183 17.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.3989 9C20.3989 9.238 20.3773 9.462 20.3485 9.686L21.8669 10.841C22.0037 10.946 22.0396 11.135 21.9533 11.289L20.514 13.711C20.4277 13.865 20.2405 13.928 20.075 13.865L18.2831 13.165C17.9089 13.438 17.5059 13.676 17.0669 13.851L16.7935 15.706C16.7719 15.874 16.6208 16 16.4409 16H13.5623C13.3824 16 13.2313 15.874 13.2097 15.706L12.9362 13.851C12.4973 13.676 12.0943 13.445 11.72 13.165L9.92815 13.865C9.76983 13.921 9.57552 13.865 9.48917 13.711L8.04989 11.289C7.96354 11.135 7.99952 10.946 8.13625 10.841L9.65468 9.686C9.6259 9.462 9.60431 9.231 9.60431 9C9.60431 8.769 9.6259 8.538 9.65468 8.314L8.13625 7.159C7.99952 7.054 7.95634 6.865 8.04989 6.711L9.48917 4.289C9.57552 4.135 9.76263 4.072 9.92815 4.135L11.72 4.835C12.0943 4.562 12.4973 4.324 12.9362 4.149L13.2097 2.294C13.2313 2.126 13.3824 2 13.5623 2H16.4409C16.6208 2 16.7719 2.126 16.7935 2.294L17.0669 4.149C17.5059 4.324 17.9089 4.555 18.2831 4.835L20.075 4.135C20.2334 4.079 20.4277 4.135 20.514 4.289L21.9533 6.711C22.0396 6.865 22.0037 7.054 21.8669 7.159L20.3485 8.314C20.3773 8.538 20.3989 8.762 20.3989 9ZM12.4829 9C12.4829 10.351 13.6127 11.45 15.0016 11.45C16.3905 11.45 17.5203 10.351 17.5203 9C17.5203 7.649 16.3905 6.55 15.0016 6.55C13.6127 6.55 12.4829 7.649 12.4829 9Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.9707 17.5C9.9707 17.653 9.95682 17.797 9.93832 17.941L10.9145 18.6835C11.0024 18.751 11.0255 18.8725 10.97 18.9715L10.0447 20.5285C9.98921 20.6275 9.86892 20.668 9.76252 20.6275L8.61059 20.1775C8.37002 20.353 8.11095 20.506 7.82875 20.6185L7.65296 21.811C7.63908 21.919 7.54193 22 7.42627 22H5.57577C5.46012 22 5.36297 21.919 5.34909 21.811L5.17329 20.6185C4.89109 20.506 4.63202 20.3575 4.39146 20.1775L3.23952 20.6275C3.13775 20.6635 3.01284 20.6275 2.95732 20.5285L2.03207 18.9715C1.97656 18.8725 1.99969 18.751 2.08759 18.6835L3.06373 17.941C3.04522 17.797 3.03134 17.6485 3.03134 17.5C3.03134 17.3515 3.04522 17.203 3.06373 17.059L2.08759 16.3165C1.99969 16.249 1.97193 16.1275 2.03207 16.0285L2.95732 14.4715C3.01284 14.3725 3.13312 14.332 3.23952 14.3725L4.39146 14.8225C4.63202 14.647 4.89109 14.494 5.17329 14.3815L5.34909 13.189C5.36297 13.081 5.46012 13 5.57577 13H7.42627C7.54193 13 7.63908 13.081 7.65296 13.189L7.82875 14.3815C8.11095 14.494 8.37002 14.6425 8.61059 14.8225L9.76252 14.3725C9.8643 14.3365 9.98921 14.3725 10.0447 14.4715L10.97 16.0285C11.0255 16.1275 11.0024 16.249 10.9145 16.3165L9.93832 17.059C9.95682 17.203 9.9707 17.347 9.9707 17.5ZM4.88183 17.5C4.88183 18.3685 5.60815 19.075 6.50102 19.075C7.39388 19.075 8.1202 18.3685 8.1202 17.5C8.1202 16.6315 7.39388 15.925 6.50102 15.925C5.60815 15.925 4.88183 16.6315 4.88183 17.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-03-settings-default': Obi03SettingsDefault;
  }
}