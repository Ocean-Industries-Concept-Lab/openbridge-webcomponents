import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcStepperBox, ObcStepperBoxType} from './stepper-box.js';
import './stepper-box.js';
import {html} from 'lit';
const meta: Meta<typeof ObcStepperBox> = {
  title: 'Input/Stepper box',
  tags: ['6.0'],
  component: 'obc-stepper-box',
  args: {},
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(ObcStepperBoxType),
    },
    hasHelperText: {
      control: 'boolean',
    },
  },
  render: (args) => {
    return html`
      <obc-stepper-box type=${args.type} .hasHelperText=${args.hasHelperText}>
        <div>100</div>
        <div slot="unit">km</div>
        <div slot="helper-text">Helper text</div>
      </obc-stepper-box>
    `;
  },
} satisfies Meta<ObcStepperBox>;

export default meta;
type Story = StoryObj<ObcStepperBox>;

export const PlusMinus: Story = {};

export const UpDown: Story = {
  args: {type: ObcStepperBoxType.upDown},
};

export const LeftRight: Story = {
  args: {type: ObcStepperBoxType.leftRight},
};

export const WithHelperText: Story = {
  args: {type: ObcStepperBoxType.plusMinus, hasHelperText: true},
};
