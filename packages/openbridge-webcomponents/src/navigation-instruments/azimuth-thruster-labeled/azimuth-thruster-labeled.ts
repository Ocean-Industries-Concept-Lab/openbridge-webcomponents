import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './azimuth-thruster-labeled.css?inline';
import {CommandStatus} from '../badge-command/badge-command.js';
import {classMap} from 'lit/directives/class-map.js';
import '../badge-command/badge-command.js';
import '../instrument-field/instrument-field.js';
import '../azimuth-thruster/azimuth-thruster.js';
import {InstrumentFieldSize} from '../instrument-field/instrument-field.js';
import {InstrumentState} from '../types.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {AngleAdvice} from '../watch/advice.js';
import {LinearAdvice} from '../thruster/advice.js';
import {PropellerType} from '../thruster/propeller.js';
import {SetpointColorMode} from '../../svghelpers/setpoint.js';
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
  @property({type: Number}) angle = 0;
  @property({type: Number}) angleSetpoint: number | undefined;
  @property({type: Boolean})
  atAngleSetpoint: boolean = false;
  @property({type: Boolean}) atAngleSetpointZero: boolean = false;
  @property({type: Boolean}) angleSetpointFocused: boolean = false;
  @property({type: String}) angleSetpointColorMode:
    | SetpointColorMode
    | undefined;
  @property({type: Boolean}) disableAutoAtAngleSetpoint: boolean = false;
  @property({type: Number}) autoAtAngleSetpointDeadband: number = 2;
  @property({type: Boolean}) touching: boolean = false;

  @property({type: Number}) thrust = 0;
  @property({type: Number}) thrustSetpoint: number | undefined;
  @property({type: Boolean})
  atThrustSetpoint: boolean = false;
  @property({type: Boolean})
  thrustSetpointAtZero: boolean = false;
  @property({type: Boolean}) disableAutoAtThrustSetpoint: boolean = false;
  @property({type: Number}) autoAtThrustSetpointDeadband: number = 1;
  @property({type: Number}) thrustSetpointAtZeroDeadband: number = 0.1;
  @property({type: Array, attribute: false}) angleAdvices: AngleAdvice[] = [];
  @property({type: Array, attribute: false}) thrustAdvices: LinearAdvice[] = [];
  @property({type: Boolean}) singleDirection: boolean = false;
  @property({type: String}) topPropeller: PropellerType = PropellerType.none;
  @property({type: String}) bottomPropeller: PropellerType = PropellerType.none;

  override render() {
    const fieldSize =
      this.size === AzimuthThrusterLabeledSize.large
        ? InstrumentFieldSize.enhanced
        : InstrumentFieldSize.regular;
    let state: InstrumentState = InstrumentState.inCommand;
    if (
      [
        CommandStatus.NoCommand,
        CommandStatus.Blocked,
        CommandStatus.CommandAvailable,
      ].includes(this.commandStatus)
    ) {
      state = InstrumentState.active;
    }

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
        <obc-instrument-field
          class="instrument-field-angle"
          value=${this.angle}
          setpoint=${ifDefined(this.angleSetpoint)}
          tag="Angle"
          unit="DEG"
          hasSetpoint
          size=${fieldSize}
        ></obc-instrument-field>
        <obc-instrument-field
          class="instrument-field-power"
          value=${this.thrust}
          setpoint=${ifDefined(this.thrustSetpoint)}
          tag="Power"
          unit="%"
          hasSetpoint
          size=${fieldSize}
        ></obc-instrument-field>
        <obc-azimuth-thruster
          class="azimuth-thruster"
          nopadding
          .thrust=${this.thrust}
          .thrustSetpoint=${this.thrustSetpoint}
          .disableAutoAtThrustSetpoint=${this.disableAutoAtThrustSetpoint}
          .autoAtThrustSetpointDeadband=${this.autoAtThrustSetpointDeadband}
          .angle=${this.angle}
          .angleSetpoint=${this.angleSetpoint}
          .disableAutoAtAngleSetpoint=${this.disableAutoAtAngleSetpoint}
          .autoAtAngleSetpointDeadband=${this.autoAtAngleSetpointDeadband}
          .atThrustSetpoint=${this.atThrustSetpoint}
          .atAngleSetpoint=${this.atAngleSetpoint}
          .atAngleSetpointZero=${this.atAngleSetpointZero}
          .angleSetpointFocused=${this.angleSetpointFocused}
          .angleSetpointColorMode=${this.angleSetpointColorMode}
          .thrustSetpointAtZeroDeadband=${this.thrustSetpointAtZeroDeadband}
          .state=${state}
          .touching=${this.touching}
          .angleAdvices=${this.angleAdvices}
          .thrustAdvices=${this.thrustAdvices}
          .singleDirection=${this.singleDirection}
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
