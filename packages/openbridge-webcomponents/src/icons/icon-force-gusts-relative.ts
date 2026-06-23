import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-force-gusts-relative')
export class ObiForceGustsRelative extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10.9307 1.49611C11.1844 0.376959 12.8156 0.376939 13.0693 1.49611L13.0908 1.61134L14.8428 14.7588L17.4844 14.0986L17.5781 14.0791C18.5356 13.9193 19.2327 15.0227 18.6309 15.8252L12.8799 23.4932C12.4399 24.0798 11.5601 24.0798 11.1201 23.4932L5.36914 15.8252C4.76728 15.0227 5.46444 13.9193 6.42188 14.0791L6.51563 14.0986L9.15625 14.7588L10.9092 1.61134L10.9307 1.49611ZM10.8438 17.2412L8.48926 16.6524L12 21.333L15.5098 16.6524L13.1563 17.2412L12 8.5674L10.8438 17.2412Z" fill="currentColor"/>
<path d="M16.7519 2.67401L19.8432 9.21218C20.1099 9.77622 19.8006 10.4441 19.198 10.6055L17.649 11.0206C17.0464 11.1821 16.4446 10.7583 16.3936 10.1365L15.8016 2.92865C15.756 2.37413 16.5141 2.17101 16.7519 2.67401Z" fill="currentColor"/>
<path d="M8.19842 2.92835L7.60644 10.1362C7.55537 10.758 6.95362 11.1818 6.35098 11.0203L4.80205 10.6052C4.1994 10.4438 3.89014 9.77592 4.15682 9.21188L7.24808 2.6737C7.48589 2.17071 8.24396 2.37383 8.19842 2.92835Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.9307 1.49611C11.1844 0.376959 12.8156 0.376939 13.0693 1.49611L13.0908 1.61134L14.8428 14.7588L17.4844 14.0986L17.5781 14.0791C18.5356 13.9193 19.2327 15.0227 18.6309 15.8252L12.8799 23.4932C12.4399 24.0798 11.5601 24.0798 11.1201 23.4932L5.36914 15.8252C4.76728 15.0227 5.46444 13.9193 6.42188 14.0791L6.51563 14.0986L9.15625 14.7588L10.9092 1.61134L10.9307 1.49611ZM10.8438 17.2412L8.48926 16.6524L12 21.333L15.5098 16.6524L13.1563 17.2412L12 8.5674L10.8438 17.2412Z" style="fill: var(--element-active-color)"/>
<path d="M16.7519 2.67401L19.8432 9.21218C20.1099 9.77622 19.8006 10.4441 19.198 10.6055L17.649 11.0206C17.0464 11.1821 16.4446 10.7583 16.3936 10.1365L15.8016 2.92865C15.756 2.37413 16.5141 2.17101 16.7519 2.67401Z" style="fill: var(--element-active-color)"/>
<path d="M8.19842 2.92835L7.60644 10.1362C7.55537 10.758 6.95362 11.1818 6.35098 11.0203L4.80205 10.6052C4.1994 10.4438 3.89014 9.77592 4.15682 9.21188L7.24808 2.6737C7.48589 2.17071 8.24396 2.37383 8.19842 2.92835Z" style="fill: var(--element-active-color)"/>
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
    'obi-force-gusts-relative': ObiForceGustsRelative;
  }
}
