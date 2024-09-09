import {LitElement, css, svg, SVGTemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {Tickmark, TickmarkType} from '../watch-flat/tickmark-flat';
import '../watch-flat/watch-flat';

@customElement('obc-compass-flat')
export class ObcCompassFlat extends LitElement {
  @property({type: Number}) width = 0;
  @property({type: Number}) heading = 0;
  @property({type: Number}) courseOverGround = 0;
  @property({type: Number}) tickInterval = 5;
  @property({type: Number}) range = 45;
  @property({type: Number}) minRange = 45;
  @property({type: Number}) maxRange = 180;

  private generateIntervalTickmarks(): Tickmark[] {
    const tickmarks: Tickmark[] = [];

    for (
      let angle = this.heading;
      angle <= this.heading + this.range;
      angle += this.tickInterval
    ) {
      if (angle !== this.heading) {
        tickmarks.push({
          angle: this.heading - (angle - this.heading),
          type: TickmarkType.secondary,
        });
      }
      tickmarks.push({
        angle,
        type: TickmarkType.secondary,
      });
    }

    return tickmarks;
  }

  private generateCardinalTickmarks(): Tickmark[] {
    const labels = new Map<number, string>([
      [0, 'N'],
      [45, 'NE'],
      [90, 'E'],
      [135, 'SE'],
      [180, 'S'],
      [225, 'SW'],
      [270, 'W'],
      [315, 'NW'],
    ]);

    const tickmarks: Tickmark[] = [];
    const lowerBound = this.heading - this.range;
    const upperBound = this.heading + this.range;

    for (const [angle, label] of labels) {
      for (const offset of [-360, 0, 360]) {
        const adjustedAngle = angle + offset;
        if (adjustedAngle >= lowerBound && adjustedAngle <= upperBound) {
          tickmarks.push({
            angle: adjustedAngle,
            type: TickmarkType.main,
            text: label,
          });
        }
      }
    }

    return tickmarks;
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

    const baseTranslation = 5;
    const scaling = Math.max(Math.abs(angleDiff), this.minRange) / 90;
    const offset = Math.sign(angleDiff) ? 12 * scaling : -12 * scaling;

    this.range = Math.max(this.minRange, Math.abs(angleDiff) + offset);

    let translation = angleDiff * ((baseTranslation * 35) / this.range);

    if (translation > 155) {
      translation = 155;
    } else if (translation < -155) {
      translation = -155;
    }

    const tickmarks = [
      ...this.generateCardinalTickmarks(),
      ...this.generateIntervalTickmarks(),
    ];

    return svg`
      <div class="container">
        <obc-watch-flat .rotation=${this.heading} .tickmarks=${tickmarks} .visibleRange=${this.range} .tickmarkSpacing=${(baseTranslation * 35) / this.range}></obc-watch-flat>
        <svg viewBox="-158 -25 354 74">${this.HDGSvg}${this.COGSvg(translation)}</svg>
      </div>
    `;
  }

  static override styles = css`
    * {
      box-sizing: border-box;
    }

    .container {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .container > * {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-compass-flat': ObcCompassFlat;
  }
}
