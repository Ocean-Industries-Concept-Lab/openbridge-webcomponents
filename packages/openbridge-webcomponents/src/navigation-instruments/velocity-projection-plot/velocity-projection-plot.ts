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
  @property({type: Number})
  instantWindDirectionDeg: number | null = null;
  @property({type: Number})
  instantWindSpeedNumber: number | null = null;
  @property({type: Number})
  instantCurrentDirectionDeg: number | null = null;
  @property({type: Number})
  instantCurrentSpeedNumber: number | null = null;

  override render() {
    const width = 320;
    const viewBox = `-${width / 2} -${width / 2} ${width} ${width}`;

    return html`
      <div class="container">
        <obc-watch
          crosshairEnabled
          northArrow
          .vesselImage=${VesselImage.cargoWindTop}
          .vesselImageSize=${VesselImageSize.small}
          .windFromDirectionDeg=${this.instantWindDirectionDeg}
          .wind=${this.instantWindSpeedNumber}
          .currentFromDirectionDeg=${this.instantCurrentDirectionDeg}
          .current=${this.instantCurrentSpeedNumber}
          .padding=${70}
        >
        </obc-watch>
        <svg viewBox="${viewBox}">${this.renderPlotLines()}</svg>
      </div>
    `;
  }

  private isSelected(dp: VelocityProjectionDatapoint): boolean {
    if (this.instantWindDirectionDeg != null) {
      return (
        dp.startAngleDeg <= this.instantWindDirectionDeg &&
        dp.endAngleDeg >= this.instantWindDirectionDeg
      );
    }
    return true;
  }
  private color(dp: VelocityProjectionDatapoint): {
    totalEnergy: string;
    windEnergy: string;
    speed: string;
  } {
    if (this.isSelected(dp)) {
      return {
        totalEnergy: 'var(--instrument-frame-tertiary-color)',
        windEnergy: 'var(--instrument-enhanced-tertiary-color)',
        speed: 'var(--instrument-enhanced-secondary-color)',
      };
    } else {
      return {
        totalEnergy: 'var(--instrument-frame-primary-color)',
        windEnergy: 'var(--instrument-frame-secondary-color)',
        speed: 'var(--instrument-frame-secondary-color)',
      };
    }
  }

  private renderPlotLines(): SVGTemplateResult {
    const innerRadius = 65 / 2;

    const dataPoints = this.dataPoints;
    const maxLength = Math.max(
      ...dataPoints.map(
        (dp) => dp.ratioWindEnergyOrExcessSpeed * dp.ratioTotalEnergy
      ),
      ...dataPoints.map((dp) => dp.ratioTotalEnergy)
    );

    const elements = dataPoints.map((dp) => {
      const startAngle = (dp.startAngleDeg * Math.PI) / 180 - Math.PI / 2;
      const endAngle = (dp.endAngleDeg * Math.PI) / 180 - Math.PI / 2;

      const c = this.color(dp);

      const totalEnergyRadius =
        (100 - innerRadius) * (dp.ratioTotalEnergy / maxLength) + innerRadius;
      const windEnergyOrExcessSpeedRadius =
        (totalEnergyRadius - innerRadius) * dp.ratioWindEnergyOrExcessSpeed +
        innerRadius;

      const innerArchPath = `M ${Math.cos(endAngle) * innerRadius} ${Math.sin(endAngle) * innerRadius} A ${innerRadius} ${innerRadius} 0 0 0 ${Math.cos(startAngle) * innerRadius} ${Math.sin(startAngle) * innerRadius}`;

      const totalEnergyArchPath = `${Math.cos(startAngle) * totalEnergyRadius} ${Math.sin(startAngle) * totalEnergyRadius} A ${totalEnergyRadius} ${totalEnergyRadius} 0 0 1 ${Math.cos(endAngle) * totalEnergyRadius} ${Math.sin(endAngle) * totalEnergyRadius}`;

      const windEnergyOrExcessSpeedArchPath = `${Math.cos(startAngle) * windEnergyOrExcessSpeedRadius} ${Math.sin(startAngle) * windEnergyOrExcessSpeedRadius} A ${windEnergyOrExcessSpeedRadius} ${windEnergyOrExcessSpeedRadius} 1 0 1 ${Math.cos(endAngle) * windEnergyOrExcessSpeedRadius} ${Math.sin(endAngle) * windEnergyOrExcessSpeedRadius}`;

      const windEnergyOrExcessSpeedArchPathReverse = `${Math.cos(endAngle) * windEnergyOrExcessSpeedRadius} ${Math.sin(endAngle) * windEnergyOrExcessSpeedRadius} A ${windEnergyOrExcessSpeedRadius} ${windEnergyOrExcessSpeedRadius} 1 0 0 ${Math.cos(startAngle) * windEnergyOrExcessSpeedRadius} ${Math.sin(startAngle) * windEnergyOrExcessSpeedRadius}`;
      const windEnergyPie = svg`<path d="${innerArchPath} L ${windEnergyOrExcessSpeedArchPath} Z" fill=${c.windEnergy} stroke=${c.windEnergy} stroke-width="1" />`;
      const windEnergyArch = svg`<path d="M${windEnergyOrExcessSpeedArchPath}" fill="none" stroke=${c.windEnergy} stroke-width="1" />`;
      const totalEnergyArch = svg`
      <path d="M${totalEnergyArchPath}" fill="none" stroke="var(--border-silhouette-color)" stroke-width="2" />
      <path d="M${totalEnergyArchPath}" fill="none" stroke="var(--element-inactive-color)" stroke-width="1" />
      `;

      const totalEneryPie = svg`<path d="${innerArchPath} L ${totalEnergyArchPath} Z" fill=${c.totalEnergy}/>`;

      const speedPie =
        dp.ratioWindEnergyOrExcessSpeed > 1
          ? svg`<path d="M${totalEnergyArchPath} L ${windEnergyOrExcessSpeedArchPathReverse} Z" fill=${c.speed}/>`
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
