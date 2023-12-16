import type {Meta, StoryObj} from '@storybook/web-components';
import {ToggleButtonGroup} from './toggle-button-group';
import './toggle-button-group';
import '../toggle-button-option/toggle-button-option';
import {html} from 'lit';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ToggleButtonGroup> = {
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
      control: {type: 'select'},
    },
  },
  render: (args) =>
    html` <div style="width: 300px">
      <obc-toggle-button-group value="${args.value}" has-labels>
        <obc-toggle-button-option value="1" icon="01-placeholder"
          >Option 1</obc-toggle-button-option
        >
        <obc-toggle-button-option value="2" icon="01-placeholder"
          >Option 2</obc-toggle-button-option
        >
        <obc-toggle-button-option value="3" icon="01-placeholder"
          >Option 3</obc-toggle-button-option
        >
      </obc-toggle-button-group>
    </div>`,
} satisfies Meta<ToggleButtonGroup>;

export default meta;
type Story = StoryObj<ToggleButtonGroup>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const WithLabels: Story = {};

export const WithoutLabels: Story = {
  render: (args) => html`
    <div style="width: 300px">
      <obc-toggle-button-group value="${args.value}">
        <obc-toggle-button-option
          value="1"
          icon="01-placeholder"
        ></obc-toggle-button-option>
        <obc-toggle-button-option
          value="2"
          icon="01-placeholder"
        ></obc-toggle-button-option>
        <obc-toggle-button-option
          value="3"
          icon="01-placeholder"
        ></obc-toggle-button-option>
      </obc-toggle-button-group>
    </div>
  `,
};
