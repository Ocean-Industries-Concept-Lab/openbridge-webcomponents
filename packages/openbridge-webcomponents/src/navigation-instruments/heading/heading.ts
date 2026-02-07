import {LitElement, PropertyValues, css, html} from 'lit';
import {property} from 'lit/decorators.js';
import '../watch/watch.js';
import {Tickmark, TickmarkType} from '../watch/tickmark.js';
import {arrow, ArrowStyle} from './arrow.js';
import {AdviceState, AngleAdvice, AngleAdviceRaw} from '../watch/advice.js';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import {WatchCircleType} from '../watch/watch.js';
import {SetpointMixin} from '../../svghelpers/setpoint-mixin.js';
import type {SetpointColorMode} from '../../svghelpers/setpoint.js';
import {customElement} from '../../decorator.js';

export enum CompassDirection {
  NorthUp = 'northUp',
  HeadingUp = 'headingUp',
  CourseUp = 'courseUp',
}

@customElement('obc-heading')
export class ObcHeading extends SetpointMixin(LitElement, {
  angularWraparound: true,
}) {
  @property({type: Number}) heading = 0;
  @property({type: Number}) courseOverGround = 0;

  // -- Deprecated prefixed aliases (synced to mixin properties in willUpdate) --
  /** @deprecated Use `setpoint` instead. Renamed from `headingSetPoint`. */
  @property({type: Number}) headingSetpoint: number | null = null;
  /** @deprecated Use `newSetpoint` instead. */
  @property({type: Number}) newHeadingSetpoint: number | undefined;
  /** @deprecated Use `atSetpoint` instead. */
  @property({type: Boolean}) atHeadingSetpoint: boolean = false;
  /** @deprecated Use `setpointAtZeroDeadband` instead. */
  @property({type: Number}) headingSetpointAtZeroDeadband: number = 0.5;
  /** @deprecated Use `setpointColorMode` instead. */
  @property({type: String}) headingSetpointColorMode:
    | SetpointColorMode
    | undefined;
  /** @deprecated Use `disableAutoAtSetpoint` instead. */
  @property({type: Boolean}) disableAutoAtHeadingSetpoint: boolean = false;
  /** @deprecated Use `autoAtSetpointDeadband` instead. */
  @property({type: Number}) autoAtHeadingSetpointDeadband: number = 2;
  // `touching` is provided by SetpointMixin — no alias needed
  @property({type: Array, attribute: false}) headingAdvices: AngleAdvice[] = [];
  @property({type: String}) direction: CompassDirection =
    CompassDirection.NorthUp;
  @property({type: Boolean}) enhanced: boolean = false;

  override willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);
    // Sync deprecated prefixed aliases → mixin properties
    // Only sync if the alias was set and the mixin property was NOT also set,
    // to avoid the alias's default value overwriting a directly-set mixin prop.
    if (changed.has('headingSetpoint') && !changed.has('setpoint')) {
      this.setpoint = this.headingSetpoint ?? undefined;
    }
    if (changed.has('newHeadingSetpoint') && !changed.has('newSetpoint')) {
      this.newSetpoint = this.newHeadingSetpoint;
    }
    if (changed.has('atHeadingSetpoint') && !changed.has('atSetpoint')) {
      this.atSetpoint = this.atHeadingSetpoint;
    }
    if (
      changed.has('headingSetpointAtZeroDeadband') &&
      !changed.has('setpointAtZeroDeadband')
    ) {
      this.setpointAtZeroDeadband = this.headingSetpointAtZeroDeadband;
    }
    if (
      changed.has('headingSetpointColorMode') &&
      !changed.has('setpointColorMode')
    ) {
      this.setpointColorMode = this.headingSetpointColorMode;
    }
    if (
      changed.has('disableAutoAtHeadingSetpoint') &&
      !changed.has('disableAutoAtSetpoint')
    ) {
      this.disableAutoAtSetpoint = this.disableAutoAtHeadingSetpoint;
    }
    if (
      changed.has('autoAtHeadingSetpointDeadband') &&
      !changed.has('autoAtSetpointDeadband')
    ) {
      this.autoAtSetpointDeadband = this.autoAtHeadingSetpointDeadband;
    }
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
          .watchCircleType=${WatchCircleType.single}
          .labelFrameEnabled=${true}
          .crosshairEnabled=${true}
          .angleSetpoint=${this.setpoint}
          .newAngleSetpoint=${this.newSetpoint}
          .atAngleSetpoint=${this.computeAtSetpoint(this.heading)}
          .angleSetpointAtZeroDeadband=${this.setpointAtZeroDeadband}
          .colorMode=${this.setpointColorMode}
          .rotation=${this.getRotation()}
        >
        </obc-watch>
        <svg viewBox="${viewBox}">
          ${arrow(
            ArrowStyle.HDG,
            this.heading + (this.getRotation() ?? 0),
            this.enhanced
          )}
          ${arrow(
            ArrowStyle.COG,
            this.courseOverGround + (this.getRotation() ?? 0),
            false
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
