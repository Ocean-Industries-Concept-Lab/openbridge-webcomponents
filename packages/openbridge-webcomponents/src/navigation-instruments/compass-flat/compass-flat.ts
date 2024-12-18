import {LitElement, svg, SVGTemplateResult, unsafeCSS} from 'lit';
import componentStyle from './compass-flat.css?inline';
import {customElement, property, state} from 'lit/decorators.js';
import {Tickmark, TickmarkType} from '../watch-flat/tickmark-flat';
import '../watch-flat/watch-flat';

export enum LabelPosition {
  top = -45,
  bottom = 50,
}

export enum LabelStyle {
  regular = 'var(--instrument-tick-mark-secondary-color)',
}

export interface Label {
  x: number;
  y: LabelPosition;
  text: string;
}

/**
 *
 * @ignition-base-height: 170px
 * @ignition-base-width: 512px
 */
@customElement('obc-compass-flat')
export class ObcCompassFlat extends LitElement {
  @property({type: Boolean}) noPadding: boolean = true;
  @property({type: Boolean}) FOVIndicator: boolean = false;
  @property({type: Number}) padding: number = 16;
  @property({type: Number}) heading = 0;
  @property({type: Number}) courseOverGround = 0;
  @property({type: Number}) tickInterval = 5;
  @property({type: Number}) FOV = 45;
  @property({type: Number}) minFOV = 45;
  @property({type: Number}) maxFOV = 180;

  @state() containerWidth = 0;
  @state() maxContainerWidth = 0;

  private resizeObserver: ResizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      // Made by chatGPT so that the text is inside the wrapper
      this.maxContainerWidth = -125.36 + 3.79 * entry.contentRect.height;
      this.containerWidth = Math.min(
        entry.contentRect.width,
        this.maxContainerWidth
      );
    }
  });

  override connectedCallback() {
    super.connectedCallback();
    this.resizeObserver.observe(this);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this);
  }

  generateLabels() {
    if (this.containerWidth < 192) {
      return [];
    } else if (this.containerWidth <= 300) {
      return [
        {x: -180, y: LabelPosition.top, text: 'S'},
        {x: -90, y: LabelPosition.top, text: 'W'},
        {x: 0, y: LabelPosition.top, text: 'N'},
        {x: 90, y: LabelPosition.top, text: 'E'},
        {x: 180, y: LabelPosition.top, text: 'S'},
        {x: 270, y: LabelPosition.top, text: 'W'},
        {x: 360, y: LabelPosition.top, text: 'N'},
        {x: 450, y: LabelPosition.top, text: 'E'},
        {x: 540, y: LabelPosition.top, text: 'S'},
      ];
    } else {
      return [
        {x: -180, y: LabelPosition.top, text: 'S'},
        {x: -135, y: LabelPosition.top, text: 'SW'},
        {x: -90, y: LabelPosition.top, text: 'W'},
        {x: -45, y: LabelPosition.top, text: 'NW'},
        {x: 0, y: LabelPosition.top, text: 'N'},
        {x: 45, y: LabelPosition.top, text: 'NE'},
        {x: 90, y: LabelPosition.top, text: 'E'},
        {x: 135, y: LabelPosition.top, text: 'SE'},
        {x: 180, y: LabelPosition.top, text: 'S'},
        {x: 225, y: LabelPosition.top, text: 'SW'},
        {x: 270, y: LabelPosition.top, text: 'W'},
        {x: 315, y: LabelPosition.top, text: 'NW'},
        {x: 360, y: LabelPosition.top, text: 'N'},
        {x: 405, y: LabelPosition.top, text: 'NE'},
        {x: 450, y: LabelPosition.top, text: 'E'},
        {x: 495, y: LabelPosition.top, text: 'SE'},
        {x: 540, y: LabelPosition.top, text: 'S'},
      ];
    }
  }

  private generateIntervalTickmarks(scale: number): Tickmark[] {
    const tickmarks: Tickmark[] = [];
    let cardinalInterval = 90;

    if (this.containerWidth > 300) {
      cardinalInterval = 45;
    } else if (this.containerWidth < 192) {
      cardinalInterval = 0;
    }

    for (
      let angle = -180;
      angle < this.maxFOV * 3;
      angle += this.tickInterval
    ) {
      if (cardinalInterval !== 0 && angle % cardinalInterval === 0) {
        continue;
      }
      tickmarks.push({angle: angle * scale, type: TickmarkType.secondary});
    }

    return tickmarks;
  }

  private generateCardinalTickmarks(
    scale: number,
    labels: Label[]
  ): Tickmark[] {
    const tickmarks: Tickmark[] = [];

    for (const label of labels) {
      tickmarks.push({angle: label.x * scale, type: TickmarkType.main});
    }

    return tickmarks;
  }

  private generateTickmarks(scale: number, labels: Label[]): Tickmark[] {
    return [
      ...this.generateCardinalTickmarks(scale, labels),
      ...this.generateIntervalTickmarks(scale),
    ];
  }

  private renderFOVIndicator(): SVGTemplateResult[] {
    const indicators: SVGTemplateResult[] = [];

    const maxAdjustment = 10;
    const minContainerWidth = 300;
    const maxContainerWidth = 512;

    let yAdjustment = 0;
    if (this.containerWidth < maxContainerWidth) {
      const widthRange = maxContainerWidth - minContainerWidth;
      const scaleFactor =
        (maxContainerWidth - this.containerWidth) / widthRange;
      yAdjustment = scaleFactor * maxAdjustment;
    }

    const y = LabelPosition.bottom + yAdjustment;

    indicators.push(svg`
          <text x="-175" y=${y} class="label left" fill=${LabelStyle.regular}>
            ${-this.FOV}\u00B0
          </text>`);

    indicators.push(svg`
          <text x="0" y=${y} class="label" fill=${LabelStyle.regular}>
            ${this.heading}\u00B0
          </text>`);

    indicators.push(svg`
          <text x="175" y=${y} class="label right" fill=${LabelStyle.regular}>
            ${this.FOV}\u00B0
          </text>`);

    return indicators;
  }

  private get HDGSvg(): SVGTemplateResult {
    return svg`<g transform="translate(-24, -74)">
          <path d="M36.7011 44.1445L36.6898 44.1379L36.6781 44.1318L24.2301 37.6823L24.0001 37.5631L23.7701 37.6823L11.3221 44.1318L11.3104 44.1379L11.2991 44.1445C9.25497 45.3438 6.78661 43.308 7.68828 41.0919L22.6036 4.43285C23.1096 3.18905 24.8906 3.18905 25.3967 4.43284L40.3119 41.0919C41.2136 43.308 38.7452 45.3438 36.7011 44.1445Z" fill="var(--instrument-enhanced-secondary-color)" stroke="var(--border-silhouette-color)"/>
        </g>`;
  }

  private COGSvg(translation: number): SVGTemplateResult {
    return svg`
      <g transform="translate(${-24 + translation}, -74)">
        <path d="M31.9025 36.0262L33.1068 36.6502L32.5956 35.3938L24.4632 15.406L24.0001 14.2677L23.537 15.406L15.4046 35.3938L14.8935 36.6502L16.0978 36.0262L24.0001 31.9319L31.9025 36.0262ZM36.7011 44.1445L36.6898 44.1379L36.6781 44.1318L24.2301 37.6823L24.0001 37.5631L23.7701 37.6823L11.3221 44.1318L11.3104 44.1379L11.2991 44.1445C9.25497 45.3438 6.78661 43.308 7.68828 41.0919L22.6036 4.43285C23.1096 3.18905 24.8906 3.18905 25.3967 4.43284L40.3119 41.0919C41.2136 43.308 38.7452 45.3438 36.7011 44.1445Z" fill="var(--instrument-enhanced-secondary-color)" stroke="var(--border-silhouette-color)"/>
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
    const labels = this.generateLabels();
    const tickmarks = this.generateTickmarks(translationScale, labels);
    const scaledLabels = labels.map((l) => ({
      ...l,
      x: l.x * translationScale,
    }));

    const viewBox = this.noPadding ? '-192 -128 384 128' : '-200 -144 400 144';

    return svg`
      <div class="container" style="max-width:${this.maxContainerWidth}px">
        <obc-watch-flat .noPadding=${this.noPadding} .FOVIndicator=${this.FOVIndicator ? this.renderFOVIndicator() : []} .labels=${scaledLabels} .rotation=${this.heading} .tickmarks=${tickmarks} .tickmarkSpacing=${translationScale}></obc-watch-flat>
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
