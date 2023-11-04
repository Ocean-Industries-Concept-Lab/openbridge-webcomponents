import type { Meta, StoryObj } from '@storybook/web-components';
import { ToggleButtonGroup } from './ToggleButtonGroup';
import './ToggleButtonGroup';
import './ToggleButtonOption';
import { html } from 'lit';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ToggleButtonGroup> = {
  title: 'Button/Toggle button',
  tags: ['autodocs'],
  render: () => html`
  <div style="width: 300px">
    <ob-toggle-button-group value="2" has-labels>
      <ob-toggle-button-option value="1" icon="placeholder" selected>Option 1</ob-toggle-button-option>
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
  render: () => html`
  <div style="width: 300px">
    <ob-toggle-button-group value="2">
      <ob-toggle-button-option value="1" icon="placeholder" selected></ob-toggle-button-option>
      <ob-toggle-button-option value="2" icon="placeholder"></ob-toggle-button-option>
      <ob-toggle-button-option value="3" icon="placeholder"></ob-toggle-button-option>
    </ob-toggle-button-group>
`,
}
