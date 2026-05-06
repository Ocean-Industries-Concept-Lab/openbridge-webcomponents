import {html, LitElement, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import type {PropertyValues} from 'lit';
import {svg} from 'lit';
import {InstrumentState, Priority} from '../types.js';
import {SetpointBundle} from '../../svghelpers/setpoint-bundle.js';
import '../watch/watch.js';
import {WatchCircleType} from '../watch/watch.js';
import {SailType, sailTypeImages} from '../watch/sail-type.js';
import componentStyle from './wind-propulsion.css?inline';
import {AngleAdvice, AngleAdviceRaw, AdviceState} from '../watch/advice.js';
import {Tickmark, TickmarkStyle, TickmarkType} from '../watch/tickmark.js';
import {renderForceBar} from './force-bar.js';
import {customElement} from '../../decorator.js';

function mapAngle0to360(angle: number): number {
  const a = angle % 360;
  return a >= 0 ? a : a + 360;
}

export enum WindPropulsionPriorityElement {
  sail = 'sail',
  forceBar = 'forceBar',
  wind = 'wind',
}

/**
 * `<obc-wind-propulsion>` – Radial instrument showing sail force direction and strength.
 *
 * Displays a circular watch face with a rotatable sail image, a directional force bar
 * indicating force strength (0–100), and an independent sail angle setpoint. The sail
 * and force bar rotate independently to show the difference between sail orientation
 * and force direction.
 *
 * ## Features
 *
 * - **Sail angle**: Rotatable sail type image with a directional arrow
 *   pointing outward from the bow.
 * - **Force angle / force**: A vertical bar overlay that rotates to `forceAngle`,
 *   filled proportionally to `force / maxForce`.
 * - **Sail angle setpoint**: Optional setpoint marker on the watch ring with
 *   auto at-setpoint detection and confirm animation support.
 * - **Advice zones**: Configurable caution/alert arcs on the watch ring.
 * - **Wind overlay**: Optional wind speed/direction indicator (pass-through to watch).
 * - **Labels**: Toggleable 0°/90°/180°/–90° tickmark labels.
 * - **Priority elements**: Selectively apply the enhanced color palette to
 *   individual elements (`sail`, `forceBar`, `wind`) via `priorityElements`.
 *
 * ## Usage Guidelines
 *
 * - Set `forceAngle` and `sailAngle` independently to show the angular
 *   difference between force direction and sail orientation.
 * - Use `sailAngleSetpoint` to show a target sail angle on the watch ring.
 * - Select the sail image via `sailType` (e.g. `SailType.solidSail`).
 * - Use `priorityElements` to control which elements receive the enhanced
 *   color palette when `priority` is `enhanced`.
 * - Set `maxForce` to the system-specific ceiling so the bar fills
 *   proportionally (default 100).
 * - For a full-circle compass, use `<obc-compass>` instead.
 *
 * @fires None
 */
@customElement('obc-wind-propulsion')
export class ObcWindPropulsion extends LitElement {
  @property({type: Number}) forceAngle = 0;
  @property({type: Number}) sailAngle = 0;

  @property({type: Number}) sailAngleSetpoint: number | undefined;
  @property({type: Number}) newSailAngleSetpoint: number | undefined;
  @property({type: Boolean}) atSailAngleSetpoint: boolean = false;
  @property({type: Boolean, attribute: false})
  autoAtSailAngleSetpoint: boolean = true;
  @property({type: Number}) autoAtSailAngleSetpointDeadband: number = 2;
  @property({type: Number}) sailAngleSetpointAtZeroDeadband: number = 0.5;
  @property({type: Boolean}) sailAngleSetpointOverride: boolean = false;
  @property({type: Boolean}) animateSetpoint: boolean = false;
  @property({type: Boolean}) touching: boolean = false;

  @property({type: Number}) force = 0;
  @property({type: Number}) maxForce = 100;
  @property({type: String}) sailType: SailType = SailType.rotorSail;

  @property({type: String}) state: InstrumentState = InstrumentState.active;
  @property({type: String}) priority: Priority = Priority.regular;
  @property({type: Array, attribute: false})
  priorityElements: WindPropulsionPriorityElement[] = [
    WindPropulsionPriorityElement.sail,
  ];
  @property({type: Boolean}) showLabels: boolean = false;
  @property({type: Boolean}) tickmarksInside: boolean = false;
  @property({type: String}) tickmarkStyle: TickmarkStyle =
    TickmarkStyle.regular;

  @property({type: Number}) currentWindSpeedBeaufort: number | null = null;
  @property({type: Number}) currentWindFromDirection: number | null = null;

  @property({type: Array, attribute: false}) sailAngleAdvices: AngleAdvice[] =
    [];

  private _forceBarMaskId = `wp-fb-${Math.random().toString(36).slice(2, 9)}`;

  private _sailAngleSp = new SetpointBundle({
    angularWraparound: true,
    onAnimationEnd: () => this.requestUpdate(),
  });

  override willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);
    this._sailAngleSp.sync({
      setpoint: this.sailAngleSetpoint,
      newSetpoint: this.newSailAngleSetpoint,
      atSetpoint: this.atSailAngleSetpoint,
      touching: this.touching,
      autoAtSetpoint: this.autoAtSailAngleSetpoint,
      autoAtSetpointDeadband: this.autoAtSailAngleSetpointDeadband,
      setpointAtZeroDeadband: this.sailAngleSetpointAtZeroDeadband,
      setpointOverride: this.sailAngleSetpointOverride,
      animateSetpoint: this.animateSetpoint,
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._sailAngleSp.dispose();
  }

  private priorityFor(element: WindPropulsionPriorityElement): Priority {
    const selected = Array.isArray(this.priorityElements)
      ? this.priorityElements
      : [];
    return selected.includes(element) ? this.priority : Priority.regular;
  }

  private colorFor(element: WindPropulsionPriorityElement): string | undefined {
    return this.priorityFor(element) === Priority.enhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : undefined;
  }

  private getPadding(): number {
    if (
      this.currentWindSpeedBeaufort != null &&
      this.currentWindFromDirection != null
    ) {
      return 72;
    }
    if (this.showLabels && !this.tickmarksInside) {
      return 60;
    }
    return 24;
  }

  private get angleAdviceRaw(): AngleAdviceRaw[] {
    return this.sailAngleAdvices.map((advice) => {
      const triggered =
        this.sailAngleSetpoint !== undefined &&
        mapAngle0to360(this.sailAngleSetpoint - advice.minAngle) <=
          mapAngle0to360(advice.maxAngle - advice.minAngle);
      let state: AdviceState;
      if (triggered) {
        state = AdviceState.triggered;
      } else if (advice.hinted) {
        state = AdviceState.hinted;
      } else {
        state = AdviceState.regular;
      }
      return {
        minAngle: advice.minAngle,
        maxAngle: advice.maxAngle,
        type: advice.type,
        state,
      };
    });
  }

  private getTickmarks(): Tickmark[] {
    const tickmarks: Tickmark[] = [];

    const labelText = (angle: number): string | undefined => {
      if (!this.showLabels) return undefined;
      return angle <= 180 ? `${angle}` : `${angle - 360}`;
    };

    tickmarks.push({
      angle: 0,
      type: TickmarkType.zeroLine,
      text: this.showLabels ? '0' : undefined,
    });

    for (const angle of [90, 180, 270]) {
      tickmarks.push({
        angle,
        type: TickmarkType.primary,
        text: labelText(angle),
      });
    }

    return tickmarks;
  }

  private renderSailImage() {
    const entry = sailTypeImages[this.sailType];
    if (!entry) return svg``;

    const sailPriority = this.priorityFor(WindPropulsionPriorityElement.sail);
    const arrowColor =
      sailPriority === Priority.enhanced
        ? 'var(--instrument-enhanced-secondary-color)'
        : 'var(--instrument-regular-secondary-color)';

    // Center each sail SVG on its visual center (cx/cy), falling back to
    // the geometric viewBox center (width/2, height/2).
    const cx = entry.cx ?? entry.width / 2;
    const cy = entry.cy ?? entry.height / 2;

    // Scale sails down so their top edge clears the directional arrow
    // with the same ~5px gap the arrow has from the watch ring.
    const sailScale = 0.95;

    // Fixed arrow radius matching compass/heading arrow positioning
    // (just inside RING2_RADIUS = 160).
    const arrowRadius = 155;

    return svg`
      <g style="transform: rotate(${this.sailAngle}deg)">
        <g style="transform: scale(${sailScale}) translate(${-cx}px, ${-cy}px)">
          ${entry.svg}
        </g>
        <path transform="translate(-15 ${-arrowRadius})"
          d="M0.707007 14.2929L14.9999 0L29.2928 14.2929C29.9228 14.9229 29.4766 16 28.5857 16H1.41412C0.523211 16 0.0770419 14.9229 0.707007 14.2929Z"
          fill="${arrowColor}" vector-effect="non-scaling-stroke"/>
      </g>
    `;
  }

  override render() {
    const tickmarks = this.getTickmarks();
    const padding = this.getPadding();
    const width = (176 + padding) * 2;
    const viewBox = `-${width / 2} -${width / 2} ${width} ${width}`;

    return html`
      <div class="container">
        <obc-watch
          .touching=${this.touching}
          .padding=${padding}
          .tickmarks=${tickmarks}
          .state=${this.state}
          .priority=${this.priority}
          .angleSetpoint=${this.sailAngleSetpoint}
          .newAngleSetpoint=${this.newSailAngleSetpoint}
          .atAngleSetpoint=${this._sailAngleSp.computeAtSetpoint(
            this.sailAngle
          )}
          .angleSetpointAtZeroDeadband=${this.sailAngleSetpointAtZeroDeadband}
          .setpointOverride=${this.sailAngleSetpointOverride}
          .animateSetpoint=${this.animateSetpoint}
          .tickmarksInside=${this.tickmarksInside}
          .tickmarkStyle=${this.tickmarkStyle}
          .watchCircleType=${WatchCircleType.single}
          .advices=${this.angleAdviceRaw}
          .wind=${this.currentWindSpeedBeaufort}
          .windFromDirectionDeg=${this.currentWindFromDirection}
          .windColor=${this.colorFor(WindPropulsionPriorityElement.wind)}
        ></obc-watch>
        <svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">
          ${this.renderSailImage()}
        </svg>
        <svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">
          <g style="transform: rotate(${this.forceAngle}deg) scale(0.965)">
            <g transform="translate(-256, -256)">
              ${renderForceBar(
                this.force,
                this.maxForce,
                this.state,
                this.priorityFor(WindPropulsionPriorityElement.forceBar),
                this._forceBarMaskId
              )}
            </g>
          </g>
        </svg>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-wind-propulsion': ObcWindPropulsion;
  }
}
