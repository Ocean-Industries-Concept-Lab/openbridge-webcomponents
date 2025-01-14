import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-warning-unacknowledged-iec')
export class ObiWarningUnacknowledgedIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="currentColor"/>
<path d="M8.5 14H6.5C6.22386 14 6 13.7761 6 13.5V10.5C6 10.2239 6.22386 10 6.5 10H8.5L12 6.5V10.379V17.5L8.5 14Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.7678 13.7678C14.4186 14.117 13.9767 14.3522 13.5 14.4495V9.55053C13.9767 9.64784 14.4186 9.88307 14.7678 10.2323C15.2366 10.7011 15.5 11.337 15.5 12C15.5 12.6631 15.2366 13.299 14.7678 13.7678Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 6.59167V7.86933C14.2529 8.05163 14.9484 8.43799 15.5052 8.99482C16.3022 9.79185 16.75 10.8729 16.75 12C16.75 13.1272 16.3022 14.2082 15.5052 15.0052C14.9484 15.5621 14.2529 15.9484 13.5 16.1307V17.4084C14.5869 17.2074 15.5965 16.6817 16.3891 15.8891C17.4205 14.8577 18 13.4587 18 12C18 10.5413 17.4205 9.14239 16.3891 8.11094C15.5965 7.31836 14.5869 6.79266 13.5 6.59167Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" style="fill: var(--alert-warning-color)"/>
<path d="M8.5 14H6.5C6.22386 14 6 13.7761 6 13.5V10.5C6 10.2239 6.22386 10 6.5 10H8.5L12 6.5V10.379V17.5L8.5 14Z" style="fill: var(--on-warning-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.7678 13.7678C14.4186 14.117 13.9767 14.3522 13.5 14.4495V9.55053C13.9767 9.64784 14.4186 9.88307 14.7678 10.2323C15.2366 10.7011 15.5 11.337 15.5 12C15.5 12.6631 15.2366 13.299 14.7678 13.7678Z" style="fill: var(--on-warning-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 6.59167V7.86933C14.2529 8.05163 14.9484 8.43799 15.5052 8.99482C16.3022 9.79185 16.75 10.8729 16.75 12C16.75 13.1272 16.3022 14.2082 15.5052 15.0052C14.9484 15.5621 14.2529 15.9484 13.5 16.1307V17.4084C14.5869 17.2074 15.5965 16.6817 16.3891 15.8891C17.4205 14.8577 18 13.4587 18 12C18 10.5413 17.4205 9.14239 16.3891 8.11094C15.5965 7.31836 14.5869 6.79266 13.5 6.59167Z" style="fill: var(--on-warning-active-color)"/>
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
    'obi-warning-unacknowledged-iec': ObiWarningUnacknowledgedIec;
  }
}