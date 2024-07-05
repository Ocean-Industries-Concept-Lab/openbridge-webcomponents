import type {Meta, StoryObj} from '@storybook/web-components';
import {
  AzimuthThrusterLabeledSize,
  ObcAzimuthThrusterLabeled,
} from './azimuth-thruster-labeled';
import './azimuth-thruster-labeled';
import {CommandStatus} from '../badge-command/badge-command';
import {AdviceType} from '../watch/advice';
import {beta6Decorator, widthDecorator} from '../../storybook-util';
import {PropellerType} from '../thruster/propeller';

const meta: Meta<typeof ObcAzimuthThrusterLabeled> = {
  title: 'Navigation instruments/Azimuth thruster labeled',
  tags: ['autodocs'],
  component: 'obc-azimuth-thruster-labeled',
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
  },
  decorators: [widthDecorator, beta6Decorator],
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
    width: {
      control: {type: 'range', min: 100, max: 2000, step: 1},
    },
  },
} satisfies Meta<ObcAzimuthThrusterLabeled>;

export default meta;
type Story = StoryObj<ObcAzimuthThrusterLabeled>;

export const Medium: Story = {
  args: {
    size: AzimuthThrusterLabeledSize.medium,
    width: 384,
  },
};

export const Large: Story = {
  args: {
    size: AzimuthThrusterLabeledSize.large,
    width: 640,
  },
};

export const NoCommand: Story = {
  args: {
    size: AzimuthThrusterLabeledSize.medium,
    width: 384,
    commandStatus: CommandStatus.NoCommand,
  },
};
