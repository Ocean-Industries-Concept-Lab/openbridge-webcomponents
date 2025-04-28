import {LitElement, SVGTemplateResult, html, svg, unsafeCSS} from 'lit';
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
    const stepsDeg = 2;
    const steps = 360 / stepsDeg;

    const lines = [];
    const dataPoints = this.dataPoints;
    const maxLength = Math.max(
      ...dataPoints.map(
        (dp) => dp.ratioWindEnergyOrExcessSpeed * dp.ratioTotalEnergy
      ),
      ...dataPoints.map((dp) => dp.ratioTotalEnergy)
    );
    for (let i = 0; i < steps; i++) {
      const angleDeg = i * stepsDeg;
      const data = dataPoints.find((dp) => {
        return dp.startAngleDeg <= angleDeg && dp.endAngleDeg >= angleDeg;
      });
      if (!data) {
        continue;
      }
      const outerRadius =
        (120 - innerRadius) * (data.ratioTotalEnergy / maxLength) + innerRadius;
      const angle = (i * stepsDeg * Math.PI) / 180;
      const x1 = Math.cos(angle) * innerRadius;
      const y1 = Math.sin(angle) * innerRadius;
      const x2 = Math.cos(angle) * outerRadius;
      const y2 = Math.sin(angle) * outerRadius;
      const length =
        data.ratioWindEnergyOrExcessSpeed * (outerRadius - innerRadius) +
        innerRadius;
      const x3 = Math.cos(angle) * length;
      const y3 = Math.sin(angle) * length;

      lines.push(
        svg`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--border-outline-color)" stroke-width="1" />
        <line x1="${x1}" y1="${y1}" x2="${x3}" y2="${y3}" stroke="var(--instrument-enhanced-secondary-color)" stroke-width="1" />`
      );
    }

    return svg`<g>
        ${lines}
      </g>`;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-velocity-projection-plot': ObcVelocityProjectionPlot;
  }
}
