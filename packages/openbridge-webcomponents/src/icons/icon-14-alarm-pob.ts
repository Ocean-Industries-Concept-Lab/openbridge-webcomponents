import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-alarm-pob')
export class Obi14AlarmPob extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0166 9.49274C13.5334 9.49274 14.763 8.26315 14.763 6.74637C14.763 5.22959 13.5334 4 12.0166 4C10.4998 4 9.27023 5.22959 9.27023 6.74637C9.27023 8.26315 10.4998 9.49274 12.0166 9.49274Z" fill="currentColor"/>
<path d="M3.19527 5.01658C3.95467 4.89904 4.66549 5.41932 4.78302 6.17867L5.24894 9.1881L9.23398 10.7149H14.7992L18.7843 9.1881L19.2501 6.17867C19.3676 5.41932 20.0786 4.89904 20.8379 5.01658C21.5973 5.13412 22.1175 5.84498 22 6.60434L21.2919 11.1786L16.6542 12.9795L16.6542 15.4348L16.0165 15.9348C14.7965 16.7848 13.4065 17.2148 12.0165 17.2148C10.6265 17.2148 9.23651 16.7848 8.01651 15.9348L7.37886 15.4348L7.37891 12.9795L2.74124 11.1786L2.03314 6.60434C1.91561 5.84498 2.43588 5.13412 3.19527 5.01658Z" fill="currentColor"/>
<path d="M12 19.1948C13.39 19.1948 14.78 18.7648 16 17.9148C17.22 18.7648 18.61 19.2348 20 19.2348H22V21.2348H20C18.62 21.2348 17.26 20.8948 16 20.2448C14.74 20.8948 13.37 21.2148 12 21.2148C10.63 21.2148 9.26 20.8848 8 20.2448C6.74 20.8848 5.38 21.2348 4 21.2348H2V19.2348H4C5.39 19.2348 6.78 18.7648 8 17.9148C9.22 18.7648 10.61 19.1948 12 19.1948Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0166 9.49274C13.5334 9.49274 14.763 8.26315 14.763 6.74637C14.763 5.22959 13.5334 4 12.0166 4C10.4998 4 9.27023 5.22959 9.27023 6.74637C9.27023 8.26315 10.4998 9.49274 12.0166 9.49274Z" style="fill: var(--element-active-color)"/>
<path d="M3.19527 5.01658C3.95467 4.89904 4.66549 5.41932 4.78302 6.17867L5.24894 9.1881L9.23398 10.7149H14.7992L18.7843 9.1881L19.2501 6.17867C19.3676 5.41932 20.0786 4.89904 20.8379 5.01658C21.5973 5.13412 22.1175 5.84498 22 6.60434L21.2919 11.1786L16.6542 12.9795L16.6542 15.4348L16.0165 15.9348C14.7965 16.7848 13.4065 17.2148 12.0165 17.2148C10.6265 17.2148 9.23651 16.7848 8.01651 15.9348L7.37886 15.4348L7.37891 12.9795L2.74124 11.1786L2.03314 6.60434C1.91561 5.84498 2.43588 5.13412 3.19527 5.01658Z" style="fill: var(--element-active-color)"/>
<path d="M12 19.1948C13.39 19.1948 14.78 18.7648 16 17.9148C17.22 18.7648 18.61 19.2348 20 19.2348H22V21.2348H20C18.62 21.2348 17.26 20.8948 16 20.2448C14.74 20.8948 13.37 21.2148 12 21.2148C10.63 21.2148 9.26 20.8848 8 20.2448C6.74 20.8848 5.38 21.2348 4 21.2348H2V19.2348H4C5.39 19.2348 6.78 18.7648 8 17.9148C9.22 18.7648 10.61 19.1948 12 19.1948Z" style="fill: var(--element-active-color)"/>
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
    'obi-14-alarm-pob': Obi14AlarmPob;
  }
}
