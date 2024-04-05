import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { PipeMedium, PipeMediumType, pipeColor } from '../index';

@customElement('obc-horizontal-pipe')
export class ObcHorizontalPipe extends LitElement {
  @property({ type: String }) medium: PipeMediumType = PipeMedium.normal;
  @property({ type: Number }) length: number = 1;

  override render() {
    const color = pipeColor(this.medium);
    const length = this.length * 24;
    return html`
        <svg class="pipe" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${length} 24" height="24" width=${length}>
          <line x1="0" y1="12" x2="${length}" y2="12" stroke-width="4" stroke="var(${color.inner})" />
          <line x1="0" y1="9.5" x2="${length}" y2="9.5" stroke-width="1" stroke="var(${color.outer})" />
          <line x1="0" y1="14.5" x2="${length}" y2="14.5" stroke-width="1" stroke="var(${color.outer})" />
        </svg>
      `
  }

  override static styles = css`
  :host {
    display: block;
    line-height: 0;
  }`
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-horizontal-pipe': ObcHorizontalPipe
  }
}
