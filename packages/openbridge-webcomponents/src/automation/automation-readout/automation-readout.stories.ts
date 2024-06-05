import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcAutomationReadout} from './automation-readout';
import './automation-readout';
import {AutomationReadoutPosition} from './automation-readout';
import '../horizontal-line/horizontal-line';
import '../vertical-line/vertical-line';
import {LineMedium, LineType} from '../index';
import {html} from 'lit';
import {crossDecorator} from '../../storybook-util';

const meta: Meta<typeof ObcAutomationReadout> = {
  title: 'Automation/Readout',
  tags: ['autodocs'],
  component: 'obc-automation-readout',
  decorators: [crossDecorator],
  args: {
    value: 25,
    unit: '°C',
    numberOfDigits: 3,
    lineType: LineType.fluid,
  },
  argTypes: {
    value: {
      control: {
        type: 'range',
        min: -99,
        max: 999,
      },
    },
    lineType: {
      options: [
        LineType.air,
        LineType.connector,
        LineType.electric,
        LineType.fluid,
      ],
      control: {type: 'radio'},
    },
  },
} satisfies Meta<ObcAutomationReadout>;

export default meta;
type Story = StoryObj<ObcAutomationReadout>;

export const UsageWithPipeBottom: Story = {
  render: (args) => html`
    <style>
      .canvas {
        position: relative;
        width: 400px;
        height: 400px;
      }

      #line-bottom {
        position: absolute;
        top: 0;
        left: calc(-2.5 * 24px);
      }
    </style>
    <div class="canvas">
      <obc-automation-readout
        .value=${args.value}
        .unit=${args.unit}
        .numberOfDigits=${args.numberOfDigits}
        .position=${AutomationReadoutPosition.Bottom}
        .lineType=${args.lineType}
        id="readout-bottom"
      ></obc-automation-readout>
      <obc-horizontal-line
        .medium=${LineMedium.water}
        .lineType=${args.lineType || LineType.fluid}
        length="5"
        id="line-bottom"
      ></obc-horizontal-line>
    </div>
  `,
};

export const UsageWithPipeTop: Story = {
  render: (args) => html`
    <style>
      .canvas {
        position: relative;
        width: 400px;
        height: 400px;
      }

      #line-top {
        position: absolute;
        top: 0;
        left: calc(-2.5 * 24px);
      }
    </style>
    <div class="canvas">
      <obc-automation-readout
        .value=${args.value}
        .unit=${args.unit}
        .numberOfDigits=${args.numberOfDigits}
        .position=${AutomationReadoutPosition.Top}
        .lineType=${args.lineType}
        id="readout-top"
      ></obc-automation-readout>
      <obc-horizontal-line
        .medium=${LineMedium.water}
        .lineType=${args.lineType || LineType.fluid}
        length="5"
        id="line-top"
      ></obc-horizontal-line>
    </div>
  `,
};

export const UsageWithPipeLeft: Story = {
  render: (args) => html`
    <style>
      .canvas {
        position: relative;
        width: 400px;
        height: 400px;
      }

      #line-left {
        position: absolute;
        left: 0;
        top: calc(-24px * 2.5);
      }
    </style>
    <div class="canvas">
      <obc-automation-readout
        .value=${args.value}
        .unit=${args.unit}
        .numberOfDigits=${args.numberOfDigits}
        .position=${AutomationReadoutPosition.Left}
        .lineType=${args.lineType}
        id="readout-left"
      ></obc-automation-readout>
      <obc-vertical-line
        .medium=${LineMedium.water}
        .lineType=${args.lineType || LineType.fluid}
        length="5"
        id="line-left"
      ></obc-vertical-line>
    </div>
  `,
};

export const UsageWithPipeRight: Story = {
  render: (args) => html`
    <style>
      .canvas {
        position: relative;
        width: 400px;
        height: 400px;
      }

      #line-right {
        position: absolute;
        top: calc(-2.5 * 24px);
      }
    </style>
    <div class="canvas">
      <obc-automation-readout
        .value=${args.value}
        .unit=${args.unit}
        .numberOfDigits=${args.numberOfDigits}
        .position=${AutomationReadoutPosition.Right}
        .lineType=${args.lineType}
        id="readout-right"
      ></obc-automation-readout>
      <obc-vertical-line
        .medium=${LineMedium.water}
        .lineType=${args.lineType || LineType.fluid}
        length="5"
        id="line-right"
      ></obc-vertical-line>
    </div>
  `,
};
