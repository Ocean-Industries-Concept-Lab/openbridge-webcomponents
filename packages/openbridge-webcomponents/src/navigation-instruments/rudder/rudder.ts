import {LitElement, css, html, nothing, svg} from 'lit';
import {property} from 'lit/decorators.js';
import '../watch/watch.js';
import {Tickmark, TickmarkType} from '../watch/tickmark.js';
import {WatchCircleType} from '../watch/watch.js';
import {InstrumentState} from '../types.js';
import {SetpointColorMode} from '../../svghelpers/setpoint.js';
import {AdviceState, AngleAdvice, AngleAdviceRaw} from '../watch/advice.js';
import {customElement} from '../../decorator.js';

export enum ObcRudderVariant {
  Bar = 'bar',
  Needle = 'needle',
}

@customElement('obc-rudder')
export class ObcRudder extends LitElement {
  @property({type: Number}) angle = 0;
  @property({type: Number}) setpoint: number | undefined;
  @property({type: Number}) newSetpoint: number | undefined;
  @property({type: String}) variant: ObcRudderVariant = ObcRudderVariant.Bar;
  @property({type: Boolean}) atSetpoint: boolean = false;
  @property({type: Number}) setpointAtZeroDeadband: number = 0.5;
  @property({type: String}) setpointColorMode: SetpointColorMode | undefined;
  @property({type: Boolean}) touching: boolean = false;
  @property({type: Boolean}) disableAutoAtSetpoint: boolean = false;
  @property({type: Number}) autoAtSetpointDeadband: number = 2;
  @property({type: Number}) maxAngle = 90;
  @property({type: Boolean}) labels: boolean = false;
  @property({type: String}) state: InstrumentState = InstrumentState.inCommand;
  @property({type: Array, attribute: false}) advices: AngleAdvice[] = [];

  atSetpointCalc(): boolean {
    if (this.setpoint === undefined) {
      return false;
    }

    if (this.touching) {
      return false;
    }

    if (!this.disableAutoAtSetpoint) {
      return Math.abs(this.angle - this.setpoint) < this.autoAtSetpointDeadband;
    }
    return this.atSetpoint;
  }

  getAngle(value: number) {
    return 180 - value;
  }

  get barColor() {
    if (this.variant === ObcRudderVariant.Needle) {
      if (this.state === InstrumentState.inCommand) {
        return 'var(--instrument-enhanced-tertiary-color)';
      } else if (this.state === InstrumentState.active) {
        return 'var(--instrument-regular-tertiary-color)';
      } else if (
        this.state === InstrumentState.loading ||
        this.state === InstrumentState.off
      ) {
        return 'var(--instrument-frame-tertiary-color)';
      }
      return 'var(--instrument-regular-secondary-color)';
    } else {
      if (this.state === InstrumentState.inCommand) {
        return 'var(--instrument-enhanced-secondary-color)';
      } else if (this.state === InstrumentState.active) {
        return 'var(--instrument-regular-secondary-color)';
      } else if (
        this.state === InstrumentState.loading ||
        this.state === InstrumentState.off
      ) {
        return 'var(--instrument-frame-tertiary-color)';
      }
      return 'var(--instrument-regular-secondary-color)';
    }
  }

  renderNeedle() {
    if (this.variant === ObcRudderVariant.Bar) {
      return nothing;
    }
    let color: string;
    if (this.state === InstrumentState.inCommand) {
      color = 'var(--instrument-enhanced-secondary-color)';
    } else if (this.state === InstrumentState.active) {
      color = 'var(--instrument-regular-secondary-color)';
    } else if (
      this.state === InstrumentState.loading ||
      this.state === InstrumentState.off
    ) {
      color = 'var(--instrument-frame-tertiary-color)';
    } else {
      color = 'var(--instrument-enhanced-secondary-color)';
    }
    return svg`
      <path
        transform="translate(-256, -256) rotate(${-this.angle} 256 256)"
        d="M260.462 411.447C259.81 416.73 251.933 416.645 251.514 411.191L239.826 259.24C239.618 258.192 239.508 257.109 239.508 256C239.508 255.764 239.514 255.528 239.524 255.294L239.503 255.039L239.462 254.5H239.576C240.334 246.09 247.401 239.5 256.008 239.5C264.615 239.5 271.681 246.09 272.439 254.5H272.542L272.5 255.039L272.488 255.196C272.501 255.462 272.508 255.731 272.508 256C272.508 257.144 272.391 258.261 272.169 259.339L260.487 411.191L260.462 411.447Z"
        fill="${color}"
        stroke="var(--border-silhouette-color)"
      />
    `;
  }

  override render() {
    const barAreas = [
      {
        startAngle: this.getAngle(0),
        endAngle: this.getAngle(this.angle),
        fillColor: this.barColor,
      },
    ];

    const setpointAngle =
      this.setpoint !== undefined ? 180 - this.setpoint : undefined;

    const tickmarks: Tickmark[] = [
      {
        angle: 180,
        type: TickmarkType.primary,
        text: this.labels ? '0' : undefined,
      },
      {
        angle: 180,
        type: TickmarkType.zeroLineThick,
        color: this.barColor,
      },
      {
        angle: 180 - this.maxAngle,
        type: TickmarkType.secondary,
        text: this.labels ? this.maxAngle.toFixed(0) : undefined,
      },
      {
        angle: 180 + this.maxAngle,
        type: TickmarkType.secondary,
        text: this.labels ? (-this.maxAngle).toFixed(0) : undefined,
      },
    ];

    let helpAngle: null | number = null;
    if (this.maxAngle > 70) {
      helpAngle = 45;
    } else if (this.maxAngle > 50) {
      helpAngle = 30;
    } else if (this.maxAngle > 40) {
      helpAngle = 22.5;
    }

    if (helpAngle !== null) {
      tickmarks.push({angle: 180 - helpAngle, type: TickmarkType.primary});
      tickmarks.push({angle: 180 + helpAngle, type: TickmarkType.primary});
    }

    const advices = this.advices.map<AngleAdviceRaw>((adv): AngleAdviceRaw => {
      const startAngle = 180 - adv.maxAngle;
      const endAngle = 180 - adv.minAngle;
      const isInRange =
        this.setpoint !== undefined &&
        this.setpoint >= adv.minAngle &&
        this.setpoint <= adv.maxAngle;
      let state;
      if (isInRange) {
        state = AdviceState.triggered;
      } else if (adv.hinted) {
        state = AdviceState.hinted;
      } else {
        state = AdviceState.regular;
      }
      return {
        minAngle: startAngle,
        maxAngle: endAngle,
        type: adv.type,
        state: state,
      };
    });

    return html`
      <div class="container">
        <obc-watch
          .clipTop=${40}
          .areas=${[
            {
              startAngle: 180 - this.maxAngle,
              endAngle: 180 + this.maxAngle,
              roundInsideCut: true,
              roundOutsideCut: true,
            },
          ]}
          .angleSetpoint=${setpointAngle}
          .newAngleSetpoint=${this.newSetpoint !== undefined
            ? 180 - this.newSetpoint
            : undefined}
          .atAngleSetpoint=${this.atSetpointCalc()}
          .angleSetpointAtZeroDeadband=${this.setpointAtZeroDeadband}
          .colorMode=${this.setpointColorMode}
          .padding=${48}
          .tickmarks=${tickmarks}
          .watchCircleType=${WatchCircleType.double}
          .barAreas=${barAreas}
          .state=${this.state}
          .advices=${advices}
        ></obc-watch>
        <svg viewBox="-224 -44.8 448 268.8">${this.renderNeedle()}</svg>
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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-rudder': ObcRudder;
  }
}
