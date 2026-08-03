import {LitElement, svg, html, SVGTemplateResult, nothing} from 'lit';
import {property, state} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import { trueRelativeStyles } from './true-relative-styles.js';
import { Colors, SensorPosition, SpeedType, WatchBarArea } from '../interfaces.js';
import { getWindIcon } from '../wind-icons.js';
import { getCurrentIcon } from '../current-icons.js';

export enum TrueRelativeDirection {
  NorthUp = 'northUp',
  HeadingUp = 'headingUp',
  CourseUp = 'courseUp',
}

@customElement('ob-true-relative')
export class TrueRelative extends LitElement {
    @property({type: Number}) maxSpeed = 25;

    @property({type: Number}) hdgSpeed = 5;
    @property({type: Number}) hdgDirection = 0;

    @property({type: Number}) cogSpeed = 5;
    @property({type: Number}) cogDirection = 25;

    @property({type: String}) speedType = SpeedType.SOG; // TODO: remove

    @property({type: Number}) windSpeed = 5;
    @property({type: Number}) windAngle = 5;
    @property({type: Number}) currentSpeed = 5;
    @property({type: Number}) currentAngle = 5;
    @property({type: Number}) rotationsPerMinute = 1;

    @property({type: String}) direction: TrueRelativeDirection = TrueRelativeDirection.NorthUp;
    @property({type: Boolean}) sensorPosition = SensorPosition.bow;
    @property({type: Boolean}) hasNorthArrow = false;

    center = {x: 362.039, y: 362.039};
    // 362.039 362.039

    speedRatio = 1;

    private lowIntegrity = false;

    @state()
    private rot = 0;
    
    rotSpeed = 10;    // °/min
    endAngle = 0;

    _lastTime = 0;
    _animId?: number;

    override firstUpdated() {
      this._lastTime = performance.now();
      this._animId = requestAnimationFrame(this._animate);
    }

    override connectedCallback() {
      super.connectedCallback();
      this._lastTime = performance.now();
      this._animate(this._lastTime);
    }
    
    override disconnectedCallback() {
      super.disconnectedCallback();
      cancelAnimationFrame(this._animId!);
    }

    _animate = (time: number) => {
        const deltaTime = time - this._lastTime;
        this._lastTime = time;
        
        const rotDegPerMs = this.rotSpeed / 60000;
        
        this.rot = (this.rot + rotDegPerMs * deltaTime) % 360;
        
        this._animId = requestAnimationFrame(this._animate);
    };

    override render() {
        this.setMaxSpeed();
        this.setSpeedRatio();
        this.setRotationsPerMinute();
        
        return html`
          <div class="container">
            ${this.getTrueRelative()}
          </div>
        `;
    }

    static override styles = [
        trueRelativeStyles
    ];

    private isValidNumber(value: number | undefined): boolean {
        return typeof value === 'number' && !isNaN(value);
    }

    private get isHdgValid() {
        return this.isValidNumber(this.hdgSpeed) && this.isValidNumber(this.hdgDirection);
    }

    private get isCogValid() {
        return this.isValidNumber(this.cogSpeed) && this.isValidNumber(this.cogDirection);
    }

    private get isRotationsPerMinuteValid() {
        return this.isValidNumber(this.rotationsPerMinute);
    }

    private get isWindValid() {
        return this.isValidNumber(this.windSpeed) && this.isValidNumber(this.windAngle);
    }

    private get isCurrentValid() {
        return this.isValidNumber(this.currentSpeed) && this.isValidNumber(this.currentAngle);
    }

    private getRotation(): number {
        if (this.direction === TrueRelativeDirection.NorthUp) {
          return 0;
        }
        else if (this.direction === TrueRelativeDirection.HeadingUp) {
          return -this.hdgDirection;
        }
        else if (this.direction === TrueRelativeDirection.CourseUp) {
          return -this.cogDirection;
        }
        else {
            return 0;
        }
    }

    private setMaxSpeed(): void {
        if (this.maxSpeed < 25) {
          this.maxSpeed = 25;
        }
        else if (this.maxSpeed > 25) {
          this.maxSpeed = 50;
        }
    }

    setSpeedRatio() {
        this.speedRatio = Math.abs(this.hdgSpeed / this.maxSpeed);
    }

    setRotationsPerMinute() {
        if (this.rotationsPerMinute > 10) {
            this.rotationsPerMinute = 10;
        }
        else if (this.rotationsPerMinute <-10) {
            this.rotationsPerMinute = -10;
        }
    }

    setLowIntegrity(state: boolean): void {
        this.lowIntegrity = state;
    }

    getLowIntegrity(): boolean {
        return this.lowIntegrity;
    }

    private getTrueRelative() {
        return svg`
           <svg width="512" height="512" viewBox="100 100 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">

                <g transform="rotate(${(this.getRotation() ?? 0)} ${this.center.x} ${this.center.y})">
                    ${this.getWatchFace()}
                    
                    ${this.getTickmarks()}
        
                    ${this.getLabels()}
        
                    ${this.getCurrent()}
        
                    ${this.getWind()}
                </g>
                
                ${this.getClipPaths()}

                ${this.getVessel()}
      
                ${this.getCogContainer()}
                
                ${this.getHdgContainer()}

                ${this.getRotContainer()}
                 
            </svg>
        `;
    }

    private getCogContainer() {
        if (this.isCogValid && this.cogSpeed != 0) {
            return svg`
                <g transform="rotate(${this.cogDirection + (this.getRotation() ?? 0)} ${this.center.x} ${this.center.y})">
                    ${this.renderSogContainer()}
                </g>
            `;
        }
        else {
            return nothing;
        }
    }

    private getHdgContainer() {
        if (this.isHdgValid && this.hdgSpeed != 0) {
            return svg`
                <g transform="rotate(${this.hdgDirection + (this.getRotation() ?? 0)} ${this.center.x} ${this.center.y})">
                    ${this.getStwArrowMask()}
                    ${this.getStwContainer()}
                </g>
            `;
        }
        else {
            return nothing;
        }
                
    }

    private getRotContainer() {
        if (this.isRotationsPerMinuteValid && this.rotationsPerMinute != 0) {
            return svg`
                <g transform="rotate(${this.hdgDirection + (this.getRotation() ?? 0)} ${this.center.x} ${this.center.y})">
                    ${this.getRot()}
                </g>
            `;
        }
        else {
            return nothing;
        }
    }

    private getWatchFace() {
        return svg`
            <path fill-rule="evenodd" clip-rule="evenodd" d="M362.039 174.04C465.868 174.04 550.039 258.21 550.039 362.04C550.039 465.87 465.868 550.04 362.039 550.04C258.209 550.04 174.039 465.87 174.039 362.04C174.039 258.21 258.209 174.04 362.039 174.04ZM362.039 198.04C271.464 198.04 198.039 271.465 198.039 362.04C198.039 452.615 271.464 526.04 362.039 526.04C452.613 526.04 526.039 452.615 526.039 362.04C526.039 271.465 452.613 198.04 362.039 198.04Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentFramePrimary}"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M362.039 174.04C465.868 174.04 550.039 258.21 550.039 362.04C550.039 465.87 465.868 550.04 362.039 550.04C258.209 550.04 174.039 465.87 174.039 362.04C174.039 258.21 258.209 174.04 362.039 174.04ZM362.039 198.04C271.464 198.04 198.039 271.465 198.039 362.04C198.039 452.615 271.464 526.04 362.039 526.04C452.613 526.04 526.039 452.615 526.039 362.04C526.039 271.465 452.613 198.04 362.039 198.04Z" stroke="${Colors.instrumentFrameTertiary}"/>
        `;
    }

    getTickmarks() {
        return svg`
            <mask id="mask1_6762_9950" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="137" y="137" width="449" height="449">
                <circle cx="362.039" cy="362.039" r="198" transform="rotate(23  ${this.center.x} ${this.center.y})" fill="white" stroke="black" stroke-width="20"/>
            </mask>
            
            <g mask="url(#mask1_6762_9950)">
                <path d="M106.039 362.039H618.039" stroke="${Colors.instrumentFrameTertiary}" stroke-linecap="square"/>
                <path d="M362.039 106.039L362.039 618.039" stroke="${Colors.instrumentFrameTertiary}" stroke-linecap="square"/>
            </g>
        `;
    }

    private getLabels() {
        return svg`
            <g transform="scale(1.5) translate(-55 -120)">
                <path d="M165.584 358.471L163.436 367.039H162.464L160.892 361.219C160.844 361.059 160.8 360.899 160.76 360.739C160.72 360.571 160.68 360.415 160.64 360.271C160.608 360.119 160.58 359.987 160.556 359.875C160.532 359.763 160.516 359.675 160.508 359.611C160.492 359.675 160.472 359.763 160.448 359.875C160.432 359.979 160.408 360.107 160.376 360.259C160.352 360.403 160.32 360.555 160.28 360.715C160.24 360.875 160.196 361.039 160.148 361.207L158.612 367.039H157.628L155.492 358.471H156.488L157.784 363.895C157.824 364.071 157.864 364.247 157.904 364.423C157.944 364.591 157.976 364.759 158 364.927C158.032 365.087 158.06 365.243 158.084 365.395C158.116 365.547 158.14 365.695 158.156 365.839C158.18 365.687 158.204 365.535 158.228 365.383C158.26 365.223 158.292 365.059 158.324 364.891C158.364 364.715 158.404 364.539 158.444 364.363C158.484 364.187 158.528 364.015 158.576 363.847L160.016 358.471H161L162.488 363.883C162.536 364.059 162.58 364.239 162.62 364.423C162.668 364.599 162.708 364.771 162.74 364.939C162.772 365.099 162.8 365.259 162.824 365.419C162.856 365.571 162.884 365.715 162.908 365.851C162.932 365.659 162.964 365.459 163.004 365.251C163.044 365.043 163.088 364.827 163.136 364.603C163.184 364.371 163.236 364.135 163.292 363.895L164.6 358.471H165.584Z" fill="${Colors.instrumentTickMarkLabelSecondary}"/>
            </g>
            <g transform="scale(1.5) translate(-120 -60)">
                <path d="M365.195 165.039H364.091L359.723 157.815H359.687C359.695 157.959 359.703 158.119 359.711 158.295C359.719 158.463 359.727 158.647 359.735 158.847C359.743 159.039 359.751 159.239 359.759 159.447C359.767 159.655 359.771 159.863 359.771 160.071V165.039H358.883V156.471H359.987L364.331 163.671H364.379C364.371 163.567 364.363 163.431 364.355 163.263C364.347 163.095 364.339 162.911 364.331 162.711C364.323 162.503 364.315 162.295 364.307 162.087C364.299 161.871 364.295 161.671 364.295 161.487V156.471H365.195V165.039Z" fill="${Colors.instrumentTickMarkLabelSecondary}"/>
            </g>
            <g transform="scale(1.5) translate(-120 -185)">
                <path d="M364.597 566.771C364.597 567.283 364.477 567.715 364.237 568.067C364.005 568.419 363.673 568.691 363.241 568.883C362.817 569.067 362.321 569.159 361.753 569.159C361.441 569.159 361.149 569.143 360.877 569.111C360.605 569.079 360.357 569.035 360.133 568.979C359.909 568.915 359.709 568.843 359.533 568.763V567.827C359.813 567.955 360.149 568.071 360.541 568.175C360.941 568.271 361.357 568.319 361.789 568.319C362.181 568.319 362.513 568.263 362.785 568.151C363.065 568.031 363.277 567.863 363.421 567.647C363.565 567.423 363.637 567.155 363.637 566.843C363.637 566.547 363.573 566.299 363.445 566.099C363.325 565.899 363.125 565.719 362.845 565.559C362.565 565.391 362.189 565.219 361.717 565.043C361.381 564.907 361.081 564.763 360.817 564.611C360.561 564.459 360.345 564.287 360.169 564.095C359.993 563.903 359.857 563.679 359.761 563.423C359.673 563.167 359.629 562.871 359.629 562.535C359.629 562.071 359.737 561.679 359.953 561.359C360.177 561.031 360.481 560.783 360.865 560.615C361.257 560.439 361.705 560.351 362.209 560.351C362.641 560.351 363.037 560.395 363.397 560.483C363.757 560.563 364.097 560.679 364.417 560.831L364.105 561.647C363.809 561.519 363.501 561.415 363.181 561.335C362.861 561.247 362.529 561.203 362.185 561.203C361.849 561.203 361.561 561.259 361.321 561.371C361.081 561.475 360.897 561.627 360.769 561.827C360.649 562.027 360.589 562.263 360.589 562.535C360.589 562.847 360.649 563.103 360.769 563.303C360.897 563.503 361.093 563.679 361.357 563.831C361.621 563.983 361.965 564.143 362.389 564.311C362.861 564.495 363.261 564.691 363.589 564.899C363.917 565.107 364.165 565.359 364.333 565.655C364.509 565.943 364.597 566.315 364.597 566.771Z" fill="${Colors.instrumentTickMarkLabelSecondary}"/>
            </g>
            <g transform="scale(1.5) translate(-185 -120)">
                <path d="M563.996 367.039H559.508V358.471H563.996V359.323H560.468V362.131H563.792V362.971H560.468V366.187H563.996V367.039Z" fill="${Colors.instrumentTickMarkLabelSecondary}"/>
            </g>

            ${this.getNorthArrow()}
        `;
    }

    private getNorthArrow() {
        if (this.hasNorthArrow) {
            return svg`
                <g transform="scale(1.5) translate(-120 -60)">
                    <path d="M382.635 167.578C383.845 168.962 382.702 171.129 380.873 170.951C374.676 170.348 368.393 170.039 362.038 170.039C355.683 170.039 349.399 170.348 343.202 170.951C341.373 171.129 340.231 168.962 341.441 167.578L360.533 145.759C361.329 144.849 362.746 144.849 363.543 145.759L382.635 167.578Z" fill="${Colors.instrumentTickMarkSecondary}"/>
                    <path d="M365.295 167.039H362.931L359.583 160.487H359.535C359.543 160.679 359.551 160.875 359.559 161.075C359.575 161.275 359.587 161.479 359.595 161.687C359.603 161.887 359.611 162.091 359.619 162.299C359.627 162.507 359.635 162.715 359.643 162.923V167.039H357.999V158.471H360.363L363.687 164.963H363.723C363.723 164.779 363.719 164.591 363.711 164.399C363.703 164.199 363.691 164.003 363.675 163.811C363.667 163.611 363.659 163.411 363.651 163.211C363.643 163.011 363.639 162.811 363.639 162.611V158.471H365.295V167.039Z" fill="${Colors.elementActiveInvertedColor}"/>
                </g>
            `;
        }
        else {
            return nothing;
        }
    }

    private getClipPaths() {
        return svg`
            <mask id="path-21-outside-3_6762_9950" maskUnits="userSpaceOnUse" x="346.422" y="277.386" width="73.7128" height="95.6744" fill="black">
                <rect fill="white" x="346.422" y="277.386" width="73.7128" height="95.6744"/>
                <path d="M362.761 364.76L359.296 362.76L366.442 350.383L369.907 352.383L362.761 364.76ZM372.365 348.126L368.9 346.126L381.192 324.835L384.657 326.835L372.365 348.126ZM404.8 286.315C405.418 285.835 406.321 286.357 406.214 287.132L401.479 321.436C401.251 323.088 399.028 323.468 398.211 321.995L392.915 312.531L387.115 322.578L383.65 320.578L389.45 310.532L378.609 310.678C376.925 310.708 376.143 308.592 377.459 307.569L404.8 286.315ZM383.78 307.088L393.82 306.965L398.734 315.721L401.867 293.028L383.78 307.088Z"/>
            </mask>
        `;
    }

    private getVessel() {
        if (this.isHdgValid) {
            return svg`
                <g transform="translate(0 ${this.getSensorPosition()}) rotate(${this.hdgDirection + ((this.getRotation()) ?? 0)} ${this.center.x} ${this.center.y - this.getSensorPosition()})">
                    ${this.getVesselIcon()}
                </g>
            `;
        }
        else {
            return nothing;
        }
    }

    private getVesselIcon() {
        return svg`
            <path d="M352.851 379.952L352.851 357.954C352.851 335.57 362.039 335.57 362.039 335.57C362.039 335.57 371.226 335.57 371.226 357.954L371.226 387.284L371.226 428.508C371.226 429.612 370.331 430.508 369.226 430.508L368.929 430.508L355.148 430.508L354.851 430.508C353.747 430.508 352.851 429.612 352.851 428.508L352.851 379.952Z" fill="${Colors.instrumentFramePrimary}"/>
            <path d="M352.851 379.952L355.914 375.321L355.914 371.461L368.547 371.461L368.547 384.583L371.226 387.284M371.226 387.284L371.226 428.508C371.226 429.612 370.331 430.508 369.226 430.508L368.929 430.508L355.148 430.508L354.851 430.508C353.747 430.508 352.851 429.612 352.851 428.508L352.851 357.954C352.851 335.57 362.039 335.57 362.039 335.57C362.039 335.57 371.226 335.57 371.226 357.954L371.226 387.284Z" stroke="${Colors.instrumentTickMarkSecondary}"/>
            <path d="M355.914 366.961L351.32 366.961L351.32 360.836L355.914 357.773L358.976 350.117L365.101 350.117L368.164 357.773L372.758 360.836L372.758 366.961L368.164 366.961L365.867 369.258L358.211 369.258L355.914 366.961Z" fill="${Colors.instrumentFramePrimary}"/>
            <path d="M358.211 369.258L355.914 366.961L351.32 366.961L351.32 360.836L355.914 357.773L358.976 350.117M358.211 369.258L365.867 369.258M358.211 369.258L358.211 358.539C358.39 355.54 358.976 350.117 358.976 350.117M365.867 369.258L368.164 366.961L372.758 366.961L372.758 360.836L368.164 357.773L365.101 350.117M365.867 369.258L365.867 358.539C365.688 355.54 365.101 350.117 365.101 350.117M365.101 350.117L358.976 350.117" stroke="${Colors.instrumentTickMarkSecondary}"/>
            <path d="M365.867 362.367L365.867 366.195L364.336 366.961L359.742 366.961L358.211 366.195L358.211 362.367L359.742 364.664L364.336 364.664L365.867 362.367Z" fill="${Colors.instrumentFramePrimary}"/>
            <path d="M364.336 364.664L365.867 362.367L365.867 366.195L364.336 366.961M364.336 364.664L359.742 364.664M364.336 364.664L364.336 366.961M359.742 364.664L358.211 362.367L358.211 366.195L359.742 366.961M359.742 364.664L359.742 366.961M359.742 366.961L364.336 366.961" stroke="${Colors.instrumentTickMarkSecondary}"/>    
        `;
    }

    private getSensorPosition() {
        if (this.sensorPosition == SensorPosition.aft) {
            return -60;
        }
        else if (this.sensorPosition == SensorPosition.middle) {
            return -20;
        }
        else {
            return 0; // -15;
        }
    }

    private getStwArrowMask() {
        return svg`
            <mask id="path-29-outside-4_6762_9950" maskUnits="userSpaceOnUse" x="332.039" y="245.54" width="60" height="255" fill="black">
                <rect fill="white" x="332.039" y="245.54" width="60" height="255"/>
                <path d="M363.039 499.539H361.039V497.535H363.039V499.539ZM363.039 495.528H361.039V493.521H363.039V495.528ZM363.039 491.514H361.039V489.506H363.039V491.514ZM363.039 487.499H361.039V485.491H363.039V487.499ZM363.039 483.484H361.039V481.477H363.039V483.484ZM363.039 479.47H361.039V477.462H363.039V479.47ZM363.039 475.454H361.039V473.447H363.039V475.454ZM363.039 471.44H361.039V469.433H363.039V471.44ZM363.039 467.425H361.039V465.418H363.039V467.425ZM363.039 463.41H361.039V461.403H363.039V463.41ZM363.039 459.396H361.039V457.389H363.039V459.396ZM363.039 455.381H361.039V453.374H363.039V455.381ZM363.039 451.366H361.039V449.359H363.039V451.366ZM363.039 447.352H361.039V445.345H363.039V447.352ZM363.039 443.337H361.039V441.329H363.039V443.337ZM363.039 439.322H361.039V437.314H363.039V439.322ZM363.039 435.308H361.039V433.3H363.039V435.308ZM363.039 431.293H361.039V429.285H363.039V431.293ZM363.039 427.278H361.039V425.271H363.039V427.278ZM363.039 423.264H361.039V421.256H363.039V423.264ZM363.039 419.249H361.039V417.241H363.039V419.249ZM363.039 415.234H361.039V413.227H363.039V415.234ZM363.039 411.219H361.039V409.212H363.039V411.219ZM363.039 407.204H361.039V405.197H363.039V407.204ZM363.039 403.189H361.039V401.183H363.039V403.189ZM363.039 399.175H361.039V397.168H363.039V399.175ZM363.039 395.16H361.039V393.153H363.039V395.16ZM363.039 391.146H361.039V389.139H363.039V391.146ZM363.039 387.131H361.039V385.124H363.039V387.131ZM363.039 383.116H361.039V381.109H363.039V383.116ZM363.039 379.102H361.039V377.094H363.039V379.102ZM363.039 375.087H361.039V373.079H363.039V375.087ZM363.039 371.072H361.039V369.064H363.039V371.072ZM361.222 248.083C361.517 247.359 362.56 247.359 362.855 248.083L375.906 280.16C376.534 281.705 374.799 283.146 373.355 282.278L363.039 276.135V358.685C364.168 359.021 365.057 359.91 365.393 361.039H390.039C390.591 361.039 391.039 361.487 391.039 362.039C391.039 362.591 390.591 363.039 390.039 363.039H365.393C365.057 364.168 364.167 365.057 363.039 365.393V367.058H361.039V365.393C359.91 365.057 359.02 364.168 358.684 363.039H334.039C333.487 363.039 333.039 362.591 333.039 362.039C333.039 361.487 333.486 361.039 334.039 361.039H358.684C359.02 359.91 359.91 359.021 361.039 358.685V276.135L350.722 282.278C349.278 283.146 347.543 281.705 348.172 280.16L361.222 248.083ZM360.924 363.039C361.198 363.345 361.595 363.539 362.039 363.539C362.482 363.539 362.879 363.345 363.154 363.039H363.039V363.043H361.039V363.039H360.924ZM361.039 360.923C360.998 360.959 360.96 360.998 360.924 361.039H361.039V360.923ZM363.039 361.039H363.154C363.118 360.998 363.079 360.959 363.039 360.923V361.039Z"/>
            </mask>
        `;
    }

    private getHdgDirection(stroke: string, strokeWidth: number, dashed = true) {
        return svg`
            <path 
                d="M362.039 498.539L362.039 362.039"
                stroke="${stroke}"
                stroke-width="${strokeWidth}"
                stroke-linecap="square"
                stroke-dasharray=${dashed ? "0.5 4" : ''}
            />
            <path 
                d="M334.039 362.039H390.039"
                stroke="${stroke}"
                stroke-width="${strokeWidth}"
                stroke-linecap="round"
            />
        `;
    }

    private getStwArrow(stroke: string, strokeWidth: number, fill?: string) {
        const cx = 362.039;
        const cy = 362.039;
        
        const intensity = Math.min(Math.max(this.hdgSpeed / this.maxSpeed, 0), 1);
    
        const minY = cy - 10;
        const maxY = 219;
        const y = minY - (minY - maxY) * intensity;
    
        return svg`
            <!-- Bar -->
            <path 
                d="M${cx} ${cy} L${cx} ${y}"
                stroke="${stroke}"
                stroke-width="${strokeWidth}"
            />
    
            <!-- Arrow -->
            <g transform="translate(0 ${y - 268})">
                <path 
                    d="M361.222 248.083C361.517 247.359 362.561 247.359 362.855 248.083L375.906 280.16C376.535 281.705 374.8 283.146 373.356 282.278L362.039 275.54L350.722 282.278C349.278 283.146 347.543 281.705 348.171 280.16L361.222 248.083Z"
                    fill="${fill ?? "none"}"
                    stroke="${stroke}"
                    stroke-width="${strokeWidth}"
                />
            </g>
        `;
    }
    

    private getStwContainer() {
        return svg`
            <!-- OUTLINE -->
            <g stroke="${Colors.borderSilhouetteColor}" stroke-width="3" fill="none">
                ${this.getHdgDirection(Colors.borderSilhouetteColor, 3, false)}
                ${this.getStwArrow(Colors.borderSilhouetteColor, 3)}
                <circle cx="362.039" cy="362.039" r="2.5"/>
                <circle cx="362.039" cy="362.039" r="3" fill="${Colors.borderSilhouetteColor}"/>
            </g>

            <!-- MAIN -->
            <g stroke="${Colors.instrumentEnhancedSecondary}" stroke-width="2" fill="${Colors.instrumentEnhancedSecondary}">
                ${this.getHdgDirection(Colors.instrumentEnhancedSecondary, 2, true)}
                ${this.getStwArrow(Colors.instrumentEnhancedSecondary, 2, Colors.instrumentEnhancedSecondary)}
                <circle cx="362.039" cy="362.039" r="2.5"/>
                <circle cx="362.039" cy="362.039" r="3" fill="${Colors.borderSilhouetteColor}"/>
            </g>
        `;
    }
    
    private renderSogContainer() {
        const cx = 362.039;
        const cy = 362.039;

        const intensity = Math.min(Math.max(this.cogSpeed / this.maxSpeed, 0), 1);

        const minY = cy - 10;
        const maxY = 219;
        const y = minY - (minY - maxY) * intensity;

        return svg`
            <g stroke="${Colors.borderSilhouetteColor}" stroke-width="5" fill="none">

                <path 
                    d="M${cx} ${cy} L${cx} ${y + 8}"
                    stroke-linecap="square"
                    stroke-dasharray="20 6"
                />

                <g transform="translate(0 ${y - 295})">
                    <path
                        fill-rule="evenodd" clip-rule="evenodd"
                        d="M362.029 298.446L370.663 303.572L362.029 282.352L353.395 303.572L362.029 298.446ZM361.212 275.073C361.507 274.348 362.551 274.348 362.846 275.073L375.897 307.149C376.525 308.694 374.79 310.135 373.346 309.268L362.029 302.529L350.712 309.268C349.268 310.135 347.533 308.694 348.161 307.149L361.212 275.073Z"
                        fill="none"
                        stroke="${Colors.borderSilhouetteColor}"
                        stroke-width="1"/>

                </g>

            </g>

            <path 
                d="M${cx} ${cy} L${cx} ${y + 8}"
                stroke="${Colors.instrumentRegularSecondary}"
                stroke-width="4" 
                stroke-linecap="square" 
                stroke-dasharray="20 6"
            />

            <g transform="translate(0 ${y - 295})">
                <path fill-rule="evenodd" clip-rule="evenodd" 
                    d="M362.029 298.446L370.663 303.572L362.029 282.352L353.395 303.572L362.029 298.446ZM361.212 275.073C361.507 274.348 362.551 274.348 362.846 275.073L375.897 307.149C376.525 308.694 374.79 310.135 373.346 309.268L362.029 302.529L350.712 309.268C349.268 310.135 347.533 308.694 348.161 307.149L361.212 275.073Z"
                    fill="${Colors.instrumentRegularSecondary}"
                />
            </g>

            <!-- CENTER -->
            <circle cx="362.039" cy="362.039" r="2.5" stroke="${Colors.instrumentRegularSecondary}" stroke-width="2"/>
            <circle cx="362.039" cy="362.039" r="1.75" fill="${Colors.borderSilhouetteColor}"/>

        `;
    }

    private getCurrent() {
        if (this.isCurrentValid) {
            return svg`
                <g transform="rotate(${0.25 + this.currentAngle} ${this.center.x} ${this.center.y})" clip-path="url(#clip0_6762_9950)">
                    ${this.renderCurrentIcon()}
                </g>
            `;
        }
        else {
            return nothing;
        }
    }

    renderCurrentIcon() {
        const cx = 355.66;
        const cy = 360.66;
        const radius = 225;
        
        return svg`
            <g transform="
              translate(${cx}, ${cy})
              translate(0, -${radius})
              translate(-5, -11)
              scale(2)
            ">
              ${getCurrentIcon(this.currentSpeed)}
            </g>
        `;
    }

    renderWindIcon() {
        const cx = 357.66;
        const cy = 360.66;
        const radius = 225;
        
        return svg`
            <g transform="
                translate(${cx}, ${cy})
                translate(0, -${radius})
                translate(-5, -11)
                scale(2)">
                ${getWindIcon(this.windSpeed)}
            </g>
        `;
    }

    private getWind() {
        if (this.isWindValid) {
            return svg`
                <g transform="rotate(${0.25 + this.windAngle} ${this.center.x} ${this.center.y})" clip-path="url(#clip1_6762_9950)">
                    ${this.renderWindIcon()}
                </g>
            `;
        }
        else {
            return nothing;
        }
    }

    private getRot() {
        this.rotSpeed = this.rotationsPerMinute * 360;
        this.endAngle = this.rotationsPerMinute * 18;

        const clipId = "rot-bar-mask";

        const CX = 361.66;
        const CY = 362;

        return svg`
            <g transform="translate(${CX}, ${CY})">
                <defs>
                    <clipPath id="${clipId}">
                        ${this.renderPrimaryBarAreaMask([
                            {
                              startAngle: 0,
                              endAngle: this.endAngle + (this.rotationsPerMinute > 0 ? 1.5 : -1.5),
                              fillColor: "white",
                            }
                        ])}
                    </clipPath>
                </defs>

                <!-- BAR -->
                ${this.renderPrimaryBarArea([
                  {
                      startAngle: 0,
                      endAngle: this.endAngle,
                      fillColor: Colors.instrumentRegularTertiary,
                    }
                ])}

                <!-- MARKER -->
                <circle
                    cx="${176 * Math.cos((this.endAngle - 90) * Math.PI / 180)}"
                    cy="${176 * Math.sin((this.endAngle - 90) * Math.PI / 180)}"
                    r="6"
                    fill="${Colors.borderSilhouetteColor}"
                    stroke="${Colors.instrumentRegularSecondary}"
                    stroke-width="4"
                />

                <!-- DOTS -->
                <g clip-path="url(#${clipId})">
                    <g id="rot-spinner" transform="rotate(${this.rot})">

                        ${[0, 72, 144, 216, 288].map(a => {
                            const r = 176;
                            const rad = (a - 90) * Math.PI / 180;
                            const x = r * Math.cos(rad);
                            const y = r * Math.sin(rad);

                            return svg`
                                <circle
                                  cx="${x}"
                                  cy="${y}"
                                  r="4"
                                  fill="${Colors.instrumentRegularSecondary}"
                                />
                            `;
                        })}

                    </g>
                </g>

            </g>
        `;
    }

    private renderPrimaryBarArea(barAreas: WatchBarArea[]): SVGTemplateResult[] | typeof nothing {
        if (!barAreas.length) return nothing;

        return barAreas.map(bar => {
            const start = Math.min(bar.startAngle, bar.endAngle);
            const end = Math.max(bar.startAngle, bar.endAngle);

            const d = this.describeArc(168, 184, start, end);

            return svg`
                <path
                  d="${d}"
                  fill=${bar.fillColor}
                />
            `;
        });
    }

    private renderPrimaryBarAreaMask(barAreas: WatchBarArea[]): SVGTemplateResult[] | typeof nothing {
        if (!barAreas.length) return nothing;

        return barAreas.map(bar => {
            const start = Math.min(bar.startAngle, bar.endAngle);
            const end = Math.max(bar.startAngle, bar.endAngle);

            const d = this.describeArc(164, 180, start, end); // malo veći kao OpenBridge

            return svg`
              <path
                d="${d}"
                fill="white"
              />
            `;
        });
    }

    private describeArc(r: number, R: number, startAngle: number, endAngle: number) {
        const toRad = (a: number) => (a - 90) * Math.PI / 180;

        const largeArc = endAngle - startAngle > 180 ? 1 : 0;

        const x1 = R * Math.cos(toRad(startAngle));
        const y1 = R * Math.sin(toRad(startAngle));

        const x2 = R * Math.cos(toRad(endAngle));
        const y2 = R * Math.sin(toRad(endAngle));

        const x3 = r * Math.cos(toRad(endAngle));
        const y3 = r * Math.sin(toRad(endAngle));

        const x4 = r * Math.cos(toRad(startAngle));
        const y4 = r * Math.sin(toRad(startAngle));

        return `
            M ${x1} ${y1}
            A ${R} ${R} 0 ${largeArc} 1 ${x2} ${y2}
            L ${x3} ${y3}
            A ${r} ${r} 0 ${largeArc} 0 ${x4} ${y4}
            Z
        `;
    }

}

declare global {
  interface HTMLElementTagNameMap {
    'ob-true-relative': TrueRelative;
  }
}