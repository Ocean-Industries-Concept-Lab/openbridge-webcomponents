import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcIconCheckButton} from './icon-check-button.js';
import './icon-check-button.js';
import '../../icons/icon-placeholder.js';

const meta: Meta<typeof ObcIconCheckButton> = {
  title: 'UI Components/Selection Controls and Switches/Icon Check Button',
  tags: ['6.0'],
  component: 'obc-icon-check-button',
  args: {
    checked: false,
    disabled: false,
    hasLabel: true,
    label: 'Settings',
    hasAlert: false,
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the button is currently checked',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, prevents interaction and shows disabled styling',
    },
    hasLabel: {
      control: 'boolean',
      description: 'If true, displays the label text below the icon',
    },
    label: {
      control: 'text',
      description: 'Text to display below the icon (when hasLabel is true)',
    },
    hasAlert: {
      control: 'boolean',
      description: 'If true, adds alert styling to the button',
    },
  },
  render: (args) => html`
    <obc-icon-check-button
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?hasLabel=${args.hasLabel}
      label=${args.label}
      ?hasAlert=${args.hasAlert}
    >
      <obi-placeholder slot="icon"></obi-placeholder>
    </obc-icon-check-button>
  `,
} satisfies Meta<ObcIconCheckButton>;

export default meta;
type Story = StoryObj<ObcIconCheckButton>;

export const Primary: Story = {
  args: {
    hasLabel: true,
    label: 'Settings',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    hasLabel: true,
    label: 'checked',
  },
};

export const WithoutLabel: Story = {
  args: {
    hasLabel: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    hasLabel: true,
    label: 'Disabled',
  },
};

export const Disabledchecked: Story = {
  args: {
    disabled: true,
    checked: true,
    hasLabel: true,
    label: 'Disabled',
  },
};

export const WithAlert: Story = {
  args: {
    hasAlert: true,
    hasLabel: true,
    label: 'Alert',
  },
};

export const IconOnly: Story = {
  args: {
    hasLabel: false,
    checked: false,
  },
};

export const LongLabel: Story = {
  args: {
    hasLabel: true,
    label: 'Very Long Label Text',
  },
};
