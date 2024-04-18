import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcAutomationButton } from './automation-button';
import './automation-button';
import { html } from 'lit';
import '../../icons/icon-09-twoway-digital-open'
import '../../icons/icon-09-twoway-digital-closed'

const meta: Meta<typeof ObcAutomationButton> = {
  title: 'Automation/Button',
  tags: ['autodocs'],
  component: "obc-automation-button",
  argTypes: {
    size: {
      options: ['small', 'regular', 'large', 'xl'],
      control: { type: 'radio' },
    },
    labelPosition: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'radio' },
    },
    labelSize: {
      options: ['small', 'regular', 'enhanced'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<ObcAutomationButton>;

export default meta;
type Story = StoryObj<ObcAutomationButton>;

export const ValveOpen: Story = {
  render(args) {
    const labels = [{
      type: 'tag',
      text: '0000',
      showHash: false,
    }]
    return html`
      <obc-automation-button state="open" size=${args.size} .labels=${labels} .labelPosition=${args.labelPosition} .labelSize=${args.labelSize}>
        <obi-09-twoway-digital-open 
          use-css-color 
          slot="icon" 
          style="display: block; transform: rotate(90deg); line-height: 0;"
        ></obi-09-twoway-digital-open>
      </obc-automation-button>`;
  },
}

export const ValveClosed: Story = {
  render(args) {
    const labels = [{
      type: 'tag',
      text: '0000',
      showHash: false,
    }]
    return html`
      <obc-automation-button state="closed" size=${args.size} .labels=${labels} .labelPosition=${args.labelPosition} .labelSize=${args.labelSize}>
        <obi-09-twoway-digital-closed 
          use-css-color 
          slot="icon" 
          style="display: block; transform: rotate(90deg); line-height: 0;"
        ></obi-09-twoway-digital-closed>
      </obc-automation-button>`;
  },
}