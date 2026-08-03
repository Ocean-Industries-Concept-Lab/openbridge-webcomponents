import {LitElement, svg, html, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import { longLatStyles } from './long-lat-styles.js';
import { Colors, MeasurementPosition, SpeedType } from '../interfaces.js';
import { InstrumentFieldSize } from '../../navigation-instruments/instrument-field/instrument-field.js';

@customElement('ob-long-lat')
export class LongLat extends LitElement {
    @property({type: Number}) longMaxSpeed = 25;
    @property({type: Number}) latMaxSpeed = 5;
    @property({type: Number}) longSpeed = 5;
    @property({type: Number}) latFrontSpeed = undefined;
    @property({type: Number}) latMiddleSpeed = undefined;
    @property({type: Number}) latAftSpeed = undefined;
    @property({type: String}) speedType = SpeedType.SOG;

    @property({type: String}) measurementPosition = MeasurementPosition.Sensor;
    @property({type: Number}) bowToCCRP = 25;
    @property({type: Number}) sternToCCRP = 25;
    @property({type: Number}) sensorToCCRP = 15;

    longSpeedRatio = 1;
    latFrontSpeedRatio = 1;
    latMiddleSpeedRatio = 1;
    latAftSpeedRatio = 1;

    private lowIntegrity = false;

    override render() {
        this.setLongSpeedRatio();
        this.setLatFrontSpeedRatio();
        this.setLatMiddleSpeedRatio();
        this.setLatAftSpeedRatio();
        
        return html`
          <div class="container">
            ${this.getLongLat()}
          </div>
        `;
    }

    static override styles = [
        longLatStyles
    ];

    private isValidNumber(value: number | undefined): boolean {
        return typeof value === 'number' && !isNaN(value);
    }

    setLongSpeedRatio() {
        this.longSpeedRatio = Math.abs(this.longSpeed / this.longMaxSpeed);
    }

    setLatFrontSpeedRatio() {
        if (this.latFrontSpeed != undefined)
            this.latFrontSpeedRatio = Math.abs(this.latFrontSpeed / this.latMaxSpeed);
    }

    setLatMiddleSpeedRatio() {
        if (this.latMiddleSpeed != undefined)
            this.latMiddleSpeedRatio = Math.abs(this.latMiddleSpeed / this.latMaxSpeed);
    }

    setLatAftSpeedRatio() {
        if (this.latAftSpeed != undefined)
            this.latAftSpeedRatio = Math.abs(this.latAftSpeed / this.latMaxSpeed);
    }

    setLowIntegrity(state: boolean): void {
        this.lowIntegrity = state;
    }

    getLowIntegrity(): boolean {
        return this.lowIntegrity;
    }

    private get isLongSpeedValid() {
        return this.isValidNumber(this.longSpeed);
    }

    private get isLatFrontSpeedValid() {
        return this.isValidNumber(this.latFrontSpeed);
    }

    private get isLatMiddleSpeedValid() {
        return this.isValidNumber(this.latMiddleSpeed);
    }

    private get isLatAftSpeedValid() {
        return this.isValidNumber(this.latAftSpeed);
    }

    private getLongLat() {
        return svg`
            <svg width="820" height="800" viewBox="0 0 820 800" fill="none" xmlns="http://www.w3.org/2000/svg">

                ${this.getVessel()}

                ${this.getMiddleSpeedContainer()}

                ${this.getLatFrontSpeedContainer()}

                ${this.getLatAftSpeedContainer()}

                ${this.getLongSpeedContainer()}

                ${this.getSpeedLabel()}
            </svg>
        `;
    }

    private getLongSpeedContainer() {
        if (this.isLongSpeedValid) {
            return svg`
                ${this.getLongSpeedArrow()}
                ${this.getLongSpeedField()}
            `;
        }
        else {
            return nothing;
        }
    }

    private getSensorPosition() {
        const vesselLength = this.bowToCCRP + this.sternToCCRP;
        const unitOfVesselLength = (343 / vesselLength); // 1m of vessel length - mapping real vessel length to svg length
        const ccrpPosition = -15 + this.bowToCCRP * unitOfVesselLength;

        if (this.measurementPosition == MeasurementPosition.CCRP) {
            return ccrpPosition;
        }
        else if (this.measurementPosition == MeasurementPosition.Sensor) {
            const sensorToCCRP = ccrpPosition - this.sensorToCCRP * unitOfVesselLength;
            if (this.sensorToCCRP > this.bowToCCRP) {
                return ccrpPosition - this.bowToCCRP * unitOfVesselLength;
            }
            else if (Math.abs(this.sensorToCCRP) > this.sternToCCRP) {
                return ccrpPosition + this.sternToCCRP * unitOfVesselLength;
            }
            return sensorToCCRP;
        }
        else { // measurementPosition == MeasurementPosition.Bow
            return -15;
        }
    }

    private getLatSpeedArrow(speed: number, speedRatio: number) {
        if (speed < 0) {
            return svg`
                <g clip-path="url(#clip1_6685_4378)">
                    <path d="M234.657 215.794L217.123 246.479L234.657 277.164L252.191 277.164L234.657 246.479L252.191 215.794L234.657 215.794Z" fill="${Colors.instrumentFrameSecondary}"/>
                    <path d="M260.959 215.794L243.424 246.479L260.959 277.164L278.493 277.164L260.959 246.479L278.493 215.794L260.959 215.794Z" fill="${Colors.instrumentFrameSecondary}"/>
                    <path d="M269.726 246.479L287.26 215.794L304.794 215.794L287.26 246.479L304.794 277.164L287.26 277.164L269.726 246.479Z" fill="${Colors.instrumentFrameSecondary}"/>
                    <path d="M234.657 215.794L217.123 246.479L234.657 277.164L252.191 277.164L234.657 246.479L252.191 215.794L234.657 215.794Z" stroke="${Colors.instrumentFrameTertiary}" stroke-linecap="square"/>
                    <path d="M260.959 215.794L243.424 246.479L260.959 277.164L278.493 277.164L260.959 246.479L278.493 215.794L260.959 215.794Z" stroke="${Colors.instrumentFrameTertiary}" stroke-linecap="square"/>
                    <path d="M269.726 246.479L287.26 215.794L304.794 215.794L287.26 246.479L304.794 277.164L287.26 277.164L269.726 246.479Z" stroke="${Colors.instrumentFrameTertiary}" stroke-linecap="square"/>

                    ${this.getLatLeftArrow(speedRatio)}
                </g>
            `;
        }
        else if (speed > 0) {
            return svg`
                <g clip-path="url(#clip5_6685_4378)">
                    <path d="M585.342 277.165L602.876 246.48L585.342 215.795L567.808 215.795L585.342 246.48L567.808 277.165L585.342 277.165Z" fill="${Colors.instrumentFrameSecondary}"/>
                    <path d="M559.041 277.165L576.575 246.48L559.041 215.795L541.506 215.795L559.041 246.48L541.506 277.165L559.041 277.165Z" fill="${Colors.instrumentFrameSecondary}"/>
                    <path d="M550.273 246.48L532.739 277.165L515.205 277.165L532.739 246.48L515.205 215.795L532.739 215.795L550.273 246.48Z" fill="${Colors.instrumentFrameSecondary}"/>
                    <path d="M585.342 277.165L602.876 246.48L585.342 215.795L567.808 215.795L585.342 246.48L567.808 277.165L585.342 277.165Z" stroke="${Colors.instrumentFrameTertiary}" stroke-linecap="square"/>
                    <path d="M559.041 277.165L576.575 246.48L559.041 215.795L541.506 215.795L559.041 246.48L541.506 277.165L559.041 277.165Z" stroke="${Colors.instrumentFrameTertiary}" stroke-linecap="square"/>
                    <path d="M550.273 246.48L532.739 277.165L515.205 277.165L532.739 246.48L515.205 215.795L532.739 215.795L550.273 246.48Z" stroke="${Colors.instrumentFrameTertiary}" stroke-linecap="square"/>

                    ${this.getLatRightArrow(speedRatio)}
                </g>
            `;
        }
        else {
            return nothing;
        }
    }

    private getLatLeftArrow(speedRatio: number) {
        if (speedRatio < 1/3) {
            return svg`
                <path d="M269.726 246.479L287.26 215.794L304.794 215.794L287.26 246.479L304.794 277.164L287.26 277.164L269.726 246.479Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
        else if (speedRatio < 2/3) {
            return svg`
                <path d="M260.959 215.794L243.424 246.479L260.959 277.164L278.493 277.164L260.959 246.479L278.493 215.794L260.959 215.794Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M269.726 246.479L287.26 215.794L304.794 215.794L287.26 246.479L304.794 277.164L287.26 277.164L269.726 246.479Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
        else {
            return svg`
                <path d="M234.657 215.794L217.123 246.479L234.657 277.164L252.191 277.164L234.657 246.479L252.191 215.794L234.657 215.794Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M260.959 215.794L243.424 246.479L260.959 277.164L278.493 277.164L260.959 246.479L278.493 215.794L260.959 215.794Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M269.726 246.479L287.26 215.794L304.794 215.794L287.26 246.479L304.794 277.164L287.26 277.164L269.726 246.479Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
    }

    private getLatRightArrow(speedRatio: number) {
        if (speedRatio < 1/3) {
            return svg`
                <path d="M550.273 246.48L532.739 277.165L515.205 277.165L532.739 246.48L515.205 215.795L532.739 215.795L550.273 246.48Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
        else if (speedRatio < 2/3) {
            return svg`
                <path d="M559.041 277.165L576.575 246.48L559.041 215.795L541.506 215.795L559.041 246.48L541.506 277.165L559.041 277.165Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M550.273 246.48L532.739 277.165L515.205 277.165L532.739 246.48L515.205 215.795L532.739 215.795L550.273 246.48Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
        else {
            return svg`
                <path d="M585.342 277.165L602.876 246.48L585.342 215.795L567.808 215.795L585.342 246.48L567.808 277.165L585.342 277.165Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M559.041 277.165L576.575 246.48L559.041 215.795L541.506 215.795L559.041 246.48L541.506 277.165L559.041 277.165Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M550.273 246.48L532.739 277.165L515.205 277.165L532.739 246.48L515.205 215.795L532.739 215.795L550.273 246.48Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
    }

    private getLatFrontSpeedContainer() {
        if (this.isLatFrontSpeedValid && this.latFrontSpeed != undefined) {
            return svg`
                ${this.getLatSpeedArrow(this.latFrontSpeed, this.latFrontSpeedRatio)}
                ${this.getLatFrontSpeedField()}
            `;
        }
        else {
            return nothing;
        }
    }

    private getMiddleSpeedContainer() {
        if (this.isLatMiddleSpeedValid && this.latMiddleSpeed != undefined) {
            if (this.measurementPosition == MeasurementPosition.Sensor) {
            return svg`
                <g transform="translate(0 ${15.5 + this.getSensorPosition() + (this.sensorToCCRP < 0 ? 0.5 : -0.5)})">
                    ${this.getLatSpeedArrow(this.latMiddleSpeed, this.latMiddleSpeedRatio)}
                    ${this.getLatMiddleSpeedField()}
                </g>
            `;
            }
            else {
                return nothing;
            }
        }
        else {
            return nothing;
        }
    }

    private getLatAftSpeedContainer() {
        if (this.isLatAftSpeedValid && this.latAftSpeed != undefined) {
            return svg`
                <g transform="translate(0 343)">
                    ${this.getLatSpeedArrow(this.latAftSpeed, this.latAftSpeedRatio)}
                </g>
                ${this.getLatAftSpeedField()}
            `;
        }
        else {
            return nothing;
        }
    }

    private getSpeedLabel() {
        if (this.speedType == SpeedType.SOG) {
            return svg`
                <g filter="url(#filter0_d_6685_4378)">
                    <rect x="527" y="127" width="138" height="72" rx="8" fill="${Colors.containerBackground}"/>
                    <path d="M561.72 143H555.72L563.72 151L555.72 159H561.72L569.72 151L561.72 143Z" fill="${Colors.elementActiveColor}"/>
                    <path d="M579.72 151L571.72 143H565.72L573.72 151L565.72 159H571.72L579.72 151Z" fill="${Colors.elementActiveColor}"/>
                    <path d="M565.72 167V163H569.72V167H565.72Z" fill="${Colors.elementActiveColor}"/>
                    <path d="M565.72 175V171H569.72V175H565.72Z" fill="${Colors.elementActiveColor}"/>
                    <path d="M547.72 183H587.72V179H547.72V183Z" fill="${Colors.elementActiveColor}"/>
                    <path d="M611.42 167.272C611.42 168.28 611.172 169.16 610.676 169.912C610.18 170.648 609.46 171.224 608.516 171.64C607.588 172.04 606.46 172.24 605.132 172.24C604.54 172.24 603.956 172.2 603.38 172.12C602.804 172.04 602.26 171.928 601.748 171.784C601.236 171.64 600.756 171.456 600.308 171.232V167.992C601.092 168.344 601.916 168.664 602.78 168.952C603.66 169.224 604.532 169.36 605.396 169.36C606.02 169.36 606.524 169.28 606.908 169.12C607.292 168.944 607.572 168.712 607.748 168.424C607.94 168.136 608.036 167.808 608.036 167.44C608.036 166.992 607.884 166.616 607.58 166.312C607.292 165.992 606.892 165.696 606.38 165.424C605.884 165.152 605.292 164.864 604.604 164.56C604.172 164.352 603.716 164.112 603.236 163.84C602.772 163.568 602.324 163.24 601.892 162.856C601.476 162.456 601.14 161.984 600.884 161.44C600.628 160.88 600.5 160.216 600.5 159.448C600.5 158.424 600.732 157.56 601.196 156.856C601.676 156.136 602.348 155.584 603.212 155.2C604.076 154.816 605.092 154.624 606.26 154.624C607.156 154.624 608.004 154.728 608.804 154.936C609.62 155.144 610.452 155.432 611.3 155.8L610.196 158.512C609.428 158.208 608.724 157.968 608.084 157.792C607.46 157.616 606.812 157.528 606.14 157.528C605.676 157.528 605.268 157.608 604.916 157.768C604.58 157.912 604.324 158.12 604.148 158.392C603.972 158.648 603.884 158.96 603.884 159.328C603.884 159.76 604.004 160.12 604.244 160.408C604.484 160.696 604.844 160.976 605.324 161.248C605.82 161.504 606.444 161.808 607.196 162.16C608.092 162.56 608.852 162.984 609.476 163.432C610.1 163.88 610.58 164.408 610.916 165.016C611.252 165.624 611.42 166.376 611.42 167.272ZM630.062 163.408C630.062 164.736 629.894 165.944 629.558 167.032C629.238 168.104 628.742 169.032 628.07 169.816C627.414 170.6 626.574 171.2 625.55 171.616C624.526 172.032 623.318 172.24 621.926 172.24C620.55 172.24 619.342 172.032 618.302 171.616C617.278 171.184 616.43 170.584 615.758 169.816C615.102 169.032 614.606 168.096 614.27 167.008C613.95 165.92 613.79 164.712 613.79 163.384C613.79 161.608 614.078 160.064 614.654 158.752C615.246 157.44 616.142 156.424 617.342 155.704C618.558 154.968 620.094 154.6 621.95 154.6C623.79 154.6 625.31 154.968 626.51 155.704C627.71 156.424 628.598 157.448 629.174 158.776C629.766 160.088 630.062 161.632 630.062 163.408ZM617.438 163.408C617.438 164.64 617.59 165.696 617.894 166.576C618.214 167.456 618.702 168.136 619.358 168.616C620.03 169.096 620.886 169.336 621.926 169.336C622.998 169.336 623.862 169.096 624.518 168.616C625.174 168.136 625.654 167.456 625.958 166.576C626.262 165.696 626.414 164.64 626.414 163.408C626.414 161.568 626.062 160.128 625.358 159.088C624.67 158.032 623.534 157.504 621.95 157.504C620.894 157.504 620.03 157.744 619.358 158.224C618.702 158.688 618.214 159.36 617.894 160.24C617.59 161.12 617.438 162.176 617.438 163.408ZM640.237 162.448H646.933V171.256C646.037 171.56 645.101 171.8 644.125 171.976C643.165 172.152 642.069 172.24 640.837 172.24C639.141 172.24 637.693 171.904 636.493 171.232C635.309 170.544 634.405 169.544 633.781 168.232C633.157 166.92 632.845 165.312 632.845 163.408C632.845 161.616 633.189 160.064 633.877 158.752C634.581 157.44 635.597 156.424 636.925 155.704C638.253 154.984 639.877 154.624 641.797 154.624C642.709 154.624 643.605 154.72 644.485 154.912C645.365 155.104 646.165 155.36 646.885 155.68L645.733 158.464C645.189 158.192 644.573 157.968 643.885 157.792C643.213 157.616 642.509 157.528 641.773 157.528C640.669 157.528 639.717 157.776 638.917 158.272C638.133 158.752 637.517 159.44 637.069 160.336C636.637 161.216 636.421 162.264 636.421 163.48C636.421 164.616 636.581 165.632 636.901 166.528C637.221 167.408 637.725 168.096 638.413 168.592C639.101 169.088 640.005 169.336 641.125 169.336C641.493 169.336 641.813 169.328 642.085 169.312C642.373 169.28 642.629 169.248 642.853 169.216C643.093 169.168 643.325 169.128 643.549 169.096V165.352H640.237V162.448Z" fill="${Colors.elementActiveColor}"/>
                </g>
            `;
        }
        else if (this.speedType == SpeedType.STW) {
            return svg`
                <g filter="url(#filter0_d_6685_4378)">
                    <rect x="526.5" y="127" width="139" height="72" rx="8" fill="${Colors.containerBackground}"/>
                    <path d="M578.5 153L570.5 145H564.5L572.5 153L564.5 161H570.5L578.5 153Z" fill="${Colors.elementActiveColor}"/>
                    <path d="M554.5 145H560.5L568.5 153L560.5 161H554.5L562.5 153L554.5 145Z" fill="${Colors.elementActiveColor}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M557.666 170.627C558.204 171.197 558.718 171.787 559.313 172.299C561.297 174.007 563.846 175.251 566.5 175.251C569.154 175.251 571.703 174.007 573.687 172.299C574.282 171.787 574.796 171.197 575.334 170.627C575.998 171.158 576.639 171.699 577.346 172.17C580.032 173.96 583.242 175.251 586.5 175.251V178.751C582.638 178.751 578.849 177.318 575.634 175.233C573.066 177.326 569.85 178.751 566.5 178.751C563.15 178.751 559.934 177.326 557.366 175.233C554.151 177.318 550.362 178.751 546.5 178.751V175.251C549.758 175.251 552.968 173.96 555.654 172.17C556.36 171.699 557.003 171.157 557.666 170.627Z" fill="${Colors.elementActiveColor}"/>
                    <path d="M611.162 167.272C611.162 168.28 610.914 169.16 610.418 169.912C609.922 170.648 609.202 171.224 608.258 171.64C607.33 172.04 606.202 172.24 604.874 172.24C604.282 172.24 603.698 172.2 603.122 172.12C602.546 172.04 602.002 171.928 601.49 171.784C600.978 171.64 600.498 171.456 600.05 171.232V167.992C600.834 168.344 601.658 168.664 602.522 168.952C603.402 169.224 604.274 169.36 605.138 169.36C605.762 169.36 606.266 169.28 606.65 169.12C607.034 168.944 607.314 168.712 607.49 168.424C607.682 168.136 607.778 167.808 607.778 167.44C607.778 166.992 607.626 166.616 607.322 166.312C607.034 165.992 606.634 165.696 606.122 165.424C605.626 165.152 605.034 164.864 604.346 164.56C603.914 164.352 603.458 164.112 602.978 163.84C602.514 163.568 602.066 163.24 601.634 162.856C601.218 162.456 600.882 161.984 600.626 161.44C600.37 160.88 600.242 160.216 600.242 159.448C600.242 158.424 600.474 157.56 600.938 156.856C601.418 156.136 602.09 155.584 602.954 155.2C603.818 154.816 604.834 154.624 606.002 154.624C606.898 154.624 607.746 154.728 608.546 154.936C609.362 155.144 610.194 155.432 611.042 155.8L609.938 158.512C609.17 158.208 608.466 157.968 607.826 157.792C607.202 157.616 606.554 157.528 605.882 157.528C605.418 157.528 605.01 157.608 604.658 157.768C604.322 157.912 604.066 158.12 603.89 158.392C603.714 158.648 603.626 158.96 603.626 159.328C603.626 159.76 603.746 160.12 603.986 160.408C604.226 160.696 604.586 160.976 605.066 161.248C605.562 161.504 606.186 161.808 606.938 162.16C607.834 162.56 608.594 162.984 609.218 163.432C609.842 163.88 610.322 164.408 610.658 165.016C610.994 165.624 611.162 166.376 611.162 167.272ZM620.781 172H617.325V157.768H612.597V154.864H625.509V157.768H620.781V172ZM649.033 154.864L644.641 172H640.753L638.305 162.736C638.257 162.544 638.193 162.272 638.113 161.92C638.033 161.568 637.945 161.192 637.849 160.792C637.769 160.392 637.697 160.016 637.633 159.664C637.569 159.296 637.529 159.008 637.513 158.8C637.497 159.008 637.449 159.296 637.369 159.664C637.305 160.016 637.233 160.392 637.153 160.792C637.073 161.176 636.993 161.552 636.913 161.92C636.833 162.272 636.761 162.56 636.697 162.784L634.297 172H630.385L625.993 154.864H629.425L631.657 164.344C631.737 164.632 631.817 164.968 631.897 165.352C631.977 165.736 632.057 166.136 632.137 166.552C632.217 166.968 632.289 167.376 632.353 167.776C632.417 168.16 632.465 168.496 632.497 168.784C632.529 168.48 632.577 168.136 632.641 167.752C632.705 167.368 632.777 166.976 632.857 166.576C632.937 166.176 633.017 165.8 633.097 165.448C633.177 165.08 633.249 164.784 633.313 164.56L635.857 154.864H639.169L641.737 164.56C641.785 164.784 641.849 165.08 641.929 165.448C642.009 165.8 642.089 166.184 642.169 166.6C642.249 167 642.321 167.392 642.385 167.776C642.449 168.16 642.497 168.496 642.529 168.784C642.577 168.384 642.649 167.92 642.745 167.392C642.841 166.848 642.945 166.304 643.057 165.76C643.185 165.2 643.289 164.728 643.369 164.344L645.625 154.864H649.033Z" fill="${Colors.elementActiveColor}"/>
                </g>
            `;
        }
        else {
            return nothing;
        }
    }

    private getLongSpeedArrow() {
        if (this.longSpeed > 0) {
            return svg`
                <g clip-path="url(#clip0_6685_4378)">
                    <path d="M445 54L410 34L375 54L375 74L410 54L445.001 74L445 54Z" fill="${Colors.instrumentFrameSecondary}"/>
                    <path d="M445 84L410 64L375 84L375 104L410 84L445.001 104L445 84Z" fill="${Colors.instrumentFrameSecondary}"/>
                    <path d="M410 94L445 114L445.001 134L410 114L375 134L375 114L410 94Z" fill="${Colors.instrumentFrameSecondary}"/>
                    <path d="M445 54L410 34L375 54L375 74L410 54L445.001 74L445 54Z" stroke="${Colors.instrumentFrameTertiary}" stroke-linecap="square"/>
                    <path d="M445 84L410 64L375 84L375 104L410 84L445.001 104L445 84Z" stroke="${Colors.instrumentFrameTertiary}" stroke-linecap="square"/>
                    <path d="M410 94L445 114L445.001 134L410 114L375 134L375 114L410 94Z" stroke="${Colors.instrumentFrameTertiary}" stroke-linecap="square"/>

                    ${this.getForwardArrows()}
                </g>
          `;
        }
        else if (this.longSpeed < 0) {
            return svg`
                <g clip-path="url(#clip14_6685_4378)">
                    <path d="M375 746L410 766L445 746L445 726L410 746L374.999 726L375 746Z" fill="${Colors.instrumentFrameSecondary}"/>
                    <path d="M375 716L410 736L445 716L445 696L410 716L374.999 696L375 716Z" fill="${Colors.instrumentFrameSecondary}"/>
                    <path d="M410 706L375 686L374.999 666L410 686L445 666L445 686L410 706Z" fill="${Colors.instrumentFrameSecondary}"/>
                    <path d="M375 746L410 766L445 746L445 726L410 746L374.999 726L375 746Z" stroke="${Colors.instrumentFrameTertiary}" stroke-linecap="square"/>
                    <path d="M375 716L410 736L445 716L445 696L410 716L374.999 696L375 716Z" stroke="${Colors.instrumentFrameTertiary}" stroke-linecap="square"/>
                    <path d="M410 706L375 686L374.999 666L410 686L445 666L445 686L410 706Z" stroke="${Colors.instrumentFrameTertiary}" stroke-linecap="square"/>

                    ${this.getBackwardArrow()}
                </g>
            `;
        }
        else {
          return nothing;
        }
    }

    private getForwardArrows() {
        if (this.longSpeedRatio < 1/3) {
            return svg`
                <path d="M410 94L445 114L445.001 134L410 114L375 134L375 114L410 94Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
        else if (this.longSpeedRatio < 2/3) {
            return svg`
                <path d="M445 84L410 64L375 84L375 104L410 84L445.001 104L445 84Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M410 94L445 114L445.001 134L410 114L375 134L375 114L410 94Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
        else {
            return svg`
                <path d="M445 54L410 34L375 54L375 74L410 54L445.001 74L445 54Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M445 84L410 64L375 84L375 104L410 84L445.001 104L445 84Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M410 94L445 114L445.001 134L410 114L375 134L375 114L410 94Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
    }

    private getBackwardArrow() {
        if (this.longSpeedRatio < 1/3) {
            return svg`
                <path d="M410 706L375 686L374.999 666L410 686L445 666L445 686L410 706Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
        else if (this.longSpeedRatio < 2/3) {
            return svg`
                <path d="M375 716L410 736L445 716L445 696L410 716L374.999 696L375 716Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M410 706L375 686L374.999 666L410 686L445 666L445 686L410 706Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
        else {
            return svg`
                <path d="M375 746L410 766L445 746L445 726L410 746L374.999 726L375 746Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M375 716L410 736L445 716L445 696L410 716L374.999 696L375 716Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M410 706L375 686L374.999 666L410 686L445 666L445 686L410 706Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
    }

    private getVessel() {
        return svg`
            <path d="M352.296 379.977L352.296 263.082C352.296 144.137 409.725 144.137 409.725 144.137C409.725 144.137 467.155 144.137 467.155 263.082L467.155 418.942L467.155 646.588C467.155 647.716 466.241 648.63 465.113 648.63L452.797 648.63L366.653 648.63L354.338 648.63C353.21 648.63 352.296 647.716 352.296 646.588L352.296 379.977Z" fill="${Colors.instrumentFramePrimary}"/>
            <path d="M352.296 379.977L371.439 355.368L371.439 334.86L450.405 334.86L450.405 404.587L467.155 418.942M467.155 418.942L467.155 646.588C467.155 647.716 466.241 648.63 465.113 648.63L452.797 648.63L366.653 648.63L354.338 648.63C353.21 648.63 352.296 647.716 352.296 646.588L352.296 263.082C352.296 144.137 409.725 144.137 409.725 144.137C409.725 144.137 467.155 144.137 467.155 263.082L467.155 418.942Z" stroke="${Colors.instrumentTickMarkSecondary}" stroke-width="1.02105"/>
            <path d="M371.439 310.945L342.724 310.945L342.724 278.397L371.439 262.123L390.582 221.438L428.868 221.438L448.012 262.123L476.726 278.397L476.726 310.945L448.012 310.945L433.654 323.151L385.796 323.151L371.439 310.945Z" fill="${Colors.instrumentFramePrimary}"/>
            <path d="M385.796 323.151L371.439 310.945L342.724 310.945L342.724 278.397L371.439 262.123L390.582 221.438M385.796 323.151L433.654 323.151M385.796 323.151L385.796 266.192C386.917 250.252 390.582 221.438 390.582 221.438M433.654 323.151L448.012 310.945L476.726 310.945L476.726 278.397L448.012 262.123L428.868 221.438M433.654 323.151L433.654 266.192C432.534 250.252 428.868 221.438 428.868 221.438M428.868 221.438L390.582 221.438" stroke="${Colors.instrumentTickMarkSecondary}" stroke-width="1.02105"/>
            <path d="M433.654 290.151L433.654 310.493L424.083 314.562L395.368 314.562L385.796 310.493L385.796 290.151L395.368 302.356L424.083 302.356L433.654 290.151Z" fill="${Colors.instrumentFramePrimary}"/>
            <path d="M424.083 302.356L433.654 290.151L433.654 310.493L424.083 314.562M424.083 302.356L395.368 302.356M424.083 302.356L424.083 314.562M395.368 302.356L385.796 290.151L385.796 310.493L395.368 314.562M395.368 302.356L395.368 314.562M395.368 314.562L424.083 314.562" stroke="${Colors.instrumentTickMarkSecondary}" stroke-width="1.02105"/>
        `;
    }

    private getLongSpeedField() {
        return svg`
            <!--
            <foreignObject x="350" y="370" width="200" height="200">
              <div class="obc-component-size-regular" xmlns="http://www.w3.org/1999/xhtml" style="transform: scale(1.5); transform-origin: left top;">
                <obc-instrument-field
                  class="instrument-field-angle"
                  value=${this.longSpeed}
                  tag="Fore"
                  unit="kn"
                  fractionDigits="1"
                  size=${InstrumentFieldSize.enhanced}>
                </obc-instrument-field>
              </div>
            </foreignObject>
            -->
            
            <rect x="366" y="369.534" width="88" height="96" rx="6" fill="${Colors.instrumentFramePrimary}"/>
            
            ${this.getSpeed(408, 410, this.longSpeed)}

            <g clip-path="url(#clip7_6685_4378)">
                <path d="M374.708 457.534H372.046V441.826H380.956V444.092H374.708V448.844H380.538V451.11H374.708V457.534ZM394.159 451.55C394.159 452.548 394.027 453.428 393.763 454.19C393.499 454.953 393.118 455.606 392.619 456.148C392.135 456.676 391.541 457.08 390.837 457.358C390.133 457.622 389.349 457.754 388.483 457.754C387.677 457.754 386.929 457.622 386.239 457.358C385.55 457.08 384.956 456.676 384.457 456.148C383.959 455.606 383.57 454.953 383.291 454.19C383.013 453.428 382.873 452.548 382.873 451.55C382.873 450.23 383.101 449.116 383.555 448.206C384.01 447.297 384.663 446.608 385.513 446.138C386.364 445.654 387.376 445.412 388.549 445.412C389.649 445.412 390.617 445.654 391.453 446.138C392.289 446.608 392.949 447.297 393.433 448.206C393.917 449.116 394.159 450.23 394.159 451.55ZM385.579 451.55C385.579 452.416 385.682 453.149 385.887 453.75C386.093 454.352 386.408 454.814 386.833 455.136C387.273 455.444 387.838 455.598 388.527 455.598C389.202 455.598 389.752 455.444 390.177 455.136C390.617 454.814 390.94 454.352 391.145 453.75C391.351 453.149 391.453 452.423 391.453 451.572C391.453 450.707 391.351 449.981 391.145 449.394C390.94 448.793 390.617 448.338 390.177 448.03C389.752 447.722 389.195 447.568 388.505 447.568C387.479 447.568 386.731 447.913 386.261 448.602C385.807 449.292 385.579 450.274 385.579 451.55ZM403.164 445.412C403.355 445.412 403.567 445.42 403.802 445.434C404.037 445.449 404.235 445.478 404.396 445.522L404.154 447.986C404.022 447.942 403.846 447.913 403.626 447.898C403.421 447.869 403.23 447.854 403.054 447.854C402.614 447.854 402.189 447.928 401.778 448.074C401.382 448.221 401.023 448.441 400.7 448.734C400.377 449.013 400.121 449.372 399.93 449.812C399.754 450.238 399.666 450.744 399.666 451.33V457.534H397.026V445.632H399.094L399.446 447.722H399.578C399.813 447.297 400.106 446.908 400.458 446.556C400.81 446.204 401.213 445.926 401.668 445.72C402.137 445.515 402.636 445.412 403.164 445.412ZM410.931 445.412C411.987 445.412 412.896 445.632 413.659 446.072C414.436 446.498 415.03 447.114 415.441 447.92C415.852 448.712 416.057 449.673 416.057 450.802V452.188H408.159C408.188 453.303 408.496 454.168 409.083 454.784C409.67 455.386 410.484 455.686 411.525 455.686C412.288 455.686 412.97 455.613 413.571 455.466C414.187 455.32 414.818 455.1 415.463 454.806V456.94C414.862 457.219 414.246 457.424 413.615 457.556C412.999 457.688 412.258 457.754 411.393 457.754C410.234 457.754 409.208 457.534 408.313 457.094C407.418 456.64 406.722 455.958 406.223 455.048C405.724 454.139 405.475 453.01 405.475 451.66C405.475 450.311 405.702 449.174 406.157 448.25C406.612 447.326 407.25 446.622 408.071 446.138C408.892 445.654 409.846 445.412 410.931 445.412ZM410.931 447.392C410.154 447.392 409.53 447.642 409.061 448.14C408.592 448.624 408.313 449.35 408.225 450.318H413.483C413.483 449.732 413.388 449.226 413.197 448.8C413.021 448.36 412.742 448.016 412.361 447.766C411.994 447.517 411.518 447.392 410.931 447.392Z" fill="${Colors.elementNeutralColor}"/>
            </g>
            <g clip-path="url(#clip8_6685_4378)">
                <path d="M425.936 448.75C425.936 449.086 425.92 449.486 425.888 449.95C425.872 450.398 425.856 450.806 425.84 451.174H425.912C426.024 451.03 426.168 450.846 426.344 450.622C426.536 450.398 426.728 450.166 426.92 449.926C427.112 449.686 427.28 449.486 427.424 449.326L431.768 444.694H433.976L428.816 450.19L434.36 457.534H432.08L427.52 451.414L425.936 452.902V457.534H424.064V439.294H425.936V448.75ZM442.651 444.454C444.155 444.454 445.299 444.83 446.083 445.582C446.867 446.318 447.259 447.51 447.259 449.158V457.534H445.387V449.302C445.387 448.198 445.139 447.382 444.643 446.854C444.147 446.326 443.395 446.062 442.387 446.062C440.963 446.062 439.955 446.462 439.363 447.262C438.771 448.062 438.475 449.23 438.475 450.766V457.534H436.603V444.694H438.115L438.403 446.59H438.499C438.787 446.126 439.139 445.742 439.555 445.438C439.971 445.118 440.443 444.878 440.971 444.718C441.499 444.542 442.059 444.454 442.651 444.454Z" fill="${Colors.elementNeutralColor}"/>
            </g>
            
        `;
    }
  
    private getLatFrontSpeedField() {
        if (this.latFrontSpeed != undefined) {
            return svg`
                <!--
                <foreignObject x="360" y="150" width="100" height="200">
                  <div class="obc-component-size-regular" xmlns="http://www.w3.org/1999/xhtml" style="transform: scale(1.5); transform-origin: left top;">
                    <obc-instrument-field
                        class="instrument-field-angle"
                        value=${this.latFrontSpeed}
                        tag="Fore"
                        unit="kn"
                        fractionDigits="1"
                        size=${InstrumentFieldSize.enhanced}>
                    </obc-instrument-field>
                  </div>
                </foreignObject>
                -->

                <rect x="358.856" y="198.082" width="100" height="90" rx="6" fill="${Colors.instrumentFramePrimary}"/>

                ${this.getSpeed(408, 238, this.latFrontSpeed)}

                <g clip-path="url(#clip3_6685_4378)">
                    <path d="M375.064 286.082H372.402V270.374H381.312V272.64H375.064V277.392H380.894V279.658H375.064V286.082ZM394.516 280.098C394.516 281.096 394.384 281.976 394.12 282.738C393.856 283.501 393.474 284.154 392.976 284.696C392.492 285.224 391.898 285.628 391.194 285.906C390.49 286.17 389.705 286.302 388.84 286.302C388.033 286.302 387.285 286.17 386.596 285.906C385.906 285.628 385.312 285.224 384.814 284.696C384.315 284.154 383.926 283.501 383.648 282.738C383.369 281.976 383.23 281.096 383.23 280.098C383.23 278.778 383.457 277.664 383.912 276.754C384.366 275.845 385.019 275.156 385.87 274.686C386.72 274.202 387.732 273.96 388.906 273.96C390.006 273.96 390.974 274.202 391.81 274.686C392.646 275.156 393.306 275.845 393.79 276.754C394.274 277.664 394.516 278.778 394.516 280.098ZM385.936 280.098C385.936 280.964 386.038 281.697 386.244 282.298C386.449 282.9 386.764 283.362 387.19 283.684C387.63 283.992 388.194 284.146 388.884 284.146C389.558 284.146 390.108 283.992 390.534 283.684C390.974 283.362 391.296 282.9 391.502 282.298C391.707 281.697 391.81 280.971 391.81 280.12C391.81 279.255 391.707 278.529 391.502 277.942C391.296 277.341 390.974 276.886 390.534 276.578C390.108 276.27 389.551 276.116 388.862 276.116C387.835 276.116 387.087 276.461 386.618 277.15C386.163 277.84 385.936 278.822 385.936 280.098ZM403.52 273.96C403.711 273.96 403.924 273.968 404.158 273.982C404.393 273.997 404.591 274.026 404.752 274.07L404.51 276.534C404.378 276.49 404.202 276.461 403.982 276.446C403.777 276.417 403.586 276.402 403.41 276.402C402.97 276.402 402.545 276.476 402.134 276.622C401.738 276.769 401.379 276.989 401.056 277.282C400.734 277.561 400.477 277.92 400.286 278.36C400.11 278.786 400.022 279.292 400.022 279.878V286.082H397.382V274.18H399.45L399.802 276.27H399.934C400.169 275.845 400.462 275.456 400.814 275.104C401.166 274.752 401.57 274.474 402.024 274.268C402.494 274.063 402.992 273.96 403.52 273.96ZM411.287 273.96C412.343 273.96 413.252 274.18 414.015 274.62C414.792 275.046 415.386 275.662 415.797 276.468C416.208 277.26 416.413 278.221 416.413 279.35V280.736H408.515C408.544 281.851 408.852 282.716 409.439 283.332C410.026 283.934 410.84 284.234 411.881 284.234C412.644 284.234 413.326 284.161 413.927 284.014C414.543 283.868 415.174 283.648 415.819 283.354V285.488C415.218 285.767 414.602 285.972 413.971 286.104C413.355 286.236 412.614 286.302 411.749 286.302C410.59 286.302 409.564 286.082 408.669 285.642C407.774 285.188 407.078 284.506 406.579 283.596C406.08 282.687 405.831 281.558 405.831 280.208C405.831 278.859 406.058 277.722 406.513 276.798C406.968 275.874 407.606 275.17 408.427 274.686C409.248 274.202 410.202 273.96 411.287 273.96ZM411.287 275.94C410.51 275.94 409.886 276.19 409.417 276.688C408.948 277.172 408.669 277.898 408.581 278.866H413.839C413.839 278.28 413.744 277.774 413.553 277.348C413.377 276.908 413.098 276.564 412.717 276.314C412.35 276.065 411.874 275.94 411.287 275.94Z" fill="${Colors.elementNeutralColor}"/>
                </g>
                <g clip-path="url(#clip4_6685_4378)">
                    <path d="M426.292 277.298C426.292 277.634 426.276 278.034 426.244 278.498C426.228 278.946 426.212 279.354 426.196 279.722H426.268C426.38 279.578 426.524 279.394 426.7 279.17C426.892 278.946 427.084 278.714 427.276 278.474C427.468 278.234 427.636 278.034 427.78 277.874L432.124 273.242H434.332L429.172 278.738L434.716 286.082H432.436L427.876 279.962L426.292 281.45V286.082H424.42V267.842H426.292V277.298ZM443.007 273.002C444.511 273.002 445.655 273.378 446.439 274.13C447.223 274.866 447.615 276.058 447.615 277.706V286.082H445.743V277.85C445.743 276.746 445.495 275.93 444.999 275.402C444.503 274.874 443.751 274.61 442.743 274.61C441.319 274.61 440.311 275.01 439.719 275.81C439.127 276.61 438.831 277.778 438.831 279.314V286.082H436.959V273.242H438.471L438.759 275.138H438.855C439.143 274.674 439.495 274.29 439.911 273.986C440.327 273.666 440.799 273.426 441.327 273.266C441.855 273.09 442.415 273.002 443.007 273.002Z" fill="${Colors.elementNeutralColor}"/>
                </g>
            `;
        }
        else {
            return nothing;
        }
    }
  
    private getSpeed(x: number, y: number, speed: number) {
      return svg`
          <text
            x=${x}
            y=${y}
            text-anchor="middle"
            dominant-baseline="middle"
            fill="${Colors.instrumentEnhancedSecondary}"
            font-size="64"
            font-weight="600"
          >
            ${Math.abs(speed).toFixed(1)}
          </text>
    `;
    }

    private getLatMiddleSpeedField() {
        if (this.latMiddleSpeed != undefined) {
            return svg`
                <rect x="358.856" y="198.082" width="100" height="90" rx="6" fill="${Colors.instrumentFramePrimary}"/>

                ${this.getSpeed(408, 238, this.latMiddleSpeed)}

                <g clip-path="url(#clip3_6685_4378)">
                    <path d="M375.064 286.082H372.402V270.374H381.312V272.64H375.064V277.392H380.894V279.658H375.064V286.082ZM394.516 280.098C394.516 281.096 394.384 281.976 394.12 282.738C393.856 283.501 393.474 284.154 392.976 284.696C392.492 285.224 391.898 285.628 391.194 285.906C390.49 286.17 389.705 286.302 388.84 286.302C388.033 286.302 387.285 286.17 386.596 285.906C385.906 285.628 385.312 285.224 384.814 284.696C384.315 284.154 383.926 283.501 383.648 282.738C383.369 281.976 383.23 281.096 383.23 280.098C383.23 278.778 383.457 277.664 383.912 276.754C384.366 275.845 385.019 275.156 385.87 274.686C386.72 274.202 387.732 273.96 388.906 273.96C390.006 273.96 390.974 274.202 391.81 274.686C392.646 275.156 393.306 275.845 393.79 276.754C394.274 277.664 394.516 278.778 394.516 280.098ZM385.936 280.098C385.936 280.964 386.038 281.697 386.244 282.298C386.449 282.9 386.764 283.362 387.19 283.684C387.63 283.992 388.194 284.146 388.884 284.146C389.558 284.146 390.108 283.992 390.534 283.684C390.974 283.362 391.296 282.9 391.502 282.298C391.707 281.697 391.81 280.971 391.81 280.12C391.81 279.255 391.707 278.529 391.502 277.942C391.296 277.341 390.974 276.886 390.534 276.578C390.108 276.27 389.551 276.116 388.862 276.116C387.835 276.116 387.087 276.461 386.618 277.15C386.163 277.84 385.936 278.822 385.936 280.098ZM403.52 273.96C403.711 273.96 403.924 273.968 404.158 273.982C404.393 273.997 404.591 274.026 404.752 274.07L404.51 276.534C404.378 276.49 404.202 276.461 403.982 276.446C403.777 276.417 403.586 276.402 403.41 276.402C402.97 276.402 402.545 276.476 402.134 276.622C401.738 276.769 401.379 276.989 401.056 277.282C400.734 277.561 400.477 277.92 400.286 278.36C400.11 278.786 400.022 279.292 400.022 279.878V286.082H397.382V274.18H399.45L399.802 276.27H399.934C400.169 275.845 400.462 275.456 400.814 275.104C401.166 274.752 401.57 274.474 402.024 274.268C402.494 274.063 402.992 273.96 403.52 273.96ZM411.287 273.96C412.343 273.96 413.252 274.18 414.015 274.62C414.792 275.046 415.386 275.662 415.797 276.468C416.208 277.26 416.413 278.221 416.413 279.35V280.736H408.515C408.544 281.851 408.852 282.716 409.439 283.332C410.026 283.934 410.84 284.234 411.881 284.234C412.644 284.234 413.326 284.161 413.927 284.014C414.543 283.868 415.174 283.648 415.819 283.354V285.488C415.218 285.767 414.602 285.972 413.971 286.104C413.355 286.236 412.614 286.302 411.749 286.302C410.59 286.302 409.564 286.082 408.669 285.642C407.774 285.188 407.078 284.506 406.579 283.596C406.08 282.687 405.831 281.558 405.831 280.208C405.831 278.859 406.058 277.722 406.513 276.798C406.968 275.874 407.606 275.17 408.427 274.686C409.248 274.202 410.202 273.96 411.287 273.96ZM411.287 275.94C410.51 275.94 409.886 276.19 409.417 276.688C408.948 277.172 408.669 277.898 408.581 278.866H413.839C413.839 278.28 413.744 277.774 413.553 277.348C413.377 276.908 413.098 276.564 412.717 276.314C412.35 276.065 411.874 275.94 411.287 275.94Z" fill="${Colors.elementNeutralColor}"/>
                </g>
                <g clip-path="url(#clip4_6685_4378)">
                    <path d="M426.292 277.298C426.292 277.634 426.276 278.034 426.244 278.498C426.228 278.946 426.212 279.354 426.196 279.722H426.268C426.38 279.578 426.524 279.394 426.7 279.17C426.892 278.946 427.084 278.714 427.276 278.474C427.468 278.234 427.636 278.034 427.78 277.874L432.124 273.242H434.332L429.172 278.738L434.716 286.082H432.436L427.876 279.962L426.292 281.45V286.082H424.42V267.842H426.292V277.298ZM443.007 273.002C444.511 273.002 445.655 273.378 446.439 274.13C447.223 274.866 447.615 276.058 447.615 277.706V286.082H445.743V277.85C445.743 276.746 445.495 275.93 444.999 275.402C444.503 274.874 443.751 274.61 442.743 274.61C441.319 274.61 440.311 275.01 439.719 275.81C439.127 276.61 438.831 277.778 438.831 279.314V286.082H436.959V273.242H438.471L438.759 275.138H438.855C439.143 274.674 439.495 274.29 439.911 273.986C440.327 273.666 440.799 273.426 441.327 273.266C441.855 273.09 442.415 273.002 443.007 273.002Z" fill="${Colors.elementNeutralColor}"/>
                </g>
            `;
        }
        else {
            return nothing;
        }
    }
  
    private getLatAftSpeedField() {
        if (this.latAftSpeed != undefined) {
            return svg`
                <!--
                <foreignObject x="360" y="523" width="100" height="200">
                  <div class="obc-component-size-regular" xmlns="http://www.w3.org/1999/xhtml" style="transform: scale(1.5); transform-origin: left top;">
                    <obc-instrument-field
                        class="instrument-field-angle"
                        value=${this.latAftSpeed}
                        tag="Aft"
                        unit="kn"
                        fractionDigits="1"
                        size=${InstrumentFieldSize.enhanced}>
                    </obc-instrument-field>
                  </div>
                </foreignObject>
                -->

                <rect x="367.856" y="540.986" width="85" height="96" rx="6" fill="${Colors.instrumentFramePrimary}"/>

                ${this.getSpeed(408, 578, this.latAftSpeed)}

                <g clip-path="url(#clip11_6685_4378)">
                    <path d="M390.148 628.986L388.63 624.718H382.668L381.194 628.986H378.356L384.186 613.212H387.156L392.986 628.986H390.148ZM386.496 618.228C386.437 618.052 386.349 617.788 386.232 617.436C386.129 617.084 386.027 616.732 385.924 616.38C385.821 616.014 385.733 615.706 385.66 615.456C385.587 615.75 385.499 616.087 385.396 616.468C385.293 616.835 385.191 617.18 385.088 617.502C385 617.825 384.927 618.067 384.868 618.228L383.438 622.408H387.948L386.496 618.228ZM400.862 619.086H397.958V628.986H395.318V619.086H393.404V617.832L395.318 617.04V616.27C395.318 615.244 395.48 614.437 395.802 613.85C396.125 613.249 396.587 612.816 397.188 612.552C397.804 612.288 398.53 612.156 399.366 612.156C399.938 612.156 400.452 612.208 400.906 612.31C401.361 612.398 401.742 612.501 402.05 612.618L401.368 614.598C401.119 614.525 400.84 614.452 400.532 614.378C400.239 614.305 399.916 614.268 399.564 614.268C399.022 614.268 398.618 614.444 398.354 614.796C398.09 615.148 397.958 615.654 397.958 616.314V617.084H400.862V619.086ZM407.401 627.072C407.738 627.072 408.068 627.043 408.391 626.984C408.713 626.926 409.007 626.852 409.271 626.764V628.744C408.992 628.876 408.625 628.986 408.171 629.074C407.716 629.162 407.239 629.206 406.741 629.206C406.081 629.206 405.479 629.096 404.937 628.876C404.394 628.642 403.954 628.253 403.617 627.71C403.294 627.153 403.133 626.376 403.133 625.378V619.086H401.527V617.92L403.265 616.974L404.123 614.444H405.773V617.084H409.161V619.086H405.773V625.356C405.773 625.943 405.919 626.376 406.213 626.654C406.521 626.933 406.917 627.072 407.401 627.072Z" fill="${Colors.elementNeutralColor}"/>
                </g>
                <g clip-path="url(#clip12_6685_4378)">
                    <path d="M418.292 620.202C418.292 620.538 418.276 620.938 418.244 621.402C418.228 621.85 418.212 622.258 418.196 622.626H418.268C418.38 622.482 418.524 622.298 418.7 622.074C418.892 621.85 419.084 621.618 419.276 621.378C419.468 621.138 419.636 620.938 419.78 620.778L424.124 616.146H426.332L421.172 621.642L426.716 628.986H424.436L419.876 622.866L418.292 624.354V628.986H416.42V610.746H418.292V620.202ZM435.007 615.906C436.511 615.906 437.655 616.282 438.439 617.034C439.223 617.77 439.615 618.962 439.615 620.61V628.986H437.743V620.754C437.743 619.65 437.495 618.834 436.999 618.306C436.503 617.778 435.751 617.514 434.743 617.514C433.319 617.514 432.311 617.914 431.719 618.714C431.127 619.514 430.831 620.682 430.831 622.218V628.986H428.959V616.146H430.471L430.759 618.042H430.855C431.143 617.578 431.495 617.194 431.911 616.89C432.327 616.57 432.799 616.33 433.327 616.17C433.855 615.994 434.415 615.906 435.007 615.906Z" fill="${Colors.elementNeutralColor}"/>
                </g>
            `;
        }
        else {
            return nothing;
        }
    }

}

declare global {
  interface HTMLElementTagNameMap {
    'ob-long-lat': LongLat;
  }
}