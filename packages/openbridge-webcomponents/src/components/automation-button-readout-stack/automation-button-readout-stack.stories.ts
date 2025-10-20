import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcAutomationButtonReadoutStack} from './automation-button-readout-stack.js';
import './automation-button-readout-stack.js';

const meta: Meta<typeof ObcAutomationButtonReadoutStack> = {
  title: 'Building Blocks/Automation button readout stack',
  tags: ['6.0'],
  component: 'obc-automation-button-readout-stack',
  args: {},
} satisfies Meta<ObcAutomationButtonReadoutStack>;

export default meta;
type Story = StoryObj<ObcAutomationButtonReadoutStack>;

export const State: Story = {
  args: {
    readouts: [{type: 'state', text: 'State', bold: false}],
  },
};

export const Tag: Story = {
  args: {
    readouts: [{type: 'tag', text: 'Tag', showHash: false}],
  },
};

export const Direction: Story = {
  args: {
    readouts: [
      {
        type: 'direction',
        value: 10,
        nDigits: 2,
        unit: 'percent',
        direction: 'up',
      },
    ],
  },
};
