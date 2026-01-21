import type { Meta, StoryObj } from '@storybook/web-vite';
import { ObcAnalogValve } from './analog-valve.js';
import { AutomationButtonReadoutPosition } from '../automation-button/automation-button.js';
import { AutomationButtonReadoutStackSize } from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import './analog-valve.js';
import { crossDecorator } from '../../storybook-util.js';
import { html } from 'lit';
import '../automation-badge/automation-badge.js';
import { argTypesAbstractAutomationButton } from '../automation-button/abstract-automation-button-storybook-helpers.js';


const meta: Meta<typeof ObcAnalogValve> = {
  title: 'Automation/Automation devices/Analog Valve',
  tags: ['autodocs'],
  component: 'obc-analog-valve',
  decorators: [crossDecorator],
  args: {
    tag: '0012',
    readoutPosition: AutomationButtonReadoutPosition.bottom,
    readoutSize: AutomationButtonReadoutStackSize.regular,
    alert: false,
    progress: false,
    vertical: false,
    hideReadoutStack: false,
    hasIdTag: true,
  },
  argTypes: {
    ...argTypesAbstractAutomationButton,
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
} as Meta<typeof ObcAnalogValve>;

export default meta;
type Story = StoryObj<ObcAnalogValve>;

export const Open: Story = {
  args: {
    open: true,
    value: 20,
  },
};

export const Closed: Story = {
  args: {
    open: false,
    value: 0,
  },
};

export const WithBadges: Story = {
  args: {
    open: true,
    value: 20,
  },
  render(args) {
    return html`<obc-analog-valve 
       
      .alert=${args.alert}
      .alertFrameType=${args.alertFrameType}
      .alertFrameThickness=${args.alertFrameThickness}
      .alertFrameStatus=${args.alertFrameStatus}
      .progress=${args.progress}
      .hideReadoutStack=${args.hideReadoutStack}
      .hasIdTag=${args.hasIdTag}
      .readoutPosition=${args.readoutPosition}
      .readoutSize=${args.readoutSize}
      .vertical=${args.vertical}
      .labelDirection=${args.labelDirection}
      .tag=${args.tag}
      .value=${args.value}
      .open=${args.open}
    >
            <obc-automation-badge slot="badge-top-right" type="alert-off">
      </obc-automation-badge>
      <obc-automation-badge slot="badge-top-left" type="auto">
      </obc-automation-badge>
      <obc-automation-badge slot="badge-bottom-left" type="duty">
      </obc-automation-badge>
      <obc-automation-badge slot="badge-bottom-right" type="command-locked">
      </obc-automation-badge>
    </obc-analog-valve>`;
  },
};
