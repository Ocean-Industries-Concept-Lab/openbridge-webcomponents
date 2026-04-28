import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './azimuth-thruster-labeled.css?inline';
import {CommandStatus} from '../badge-command/badge-command.js';
import {classMap} from 'lit/directives/class-map.js';
import '../badge-command/badge-command.js';
import '../azimuth-thruster/azimuth-thruster.js';
import '../readout/readout.js';
import {
  ReadoutDirection,
  ReadoutPriorityElement,
  ReadoutVariant,
} from '../readout/readout.js';
import {InstrumentState, Priority} from '../types.js';
import {AngleAdvice} from '../watch/advice.js';
import {LinearAdvice} from '../thruster/advice.js';
import {PropellerType} from '../thruster/propeller.js';
import {TickmarkStyle} from '../watch/tickmark.js';
import {customElement} from '../../decorator.js';

export enum AzimuthThrusterLabeledSize {
  medium = 'medium',
  large = 'large',
}

@customElement('obc-azimuth-thruster-labeled')
export class ObcAzimuthThrusterLabeled extends LitElement {
  @property({type: String}) label = '';
  @property({type: String})
  commandStatus: CommandStatus = CommandStatus.InCommand;
  @property({type: String}) size: AzimuthThrusterLabeledSize =
    AzimuthThrusterLabeledSize.medium;
  @property({type: String}) readoutVariant: ReadoutVariant =
    ReadoutVariant.enhanced;
  @property({type: Number}) angle = 0;
  @property({type: Number}) angleSetpoint: number | undefined;
  @property({type: Number}) newAngleSetpoint: number | undefined;
  @property({type: Boolean})
  atAngleSetpoint: boolean = false;
  @property({type: Number}) angleSetpointAtZeroDeadband: number = 0.5;
  @property({type: Boolean}) angleSetpointOverride: boolean = false;
  @property({type: Boolean, attribute: false}) autoAtAngleSetpoint: boolean =
    true;
  @property({type: Number}) autoAtAngleSetpointDeadband: number = 2;
  @property({type: Boolean}) touching: boolean = false;

  @property({type: Number}) thrust = 0;
  @property({type: Number}) thrustSetpoint: number | undefined;
  @property({type: Boolean})
  atThrustSetpoint: boolean = false;
  @property({type: Boolean, attribute: false}) autoAtThrustSetpoint: boolean =
    true;
  @property({type: Number}) autoAtThrustSetpointDeadband: number = 1;
  @property({type: Number}) thrustSetpointAtZeroDeadband: number = 0.1;
  @property({type: Boolean}) thrustSetpointOverride: boolean = false;
  @property({type: Array, attribute: false}) angleAdvices: AngleAdvice[] = [];
  @property({type: Array, attribute: false}) thrustAdvices: LinearAdvice[] = [];
  @property({type: String}) tickmarkStyle: TickmarkStyle =
    TickmarkStyle.regular;
  @property({type: Boolean}) singleDirection: boolean = false;
  @property({type: String}) topPropeller: PropellerType = PropellerType.none;
  @property({type: String}) bottomPropeller: PropellerType = PropellerType.none;

  override render() {
    let state: InstrumentState = InstrumentState.active;
    let priority: Priority = Priority.enhanced;
    const isNotInCommand = [
      CommandStatus.NoCommand,
      CommandStatus.Blocked,
      CommandStatus.CommandAvailable,
    ].includes(this.commandStatus);

    if (isNotInCommand) {
      state = InstrumentState.active;
      priority = Priority.regular;
    }

    const readoutPriority = Priority.enhanced;

    const effectiveReadoutVariant = isNotInCommand
      ? ReadoutVariant.regular
      : this.readoutVariant;

    return html`
      <div class=${classMap({wrapper: true, [this.size]: true})}>
        <div class="label">
          <obc-badge-command
            class="badge"
            status=${this.commandStatus}
            ?large=${this.size === AzimuthThrusterLabeledSize.large}
          ></obc-badge-command>
          <div class="label-text">${this.label}</div>
        </div>
        <obc-readout
          class="instrument-field-angle"
          .variant=${effectiveReadoutVariant}
          .direction=${ReadoutDirection.vertical}
          .hug=${false}
          .hasInput=${true}
          .inputValue=${this.angleSetpoint === undefined
            ? '-'
            : this.angleSetpoint.toFixed(0)}
          .priority=${readoutPriority}
          .priorityElements=${[
            ReadoutPriorityElement.input,
            ReadoutPriorityElement.value,
          ]}
          .value=${this.angle}
          label="Angle"
          unit="DEG"
        >
          <svg
            slot="input-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.66797 4.80263C4.66797 4.14363 5.45194 3.76746 6.0013 4.16286L10.4456 7.17243C11.0312 7.56899 11.0314 8.43154 10.4459 8.82828L6.0013 11.8401C5.45194 12.2355 4.66797 11.8593 4.66797 11.2003L4.66797 4.80263Z"
              fill="var(--instrument-enhanced-primary-color)"
            />
          </svg>
        </obc-readout>
        <obc-readout
          class="instrument-field-power"
          .variant=${effectiveReadoutVariant}
          .direction=${ReadoutDirection.vertical}
          .hug=${false}
          .hasInput=${true}
          .inputValue=${this.thrustSetpoint === undefined
            ? '-'
            : this.thrustSetpoint.toFixed(0)}
          .priority=${readoutPriority}
          .priorityElements=${[
            ReadoutPriorityElement.input,
            ReadoutPriorityElement.value,
          ]}
          .value=${this.thrust}
          label="Power"
          unit="%"
        >
          <svg
            slot="input-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.66797 4.80263C4.66797 4.14363 5.45194 3.76746 6.0013 4.16286L10.4456 7.17243C11.0312 7.56899 11.0314 8.43154 10.4459 8.82828L6.0013 11.8401C5.45194 12.2355 4.66797 11.8593 4.66797 11.2003L4.66797 4.80263Z"
              fill="var(--instrument-enhanced-primary-color)"
            />
          </svg>
        </obc-readout>
        <obc-azimuth-thruster
          class="azimuth-thruster"
          .hasLabelSpacer=${false}
          .thrust=${this.thrust}
          .thrustSetpoint=${this.thrustSetpoint}
          .autoAtThrustSetpoint=${this.autoAtThrustSetpoint}
          .autoAtThrustSetpointDeadband=${this.autoAtThrustSetpointDeadband}
          .angle=${this.angle}
          .angleSetpoint=${this.angleSetpoint}
          .autoAtAngleSetpoint=${this.autoAtAngleSetpoint}
          .autoAtAngleSetpointDeadband=${this.autoAtAngleSetpointDeadband}
          .atThrustSetpoint=${this.atThrustSetpoint}
          .atAngleSetpoint=${this.atAngleSetpoint}
          .newAngleSetpoint=${this.newAngleSetpoint}
          .angleSetpointAtZeroDeadband=${this.angleSetpointAtZeroDeadband}
          .angleSetpointOverride=${this.angleSetpointOverride}
          .thrustSetpointAtZeroDeadband=${this.thrustSetpointAtZeroDeadband}
          .thrustSetpointOverride=${this.thrustSetpointOverride}
          .state=${state}
          .priority=${priority}
          .touching=${this.touching}
          .angleAdvices=${this.angleAdvices}
          .thrustAdvices=${this.thrustAdvices}
          .singleDirection=${this.singleDirection}
          .tickmarkStyle=${this.tickmarkStyle}
          .topPropeller=${this.topPropeller}
          .bottomPropeller=${this.bottomPropeller}
        ></obc-azimuth-thruster>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-azimuth-thruster-labeled': ObcAzimuthThrusterLabeled;
  }
}
