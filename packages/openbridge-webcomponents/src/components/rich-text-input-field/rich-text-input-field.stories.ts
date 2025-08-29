import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ObcRichTextInputField } from './rich-text-input-field.js';
import './rich-text-input-field.js';
import { html } from 'lit';

const meta: Meta<typeof ObcRichTextInputField> = {
  title: 'UI Components/Input Controls/Rich text input field',
  tags: ['6.0'],
  component: "obc-rich-text-input-field",
  argsTypes: {
    hasToolbar: {
      control:"boolean"
    },
    hasLeadingIcon: {
      control:"boolean"
    }, 
    hasHelperText: {
      control:"boolean"
    }, 
    placeholder: {
      control: "string"
    }, 
    hasError: {
      control: "boolean"
    },
    isDisabled: {
      control: "boolean"
    }
  },
  
  render: (args) => html`
  <obc-rich-text-input-field >
    <obi-camera-on slot="leading-icon"></obi-camera-on>
  </obc-rich-text-input-field>
  `,

} satisfies Meta<ObcRichTextInputField>;

export default meta;
type Story = StoryObj<ObcRichTextInputField>;


export const Primary: Story = {
  args: {
  },
}