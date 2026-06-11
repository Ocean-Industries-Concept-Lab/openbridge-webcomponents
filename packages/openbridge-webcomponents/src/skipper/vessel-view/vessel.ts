import {LitElement, svg, html, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';

import {vesselStyles} from './vessel-styles.js';

@customElement('ob-vessel')
export class Vessel extends LitElement {
  @property({type: Number}) vesselWidth: number = 30;
  @property({type: Number}) vesselHeight: number = 50;
  @property({type: Number}) bowToCCRP: number = 12;
  @property({type: Number}) sternToCCRP: number = 13;
  @property({type: Number}) starboardToCCRP: number = 100;
  @property({type: Number}) portToCCRP: number = 15;
  @property({type: Number}) sensorHeightOverKeel: number = 50;
  @property({type: Number}) sensorToCCRP: number = 0;
  @property({type: Boolean}) displaySideView: boolean = false;
  @property({type: Boolean}) displayTopDownView: boolean = false;
  @property({type: Boolean}) displayAllView: boolean = false;
  @property({type: Boolean}) sideTopDownViewToggle: boolean = false;
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
  private getArrowHalfHeight() {
    return this.ARROW_SIZE * 0.577;
  }

  toggleVesselViewer(): void {
    this.sideTopDownViewToggle = !this.sideTopDownViewToggle;
  }

  getVessel() {
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
    const dimTopY = this.DIM_TOP_Y;
    const dimBottomY = this.VESSEL_BOTTOM_Y;

    const dimHeightPx = dimBottomY - dimTopY;

    const ratio =
      this.vesselHeight === 0
        ? 0
        : this.sensorHeightOverKeel / this.vesselHeight;

    // ✅ map directly into dimension scale
    const sensorY = dimBottomY - ratio * dimHeightPx;

    //CCRP to sensor DIM line
    const dimStartX = Math.min(sensorX, ccrpX);
    const dimEndX = Math.max(sensorX, ccrpX);
    const DIM_Y = 85;
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

    ////////
    //TOP DOWN VIEW LOGIC
    ////////
    const sensorYOffset = this.getOffsetYInPixels(
      this.sensorPortStarboardOffset
    );

    const sensorYRaw = this.yAxisCCRPPos + sensorYOffset;

    const sensorYTop = Math.max(
      this.TOP_Y,
      Math.min(this.BOTTOM_Y, sensorYRaw)
    );

    //vertical Dim line from CCRP to sensor
    const showSensorDim = this.sensorPortStarboardOffset !== 0;
    const DIM_X = sensorX + 15;

    const dimStartY = Math.min(sensorYTop, this.yAxisCCRPPos);
    const dimEndY = Math.max(sensorYTop, this.yAxisCCRPPos);

    const sensorDim = this.buildVerticalDimensionLine(
      DIM_X,
      dimStartY,
      dimEndY
    );

    const SIDE_VIEW = svg` <svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480" fill="none">
          <g id="vessel side view">
            <g id="Frame 115858">
            
            ${
              this.sensorToCCRP !== 0
                ? svg`
              <g id="SensorToCCRP">
               <!-- arrows -->
               <path
               d="${dim.arrowPath}"
               fill="#949191"
               fill-opacity="0.97"
              />
              <!-- middle line -->
                <line
                  x1="${dim.startX + 4.5}"
                  y1="${dim.y}"
                  x2="${dim.endX - 4.5}"
                  y2="${dim.y}"
                  stroke="#949191"
                  stroke-width="1"
                />
                  <!-- value -->
                  <text
                   transform="translate(${dim.textX - textOffset} ${dim.y - 8})"
                   fill="#1F1F1F"
                   font-family="Noto Sans"
                   font-size="12"
                  >
                    <tspan>${Math.abs(this.sensorToCCRP)}</tspan>
                  </text>

               </g>`
                : nothing
            }

            <line id="Line 22" x1="${sensorX}" y1="${sensorY}" x2="${sensorX}" y2="${mastEndY}" stroke="#BEBEBE"/>
             <line id="Dashed indicator"
               x1="${sensorX}"
               y1="${verticalGuideStartY}"
               x2="${sensorX}"
               y2="${verticalGuideEndY}"
               stroke="#BEBEBE"
               stroke-width="1"
               stroke-dasharray="4 4"
             />

             <g id="Component 3" transform="translate(${ARCH_X} ${ARCH_Y})">
              <!-- vertical line -->
              <line x1="0" y1="0" x2="0" y2="40" stroke="#949191"/>
              <!-- horizontal line -->
              <line x1="-12.5" y1="19.5" x2="63.5" y2="19.5" stroke="#949191"/>
              <!-- text -->
              <text
                fill="#1F1F1F"
                font-family="Noto Sans"
                font-size="12"
              >
                <tspan x="6.5" y="15.656">+${this.sensorHeightOverKeel}</tspan>
              </text>
              <line x1="0.075" y1="40.263" x2="-12.925" y2="19.2632" stroke="#949191"/>
            </g>

          <g id="Vessel">
           <g id="Frame 5583">
            <g id="Subtract">
<path d="M200.988 177C223.175 177 241.343 194.204 242.881 216H159.096C160.634 194.204 178.801 177 200.988 177ZM290.988 177C313.175 177 331.343 194.204 332.881 216H249.096C250.634 194.204 268.801 177 290.988 177ZM377.988 177C400.175 177 418.343 194.204 419.881 216H336.096C337.634 194.204 355.801 177 377.988 177Z" fill="white"/>
<path d="M242.881 216V216.5H243.417L243.38 215.965L242.881 216ZM159.096 216L158.597 215.965L158.559 216.5H159.096V216ZM332.881 216V216.5H333.417L333.38 215.965L332.881 216ZM249.096 216L248.597 215.965L248.559 216.5H249.096V216ZM419.881 216V216.5H420.417L420.38 215.965L419.881 216ZM336.096 216L335.597 215.965L335.559 216.5H336.096V216ZM200.988 177V177.5C222.911 177.5 240.862 194.499 242.382 216.035L242.881 216L243.38 215.965C241.823 193.909 223.44 176.5 200.988 176.5V177ZM242.881 216V215.5H159.096V216V216.5H242.881V216ZM159.096 216L159.594 216.035C161.114 194.499 179.065 177.5 200.988 177.5V177V176.5C178.537 176.5 160.154 193.909 158.597 215.965L159.096 216ZM290.988 177V177.5C312.911 177.5 330.862 194.499 332.382 216.035L332.881 216L333.38 215.965C331.823 193.909 313.44 176.5 290.988 176.5V177ZM332.881 216V215.5H249.096V216V216.5H332.881V216ZM249.096 216L249.594 216.035C251.114 194.499 269.065 177.5 290.988 177.5V177V176.5C268.537 176.5 250.154 193.909 248.597 215.965L249.096 216ZM377.988 177V177.5C399.911 177.5 417.862 194.499 419.382 216.035L419.881 216L420.38 215.965C418.823 193.909 400.44 176.5 377.988 176.5V177ZM419.881 216V215.5H336.096V216V216.5H419.881V216ZM336.096 216L336.594 216.035C338.114 194.499 356.065 177.5 377.988 177.5V177V176.5C355.537 176.5 337.154 193.909 335.597 215.965L336.096 216Z" fill="#BEBEBE"/>
</g>
<g id="Vector 487">
<path d="M421.099 261.354H64.1564V249.115L37.4531 240V213H55.4531V189L66 132H78V189H97.4531V160.681V150.33L93 146.992L96 144.429H112.288L111.824 115.5H118.5L125.64 144.429H137.445C146.388 144.429 155.216 146.446 163.272 150.33H157.709L151.033 160.681V213H352.247L374.5 192.371H444C444 192.371 444 205.5 436.5 213C430.816 218.684 430.5 226.863 430.5 226.863C437.102 226.863 442.453 232.214 442.453 238.816V240C442.453 251.794 432.892 261.354 421.099 261.354Z" fill="#BEBEBE"/>
<path d="M37.4531 240H442.453M55.4531 213H37.4531V240L64.1564 249.115V261.354H421.099C432.892 261.354 442.453 251.794 442.453 240M442.453 240V238.816C442.453 232.214 437.102 226.863 430.5 226.863C430.5 226.863 430.816 218.684 436.5 213C444 205.5 444 192.371 444 192.371H374.5L352.247 213H151.033M55.4531 213H151.033M55.4531 213V189L66 132H78V189H97.4531V160.681M97.4531 160.681H151.033M97.4531 160.681V150.33M151.033 160.681L157.709 150.33H97.4531M151.033 160.681V213M97.4531 150.33H163.272C155.216 146.446 146.388 144.429 137.445 144.429H125.64M97.4531 150.33L93 146.992L96 144.429H112.288M125.64 144.429L118.5 115.5H111.824L112.288 144.429M125.64 144.429H112.288" stroke="#8E8E8E"/>
</g>
<circle id="Ellipse 130" cx="408" cy="210" r="6" fill="#BEBEBE" stroke="#BEBEBE"/>
</g>
</g>
<g id="length">
<g id="value">
<text id="100" transform="translate(230 44)" fill="#1f1f1f" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" letter-spacing="0px"><tspan x="0" y="12.656">${this.vesselLengthComputed}</tspan></text>
<path id="line_2" d="M37 62L42 64.8868V59.1132L37 62ZM444 62L439 59.1132V64.8868L444 62ZM41.5 62V62.5H439.5V62V61.5H41.5V62Z" fill="#949191" fill-opacity="0.97"/>
</g>
<g id="value_2">
<g id="SternToCCRP">
<text id="25" transform="translate(${sternTextX - 7} 285)" fill="#1F1F1F" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" letter-spacing="0px"><tspan x="0" y="12.656">${this.sternToCCRP}</tspan></text>
<path id="line_3" d="${sternLine.arrowPath}" fill="#949191" fill-opacity="0.97"/>
<line
  x1="${sternLine.startX + 4.5}"
  y1="303"
  x2="${sternLine.endX - 4.5}"
  y2="303"
  stroke="#949191"
  stroke-width="1"
/>

</g>
     <g id="Component 3-bottom" transform="translate(${ARCH_X} ${ARCH_BOTTOM_Y})">
  <line x1="0" y1="0" x2="0" y2="40" stroke="#949191"/>
  <line x1="-12.5" y1="19.5" x2="63.5" y2="19.5" stroke="#949191"/>
  <text
    fill="#1F1F1F"
    font-family="Noto Sans"
    font-size="12"
  >
    <tspan x="6.5" y="15.656">
      Keel
    </tspan>
  </text>

  <line x1="0.075" y1="40.263" x2="-12.925" y2="19.2632" stroke="#949191"/>
</g>

<g id="BowToCCRP">
<text id="75" transform="translate(${bowTextX - 7} 285)" fill="#1F1F1F" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" letter-spacing="0px"><tspan x="0" y="12.656">${this.bowToCCRP}</tspan></text>
<path id="line_4" d="${bowLine.arrowPath}" fill="#949191" fill-opacity="0.97"/>
<line
    x1="${bowLine.startX + 4.5}"
    y1="303"
    x2="${bowLine.endX - 4.5}"
    y2="303"
    stroke="#949191"
    stroke-width="1"
  />
</g>
</g>
</g>
<g id="height">
<text id="37" transform="translate(0 180.5)" fill="#1F1F1F" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" letter-spacing="0px"><tspan x="0" y="12.656">${this.vesselHeight}</tspan></text>
<path id="line_5" d="M18 260L20.8868 255H15.1132L18 260ZM18 117L15.1132 122H20.8868L18 117ZM18 255.5H18.5L18.5 121.5H18H17.5L17.5 255.5H18Z" fill="#949191" fill-opacity="0.97"/>
</g>
<text id="Sensor" transform="translate(${sensorX - 30} ${sensorY - 10})" fill="#1f1f1f" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" font-weight="bold" letter-spacing="0em"><tspan>Sensor</tspan></text>
                <circle
                  cx="${sensorX}"
                  cy="${sensorY}"
                  r="4.5"
                  fill="#17c849"
                />

<g id="CCRP">
<line
  id="line_6"
  x1="${ccrpX}"
  y1="86"
  x2="${ccrpX}"
  y2="297"
  stroke="#1F1F1F"
  stroke-width="2"
  stroke-linecap="round"
  stroke-dasharray="4 6"
/>
<text transform="translate(${ccrpX - 16} 320)"
      fill="#1F1F1F"
      font-family="Noto Sans"
      font-size="12"
      font-weight="bold"
>
     <tspan x="0" y="0">CCRP</tspan>
</text>
</g>
</g>
</svg>`;
    ///
    ///
    ///
    const TOP_DOWN_VIEW = svg`<svg xmlns="http://www.w3.org/2000/svg" width="505" height="465" viewBox="0 0 505 465" fill="none">
<g id="vessel top view">
<g id="Vessel">
<g id="Vessel_2">
<path id="Vector 488" d="M39.6328 193.266L376.592 193.266C436.578 193.266 443.117 232.5 443.117 232.5C443.117 232.5 436.578 271.734 376.592 271.734L39.6328 271.734C38.5628 271.734 37.6953 270.867 37.6953 269.797L37.6953 261.926L37.6953 203.074L37.6953 195.203C37.6953 194.133 38.5627 193.266 39.6328 193.266Z" fill="#BEBEBE" stroke="#8E8E8E" stroke-width="0.96875"/>
<path id="Vector 489" d="M115.438 215.062L115.438 186L127.062 186L127.063 209.25L138.688 217.969L138.688 247.031L127.062 255.75L127.063 279L115.438 279L115.437 249.937L66.7578 249.938L66.7578 215.062L115.438 215.062Z" fill="#BEBEBE" stroke="#8E8E8E" stroke-width="0.96875"/>
</g>
<circle id="Ellipse 127" cx="342.125" cy="232.5" r="34.3906" transform="rotate(90 342.125 232.5)" fill="white" stroke="#BEBEBE" stroke-width="0.96875"/>
<circle id="Ellipse 128" cx="266.562" cy="232.5" r="34.3906" transform="rotate(90 266.562 232.5)" fill="white" stroke="#BEBEBE" stroke-width="0.96875"/>
<circle id="Ellipse 129" cx="191" cy="232.5" r="34.3906" transform="rotate(90 191 232.5)" fill="white" stroke="#BEBEBE" stroke-width="0.96875"/>
</g>
<g id="width">
<g id="value">
<text id="22" transform="translate(0 224.5)" fill="#1F1F1F" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" letter-spacing="0px"><tspan x="0" y="12.656">${this.vesselWidthComputed}</tspan></text>
<path id="line" d="M18 273.5L20.8868 268.5H15.1132L18 273.5ZM18 191.499L15.1132 196.499H20.8868L18 191.499ZM18 269H18.5L18.5 195.999H18H17.5L17.5 269H18Z" fill="#949191" fill-opacity="0.97"/>
</g>


<g id="value_2">
<g id="PortToCCRP">
<text
  x="448"
  y="${this.getMidY(
    this.portDimensionLine.startY,
    this.portDimensionLine.endY
  )}"
  dominant-baseline="middle"
  fill="#1F1F1F"
  font-family="Noto Sans"
  font-size="12"
>
  ${this.portToCCRP}
</text>

<path
  d="${(() => {
    const a = this.ARROW_SIZE;
    const h = this.getArrowHalfHeight();
    return `
    M467 ${this.portDimensionLine.startY}
    L${467 - h} ${this.portDimensionLine.startY + a}
    L${467 + h} ${this.portDimensionLine.startY + a}
    Z

    M467 ${this.portDimensionLine.endY}
    L${467 - h} ${this.portDimensionLine.endY - a}
    L${467 + h} ${this.portDimensionLine.endY - a}
    Z
  `;
  })()}"
  fill="#949191"
/>
<line
  x1="467"
  y1="${this.portDimensionLine.startY + 4}"
  x2="467"
  y2="${this.portDimensionLine.endY - 4}"
  stroke="#949191"
/>
</g>
<!--STARBOARD -->
<g id="StarboardToCCRP">
<text
  x="448"
  y="${this.getMidY(
    this.starboardDimensionLine.startY,
    this.starboardDimensionLine.endY
  )}"
  dominant-baseline="middle"
  fill="#1F1F1F"
  font-family="Noto Sans"
  font-size="12"
>
  ${this.starboardToCCRP}
</text>

<path
  d="${(() => {
    const a = this.ARROW_SIZE;
    const h = this.getArrowHalfHeight();
    return `
    M467 ${this.starboardDimensionLine.startY}
    L${467 - h} ${this.starboardDimensionLine.startY + a}
    L${467 + h} ${this.starboardDimensionLine.startY + a}
    Z

    M467 ${this.starboardDimensionLine.endY}
    L${467 - h} ${this.starboardDimensionLine.endY - a}
    L${467 + h} ${this.starboardDimensionLine.endY - a}
    Z
  `;
  })()}"
  fill="#949191"
/>
<line
  x1="467"
  y1="${this.starboardDimensionLine.startY + 4}"
  x2="467"
  y2="${this.starboardDimensionLine.endY - 4}"
  stroke="#949191"
/>

</g>
</g>
</g>
<g id="length">
<text id="100" fill="#1F1F1F" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" letter-spacing="0px"><tspan x="230" y="314.156">${this.vesselLengthComputed}</tspan></text>
<path id="line_4" d="M31.4976 320.5L36.4976 323.387V317.613L31.4976 320.5ZM449.503 320.5L444.503 317.613V323.387L449.503 320.5ZM35.9976 320.5V321H445.003V320.5V320H35.9976V320.5Z" fill="#949191" fill-opacity="0.97"/>
</g>
<g id="CCRP">
<line id="Line 4" x1="25" y1="${this.yAxisCCRPPos}" x2="465" y2="${this.yAxisCCRPPos}" stroke="#de1717" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 6"/>
<text id="CCRP_2" fill="#1f1f1f" dominant-baseline="middle" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" font-weight="bold" letter-spacing="0em"><tspan x="475" y="${this.yAxisCCRPPos}">CCRP</tspan></text>
<line id="Line 3"
      y1="185.5"
      x1="${ccrpX}"
      y2="279.5"
      x2="${ccrpX}"
      stroke="#1f1f1f"
      stroke-width="2"
      stroke-linecap="round"
      stroke-dasharray="4 6"/>
<text id="CCRP_3" fill="#1F1F1F" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" font-weight="bold" letter-spacing="0em"><tspan x="${ccrpX - 15}" y="296.156">CCRP</tspan></text>
</g>
<g id="sensor">
<g id="sensor icon">
<circle
  cx="${sensorX}"
  cy="${sensorYTop}"
  r="4.5"
  fill="#0f2fe3"
/>
</g>
<text
  x="${sensorX - 30}"
  y="${sensorYTop + 20}"
  fill="#1F1F1F"
  font-family="Noto Sans"
  font-size="12"
  font-weight="bold"
>
  Sensor
</text>

${
  showSensorDim
    ? svg`
  <g id="SensorToCCRP_TOP">
    
    <!-- arrows -->
    <path d="${sensorDim.arrowPath}" fill="#949191"/>

    <!-- line -->
    <line
      x1="${DIM_X}"
      y1="${sensorDim.lineStart}"
      x2="${DIM_X}"
      y2="${sensorDim.lineEnd}"
      stroke="#949191"
    />

    <!-- value -->
    <text
      x="${DIM_X + 5}"
      y="${sensorDim.textY}"
      dominant-baseline="middle"
      fill="#1F1F1F"
      font-family="Noto Sans"
      font-size="12"
    >
      ${Math.abs(this.sensorPortStarboardOffset)}
    </text>

  </g>
`
    : nothing
}

</g>
<g id="Component 2" transform="translate(${sensorX - 114.527} ${sensorYTop - 230.337})">
<circle id="Ellipse 108" cx="157.5" cy="169" r="13" stroke="#949191"/>
<path id="Intersect" d="M170.989 169.5C170.732 176.558 165.058 182.232 158 182.489V169.5H170.989Z" fill="#949191"/>
<path id="Intersect_2" d="M156.989 168.49H144C144.257 161.432 149.931 155.757 156.989 155.5V168.49Z" fill="#949191"/>
<line id="Line 13" x1="157.5" y1="149.5" x2="157.5" y2="189.5" stroke="#949191"/>
<line id="Line 14" x1="135" y1="169" x2="221" y2="169" stroke="#949191"/>
<text id="+9'99" fill="#1F1F1F" style="white-space: pre" xml:space="preserve" font-family="Noto Sans" font-size="12" letter-spacing="0px"><tspan x="177" y="165.156">+${this.sensorHeightOverKeel}</tspan></text>
<line id="Line 20"
      x1="114.527"
      y1="230.337"
      x2="135.527"
      y2="169.337"
      stroke="#949191"
    />

</g>
</g>
</svg>`;

    if (this.sideTopDownViewToggle) {
      return TOP_DOWN_VIEW;
    } else {
      return SIDE_VIEW;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-vessel': Vessel;
  }
}
