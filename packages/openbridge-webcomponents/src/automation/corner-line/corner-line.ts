import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {LineMedium, lineColor, LineType, lineWidth} from '../index';

export enum CornerLineDirection {
  topRight = 'top-right',
  topLeft = 'top-left',
  bottomRight = 'bottom-right',
  bottomLeft = 'bottom-left',
}

export type CornerLineDirectionType =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';

@customElement('obc-corner-line')
export class ObcCornerLine extends LitElement {
  @property({type: String}) medium: LineMedium = LineMedium.normal;
  @property({type: String}) direction: CornerLineDirectionType =
    CornerLineDirection.topRight;
  @property({type: String}) lineType: LineType = LineType.fluid;

  override render() {
    let rotation = 270;
    if (this.direction === CornerLineDirection.topLeft) {
      rotation = 180;
    } else if (this.direction === CornerLineDirection.bottomLeft) {
      rotation = 90;
    } else if (this.direction === CornerLineDirection.bottomRight) {
      rotation = 0;
    }

    if (this.lineType === LineType.connector) {
      return html`
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          transform="rotate(${rotation})"
        >
          <path
            d="M16.5 11.5L15 11.5C14.9951 11.5 14.9902 11.5 14.9853 11.5C13.0826 11.5079 11.5382 13.0339 11.5007 14.9294C11.5002 14.9529 11.5 14.9764 11.5 15V16.5L12.5 16.5L12.5 15C12.5 13.6355 13.5932 12.5263 14.9516 12.5005C14.9677 12.5002 14.9838 12.5 15 12.5L16.5 12.5V11.5Z"
            fill="var(--element-neutral-color)"
          />
          <path
            d="M24 11.5H22.5V12.5L24 12.5V11.5Z"
            fill="var(--element-neutral-color)"
          />
          <path
            d="M21 11.5H18V12.5L21 12.5V11.5Z"
            fill="var(--element-neutral-color)"
          />
          <path
            d="M11.5 18V21H12.5L12.5 18H11.5Z"
            fill="var(--element-neutral-color)"
          />
          <path
            d="M11.5 22.5V24H12.5V22.5H11.5Z"
            fill="var(--element-neutral-color)"
          />
        </svg>
      `;
    }

    const color = lineColor(this.medium);
    const width = lineWidth(this.lineType);

    const r1 = 6 - 0.5 - width / 2;
    const r2 = 6 + 0.5 + width / 2;

    if (this.lineType === LineType.air) {
      const r1 = 2.5;
      const r2 = 11.5;
      return html`
        <svg
          class="line"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          transform="rotate(${rotation})"
        >
          <path
            d="M 17 24 v -4 a 3 3 0 0 1 3 -3 h 4 v -10 h -6 a 11 11 0 0 0 -11 11 v 6 z"
            stroke="none"
            fill="var(${color.inner})"
          />
          <path
            d="M ${12 +
            0.5 +
            width / 2} 24 v -4 a ${r1} ${r1} 0 0 1 ${r1} -${r1} h 4"
            stroke-width="1"
            stroke="var(${color.outer})"
            fill="none"
          />
          <path
            d="M ${12 -
            0.5 -
            width / 2} 24 v -6 a ${r2} ${r2} 0 0 1 ${r2} -${r2} h 6"
            stroke-width="1"
            stroke="var(${color.outer})"
            fill="none"
          />
        </svg>
      `;
    } else {
      return html`
        <svg
          class="line"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          transform="rotate(${rotation})"
        >
          <path
            d="M 12 24 v -6 a 6 6 0 0 1 6 -6 h 6"
            stroke-width=${width}
            stroke="var(${color.inner})"
            fill="none"
          />
          <path
            d="M ${12 +
            0.5 +
            width / 2} 24 v -6 a ${r1} ${r1} 0 0 1 ${r1} -${r1} h 6"
            stroke-width="1"
            stroke="var(${color.outer})"
            fill="none"
          />
          <path
            d="M ${12 -
            0.5 -
            width / 2} 24 v -6 a ${r2} ${r2} 0 0 1 ${r2} -${r2} h 6"
            stroke-width="1"
            stroke="var(${color.outer})"
            fill="none"
          />
        </svg>
      `;
    }
  }

  static override styles = css`
    :host {
      display: block;
      line-height: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-corner-line': ObcCornerLine;
  }
}
