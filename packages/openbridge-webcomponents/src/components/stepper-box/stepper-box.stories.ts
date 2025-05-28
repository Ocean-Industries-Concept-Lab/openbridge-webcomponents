import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcStepperBox} from './stepper-box';
import './stepper-box';
import {html} from 'lit';
const meta: Meta<typeof ObcStepperBox> = {
  title: 'Input/Stepper box',
  tags: ['6.0'],
  component: 'obc-stepper-box',
  args: {},
} satisfies Meta<ObcStepperBox>;

export default meta;
type Story = StoryObj<ObcStepperBox>;

export const Primary: Story = {
  render: () => {
    return html`
      <obc-stepper-box>
        <div>100</div>
        <div slot="unit">km</div>
      </obc-stepper-box>
    `;
  },
};
