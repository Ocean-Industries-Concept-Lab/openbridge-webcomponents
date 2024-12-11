import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-logic-04')
export class ObiLogic04 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.22 8.312C11.684 8.312 12.096 8.384 12.456 8.528C12.816 8.672 13.1 8.884 13.308 9.164C13.516 9.436 13.62 9.772 13.62 10.172C13.62 10.724 13.456 11.188 13.128 11.564C12.8 11.94 12.392 12.268 11.904 12.548L13.572 14.168C13.732 13.896 13.872 13.612 13.992 13.316C14.112 13.012 14.212 12.708 14.292 12.404H16.152C16.032 12.852 15.856 13.332 15.624 13.844C15.392 14.356 15.096 14.836 14.736 15.284L16.5 17H14.292L13.62 16.34C13.444 16.46 13.26 16.568 13.068 16.664C12.876 16.76 12.676 16.844 12.468 16.916C12.26 16.98 12.04 17.028 11.808 17.06C11.576 17.1 11.336 17.12 11.088 17.12C10.44 17.12 9.884 17.02 9.42 16.82C8.956 16.612 8.6 16.324 8.352 15.956C8.104 15.588 7.98 15.164 7.98 14.684C7.98 14.276 8.04 13.928 8.16 13.64C8.288 13.344 8.468 13.088 8.7 12.872C8.94 12.648 9.224 12.444 9.552 12.26C9.344 12.02 9.176 11.796 9.048 11.588C8.928 11.372 8.84 11.16 8.784 10.952C8.736 10.744 8.712 10.524 8.712 10.292C8.712 9.884 8.816 9.532 9.024 9.236C9.24 8.94 9.536 8.712 9.912 8.552C10.296 8.392 10.732 8.312 11.22 8.312ZM10.596 13.328C10.444 13.44 10.312 13.556 10.2 13.676C10.096 13.796 10.012 13.924 9.948 14.06C9.892 14.196 9.864 14.348 9.864 14.516C9.864 14.86 9.992 15.132 10.248 15.332C10.504 15.524 10.824 15.62 11.208 15.62C11.464 15.62 11.704 15.588 11.928 15.524C12.152 15.46 12.356 15.372 12.54 15.26L10.596 13.328ZM11.208 9.692C11.008 9.692 10.816 9.744 10.632 9.848C10.456 9.944 10.368 10.132 10.368 10.412C10.368 10.612 10.416 10.804 10.512 10.988C10.616 11.172 10.752 11.36 10.92 11.552C11.256 11.368 11.512 11.184 11.688 11C11.872 10.816 11.964 10.604 11.964 10.364C11.964 10.124 11.884 9.952 11.724 9.848C11.564 9.744 11.392 9.692 11.208 9.692Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 14.45V23C21 23.5523 20.5523 24 20 24L4 24C3.44772 24 3 23.5523 3 23L3 1C3 0.447716 3.44772 0 4 0L20 0C20.5523 0 21 0.447715 21 1V9.55001C21.1616 9.51721 21.3288 9.5 21.5 9.5C22.8807 9.5 24 10.6193 24 12C24 13.3807 22.8807 14.5 21.5 14.5C21.3288 14.5 21.1616 14.4828 21 14.45ZM4 1L20 1V9.99982C19.3928 10.4559 19 11.1821 19 12C19 12.8179 19.3928 13.5441 20 14.0002V23L4 23L4 1Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.22 8.312C11.684 8.312 12.096 8.384 12.456 8.528C12.816 8.672 13.1 8.884 13.308 9.164C13.516 9.436 13.62 9.772 13.62 10.172C13.62 10.724 13.456 11.188 13.128 11.564C12.8 11.94 12.392 12.268 11.904 12.548L13.572 14.168C13.732 13.896 13.872 13.612 13.992 13.316C14.112 13.012 14.212 12.708 14.292 12.404H16.152C16.032 12.852 15.856 13.332 15.624 13.844C15.392 14.356 15.096 14.836 14.736 15.284L16.5 17H14.292L13.62 16.34C13.444 16.46 13.26 16.568 13.068 16.664C12.876 16.76 12.676 16.844 12.468 16.916C12.26 16.98 12.04 17.028 11.808 17.06C11.576 17.1 11.336 17.12 11.088 17.12C10.44 17.12 9.884 17.02 9.42 16.82C8.956 16.612 8.6 16.324 8.352 15.956C8.104 15.588 7.98 15.164 7.98 14.684C7.98 14.276 8.04 13.928 8.16 13.64C8.288 13.344 8.468 13.088 8.7 12.872C8.94 12.648 9.224 12.444 9.552 12.26C9.344 12.02 9.176 11.796 9.048 11.588C8.928 11.372 8.84 11.16 8.784 10.952C8.736 10.744 8.712 10.524 8.712 10.292C8.712 9.884 8.816 9.532 9.024 9.236C9.24 8.94 9.536 8.712 9.912 8.552C10.296 8.392 10.732 8.312 11.22 8.312ZM10.596 13.328C10.444 13.44 10.312 13.556 10.2 13.676C10.096 13.796 10.012 13.924 9.948 14.06C9.892 14.196 9.864 14.348 9.864 14.516C9.864 14.86 9.992 15.132 10.248 15.332C10.504 15.524 10.824 15.62 11.208 15.62C11.464 15.62 11.704 15.588 11.928 15.524C12.152 15.46 12.356 15.372 12.54 15.26L10.596 13.328ZM11.208 9.692C11.008 9.692 10.816 9.744 10.632 9.848C10.456 9.944 10.368 10.132 10.368 10.412C10.368 10.612 10.416 10.804 10.512 10.988C10.616 11.172 10.752 11.36 10.92 11.552C11.256 11.368 11.512 11.184 11.688 11C11.872 10.816 11.964 10.604 11.964 10.364C11.964 10.124 11.884 9.952 11.724 9.848C11.564 9.744 11.392 9.692 11.208 9.692Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 14.45V23C21 23.5523 20.5523 24 20 24L4 24C3.44772 24 3 23.5523 3 23L3 1C3 0.447716 3.44772 0 4 0L20 0C20.5523 0 21 0.447715 21 1V9.55001C21.1616 9.51721 21.3288 9.5 21.5 9.5C22.8807 9.5 24 10.6193 24 12C24 13.3807 22.8807 14.5 21.5 14.5C21.3288 14.5 21.1616 14.4828 21 14.45ZM4 1L20 1V9.99982C19.3928 10.4559 19 11.1821 19 12C19 12.8179 19.3928 13.5441 20 14.0002V23L4 23L4 1Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-logic-04': ObiLogic04;
  }
}
