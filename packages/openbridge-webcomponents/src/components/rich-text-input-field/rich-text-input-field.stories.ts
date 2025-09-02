import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcRichTextInputField} from './rich-text-input-field.js';
import './rich-text-input-field.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';

const meta: Meta<typeof ObcRichTextInputField> = {
  title: 'UI Components/Input Controls/Rich text input field',
  tags: ['6.0'],
  component: 'obc-rich-text-input-field',
  argsTypes: {
    hasToolbar: {
      control: 'boolean',
    },
    hasLeadingIcon: {
      control: 'boolean',
    },
    hasHelperText: {
      control: 'boolean',
    },
    placeholder: {
      control: 'string',
    },
    hasError: {
      control: 'boolean',
    },
    isDisabled: {
      control: 'boolean',
    },
    value : {
      control: 'string',
    },
  },
  args: {
    hasToolbar: true,
    hasLeadingIcon: false,
    hasHelperText: false,
    placeholder: 'Type your text here...',
    hasError: false,
    isDisabled: false,
    value: '',
  },

  render: (args) => html`
    <obc-rich-text-input-field 
      .hasLeadingIcon=${args.hasLeadingIcon}
      .hasHelperText=${args.hasHelperText}
      .hasToolbar=${args.hasToolbar}
      .isDisabled=${args.isDisabled}
      .hasError=${args.hasError}
      .placeholder=${args.placeholder}
      .value=${args.value}
      >
      <obi-placeholder slot="leading-icon"></obi-placeholder>
    </obc-rich-text-input-field>
  `,
} satisfies Meta<ObcRichTextInputField>;

export default meta;
type Story = StoryObj<ObcRichTextInputField>;

export const Primary: Story = {
  args: {},
};

export const WithLeadingIcon: Story = {
  args: {
    hasLeadingIcon: true,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const WithError: Story = {
  args: {
    hasError: true,
  },
};