import {nothing, svg, html, type TemplateResult} from 'lit';
import {Colors} from '../interfaces.js';
// import {VesselTypes, ViewType, SensorView, SensorType} from './vessel.js';
import {VesselTypes, SensorView, SensorType} from './vessel.js';
import {sensorTypeSelector} from './sensors-types.js';

type VesselTypeData = {
  side: TemplateResult;
  topDown: TemplateResult;
  sideTopY: number;
  sideBottomY: number;
};

// type DimHeightVesselParams = {
//   vesselHeight: number;
//   textY: number;
//   arrowPath: string;
//   lineStart: number;
//   lineEnd: number;
// };

type getSideViewParams = {
  sensorX: number; //!!!
  sensorY: number; //!!!
  mastEndY: number;
  verticalGuideStartY: number;
  verticalGuideEndY: number;
  ARCH_X: number;
  ARCH_Y: number;
  sensorHeightOverKeel: number; //!!!
  sensorBelowKeel: number;
  sternTextX: number;
  sternLine: {
    startX: number;
    endX: number;
    arrowPath: string;
    textX: number;
    y: number;
  };

  ARCH_BOTTOM_Y: number;
  bowTextX: number;
  bowLine: {
    startX: number;
    endX: number;
    arrowPath: string;
    textX: number;
    y: number;
  };
  sensorToCCRP: number;

  dim: {
    arrowPath: string;
    startX: number;
    endX: number;
    y: number;
    textX: number;
  }; //!!!

  toggleSLAndDLSensor: boolean;
  textOffset: number; //!!!
  ccrpX: number; //!!!

  vesselLengthComputed: number;
  sternToCCRP: number;
  bowToCCRP: number;
  vesselHeight: number;
  vesselDraftLine: number;
};

type getTopDownViewParams = {
  sensorX: number;
  ccrpX: number;
  sensorHeightOverKeel: number;
  toggleSLAndDLSensor: boolean;
  vesselLengthComputed: number;

  sensorYTopView: number;
  sensorPortStarboardOffset: number;
  sensorDim: {
    arrowPath: string;
    lineStart: number;
    lineEnd: number;
    textY: number;
  };
  DIM_X: number;
  showSensorDim: boolean;
  yAxisCCRPPos: number;
  starboardDimensionLine: {startY: number; endY: number};
  getArrowHalfHeight: () => number;
  ARROW_SIZE: number;
  getMidY: (start: number, end: number) => number;
  starboardToCCRP: number;
  portDimensionLine: {startY: number; endY: number};
  portToCCRP: number;
  vesselWidthComputed: number;
};

// type sensorPositionParams = {
//   sensorX: number;
//   sensorY: number;
//   sensorHeightOverKeel: number;
//   toggleSLAndDLSensor: boolean;
//   sensorToCCRP: number;
//   dim: {
//     arrowPath: string;
//     startX: number;
//     endX: number;
//     y: number;
//     textX: number;
//   };
//   textOffset: number;
//   viewMode: ViewType;
// };

/*
type dimPortToCCRPParams = {
  portDimensionLine: {startY: number; endY: number};
  getMidY: (startY: number, endY: number) => number;
  portToCCRP: number;
  ARROW_SIZE: number;
  getArrowHalfHeight: () => number;
};
*/

/*
type dimStarboardToCCRPParams = {
  starboardDimensionLine: {startY: number; endY: number};
  getMidY: (startY: number, endY: number) => number;
  starboardToCCRP: number;
  ARROW_SIZE: number;
  getArrowHalfHeight: () => number;
};
*/

//type horizontalCCRPParams = {yAxisCCRPPos: number};

//type verticalCCRPParams = {xAxisCCRPPos: number};

type sensorPosTopDownParams = {
  sensorX: number;
  sensorYTopView: number;
};

const STANDARD_KEEL_Y = 158;

type upArrowDimParams = {
  arrowTipY: number;
  arrowBaseY: number;
  fixedBottomY: number;
};

export function getVesselType(vesselType: string): VesselTypeData {
  if (vesselType === VesselTypes.TANKER) {
    const {TANKER_SIDE_VIEW, TANKER_TOP_DOWN_VIEW} = getVesselTanker();

    return {
      side: TANKER_SIDE_VIEW,
      topDown: TANKER_TOP_DOWN_VIEW,
      sideTopY: 75.1357,
      sideBottomY: STANDARD_KEEL_Y,
    };
  } else if (vesselType === VesselTypes.CARGO) {
    const {CARGO_SIDE_VIEW, CARGO_TOP_DOWN_VIEW} = getVesselCargo();

    return {
      side: CARGO_SIDE_VIEW,
      topDown: CARGO_TOP_DOWN_VIEW,
      sideTopY: 75,
      sideBottomY: STANDARD_KEEL_Y,
    };
  } else if (vesselType === VesselTypes.CAR_FERRY) {
    const {CAR_FERRY_SIDE_VIEW, CAR_FERRY_TOP_DOWN_VIEW} = getVesselCarFerry();

    return {
      side: CAR_FERRY_SIDE_VIEW,
      topDown: CAR_FERRY_TOP_DOWN_VIEW,
      sideTopY: 110.546,
      sideBottomY: STANDARD_KEEL_Y,
    };
  } else if (vesselType === VesselTypes.FISHING) {
    const {FISHING_SIDE_VIEW, FISHING_TOP_DOWN_VIEW} = getVesselFishing();

    return {
      side: FISHING_SIDE_VIEW,
      topDown: FISHING_TOP_DOWN_VIEW,
      sideTopY: 76,
      sideBottomY: STANDARD_KEEL_Y,
    };
  } else if (vesselType === VesselTypes.CARGO_WIND) {
    const {CARGO_WIND_SIDE_VIEW, CARGO_WIND_TOP_DOWN_VIEW} =
      getVesselCargoWind();

    return {
      side: CARGO_WIND_SIDE_VIEW,
      topDown: CARGO_WIND_TOP_DOWN_VIEW,
      sideTopY: 12,
      sideBottomY: STANDARD_KEEL_Y,
    };
  } else if (vesselType === VesselTypes.SOV) {
    const {SOV_SIDE_VIEW, SOV_TOP_DOWN_VIEW} = getVesselSOV();

    return {
      side: SOV_SIDE_VIEW,
      topDown: SOV_TOP_DOWN_VIEW,
      sideTopY: 53,
      sideBottomY: STANDARD_KEEL_Y,
    };
  } else if (vesselType === VesselTypes.PSV) {
    const {PSV_SIDE_VIEW, PSV_TOP_DOWN_VIEW} = getVesselPSV();

    return {
      side: PSV_SIDE_VIEW,
      topDown: PSV_TOP_DOWN_VIEW,
      sideTopY: 80,
      sideBottomY: STANDARD_KEEL_Y,
    };
  } else if (vesselType === VesselTypes.CRUISE) {
    const {CRUISE_SIDE_VIEW, CRUISE_TOP_DOWN_VIEW} = getVesselCruise();

    return {
      side: CRUISE_SIDE_VIEW,
      topDown: CRUISE_TOP_DOWN_VIEW,
      sideTopY: 98,
      sideBottomY: STANDARD_KEEL_Y,
    };
  }

  return {
    side: svg``,
    topDown: svg``,
    sideTopY: 0,
    sideBottomY: 0,
  };
}

/*
function dimSternToCCRPSide(sideViewParams: getSideViewParams): TemplateResult {
  return svg`${textLabel({
    posX: sideViewParams.sternTextX - 7,
    posY: 297.656,
    label: sideViewParams.sternToCCRP,
  })}
                <path id="line_3" d="${sideViewParams.sternLine.arrowPath}" fill="${Colors.instrumentRegularSecondaryDif}" fill-opacity="0.97"/>
                <line
                  x1="${sideViewParams.sternLine.startX + 4.5}"
                  y1="303"
                  x2="${sideViewParams.sternLine.endX - 4.5}"
                  y2="303"
                  stroke="${Colors.instrumentRegularSecondaryDif}"
                  stroke-width="1"
                />`;
}
*/

/*
function dimBowToCCRPSide(sideViewParams: getSideViewParams): TemplateResult {
  return svg`${textLabel({
    posX: sideViewParams.bowTextX - 7,
    posY: 297.656,
    label: sideViewParams.bowToCCRP,
  })}
               <path id="line_4" d="${sideViewParams.bowLine.arrowPath}" fill="${Colors.instrumentRegularSecondaryDif}" fill-opacity="0.97"/>
               <line
                    x1="${sideViewParams.bowLine.startX + 4.5}"
                    y1="303"
                    x2="${sideViewParams.bowLine.endX - 4.5}"
                    y2="303"
                    stroke="${Colors.instrumentRegularSecondaryDif}"
                    stroke-width="1"
               />`;
}
*/

function vesselLengthDimLine(sideViewParams: getSideViewParams) {
  return svg` 
    <svg xmlns="http://www.w3.org/2000/svg" width="260" height="16" viewBox="0 0 260 16" fill="none">
      <g id="vessel-total-length">
        <rect width="260" height="16"/>
        <g id="vessel-diagram/distance">
          <path id="line" d="M12.5 13L17.5 15.8868V10.1132L12.5 13ZM247.5 13L242.5 10.1132V15.8868L247.5 13ZM17 13V13.5L243 13.5V13V12.5L17 12.5V13Z" fill="${Colors.elementSymbolColor}"/>
          <text id="00.0 m" transform="translate(123.5 -4)" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" letter-spacing="0px"><tspan x="0.0546875" y="12.656">${sideViewParams.vesselLengthComputed} m</tspan></text>
        </g>
      </g>
    </svg>
`;
}

function sternCCRPBowDimLine(sternBowDimParams: getSideViewParams) {
  const stern = sternBowDimParams.sternLine;
  const bow = sternBowDimParams.bowLine;

  return svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="260" height="26" viewBox="0 0 260 26" fill="none">
      <g id="stern-CCRP-bow">
        <rect width="260" height="26" fill=""/>
        <g id="stern-to-ccrp">
          ${
            sternBowDimParams.sternToCCRP > 0
              ? svg`
            <path d="${stern.arrowPath}" fill="${Colors.elementSymbolColor}"/>
            <line
              x1="${stern.startX + 2}"
              y1="${stern.y}"
              x2="${stern.endX - 2}"
              y2="${stern.y}"
              stroke="${Colors.elementSymbolColor}"
            />
            <text
              x="${stern.textX}"
              y="11"
              text-anchor="middle"
              fill="${Colors.elementActiveColor}"
              font-size="12">
                ${sternBowDimParams.sternToCCRP}
            </text>
          `
              : nothing
          }
        </g>
        <g id="ccrp-to-bow">
        ${
          sternBowDimParams.bowToCCRP > 0
            ? svg`
          <path d="${bow.arrowPath}" fill="${Colors.elementSymbolColor}"/>
          <line
            x1="${bow.startX + 2}"
            y1="${bow.y}"
            x2="${bow.endX - 2}"
            y2="${bow.y}"
            stroke="${Colors.elementSymbolColor}"
          />
          <text
            x="${bow.textX}"
            y="11"
            text-anchor="middle"
            fill="${Colors.elementActiveColor}"
            font-size="12">
            ${sternBowDimParams.bowToCCRP}
          </text>
          `
            : nothing
        } 
        </g>
      </g>
    </svg>
`;
}

function keelArrowLinesVertical(
  upArrowDimParams: upArrowDimParams,
  toggleSLAndDLSensor: boolean
) {
  const upArrowDim = upArrowDimParams;

  return svg`
      <svg xmlns="http://www.w3.org/2000/svg" width="6" height="174" viewBox="0 0 6 174" fill="none">
        <g id="Keel arrows">
          ${
            !toggleSLAndDLSensor
              ? svg`
          <rect x="0.5" y="0.5" width="5" height="173"/>
          <path id="up" d="
            M3 ${upArrowDim.arrowTipY}
            L0.113254 ${upArrowDim.arrowTipY + 5}
            L5.88676 ${upArrowDim.arrowTipY + 5}
            Z
            "
            fill="${Colors.elementSymbolColor}"
            fill-opacity="0.97"
          />
          <line
            x1="3"
            y1="${upArrowDim.arrowTipY + 4.5}"
            x2="3"
            y2="${upArrowDim.fixedBottomY}"
            stroke="${Colors.elementSymbolColor}"
            stroke-width="1"
          />`
              : svg`
          <path id="down" d="M3.5 145C3.5 144.724 3.27614 144.5 3 144.5C2.72386 144.5 2.5 144.724 2.5 145L3 145L3.5 145ZM3 174L5.88675 169L0.113247 169L3 174ZM3 145L2.5 145L2.5 169.5L3 169.5L3.5 169.5L3.5 145L3 145Z" fill="${Colors.elementSymbolColor}" fill-opacity="0.97"/>
          `
          }
        </g>
      </svg>
  `;
}

function sensorHeights(sensorHeightsParams: getSideViewParams) {
  return svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="174" viewBox="0 0 70 174" fill="none">
      <g id="sensor-heights">
        <rect x="0.5" y="0.5" width="55" height="173"/>
        ${
          !sensorHeightsParams.toggleSLAndDLSensor
            ? svg`
          <g id="top">
            <text id="A: 14.7" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" letter-spacing="0px"><tspan x="1" y="13.656">A: ${sensorHeightsParams.sensorHeightOverKeel} m</tspan></text>
          </g>
          `
            : nothing
        }
        <g id="bottom">
          <text id="Draft: 2.1" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" letter-spacing="0px"><tspan x="1" y="131.656">Draft: ${sensorHeightsParams.vesselDraftLine} m</tspan></text>
          <text id="Keel: 0" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" letter-spacing="0px"><tspan x="1" y="143.656">Keel: 0 m</tspan></text>
        </g>
        <g id="below">
         ${
           sensorHeightsParams.toggleSLAndDLSensor
             ? svg`
            <text id="H: -1.4 m" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" letter-spacing="0px"><tspan x="1" y="157.656">A: ${sensorHeightsParams.sensorBelowKeel} m</tspan></text>
          `
             : nothing
         }
      </svg>
  `;
}

function sensorToCCRPDim(sensorToCCRPParams: getSideViewParams) {
  const dim = sensorToCCRPParams.dim;
  const SENSOR_DIM_Y = 20;
  return svg`<svg xmlns="http://www.w3.org/2000/svg" width="260" height="24" viewBox="0 0 260 24" fill="none">
              <g id="sensor-to-CCRP">
                <rect width="260" height="24" fill="none"/>
                <g id="vessel-diagram/distance">
                  <path
                    d="
                    M${dim.startX} ${SENSOR_DIM_Y}
                    L${dim.startX + 5} ${SENSOR_DIM_Y + 3}
                    L${dim.startX + 5} ${SENSOR_DIM_Y - 3}
                    Z

                    M${dim.endX} ${SENSOR_DIM_Y}
                    L${dim.endX - 5} ${SENSOR_DIM_Y - 3}
                    L${dim.endX - 5} ${SENSOR_DIM_Y + 3}
                    Z
                    "
                    fill="${Colors.elementActiveColor}"
                  />
                  <line
                    x1="${dim.startX + 5}"
                    y1="${SENSOR_DIM_Y}"
                    x2="${dim.endX - 5}"
                    y2="${SENSOR_DIM_Y}"
                    stroke="${Colors.elementActiveColor}"
                    stroke-width="1.5"
                  />
                  <text
                    x="${dim.textX}"
                    y="16"
                    text-anchor="middle"
                    fill="${Colors.elementActiveColor}"
                    font-size="12"
                    font-family="Noto Sans"
                    >
                    A: ${Math.abs(sensorToCCRPParams.sensorToCCRP)}
                  </text>
                </g>
              </g>
             </svg>`;
}
//vessel lines

function verticalCCRPLine() {
  return svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="230" viewBox="0 0 35 230" fill="none">
      <g id="stern-CCRP-bow-line">
        <rect width="35" height="230" fill="none" fill-opacity="0.5"/>
        <text id="CCRP" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" font-weight="bold" letter-spacing="0em"><tspan x="2.30078" y="12.656">CCRP</tspan></text>
        <g id="CCRP_2">
          <line id="line" x1="17.5" y1="19.5" x2="17.5" y2="230" stroke="${Colors.elementNeutralColor}" stroke-linecap="round" stroke-dasharray="4 6"/>
        </g>
      </g>
    </svg>
  `;
}

function draftLine() {
  return svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="260" height="1" viewBox="0 0 260 1" fill="none">
      <path id="draft-line" d="M0.5 0.5L259.5 0.5" stroke="${Colors.elementSymbolColor}" stroke-linecap="round" stroke-dasharray="4 4"/>
    </svg>
  `;
}

function keelLineHorizontal() {
  return svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="260" height="1" viewBox="0 0 260 1" fill="none">
      <path id="draft-line" d="M0.5 0.5L259.5 0.5" stroke="${Colors.elementSymbolColor}" stroke-width="1" stroke-linecap="round" stroke-dasharray="4 4"/>
    </svg>
  `;
}

function mastLine(sideViewParams: getSideViewParams) {
  // const mastHeight = Math.abs(
  //   sideViewParams.mastEndY - (sideViewParams.sensorY + 18)
  // );

  const mastHeight = Math.max(
    0,
    sideViewParams.mastEndY - (sideViewParams.sensorY + 18)
  );

  return svg`
    <svg
      width="5"
      height="${mastHeight}"
      viewBox="0 0 5 ${mastHeight}"
      fill="none"
    >
      <line
        x1="2"
        y1="0"
        x2="2"
        y2="${mastHeight}"
        stroke="${Colors.elementSymbolColor}"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  `;
}

export function getSideView(
  vesselType: string,
  sideViewParams: getSideViewParams,
  //sensorPos: sensorPositionParams,
  //dimHeightVesselParams: DimHeightVesselParams,
  toggleSensorA: boolean,
  upArrowDim: upArrowDimParams,
  sensorType: SensorType
) {
  const VESSEL_TYPE = getVesselType(vesselType);
  const sensorTypeOffset = sensorType === SensorType.DOPPLER ? 15 : 12;
  return html` <div class="side-view">
    <div class="total-vessel-length">
      ${vesselLengthDimLine(sideViewParams)}
    </div>
    <div class="draft-line-horizontal">${draftLine()}</div>
    <div class="keel-line-horizontal">${keelLineHorizontal()}</div>
    ${VESSEL_TYPE.side}
    ${!sideViewParams.toggleSLAndDLSensor
      ? html` <div
          class="mast-line"
          style="left:${sideViewParams.sensorX - 2}px;
                          top:${sideViewParams.sensorY + 18}px;"
        >
          ${mastLine(sideViewParams)}
        </div>`
      : nothing}

    <div class="vertical-ccrp-line" style="left:${sideViewParams.ccrpX - 17}px">
      ${verticalCCRPLine()}
    </div>
    <div class="keel-arrow-lines">
      ${keelArrowLinesVertical(upArrowDim, sideViewParams.toggleSLAndDLSensor)}
    </div>
    ${toggleSensorA
      ? html` <div
          class="sensor-positioning-side-view"
          style="left:${sideViewParams.sensorX - sensorTypeOffset}px;
                               top:${sideViewParams.sensorY}px;"
        >
          ${sensorTypeSelector(sensorType, SensorView.SIDE)}
        </div>`
      : nothing}
    <div class="sensor-heights">${sensorHeights(sideViewParams)}</div>
    <div class="stern-ccrp-bow">${sternCCRPBowDimLine(sideViewParams)}</div>
    <div class="sensor-to-ccrp">
      ${sideViewParams.sensorToCCRP !== 0
        ? sensorToCCRPDim(sideViewParams)
        : nothing}
    </div>
  </div>`;
}

/*
TOP DOWN VIEW FUNCTIONS
*/

/*
function dimPortToCCRPLine(dimPortParams: dimPortToCCRPParams): TemplateResult {
  return svg`<g id="PortToCCRP">
    ${textLabel({
      posX: 448,
      posY: dimPortParams.getMidY(
        dimPortParams.portDimensionLine.startY,
        dimPortParams.portDimensionLine.endY
      ),
      label: dimPortParams.portToCCRP,
    })}
    
    <path
      d="${(() => {
        const a = dimPortParams.ARROW_SIZE;
        const h = dimPortParams.getArrowHalfHeight();
        return `
        M467 ${dimPortParams.portDimensionLine.startY}
        L${467 - h} ${dimPortParams.portDimensionLine.startY + a}
        L${467 + h} ${dimPortParams.portDimensionLine.startY + a}
        Z
    
        M467 ${dimPortParams.portDimensionLine.endY}
        L${467 - h} ${dimPortParams.portDimensionLine.endY - a}
        L${467 + h} ${dimPortParams.portDimensionLine.endY - a}
        Z
      `;
      })()}"
      fill="${Colors.instrumentRegularSecondaryDif}"
    />
    <line
      x1="467"
      y1="${dimPortParams.portDimensionLine.startY + 4}"
      x2="467"
      y2="${dimPortParams.portDimensionLine.endY - 4}"
      stroke="${Colors.instrumentRegularSecondaryDif}"
    />
    </g>`;
}
*/

/*
function dimStarboardToCCRPLine(
  dimStarboardParams: dimStarboardToCCRPParams
): TemplateResult {
  return svg`<g id="StarboardToCCRP">
               ${textLabel({
                 posX: 448,
                 posY: dimStarboardParams.getMidY(
                   dimStarboardParams.starboardDimensionLine.startY,
                   dimStarboardParams.starboardDimensionLine.endY
                 ),
                 label: dimStarboardParams.starboardToCCRP,
               })}
    <path
      d="${(() => {
        const a = dimStarboardParams.ARROW_SIZE;
        const h = dimStarboardParams.getArrowHalfHeight();
        return `
        M467 ${dimStarboardParams.starboardDimensionLine.startY}
        L${467 - h} ${dimStarboardParams.starboardDimensionLine.startY + a}
        L${467 + h} ${dimStarboardParams.starboardDimensionLine.startY + a}
        Z
    
        M467 ${dimStarboardParams.starboardDimensionLine.endY}
        L${467 - h} ${dimStarboardParams.starboardDimensionLine.endY - a}
        L${467 + h} ${dimStarboardParams.starboardDimensionLine.endY - a}
        Z
      `;
      })()}"
      fill="${Colors.instrumentRegularSecondaryDif}"
    />
    <line
      x1="467"
      y1="${dimStarboardParams.starboardDimensionLine.startY + 4}"
      x2="467"
      y2="${dimStarboardParams.starboardDimensionLine.endY - 4}"
      stroke="${Colors.instrumentRegularSecondaryDif}"
    />
    </g>`;
}
    */

/*
function horizontalCCRPTopView(
  yAxisCCRPParams: horizontalCCRPParams
): TemplateResult {
  return svg`<line id="Line 4" x1="25" y1="${yAxisCCRPParams.yAxisCCRPPos}" x2="465" y2="${yAxisCCRPParams.yAxisCCRPPos}" stroke="${Colors.elementActiveColor}" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 6"/>
              ${textLabel({posX: 475, posY: yAxisCCRPParams.yAxisCCRPPos, label: 'CCRP'})}`;
}
*/

/*
function textLabel(position: {
  posX: number;
  posY: number;
  label: string | number;
  fontWeight?: 'bold';
}): TemplateResult {
  return svg `
    <text
      x="${position.posX}"
      y="${position.posY}"
      fill="${Colors.elementActiveColor}"
      font-family="Noto Sans"
      font-size="12"
      font-weight="${position.fontWeight ?? 'normal'}">
      ${position.label}
    </text>`;
}
*/

/*
function verticalDimSensorToCCRPLine(
  topDownViewParams: getTopDownViewParams
): TemplateResult {
  return svg`<!-- arrows -->
        <path d="${topDownViewParams.sensorDim.arrowPath}" fill="${Colors.elementActiveColor}"/>
        <!-- line -->
        <line
          x1="${topDownViewParams.DIM_X}"
          y1="${topDownViewParams.sensorDim.lineStart}"
          x2="${topDownViewParams.DIM_X}"
          y2="${topDownViewParams.sensorDim.lineEnd}"
          stroke="${Colors.elementActiveColor}"
        />
        <!-- value -->`;
}
*/

function totalVesselWidth(vesselWidth: number) {
  return svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="73" viewBox="0 0 17 73" fill="none">
      <g id="total-vessel-width">
        <rect width="17" height="73" fill="none"/>
        <g id="vessel-width">
          <path id="line" d="M13 62L15.8868 57H10.1132L13 62ZM13 11L10.1132 16H15.8868L13 11ZM13 57.5H13.5L13.5 15.5H13H12.5L12.5 57.5H13Z" fill="${Colors.elementSymbolColor}" fill-opacity="0.97"/>
          <text id="00.0 m" transform="translate(-4 42) rotate(-90)" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" letter-spacing="0px"><tspan x="0.0546875" y="12.656">${vesselWidth}</tspan></text>
        </g>
      </g>
    </svg>
  `;
}

function horizontalCCRPLine() {
  return svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="306" height="31" viewBox="0 0 306 31" fill="none">
      <g id="horizontal-ccrp-line">
        <g clip-path="url(#clip0_2070_125396)">
          <text xmlns="http://www.w3.org/2000/svg" id="CCRP" transform="translate(274 7)" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" font-weight="bold" letter-spacing="0em"><tspan x="0.300781" y="12.656">CCRP</tspan></text>  
          <g id="CCRP_2">
            <line id="line" x1="258.5" y1="15.5" x2="6.5" y2="15.5" stroke="${Colors.elementSymbolColor}" stroke-linecap="round" stroke-dasharray="4 6"/>
          </g>
        </g>
        <rect x="305.5" y="0.5" width="30" height="305" transform="rotate(90 305.5 0.5)"/>
      </g>
      <defs>
        <clipPath id="clip0_2070_125396">
          <rect x="306" width="31" height="306" transform="rotate(90 306 0)" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  `;
}

function portStarboardDimLines(topDownViewParams: getTopDownViewParams) {
  return svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="73" viewBox="0 0 30 73" fill="none">
      <g id="port-starboard-side">
        <rect width="30" height="73" fill="none"/>
        <g id="port-side-ccrp">
          <path id="line" d="M4 34L6.88675 29H1.11325L4 34ZM4 13L1.11325 18H6.88675L4 13ZM4 29.5H4.5L4.5 17.5H4H3.5L3.5 29.5H4Z" fill="${Colors.elementSymbolColor}" fill-opacity="0.97"/>
          <text id="00.0 m" transform="translate(8 15)" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" letter-spacing="0px"><tspan x="0" y="12.656">${topDownViewParams.portToCCRP}</tspan></text>
        </g>
        <g id="ccrp-starboard-side">
          <path id="line_2" d="M4 60L6.88675 55H1.11325L4 60ZM4 39L1.11325 44H6.88675L4 39ZM4 55.5H4.5L4.5 43.5H4H3.5L3.5 55.5H4Z" fill="${Colors.elementSymbolColor}" fill-opacity="0.97"/>
          <text id="00.0 m_2" transform="translate(8 41)" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" letter-spacing="0px"><tspan x="0" y="12.656">${topDownViewParams.starboardToCCRP}</tspan></text>
        </g>
      </g>
    </svg>
`;
}

export function getTopDownView(
  vesselType: string,
  topDownViewParams: getTopDownViewParams,
  //dimPortToCCRPParams: dimPortToCCRPParams,
  //dimStarboardToCCRPParams: dimStarboardToCCRPParams,
  //horizontalCCRPParams: horizontalCCRPParams,
  //verticalCCRPParams: verticalCCRPParams,
  sensorPosTopDownParams: sensorPosTopDownParams,
  toggleSensorA: boolean,
  sensorType: SensorType
): TemplateResult {
  const VESSEL_TYPE = getVesselType(vesselType);
  return html` <div class="top-down-view">
    ${VESSEL_TYPE.topDown}
    <div class="horizontal-ccrp-line">${horizontalCCRPLine()}</div>
    ${toggleSensorA
      ? html` <div
          class="sensor-positioning-top-down-view"
          style="left:${sensorPosTopDownParams.sensorX - 12}px;
                                       top:${sensorPosTopDownParams.sensorYTopView -
          12}px;"
        >
          ${sensorTypeSelector(sensorType, SensorView.TOP)}
        </div>`
      : nothing}
    <div class="total-vessel-width">
      ${totalVesselWidth(topDownViewParams.vesselWidthComputed)}
    </div>
    <div class="port-starboard-side">
      ${portStarboardDimLines(topDownViewParams)}
    </div>
  </div>`;
}

export function getVesselIcon(
  vesselType: string,
  sideViewParams: getSideViewParams,
  //sensorPositionParams: sensorPositionParams,
  topDownViewParams: getTopDownViewParams,
  //portToCCRPParams: dimPortToCCRPParams,
  //starboardToCCRPParams: dimStarboardToCCRPParams,
  //horizontalCCRPParams: horizontalCCRPParams,
  //verticalCCRPParams: verticalCCRPParams,
  sensorPosTopDownParams: sensorPosTopDownParams,
  //dimHeightVesselParams: DimHeightVesselParams,
  toggleSensorA: boolean,
  upArrowDim: upArrowDimParams,
  sensorType: SensorType
) {
  const SIDE_VIEW = getSideView(
    vesselType,
    sideViewParams,
    //sensorPositionParams,
    //dimHeightVesselParams,
    toggleSensorA,
    upArrowDim,
    sensorType
  );
  const TOP_DOWN_VIEW = getTopDownView(
    vesselType,
    topDownViewParams,
    //portToCCRPParams,
    //starboardToCCRPParams,
    //horizontalCCRPParams,
    //verticalCCRPParams,
    sensorPosTopDownParams,
    toggleSensorA,
    sensorType
  );

  return {SIDE_VIEW, TOP_DOWN_VIEW};
}

function getVesselTanker(): {
  TANKER_SIDE_VIEW: TemplateResult;
  TANKER_TOP_DOWN_VIEW: TemplateResult;
} {
  const TANKER_SIDE_VIEW = svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="260" height="190" viewBox="0 0 260 190" fill="none">
      <g id="Vessel">
        <rect x="0.5" y="0.5" width="259" height="189"/>
        <g id="Frame 5583">
          <g id="Subtract">
            <path d="M107.46 109.682C120.279 109.682 130.775 119.587 131.664 132.136H83.2551C84.144 119.587 94.641 109.682 107.46 109.682ZM159.46 109.682C172.279 109.682 182.775 119.587 183.664 132.136H135.255C136.144 119.587 146.641 109.682 159.46 109.682ZM209.727 109.682C222.546 109.682 233.042 119.587 233.931 132.136H185.522C186.411 119.587 196.908 109.682 209.727 109.682Z" fill="${Colors.instrumentFramePrimary}"/>
            <path d="M107.46 109.682L107.46 109.182H107.46V109.682ZM131.664 132.136V132.636H132.201L132.163 132.1L131.664 132.136ZM83.2551 132.136L82.7564 132.1L82.7185 132.636H83.2551V132.136ZM159.46 109.682L159.46 109.182H159.46V109.682ZM183.664 132.136V132.636H184.201L184.163 132.1L183.664 132.136ZM135.255 132.136L134.756 132.1L134.718 132.636H135.255V132.136ZM209.727 109.682L209.727 109.182H209.727V109.682ZM233.931 132.136V132.636H234.468L234.43 132.1L233.931 132.136ZM185.522 132.136L185.023 132.1L184.985 132.636H185.522V132.136ZM107.46 109.682L107.46 110.182C120.016 110.182 130.295 119.884 131.166 132.171L131.664 132.136L132.163 132.1C131.256 119.29 120.542 109.182 107.46 109.182L107.46 109.682ZM131.664 132.136V131.636H83.2551V132.136V132.636H131.664V132.136ZM83.2551 132.136L83.7539 132.171C84.6243 119.883 94.9038 110.182 107.46 110.182V109.682V109.182C94.3782 109.182 83.6638 119.29 82.7564 132.1L83.2551 132.136ZM159.46 109.682L159.46 110.182C172.016 110.182 182.295 119.884 183.166 132.171L183.664 132.136L184.163 132.1C183.256 119.29 172.542 109.182 159.46 109.182L159.46 109.682ZM183.664 132.136V131.636H135.255V132.136V132.636H183.664V132.136ZM135.255 132.136L135.754 132.171C136.624 119.883 146.904 110.182 159.46 110.182V109.682V109.182C146.378 109.182 135.664 119.29 134.756 132.1L135.255 132.136ZM209.727 109.682L209.727 110.182C222.283 110.182 232.562 119.884 233.432 132.171L233.931 132.136L234.43 132.1C233.522 119.29 222.809 109.182 209.727 109.182L209.727 109.682ZM233.931 132.136V131.636H185.522V132.136V132.636H233.931V132.136ZM185.522 132.136L186.02 132.171C186.891 119.883 197.17 110.182 209.727 110.182V109.682V109.182C196.645 109.182 185.93 119.29 185.023 132.1L185.522 132.136Z" fill="${Colors.instrumentTickMarkSecondary}"/>
          </g>
          <g id="Vector 487">
            <path d="M246.97 145.906V149.045C246.97 154.015 242.94 158.045 237.97 158.045H27.6171V151.088L12.1333 145.906V130.558H22.5705V116.916L28.686 84.515H35.6442V116.916H46.9239V100.818V94.9342L44.3418 93.0368L46.0813 91.5798H55.526L55.2569 75.1357H59.1278L63.2679 91.5798H70.1422C75.3109 91.5798 80.4154 92.7254 85.0884 94.9342H81.8626L77.9917 100.818V130.558H194.664L207.567 118.832H247.867C247.867 118.832 247.867 126.295 243.518 130.558C240.222 133.789 240.039 138.438 240.039 138.438C243.867 138.438 246.97 141.542 246.97 145.369V145.906Z" fill="${Colors.instrumentFramePrimary}"/>
            <path d="M12.1333 145.906H246.97M22.5705 130.558H12.1333V145.906L27.6171 151.088V158.045H237.97C242.94 158.045 246.97 154.015 246.97 149.045V145.906M246.97 145.906V145.369C246.97 141.542 243.867 138.438 240.039 138.438C240.039 138.438 240.222 133.789 243.518 130.558C247.867 126.295 247.867 118.832 247.867 118.832H207.567L194.664 130.558H77.9917M22.5705 130.558H77.9917M22.5705 130.558V116.916L28.686 84.515H35.6442V116.916H46.9239V100.818M46.9239 100.818H77.9917M46.9239 100.818V94.9342M77.9917 100.818L81.8626 94.9342H46.9239M77.9917 100.818V130.558M46.9239 94.9342H85.0884C80.4154 92.7254 75.3109 91.5798 70.1422 91.5798H63.2679M46.9239 94.9342L44.3418 93.0368L46.0813 91.5798H55.526M63.2679 91.5798L59.1278 75.1357H55.2569L55.526 91.5798M63.2679 91.5798H55.526" stroke="${Colors.instrumentTickMarkSecondary}"/>
          </g>
          <ellipse id="Ellipse 130" cx="227.067" cy="128.681" rx="3.46667" ry="3.45455" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentTickMarkSecondary}"/>
        </g>
      </g>
    </svg>
  `;

  const TANKER_TOP_DOWN_VIEW = svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="260" height="73" viewBox="0 0 260 73" fill="none">
      <g id="Vessel">
        <rect x="259.5" y="0.5" width="72" height="259" transform="rotate(90 259.5 0.5)"/>
        <g id="Vessel_2">
          <path id="Vector 488" d="M12.4 12.7754L207.452 12.7754C242.331 12.7754 246.133 36.5004 246.133 36.5004C246.133 36.5004 242.331 60.2254 207.452 60.2254L12.4 60.2254C11.2954 60.2254 10.4 59.33 10.4 58.2254L10.4 54.2942L10.4 18.7066L10.4 14.7754C10.4 13.6708 11.2954 12.7754 12.4 12.7754Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentTickMarkSecondary}"/>
          <path id="Vector 489" d="M58.2855 25.5508L58.2855 7.30078L66.4094 7.30078L66.4094 21.9008L74.5333 27.3758L74.5333 45.6258L66.4094 51.1008L66.4094 65.7008L58.2855 65.7008L58.2855 47.4508L24.2667 47.4508L24.2667 25.5508L58.2855 25.5508Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentTickMarkSecondary}"/>
        </g>
        <g id="Frame 115769">
          <path id="Ellipse 127" d="M230.033 36.5C230.033 48.3053 220.182 57.8993 208 57.8994C195.818 57.8994 185.967 48.3054 185.967 36.5C185.967 24.6944 195.818 15.0996 208 15.0996C220.182 15.0997 230.033 24.6945 230.033 36.5Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentTickMarkSecondary}"/>
          <path id="Ellipse 128" d="M178.033 36.5C178.033 48.3053 168.182 57.8993 156 57.8994C143.818 57.8994 133.967 48.3054 133.967 36.5C133.967 24.6944 143.818 15.0996 156 15.0996C168.182 15.0997 178.033 24.6945 178.033 36.5Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentTickMarkSecondary}"/>
          <path id="Ellipse 129" d="M127.767 36.5C127.766 48.3053 117.915 57.8993 105.733 57.8994C93.5514 57.8994 83.7005 48.3054 83.7003 36.5C83.7003 24.6944 93.5513 15.0996 105.733 15.0996C117.916 15.0997 127.767 24.6945 127.767 36.5Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentTickMarkSecondary}"/>
        </g>
      </g>
    </svg>
  `;

  return {TANKER_SIDE_VIEW, TANKER_TOP_DOWN_VIEW};
}

function getVesselCargo(): {
  CARGO_SIDE_VIEW: TemplateResult;
  CARGO_TOP_DOWN_VIEW: TemplateResult;
} {
  const CARGO_SIDE_VIEW = svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="260" height="190" viewBox="0 0 260 190" fill="none">
      <g id="skipper-Vessel">
        <rect x="0.5" y="0.5" width="259" height="189"/>
        <g id="Frame 5583">
          <g id="Vector 487">
            <path d="M246.97 145.906V149.045C246.97 154.015 242.94 158.045 237.97 158.045H27.6171V151.088L12.1333 145.906V130.558H22.5705V116.916L28.686 84.515H35.6442V116.916H46.9239V100.818V94.9342L44.3418 93.0368L46.0813 91.5798H55.526L55.2569 75.1357H59.1278L63.2679 91.5798H70.1422C75.3109 91.5798 80.4154 92.7254 85.0884 94.9342H81.8626L77.9917 100.818V130.558H194.664L207.567 118.832H247.867C247.867 118.832 245.257 123.737 241.778 130.558C239.694 134.645 240.039 138.438 240.039 138.438C243.867 138.438 246.97 141.542 246.97 145.369V145.906Z" fill="${Colors.instrumentFramePrimary}"/>
            <path d="M12.1333 145.906H246.97M22.5705 130.558H12.1333V145.906L27.6171 151.088V158.045H237.97C242.94 158.045 246.97 154.015 246.97 149.045V145.906M246.97 145.906V145.369C246.97 141.542 243.867 138.438 240.039 138.438C240.039 138.438 239.694 134.645 241.778 130.558C245.257 123.737 247.867 118.832 247.867 118.832H207.567L194.664 130.558H77.9917M22.5705 130.558H77.9917M22.5705 130.558V116.916L28.686 84.515H35.6442V116.916H46.9239V100.818M46.9239 100.818H77.9917M46.9239 100.818V94.9342M77.9917 100.818L81.8626 94.9342H46.9239M77.9917 100.818V130.558M46.9239 94.9342H85.0884C80.4154 92.7254 75.3109 91.5798 70.1422 91.5798H63.2679M46.9239 94.9342L44.3418 93.0368L46.0813 91.5798H55.526M63.2679 91.5798L59.1278 75.1357H55.2569L55.526 91.5798M63.2679 91.5798H55.526" stroke="${Colors.instrumentTickMarkSecondary}"/>
          </g>
        <ellipse id="Ellipse 130" cx="227.067" cy="128.681" rx="3.46667" ry="3.45455" fill="none" stroke="${Colors.instrumentTickMarkSecondary}"/>
        </g>
      </g>
    </svg>
  `;

  const CARGO_TOP_DOWN_VIEW = svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="260" height="73" viewBox="0 0 260 73" fill="none">
      <g id="skipper-Vessel">
        <rect x="259.5" y="0.5" width="72" height="259" transform="rotate(90 259.5 0.5)"/>
        <g id="Vessel">
          <path id="Vector 488" d="M12.4 12.7754L207.452 12.7754C242.331 12.7754 246.133 36.5004 246.133 36.5004C246.133 36.5004 242.331 60.2254 207.452 60.2254L12.4 60.2254C11.2954 60.2254 10.4 59.33 10.4 58.2254L10.4 54.2942L10.4 18.7066L10.4 14.7754C10.4 13.6708 11.2954 12.7754 12.4 12.7754Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentTickMarkSecondary}"/>
          <path id="Vector 489" d="M63.0303 25.5498L63.0303 7.2998L73.1151 7.2998L73.1151 21.8998L83.2 27.3748L83.2 45.6248L73.1151 51.0998L73.1151 65.6998L63.0303 65.6998L63.0303 47.4498L20.8 47.4498L20.8 25.5498L63.0303 25.5498Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentTickMarkSecondary}"/>
        </g>
      </g>
    </svg>
  `;

  return {CARGO_SIDE_VIEW, CARGO_TOP_DOWN_VIEW};
}

function getVesselCarFerry(): {
  CAR_FERRY_SIDE_VIEW: TemplateResult;
  CAR_FERRY_TOP_DOWN_VIEW: TemplateResult;
} {
  const CAR_FERRY_SIDE_VIEW = svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="260" height="190" viewBox="0 0 260 190" fill="none">
      <g id="Vessel">
        <rect x="0.5" y="0.5" width="259" height="189"/>
        <g id="Vector">
          <path d="M12.1333 136.302L17.1849 133.864L76.1182 133L84.3323 124.598H122.385L123.542 120.328L121.734 114.536H120.504L124.338 110.546H135.662L139.496 114.536H138.266L136.458 120.328L137.615 124.598H175.668L183.882 133L242.815 133.864L247.867 136.302L247.866 145.368L242.815 148.353L242.556 150.979C242.463 151.914 241.893 152.637 241.184 152.757C241.065 152.777 240.946 152.774 240.825 152.774C239.121 152.78 225.494 152.846 211.739 153.585C204.118 153.994 194.957 154.812 186.388 155.686C167.643 157.598 148.837 158.91 130 158.91C111.163 158.91 92.3569 157.598 73.6124 155.686C65.0433 154.812 55.8815 153.994 48.2611 153.585C34.5059 152.846 20.8791 152.78 19.1751 152.774C19.0544 152.774 18.9354 152.777 18.8163 152.757C18.1072 152.637 17.5369 151.914 17.4445 150.979L17.1849 148.353L12.1335 145.368L12.1333 136.302Z" fill="${Colors.instrumentFramePrimary}"/>
          <path d="M183.882 133L242.815 133.864L247.867 136.302L247.866 145.368L242.815 148.353L242.556 150.979C242.463 151.914 241.893 152.637 241.184 152.757C241.065 152.777 240.946 152.774 240.825 152.774C239.121 152.78 225.494 152.846 211.739 153.585C204.118 153.994 194.957 154.812 186.388 155.686C167.643 157.598 148.837 158.91 130 158.91C111.163 158.91 92.3569 157.598 73.6124 155.686C65.0433 154.812 55.8815 153.994 48.2611 153.585C34.5059 152.846 20.8791 152.78 19.1751 152.774C19.0544 152.774 18.9354 152.777 18.8163 152.757C18.1072 152.637 17.5369 151.914 17.4445 150.979L17.1849 148.353L12.1335 145.368L12.1333 136.302L17.1849 133.864L76.1182 133M76.1182 133L84.3323 124.598H122.385M76.1182 133H183.882M122.385 124.598L123.542 120.328M122.385 124.598H137.615M123.542 120.328L121.734 114.536M123.542 120.328H136.458M121.734 114.536H120.504L124.338 110.546H135.662L139.496 114.536H138.266M121.734 114.536H138.266M12.1335 145.368H247.866M183.882 133L175.668 124.598H137.615M137.615 124.598L136.458 120.328M136.458 120.328L138.266 114.536" stroke="${Colors.instrumentTickMarkSecondary}"/>
        </g>
      </g>
    </svg>
  `;

  const CAR_FERRY_TOP_DOWN_VIEW = svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="260" height="73" viewBox="0 0 260 73" fill="none">
      <g id="Vessel">
        <rect x="259.5" y="0.5" width="72" height="259" transform="rotate(90 259.5 0.5)"/>
        <g id="Vessel_2" clip-path="url(#clip0_2061_124095)">
          <g id="Vector">
            <path d="M12.1333 33.8653C12.1328 22.2179 21.2118 12.7754 32.4116 12.7754L89.6595 12.7754L168.051 12.7754L227.588 12.7754C238.788 12.7754 247.867 22.2172 247.867 33.8643L247.867 39.1365C247.867 50.7836 238.788 60.2254 227.588 60.2254H223.133L168.051 60.2254L84.0105 60.2254L36.1039 60.2254H32.4118C21.2128 60.2254 12.1342 50.7842 12.1336 39.1376L12.1333 33.8653Z" fill="${Colors.instrumentFramePrimary}"/>
            <path d="M120.271 48.044V24.5741L139.271 24.5741V48.044H120.271Z" fill="${Colors.instrumentFramePrimary}"/>
            <path d="M84.0105 60.2254V48.8412M223.133 60.2254L168.051 60.2254L84.0105 60.2254M84.0105 60.2254L36.1039 60.2254M84.0105 48.8412L89.6595 45.3016V12.7754M84.0105 48.8412L36.1039 48.8412V60.2254M36.1039 60.2254H32.4118C21.2128 60.2254 12.1342 50.7842 12.1336 39.1376L12.1333 33.8653C12.1328 22.2179 21.2118 12.7754 32.4116 12.7754L89.6595 12.7754L168.051 12.7754M168.051 12.7754L227.588 12.7754C238.788 12.7754 247.867 22.2172 247.867 33.8643L247.867 39.1365C247.867 50.7836 238.788 60.2254 227.588 60.2254H223.133M168.051 12.7754V48.8412M168.051 60.2254V48.8412M168.051 48.8412L223.133 48.8412V60.2254M139.271 48.044H120.271V24.5741L139.271 24.5741V48.044ZM120.271 24.5741L124.394 29.74M120.271 48.044L124.394 42.8781M139.271 48.044L135.149 42.8781M139.271 24.5741L135.149 29.74M124.394 29.74V42.8781M124.394 29.74H135.149M124.394 42.8781H135.149M135.149 42.8781V29.74" stroke="${Colors.instrumentTickMarkSecondary}"/>
          </g>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_2061_124095">
          <rect width="73" height="246.133" fill="white" transform="matrix(0 1 -1 0 253.067 0)"/>
        </clipPath>
      </defs>
    </svg>
  `;

  return {CAR_FERRY_SIDE_VIEW, CAR_FERRY_TOP_DOWN_VIEW};
}

function getVesselFishing(): {
  FISHING_SIDE_VIEW: TemplateResult;
  FISHING_TOP_DOWN_VIEW: TemplateResult;
} {
  const FISHING_SIDE_VIEW = svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="260" height="190" viewBox="0 0 260 190" fill="none">
      <g id="skipper-Vessel">
        <rect x="0.5" y="0.5" width="259" height="189"/>
        <g id="Frame 5583">
          <g id="Vector 487">
            <path d="M245.4 145.062V149.909C245.4 154.88 241.371 158.909 236.4 158.909H29.5815V150.973L12.1333 145.062V128.606H19.0248V123.256H12.1333V117.906H19.0248V88.923H33.7264L42.5475 117.906H66.0702L72.931 128.606H78.6464L80.919 109.189L78.0109 100.531H75.1029L78.6464 94.7592H84.554L78.7379 76H83.1L93.2781 94.7592H93.9765C100.278 94.7592 106.56 95.4437 112.713 96.8008L129.628 100.531H125.993L121.631 109.189L145.459 127.714C172.656 124.42 186.475 112.23 186.475 112.23H203.286L198.385 88.923H203.286L211.127 112.23H247.867C230.729 124.635 227.446 139.428 227.446 139.428L236.989 137.894C241.401 137.185 245.4 140.593 245.4 145.062Z" fill="${Colors.instrumentFramePrimary}"/>
            <path d="M12.1333 145.062H245.4M19.0248 117.906H12.1333V123.256H19.0248V128.606H12.1333V145.062L29.5815 150.973V158.909H236.4C241.371 158.909 245.4 154.88 245.4 149.909V145.062M245.4 145.062C245.4 140.593 241.401 137.185 236.989 137.894L227.446 139.428C227.446 139.428 230.729 124.635 247.867 112.23H211.127M42.5475 117.906H66.0702L72.931 128.606H78.6464C78.6464 128.606 120.956 128.526 131.738 128.526C168.002 128.526 186.475 112.23 186.475 112.23H203.286M78.6464 128.606L80.919 109.189M80.919 109.189H121.631M80.919 109.189L78.0109 100.531H125.993L121.631 109.189M121.631 109.189L145.459 127.714M93.2781 94.7592H93.9765C100.278 94.7592 106.56 95.4437 112.713 96.8008L129.628 100.531H75.1029L78.6464 94.7592H84.554M93.2781 94.7592L83.1 76H78.7379L84.554 94.7592M93.2781 94.7592H84.554M19.0248 117.906V88.923H33.7264L42.5475 117.906M19.0248 117.906H42.5475M211.127 112.23L203.286 88.923H198.385L203.286 112.23M211.127 112.23H203.286" stroke="${Colors.instrumentTickMarkSecondary}"/>
          </g>
        </g>
      </g>
    </svg>
  `;

  const FISHING_TOP_DOWN_VIEW = svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="260" height="73" viewBox="0 0 260 73" fill="none">
      <g id="skipper-Vessel">
        <rect x="259.5" y="0.5" width="72" height="259" transform="rotate(90 259.5 0.5)"/>
        <g id="Vessel">
          <g id="Vector 488">
            <path d="M247.867 37.4129C247.867 37.4129 247.867 62.0504 185.087 62.0504L102.823 62.0504L49.8316 62.0504L38.3789 62.0504L25.0175 62.0504L14.1333 62.0504C13.0287 62.0504 12.1333 61.155 12.1333 60.0504L12.1333 55.891L12.1333 18.9348L12.1333 14.7754C12.1333 13.6708 13.0287 12.7754 14.1333 12.7754L25.0175 12.7754L38.3789 12.7754L49.8316 12.7754L185.087 12.7754C247.867 12.7754 247.867 37.4129 247.867 37.4129Z" fill="${Colors.instrumentFramePrimary}"/>
            <path d="M49.8316 12.7754L38.3789 12.7754L25.0175 12.7754L14.1333 12.7754C13.0287 12.7754 12.1333 13.6708 12.1333 14.7754L12.1333 18.9348L12.1333 55.891L12.1333 60.0504C12.1333 61.155 13.0287 62.0504 14.1333 62.0504L25.0175 62.0504M25.0175 12.7754L25.0175 62.0504M25.0175 62.0504L38.3789 62.0504M49.8316 62.0504L102.823 62.0504L185.087 62.0504C247.867 62.0504 247.867 37.4129 247.867 37.4129C247.867 37.4129 247.867 12.7754 185.087 12.7754L49.8316 12.7754M49.8316 62.0504L38.3789 62.0504M49.8316 62.0504L49.8316 52.0129L38.3789 52.0129M38.3789 22.8129L38.3789 52.0129L38.3789 62.0504M38.3789 12.7754L38.3789 22.8129M49.8316 12.7754L49.8316 22.8129L38.3789 22.8129M217.803 41.0629L201.579 40.1504L201.579 34.6754L217.803 33.7629L217.803 41.0629Z" stroke="${Colors.instrumentTickMarkSecondary}"/>
          </g>
          <g id="Vector 489">
            <path d="M79.95 21.4437L79.95 9.125L95.55 9.125C95.55 9.125 104.851 14.8791 110.067 18.7062C115.713 22.8498 122.85 29.6562 122.85 29.6562L122.85 46.0812C122.85 46.0812 115.295 52.1671 110.067 56.1187C104.631 60.2271 95.55 66.6125 95.55 66.6125L79.95 66.6125L79.95 54.2937L79.7333 48.1344L79.7333 27.6031L79.95 21.4437Z" fill="${Colors.instrumentFramePrimary}"/>
            <path d="M122.85 29.6562L122.85 46.0812C122.85 46.0812 115.295 52.1671 110.067 56.1187C104.631 60.2271 95.55 66.6125 95.55 66.6125L79.95 66.6125L79.95 54.2937L79.7333 48.1344L79.7333 27.6031L79.95 21.4437L79.95 9.125L95.55 9.125C95.55 9.125 104.851 14.8791 110.067 18.7062C115.713 22.8498 122.85 29.6562 122.85 29.6562ZM79.7333 27.6031L101.4 27.6031C109.04 28.0838 122.85 29.6562 122.85 29.6562M79.7333 48.1344L101.4 48.1344C109.04 47.6537 122.85 46.0812 122.85 46.0812" stroke="${Colors.instrumentTickMarkSecondary}"/>
          </g>
          <g id="Vector 490">
            <path d="M89.9167 48.1348L80.1667 48.1348L78.2167 44.0285L78.2167 31.7098L80.1667 27.6035L89.9167 27.6035L84.0667 31.7098L84.0667 44.0285L89.9167 48.1348Z" fill="${Colors.instrumentFramePrimary}"/>
            <path d="M84.0667 31.7098L89.9167 27.6035L80.1667 27.6035L78.2167 31.7098L78.2167 44.0285L80.1667 48.1348L89.9167 48.1348L84.0667 44.0285M84.0667 44.0285L84.0667 31.7098M84.0667 44.0285L78.2167 44.0285M84.0667 31.7098L78.2167 31.7098" stroke="${Colors.instrumentTickMarkSecondary}"/>
          </g>
        </g>
      </g>
    </svg>
  `;

  return {FISHING_SIDE_VIEW, FISHING_TOP_DOWN_VIEW};
}

function getVesselCargoWind(): {
  CARGO_WIND_SIDE_VIEW: TemplateResult;
  CARGO_WIND_TOP_DOWN_VIEW: TemplateResult;
} {
  const CARGO_WIND_SIDE_VIEW = svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="260" height="190" viewBox="0 0 260 190" fill="none">
      <g id="skipper-Vessel">
        <rect x="0.5" y="0.5" width="259" height="189"/>
        <g id="Vector 486">
          <path d="M198.073 131.273V123.903H185.467V121.223H186.727V106.484V76.3353V43.5066V22.7375H185.467V20.7275H213.2V22.7375V121.223V123.903H208.788V131.273H198.073Z" fill="${Colors.instrumentFramePrimary}"/>
          <path d="M186.727 121.223H185.467V123.903H198.073V131.273H208.788V123.903H213.2V121.223M186.727 121.223H213.2M186.727 121.223V106.484M186.727 22.7375H185.467V20.7275H213.2V22.7375M186.727 22.7375H213.2M186.727 22.7375V43.5066M213.2 121.223V22.7375M186.727 43.5066H203.746M186.727 43.5066V76.3353M186.727 76.3353H203.746M186.727 76.3353V106.484M186.727 106.484H203.746" stroke="${Colors.instrumentTickMarkSecondary}"/>
        </g>
        <g id="Frame 5583">
         <path id="Vector 487" d="M246.133 146.512V149.91C246.133 154.88 242.103 158.91 237.133 158.91H28.337V151.804L12.9632 146.512V130.836V109.17V101.418L10.3994 99.4802L12.1266 96.2503H21.5042L21.237 79.4551H25.0805L29.1911 96.2503H35.0723C40.7495 96.2503 46.2788 98.0606 50.8568 101.418H47.6539L43.8105 109.17V130.836H194.199L207.01 118.859H244.852C244.852 118.859 239.783 125.165 237.165 130.164C235.003 134.291 232.04 141.468 232.04 141.468L238.631 140.26C242.535 139.544 246.133 142.542 246.133 146.512Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentTickMarkSecondary}"/>
        </g>
        <g id="Vector 487_2">
          <path d="M156.472 131.273V123.903H143.866V121.223H145.127V106.484V76.3353V43.5066V22.7375H143.866V20.7275H171.6V22.7375V121.223V123.903H167.187V131.273H156.472Z" fill="${Colors.instrumentFramePrimary}"/>
          <path d="M145.127 121.223H143.866V123.903H156.472V131.273H167.187V123.903H171.6V121.223M145.127 121.223H171.6M145.127 121.223V106.484M145.127 22.7375H143.866V20.7275H171.6V22.7375M145.127 22.7375H171.6M145.127 22.7375V43.5066M171.6 121.223V22.7375M145.127 43.5066H162.145M145.127 43.5066V76.3353M145.127 76.3353H162.145M145.127 76.3353V106.484M145.127 106.484H162.145" stroke="${Colors.instrumentTickMarkSecondary}"/>
        </g>
        <g id="Vector 488">
          <path d="M114.873 131.273V123.903H102.267V121.223H103.527V106.484V76.3353V43.5066V22.7375H102.267V20.7275H130V22.7375V121.223V123.903H125.588V131.273H114.873Z" fill="${Colors.instrumentFramePrimary}"/>
          <path d="M103.527 121.223H102.267V123.903H114.873V131.273H125.588V123.903H130V121.223M103.527 121.223H130M103.527 121.223V106.484M103.527 22.7375H102.267V20.7275H130V22.7375M103.527 22.7375H130M103.527 22.7375V43.5066M130 121.223V22.7375M103.527 43.5066H120.545M103.527 43.5066V76.3353M103.527 76.3353H120.545M103.527 76.3353V106.484M103.527 106.484H120.545" stroke="${Colors.instrumentTickMarkSecondary}"/>
        </g>
        <g id="Vector 489">
          <path d="M73.2731 131.273V123.903H60.667V121.223H61.9276V106.484V76.3353V43.5066V22.7375H60.667V20.7275H88.4003V22.7375V121.223V123.903H83.9882V131.273H73.2731Z" fill="${Colors.instrumentFramePrimary}"/>
          <path d="M61.9276 121.223H60.667V123.903H73.2731V131.273H83.9882V123.903H88.4003V121.223M61.9276 121.223H88.4003M61.9276 121.223V106.484M61.9276 22.7375H60.667V20.7275H88.4003V22.7375M61.9276 22.7375H88.4003M61.9276 22.7375V43.5066M88.4003 121.223V22.7375M61.9276 43.5066H78.9458M61.9276 43.5066V76.3353M61.9276 76.3353H78.9458M61.9276 76.3353V106.484M61.9276 106.484H78.9458" stroke="${Colors.instrumentTickMarkSecondary}"/>
        </g>
      </g>
    </svg>
  `;

  const CARGO_WIND_TOP_DOWN_VIEW = svg`
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="260" height="73" viewBox="0 0 260 73" fill="none">
      <rect x="259.5" y="0.5" width="72" height="259" transform="rotate(90 259.5 0.5)"/>
      <path d="M12.3994 12.7754L207.452 12.7754C242.331 12.7754 246.133 36.5004 246.133 36.5004C246.133 36.5004 242.331 60.2254 207.452 60.2254L12.3994 60.2254C11.2948 60.2254 10.3994 59.33 10.3994 58.2254L10.3994 54.2942L10.3994 18.7066L10.3994 14.7754C10.3994 13.6708 11.2948 12.7754 12.3994 12.7754Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentTickMarkSecondary}"/>
      <path d="M25.9997 25.5498L25.9997 7.2998L46.7997 7.2998L46.7997 21.8998L53.733 27.3748L53.733 45.6248L46.7997 51.0998L46.7997 65.6998L25.9997 65.6998L25.9997 47.4498L10.833 47.4498L10.833 25.5498L25.9997 25.5498Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentTickMarkSecondary}"/>
      <use xlink:href="#stroke0_2061_124095" fill="${Colors.instrumentTickMarkSecondary}"/>
      <mask id="stroke1_2061_124095" fill="${Colors.instrumentFramePrimary}">
        <use xlink:href="#stroke0_2061_124095"/>
      </mask>
      <path d="M215.445 29.6848L216.402 29.8848L215.445 29.6848ZM192.38 44.1346L192.678 45.0985L192.38 44.1346ZM207.648 38.7228L207.35 37.7589L192.082 43.1708L192.38 44.1346L192.678 45.0985L207.945 39.6866L207.648 38.7228ZM191.685 42.8676L192.329 43.6211L204.414 32.4055L203.77 31.6521L203.126 30.8986L191.041 42.1141L191.685 42.8676ZM203.77 31.6521L204.414 32.4055C207.262 29.7628 211.212 28.8596 214.789 30.0335L215.103 29.061L215.417 28.0885C211.18 26.6979 206.5 27.7678 203.126 30.8986L203.77 31.6521ZM215.445 29.6848L214.488 29.4849C213.665 33.3335 210.947 36.4837 207.35 37.7589L207.648 38.7228L207.945 39.6866C212.207 38.1759 215.427 34.4439 216.402 29.8848L215.445 29.6848ZM191.53 43.8068L192.384 43.2873C192.444 43.3963 192.421 43.5358 192.329 43.6211L191.685 42.8676L191.041 42.1141C190.432 42.6797 190.279 43.6036 190.675 44.3262L191.53 43.8068ZM191.53 43.8068L190.675 44.3262C191.071 45.0488 191.908 45.3714 192.678 45.0985L192.38 44.1346L192.082 43.1708C192.198 43.1296 192.324 43.1783 192.384 43.2873L191.53 43.8068ZM215.445 29.6848L216.402 29.8848C216.57 29.102 216.145 28.3272 215.417 28.0885L215.103 29.061L214.789 30.0335C214.567 29.9606 214.437 29.724 214.488 29.4849L215.445 29.6848Z" fill="${Colors.instrumentTickMarkSecondary}" mask="url(#stroke1_2061_124095)"/>
      <use xlink:href="#stroke2_2061_124095" fill="${Colors.instrumentTickMarkSecondary}"/>
      <mask id="stroke3_2061_124095" fill="${Colors.instrumentFramePrimary}">
        <use xlink:href="#stroke2_2061_124095"/>
      </mask>
      <path d="M173.849 29.6848L174.805 29.8848L173.849 29.6848ZM150.783 44.1346L151.081 45.0985L150.783 44.1346ZM166.051 38.7228L165.753 37.7589L150.485 43.1708L150.783 44.1346L151.081 45.0985L166.349 39.6866L166.051 38.7228ZM150.088 42.8676L150.732 43.6211L162.818 32.4055L162.174 31.6521L161.53 30.8986L149.445 42.1141L150.088 42.8676ZM162.174 31.6521L162.818 32.4055C165.665 29.7628 169.615 28.8596 173.192 30.0335L173.506 29.061L173.821 28.0885C169.583 26.6979 164.903 27.7678 161.53 30.8986L162.174 31.6521ZM173.849 29.6848L172.892 29.4849C172.069 33.3335 169.351 36.4837 165.753 37.7589L166.051 38.7228L166.349 39.6866C170.611 38.1759 173.83 34.4439 174.805 29.8848L173.849 29.6848ZM149.933 43.8068L150.788 43.2873C150.847 43.3963 150.824 43.5358 150.732 43.6211L150.088 42.8676L149.445 42.1141C148.835 42.6797 148.682 43.6036 149.079 44.3262L149.933 43.8068ZM149.933 43.8068L149.079 44.3262C149.475 45.0488 150.311 45.3714 151.081 45.0985L150.783 44.1346L150.485 43.1708C150.602 43.1296 150.728 43.1783 150.788 43.2873L149.933 43.8068ZM173.849 29.6848L174.805 29.8848C174.973 29.102 174.548 28.3272 173.821 28.0885L173.506 29.061L173.192 30.0335C172.97 29.9606 172.841 29.724 172.892 29.4849L173.849 29.6848Z" fill="${Colors.instrumentTickMarkSecondary}" mask="url(#stroke3_2061_124095)"/>
      <use xlink:href="#stroke4_2061_124095" fill="${Colors.instrumentTickMarkSecondary}"/>
      <mask id="stroke5_2061_124095" fill="${Colors.instrumentFramePrimary}">
        <use xlink:href="#stroke4_2061_124095"/>
      </mask>
      <path d="M132.249 29.6848L133.206 29.8848L132.249 29.6848ZM109.184 44.1346L109.481 45.0985L109.184 44.1346ZM124.451 38.7228L124.154 37.7589L108.886 43.1708L109.184 44.1346L109.481 45.0985L124.749 39.6866L124.451 38.7228ZM108.489 42.8676L109.133 43.6211L121.218 32.4055L120.574 31.6521L119.93 30.8986L107.845 42.1141L108.489 42.8676ZM120.574 31.6521L121.218 32.4055C124.066 29.7628 128.016 28.8596 131.593 30.0335L131.907 29.061L132.221 28.0885C127.983 26.6979 123.304 27.7678 119.93 30.8986L120.574 31.6521ZM132.249 29.6848L131.292 29.4849C130.469 33.3335 127.751 36.4837 124.154 37.7589L124.451 38.7228L124.749 39.6866C129.011 38.1759 132.231 34.4439 133.206 29.8848L132.249 29.6848ZM108.333 43.8068L109.188 43.2873C109.248 43.3963 109.225 43.5358 109.133 43.6211L108.489 42.8676L107.845 42.1141C107.236 42.6797 107.083 43.6036 107.479 44.3262L108.333 43.8068ZM108.333 43.8068L107.479 44.3262C107.875 45.0488 108.712 45.3714 109.481 45.0985L109.184 44.1346L108.886 43.1708C109.002 43.1296 109.128 43.1783 109.188 43.2873L108.333 43.8068ZM132.249 29.6848L133.206 29.8848C133.373 29.102 132.948 28.3272 132.221 28.0885L131.907 29.061L131.593 30.0335C131.371 29.9606 131.241 29.724 131.292 29.4849L132.249 29.6848Z" fill="${Colors.instrumentTickMarkSecondary}" mask="url(#stroke5_2061_124095)"/>
      <use xlink:href="#stroke6_2061_124095" fill="${Colors.instrumentTickMarkSecondary}"/>
      <mask id="stroke7_2061_124095" fill="${Colors.instrumentFramePrimary}">
        <use xlink:href="#stroke6_2061_124095"/>
      </mask>
      <path d="M90.6484 29.6848L91.6053 29.8848L90.6484 29.6848ZM67.583 44.1346L67.8808 45.0985L67.583 44.1346ZM82.8507 38.7228L82.5529 37.7589L67.2852 43.1708L67.583 44.1346L67.8808 45.0985L83.1486 39.6866L82.8507 38.7228ZM66.8882 42.8676L67.5321 43.6211L79.6173 32.4055L78.9735 31.6521L78.3296 30.8986L66.2443 42.1141L66.8882 42.8676ZM78.9735 31.6521L79.6173 32.4055C82.465 29.7628 86.4152 28.8596 89.9922 30.0335L90.3063 29.061L90.6203 28.0885C86.3827 26.6979 81.7031 27.7678 78.3296 30.8986L78.9735 31.6521ZM90.6484 29.6848L89.6915 29.4849C88.8684 33.3335 86.1505 36.4837 82.5529 37.7589L82.8507 38.7228L83.1486 39.6866C87.4104 38.1759 90.6303 34.4439 91.6053 29.8848L90.6484 29.6848ZM66.7328 43.8068L67.5873 43.2873C67.6471 43.3963 67.624 43.5358 67.5321 43.6211L66.8882 42.8676L66.2443 42.1141C65.6349 42.6797 65.4821 43.6036 65.8783 44.3262L66.7328 43.8068ZM66.7328 43.8068L65.8783 44.3262C66.2745 45.0488 67.1109 45.3714 67.8808 45.0985L67.583 44.1346L67.2852 43.1708C67.4013 43.1296 67.5275 43.1783 67.5873 43.2873L66.7328 43.8068ZM90.6484 29.6848L91.6053 29.8848C91.7727 29.102 91.3478 28.3272 90.6203 28.0885L90.3063 29.061L89.9922 30.0335C89.7701 29.9606 89.6403 29.724 89.6915 29.4849L90.6484 29.6848Z" fill="${Colors.instrumentTickMarkSecondary}" mask="url(#stroke7_2061_124095)"/>
      <defs>
        <path d="M215.103 29.061C215.356 29.1439 215.503 29.413 215.445 29.6848C214.546 33.8887 211.577 37.3298 207.648 38.7228L192.38 44.1346C192.053 44.2505 191.698 44.1135 191.53 43.8068C191.361 43.5 191.426 43.1077 191.685 42.8676L203.77 31.6521C206.881 28.7653 211.196 27.7788 215.103 29.061Z" />
        <path d="M173.506 29.061C173.759 29.1439 173.907 29.413 173.849 29.6848C172.95 33.8887 169.981 37.3298 166.051 38.7228L150.783 44.1346C150.456 44.2505 150.101 44.1135 149.933 43.8068C149.765 43.5 149.83 43.1077 150.088 42.8676L162.174 31.6521C165.284 28.7653 169.599 27.7788 173.506 29.061Z" />
        <path d="M131.907 29.061C132.16 29.1439 132.307 29.413 132.249 29.6848C131.35 33.8887 128.381 37.3298 124.451 38.7228L109.184 44.1346C108.857 44.2505 108.502 44.1135 108.333 43.8068C108.165 43.5 108.23 43.1077 108.489 42.8676L120.574 31.6521C123.685 28.7653 128 27.7788 131.907 29.061Z" />
        <path d="M90.3063 29.061C90.5589 29.1439 90.7065 29.413 90.6484 29.6848C89.7493 33.8887 86.7804 37.3298 82.8507 38.7228L67.583 44.1346C67.2561 44.2505 66.901 44.1135 66.7328 43.8068C66.5646 43.5 66.6295 43.1077 66.8882 42.8676L78.9735 31.6521C82.084 28.7653 86.399 27.7788 90.3063 29.061Z" />
      </defs>
    </svg>
  `;

  return {CARGO_WIND_SIDE_VIEW, CARGO_WIND_TOP_DOWN_VIEW};
}

function getVesselSOV(): {
  SOV_SIDE_VIEW: TemplateResult;
  SOV_TOP_DOWN_VIEW: TemplateResult;
} {
  const SOV_SIDE_VIEW = svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="260" height="190" viewBox="0 0 260 190" fill="none">
      <g id="skipper-Vessel">
        <rect x="0.5" y="0.5" width="259" height="189"/>
        <g id="Frame 5583">
          <g id="Vector 487">
            <path d="M34.4624 158.91H236.13C242.794 158.91 248.195 153.416 248.195 146.638C248.195 142.011 245.205 138.804 241.193 136.622C239.063 135.462 237.733 133.657 239.394 130.458C241.964 125.509 248.195 113.884 248.195 113.884C234.9 110.884 211.61 109.653 185.244 109.174V104.506L189.016 96.8337H192.159L178.12 93.6605C172.409 92.3699 166.577 91.7187 160.728 91.7187L158.772 88.0246H171.101L175.903 82.8528H155.904L151.927 75.0951H148.155L151.154 82.8528H124.489V53.5459H106.692V132.056H12.5955C12.5955 132.056 10.9282 143.19 19.3753 146.638L34.4624 151.876V158.91ZM126.749 108.925L124.489 113.083V91.7187V88.0246H152.067L153.184 91.7187H150.232L145.147 94.9156H128.882L126.367 96.8337H128.882L131.396 104.506V108.919C129.861 108.923 128.312 108.925 126.749 108.925Z" fill-rule="evenodd" clip-rule="evenodd" fill="${Colors.instrumentFramePrimary}"/>
            <path d="M19.3753 146.638C108.735 146.638 248.195 146.638 248.195 146.638M106.692 132.056H12.5955C12.5955 132.056 10.9282 143.19 19.3753 146.638C25.2672 148.684 34.4624 151.876 34.4624 151.876M236.13 158.91H34.4624V151.876L19.3753 146.638M248.195 146.638V149.91C248.195 154.88 244.166 158.91 239.195 158.91H236.13M248.195 146.638V145.834C248.195 141.695 245.57 138.667 241.813 136.932C241.601 136.834 241.394 136.73 241.193 136.622M248.195 146.638C248.195 142.011 245.205 138.804 241.193 136.622M248.195 146.638C248.195 153.416 242.794 158.91 236.13 158.91M124.489 113.083L126.749 108.925C128.312 108.925 129.861 108.923 131.396 108.919C176.795 108.798 226.187 108.919 248.195 113.884C248.195 113.884 241.964 125.509 239.394 130.458C237.733 133.657 239.063 135.462 241.193 136.622M248.195 113.884C234.9 110.884 211.61 109.653 185.244 109.174V104.506M131.396 104.506H185.244M131.396 104.506L128.882 96.8337M131.396 104.506V108.919M185.244 104.506L189.016 96.8337M189.016 96.8337H128.882M189.016 96.8337H192.159M153.184 91.7187H150.232L145.147 94.9156H128.882L126.367 96.8337H128.882M160.728 91.7187C166.577 91.7187 172.409 92.3699 178.12 93.6605L192.159 96.8337H126.367M160.728 91.7187H153.184M160.728 91.7187L158.772 88.0246M160.728 91.7187C166.577 91.7187 172.415 92.371 178.12 93.6605M153.184 91.7187L152.067 88.0246M106.692 132.056V53.5459H124.489V82.8528M106.692 132.056H114.177L124.489 113.083M124.489 88.0246V91.7187V113.083M124.489 88.0246V82.8528M124.489 88.0246H152.067M124.489 82.8528H151.154M155.904 82.8528H175.903L171.101 88.0246H158.772M155.904 82.8528L151.927 75.0951H148.155L151.154 82.8528M155.904 82.8528H151.154M152.067 88.0246H158.772M124.489 113.611V113.083" stroke="${Colors.instrumentTickMarkSecondary}"/>
          </g>
        </g>
      </g>
    </svg>
  `;

  const SOV_TOP_DOWN_VIEW = svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="260" height="74" viewBox="0 0 260 74" fill="none">
      <g id="skipper-Vessel">
        <rect x="259.5" y="0.5" width="72" height="259" transform="rotate(90 259.5 0.5)"/>
        <g id="Vessel">
          <path id="Vector 488" d="M128.353 12.7754L194.02 12.7754C249.6 12.7754 249.6 36.5004 249.6 36.5004C249.6 36.5004 249.6 60.2254 194.02 60.2254L128.353 60.2254L37.5912 60.2254C24.4883 60.2254 13.8662 49.6034 13.8662 36.5004C13.8662 23.3974 24.4883 12.7754 37.5912 12.7754L128.353 12.7754Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentTickMarkSecondary}"/>
          <path id="Vector 489" d="M132.64 26.2342L126.1 20.9873L126.1 12.7748L132.85 7.2998L158.166 7.2998L167.871 20.0748L190.233 28.2873L190.233 44.7123L167.871 52.9248L158.166 65.6998L132.64 65.6998L126.1 60.2248L126.1 52.0123L132.64 46.7654L139.601 46.7654L139.601 26.2342L132.64 26.2342Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentTickMarkSecondary}"/>
          <path id="Vector 490" d="M157.299 45.624L148.633 45.624L146.899 41.974L146.899 31.024L148.633 27.374L157.299 27.374L152.099 31.024L152.099 41.974L157.299 45.624Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentTickMarkSecondary}"/>
          <g id="Frame 5621">
            <g id="Rectangle 3467987">
              <path d="M123.605 39.9141L126.49 34.6531L153.835 51.2752L150.95 56.5362L123.605 39.9141Z" fill="${Colors.instrumentFramePrimary}"/>
              <path d="M124.273 39.7354L123.846 39.4756L123.605 39.9141L124.033 40.1738L124.273 39.7354ZM126.677 35.3512L126.918 34.9128L126.49 34.6531L126.25 35.0915L126.677 35.3512ZM153.167 51.4539L153.594 51.7136L153.835 51.2752L153.407 51.0155L153.167 51.4539ZM150.763 55.838L150.522 56.2764L150.95 56.5362L151.19 56.0977L150.763 55.838ZM124.273 39.7354L124.7 39.9951L127.104 35.611L126.677 35.3512L126.25 35.0915L123.846 39.4756L124.273 39.7354ZM126.677 35.3512L126.437 35.7897L152.926 51.8923L153.167 51.4539L153.407 51.0155L126.918 34.9128L126.677 35.3512ZM153.167 51.4539L152.74 51.1942L150.336 55.5783L150.763 55.838L151.19 56.0977L153.594 51.7136L153.167 51.4539ZM150.763 55.838L151.003 55.3996L124.514 39.297L124.273 39.7354L124.033 40.1738L150.522 56.2764L150.763 55.838Z" fill="${Colors.instrumentTickMarkSecondary}"/>
            </g>
            <g id="Ellipse 107">
              <path d="M127.934 32.0186C130.765 33.7398 131.769 37.4906 130.176 40.3962C128.583 43.3017 124.996 44.2617 122.164 42.5405C119.333 40.8192 118.329 37.0684 119.922 34.1629C121.515 31.2573 125.102 30.2973 127.934 32.0186Z" fill="${Colors.instrumentFramePrimary}"/>
              <path d="M127.693 32.457L127.453 32.8954C129.813 34.3298 130.649 37.4554 129.322 39.8767L129.749 40.1364L130.176 40.3962C131.769 37.4906 130.765 33.7398 127.934 32.0186L127.693 32.457ZM129.749 40.1364L129.322 39.8767C127.994 42.298 125.005 43.098 122.645 41.6636L122.405 42.1021L122.164 42.5405C124.996 44.2617 128.583 43.3017 130.176 40.3962L129.749 40.1364ZM122.405 42.1021L122.645 41.6636C120.285 40.2292 119.449 37.1036 120.776 34.6823L120.349 34.4226L119.922 34.1629C118.329 37.0684 119.333 40.8192 122.164 42.5405L122.405 42.1021ZM120.349 34.4226L120.776 34.6823C122.104 32.261 125.093 31.461 127.453 32.8954L127.693 32.457L127.934 32.0186C125.102 30.2973 121.515 31.2573 119.922 34.1629L120.349 34.4226Z" fill="${Colors.instrumentTickMarkSecondary}"/>
            </g>
          </g>
        </g>
      </g>
    </svg>
  `;

  return {SOV_SIDE_VIEW, SOV_TOP_DOWN_VIEW};
}

function getVesselPSV(): {
  PSV_SIDE_VIEW: TemplateResult;
  PSV_TOP_DOWN_VIEW: TemplateResult;
} {
  const PSV_SIDE_VIEW = svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="260" height="190" viewBox="0 0 260 190" fill="none">
      <g id="skipper-Vessel">
        <rect x="0.5" y="0.5" width="259" height="189"/>
        <g id="Frame 5583">
          <path id="Vector 487" d="M247.866 145.916V149.045C247.866 154.015 243.837 158.045 238.866 158.045H27.6757V151.093L12.1328 145.916V131.504H152.019L174.685 109.386L172.095 101.803H169.504L172.095 99.9072H176.628V96.7475H177.923L172.742 80.3174H176.628L185.695 96.7475C191.722 96.7475 197.732 97.3916 203.622 98.6689L218.076 101.803H214.838L210.952 109.386L220.666 118.865H246.571C246.571 118.865 241.446 125.033 238.799 129.924C236.614 133.961 233.619 140.983 233.619 140.983L240.519 139.758C244.351 139.079 247.866 142.025 247.866 145.916Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentTickMarkSecondary}"/>
        </g>
      </g>
    </svg>
  `;

  const PSV_TOP_DOWN_VIEW = svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="260" height="73" viewBox="0 0 260 73" fill="none">
      <g id="skipper-Vessel">
        <rect x="259.5" y="0.5" width="72" height="259" transform="rotate(90 259.5 0.5)" />
        <g id="Vessel">
          <path id="Vector 488" d="M137.666 10.9502L192.287 10.9502C247.866 10.9502 247.866 35.5877 247.866 35.5877C247.866 35.5877 247.866 60.2252 192.287 60.2252L119.459 60.2252L14.1328 60.2252C13.0282 60.2252 12.1328 59.3298 12.1328 58.2252L12.1328 54.0658L12.1328 17.1096L12.1328 12.9502C12.1328 11.8456 13.0282 10.9502 14.1328 10.9502L137.666 10.9502Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentTickMarkSecondary}" stroke-width="1"/>
          <path id="Vector 489" d="M174.416 20.0746L174.416 7.75586L190.016 7.75586L197.816 20.0746L217.316 28.2871L217.316 44.7121L197.816 52.9246L190.016 65.2434L174.416 65.2434L174.416 52.9246L168.566 46.7652L168.566 26.234L174.416 20.0746Z" fill="red}" stroke="${Colors.instrumentTickMarkSecondary}" stroke-width="1"/>
          <path id="Vector 490" d="M184.384 46.7656L174.634 46.7656L172.684 42.6594L172.684 30.3406L174.634 26.2344L184.384 26.2344L178.534 30.3406L178.534 42.6594L184.384 46.7656Z" fill="yellow}" stroke="${Colors.instrumentTickMarkSecondary}" stroke-width="1"/>
        </g>
      </g>
    </svg>
  `;

  return {PSV_SIDE_VIEW, PSV_TOP_DOWN_VIEW};
}

function getVesselCruise(): {
  CRUISE_SIDE_VIEW: TemplateResult;
  CRUISE_TOP_DOWN_VIEW: TemplateResult;
} {
  const CRUISE_SIDE_VIEW = svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="260" height="190" viewBox="0 0 260 190" fill="none">
      <g id="CRUISE">
        <rect x="0.5" y="0.5" width="259" height="189" />
        <g id="vessel">
          <path id="Vector 781" d="M197.84 159.854H32.2962H19.562L12.1338 155.805L25.3264 133.405L39.7245 133.135C85.0015 133.675 183.62 134.43 186.167 133.135C188.714 131.839 190.766 131.516 191.473 131.516H247.716C244.532 133.945 234.345 139.579 224.158 147.352C213.97 155.124 202.792 159.314 197.84 159.854Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentTickMarkSecondary}"/>
          <path id="Vector 782" d="M56.4464 106.955C54.8291 109.114 53.1312 111.381 36.6348 133.404H179.869H185.523L191.177 131.515L228.87 130.975C226.419 127.736 221.11 121.277 205.311 114.512C195.857 110.464 185.955 107.765 181.753 106.955H56.4464Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentTickMarkSecondary}"/>
          <path id="Vector 784" d="M49.8271 116.401L208.138 116.401" stroke-linecap="round" stroke="${Colors.instrumentTickMarkSecondary}"/>
          <path id="Vector 785" d="M44.1729 123.958L197.588 123.958L221.331 123.958" stroke="${Colors.instrumentTickMarkSecondary}"/>
          <path id="Line 28" d="M17.7881 145.685L226.985 145.685" stroke="${Colors.instrumentTickMarkSecondary}"/>
          <path id="Vector 786" d="M69.6162 98.4541V106.956H79.0395L74.3279 98.4541H69.6162Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentTickMarkSecondary}"/>
          <path id="Vector 787" d="M102.598 98.4541V106.956H112.021L107.309 98.4541H102.598Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentTickMarkSecondary}"/>
          <path id="Vector 788" d="M136.521 98.4541V106.956H145.945L141.233 98.4541H136.521Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentTickMarkSecondary}"/>
        </g>
      </g>
    </svg>
  `;

  const CRUISE_TOP_DOWN_VIEW = svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="260" height="73" viewBox="0 0 260 73" fill="none">
      <g id="skipper-Vessel">
        <rect x="259.5" y="0.5" width="72" height="259" transform="rotate(90 259.5 0.5)" />
        <g id="Vessel">
          <path id="Vector 488" d="M12.3994 12.7754L207.452 12.7754C242.331 12.7754 246.133 36.5004 246.133 36.5004C246.133 36.5004 242.331 60.2254 207.452 60.2254L12.3994 60.2254C11.2948 60.2254 10.3994 59.33 10.3994 58.2254L10.3994 54.2942L10.3994 18.7066L10.3994 14.7754C10.3994 13.6708 11.2948 12.7754 12.3994 12.7754Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentTickMarkSecondary}"/>
        </g>
      </g>
    </svg>
  `;

  return {CRUISE_SIDE_VIEW, CRUISE_TOP_DOWN_VIEW};
}
