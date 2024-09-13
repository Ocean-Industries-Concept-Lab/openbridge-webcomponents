import {LitElement, svg, SVGTemplateResult, unsafeCSS} from 'lit';
import componentStyle from './compass-flat.css?inline';
import {customElement, property} from 'lit/decorators.js';
import {Tickmark, TickmarkType} from '../watch-flat/tickmark-flat';
import '../watch-flat/watch-flat';

export enum LabelSize {
  small = 'small',
  regular = 'regular',
  enhanced = 'enhanced',
}

export enum LabelPosition {
  top = '-50',
  bottom = 'bottom',
  left = 'left',
  right = 'right',
}

export enum LabelStyle {
  regular = 'var(--instrument-tick-mark-secondary-color)',
  enhanced = 'enhanced',
  active = 'active',
}

export interface Label {
  angle: number;
  text: string;
}

@customElement('obc-compass-flat')
export class ObcCompassFlat extends LitElement {
  @property({type: Number}) width = 0;
  @property({type: Number}) heading = 0;
  @property({type: Number}) courseOverGround = 0;
  @property({type: Number}) tickInterval = 5;
  @property({type: Number}) range = 45;
  @property({type: Number}) minRange = 45;
  @property({type: Number}) maxRange = 180;
  @property({type: Array, attribute: false}) labels: Label[] = [];
  @property({type: String}) labelPosition: LabelPosition = LabelPosition.top;
  @property({type: String}) labelSize: LabelSize = LabelSize.regular;
  @property({type: String}) labelStyle: LabelStyle = LabelStyle.regular;

  private generateIntervalTickmarks(scale: number): Tickmark[] {
    const tickmarks: Tickmark[] = [];

    for (
      let angle = this.heading;
      angle <= this.heading + this.range;
      angle += this.tickInterval
    ) {
      if (angle !== this.heading) {
        tickmarks.push({
          angle: (this.heading - (angle - this.heading)) * scale,
          type: TickmarkType.secondary,
        });
      }
      tickmarks.push({
        angle: angle * scale,
        type: TickmarkType.secondary,
      });
    }

    return tickmarks;
  }

  private generateCardinalTickmarks(scale: number): Tickmark[] {
    const tickmarks: Tickmark[] = [];
    const lowerBound = this.heading - this.range;
    const upperBound = this.heading + this.range;

    for (const label of this.labels) {
      let angle = label.angle;

      if (angle - 360 >= lowerBound) angle -= 360;
      else if (angle + 360 <= upperBound) angle += 360;

      const x = angle * scale;

      tickmarks.push({angle: x, type: TickmarkType.main});
    }

    return tickmarks;
  }

  private generateTickmarks(offset: number): Tickmark[] {
    return [
      ...this.generateCardinalTickmarks(offset),
      ...this.generateIntervalTickmarks(offset),
    ];
  }

  private renderLabels(scale: number): SVGTemplateResult[] {
    const labels: SVGTemplateResult[] = [];
    const lowerBound = this.heading - this.range;
    const upperBound = this.heading + this.range;

    for (const label of this.labels) {
      let angle = label.angle;

      if (angle - 360 >= lowerBound) angle -= 360;
      else if (angle + 360 <= upperBound) angle += 360;

      const x = angle * scale;

      labels.push(
        svg`<text x=${x} y=${LabelPosition.top} class="label" fill=${LabelStyle.regular} text-anchor="middle">${label.text}</text>`
      );
    }

    return labels;
  }

  private get HDGSvg(): SVGTemplateResult {
    return svg`
          <path d="M0.283211 44.5636L18.9999 0L37.7166 44.5636C38.4568 46.3259 36.54 48.0229 34.8804 47.0746L18.9999 40L3.11945 47.0746C1.4599 48.0229 -0.456941 46.3259 0.283211 44.5636Z" 
                style="fill: var(--instrument-enhanced-secondary-color)" 
                vector-effect="non-scaling-stroke"/>
        `;
  }

  private COGSvg(translation: Number): SVGTemplateResult {
    return svg`
      <g transform="translate(${translation}, 0)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.283211 44.5636C-0.456941 46.3259 1.4599 48.0229 3.11945 47.0746L18.9999 40L34.8804 47.0746C36.54 48.0229 38.4568 46.3259 37.7166 44.5636L18.9999 0L0.283211 44.5636ZM18.9999 10.3297L6.25443 40.6761L18.9999 35.393L31.7454 40.6761L18.9999 10.3297ZM36.865 43.6016L36.8624 43.6001L36.865 43.6016Z" fill="var(--instrument-enhanced-secondary-color)"/>
      </g>
    `;
  }

  override render() {
    let angleDiff = this.courseOverGround - this.heading;

    if (angleDiff > 180) {
      angleDiff -= 360;
    } else if (angleDiff < -180) {
      angleDiff += 360;
    }

    this.range = Math.max(this.minRange, Math.abs(angleDiff));

    const baseOffset = 5;
    const scale = (baseOffset * 35) / this.range;

    const translation = angleDiff * scale;

    // clamp COG translation
    // if (translation > 155) {
    //   translation = 155;
    // } else if (translation < -155) {
    //   translation = -155;
    // }

    const tickmarks = this.generateTickmarks(scale);

    const labels = this.renderLabels(scale);

    return svg`
      <div class="container">
        <obc-watch-flat .rotation=${this.heading} .tickmarks=${tickmarks} .labels=${labels} .tickmarkSpacing=${scale}></obc-watch-flat>
        <svg viewBox="-158 -25 354 74">${this.HDGSvg}${this.COGSvg(translation)}</svg>
        
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-compass-flat': ObcCompassFlat;
  }
}
