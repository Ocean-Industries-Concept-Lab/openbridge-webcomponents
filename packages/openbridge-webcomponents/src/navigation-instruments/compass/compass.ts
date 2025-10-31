import {LitElement, PropertyValues, css, html} from 'lit';
import {property, query} from 'lit/decorators.js';
import '../watch/watch.js';
import {Tickmark, TickmarkType} from '../watch/tickmark.js';
import {arrow, ArrowStyle} from './arrow.js';
import {AdviceState, AngleAdvice, AngleAdviceRaw} from '../watch/advice.js';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import {VesselImage, VesselImageSize, WatchCircleType} from '../watch/watch.js';
import {rot} from './rot.js';
import {RateOfTurnController} from '../rate-of-turn/rate-of-turn.controller.js';
import {customElement} from '../../decorator.js';

export enum CompassDirection {
  NorthUp = 'northUp',
  HeadingUp = 'headingUp',
  CourseUp = 'courseUp',
}

/**
 *
 * @property {number} heading - The current heading of the vessel in degrees.
 * @property {number} courseOverGround - The current course over ground in degrees.
 * @property {number | null} headingSetPoint - The set point for the heading in degrees.
 * @property {boolean} atHeadingSetpoint - Indicates if the vessel is at the heading set point.
 * @property {boolean} disableAutoAtHeadingSetpoint - Disables automatic at heading set point calculation.
 * @property {number} autoAtHeadingSetpointDeadband - The deadband for the heading set point in degrees.
 * @property {boolean} touching - Indicates if the compass is being touched.
 * @property {Array<AngleAdvice>} headingAdvices - An array of angle advices for the compass.
 * @property {number | null} windSpeed - The wind speed in beaufort scale number.
 * @property {number | null} windFromDirection - The direction the wind is coming from in degrees.
 * @property {number | null} currentSpeed - The current speed, number of arrows.
 * @property {number | null} currentFromDirection - The direction the current is coming from in degrees.
 * @property {VesselImage} vesselImage - The image of the vessel.
 * @property {number} rotationsPerMinute - The number of rotations per minute for the rate of turn controller.
 *
 * @ignition-base-height: 512px
 * @ignition-base-width: 512px
 */
@customElement('obc-compass')
export class ObcCompass extends LitElement {
  @property({type: Number}) heading = 0;
  @property({type: Number}) courseOverGround = 0;
  @property({type: Number}) headingSetPoint: number | null = null;
  @property({type: Boolean}) atHeadingSetpoint: boolean = false;
  @property({type: Boolean}) disableAutoAtHeadingSetpoint: boolean = false;
  @property({type: Number}) autoAtHeadingSetpointDeadband: number = 2;
  @property({type: Boolean}) touching: boolean = false;
  @property({type: Array, attribute: false}) headingAdvices: AngleAdvice[] = [];
  @property({type: Number}) windSpeed: number | null = null;
  @property({type: Number}) windFromDirection: number | null = null;
  @property({type: Number}) currentSpeed: number | null = null;
  @property({type: Number}) currentFromDirection: number | null = null;
  @property({type: String}) vesselImage: VesselImage = VesselImage.genericTop;
  @property({type: Number}) rotationsPerMinute: number = 1;
  @property({type: String}) direction: CompassDirection =
    CompassDirection.NorthUp;

  protected override updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);
    if (
      _changedProperties.has('rotationsPerMinute') &&
      this.rateOfTurnController
    ) {
      this.rateOfTurnController.rotationsPerMinute = this.rotationsPerMinute;
    }
  }

  @query('#rot')
  private rot!: HTMLElement;

  private rateOfTurnController?: RateOfTurnController;

  override firstUpdated() {
    this.rateOfTurnController = new RateOfTurnController(
      this,
      this.rot,
      this.rotationsPerMinute
    );
  }

  // @ts-expect-error TS6133: The controller ensures that the render
  // function is called on resize of the element
  private _resizeController = new ResizeController(this, {});

  private getPadding() {
    const size = Math.min(this.clientHeight, this.clientWidth);
    const deltaWidth = 512 - size;
    const steps = deltaWidth / 128;
    let deltaPadding = 0;
    if (deltaWidth > 0) {
      deltaPadding = steps * 48;
    } else {
      deltaPadding = steps * 6;
    }

    return 72 + deltaPadding;
  }

  private get angleAdviceRaw(): AngleAdviceRaw[] {
    return this.headingAdvices.map(({minAngle, maxAngle, hinted, type}) => {
      const state =
        this.heading >= minAngle && this.heading <= maxAngle
          ? AdviceState.triggered
          : hinted
            ? AdviceState.hinted
            : AdviceState.regular;
      return {minAngle, maxAngle, type, state};
    });
  }

  private getRotation(): number | undefined {
    if (this.direction === CompassDirection.NorthUp) {
      return undefined;
    } else if (this.direction === CompassDirection.HeadingUp) {
      return -this.heading;
    } else if (this.direction === CompassDirection.CourseUp) {
      return -this.courseOverGround;
    }
    return undefined;
  }

  override render() {
    const tickmarks: Tickmark[] = [
      {angle: 0, type: TickmarkType.main},
      {angle: 90, type: TickmarkType.main},
      {angle: 180, type: TickmarkType.main},
      {angle: 270, type: TickmarkType.main},
    ];

    const padding = this.getPadding();
    const width = (176 + padding) * 2;
    const viewBox = `-${width / 2} -${width / 2} ${width} ${width}`;

    return html`
      <div class="container">
        <obc-watch
          .padding=${padding}
          .advices=${this.angleAdviceRaw}
          .tickmarks=${tickmarks}
          .watchCircleType=${WatchCircleType.triple}
          .labelFrameEnabled=${true}
          .crosshairEnabled=${true}
          .angleSetpoint=${this.headingSetPoint ?? undefined}
          .atAngleSetpoint=${this.atHeadingSetpointCalc()}
          .vessels=${[
            {
              size: VesselImageSize.medium,
              vesselImage: this.vesselImage,
              transform: `rotate(${this.heading}deg)`,
            },
          ]}
          .wind=${this.windSpeed}
          .windFromDirectionDeg=${this.windFromDirection}
          .current=${this.currentSpeed}
          .currentFromDirectionDeg=${this.currentFromDirection}
          .rotation=${this.getRotation()}
        >
        </obc-watch>
        <svg viewBox="${viewBox}">
          ${arrow(ArrowStyle.HDG, this.heading + (this.getRotation() ?? 0))}
          ${arrow(
            ArrowStyle.COG,
            this.courseOverGround + (this.getRotation() ?? 0)
          )}
          <g id="rot">${rot}</g>
        </svg>
      </div>
    `;
  }

  atHeadingSetpointCalc(): boolean {
    if (this.headingSetPoint === null) {
      return false;
    }

    if (this.touching) {
      return false;
    }

    if (!this.disableAutoAtHeadingSetpoint) {
      const diff = Math.abs(this.heading - this.headingSetPoint);
      const angularDistance = diff > 180 ? 360 - diff : diff;
      return angularDistance < this.autoAtHeadingSetpointDeadband;
    }
    return this.atHeadingSetpoint;
  }

  static override styles = css`
    * {
      box-sizing: border-box;
    }

    .container {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .container > * {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-compass': ObcCompass;
  }
}
