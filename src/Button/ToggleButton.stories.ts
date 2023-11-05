import type { Meta, StoryObj } from '@storybook/web-components';
import { ToggleButtonGroup } from './ToggleButtonGroup';
import './ToggleButtonGroup';
import './ToggleButtonOption';
import { html } from 'lit';

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
      control: { type: 'select' },
    },
  },
  render: (args) => html`
  <div style="width: 300px">
    <ob-toggle-button-group value="${args.value}" has-labels>
      <ob-toggle-button-option value="1" icon="placeholder">Option 1</ob-toggle-button-option>
      <ob-toggle-button-option value="2" icon="placeholder">Option 2</ob-toggle-button-option>
      <ob-toggle-button-option value="3" icon="placeholder">Option 3</ob-toggle-button-option>
    </ob-toggle-button-group>
</div>`

} satisfies Meta<ToggleButtonGroup>;

export default meta;
type Story = StoryObj<ToggleButtonGroup>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const WithLabels: Story = {
  
};

export const WithoutLabels: Story = {
  render: (args) => html`
  <div style="width: 300px">
    <ob-toggle-button-group value="${args.value}">
      <ob-toggle-button-option value="1" icon="placeholder"></ob-toggle-button-option>
      <ob-toggle-button-option value="2" icon="placeholder"></ob-toggle-button-option>
      <ob-toggle-button-option value="3" icon="placeholder"></ob-toggle-button-option>
    </ob-toggle-button-group>
`,
}
