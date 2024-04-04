import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import compentStyle from "./horizontal-pipe.css?inline";


export enum PipeMedium {
  normal = 'normal',
  empty = 'empty',
  water = 'water',
}
export type PipeMediumType = keyof typeof PipeMedium;


@customElement('obc-horizontal-pipe')
export class ObcHorizontalPipe extends LitElement {
  @property({ type: String }) medium: PipeMediumType = PipeMedium.normal;
  @property({ type: Number }) length: number = 1;

  override render() {
    const innerColor = '--automation-pipe-primary-color'
    const outerColor = '--automation-pipe-tertiary-color'
    const length = this.length * 24;
    return html`
        <svg class="pipe" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${length} 24" height="24" width=${length}>
          <line x1="0" y1="12" x2="${length}" y2="12" stroke-width="4" stroke="var(${innerColor})" />
          <line x1="0" y1="9.5" x2="${length}" y2="9.5" stroke-width="1" stroke="var(${outerColor})" />
          <line x1="0" y1="14.5" x2="${length}" y2="14.5" stroke-width="1" stroke="var(${outerColor})" />
        </svg>
      `
  }

static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-horizontal-pipe': ObcHorizontalPipe
  }
}
