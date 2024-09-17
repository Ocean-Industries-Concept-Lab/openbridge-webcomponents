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
  @property({type: Boolean}) noPadding: boolean = true;
  @property({type: Number}) padding: number = 16;
  @property({type: Number}) heading = 0;
  @property({type: Number}) courseOverGround = 0;
  @property({type: Number}) tickInterval = 5;
  @property({type: Number}) FOV = 45;
  @property({type: Number}) minFOV = 45;
  @property({type: Number}) maxFOV = 180;
  @property({type: Array, attribute: false}) labels: Label[] = [];
  @property({type: String}) labelPosition: LabelPosition = LabelPosition.top;
  @property({type: String}) labelSize: LabelSize = LabelSize.regular;
  @property({type: String}) labelStyle: LabelStyle = LabelStyle.regular;

  private generateIntervalTickmarks(scale: number): Tickmark[] {
    const tickmarks: Tickmark[] = [];

    for (
      let angle = -180;
      angle < this.maxFOV * 3;
      angle += this.tickInterval
    ) {
      if (angle % 45 === 0) continue;
      tickmarks.push({angle: angle * scale, type: TickmarkType.secondary});
    }

    return tickmarks;
  }

  private generateCardinalTickmarks(scale: number): Tickmark[] {
    const tickmarks: Tickmark[] = [];

    for (const label of this.labels) {
      tickmarks.push({angle: label.angle * scale, type: TickmarkType.main});
    }

    return tickmarks;
  }

  private generateTickmarks(scale: number): Tickmark[] {
    return [
      ...this.generateCardinalTickmarks(scale),
      ...this.generateIntervalTickmarks(scale),
    ];
  }

  private renderLabels(scale: number): SVGTemplateResult[] {
    const labels: SVGTemplateResult[] = [];

    for (const label of this.labels) {
      labels.push(
        svg`
          <text x=${label.angle * scale} y=${LabelPosition.top} class="label" fill=${LabelStyle.regular}>
            ${label.text}
          </text>`
      );
    }

    return labels;
  }

  private get HDGSvg(): SVGTemplateResult {
    return svg`<g transform="translate(-24, -74)">
          <path d="M36.7011 44.1445L36.6898 44.1379L36.6781 44.1318L24.2301 37.6823L24.0001 37.5631L23.7701 37.6823L11.3221 44.1318L11.3104 44.1379L11.2991 44.1445C9.25497 45.3438 6.78661 43.308 7.68828 41.0919L22.6036 4.43285C23.1096 3.18905 24.8906 3.18905 25.3967 4.43284L40.3119 41.0919C41.2136 43.308 38.7452 45.3438 36.7011 44.1445Z" fill="#325B9A" stroke="#F7F7F7"/>
        </g>`;
  }

  private COGSvg(translation: number): SVGTemplateResult {
    return svg`
      <g transform="translate(${-24 + translation}, -74)">
        <path d="M31.9025 36.0262L33.1068 36.6502L32.5956 35.3938L24.4632 15.406L24.0001 14.2677L23.537 15.406L15.4046 35.3938L14.8935 36.6502L16.0978 36.0262L24.0001 31.9319L31.9025 36.0262ZM36.7011 44.1445L36.6898 44.1379L36.6781 44.1318L24.2301 37.6823L24.0001 37.5631L23.7701 37.6823L11.3221 44.1318L11.3104 44.1379L11.2991 44.1445C9.25497 45.3438 6.78661 43.308 7.68828 41.0919L22.6036 4.43285C23.1096 3.18905 24.8906 3.18905 25.3967 4.43284L40.3119 41.0919C41.2136 43.308 38.7452 45.3438 36.7011 44.1445Z" fill="#325B9A" stroke="#F7F7F7"/>
      </g>
    `;
  }

  override render() {
    let angleDiff = this.courseOverGround - this.heading;

    if (angleDiff > this.maxFOV) {
      angleDiff -= 360;
    } else if (angleDiff < -this.maxFOV) {
      angleDiff += 360;
    }

    this.FOV = Math.max(this.minFOV, Math.abs(angleDiff));

    const baseOffset = 5;
    const translationScale = (baseOffset * 35) / this.FOV;

    const translation = angleDiff * translationScale;

    const tickmarks = this.generateTickmarks(translationScale);
    const labels = this.renderLabels(translationScale);

    const viewBox = this.noPadding ? '-192 -128 384 128' : '-200 -144 400 144';

    return svg`
      <div class="container">
        <obc-watch-flat .noPadding=${this.noPadding} .labels=${labels} .rotation=${this.heading} .tickmarks=${tickmarks} .tickmarkSpacing=${translationScale}></obc-watch-flat>
        <svg viewBox=${viewBox} xmlns="http://www.w3.org/2000/svg"> 
        ${this.HDGSvg}${this.COGSvg(translation)}
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
