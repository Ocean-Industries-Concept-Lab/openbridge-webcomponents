import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { PipeMedium, PipeMediumType, pipeColor } from '../index';

export enum CornerPipeDirection {
  topRight = 'top-right',
  topLeft = 'top-left',
  bottomRight = 'bottom-right',
  bottomLeft = 'bottom-left'
}

export type CornerPipeDirectionType = keyof typeof CornerPipeDirection;

@customElement('obc-corner-pipe')
export class ObcCornerPipe extends LitElement {
  @property({ type: String }) medium: PipeMediumType = PipeMedium.normal;
  @property({ type: String }) direction: CornerPipeDirectionType = CornerPipeDirection.topRight;

  override render() {
    const color = pipeColor(this.medium);
    let rotation = 270;
    if (this.direction === CornerPipeDirection.topLeft) {
      rotation = 180;
    } else if (this.direction === CornerPipeDirection.bottomLeft) {
      rotation = 90;
    } else if (this.direction === CornerPipeDirection.bottomRight) {
      rotation = 0;
    }

    return html`
        <svg class="pipe" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24" transform="rotate(${rotation})">
          <path d="M 12 24 v -6 a 6 6 0 0 1 6 -6 h 6" stroke-width="4" stroke="var(${color.inner})" fill="none" />
          <path d="M 14.5 24 v -6 a 3.5 3.5 0 0 1 3.5 -3.5 h 6" stroke-width="1" stroke="var(${color.outer})" fill="none" />
          <path d="M 9.5 24 v -6 a 8.5 8.5 0 0 1 8.5 -8.5 h 6" stroke-width="1" stroke="var(${color.outer})" fill="none" />
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
    'obc-corner-pipe': ObcCornerPipe
  }
}
