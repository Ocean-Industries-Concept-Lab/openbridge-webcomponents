import {nothing, svg} from 'lit';
import {Colors} from '../interfaces.js';

type VesselDimParams = {
  sensorX: number;
  sensorY: number;
  mastEndY: number;
  verticalGuideStartY: number;
  verticalGuideEndY: number;
  ARCH_X: number;
  ARCH_Y: number;
  sensorHeightOverKeel: number;
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
  };
  coneLeftX: number;
  coneRightX: number;
  coneBottomY: number;
  toggleSLAndDLSensor: boolean;
  textOffset: number;
  ccrpX: number;

  vesselLengthComputed: number;
  sternToCCRP: number;
  bowToCCRP: number;
  vesselHeight: number;
  //Top down view params
  sensorYTop: number;
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

export function getVesselIcon(vesselType: string, dimParams: VesselDimParams) {
  const SIDE_VIEW = svg` <svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480" fill="none">
              <g id="vessel side view">
                <g id="Frame 115858">
                
                <line id="Line 22" x1="${dimParams.sensorX}" y1="${dimParams.sensorY}" x2="${dimParams.sensorX}" y2="${dimParams.mastEndY}" stroke="${Colors.instrumentRegularSecondaryDif}"/>
                 <line id="Dashed indicator"
                   x1="${dimParams.sensorX}"
                   y1="${dimParams.verticalGuideStartY}"
                   x2="${dimParams.sensorX}"
                   y2="${dimParams.verticalGuideEndY}"
                   stroke="${Colors.instrumentRegularSecondaryDif}"
                   stroke-width="1"
                   stroke-dasharray="4 4"
                 />
    
                 
    ${
      !dimParams.toggleSLAndDLSensor
        ? svg`
        <g id="Component 3" transform="translate(${dimParams.ARCH_X} ${dimParams.ARCH_Y})">
          <line x1="0" y1="0" x2="0" y2="40" stroke="${Colors.instrumentRegularSecondaryDif}"/>
          <line x1="-12.5" y1="19.5" x2="63.5" y2="19.5" stroke="${Colors.instrumentRegularSecondaryDif}"/>
          <text
            fill="${Colors.elementActiveColor}"
            font-family="Noto Sans"
            font-size="12"
          >
            <tspan x="6.5" y="15.656">+${dimParams.sensorHeightOverKeel}</tspan>
          </text>
          <line x1="0.075" y1="40.263" x2="-12.925" y2="19.2632" stroke="${Colors.instrumentRegularSecondaryDif}"/>
        </g>
      `
        : nothing
    }
    <g id="Vessel">
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
    </g>
    <g id="length">
    <g id="value">
    <text id="100" transform="translate(230 44)" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" letter-spacing="0px"><tspan x="0" y="12.656">${dimParams.vesselLengthComputed}</tspan></text>
    <path id="line_2" d="M37 62L42 64.8868V59.1132L37 62ZM444 62L439 59.1132V64.8868L444 62ZM41.5 62V62.5H439.5V62V61.5H41.5V62Z" fill="${Colors.instrumentRegularSecondaryDif}" fill-opacity="0.97"/>
    </g>
    <g id="value_2">
    <g id="SternToCCRP">
    <text id="25" transform="translate(${dimParams.sternTextX - 7} 285)" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" letter-spacing="0px"><tspan x="0" y="12.656">${dimParams.sternToCCRP}</tspan></text>
    <path id="line_3" d="${dimParams.sternLine.arrowPath}" fill="${Colors.instrumentRegularSecondaryDif}" fill-opacity="0.97"/>
    <line
      x1="${dimParams.sternLine.startX + 4.5}"
      y1="303"
      x2="${dimParams.sternLine.endX - 4.5}"
      y2="303"
      stroke="${Colors.instrumentRegularSecondaryDif}"
      stroke-width="1"
    />
    
    </g>
         <g id="Component 3-bottom" transform="translate(${dimParams.ARCH_X} ${dimParams.ARCH_BOTTOM_Y})">
      <line x1="0" y1="0" x2="0" y2="40" stroke="${Colors.instrumentRegularSecondaryDif}"/>
      <line x1="-12.5" y1="19.5" x2="63.5" y2="19.5" stroke="${Colors.instrumentRegularSecondaryDif}"/>
      <text
        fill="${Colors.elementActiveColor}"
        font-family="Noto Sans"
        font-size="12"
      >
        <tspan x="6.5" y="15.656">
          Keel
        </tspan>
      </text>
    
      <line x1="0.075" y1="40.263" x2="-12.925" y2="19.2632" stroke="${Colors.instrumentRegularSecondaryDif}"/>
    </g>
    <g id="BowToCCRP">
    <text id="75" transform="translate(${dimParams.bowTextX - 7} 285)" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" letter-spacing="0px"><tspan x="0" y="12.656">${dimParams.bowToCCRP}</tspan></text>
    <path id="line_4" d="${dimParams.bowLine.arrowPath}" fill="${Colors.instrumentRegularSecondaryDif}" fill-opacity="0.97"/>
    <line
        x1="${dimParams.bowLine.startX + 4.5}"
        y1="303"
        x2="${dimParams.bowLine.endX - 4.5}"
        y2="303"
        stroke="${Colors.instrumentRegularSecondaryDif}"
        stroke-width="1"
      />
    </g>
    </g>
    </g>
    <g id="height">
    <text id="37" transform="translate(0 180.5)" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" letter-spacing="0px"><tspan x="0" y="12.656">${dimParams.vesselHeight}</tspan></text>
    <path id="line_5" d="M18 260L20.8868 255H15.1132L18 260ZM18 117L15.1132 122H20.8868L18 117ZM18 255.5H18.5L18.5 121.5H18H17.5L17.5 255.5H18Z" fill="${Colors.instrumentRegularSecondaryDif}" fill-opacity="0.97"/>
    </g>
    <text id="Sensor" transform="translate(${dimParams.sensorX - 30} ${dimParams.sensorY - 10})" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" font-weight="bold" letter-spacing="0em"><tspan>Sensor</tspan></text>
    ${
      dimParams.sensorToCCRP !== 0
        ? svg`
                  <g id="SensorToCCRP">
                   <!-- arrows -->
                   <path
                   d="${dimParams.dim.arrowPath}"
                   fill="${Colors.elementActiveColor}"
                   fill-opacity="0.97"
                  />
                  <!-- middle line -->
                    <line
                      x1="${dimParams.dim.startX + 4.5}"
                      y1="${dimParams.dim.y}"
                      x2="${dimParams.dim.endX - 4.5}"
                      y2="${dimParams.dim.y}"
                      stroke="${Colors.elementActiveColor}"
                      stroke-width="1"
                    />
                      <!-- value -->
                      <text
                       transform="translate(${dimParams.dim.textX - dimParams.textOffset} ${dimParams.dim.y - 8})"
                       fill="${Colors.elementActiveColor}"
                       font-family="Noto Sans"
                       font-size="12"
                      >
                        <tspan>${Math.abs(dimParams.sensorToCCRP)}</tspan>
                      </text>
    
                   </g>`
        : nothing
    }
    ${
      dimParams.toggleSLAndDLSensor
        ? svg`
      <g id="SensorCone">
      <!-- left line -->
      <line
      x1="${dimParams.sensorX}"
      y1="${dimParams.sensorY}"
      x2="${dimParams.coneLeftX}"
      y2="${dimParams.coneBottomY}"
      stroke="${Colors.instrumentRegularSecondaryDif}"
      />
      
      <!-- right line -->
      <line
      x1="${dimParams.sensorX}"
      y1="${dimParams.sensorY}"
      x2="${dimParams.coneRightX}"
      y2="${dimParams.coneBottomY}"
      stroke="${Colors.instrumentRegularSecondaryDif}"
      />
      </g>
      `
        : nothing
    }
      <circle
        cx="${dimParams.sensorX}"
        cy="${dimParams.sensorY}"
        r="4.5"
        fill="${Colors.elementActiveColor}"
      />
    <g id="CCRP">
    <line
      id="line_6"
      x1="${dimParams.ccrpX}"
      y1="86"
      x2="${dimParams.ccrpX}"
      y2="297"
      stroke="${Colors.elementActiveColor}"
      stroke-width="2"
      stroke-linecap="round"
      stroke-dasharray="4 6"
    />
    <text transform="translate(${dimParams.ccrpX - 16} 320)"
          fill="${Colors.elementActiveColor}"
          font-family="Noto Sans"
          font-size="12"
          font-weight="bold"
    >
         <tspan x="0" y="0">CCRP</tspan>
    </text>
    </g>
    </g>
    </svg>`;

  const TOP_DOWN_VIEW = svg`<svg xmlns="http://www.w3.org/2000/svg" width="505" height="465" viewBox="0 0 505 465" fill="none">
    <g id="vessel top view">
    <g id="Vessel">
    <g id="Vessel_2">
    <path id="Vector 488" d="M39.6328 193.266L376.592 193.266C436.578 193.266 443.117 232.5 443.117 232.5C443.117 232.5 436.578 271.734 376.592 271.734L39.6328 271.734C38.5628 271.734 37.6953 270.867 37.6953 269.797L37.6953 261.926L37.6953 203.074L37.6953 195.203C37.6953 194.133 38.5627 193.266 39.6328 193.266Z" fill="${Colors.instrumentRegularSecondaryDif}" stroke="${Colors.instrumentRegularSecondary}" stroke-width="0.96875"/>
    <path id="Vector 489" d="M115.438 215.062L115.438 186L127.062 186L127.063 209.25L138.688 217.969L138.688 247.031L127.062 255.75L127.063 279L115.438 279L115.437 249.937L66.7578 249.938L66.7578 215.062L115.438 215.062Z" fill="${Colors.instrumentRegularSecondaryDif}" stroke="${Colors.instrumentRegularSecondary}" stroke-width="0.96875"/>
    </g>
    <circle id="Ellipse 127" cx="342.125" cy="232.5" r="34.3906" transform="rotate(90 342.125 232.5)" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentRegularSecondaryDif}" stroke-width="0.96875"/>
    <circle id="Ellipse 128" cx="266.562" cy="232.5" r="34.3906" transform="rotate(90 266.562 232.5)" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentRegularSecondaryDif}" stroke-width="0.96875"/>
    <circle id="Ellipse 129" cx="191" cy="232.5" r="34.3906" transform="rotate(90 191 232.5)" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentRegularSecondaryDif}" stroke-width="0.96875"/>
    </g>
    <g id="width">
    <g id="value">
    <text id="22" transform="translate(0 224.5)" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" letter-spacing="0px"><tspan x="0" y="12.656">${dimParams.vesselWidthComputed}</tspan></text>
    <path id="line" d="M18 273.5L20.8868 268.5H15.1132L18 273.5ZM18 191.499L15.1132 196.499H20.8868L18 191.499ZM18 269H18.5L18.5 195.999H18H17.5L17.5 269H18Z" fill="${Colors.instrumentRegularSecondaryDif}" fill-opacity="0.97"/>
    </g>
    
    
    <g id="value_2">
    <g id="PortToCCRP">
    <text
      x="448"
      y="${dimParams.getMidY(
        dimParams.portDimensionLine.startY,
        dimParams.portDimensionLine.endY
      )}"
      dominant-baseline="middle"
      fill="${Colors.elementActiveColor}"
      font-family="Noto Sans"
      font-size="12"
    >
      ${dimParams.portToCCRP}
    </text>
    
    <path
      d="${(() => {
        const a = dimParams.ARROW_SIZE;
        const h = dimParams.getArrowHalfHeight();
        return `
        M467 ${dimParams.portDimensionLine.startY}
        L${467 - h} ${dimParams.portDimensionLine.startY + a}
        L${467 + h} ${dimParams.portDimensionLine.startY + a}
        Z
    
        M467 ${dimParams.portDimensionLine.endY}
        L${467 - h} ${dimParams.portDimensionLine.endY - a}
        L${467 + h} ${dimParams.portDimensionLine.endY - a}
        Z
      `;
      })()}"
      fill="${Colors.instrumentRegularSecondaryDif}"
    />
    <line
      x1="467"
      y1="${dimParams.portDimensionLine.startY + 4}"
      x2="467"
      y2="${dimParams.portDimensionLine.endY - 4}"
      stroke="${Colors.instrumentRegularSecondaryDif}"
    />
    </g>
    <!--STARBOARD -->
    <g id="StarboardToCCRP">
    <text
      x="448"
      y="${dimParams.getMidY(
        dimParams.starboardDimensionLine.startY,
        dimParams.starboardDimensionLine.endY
      )}"
      dominant-baseline="middle"
      fill="${Colors.elementActiveColor}"
      font-family="Noto Sans"
      font-size="12"
    >
      ${dimParams.starboardToCCRP}
    </text>
    
    <path
      d="${(() => {
        const a = dimParams.ARROW_SIZE;
        const h = dimParams.getArrowHalfHeight();
        return `
        M467 ${dimParams.starboardDimensionLine.startY}
        L${467 - h} ${dimParams.starboardDimensionLine.startY + a}
        L${467 + h} ${dimParams.starboardDimensionLine.startY + a}
        Z
    
        M467 ${dimParams.starboardDimensionLine.endY}
        L${467 - h} ${dimParams.starboardDimensionLine.endY - a}
        L${467 + h} ${dimParams.starboardDimensionLine.endY - a}
        Z
      `;
      })()}"
      fill="${Colors.instrumentRegularSecondaryDif}"
    />
    <line
      x1="467"
      y1="${dimParams.starboardDimensionLine.startY + 4}"
      x2="467"
      y2="${dimParams.starboardDimensionLine.endY - 4}"
      stroke="${Colors.instrumentRegularSecondaryDif}"
    />
    
    </g>
    </g>
    </g>
    <g id="length">
    <text id="100" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" letter-spacing="0px"><tspan x="230" y="314.156">${dimParams.vesselLengthComputed}</tspan></text>
    <path id="line_4" d="M31.4976 320.5L36.4976 323.387V317.613L31.4976 320.5ZM449.503 320.5L444.503 317.613V323.387L449.503 320.5ZM35.9976 320.5V321H445.003V320.5V320H35.9976V320.5Z" fill="${Colors.instrumentRegularSecondaryDif}" fill-opacity="0.97"/>
    </g>
    <g id="CCRP">
    <line id="Line 4" x1="25" y1="${dimParams.yAxisCCRPPos}" x2="465" y2="${dimParams.yAxisCCRPPos}" stroke="${Colors.elementActiveColor}" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 6"/>
    <text id="CCRP_2" fill="${Colors.elementActiveColor}" dominant-baseline="middle" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" font-weight="bold" letter-spacing="0em"><tspan x="475" y="${dimParams.yAxisCCRPPos}">CCRP</tspan></text>
    <line id="Line 3"
          y1="185.5"
          x1="${dimParams.ccrpX}"
          y2="279.5"
          x2="${dimParams.ccrpX}"
          stroke="${Colors.elementActiveColor}"
          stroke-width="2"
          stroke-linecap="round"
          stroke-dasharray="4 6"/>
    <text id="CCRP_3" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" font-weight="bold" letter-spacing="0em"><tspan x="${dimParams.ccrpX - 15}" y="296.156">CCRP</tspan></text>
    </g>
    <g id="sensor">
    <g id="sensor icon">
    <circle
      cx="${dimParams.sensorX}"
      cy="${dimParams.sensorYTop}"
      r="4.5"
      fill="${Colors.elementActiveColor}"
    />
    </g>
    <text
      x="${dimParams.sensorX - 30}"
      y="${dimParams.sensorYTop + 20}"
      fill="${Colors.elementActiveColor}"
      font-family="Noto Sans"
      font-size="12"
      font-weight="bold"
    >
      Sensor
    </text>
    
    ${
      dimParams.showSensorDim
        ? svg`
      <g id="SensorToCCRP_TOP">
        
        <!-- arrows -->
        <path d="${dimParams.sensorDim.arrowPath}" fill="${Colors.elementActiveColor}"/>
    
        <!-- line -->
        <line
          x1="${dimParams.DIM_X}"
          y1="${dimParams.sensorDim.lineStart}"
          x2="${dimParams.DIM_X}"
          y2="${dimParams.sensorDim.lineEnd}"
          stroke="${Colors.elementActiveColor}"
        />
    
        <!-- value -->
        <text
          x="${dimParams.DIM_X + 5}"
          y="${dimParams.sensorDim.textY}"
          dominant-baseline="middle"
          fill="${Colors.elementActiveColor}"
          font-family="Noto Sans"
          font-size="12"
        >
          ${Math.abs(dimParams.sensorPortStarboardOffset)}
        </text>
    
      </g>
    `
        : nothing
    }
    
    </g>
    <g id="Component 2" transform="translate(${dimParams.sensorX - 114.527} ${dimParams.sensorYTop - 230.337})">
    <circle id="Ellipse 108" cx="157.5" cy="169" r="13" stroke="${Colors.elementActiveColor}"/>
    <path id="Intersect" d="M170.989 169.5C170.732 176.558 165.058 182.232 158 182.489V169.5H170.989Z" fill="${Colors.elementActiveColor}"/>
    <path id="Intersect_2" d="M156.989 168.49H144C144.257 161.432 149.931 155.757 156.989 155.5V168.49Z" fill="${Colors.elementActiveColor}"/>
    <line id="Line 13" x1="157.5" y1="149.5" x2="157.5" y2="189.5" stroke="${Colors.elementActiveColor}"/>
    <line id="Line 14" x1="135" y1="169" x2="221" y2="169" stroke="${Colors.elementActiveColor}"/>
    <text id="+9'99" fill="${Colors.elementActiveColor}" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" letter-spacing="0px"><tspan x="177" y="165.156">${dimParams.toggleSLAndDLSensor ? 'Keel' : '+' + dimParams.sensorHeightOverKeel}</tspan></text>
    <line id="Line 20"
          x1="114.527"
          y1="230.337"
          x2="135.527"
          y2="169.337"
          stroke="${Colors.elementActiveColor}"
        />
    
    </g>
    </g>
    </svg>`;

  return {SIDE_VIEW, TOP_DOWN_VIEW};
}
