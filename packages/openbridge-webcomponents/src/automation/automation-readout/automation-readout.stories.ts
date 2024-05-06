import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcAutomationReadout } from './automation-readout';
import './automation-readout';
import '../horizontal-line/horizontal-line';
import {LineMedium, LineType} from '../index';
import { html } from 'lit';

const meta: Meta<typeof ObcAutomationReadout> = {
  title: 'Automation/Readout',
  tags: ['autodocs'],
  component: "obc-automation-readout",
  args: {
  },
} satisfies Meta<ObcAutomationReadout>;

export default meta;
type Story = StoryObj<ObcAutomationReadout>;


export const UsageWithPipe: Story = {
  args: {
    value: 25,
    unit: '°C',
    numberOfDigits: 3,
  },
  argTypes: {
    value: {
      control: {
        type: 'range',
        min: -99,
        max: 999,
      },
    },
  },
  render: (args) => 
    html`
    <style>
    .canvas {
      position: relative;
      width: 400px;
      height: 400px;
    }

    #line1 {
      position: absolute;
      top: 0;
      left: 0;
    }

    #readout {
      position: absolute;
      top: 12px; /* 12px is the height of the grid size */
      left: calc(2.5 * 24px); /* 5 is the length of the line */
    }
    </style>
    <div class="canvas">
    <obc-automation-readout
      .value=${args.value}
      .unit=${args.unit}
      .numberOfDigits=${args.numberOfDigits}
      id="readout"
    ></obc-automation-readout>
    <obc-horizontal-line
          .medium=${LineMedium.water}
          .line-type=${LineType.fluid}
          length="5"
          id="line1"
        ></obc-horizontal-line>
    `
}