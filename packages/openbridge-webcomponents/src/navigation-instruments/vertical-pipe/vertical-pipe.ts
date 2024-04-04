import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import compentStyle from "./vertical-pipe.css?inline";


export enum PipeMedium {
  normal = 'normal',
  empty = 'empty',
  water = 'water',
}
export type PipeMediumType = keyof typeof PipeMedium;


@customElement('obc-vertical-pipe')
export class ObcVerticalPipe extends LitElement {
  @property({ type: String }) medium: PipeMediumType = PipeMedium.normal;
  @property({ type: Number }) length: number = 1;

  override render() {
    let innerColor = '--automation-pipe-primary-color'
    const outerColor = '--automation-pipe-tertiary-color'

    if (this.medium === PipeMedium.empty) {
      innerColor = '--automation-pipe-primary-inverted-color'
    } else if (this.medium === PipeMedium.water) {
      innerColor = '--automation-fresh-water'
    }

    const length = this.length * 24;
    return html`
        <svg class="pipe" xmlns="http://www.w3.org/2000/svg" viewBox="0 0  24 ${length}" width="24" height=${length}>
          <line y1="0" x1="12" y2="${length}" x2="12" stroke-width="4" stroke="var(${innerColor})" />
          <line y1="0" x1="9.5" y2="${length}" x2="9.5" stroke-width="1" stroke="var(${outerColor})" />
          <line y1="0" x1="14.5" y2="${length}" x2="14.5" stroke-width="1" stroke="var(${outerColor})" />
        </svg>
      `
  }

static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-vertical-pipe': ObcVerticalPipe
  }
}
