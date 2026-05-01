import {LitElement, html, nothing, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './depth-indicator.css?inline';
import {customElement} from '../../decorator.js';

export enum ObcDepthIndicatorVariant {
  outline = 'outline',
  filled = 'filled',
}

const GRAPH_BOX_X = 8;
const GRAPH_BOX_Y = 8;
const GRAPH_BOX_SIZE = 32;
const GRAPH_BOX_RX = 4;
const DOT_R = 3;

/**
 * `<obc-depth-indicator>` – A compact depth indicator with outline and filled variants.
 *
 * Renders a framed mini line indicator driven by pre-normalized values (0–1),
 * with an optional filled area above the line.
 */
@customElement('obc-depth-indicator')
export class ObcDepthIndicator extends LitElement {
  @property({type: String})
  variant: ObcDepthIndicatorVariant = ObcDepthIndicatorVariant.outline;

  @property({type: Array})
  values: number[] = [];

  private clamp01(value: number): number {
    if (!Number.isFinite(value)) return 0;
    return Math.max(0, Math.min(1, value));
  }

  private get points(): Array<{x: number; y: number}> {
    const values = Array.isArray(this.values) ? this.values : [];
    if (values.length === 0) return [];

    const plotLeft = GRAPH_BOX_X;
    const plotTop = GRAPH_BOX_Y;
    const plotSize = GRAPH_BOX_SIZE;
    const plotRight = plotLeft + plotSize;

    if (values.length === 1) {
      const v = this.clamp01(values[0] ?? 0);
      return [{x: plotRight, y: plotTop + (1 - v) * plotSize}];
    }

    const step = plotSize / (values.length - 1);
    return values.map((raw, i) => {
      const v = this.clamp01(raw);
      return {x: plotLeft + step * i, y: plotTop + (1 - v) * plotSize};
    });
  }

  private get linePath(): string {
    const points = this.points;
    if (points.length === 0) return '';
    const [first, ...rest] = points;
    if (!first) return '';
    return rest.reduce(
      (d, p) => `${d} L ${p.x} ${p.y}`,
      `M ${first.x} ${first.y}`
    );
  }

  private get fillPath(): string {
    if (this.variant !== ObcDepthIndicatorVariant.filled) return '';
    const points = this.points;
    if (points.length === 0) return '';
    const first = points[0];
    const last = points[points.length - 1];
    if (!first || !last) return '';
    const topY = GRAPH_BOX_Y;
    return `M ${first.x} ${topY} L ${first.x} ${first.y} ${this.linePath.slice(
      `M ${first.x} ${first.y}`.length
    )} L ${last.x} ${topY} Z`;
  }

  private get dotCenter(): {x: number; y: number} | undefined {
    const points = this.points;
    const last = points[points.length - 1];
    if (!last) return undefined;
    return {x: GRAPH_BOX_X + GRAPH_BOX_SIZE, y: last.y};
  }

  override render() {
    const isFilled = this.variant === ObcDepthIndicatorVariant.filled;
    const linePath = this.linePath;
    const fillPath = this.fillPath;
    const dot = this.dotCenter;
    const clipId = `dept-indicator-clip-${this.idBase}`;

    return html`
      <svg
        class="indicator"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id=${clipId} clipPathUnits="userSpaceOnUse">
            <rect
              x=${GRAPH_BOX_X}
              y=${GRAPH_BOX_Y}
              width=${GRAPH_BOX_SIZE}
              height=${GRAPH_BOX_SIZE}
              rx=${GRAPH_BOX_RX}
            />
          </clipPath>
        </defs>

        <rect
          x=${GRAPH_BOX_X}
          y=${GRAPH_BOX_Y}
          width=${GRAPH_BOX_SIZE}
          height=${GRAPH_BOX_SIZE}
          rx=${GRAPH_BOX_RX}
          class="frame"
          vector-effect="non-scaling-stroke"
        />

        ${isFilled && fillPath
          ? svg`<path
              d=${fillPath}
              class="fill"
              clip-path="url(#${clipId})"
              vector-effect="non-scaling-stroke"
            />`
          : nothing}
        ${linePath
          ? svg`<path
              d=${linePath}
              class="line"
              clip-path="url(#${clipId})"
              vector-effect="non-scaling-stroke"
            />`
          : nothing}
        ${dot
          ? svg`<circle
              cx=${dot.x}
              cy=${dot.y}
              r=${DOT_R}
              class="dot"
              vector-effect="non-scaling-stroke"
            />`
          : nothing}
      </svg>
    `;
  }

  static override styles = unsafeCSS(componentStyle);

  private readonly idBase =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Math.random().toString(16).slice(2);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-depth-indicator': ObcDepthIndicator;
  }
}
