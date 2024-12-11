import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcToggleButtonGroup } from './toggle-button-group';
import './toggle-button-group';
import '../toggle-button-option/toggle-button-option';
import { html } from 'lit';
import '../../icons/icon-placeholder';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcToggleButtonGroup> = {
  title: 'Button/Toggle button',
  tags: ['autodocs'],
  args: {
    value: '1',
  },
  parameters: {
    actions: {
      handles: ['value'],
    },
  },
  argTypes: {
    value: {
      options: ['1', '2', '3'],
      control: { type: 'select' },
    },
  },
  render: (args) =>
    html` <div style="width: 300px">
      <obc-toggle-button-group value="${args.value}" hasLabels>
        <obc-toggle-button-option value="1"
          >Option 1
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-option>
        <obc-toggle-button-option value="2"
          >Option 2
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-option>
        <obc-toggle-button-option value="3"
          >Option 3
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-option>
      </obc-toggle-button-group>
    </div>`,
} satisfies Meta<ObcToggleButtonGroup>;

export default meta;
type Story = StoryObj<ObcToggleButtonGroup>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const WithLabels: Story = {};

export const WithoutLabels: Story = {
  render: (args) => html`
    <div style="width: 300px">
      <obc-toggle-button-group value="${args.value}">
        <obc-toggle-button-option value="1">
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-option>
        <obc-toggle-button-option value="2">
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-option>
        <obc-toggle-button-option value="3">
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-option>
      </obc-toggle-button-group>
    </div>
  `,
};
