import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-threeway-acuator-generic-closed-bottom')
export class ObiThreewayAcuatorGenericClosedBottom extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2539_1053)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.5895 3.39524C17.2855 2.72796 16.8398 2.12164 16.278 1.61091C15.7162 1.1002 15.0493 0.695066 14.3153 0.418661C13.5812 0.142261 12.7945 0 12 0C11.2055 0 10.4188 0.142263 9.68479 0.418662C8.95076 0.695067 8.28382 1.1002 7.72203 1.61091C7.16023 2.12165 6.71459 2.72797 6.41056 3.39524C6.28385 3.67334 6.12942 4.16781 6.10792 4.25168C6.10051 4.2806 6.08182 4.3735 6.06051 4.50506C5.97222 5.05024 6.41807 5.5 6.97035 5.5L11 5.5V10H10.1434C10.0497 10 9.95786 9.97366 9.8784 9.924L3.53 5.95625C2.86395 5.53997 2 6.01881 2 6.80425V17.1958C2 17.9812 2.86395 18.46 3.53 18.0437L10 14H14L20.47 18.0437C21.136 18.46 22 17.9812 22 17.1958V6.80425C22 6.01881 21.136 5.53997 20.47 5.95625L14 10H13V5.5L17.0297 5.5C17.582 5.5 18.0278 5.05024 17.9395 4.50506C17.9182 4.3735 17.8996 4.28059 17.8921 4.25167C17.8706 4.16781 17.7162 3.67333 17.5895 3.39524ZM7.07799 4.49551C7.08099 4.48526 7.08828 4.46048 7.10115 4.41917C7.11833 4.36406 7.14114 4.29334 7.16704 4.21679C7.22195 4.05448 7.2791 3.90084 7.32055 3.80987C7.56636 3.27039 7.92962 2.77366 8.39471 2.35085C8.85997 1.92789 9.41736 1.58792 10.0372 1.35451C10.6571 1.12109 11.3243 1 12 1C12.6758 1 13.343 1.12109 13.9629 1.35451C14.5827 1.58791 15.1401 1.92789 15.6054 2.35085C16.0704 2.77366 16.4337 3.27038 16.6795 3.80986C16.721 3.90084 16.7781 4.05448 16.833 4.21678C16.8589 4.29334 16.8817 4.36406 16.8989 4.41917C16.9118 4.46048 16.9191 4.48526 16.9221 4.49551L7.07799 4.49551ZM14 11C14.1874 11 14.3711 10.9473 14.53 10.848L21 6.80424V17.1958L14.53 13.152C14.3711 13.0527 14.1874 13 14 13H10C9.81258 13 9.62893 13.0527 9.47 13.152L3 17.1958L3 6.80425L9.3484 10.772C9.5868 10.921 9.86227 11 10.1434 11H14Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5146 16L6.94317 21H17.0568L13.4854 16H10.5146Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5146 16L6.94317 21H17.0568L13.4854 16H10.5146ZM6.12944 20.4188C5.65667 21.0806 6.1298 22 6.94317 22H17.0568C17.8702 22 18.3433 21.0806 17.8705 20.4188L14.2991 15.4188C14.1114 15.156 13.8083 15 13.4854 15H10.5146C10.1916 15 9.88858 15.156 9.70086 15.4188L6.12944 20.4188Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.07799 4.49551C7.08099 4.48526 7.08828 4.46048 7.10115 4.41917C7.11833 4.36406 7.14114 4.29334 7.16704 4.21679C7.22195 4.05448 7.2791 3.90084 7.32055 3.80987C7.56636 3.27039 7.92962 2.77366 8.39471 2.35085C8.85997 1.92789 9.41736 1.58792 10.0372 1.35451C10.6571 1.12109 11.3243 1 12 1C12.6758 1 13.343 1.12109 13.9629 1.35451C14.5827 1.58791 15.1401 1.92789 15.6054 2.35085C16.0704 2.77366 16.4337 3.27038 16.6795 3.80986C16.721 3.90084 16.7781 4.05448 16.833 4.21678C16.8589 4.29334 16.8817 4.36406 16.8989 4.41917C16.9118 4.46048 16.9191 4.48526 16.9221 4.49551L7.07799 4.49551ZM14 11C14.1874 11 14.3711 10.9473 14.53 10.848L21 6.80424V17.1958L14.53 13.152C14.3711 13.0527 14.1874 13 14 13H10C9.81258 13 9.62893 13.0527 9.47 13.152L3 17.1958L3 6.80425L9.3484 10.772C9.5868 10.921 9.86227 11 10.1434 11H14Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_2539_1053">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2539_1053)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.5895 3.39524C17.2855 2.72796 16.8398 2.12164 16.278 1.61091C15.7162 1.1002 15.0493 0.695066 14.3153 0.418661C13.5812 0.142261 12.7945 0 12 0C11.2055 0 10.4188 0.142263 9.68479 0.418662C8.95076 0.695067 8.28382 1.1002 7.72203 1.61091C7.16023 2.12165 6.71459 2.72797 6.41056 3.39524C6.28385 3.67334 6.12942 4.16781 6.10792 4.25168C6.10051 4.2806 6.08182 4.3735 6.06051 4.50506C5.97222 5.05024 6.41807 5.5 6.97035 5.5L11 5.5V10H10.1434C10.0497 10 9.95786 9.97366 9.8784 9.924L3.53 5.95625C2.86395 5.53997 2 6.01881 2 6.80425V17.1958C2 17.9812 2.86395 18.46 3.53 18.0437L10 14H14L20.47 18.0437C21.136 18.46 22 17.9812 22 17.1958V6.80425C22 6.01881 21.136 5.53997 20.47 5.95625L14 10H13V5.5L17.0297 5.5C17.582 5.5 18.0278 5.05024 17.9395 4.50506C17.9182 4.3735 17.8996 4.28059 17.8921 4.25167C17.8706 4.16781 17.7162 3.67333 17.5895 3.39524ZM7.07799 4.49551C7.08099 4.48526 7.08828 4.46048 7.10115 4.41917C7.11833 4.36406 7.14114 4.29334 7.16704 4.21679C7.22195 4.05448 7.2791 3.90084 7.32055 3.80987C7.56636 3.27039 7.92962 2.77366 8.39471 2.35085C8.85997 1.92789 9.41736 1.58792 10.0372 1.35451C10.6571 1.12109 11.3243 1 12 1C12.6758 1 13.343 1.12109 13.9629 1.35451C14.5827 1.58791 15.1401 1.92789 15.6054 2.35085C16.0704 2.77366 16.4337 3.27038 16.6795 3.80986C16.721 3.90084 16.7781 4.05448 16.833 4.21678C16.8589 4.29334 16.8817 4.36406 16.8989 4.41917C16.9118 4.46048 16.9191 4.48526 16.9221 4.49551L7.07799 4.49551ZM14 11C14.1874 11 14.3711 10.9473 14.53 10.848L21 6.80424V17.1958L14.53 13.152C14.3711 13.0527 14.1874 13 14 13H10C9.81258 13 9.62893 13.0527 9.47 13.152L3 17.1958L3 6.80425L9.3484 10.772C9.5868 10.921 9.86227 11 10.1434 11H14Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5146 16L6.94317 21H17.0568L13.4854 16H10.5146Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5146 16L6.94317 21H17.0568L13.4854 16H10.5146ZM6.12944 20.4188C5.65667 21.0806 6.1298 22 6.94317 22H17.0568C17.8702 22 18.3433 21.0806 17.8705 20.4188L14.2991 15.4188C14.1114 15.156 13.8083 15 13.4854 15H10.5146C10.1916 15 9.88858 15.156 9.70086 15.4188L6.12944 20.4188Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.07799 4.49551C7.08099 4.48526 7.08828 4.46048 7.10115 4.41917C7.11833 4.36406 7.14114 4.29334 7.16704 4.21679C7.22195 4.05448 7.2791 3.90084 7.32055 3.80987C7.56636 3.27039 7.92962 2.77366 8.39471 2.35085C8.85997 1.92789 9.41736 1.58792 10.0372 1.35451C10.6571 1.12109 11.3243 1 12 1C12.6758 1 13.343 1.12109 13.9629 1.35451C14.5827 1.58791 15.1401 1.92789 15.6054 2.35085C16.0704 2.77366 16.4337 3.27038 16.6795 3.80986C16.721 3.90084 16.7781 4.05448 16.833 4.21678C16.8589 4.29334 16.8817 4.36406 16.8989 4.41917C16.9118 4.46048 16.9191 4.48526 16.9221 4.49551L7.07799 4.49551ZM14 11C14.1874 11 14.3711 10.9473 14.53 10.848L21 6.80424V17.1958L14.53 13.152C14.3711 13.0527 14.1874 13 14 13H10C9.81258 13 9.62893 13.0527 9.47 13.152L3 17.1958L3 6.80425L9.3484 10.772C9.5868 10.921 9.86227 11 10.1434 11H14Z" style="fill: var(--automation-device-primary-color)"/>
</g>
<defs>
<clipPath id="clip0_2539_1053">
<rect width="24" height="24" style="fill: var(--automation-device-primary-color)"/>
</clipPath>
</defs>
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
    'obi-threeway-acuator-generic-closed-bottom': ObiThreewayAcuatorGenericClosedBottom;
  }
}