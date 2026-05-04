import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcMotor} from './motor.js';
import './motor.js';
import {crossDecorator} from '../../storybook-util.js';
import {
  AutomationButtonDirection,
  AutomationButtonLabelDirection,
  AutomationButtonReadoutPosition,
  AutomationButtonVariant,
} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStackSize} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import {argTypesAbstractAutomationButtonMotorized} from '../automation-button/abstract-automation-button-storybook-helpers.js';

const meta: Meta<typeof ObcMotor> = {
  title: 'Automation/Automation Devices/Motor',
  tags: ['autodocs', '6.0'],
  component: 'obc-motor',
  decorators: [crossDecorator],
  args: {
    tag: '#0012',
    readoutPosition: AutomationButtonReadoutPosition.bottom,
    readoutSize: AutomationButtonReadoutStackSize.regular,
    alert: false,
    progress: false,
    showReadoutStack: true,
    hasIdTag: true,
  },
  argTypes: {
    ...argTypesAbstractAutomationButtonMotorized,
    vertical: {
      control: {type: 'boolean'},
    },
  },
  globals: {
    componentSize: 'obc-component-size-regular',
  },
} as Meta<typeof ObcMotor>;

export default meta;
type Story = StoryObj<ObcMotor>;

export const OnVertical: Story = {
  args: {
    on: true,
    vertical: true,
    direction: AutomationButtonDirection.forward,
    labelDirection: AutomationButtonLabelDirection.up,
  },
};

export const OnHorizontal: Story = {
  args: {
    on: true,
    vertical: false,
    direction: AutomationButtonDirection.backwardFast,
    labelDirection: AutomationButtonLabelDirection.left,
  },
};

export const OffVertical: Story = {
  args: {
    on: false,
    vertical: true,
    direction: AutomationButtonDirection.standby,
    labelDirection: AutomationButtonLabelDirection.up,
  },
};

export const OffHorizontal: Story = {
  args: {
    on: false,
    vertical: false,
    direction: AutomationButtonDirection.backwardStopped,
    labelDirection: AutomationButtonLabelDirection.right,
  },
};

export const VariantDoubleSizeLarge: Story = {
  args: {
    on: true,
    vertical: true,
    direction: AutomationButtonDirection.forward,
    labelDirection: AutomationButtonLabelDirection.up,
    variant: AutomationButtonVariant.double,
  },
  globals: {
    componentSize: 'obc-component-size-large',
  },
};
