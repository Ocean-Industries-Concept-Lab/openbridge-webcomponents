import {LitElement, PropertyValues, css, html} from 'lit';
import {property} from 'lit/decorators.js';
import '../watch/watch.js';
import {Tickmark, TickmarkType} from '../watch/tickmark.js';
import {arrow, ArrowStyle} from './arrow.js';
import {AdviceState, AngleAdvice, AngleAdviceRaw} from '../watch/advice.js';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import {WatchCircleType} from '../watch/watch.js';
import {SetpointBundle} from '../../svghelpers/setpoint-bundle.js';
import type {SetpointColorMode} from '../../svghelpers/setpoint.js';
import {Priority} from '../types.js';
import {customElement} from '../../decorator.js';

export enum CompassDirection {
  NorthUp = 'northUp',
  HeadingUp = 'headingUp',
  CourseUp = 'courseUp',
}

@customElement('obc-heading')
export class ObcHeading extends LitElement {
  @property({type: Number}) heading = 0;
  @property({type: Number}) courseOverGround = 0;

  @property({type: Number}) headingSetpoint: number | null = null;
  @property({type: Number}) newHeadingSetpoint: number | undefined;
  @property({type: Boolean}) atHeadingSetpoint: boolean = false;
  @property({type: Number}) headingSetpointAtZeroDeadband: number = 0.5;
  @property({type: String}) headingSetpointColorMode:
    | SetpointColorMode
    | undefined;
  @property({type: Boolean}) disableAutoAtHeadingSetpoint: boolean = false;
  @property({type: Number}) autoAtHeadingSetpointDeadband: number = 2;
  @property({type: Boolean}) animateSetpoint: boolean = false;
  @property({type: Boolean}) touching: boolean = false;
  @property({type: Array, attribute: false}) headingAdvices: AngleAdvice[] = [];
  @property({type: String}) direction: CompassDirection =
    CompassDirection.NorthUp;
  @property({type: String}) priority: Priority = Priority.regular;

  private _headingSp = new SetpointBundle({
    angularWraparound: true,
    onAnimationEnd: () => this.requestUpdate(),
  });

  override willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);
    this._headingSp.sync({
      setpoint: this.headingSetpoint ?? undefined,
      newSetpoint: this.newHeadingSetpoint,
      atSetpoint: this.atHeadingSetpoint,
      touching: this.touching,
      disableAutoAtSetpoint: this.disableAutoAtHeadingSetpoint,
      autoAtSetpointDeadband: this.autoAtHeadingSetpointDeadband,
      setpointAtZeroDeadband: this.headingSetpointAtZeroDeadband,
      setpointColorMode: this.headingSetpointColorMode,
      animateSetpoint: this.animateSetpoint,
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._headingSp.dispose();
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
          .touching=${this.touching}
          .padding=${padding}
          .advices=${this.angleAdviceRaw}
          .tickmarks=${tickmarks}
          .watchCircleType=${WatchCircleType.single}
          .labelFrameEnabled=${true}
          .crosshairEnabled=${true}
          .angleSetpoint=${this.headingSetpoint ?? undefined}
          .newAngleSetpoint=${this.newHeadingSetpoint}
          .atAngleSetpoint=${this._headingSp.computeAtSetpoint(this.heading)}
          .angleSetpointAtZeroDeadband=${this.headingSetpointAtZeroDeadband}
          .colorMode=${this.headingSetpointColorMode}
          .priority=${this.priority}
          .animateSetpoint=${this.animateSetpoint}
          .rotation=${this.getRotation()}
        >
        </obc-watch>
        <svg viewBox="${viewBox}">
          ${arrow(
            ArrowStyle.HDG,
            this.heading + (this.getRotation() ?? 0),
            this.priority
          )}
          ${arrow(
            ArrowStyle.COG,
            this.courseOverGround + (this.getRotation() ?? 0),
            Priority.regular
          )}
        </svg>
      </div>
    `;
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
    'obc-heading': ObcHeading;
  }
}
