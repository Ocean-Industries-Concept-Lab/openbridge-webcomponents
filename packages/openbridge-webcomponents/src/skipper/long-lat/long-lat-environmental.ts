import {LitElement, svg, html, SVGTemplateResult, nothing} from 'lit';
import {property, state} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import { longLatStyles } from './long-lat-styles.js';
import { Colors, MeasurementPosition, SpeedType, WatchBarArea } from '../interfaces.js';
import { getWindIcon } from '../wind-icons.js';
import { getCurrentIcon } from '../current-icons.js';

@customElement('ob-long-lat-environmental')
export class LongLatEnvironmental extends LitElement {
    @property({type: Number}) longMaxSpeed = 25;
    @property({type: Number}) latMaxSpeed = 5;
    @property({type: Number}) longSpeed = 5;
    @property({type: Number}) latFrontSpeed = 5;
    @property({type: Number}) latMiddleSpeed = 5;
    @property({type: Number}) latAftSpeed = 5;
    @property({type: String}) speedType = SpeedType.SOG;

    @property({type: Number}) windSpeed = 5;
    @property({type: Number}) windAngle = 5;
    @property({type: Number}) currentSpeed = 5;
    @property({type: Number}) currentAngle = 5;
    @property({type: Number}) heading = 0;
    @property({type: Number}) rotationsPerMinute: number = 1;
    @property({type: Boolean}) showVesselTrail = false;

    @property({type: Boolean}) showSensorIcon = false;
    @property({type: String}) measurementPosition = MeasurementPosition.CCRP;
    @property({type: Number}) bowToCCRP = 25;
    @property({type: Number}) sternToCCRP = 25;
    @property({type: Number}) sensorToCCRP = 15;

    longSpeedRatio = 1;
    latFrontSpeedRatio = 1;
    latMiddleSpeedRatio = 1;
    latAftSpeedRatio = 1;

    private lowIntegrity = false;

    @state()
    private rot = 0;
    
    rotSpeed = 10;    // brzina u °/min
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
        // this.setMaxSpeed();
        this.setLongSpeedRatio();
        this.setLatFrontSpeedRatio();
        this.setLatMiddleSpeedRatio();
        this.setLatAftSpeedRatio();
        this.setRotationsPerMinute();
        
        return html`
          <div class="container">
            ${this.getLongLat()}
          </div>
        `;
    }

    static override styles = [
        longLatStyles
    ];

    private get isWindValid() {
        return this.isValidNumber(this.windSpeed) && this.isValidNumber(this.windAngle);
    }

    private get isCurrentValid() {
        return this.isValidNumber(this.currentSpeed) && this.isValidNumber(this.currentAngle);
    }

    /*
    private setMaxSpeed(): void {
        if (this.longMaxSpeed < 25) {
          this.longMaxSpeed = 25;
        }
        else if (this.longMaxSpeed > 25) {
          this.longMaxSpeed = 50;
        }
    }
    */

    setLongSpeedRatio() {
        this.longSpeedRatio = Math.abs(this.longSpeed / this.longMaxSpeed);
    }

    setLatFrontSpeedRatio() {
        this.latFrontSpeedRatio = Math.abs(this.latFrontSpeed / this.latMaxSpeed);
    }

    setLatMiddleSpeedRatio() {
        this.latMiddleSpeedRatio = Math.abs(this.latMiddleSpeed / this.latMaxSpeed);
    }

    setLatAftSpeedRatio() {
        this.latAftSpeedRatio = Math.abs(this.latAftSpeed / this.latMaxSpeed);
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

    private isValidNumber(value: number | undefined): boolean {
        return typeof value === 'number' && !isNaN(value);
    }

    private get isRotationsPerMinuteValid() {
        return this.isValidNumber(this.rotationsPerMinute);
    }

    private get isHeadingValid() {
        return this.isValidNumber(this.heading);
    }

    private getLongLat() {
        return svg`
            <svg width="512" height="512" viewBox="100 100 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                
                ${this.getWatchFace()}

                ${this.getVesselAndVesselSpeeds()}

                ${this.getLabels()}

                ${this.getCurrent()}

                ${this.getWind()}
                
                ${this.getRotContainer()}

                ${this.getVesselTrail()}

                ${this.getSensorIcon()}

            </svg>
        `;
    }

    private getRotContainer() {
        if (this.isRotationsPerMinuteValid && this.isHeadingValid && this.rotationsPerMinute != 0) {
            return svg`
                <g transform="rotate(${this.heading} 360.6 360.6)">
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
            <path fill-rule="evenodd" clip-rule="evenodd" d="M360.66 172.662C464.49 172.662 548.66 256.832 548.66 360.661C548.66 464.491 464.49 548.661 360.66 548.661C256.83 548.661 172.66 464.491 172.66 360.661C172.66 256.832 256.83 172.662 360.66 172.662ZM360.66 196.662C270.085 196.662 196.66 270.087 196.66 360.661C196.66 451.236 270.085 524.661 360.66 524.661C451.235 524.661 524.66 451.236 524.66 360.661C524.66 270.087 451.235 196.662 360.66 196.662Z" fill="${Colors.instrumentFramePrimary}" stroke="${Colors.instrumentFramePrimary}"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M360.66 172.662C464.49 172.662 548.66 256.832 548.66 360.661C548.66 464.491 464.49 548.661 360.66 548.661C256.83 548.661 172.66 464.491 172.66 360.661C172.66 256.832 256.83 172.662 360.66 172.662ZM360.66 196.662C270.085 196.662 196.66 270.087 196.66 360.661C196.66 451.236 270.085 524.661 360.66 524.661C451.235 524.661 524.66 451.236 524.66 360.661C524.66 270.087 451.235 196.662 360.66 196.662Z" stroke="${Colors.instrumentFrameTertiary}"/>
            
            <mask id="mask0_6695_3603" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="104" y="104" width="513" height="513">
                <path d="M360.66 210.662C443.503 210.662 510.66 277.819 510.66 360.662C510.66 443.504 443.503 510.661 360.66 510.661C277.817 510.661 210.66 443.504 210.66 360.662C210.66 277.819 277.817 210.662 360.66 210.662Z" fill="${Colors.instrumentFramePrimary}" stroke="black" stroke-width="20"/>
            </mask>
            <g mask="url(#mask0_6695_3603)">
                <path d="M360.66 196.662L360.66 524.661" stroke="${Colors.instrumentFrameTertiary}" stroke-linecap="square"/>
            </g>
            
            <mask id="mask1_6695_3603" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="104" y="104" width="513" height="513">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M360.66 172.662C464.49 172.662 548.66 256.832 548.66 360.661C548.66 464.491 464.49 548.661 360.66 548.661C256.83 548.661 172.66 464.491 172.66 360.661C172.66 256.832 256.83 172.662 360.66 172.662ZM360.66 196.662C270.085 196.662 196.66 270.087 196.66 360.661C196.66 451.236 270.085 524.661 360.66 524.661C451.235 524.661 524.66 451.236 524.66 360.661C524.66 270.087 451.235 196.662 360.66 196.662Z" fill="white" stroke="black"/>
            </mask>
            <g mask="url(#mask1_6695_3603)">
                <mask id="mask2_6695_3603" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="104" y="104" width="513" height="513">
                    <path d="M360.66 168.663C466.698 168.663 552.66 254.623 552.66 360.662C552.66 466.7 466.698 552.662 360.66 552.662C254.621 552.662 168.661 466.7 168.661 360.662C168.661 254.624 254.621 168.663 360.66 168.663ZM360.66 196.662C270.085 196.662 196.661 270.088 196.661 360.662C196.661 451.236 270.085 524.662 360.66 524.662C451.234 524.662 524.66 451.236 524.66 360.662C524.66 270.087 451.234 196.662 360.66 196.662Z" fill="black"/>
                </mask>
                <g mask="url(#mask2_6695_3603)">
                    <path d="M360.66 160.662V360.661M360.66 360.661H160.661M360.66 360.661V560.661M360.66 360.661H560.66" stroke="${Colors.instrumentTickmarkTertiary}"/>
                </g>
            </g>
        `;
    }

    private getLabels() {
        return svg`
            <g transform="scale(1.5) translate(-120 -67.5)">
                <path d="M363.496 213.162H362.392L357.688 205.938H357.64C357.648 206.082 357.656 206.242 357.664 206.418C357.68 206.586 357.692 206.77 357.7 206.97C357.708 207.162 357.712 207.362 357.712 207.57C357.72 207.778 357.724 207.986 357.724 208.194V213.162H356.836V204.594H357.928L362.62 211.794H362.656C362.656 211.69 362.652 211.554 362.644 211.386C362.636 211.218 362.628 211.034 362.62 210.834C362.612 210.626 362.604 210.418 362.596 210.21C362.588 209.994 362.584 209.794 362.584 209.61L362.584 204.594H363.496V213.162Z" fill="${Colors.instrumentTickMarkLabelSecondary}"/>
            </g>
            <g transform="scale(1.5) translate(-120 -172.5)">
                <path d="M363.16 514.894C363.16 515.406 363.036 515.838 362.788 516.19C362.54 516.542 362.184 516.814 361.72 517.006C361.264 517.19 360.732 517.282 360.124 517.282C359.804 517.282 359.496 517.266 359.2 517.234C358.912 517.202 358.648 517.158 358.408 517.102C358.176 517.038 357.968 516.966 357.784 516.886V515.95C358.072 516.078 358.428 516.194 358.852 516.298C359.276 516.394 359.716 516.442 360.172 516.442C360.604 516.442 360.968 516.386 361.264 516.274C361.568 516.154 361.8 515.986 361.96 515.77C362.12 515.546 362.2 515.278 362.2 514.966C362.2 514.67 362.132 514.422 361.996 514.222C361.868 514.022 361.652 513.842 361.348 513.682C361.044 513.514 360.636 513.342 360.124 513.166C359.756 513.03 359.432 512.886 359.152 512.734C358.88 512.582 358.648 512.41 358.456 512.218C358.272 512.026 358.132 511.802 358.036 511.546C357.94 511.29 357.892 510.994 357.892 510.658C357.892 510.194 358.008 509.802 358.24 509.482C358.472 509.154 358.792 508.906 359.2 508.738C359.616 508.562 360.088 508.474 360.616 508.474C361.08 508.474 361.504 508.518 361.888 508.606C362.272 508.686 362.628 508.802 362.956 508.954L362.644 509.77C362.34 509.642 362.012 509.538 361.66 509.458C361.316 509.37 360.96 509.326 360.592 509.326C360.224 509.326 359.912 509.382 359.656 509.494C359.4 509.598 359.204 509.75 359.068 509.95C358.932 510.15 358.864 510.386 358.864 510.658C358.864 510.97 358.928 511.226 359.056 511.426C359.192 511.626 359.4 511.802 359.68 511.954C359.968 512.106 360.336 512.266 360.784 512.434C361.296 512.618 361.728 512.814 362.08 513.022C362.432 513.23 362.7 513.482 362.884 513.778C363.068 514.066 363.16 514.438 363.16 514.894Z" fill="${Colors.instrumentTickMarkLabelSecondary}"/>
            </g>
            <g transform="scale(1.5) translate(-172.5 -120)">
                <path d="M515.1 365.162H510.336V356.594H515.1V357.446H511.296V360.254H514.872V361.094H511.296V364.31H515.1V365.162Z" fill="${Colors.instrumentTickMarkLabelSecondary}"/>
            </g>
            <g transform="scale(1.5) translate(-65 -120)">
                <path d="M213.52 356.594L211.228 365.162H210.256L208.552 359.342C208.504 359.182 208.456 359.022 208.408 358.862C208.368 358.694 208.328 358.538 208.288 358.394C208.256 358.242 208.224 358.11 208.192 357.998C208.168 357.886 208.148 357.798 208.132 357.734C208.124 357.798 208.108 357.886 208.084 357.998C208.068 358.102 208.04 358.23 208 358.382C207.968 358.526 207.932 358.678 207.892 358.838C207.852 358.998 207.808 359.162 207.76 359.33L206.092 365.162H205.12L202.84 356.594H203.848L205.252 362.018C205.292 362.194 205.332 362.37 205.372 362.546C205.412 362.714 205.448 362.882 205.48 363.05C205.52 363.21 205.552 363.366 205.576 363.518C205.6 363.67 205.624 363.818 205.648 363.962C205.672 363.81 205.696 363.658 205.72 363.506C205.752 363.346 205.788 363.182 205.828 363.014C205.868 362.838 205.908 362.662 205.948 362.486C205.996 362.31 206.044 362.138 206.092 361.97L207.652 356.594H208.648L210.256 362.006C210.312 362.182 210.36 362.362 210.4 362.546C210.448 362.722 210.492 362.894 210.532 363.062C210.572 363.222 210.604 363.382 210.628 363.542C210.66 363.694 210.688 363.838 210.712 363.974C210.736 363.782 210.764 363.582 210.796 363.374C210.836 363.166 210.884 362.95 210.94 362.726C210.996 362.494 211.056 362.258 211.12 362.018L212.512 356.594H213.52Z" fill="${Colors.instrumentTickMarkLabelSecondary}"/>
            </g>
        `;
    }

    private getVesselAndVesselSpeeds() {
        return svg`
            <g clip-path="url(#clip0_6695_3603)">
                <mask id="mask3_6695_3603" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="196" y="196" width="329" height="329">
                    <ellipse cx="360.66" cy="360.661" rx="164" ry="164" fill="${Colors.instrumentFrameSecondary}"/>
                </mask>
                <g mask="url(#mask3_6695_3603)">
                    <path d="M528.66 312.662L192.66 312.662" stroke="${Colors.instrumentFrameTertiary}" stroke-linecap="round"/>
                    <path d="M528.66 408.661L192.66 408.661" stroke="${Colors.instrumentFrameTertiary}" stroke-linecap="round"/>
                    
                    ${this.getMiddleSpeedContainer()}

                    ${this.getLatSpeedArrow(this.latFrontSpeed, this.latFrontSpeedRatio)}

                    <g transform="translate(0 96)">
                        ${this.getLatSpeedArrow(this.latAftSpeed, this.latAftSpeedRatio)}
                    </g>

                    ${this.getLongSpeedArrow()}
                    
                    ${this.getVessel()}    
                </g>
            </g>
        `;
    }

    private getVessel() {
        return svg`
            <path d="M347.16 357.125L347.16 324.802C347.16 291.912 360.66 291.912 360.66 291.912C360.66 291.912 374.16 291.912 374.16 324.802L374.16 367.899L374.16 429.411C374.16 430.516 373.265 431.411 372.16 431.411L370.785 431.411L350.535 431.411L349.16 431.411C348.055 431.411 347.16 430.516 347.16 429.411L347.16 357.125Z" fill="${Colors.instrumentFramePrimary}"/>
            <path d="M347.16 357.125L351.66 350.32L351.66 344.649L370.222 344.649L370.222 363.93L374.16 367.899M374.16 367.899L374.16 429.411C374.16 430.516 373.265 431.411 372.16 431.411L370.785 431.411L350.535 431.411L349.16 431.411C348.055 431.411 347.16 430.516 347.16 429.411L347.16 324.802C347.16 291.912 360.66 291.912 360.66 291.912C360.66 291.912 374.16 291.912 374.16 324.802L374.16 367.899Z" stroke="${Colors.instrumentTickMarkSecondary}"/>
            <path d="M351.66 338.037L344.91 338.037L344.91 329.037L351.66 324.537L356.16 313.287L365.16 313.287L369.66 324.537L376.41 329.037L376.41 338.037L369.66 338.037L366.285 341.412L355.035 341.412L351.66 338.037Z" fill="${Colors.instrumentFramePrimary}"/>
            <path d="M355.035 341.412L351.66 338.037L344.91 338.037L344.91 329.037L351.66 324.537L356.16 313.287M355.035 341.412L366.285 341.412M355.035 341.412L355.035 325.662C355.298 321.254 356.16 313.287 356.16 313.287M366.285 341.412L369.66 338.037L376.41 338.037L376.41 329.037L369.66 324.537L365.16 313.287M366.285 341.412L366.285 325.662C366.022 321.254 365.16 313.287 365.16 313.287M365.16 313.287L356.16 313.287" stroke="${Colors.instrumentTickMarkSecondary}"/>
            <path d="M366.285 332.287L366.285 337.912L364.035 339.037L357.285 339.037L355.035 337.912L355.035 332.287L357.285 335.662L364.035 335.662L366.285 332.287Z" fill="${Colors.instrumentFramePrimary}"/>
            <path d="M364.035 335.662L366.285 332.287L366.285 337.912L364.035 339.037M364.035 335.662L357.285 335.662M364.035 335.662L364.035 339.037M357.285 335.662L355.035 332.287L355.035 337.912L357.285 339.037M357.285 335.662L357.285 339.037M357.285 339.037L364.035 339.037" stroke="${Colors.instrumentTickMarkSecondary}"/>
        `;
    }

    private getCurrent() {
        if (this.isCurrentValid) {
            return svg`
                <g clip-path="url(#clip7_6695_3603)">
                    <g transform="rotate(${this.currentAngle} 360.6 360.6)">
                        ${this.renderCurrentIcon()}
                    </g>
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
          scale(2)
        ">
          ${getWindIcon(this.windSpeed)}
        </g>
      `;
    }

    private getWind() {
        if (this.isWindValid) {
            return svg`
                <g clip-path="url(#clip8_6695_3603)">
                    <g transform="rotate(${/*-25 + */this.windAngle} 360.6 360.6)">
                        ${this.renderWindIcon()}
                    </g>
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

      const CX = 360.60;
      const CY = 360.66;

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
                <g id="rot-spinner" transform="rotate(${this.rot ?? 0})">

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

    private getSensorIcon() {
        if (this.showSensorIcon) {
            return svg`
                <g transform="translate(0 ${this.getSensorPosition()})">
                    <path d="M366.66 328.662C366.66 331.976 363.974 334.662 360.66 334.662C357.346 334.662 354.66 331.976 354.66 328.662C354.66 325.348 357.346 322.662 360.66 322.662C363.974 322.662 366.66 325.348 366.66 328.662Z" fill="${Colors.elementNeutralColor}" stroke="${Colors.borderSilhouetteColor}" stroke-width="4"/>
                </g>
            `;
        }
        else {
            return nothing;
        }
    }

    private getSensorPosition() {
        const vesselLength = this.bowToCCRP + this.sternToCCRP;
        const unitOfVesselLength = (95 / vesselLength); // 1m of vessel length - mapping real vessel length to svg length
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

    private getLongSpeedArrow() {
        if (this.longSpeed > 0) {
            return svg`
                <g clip-path="url(#clip5_6695_3603)">
                    ${this.getForwardArrows()}
                </g>
          `;
        }
        else if (this.longSpeed < 0) {
            return svg`
                <g clip-path="url(#clip6_6695_3603)">
                    ${this.getBackwardArrows()}
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
                <path d="M360.66 268.662L374.66 276.662L374.66 284.662L360.66 276.662L346.66 284.662L346.66 276.662L360.66 268.662Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
        else if (this.longSpeedRatio < 2/3) {
            return svg`
                <path d="M374.66 264.662L360.66 256.662L346.66 264.662L346.66 272.662L360.66 264.662L374.66 272.662L374.66 264.662Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M360.66 268.662L374.66 276.662L374.66 284.662L360.66 276.662L346.66 284.662L346.66 276.662L360.66 268.662Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
        else {
            return svg`
                <path d="M374.66 252.662L360.66 244.662L346.66 252.662L346.66 260.662L360.66 252.662L374.66 260.662L374.66 252.662Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M374.66 264.662L360.66 256.662L346.66 264.662L346.66 272.662L360.66 264.662L374.66 272.662L374.66 264.662Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M360.66 268.662L374.66 276.662L374.66 284.662L360.66 276.662L346.66 284.662L346.66 276.662L360.66 268.662Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
    }

    private getBackwardArrows() {
        if (this.longSpeedRatio < 1/3) {
            return svg`
                <path d="M360.66 452.661L346.66 444.661L346.66 436.661L360.66 444.661L374.66 436.661L374.66 444.661L360.66 452.661Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
        else if (this.longSpeedRatio < 2/3) {
            return svg`
                <path d="M346.66 456.661L360.66 464.661L374.66 456.661L374.66 448.661L360.66 456.661L346.66 448.661L346.66 456.661Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M360.66 452.661L346.66 444.661L346.66 436.661L360.66 444.661L374.66 436.661L374.66 444.661L360.66 452.661Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
        else {
            return svg`
                <path d="M346.66 468.661L360.66 476.661L374.66 468.661L374.66 460.661L360.66 468.661L346.66 460.661L346.66 468.661Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M346.66 456.661L360.66 464.661L374.66 456.661L374.66 448.661L360.66 456.661L346.66 448.661L346.66 456.661Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M360.66 452.661L346.66 444.661L346.66 436.661L360.66 444.661L374.66 436.661L374.66 444.661L360.66 452.661Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
    }

    private getMiddleSpeedContainer() {
        if (this.measurementPosition == MeasurementPosition.Sensor && this.isValidNumber(this.latMiddleSpeed)) {
            return svg`
                <g transform="translate(0 ${15.5 + this.getSensorPosition() + (this.sensorToCCRP < 0 ? 0.5 : -0.5)})">
                    <path d="M528.66 312.662L192.66 312.662" stroke="${Colors.instrumentFrameTertiary}" stroke-linecap="round"/>
                    ${this.getLatSpeedArrow(this.latMiddleSpeed, this.latMiddleSpeedRatio)}
                </g>
            `;
        }
        else {
            return nothing;
        }
    }

    private getLatSpeedArrow(speed: number, speedRatio: number) {
        if (speed < 0) {
            return svg`
                <g clip-path="url(#clip2_6695_3603)">
                    ${this.getLatLeftArrow(speedRatio)}
                </g>
            `;
        }
        else if (speed > 0) {
            return svg`
                <g clip-path="url(#clip1_6695_3603)">
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
                <path d="M316.66 312.662L324.66 298.662L332.66 298.662L324.66 312.662L332.66 326.662L324.66 326.662L316.66 312.662Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
        else if (speedRatio < 2/3) {
            return svg`
                <path d="M312.66 298.662L304.66 312.662L312.66 326.662L320.66 326.662L312.66 312.662L320.66 298.662L312.66 298.662Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M316.66 312.662L324.66 298.662L332.66 298.662L324.66 312.662L332.66 326.662L324.66 326.662L316.66 312.662Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
        else {
            return svg`
                <path d="M300.66 298.662L292.66 312.662L300.66 326.662L308.66 326.662L300.66 312.662L308.66 298.662L300.66 298.662Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M312.66 298.662L304.66 312.662L312.66 326.662L320.66 326.662L312.66 312.662L320.66 298.662L312.66 298.662Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M316.66 312.662L324.66 298.662L332.66 298.662L324.66 312.662L332.66 326.662L324.66 326.662L316.66 312.662Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
    }

    private getLatRightArrow(speedRatio: number) {
        if (speedRatio < 1/3) {
            return svg`
                <path d="M404.66 312.662L396.66 326.662L388.66 326.662L396.66 312.662L388.66 298.662L396.66 298.662L404.66 312.662Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
        else if (speedRatio < 2/3) {
            return svg`
                <path d="M408.66 326.662L416.66 312.662L408.66 298.662L400.66 298.662L408.66 312.662L400.66 326.662L408.66 326.662Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M404.66 312.662L396.66 326.662L388.66 326.662L396.66 312.662L388.66 298.662L396.66 298.662L404.66 312.662Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
        else {
            return svg`
                <path d="M420.66 326.662L428.66 312.662L420.66 298.662L412.66 298.662L420.66 312.662L412.66 326.662L420.66 326.662Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M408.66 326.662L416.66 312.662L408.66 298.662L400.66 298.662L408.66 312.662L400.66 326.662L408.66 326.662Z" fill="${Colors.instrumentEnhancedSecondary}"/>
                <path d="M404.66 312.662L396.66 326.662L388.66 326.662L396.66 312.662L388.66 298.662L396.66 298.662L404.66 312.662Z" fill="${Colors.instrumentEnhancedSecondary}"/>
            `;
        }
    }

    private getVesselTrail() {
        if (this.showVesselTrail) {
            if (this.longSpeed > 0) {
                if (this.latFrontSpeed > 0 && this.latAftSpeed > 0) {
                    return svg`${this.renderVesselTrail()}`;
                }
                else if (this.latFrontSpeed < 0 && this.latAftSpeed < 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(-1,1)
                          translate(-360.6, -360.6)
                        ">
                            ${this.renderVesselTrail()}
                        </g>
                    `;
                }
                else if (this.latFrontSpeed > 0 && this.latAftSpeed < 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(-1,1)
                          translate(-360.6, -360.6)
                        ">
                            ${this.renderVesselTrail()}
                        </g>
                    `;
                }
                else if (this.latFrontSpeed < 0 && this.latAftSpeed > 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(1,1)
                          translate(-360.6, -360.6)
                        ">
                            ${this.renderVesselTrail()}
                        </g>
                    `;
                }
                else if (this.latFrontSpeed == 0 && this.latAftSpeed == 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(1,1)
                          translate(-360.6, -360.6)
                        ">
                            ${this.renderVesselTrail(0)}
                        </g>
                    `;
                }
                else if (this.latFrontSpeed == 0 && this.latAftSpeed < 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(-1,1)
                          translate(-360.6, -360.6)
                        ">
                            ${this.renderVesselTrail()}
                        </g>
                    `;
                }
                else if (this.latFrontSpeed == 0 && this.latAftSpeed > 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(1,1)
                          translate(-360.6, -360.6)
                        ">
                            ${this.renderVesselTrail()}
                        </g>
                    `;
                }
                else if (this.latFrontSpeed < 0 && this.latAftSpeed == 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(-1,1)
                          translate(-360.6, -360.6)
                        ">
                            ${this.renderVesselTrail()}
                        </g>
                    `;
                }
                else if (this.latFrontSpeed > 0 && this.latAftSpeed == 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(1,1)
                          translate(-360.6, -360.6)
                        ">
                            ${this.renderVesselTrail()}
                        </g>
                    `;
                }
                else {
                    return nothing;
                }
            }
            else if (this.longSpeed < 0) {
                if (this.latFrontSpeed > 0 && this.latAftSpeed > 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(1,-1)
                          translate(-360.6, -360.6)
                        ">
                        ${this.renderVesselTrail()}
                    `;
                }
                else if (this.latFrontSpeed < 0 && this.latAftSpeed < 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(-1,-1)
                          translate(-360.6, -360.6)
                        ">
                            ${this.renderVesselTrail()}
                        </g>
                    `;
                }
                else if (this.latFrontSpeed > 0 && this.latAftSpeed < 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(1,-1)
                          translate(-360.6, -360.6)
                        ">
                            ${this.renderVesselTrail()}
                        </g>
                    `;
                }
                else if (this.latFrontSpeed < 0 && this.latAftSpeed > 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(-1,-1)
                          translate(-360.6, -360.6)
                        ">
                            ${this.renderVesselTrail()}
                        </g>
                    `;
                }
                else if (this.latFrontSpeed == 0 && this.latAftSpeed == 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(1,-1)
                          translate(-360.6, -360.6)
                        ">
                            ${this.renderVesselTrail(0)}
                        </g>
                    `;
                }
                else if (this.latFrontSpeed == 0 && this.latAftSpeed < 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(-1,-1)
                          translate(-360.6, -360.6)
                        ">
                            ${this.renderVesselTrail()}
                        </g>
                    `;
                }
                else if (this.latFrontSpeed == 0 && this.latAftSpeed > 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(1,-1)
                          translate(-360.6, -360.6)
                        ">
                            ${this.renderVesselTrail()}
                        </g>
                    `;
                }
                else if (this.latFrontSpeed < 0 && this.latAftSpeed == 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(-1,-1)
                          translate(-360.6, -360.6)
                        ">
                            ${this.renderVesselTrail()}
                        </g>
                    `;
                }
                else if (this.latFrontSpeed > 0 && this.latAftSpeed == 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(1,-1)
                          translate(-360.6, -360.6)
                        ">
                            ${this.renderVesselTrail()}
                        </g>
                    `;
                }
                else {
                    return nothing;
                }
            }
            else if (this.longSpeed == 0) {
                if (this.latFrontSpeed > 0 && this.latAftSpeed > 0) {
                    return svg`${this.renderVesselTrail()}`;
                }
                else if (this.latFrontSpeed < 0 && this.latAftSpeed < 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(-1,1)
                          translate(-360.6, -360.6)
                        ">
                            ${this.renderVesselTrail()}
                        </g>
                    `;
                }
                else if (this.latFrontSpeed > 0 && this.latAftSpeed < 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(-1,1)
                          translate(-360.6, -360.6)
                        ">
                            ${this.renderVesselTrail()}
                        </g>
                    `;
                }
                else if (this.latFrontSpeed < 0 && this.latAftSpeed > 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(1,1)
                          translate(-360.6, -360.6)
                        ">
                            ${this.renderVesselTrail()}
                        </g>
                    `;
                }
                else if (this.latFrontSpeed == 0 && this.latAftSpeed < 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(-1,1)
                          translate(-360.6, -360.6)
                        ">
                            ${this.renderVesselTrail()}
                        </g>
                    `;
                }
                else if (this.latFrontSpeed == 0 && this.latAftSpeed > 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(1,1)
                          translate(-360.6, -360.6)
                        ">
                            ${this.renderVesselTrail()}
                        </g>
                    `;
                }
                else if (this.latFrontSpeed < 0 && this.latAftSpeed == 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(-1,1)
                          translate(-360.6, -360.6)
                        ">
                            ${this.renderVesselTrail()}
                        </g>
                    `;
                }
                else if (this.latFrontSpeed > 0 && this.latAftSpeed == 0) {
                    return svg`
                        <g transform="
                          translate(360.6, 360.6)
                          scale(1,1)
                          translate(-360.6, -360.6)
                        ">
                            ${this.renderVesselTrail()}
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
        else {
            return nothing;
        }
    }

    private getLatSpeed(): number {
      return Math.max(
        Math.abs(this.latFrontSpeed) ?? 0,
        Math.abs(this.latMiddleSpeed) ?? 0,
        Math.abs(this.latAftSpeed) ?? 0
      );
    }

    private getHotizontalPosition(angle: number, i: number) {
        if (this.longSpeed != 0) {
            return (angle == 0 ? 0 : 0 - i * 1.5);
        }
        else {
            if (Math.abs(this.getLatSpeed()/this.latMaxSpeed) > 2/3) {
                return 0 - i * 8;
            }
            else if (Math.abs(this.getLatSpeed()/this.latMaxSpeed) > 1/3) {
                return 0 - i * 6;
            } 
            else {
                return 0 - i * 3;
            }
            // 0 - i * ((Math.abs(this.latSpeed/this.latMaxSpeed) > 2/3 ? 6 : Math.abs(this.latSpeed/this.latMaxSpeed) > 1/3 ? 8 : 3))
        }
    }

    private getVerticalPosition(i: number) {
        if(this.longSpeed != 0) {
            if (Math.abs(this.longSpeed/this.longMaxSpeed) > 2/3) {
                return i * 8;
            }
            else if (Math.abs(this.longSpeed/this.longMaxSpeed) > 1/3) {
                return i * 6;
            }
            else {
                return i * 3;
            }
        }
        else {
            return 0;
        }
        //(i * (Math.abs(this.longSpeed/this.longMaxSpeed) > 2/3 ? 8 : Math.abs(this.longSpeed/this.longMaxSpeed) > 1/3 ? 6 : 3)) : 0
    }

    private getVesselTrailRotation(angle: number, i: number) {
        if (this.longSpeed == 0) {
            if (Math.abs(this.latFrontSpeed) > Math.abs(this.latAftSpeed)) {
                return -i;
            }
            else if (Math.abs(this.latFrontSpeed) < Math.abs(this.latAftSpeed)) {
                return i;
            }
            else if ((this.latFrontSpeed < 0 && this.latAftSpeed > 0) || (this.latFrontSpeed > 0 && this.latAftSpeed < 0)) {
                return i * 2;
            }
            else {
                return 0;
            }
        }
        else {
            if (angle == 0) {
                return 0;
            }
            else if ((this.latFrontSpeed < 0 && this.latAftSpeed > 0) || (this.latFrontSpeed > 0 && this.latAftSpeed < 0)) {
                return i * 3;
            }
            else {
                return i;
            }
        }
        // this.longSpeed == 0 ? Math.abs(this.latFrontSpeed) > Math.abs(this.latAftSpeed) ? -i : Math.abs(this.latFrontSpeed) < Math.abs(this.latAftSpeed) ? i : 0 : (angle == 0 ? 0 : i)
    }

    private renderVesselTrail(angle = 1) {
      return svg`
        ${Array.from({ length: 10 }, (_, i) =>
          this.renderVesselPath({
            x: this.getHotizontalPosition(angle, i),
            y: this.getVerticalPosition(i), // based on speed
            width: 22,
            height: 180,
            rotation: this.getVesselTrailRotation(angle, i), //*5),
            opacity: 1 - i * 0.1
          })
        )}
      `;
    }

    private renderVesselPath(options: {
      x: number;
      y: number;
      width: number;
      height: number;
      rotation?: number;
      opacity?: number;
    }) {
      const {
        x,
        y,
        // width,
        // height,
        rotation = 0,
        opacity = 1
      } = options;

      const cx = x; // + width / 2;
      const cy = y; // + height / 2;

      return svg`
        <g
          opacity="${opacity}"
          transform="
            translate(${cx}, ${cy})
            rotate(${rotation} 360.6 360.6)
          "
        >
          ${this.getTrail()}
        </g>
      `;
    }

    private getTrail() {
        if (this.longSpeed == 0) {
            return svg`
                <mask id="path-37-inside-3_6711_4722" fill="${Colors.elementNeutralColor}">
                    <path d="M333.66 293.662C333.66 292.557 334.555 291.662 335.66 291.662H359.66C360.765 291.662 361.66 292.557 361.66 293.662V429.662C361.66 430.766 360.765 431.662 359.66 431.662H335.66C334.555 431.662 333.66 430.766 333.66 429.662V293.662Z"/>
                </mask>
                <path d="M332.66 293.662C332.66 292.005 334.003 290.662 335.66 290.662H358.66C360.317 290.662 361.66 292.005 361.66 293.662C361.66 293.109 360.765 292.662 359.66 292.662H335.66C335.108 292.662 334.66 293.109 334.66 293.662H332.66ZM361.66 429.662C361.66 431.319 360.317 432.662 358.66 432.662H335.66C334.003 432.662 332.66 431.319 332.66 429.662H334.66C334.66 430.214 335.108 430.662 335.66 430.662H359.66C360.765 430.662 361.66 430.214 361.66 429.662ZM335.66 432.662C334.003 432.662 332.66 431.319 332.66 429.662V293.662C332.66 292.005 334.003 290.662 335.66 290.662V292.662C335.108 292.662 334.66 293.109 334.66 293.662V429.662C334.66 430.214 335.108 430.662 335.66 430.662V432.662ZM335.66 430.662M361.66 291.662V431.662V291.662" 
                fill="${Colors.elementNeutralColor}" 
                mask="url(#path-37-inside-3_6711_4722)"/>
            `;
        }
        else if (this.latFrontSpeed == 0 && this.latMiddleSpeed == 0 && this.latAftSpeed == 0) {
            return svg`
                <mask id="path-37-inside-3_6711_4722" fill="${Colors.elementNeutralColor}">
                    <path d="M346.66 336.662C346.66 335.557 347.555 334.662 348.66 334.662H372.66C373.765 334.662 374.66 335.557 374.66 336.662V440.662C374.66 441.766 373.765 442.662 372.66 442.662H348.66C347.555 442.662 346.66 441.766 346.66 440.662V336.662Z"/>
                </mask>
                <path d="M346.66 334.662H374.66H346.66M375.66 440.662C375.66 442.319 374.317 443.662 372.66 443.662H348.66C347.003 443.662 345.66 442.319 345.66 440.662H347.66C347.66 441.214 348.108 441.662 348.66 441.662H372.66C373.212 441.662 373.66 441.214 373.66 440.662H375.66ZM348.66 443.662C347.003 443.662 345.66 442.319 345.66 440.662V337.662C345.66 336.005 347.003 334.662 348.66 334.662C348.108 334.662 347.66 335.557 347.66 336.662V440.662C347.66 441.214 348.108 441.662 348.66 441.662V443.662ZM372.66 334.662C374.317 334.662 375.66 336.005 375.66 337.662V440.662C375.66 442.319 374.317 443.662 372.66 443.662V441.662C373.212 441.662 373.66 441.214 373.66 440.662V336.662C373.66 335.557 373.212 334.662 372.66 334.662Z" 
                fill="${Colors.elementNeutralColor}" 
                mask="url(#path-37-inside-3_6711_4722)"/>
            `;
        }
        else {
            return svg`
                <mask id="vessel-mask" fill="${Colors.elementNeutralColor}">
                  <path d="M346.66 336.56C346.66 335.455 347.555 334.56 348.66 334.56H366.66C367.765 334.56 368.66 335.455 368.66 336.56V440.983C368.66 442.088 367.765 442.983 366.66 442.983H348.66C347.555 442.983 346.66 442.088 346.66 440.983V336.56Z"/>
                </mask>

                <path
                  d="M346.66 334.56H368.66H346.66M368.66 440.983C368.66 442.64 367.317 443.983 365.66 443.983H348.66C347.003 443.983 345.66 442.64 345.66 440.983H347.66C347.66 441.536 348.108 441.983 348.66 441.983H366.66C367.765 441.983 368.66 441.536 368.66 440.983ZM348.66 443.983C347.003 443.983 345.66 442.64 345.66 440.983V337.56C345.66 335.903 347.003 334.56 348.66 334.56C348.108 334.56 347.66 335.455 347.66 336.56V440.983C347.66 441.536 348.108 441.983 348.66 441.983V443.983ZM348.66 441.983M368.66 334.56V442.983V334.56"
                  fill="${Colors.elementNeutralColor}"
                  mask="url(#vessel-mask)"
                />
            `;
        }
    }

}

declare global {
  interface HTMLElementTagNameMap {
    'ob-long-lat-environmental': LongLatEnvironmental;
  }
}