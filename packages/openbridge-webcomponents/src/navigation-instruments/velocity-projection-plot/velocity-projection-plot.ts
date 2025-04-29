import {
  LitElement,
  SVGTemplateResult,
  html,
  nothing,
  svg,
  unsafeCSS,
} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './velocity-projection-plot.css?inline';
import '../watch/watch';
import {VesselImage, VesselImageSize} from '../watch/watch';

export interface VelocityProjectionDatapoint {
  startAngleDeg: number;
  endAngleDeg: number;
  ratioWindEnergyOrExcessSpeed: number; // If the ratio is below 1, the value is the ratio of wind energy, if it is above 1, the value is the ratio of excess speed
  ratioTotalEnergy: number;
}

@customElement('obc-velocity-projection-plot')
export class ObcVelocityProjectionPlot extends LitElement {
  @property({type: Array, attribute: false})
  dataPoints: VelocityProjectionDatapoint[] = [];

  override render() {
    const width = 320;
    const viewBox = `-${width / 2} -${width / 2} ${width} ${width}`;

    return html`
      <div class="container">
        <obc-watch
          crosshairEnabled
          .vesselImage=${VesselImage.cargoWindTop}
          .vesselImageSize=${VesselImageSize.small}
        >
        </obc-watch>
        <svg viewBox="${viewBox}">${this.renderPlotLines()}</svg>
      </div>
    `;
  }

  private renderPlotLines(): SVGTemplateResult {
    const innerRadius = 78 / 2;

    const dataPoints = this.dataPoints;
    const maxLength = Math.max(
      ...dataPoints.map(
        (dp) => dp.ratioWindEnergyOrExcessSpeed * dp.ratioTotalEnergy
      ),
      ...dataPoints.map((dp) => dp.ratioTotalEnergy)
    );

    const elements = dataPoints.map((dp) => {
      const startAngle = (dp.startAngleDeg * Math.PI) / 180;
      const endAngle = (dp.endAngleDeg * Math.PI) / 180;

      const totalEnergyRadius =
        (120 - innerRadius) * (dp.ratioTotalEnergy / maxLength) + innerRadius;
      const windEnergyOrExcessSpeedRadius =
        (totalEnergyRadius - innerRadius) * dp.ratioWindEnergyOrExcessSpeed +
        innerRadius;
      console.log(totalEnergyRadius, windEnergyOrExcessSpeedRadius);

      const innerArchPath = `M ${Math.cos(endAngle) * innerRadius} ${Math.sin(endAngle) * innerRadius} A ${innerRadius} ${innerRadius} 0 0 0 ${Math.cos(startAngle) * innerRadius} ${Math.sin(startAngle) * innerRadius}`;
      const totalEnergyArchPath = `M ${Math.cos(endAngle) * totalEnergyRadius} ${Math.sin(endAngle) * totalEnergyRadius} A ${totalEnergyRadius} ${totalEnergyRadius} 0 0 0 ${Math.cos(startAngle) * totalEnergyRadius} ${Math.sin(startAngle) * totalEnergyRadius}`;
      const totalEnergyArchPath2 = `L ${Math.cos(startAngle) * totalEnergyRadius} ${Math.sin(startAngle) * totalEnergyRadius} A ${totalEnergyRadius} ${totalEnergyRadius} 0 0 0 ${Math.cos(endAngle) * totalEnergyRadius} ${Math.sin(endAngle) * totalEnergyRadius}`;

      const windEnergyOrExcessSpeedArchPath = `L ${Math.cos(startAngle) * windEnergyOrExcessSpeedRadius} ${Math.sin(startAngle) * windEnergyOrExcessSpeedRadius} A ${windEnergyOrExcessSpeedRadius} ${windEnergyOrExcessSpeedRadius} 1 0 1 ${Math.cos(endAngle) * windEnergyOrExcessSpeedRadius} ${Math.sin(endAngle) * windEnergyOrExcessSpeedRadius}`;

      const windEnergyOrExcessSpeedArchPath2 = `M ${Math.cos(endAngle) * windEnergyOrExcessSpeedRadius} ${Math.sin(endAngle) * windEnergyOrExcessSpeedRadius} A ${windEnergyOrExcessSpeedRadius} ${windEnergyOrExcessSpeedRadius} 1 0 0 ${Math.cos(startAngle) * windEnergyOrExcessSpeedRadius} ${Math.sin(startAngle) * windEnergyOrExcessSpeedRadius}`;
      const windEnergyPie = svg`<path d="${innerArchPath} ${windEnergyOrExcessSpeedArchPath} Z" fill="var(--instrument-enhanced-tertiary-color)" stroke="var(--instrument-enhanced-tertiary-color)" stroke-width="1" />`;
      const windEnergyArch = svg`<path d="${windEnergyOrExcessSpeedArchPath2}" stroke="var(--instrument-enhanced-secondary-color)" stroke-width="1" />`;
      const totalEnergyArch = svg`
      <path d="${totalEnergyArchPath}" stroke="var(--border-silhouette-color)" stroke-width="2" />
      <path d="${totalEnergyArchPath}" stroke="var(--element-inactive-color)" stroke-width="1" />
      `;

      const totalEneryPie = svg`<path d="${innerArchPath} ${totalEnergyArchPath2} Z" fill="var(--instrument-frame-tertiary-color)"/>`;

      const speedPie =
        dp.ratioWindEnergyOrExcessSpeed > 1
          ? svg`<path d="${totalEnergyArchPath} ${windEnergyOrExcessSpeedArchPath} Z" fill="var(--instrument-enhanced-secondary-color)"/>`
          : nothing;

      const maxRadius =
        Math.max(totalEnergyRadius, windEnergyOrExcessSpeedRadius) + 0.5;
      const minRadius = innerRadius - 0.5;
      const startLine = svg`<line x1="${Math.cos(startAngle) * minRadius}" y1="${Math.sin(startAngle) * minRadius}" x2="${Math.cos(startAngle) * maxRadius}" y2="${Math.sin(startAngle) * maxRadius}" stroke="var(--border-silhouette-color)" stroke-width="1" />`;
      const endLine = svg`<line x1="${Math.cos(endAngle) * minRadius}" y1="${Math.sin(endAngle) * minRadius}" x2="${Math.cos(endAngle) * maxRadius}" y2="${Math.sin(endAngle) * maxRadius}" stroke="var(--border-silhouette-color)" stroke-width="1" />`;
      return svg`<g>
      ${totalEneryPie}
        ${windEnergyPie}
        ${speedPie}
        ${totalEnergyArch}
        ${windEnergyArch}
        ${startLine}
        ${endLine}
      </g>`;
    });

    return svg`<g>
        ${elements}
      </g>`;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-velocity-projection-plot': ObcVelocityProjectionPlot;
  }
}
