import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  AzimuthThrusterLabeledSize,
  ObcAzimuthThrusterLabeled,
} from './azimuth-thruster-labeled.js';
import './azimuth-thruster-labeled.js';
import {html} from 'lit';
import {CommandStatus} from '../badge-command/badge-command.js';
import {AdviceType} from '../watch/advice.js';
import {widthDecorator} from '../../storybook-util.js';
import {PropellerType} from '../thruster/propeller.js';
import {TickmarkStyle} from '../watch/tickmark.js';
import {ReadoutVariant} from '../readout/readout.js';

function renderAzimuthThrusterLabeled(
  args: Partial<ObcAzimuthThrusterLabeled>
) {
  return html`
    <obc-azimuth-thruster-labeled
      .size=${args.size ?? AzimuthThrusterLabeledSize.medium}
      .readoutVariant=${args.readoutVariant ?? ReadoutVariant.regular}
      .label=${args.label ?? ''}
      .commandStatus=${args.commandStatus ?? CommandStatus.InCommand}
      .angle=${args.angle ?? 0}
      .angleSetpoint=${args.angleSetpoint}
      .newAngleSetpoint=${args.newAngleSetpoint}
      .atAngleSetpoint=${args.atAngleSetpoint ?? false}
      .angleSetpointAtZeroDeadband=${args.angleSetpointAtZeroDeadband ?? 0.5}
      .angleSetpointOverride=${args.angleSetpointOverride ?? false}
      .autoAtAngleSetpoint=${args.autoAtAngleSetpoint ?? true}
      .autoAtAngleSetpointDeadband=${args.autoAtAngleSetpointDeadband ?? 2}
      .touching=${args.touching ?? false}
      .thrust=${args.thrust ?? 0}
      .thrustSetpoint=${args.thrustSetpoint}
      .atThrustSetpoint=${args.atThrustSetpoint ?? false}
      .autoAtThrustSetpoint=${args.autoAtThrustSetpoint ?? true}
      .autoAtThrustSetpointDeadband=${args.autoAtThrustSetpointDeadband ?? 1}
      .thrustSetpointAtZeroDeadband=${args.thrustSetpointAtZeroDeadband ?? 0.1}
      .thrustSetpointOverride=${args.thrustSetpointOverride ?? false}
      .angleAdvices=${args.angleAdvices ?? []}
      .thrustAdvices=${args.thrustAdvices ?? []}
      .tickmarkStyle=${args.tickmarkStyle ?? TickmarkStyle.regular}
      .singleDirection=${args.singleDirection ?? false}
      .topPropeller=${args.topPropeller ?? PropellerType.none}
      .bottomPropeller=${args.bottomPropeller ?? PropellerType.none}
    ></obc-azimuth-thruster-labeled>
  `;
}

const meta: Meta<typeof ObcAzimuthThrusterLabeled> = {
  title: 'Instruments/Azimuth Thruster Labeled',
  tags: ['autodocs', '6.0'],
  component: 'obc-azimuth-thruster-labeled',
  render: (args) => renderAzimuthThrusterLabeled(args),
  args: {
    angle: 30,
    angleSetpoint: 40,
    thrust: 60,
    thrustSetpoint: 70,
    label: '3. Thruster',
    angleAdvices: [
      {minAngle: 20, maxAngle: 50, type: AdviceType.advice, hinted: true},
      {minAngle: 60, maxAngle: 100, type: AdviceType.caution, hinted: true},
    ],
    thrustAdvices: [
      {min: 20, max: 50, type: AdviceType.advice, hinted: true},
      {min: 75, max: 100, type: AdviceType.caution, hinted: true},
      {min: -100, max: -75, type: AdviceType.caution, hinted: true},
    ],
    readoutVariant: ReadoutVariant.regular,
  },
  decorators: [widthDecorator],
  argTypes: {
    commandStatus: {
      options: Object.values(CommandStatus),
    },
    topPropeller: {
      options: Object.values(PropellerType),
    },
    bottomPropeller: {
      options: Object.values(PropellerType),
    },
    size: {
      options: Object.values(AzimuthThrusterLabeledSize),
    },
    readoutVariant: {
      control: 'select',
      options: Object.values(ReadoutVariant),
    },
    width: {
      control: {type: 'range', min: 100, max: 2000, step: 1},
    },
    tickmarkStyle: {
      control: 'select',
      options: Object.values(TickmarkStyle),
    },
  },
} satisfies Meta<ObcAzimuthThrusterLabeled>;

export default meta;
type Story = StoryObj<ObcAzimuthThrusterLabeled>;

export const Medium: Story = {
  args: {
    size: AzimuthThrusterLabeledSize.medium,
    readoutVariant: ReadoutVariant.regular,
    width: 384,
  },
};

export const Large: Story = {
  args: {
    size: AzimuthThrusterLabeledSize.large,
    readoutVariant: ReadoutVariant.enhanced,
    width: 640,
  },
};

export const NotInCommand: Story = {
  args: {
    size: AzimuthThrusterLabeledSize.medium,
    readoutVariant: ReadoutVariant.regular,
    width: 384,
    commandStatus: CommandStatus.NoCommand,
  },
};
