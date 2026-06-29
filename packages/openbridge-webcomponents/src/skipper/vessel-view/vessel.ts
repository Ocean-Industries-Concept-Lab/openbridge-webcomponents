import {LitElement, html} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';

import {vesselStyles} from './vessel-styles.js';
import {getSideView} from './vessel-types.js';
import {getTopDownView} from './vessel-types.js';
import {getVesselType} from './vessel-types.js';

export enum VesselTypes {
  FISHING = 'FISHING',
  TANKER = 'TANKER',
  CARGO = 'CARGO',
  CAR_FERRY = 'CAR_FERRY',
}

export enum ViewType {
  SIDE = 'SIDE',
  TOP = 'TOP',
  BOTH = 'BOTH',
}

@customElement('ob-vessel-view')
export class Vessel extends LitElement {
  @property({type: Number}) vesselWidth: number = 30;
  @property({type: Number}) vesselHeight: number = 50;
  @property({type: Number}) bowToCCRP: number = 12;
  @property({type: Number}) sternToCCRP: number = 13;
  @property({type: Number}) starboardToCCRP: number = 100;
  @property({type: Number}) portToCCRP: number = 15;
  @property({type: Number}) sensorHeightOverKeel: number = 50;
  @property({type: Number}) sensorToCCRP: number = 0;
  @property({type: String}) vesselType: VesselTypes = VesselTypes.CARGO;
  @property({type: String}) viewMode: ViewType = ViewType.TOP;
  @property({type: Number}) sensorPortStarboardOffset: number = 0;
  @property({type: Boolean}) toggleSLAndDLSensor: boolean = false;
  //values for SIDE_VIEW
  private readonly MIN_X = 37;
  private readonly MAX_X = 444;
  private readonly LINE_Y = 303;
  private readonly ARROW_SIZE = 5;
  private readonly VESSEL_BOTTOM_Y = 260;
  private readonly DIM_TOP_Y = 117;
  private readonly ARCH_HEIGHT = 40;
  //values for TOP_DOWN_VIEW
  private readonly TOP_Y = 193;
  private readonly BOTTOM_Y = 271;

  override render() {
    return html` <div class="container">${this.getVessel()}</div> `;
  }

  static override styles = [vesselStyles];

  private getScaledX(value: number) {
    const length = this.vesselLengthComputed;
    //fallback logic if both sternToCCRP and bowToCCRP are 0
    if (length === 0) {
      return this.MIN_X; // fallback position
    }

    const ratio = value / length;
    return this.MIN_X + ratio * (this.MAX_X - this.MIN_X);
  }

  private buildDimensionLine(
    startX: number,
    endX: number,
    yAxis: number = this.LINE_Y
  ) {
    const y = yAxis;
    const a = this.ARROW_SIZE;

    const arrowPath = `
    M${startX} ${y}
    L${startX + a} ${y + 2.887}
    L${startX + a} ${y - 2.887}
    Z

    M${endX} ${y}
    L${endX - a} ${y - 2.887}
    L${endX - a} ${y + 2.887}
    Z
  `;

    return {
      startX,
      endX,
      arrowPath,
      textX: (startX + endX) / 2,
      y,
    };
  }

  private getSternLine() {
    const startX = this.MIN_X;
    const endX = this.getScaledX(this.sternToCCRP ?? 0);

    return this.buildDimensionLine(startX, endX);
  }

  private getBowLine() {
    const startX = this.getScaledX(this.sternToCCRP ?? 0);
    const endX = this.MAX_X;

    return this.buildDimensionLine(startX, endX);
  }

  private getCCRPX() {
    return this.getScaledX(this.sternToCCRP);
  }

  get vesselLengthComputed() {
    return this.sternToCCRP + this.bowToCCRP;
  }

  private getOffsetInPixels(value: number) {
    const length = this.vesselLengthComputed;
    if (length === 0) return 0;

    const ratio = value / length;
    return ratio * (this.MAX_X - this.MIN_X);
  }

  private getOffsetYInPixels(value: number) {
    const total = this.vesselWidthComputed;

    if (total === 0) return 0;

    const ratio = value / total;

    return ratio * (this.BOTTOM_Y - this.TOP_Y);
  }

  private getVesselTopY(x: number) {
    const t = (x - this.MIN_X) / (this.MAX_X - this.MIN_X);

    // curved ends + flat middle
    const baseY = 210;
    const curvature = 25;

    const curve = curvature * (Math.pow(t - 0.5, 2) * 4); // parabola

    return baseY + curve;
  }

  override updated(changedProps: Map<string, string>) {
    if (changedProps.has('sternToCCRP')) {
      if (this.sternToCCRP < 0) {
        this.sternToCCRP = 0;
      }
    }

    if (changedProps.has('bowToCCRP')) {
      if (this.bowToCCRP < 0) {
        this.bowToCCRP = 0;
      }
    }
  }
  ////////
  //TOP DOWN VIEW LOGIC
  ////////

  get vesselWidthComputed() {
    return (this.portToCCRP ?? 0) + (this.starboardToCCRP ?? 0);
  }

  get yAxisCCRPPos() {
    const width = this.BOTTOM_Y - this.TOP_Y;

    if (this.vesselWidthComputed === 0) return this.TOP_Y;

    const CCRPY =
      this.TOP_Y + (this.portToCCRP / this.vesselWidthComputed) * width;

    return Math.max(this.TOP_Y, Math.min(this.BOTTOM_Y, CCRPY));
  }

  get portDimensionLine() {
    const startY = this.TOP_Y;
    const endY = this.yAxisCCRPPos;
    return {startY, endY};
  }

  get starboardDimensionLine() {
    const startY = this.yAxisCCRPPos;
    const endY = this.BOTTOM_Y;
    return {startY, endY};
  }

  private getMidY(start: number, end: number) {
    return (start + end) / 2;
  }

  private buildVerticalDimensionLine(x: number, startY: number, endY: number) {
    const a = this.ARROW_SIZE;
    const h = a * 0.577;

    const arrowPath = `
    M${x} ${startY}
    L${x - h} ${startY + a}
    L${x + h} ${startY + a}
    Z

    M${x} ${endY}
    L${x - h} ${endY - a}
    L${x + h} ${endY - a}
    Z
  `;

    return {
      arrowPath,
      lineStart: startY + a,
      lineEnd: endY - a,
      textY: (startY + endY) / 2,
    };
  }

  ////////
  //COMMON VIEW LOGIC
  ////////
  private getArrowHalfHeight(): number {
    return this.ARROW_SIZE * 0.577;
  }

  toggleVesselViewer(): void {
    // this.sideTopDownViewToggle = !this.sideTopDownViewToggle;
  }

  getVessel() {
    const vesselTypeData = getVesselType(this.vesselType);

    const dimTopY = vesselTypeData.sideTopY;
    const dimBottomY = vesselTypeData.sideBottomY;
    //vessel height dim line side view
    const vesselHeightDim = {
      vesselHeight: this.vesselHeight,
      ...this.buildVerticalDimensionLine(
        18, // X position (left side)
        dimTopY, // dynamic top from vessel type
        dimBottomY // dynamic bottom from vessel type
      ),
    };

    //stern dimensions
    const sternLine = this.getSternLine();
    const sternTextX = (sternLine.startX + sternLine.endX) / 2;
    //bow dimensions
    const bowLine = this.getBowLine();
    const bowTextX = (bowLine.startX + bowLine.endX) / 2;
    //CCRP line position
    const ccrpX = this.getCCRPX();
    //sensor Y (mast) line
    const sensorX = Math.max(
      this.MIN_X,
      Math.min(this.MAX_X, ccrpX + this.getOffsetInPixels(this.sensorToCCRP))
    );
    const mastEndY = this.getVesselTopY(sensorX);
    //Sensor Y position
    // const dimTopY = this.DIM_TOP_Y;
    // const dimBottomY = this.VESSEL_BOTTOM_Y;

    const dimHeightPx = dimBottomY - dimTopY;

    const ratio =
      this.vesselHeight === 0
        ? 0
        : this.sensorHeightOverKeel / this.vesselHeight;

    // ✅ map directly into dimension scale

    const sensorY = this.toggleSLAndDLSensor
      ? dimBottomY // ✅ DL mode → glued to keel
      : dimBottomY - ratio * dimHeightPx;

    //CCRP to sensor DIM line
    const dimStartX = Math.min(sensorX, ccrpX);
    const dimEndX = Math.max(sensorX, ccrpX);
    let DIM_Y: number;

    if (this.toggleSLAndDLSensor) {
      // halfway between mid-height and bottom dim line
      const midY = (this.DIM_TOP_Y + this.VESSEL_BOTTOM_Y) / 2;

      DIM_Y = (midY + this.VESSEL_BOTTOM_Y) * 0.63;
    } else {
      // original position
      DIM_Y = 85;
    }

    const dim = this.buildDimensionLine(dimStartX, dimEndX, DIM_Y);
    const textOffset = Math.abs(this.sensorToCCRP).toString().length * 3;
    //positioning vertical arch dimensions for dynamic usage
    const ARCH_X = this.MAX_X; // tweak spacing
    const ARCH_Y = sensorY - this.ARCH_HEIGHT; // keep same vertical alignment

    //positioning static keel arch dimension
    const keelY = this.VESSEL_BOTTOM_Y;
    const ARCH_BOTTOM_Y = keelY - 40;
    //vertical dashed indicator line
    const verticalGuideStartY = sensorY;
    const verticalGuideEndY = DIM_Y;
    //cone dimension
    const CONE_LENGTH = 40;
    const coneLeftX = sensorX - CONE_LENGTH * 0.7;
    const coneRightX = sensorX + CONE_LENGTH * 0.7;

    const coneBottomY = sensorY + CONE_LENGTH;
    ////////
    //TOP DOWN VIEW LOGIC
    ////////
    const sensorYOffset = this.getOffsetYInPixels(
      this.sensorPortStarboardOffset
    );

    const sensorYRaw = this.yAxisCCRPPos + sensorYOffset;

    const sensorYTopView = Math.max(
      this.TOP_Y,
      Math.min(this.BOTTOM_Y, sensorYRaw)
    );

    //vertical Dim line from CCRP to sensor
    const showSensorDim = this.sensorPortStarboardOffset !== 0;
    const DIM_X = sensorX + 15;

    const dimStartY = Math.min(sensorYTopView, this.yAxisCCRPPos);
    const dimEndY = Math.max(sensorYTopView, this.yAxisCCRPPos);

    const sensorDim = this.buildVerticalDimensionLine(
      DIM_X,
      dimStartY,
      dimEndY
    );

    const SIDE_VIEW = getSideView(
      this.vesselType,
      {
        sensorX,
        sensorY,
        mastEndY,
        verticalGuideStartY,
        verticalGuideEndY,
        ARCH_X,
        ARCH_Y,
        sensorHeightOverKeel: this.sensorHeightOverKeel,
        sternTextX,
        sternLine,
        ARCH_BOTTOM_Y,
        bowTextX,
        bowLine,
        sensorToCCRP: this.sensorToCCRP,
        dim,
        coneLeftX,
        coneRightX,
        coneBottomY,
        toggleSLAndDLSensor: this.toggleSLAndDLSensor,
        textOffset,
        ccrpX,
        vesselLengthComputed: this.vesselLengthComputed,
        sternToCCRP: this.sternToCCRP,
        bowToCCRP: this.bowToCCRP,
        vesselHeight: this.vesselHeight,
      },
      {
        sensorX,
        sensorY,
        sensorHeightOverKeel: this.sensorHeightOverKeel,
        toggleSLAndDLSensor: this.toggleSLAndDLSensor,
        sensorToCCRP: this.sensorToCCRP,
        dim,
        textOffset,
        viewMode: this.viewMode,
      },
      vesselHeightDim
    );

    const TOP_DOWN_VIEW = getTopDownView(
      this.vesselType,
      {
        sensorX,
        ccrpX,
        sensorHeightOverKeel: this.sensorHeightOverKeel,
        toggleSLAndDLSensor: this.toggleSLAndDLSensor,
        vesselLengthComputed: this.vesselLengthComputed,
        sensorYTopView,
        sensorPortStarboardOffset: this.sensorPortStarboardOffset,
        sensorDim,
        DIM_X,
        showSensorDim,
        yAxisCCRPPos: this.yAxisCCRPPos,
        starboardDimensionLine: this.starboardDimensionLine,
        getArrowHalfHeight: this.getArrowHalfHeight.bind(this),
        ARROW_SIZE: this.ARROW_SIZE,
        getMidY: this.getMidY,
        starboardToCCRP: this.starboardToCCRP,
        portDimensionLine: this.portDimensionLine,
        portToCCRP: this.portToCCRP,
        vesselWidthComputed: this.vesselWidthComputed,
      },
      {
        portDimensionLine: this.portDimensionLine,
        getMidY: this.getMidY,
        portToCCRP: this.portToCCRP,
        ARROW_SIZE: this.ARROW_SIZE,
        getArrowHalfHeight: this.getArrowHalfHeight,
      },
      {
        starboardDimensionLine: this.starboardDimensionLine,
        getMidY: this.getMidY,
        starboardToCCRP: this.starboardToCCRP,
        ARROW_SIZE: this.ARROW_SIZE,
        getArrowHalfHeight: this.getArrowHalfHeight,
      },
      {
        yAxisCCRPPos: this.yAxisCCRPPos,
      },
      {
        xAxisCCRPPos: ccrpX,
      },
      {
        sensorX,
        sensorYTopView,
      }
    );

    if (this.viewMode === ViewType.SIDE) {
      return SIDE_VIEW;
    }
    if (this.viewMode === ViewType.TOP) {
      return TOP_DOWN_VIEW;
    }

    return html`<div class="both-views wrapper">
      <div class="side-view wrapper">${SIDE_VIEW}</div>
      <div class="top-down-view wrapper">${TOP_DOWN_VIEW}</div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-vessel': Vessel;
  }
}
