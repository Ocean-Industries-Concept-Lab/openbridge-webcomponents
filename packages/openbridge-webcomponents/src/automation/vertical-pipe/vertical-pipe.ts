import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { PipeMedium, PipeMediumType, pipeColor } from '../index';


@customElement('obc-vertical-pipe')
export class ObcVerticalPipe extends LitElement {
  @property({ type: String }) medium: PipeMediumType = PipeMedium.normal;
  @property({ type: Number }) length: number = 1;

  override render() {
    const color = pipeColor(this.medium);

    const length = this.length * 24 + 1;
    return html`
        <svg class="pipe" xmlns="http://www.w3.org/2000/svg" viewBox="0 0  24 ${length}" width="24" height=${length}>
          <line y1="-.5" x1="12" y2="${length}" x2="12" stroke-width="4" stroke="var(${color.inner})" />
          <line y1="-.5" x1="9.5" y2="${length}" x2="9.5" stroke-width="1" stroke="var(${color.outer})" />
          <line y1="-.5" x1="14.5" y2="${length}" x2="14.5" stroke-width="1" stroke="var(${color.outer})" />
        </svg>
      `
  }

  override static styles = css`
  :host {
    display: block;
    line-height: 0;
  }

  .pipe {
    position: relative;
    top: -.5px;
  }`
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-vertical-pipe': ObcVerticalPipe
  }
}
