import {nothing, svg, type TemplateResult} from 'lit';
import {Colors} from '../interfaces.js';
import {VesselTypes, ViewType} from './vessel.js';

type VesselTypeData = {
  side: TemplateResult;
  topDown: TemplateResult;
  sideTopY: number;
  sideBottomY: number;
};

type DimHeightVesselParams = {
  vesselHeight: number;
  textY: number;
  arrowPath: string;
  lineStart: number;
  lineEnd: number;
};

type getSideViewParams = {
  sensorX: number; //!!!
  sensorY: number; //!!!
  mastEndY: number;
  verticalGuideStartY: number;
  verticalGuideEndY: number;
  ARCH_X: number;
  ARCH_Y: number;
  sensorHeightOverKeel: number; //!!!
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
  coneLeftX: number;
  coneRightX: number;
  coneBottomY: number;
  toggleSLAndDLSensor: boolean;
  textOffset: number; //!!!
  ccrpX: number; //!!!

  vesselLengthComputed: number;
  sternToCCRP: number;
  bowToCCRP: number;
  vesselHeight: number;
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

type sensorPositionParams = {
  sensorX: number;
  sensorY: number;
  sensorHeightOverKeel: number;
  toggleSLAndDLSensor: boolean;
  sensorToCCRP: number;
  dim: {
    arrowPath: string;
    startX: number;
    endX: number;
    y: number;
    textX: number;
  };
  textOffset: number;
  viewMode: ViewType;
};

type dimPortToCCRPParams = {
  portDimensionLine: {startY: number; endY: number};
  getMidY: (startY: number, endY: number) => number;
  portToCCRP: number;
  ARROW_SIZE: number;
  getArrowHalfHeight: () => number;
};

type dimStarboardToCCRPParams = {
  starboardDimensionLine: {startY: number; endY: number};
  getMidY: (startY: number, endY: number) => number;
  starboardToCCRP: number;
  ARROW_SIZE: number;
  getArrowHalfHeight: () => number;
};

type horizontalCCRPParams = {yAxisCCRPPos: number};

type verticalCCRPParams = {xAxisCCRPPos: number};

type sensorPosTopDownParams = {
  sensorX: number;
  sensorYTopView: number;
};

export function getVesselType(vesselType: string): VesselTypeData {
  if (vesselType === VesselTypes.TANKER) {
    const {TANKER_SIDE_VIEW, TANKER_TOP_DOWN_VIEW} = getVesselTanker();

    return {
      side: TANKER_SIDE_VIEW,
      topDown: TANKER_TOP_DOWN_VIEW,
      sideTopY: 117,
      sideBottomY: 261,
    };
  } else if (vesselType === VesselTypes.CARGO) {
    const {CARGO_SIDE_VIEW, CARGO_TOP_DOWN_VIEW} = getVesselCargo();

    return {
      side: CARGO_SIDE_VIEW,
      topDown: CARGO_TOP_DOWN_VIEW,
      sideTopY: 117,
      sideBottomY: 261,
    };
  } else if (vesselType === VesselTypes.CAR_FERRY) {
    const {CAR_FERRY_SIDE_VIEW, CAR_FERRY_TOP_DOWN_VIEW} = getVesselCarFerry();

    return {
      side: CAR_FERRY_SIDE_VIEW,
      topDown: CAR_FERRY_TOP_DOWN_VIEW,
      sideTopY: 180,
      sideBottomY: 264,
    };
  } else if (vesselType === VesselTypes.FISHING) {
    const {FISHING_SIDE_VIEW, FISHING_TOP_DOWN_VIEW} = getVesselFishing();

    return {
      side: FISHING_SIDE_VIEW,
      topDown: FISHING_TOP_DOWN_VIEW,
      sideTopY: 126,
      sideBottomY: 270,
    };
  }

  return {
    side: svg``,
    topDown: svg``,
    sideTopY: 117,
    sideBottomY: 261,
  };
}

function sensorPositioning(
  sensorPosParams: sensorPositionParams
): TemplateResult {
  return svg`
        <text id="Sensor" transform="translate(${sensorPosParams.sensorX - 30} ${sensorPosParams.sensorY - 10})" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" font-weight="bold" letter-spacing="0em"><tspan>Sensor</tspan></text>
        ${
          sensorPosParams.sensorToCCRP !== 0
            ? svg`
          <g id="SensorToCCRP">
           <!-- arrows -->
           <path
           d="${sensorPosParams.dim.arrowPath}"
           fill="${Colors.elementActiveColor}"
           fill-opacity="0.97"
          />
          <!-- middle line -->
            <line
              x1="${sensorPosParams.dim.startX + 4.5}"
              y1="${sensorPosParams.dim.y}"
              x2="${sensorPosParams.dim.endX - 4.5}"
              y2="${sensorPosParams.dim.y}"
              stroke="${Colors.elementActiveColor}"
              stroke-width="1"
            />
              <!-- value -->
            <text
                transform="translate(${sensorPosParams.dim.textX - sensorPosParams.textOffset} ${sensorPosParams.dim.y - 8})"
                fill="${Colors.elementActiveColor}"
                font-family="Noto Sans"
                font-size="12"
                >
                <tspan>${Math.abs(sensorPosParams.sensorToCCRP)}</tspan>
            </text>
    
          </g>`
            : nothing
        }
    `;
}

function dimLengthLineSideView(totalLength: number): TemplateResult {
  return svg`<g id="value">
                    <text id="100" transform="translate(230 44)" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" letter-spacing="0px"><tspan x="0" y="12.656">${totalLength}</tspan></text>
                    <path id="line_2" d="M37 62L42 64.8868V59.1132L37 62ZM444 62L439 59.1132V64.8868L444 62ZM41.5 62V62.5H439.5V62V61.5H41.5V62Z" fill="${Colors.instrumentRegularSecondaryDif}" fill-opacity="0.97"/>
                </g>`;
}

function dimHeightVesselSide(params: DimHeightVesselParams): TemplateResult {
  return svg`<g id="height">
                <text
                  x="0"
                  y="${params.textY}"
                  fill="${Colors.elementActiveColor}"
                  font-family="Noto Sans"
                  font-size="12"
                >
                  ${params.vesselHeight}
                </text>

                <path
                  d="${params.arrowPath}"
                  fill="${Colors.instrumentRegularSecondaryDif}"
                />

                <line
                  x1="18"
                  y1="${params.lineStart}"
                  x2="18"
                  y2="${params.lineEnd}"
                  stroke="${Colors.instrumentRegularSecondaryDif}"
                />
             </g>
`;
}

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

function dimHeightSensorIndicatorSide(
  sideViewParams: getSideViewParams,
  keelRefPoint: boolean
): TemplateResult {
  return svg`<g id="Component 3" transform="translate(${sideViewParams.ARCH_X} ${!keelRefPoint ? sideViewParams.ARCH_Y : sideViewParams.ARCH_BOTTOM_Y})">
          <line x1="0" y1="0" x2="0" y2="40" stroke="${Colors.instrumentRegularSecondaryDif}"/>
          <line x1="-12.5" y1="19.5" x2="63.5" y2="19.5" stroke="${Colors.instrumentRegularSecondaryDif}"/>
          ${textLabel({posX: 6.5, posY: 15.656, label: !keelRefPoint ? sideViewParams.sensorHeightOverKeel : 'Keel'})}
          <line x1="0.075" y1="40.263" x2="-12.925" y2="19.2632" stroke="${Colors.instrumentRegularSecondaryDif}"/>
        </g>`;
}

function getSensorCone(sideViewParams: getSideViewParams): TemplateResult {
  return svg`<!-- left line -->
      <line
      x1="${sideViewParams.sensorX}"
      y1="${sideViewParams.sensorY}"
      x2="${sideViewParams.coneLeftX}"
      y2="${sideViewParams.coneBottomY}"
      stroke="${Colors.instrumentRegularSecondaryDif}"
      />
      <!-- right line -->
      <line
      x1="${sideViewParams.sensorX}"
      y1="${sideViewParams.sensorY}"
      x2="${sideViewParams.coneRightX}"
      y2="${sideViewParams.coneBottomY}"
      stroke="${Colors.instrumentRegularSecondaryDif}"
      />`;
}

export function getSideView(
  vesselType: string,
  sideViewParams: getSideViewParams,
  sensorPos: sensorPositionParams,
  dimHeightVesselParams: DimHeightVesselParams
): TemplateResult {
  const VESSEL_TYPE = getVesselType(vesselType);
  return svg` <svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480" fill="none">
              <g id="vessel side view">
                <g id="Frame 115858">
                
                <line id="Line 22" x1="${sideViewParams.sensorX}" y1="${sideViewParams.sensorY}" x2="${sideViewParams.sensorX}" y2="${sideViewParams.mastEndY}" stroke="${Colors.instrumentRegularSecondaryDif}"/>
                 <line id="Dashed indicator"
                   x1="${sideViewParams.sensorX}"
                   y1="${sideViewParams.verticalGuideStartY}"
                   x2="${sideViewParams.sensorX}"
                   y2="${sideViewParams.verticalGuideEndY}"
                   stroke="${Colors.instrumentRegularSecondaryDif}"
                   stroke-width="1"
                   stroke-dasharray="4 4"
                 />
    ${
      !sideViewParams.toggleSLAndDLSensor
        ? svg`
        ${dimHeightSensorIndicatorSide(sideViewParams, false)}
      `
        : nothing
    }
      ${VESSEL_TYPE.side}
    <g id="length">
    ${dimLengthLineSideView(sideViewParams.vesselLengthComputed)}
    <g id="value_2">
    <g id="SternToCCRP">
    ${dimSternToCCRPSide(sideViewParams)}
    ${dimHeightSensorIndicatorSide(sideViewParams, true)}
    <g id="BowToCCRP">
    ${dimBowToCCRPSide(sideViewParams)}
    </g>
    </g>
    </g>
    ${dimHeightVesselSide(dimHeightVesselParams)}
    ${sensorPositioning(sensorPos)}
    ${
      sideViewParams.toggleSLAndDLSensor
        ? svg`
      <g id="SensorCone">
      ${getSensorCone(sideViewParams)}
      </g>
      `
        : nothing
    }
      <circle
        cx="${sideViewParams.sensorX}"
        cy="${sideViewParams.sensorY}"
        r="4.5"
        fill="${Colors.elementActiveColor}"
      />
    <g id="CCRP">
    <line
      id="line_6"
      x1="${sideViewParams.ccrpX}"
      y1="86"
      x2="${sideViewParams.ccrpX}"
      y2="297"
      stroke="${Colors.elementActiveColor}"
      stroke-width="2"
      stroke-linecap="round"
      stroke-dasharray="4 6"
    />
    ${textLabel({
      posX: sideViewParams.ccrpX - 16,
      posY: 320,
      label: 'CCRP',
      fontWeight: 'bold',
    })}
    </g>
    </g>
    </svg>`;
}
///
//
/*
TOP DOWN VIEW FUNCTIONS
*/
function dimLengthLineTopView(totalLength: number): TemplateResult {
  return svg`<g id="length">
                ${textLabel({posX: 230, posY: 314.156, label: totalLength})}
                <path id="line_4" d="M31.4976 320.5L36.4976 323.387V317.613L31.4976 320.5ZM449.503 320.5L444.503 317.613V323.387L449.503 320.5ZM35.9976 320.5V321H445.003V320.5V320H35.9976V320.5Z" fill="${Colors.instrumentRegularSecondaryDif}" fill-opacity="0.97"/>
                </g>`;
}

function dimWidthLineTopView(totalWidth: number): TemplateResult {
  return svg`<g id="value">
                ${textLabel({posX: 0, posY: 237, label: totalWidth})}
                <path id="line" d="M18 273.5L20.8868 268.5H15.1132L18 273.5ZM18 191.499L15.1132 196.499H20.8868L18 191.499ZM18 269H18.5L18.5 195.999H18H17.5L17.5 269H18Z" fill="${Colors.instrumentRegularSecondaryDif}" fill-opacity="0.97"/>
               </g>`;
}

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

function horizontalCCRPTopView(
  yAxisCCRPParams: horizontalCCRPParams
): TemplateResult {
  return svg`<line id="Line 4" x1="25" y1="${yAxisCCRPParams.yAxisCCRPPos}" x2="465" y2="${yAxisCCRPParams.yAxisCCRPPos}" stroke="${Colors.elementActiveColor}" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 6"/>
              ${textLabel({posX: 475, posY: yAxisCCRPParams.yAxisCCRPPos, label: 'CCRP'})}`;
}

function verticalCCRPTopView(
  xAxisCCRPParams: verticalCCRPParams
): TemplateResult {
  return svg`<line id="Line 3"
          y1="185.5"
          x1="${xAxisCCRPParams.xAxisCCRPPos}"
          y2="279.5"
          x2="${xAxisCCRPParams.xAxisCCRPPos}"
          stroke="${Colors.elementActiveColor}"
          stroke-width="2"
          stroke-linecap="round"
          stroke-dasharray="4 6"/>
          ${textLabel({posX: xAxisCCRPParams.xAxisCCRPPos - 15, posY: 296.156, label: 'CCRP'})}
          `;
}

function sensorPositionTopView(
  sensorPos: sensorPosTopDownParams
): TemplateResult {
  return svg`<g id="sensor">
        <g id="sensor icon">
            <circle
                    cx="${sensorPos.sensorX}"
                    cy="${sensorPos.sensorYTopView}"
                    r="4.5"
                    fill="${Colors.elementActiveColor}"
            />
        </g>`;
}

function textLabel(position: {
  posX: number;
  posY: number;
  label: string | number;
  fontWeight?: 'bold';
}): TemplateResult {
  return svg`<text
                    x="${position.posX}"
                    y="${position.posY}"
                    fill="${Colors.elementActiveColor}"
                    font-family="Noto Sans"
                    font-size="12"
                    font-weight="${position.fontWeight ?? 'normal'}">
                    ${position.label}
               </text>`;
}

function getSensorHeightIndicator(
  topDownViewParams: getTopDownViewParams
): TemplateResult {
  return svg`<g id="Component 2" transform="translate(${topDownViewParams.sensorX - 114.527} ${topDownViewParams.sensorYTopView - 230.337})">
    <circle id="Ellipse 108" cx="157.5" cy="169" r="13" stroke="${Colors.elementActiveColor}"/>
    <path id="Intersect" d="M170.989 169.5C170.732 176.558 165.058 182.232 158 182.489V169.5H170.989Z" fill="${Colors.elementActiveColor}"/>
    <path id="Intersect_2" d="M156.989 168.49H144C144.257 161.432 149.931 155.757 156.989 155.5V168.49Z" fill="${Colors.elementActiveColor}"/>
    <line id="Line 13" x1="157.5" y1="149.5" x2="157.5" y2="189.5" stroke="${Colors.elementActiveColor}"/>
    <line id="Line 14" x1="135" y1="169" x2="221" y2="169" stroke="${Colors.elementActiveColor}"/>
    ${textLabel({
      posX: 177,
      posY: 165.156,
      label: topDownViewParams.toggleSLAndDLSensor
        ? 'Keel'
        : '+' + topDownViewParams.sensorHeightOverKeel,
    })}
    <line id="Line 20"
          x1="114.527"
          y1="230.337"
          x2="135.527"
          y2="169.337"
          stroke="${Colors.elementActiveColor}"
        />
    </g>`;
}

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

export function getTopDownView(
  vesselType: string,
  topDownViewParams: getTopDownViewParams,
  dimPortToCCRPParams: dimPortToCCRPParams,
  dimStarboardToCCRPParams: dimStarboardToCCRPParams,
  horizontalCCRPParams: horizontalCCRPParams,
  verticalCCRPParams: verticalCCRPParams,
  sensorPosTopDownParams: sensorPosTopDownParams
): TemplateResult {
  const VESSEL_TYPE = getVesselType(vesselType);
  return svg`<svg xmlns="http://www.w3.org/2000/svg" width="505" height="465" viewBox="0 0 505 465" fill="none">
    <g id="vessel top view">
            ${VESSEL_TYPE.topDown}
    <g id="width">
    ${dimWidthLineTopView(topDownViewParams.vesselWidthComputed)}
    <g id="value_2">
    ${dimPortToCCRPLine({
      portDimensionLine: dimPortToCCRPParams.portDimensionLine,
      getMidY: dimPortToCCRPParams.getMidY,
      portToCCRP: dimPortToCCRPParams.portToCCRP,
      ARROW_SIZE: dimPortToCCRPParams.ARROW_SIZE,
      getArrowHalfHeight: dimPortToCCRPParams.getArrowHalfHeight,
    })}
    <!--STARBOARD -->
    ${dimStarboardToCCRPLine({
      starboardDimensionLine: dimStarboardToCCRPParams.starboardDimensionLine,
      getMidY: dimStarboardToCCRPParams.getMidY,
      starboardToCCRP: dimStarboardToCCRPParams.starboardToCCRP,
      ARROW_SIZE: dimStarboardToCCRPParams.ARROW_SIZE,
      getArrowHalfHeight: dimStarboardToCCRPParams.getArrowHalfHeight,
    })}
    ${dimLengthLineTopView(topDownViewParams.vesselLengthComputed)}
    </g>
    </g>
    <g id="CCRP">
    ${horizontalCCRPTopView(horizontalCCRPParams)}
    ${verticalCCRPTopView(verticalCCRPParams)}
    </g>
    ${sensorPositionTopView(sensorPosTopDownParams)}
    ${textLabel({
      posX: sensorPosTopDownParams.sensorX - 30,
      posY: sensorPosTopDownParams.sensorYTopView + 20,
      label: 'Sensor',
    })}
    ${
      topDownViewParams.showSensorDim
        ? svg`
        ${verticalDimSensorToCCRPLine(topDownViewParams)}
        <!-- value -->
        ${textLabel({
          posX: topDownViewParams.DIM_X + 5,
          posY: topDownViewParams.sensorDim.textY,
          label: Math.abs(topDownViewParams.sensorPortStarboardOffset),
        })}
      </g>
    `
        : nothing
    }
    </g>
       ${getSensorHeightIndicator(topDownViewParams)}
    </g>
    </svg>`;
}

export function getVesselIcon(
  vesselType: string,
  sideViewParams: getSideViewParams,
  sensorPositionParams: sensorPositionParams,
  topDownViewParams: getTopDownViewParams,
  portToCCRPParams: dimPortToCCRPParams,
  starboardToCCRPParams: dimStarboardToCCRPParams,
  horizontalCCRPParams: horizontalCCRPParams,
  verticalCCRPParams: verticalCCRPParams,
  sensorPosTopDownParams: sensorPosTopDownParams,
  dimHeightVesselParams: DimHeightVesselParams
) {
  const SIDE_VIEW = getSideView(
    vesselType,
    sideViewParams,
    sensorPositionParams,
    dimHeightVesselParams
  );
  const TOP_DOWN_VIEW = getTopDownView(
    vesselType,
    topDownViewParams,
    portToCCRPParams,
    starboardToCCRPParams,
    horizontalCCRPParams,
    verticalCCRPParams,
    sensorPosTopDownParams
  );

  return {SIDE_VIEW, TOP_DOWN_VIEW};
}

function getVesselTanker(): {
  TANKER_SIDE_VIEW: TemplateResult;
  TANKER_TOP_DOWN_VIEW: TemplateResult;
} {
  const TANKER_SIDE_VIEW = svg`<g id="Vessel">
        <g id="Subtract">
            <g id="Frame 5583">
                <path d="M200.988 177C223.175 177 241.343 194.204 242.881 216H159.096C160.634 194.204 178.801 177 200.988 177ZM290.988 177C313.175 177 331.343 194.204 332.881 216H249.096C250.634 194.204 268.801 177 290.988 177ZM377.988 177C400.175 177 418.343 194.204 419.881 216H336.096C337.634 194.204 355.801 177 377.988 177Z" fill="${Colors.instrumentFramePrimary}"/>
                <path d="M242.881 216V216.5H243.417L243.38 215.965L242.881 216ZM159.096 216L158.597 215.965L158.559 216.5H159.096V216ZM332.881 216V216.5H333.417L333.38 215.965L332.881 216ZM249.096 216L248.597 215.965L248.559 216.5H249.096V216ZM419.881 216V216.5H420.417L420.38 215.965L419.881 216ZM336.096 216L335.597 215.965L335.559 216.5H336.096V216ZM200.988 177V177.5C222.911 177.5 240.862 194.499 242.382 216.035L242.881 216L243.38 215.965C241.823 193.909 223.44 176.5 200.988 176.5V177ZM242.881 216V215.5H159.096V216V216.5H242.881V216ZM159.096 216L159.594 216.035C161.114 194.499 179.065 177.5 200.988 177.5V177V176.5C178.537 176.5 160.154 193.909 158.597 215.965L159.096 216ZM290.988 177V177.5C312.911 177.5 330.862 194.499 332.382 216.035L332.881 216L333.38 215.965C331.823 193.909 313.44 176.5 290.988 176.5V177ZM332.881 216V215.5H249.096V216V216.5H332.881V216ZM249.096 216L249.594 216.035C251.114 194.499 269.065 177.5 290.988 177.5V177V176.5C268.537 176.5 250.154 193.909 248.597 215.965L249.096 216ZM377.988 177V177.5C399.911 177.5 417.862 194.499 419.382 216.035L419.881 216L420.38 215.965C418.823 193.909 400.44 176.5 377.988 176.5V177ZM419.881 216V215.5H336.096V216V216.5H419.881V216ZM336.096 216L336.594 216.035C338.114 194.499 356.065 177.5 377.988 177.5V177V176.5C355.537 176.5 337.154 193.909 335.597 215.965L336.096 216Z" fill="${Colors.instrumentRegularSecondaryDif}"/>
            </g>
            <g id="Vector 487">
                <path d="M421.099 261.354H64.1564V249.115L37.4531 240V213H55.4531V189L66 132H78V189H97.4531V160.681V150.33L93 146.992L96 144.429H112.288L111.824 115.5H118.5L125.64 144.429H137.445C146.388 144.429 155.216 146.446 163.272 150.33H157.709L151.033 160.681V213H352.247L374.5 192.371H444C444 192.371 444 205.5 436.5 213C430.816 218.684 430.5 226.863 430.5 226.863C437.102 226.863 442.453 232.214 442.453 238.816V240C442.453 251.794 432.892 261.354 421.099 261.354Z" fill="${Colors.instrumentRegularTertiary}"/>
                <path d="M37.4531 240H442.453M55.4531 213H37.4531V240L64.1564 249.115V261.354H421.099C432.892 261.354 442.453 251.794 442.453 240M442.453 240V238.816C442.453 232.214 437.102 226.863 430.5 226.863C430.5 226.863 430.816 218.684 436.5 213C444 205.5 444 192.371 444 192.371H374.5L352.247 213H151.033M55.4531 213H151.033M55.4531 213V189L66 132H78V189H97.4531V160.681M97.4531 160.681H151.033M97.4531 160.681V150.33M151.033 160.681L157.709 150.33H97.4531M151.033 160.681V213M97.4531 150.33H163.272C155.216 146.446 146.388 144.429 137.445 144.429H125.64M97.4531 150.33L93 146.992L96 144.429H112.288M125.64 144.429L118.5 115.5H111.824L112.288 144.429M125.64 144.429H112.288" stroke="${Colors.instrumentRegularSecondaryDif}"/>
            </g>
            <circle id="Ellipse 130" cx="408" cy="210" r="6" fill="${Colors.instrumentRegularTertiary}" stroke="${Colors.instrumentRegularSecondaryDif}"/>
            </g>
        </g>`;

  const TANKER_TOP_DOWN_VIEW = svg`<g id="Vessel">
                <g id="Vessel_2">
                    <path id="Vector 488" d="M39.6328 193.266L376.592 193.266C436.578 193.266 443.117 232.5 443.117 232.5C443.117 232.5 436.578 271.734 376.592 271.734L39.6328 271.734C38.5628 271.734 37.6953 270.867 37.6953 269.797L37.6953 261.926L37.6953 203.074L37.6953 195.203C37.6953 194.133 38.5627 193.266 39.6328 193.266Z" fill="${Colors.instrumentRegularSecondaryDif}" stroke="${Colors.instrumentRegularSecondary}" stroke-width="0.96875"/>
                    <path id="Vector 489" d="M115.438 215.062L115.438 186L127.062 186L127.063 209.25L138.688 217.969L138.688 247.031L127.062 255.75L127.063 279L115.438 279L115.437 249.937L66.7578 249.938L66.7578 215.062L115.438 215.062Z" fill="${Colors.instrumentRegularSecondaryDif}" stroke="${Colors.instrumentRegularSecondary}" stroke-width="0.96875"/>
                </g>
                    <circle id="Ellipse 127" cx="342.125" cy="232.5" r="34.3906" transform="rotate(90 342.125 232.5)" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentRegularSecondaryDif}" stroke-width="0.96875"/>
                    <circle id="Ellipse 128" cx="266.562" cy="232.5" r="34.3906" transform="rotate(90 266.562 232.5)" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentRegularSecondaryDif}" stroke-width="0.96875"/>
                    <circle id="Ellipse 129" cx="191" cy="232.5" r="34.3906" transform="rotate(90 191 232.5)" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentRegularSecondaryDif}" stroke-width="0.96875"/>
                </g>`;

  return {TANKER_SIDE_VIEW, TANKER_TOP_DOWN_VIEW};
}

function getVesselCargo(): {
  CARGO_SIDE_VIEW: TemplateResult;
  CARGO_TOP_DOWN_VIEW: TemplateResult;
} {
  const CARGO_SIDE_VIEW = svg`<g id="Vessel">
                              <g id="Frame 5583">
                              <g id="Vector 487">
                              <path d="M421.365 261H62.7987V248.917L36 239.917V213.26H54.0643V189.566L64.6489 133.29H76.6918V189.566H96.2145V161.607V151.387L91.7454 148.091L94.7561 145.561H111.103L110.637 117H117.337L124.502 145.561H136.391C145.342 145.561 154.181 147.551 162.268 151.387H156.685L149.986 161.607V213.26H351.919L374.251 192.894H444C444 192.894 439.484 201.413 433.462 213.26C429.855 220.359 430.452 226.947 430.452 226.947C437.077 226.947 442.448 232.317 442.448 238.943V239.917C442.448 251.561 433.008 261 421.365 261Z" fill="${Colors.instrumentFramePrimary}"/>
                              <path d="M36 239.917H442.448M54.0643 213.26H36V239.917L62.7987 248.917V261H421.365C433.008 261 442.448 251.561 442.448 239.917M442.448 239.917V238.943C442.448 232.317 437.077 226.947 430.452 226.947C430.452 226.947 429.855 220.359 433.462 213.26C439.484 201.413 444 192.894 444 192.894H374.251L351.919 213.26H149.986M54.0643 213.26H149.986M54.0643 213.26V189.566L64.6489 133.29H76.6918V189.566H96.2145V161.607M96.2145 161.607H149.986M96.2145 161.607V151.387M149.986 161.607L156.685 151.387H96.2145M149.986 161.607V213.26M96.2145 151.387H162.268C154.181 147.551 145.342 145.561 136.391 145.561H124.502M96.2145 151.387L91.7454 148.091L94.7561 145.561H111.103M124.502 145.561L117.337 117H110.637L111.103 145.561M124.502 145.561H111.103" stroke="${Colors.instrumentRegularSecondaryDif}" stroke-width="3"/>
                              </g>
                              <circle id="Ellipse 130" cx="408" cy="210" r="6" fill="${Colors.instrumentRegularTertiary}" stroke="${Colors.instrumentRegularSecondaryDif}" stroke-width="3"/>
                              </g>
                              </g>
`;

  const CARGO_TOP_DOWN_VIEW = svg`<g xmlns="http://www.w3.org/2000/svg" id="Vessel">
                                  <g id="Vessel_2">
                                  <path id="Vector 488" d="M35.8984 193.684L385.977 193.684C448.284 193.684 455.077 233.002 455.077 233.002C455.077 233.002 448.284 272.321 385.977 272.321L35.8984 272.321C34.8284 272.321 33.9609 271.454 33.9609 270.384L33.9609 262.491L33.9609 203.513L33.9609 195.621C33.9609 194.551 34.8284 193.684 35.8984 193.684Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentRegularSecondaryDif}" stroke-width="0.96875"/>
                                  <path id="Vector 489" d="M114.713 215.527L114.713 186.402L126.788 186.402L126.788 209.702L138.863 218.44L138.863 247.565L126.788 256.302L126.788 279.602L114.713 279.602L114.713 250.477L64.1484 250.477L64.1484 215.527L114.713 215.527Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentRegularSecondaryDif}" stroke-width="0.96875"/>
                                  </g>
                                  </g>`;

  return {CARGO_SIDE_VIEW, CARGO_TOP_DOWN_VIEW};
}

function getVesselCarFerry(): {
  CAR_FERRY_SIDE_VIEW: TemplateResult;
  CAR_FERRY_TOP_DOWN_VIEW: TemplateResult;
} {
  const CAR_FERRY_SIDE_VIEW = svg`<g xmlns="http://www.w3.org/2000/svg" transform="translate(6 0)" id="Vessel">
                                    <g id="Vector">
                                    <path d="M30 224.735L38.7432 220.5L140.743 219L154.96 204.406H220.82L222.823 196.989L219.693 186.93H217.565L224.2 180H243.8L250.435 186.93H248.307L245.177 196.989L247.18 204.406H313.04L327.257 219L429.257 220.5L438 224.735L438 240.48L429.257 245.665L428.808 250.226C428.648 251.85 427.661 253.106 426.433 253.313C426.227 253.348 426.021 253.343 425.812 253.344C422.863 253.353 399.278 253.469 375.471 254.752C362.282 255.462 346.425 256.882 331.594 258.401C299.152 261.722 266.603 264 234 264C201.398 264 168.848 261.722 136.406 258.401C121.575 256.882 105.718 255.462 92.5288 254.752C68.7217 253.469 45.1369 253.353 42.1877 253.344C41.9788 253.343 41.7729 253.348 41.5667 253.313C40.3395 253.106 39.3524 251.85 39.1924 250.226L38.7432 245.665L30.0003 240.48L30 224.735Z" fill="${Colors.instrumentFramePrimary}"/>
                                    <path d="M327.257 219L429.257 220.5L438 224.735L438 240.48L429.257 245.665L428.808 250.226C428.648 251.85 427.661 253.106 426.433 253.313C426.227 253.348 426.021 253.343 425.812 253.344C422.863 253.353 399.278 253.469 375.471 254.752C362.282 255.462 346.425 256.882 331.594 258.401C299.152 261.722 266.603 264 234 264C201.398 264 168.848 261.722 136.406 258.401C121.575 256.882 105.718 255.462 92.5288 254.752C68.7217 253.469 45.1369 253.353 42.1877 253.344C41.9788 253.343 41.7729 253.348 41.5667 253.313C40.3395 253.106 39.3524 251.85 39.1924 250.226L38.7432 245.665L30.0003 240.48L30 224.735L38.7432 220.5L140.743 219M140.743 219L154.96 204.406H220.82M140.743 219H327.257M220.82 204.406L222.823 196.989M220.82 204.406H247.18M222.823 196.989L219.693 186.93M222.823 196.989H245.177M219.693 186.93H217.565L224.2 180H243.8L250.435 186.93H248.307M219.693 186.93H248.307M30.0003 240.48H438M327.257 219L313.04 204.406H247.18M247.18 204.406L245.177 196.989M245.177 196.989L248.307 186.93" stroke="${Colors.instrumentRegularSecondaryDif}" stroke-width="3"/>
                                    </g>
                                    </g>`;

  const CAR_FERRY_TOP_DOWN_VIEW = svg`<g xmlns="http://www.w3.org/2000/svg" id="Vessel">
<g id="Vessel_2" clip-path="url(#clip0_2292_66565)">
<g id="Vector">
<path d="M31.6987 228.153C31.6977 208.767 47.9165 193.051 67.9237 193.051L170.191 193.051L310.229 193.051L416.588 193.051C436.594 193.051 452.813 208.766 452.812 228.151L452.812 236.926C452.812 256.311 436.594 272.026 416.588 272.026H408.628H310.229L160.1 272.026H74.5197H67.9242C47.9184 272.026 31.7002 256.312 31.6992 236.928L31.6987 228.153Z" fill="${Colors.instrumentFramePrimary}"/>
<path d="M224.876 251.751V212.688L258.817 212.688V251.751H224.876Z" fill="${Colors.instrumentFramePrimary}"/>
<path d="M160.1 272.026V253.078M408.628 272.026H310.229L160.1 272.026M160.1 272.026H74.5197M160.1 253.078L170.191 247.187V193.051M160.1 253.078H74.5197V272.026M74.5197 272.026H67.9242C47.9184 272.026 31.7002 256.312 31.6992 236.928L31.6987 228.153C31.6977 208.767 47.9165 193.051 67.9237 193.051L170.191 193.051L310.229 193.051M310.229 193.051L416.588 193.051C436.594 193.051 452.813 208.766 452.812 228.151L452.812 236.926C452.812 256.311 436.594 272.026 416.588 272.026H408.628M310.229 193.051V253.078M310.229 272.026V253.078M310.229 253.078H408.628V272.026M258.817 251.751H224.876V212.688L258.817 212.688V251.751ZM224.876 212.688L232.24 221.286M224.876 251.751L232.24 243.153M258.817 251.751L251.453 243.153M258.817 212.688L251.453 221.286M232.24 221.286V243.153M232.24 221.286H251.453M232.24 243.153H251.453M251.453 243.153V221.286" stroke="${Colors.instrumentRegularSecondaryDif}" stroke-width="0.96875"/>
</g>
</g>
</g>
`;

  return {CAR_FERRY_SIDE_VIEW, CAR_FERRY_TOP_DOWN_VIEW};
}

function getVesselFishing(): {
  FISHING_SIDE_VIEW: TemplateResult;
  FISHING_TOP_DOWN_VIEW: TemplateResult;
} {
  const FISHING_SIDE_VIEW = svg`<g xmlns="http://www.w3.org/2000/svg" id="Vessel">
                                  <g id="Frame 5583">
                                  <g id="Vector 487">
                                  <path d="M415.68 270H66.1988V256.215L36 245.949V217.368H47.9275V208.076H36V198.784H47.9275V148.445H73.3727L88.6398 198.784H129.352L141.227 217.368H151.119L155.052 183.645L150.019 168.607H144.986L151.119 158.582H161.343L151.277 126H158.827L176.443 158.582C188.152 158.582 199.826 159.858 211.258 162.388L239.357 168.607H233.065L225.516 183.645L266.757 215.819C313.828 210.098 337.745 188.926 337.745 188.926H366.841L358.359 148.445H366.841L380.412 188.926H444C414.339 210.471 408.656 236.165 408.656 236.165L425.124 233.509C432.785 232.273 439.731 238.189 439.731 245.949C439.731 259.232 428.963 270 415.68 270Z" fill="${Colors.instrumentFramePrimary}"/>
                                  <path d="M36 245.949H439.731M47.9275 198.784H36V208.076H47.9275V217.368H36V245.949L66.1988 256.215V270H415.68C428.963 270 439.731 259.232 439.731 245.949M439.731 245.949C439.731 238.189 432.785 232.273 425.124 233.509L408.656 236.165C408.656 236.165 414.339 210.471 444 188.926H380.412M88.6398 198.784H129.352L141.227 217.368H151.119C151.119 217.368 224.347 217.229 243.008 217.229C305.773 217.229 337.745 188.926 337.745 188.926H366.841M151.119 217.368L155.052 183.645M155.052 183.645H225.516M155.052 183.645L150.019 168.607H233.065L225.516 183.645M225.516 183.645L266.757 215.819M176.443 158.582L158.827 126H151.277L161.343 158.582M176.443 158.582H161.343M176.443 158.582C188.152 158.582 199.826 159.858 211.259 162.388L239.357 168.607H144.986L151.119 158.582H161.343M47.9275 198.784V148.445H73.3727L88.6398 198.784M47.9275 198.784H88.6398M380.412 188.926L366.841 148.445H358.359L366.841 188.926M380.412 188.926H366.841" stroke="${Colors.instrumentRegularSecondaryDif}" stroke-width="3"/>
                                  </g>
                                  </g>
                                  </g>`;

  const FISHING_TOP_DOWN_VIEW = svg`<g xmlns="http://www.w3.org/2000/svg" id="Vessel">
<g id="Vessel_2">
<g id="Vector 488">
<path d="M455.831 231.808C455.831 231.808 455.831 271.295 343.681 271.295L196.725 271.295L102.06 271.295L81.6012 271.295L57.7323 271.295L36.6533 271.295C35.5833 271.295 34.7158 270.428 34.7158 269.358L34.7158 261.423L34.7158 202.192L34.7158 194.258C34.7158 193.188 35.5833 192.32 36.6533 192.32L57.7323 192.32L81.6012 192.32L102.06 192.32L343.681 192.32C455.831 192.32 455.831 231.808 455.831 231.808Z" fill="${Colors.instrumentFramePrimary}"/>
<path d="M102.06 192.32L81.6012 192.32L57.7323 192.32L36.6533 192.32C35.5833 192.32 34.7158 193.188 34.7158 194.258L34.7158 202.192L34.7158 261.423L34.7158 269.358C34.7158 270.428 35.5833 271.295 36.6533 271.295L57.7323 271.295M57.7323 192.32L57.7323 271.295M57.7323 271.295L81.6012 271.295M102.06 271.295L196.725 271.295L343.681 271.295C455.831 271.295 455.831 231.808 455.831 231.808C455.831 231.808 455.831 192.32 343.681 192.32L102.06 192.32M102.06 271.295L81.6012 271.295M102.06 271.295L102.06 255.208L81.6012 255.208M81.6012 208.408L81.6012 255.208L81.6012 271.295M81.6012 192.32L81.6012 208.408M102.06 192.32L102.06 208.408L81.6012 208.408M402.126 237.658L373.143 236.195L373.143 227.42L402.126 225.958L402.126 237.658Z" stroke="${Colors.instrumentRegularSecondaryDif}" stroke-width="0.96875"/>
</g>
<g id="Vector 489">
<path d="M151.315 206.947L151.315 187.203L178.484 187.203C178.484 187.203 194.682 196.425 203.766 202.559C213.6 209.2 226.029 220.109 226.029 220.109L226.029 246.434C226.029 246.434 212.87 256.188 203.766 262.522C194.3 269.107 178.484 279.341 178.484 279.341L151.315 279.341L151.315 259.597L150.938 249.725L150.938 216.819L151.315 206.947Z" fill="${Colors.instrumentFramePrimary}"/>
<path d="M226.029 220.109L226.029 246.434C226.029 246.434 212.87 256.188 203.766 262.522C194.3 269.107 178.484 279.341 178.484 279.341L151.315 279.341L151.315 259.597L150.938 249.725L150.937 216.819L151.315 206.947L151.315 187.203L178.484 187.203C178.484 187.203 194.682 196.425 203.766 202.559C213.6 209.2 226.029 220.109 226.029 220.109ZM150.937 216.819L188.672 216.819C201.977 217.589 226.029 220.109 226.029 220.109M150.938 249.725L188.672 249.725C201.977 248.955 226.029 246.434 226.029 246.434" stroke="${Colors.instrumentRegularSecondaryDif}" stroke-width="0.96875"/>
</g>
<g id="Vector 490">
<path d="M168.673 249.723L151.692 249.723L148.296 243.141L148.296 223.398L151.692 216.816L168.673 216.816L158.484 223.398L158.484 243.141L168.673 249.723Z" fill="${Colors.instrumentFramePrimary}"/>
<path d="M158.484 223.398L168.673 216.816L151.692 216.816L148.296 223.398L148.296 243.141L151.692 249.723L168.673 249.723L158.484 243.141M158.484 243.141L158.484 223.398M158.484 243.141L148.296 243.141M158.484 223.398L148.296 223.398" stroke="${Colors.instrumentRegularSecondaryDif}" stroke-width="0.96875"/>
</g>
</g>
</g>`;

  return {FISHING_SIDE_VIEW, FISHING_TOP_DOWN_VIEW};
}
