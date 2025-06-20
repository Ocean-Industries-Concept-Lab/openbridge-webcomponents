import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ButtonVariant, ObcButton } from './button.js';
import './button.js';
import { iconIds, iconIdToIconHtml } from '../../storybook-util.js';
import { html } from 'lit';

const meta: Meta<typeof ObcButton> = {
  title: 'Button/Button',
  tags: ['autodocs', '6.0'],
  component: 'obc-button',
  args: {
    label: 'Button',
    leadingIcon: 'placeholder',
    trailingIcon: 'placeholder',
    variant: ButtonVariant.normal,
    fullWidth: false,
    showLeadingIcon: false,
    showTrailingIcon: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      options: Object.values(ButtonVariant),
      control: { type: 'select' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    showLeadingIcon: {
      control: { type: 'boolean' },
      description: 'Whether to show the leading icon',
    },
    showTrailingIcon: {
      control: { type: 'boolean' },
      description: 'Whether to show the trailing icon',
    },
    leadingIcon: {
      options: iconIds,
      control: { type: 'select' },
      description: 'Which leading icon to show',
    },
    trailingIcon: {
      options: iconIds,
      control: { type: 'select' },
      description: 'Which trailing icon to show',
    },
    disabled: {
      control: { type: 'boolean' },
    },
    label: {
      control: { type: 'text' },
    },
    // Hide internal computed properties from controls
    hasIconLeading: {
      table: { disable: true },
    },
    hasIconTrailing: {
      table: { disable: true },
    },
  },
  render: (args) =>
    html`<obc-button
      .variant=${args.variant}
      .fullWidth=${args.fullWidth}
      .showLeadingIcon=${args.showLeadingIcon}
      .showTrailingIcon=${args.showTrailingIcon}
      .disabled=${args.disabled}
    >
      ${args.showLeadingIcon
        ? iconIdToIconHtml(args.leadingIcon as unknown as string, {
          size: '24',
          slot: 'leading-icon',
        })
        : ''}
      ${args.showTrailingIcon
        ? iconIdToIconHtml(args.trailingIcon as unknown as string, {
          size: '24',
          slot: 'trailing-icon',
        })
        : ''}
      ${args.label}
    </obc-button>`,
} satisfies Meta<ObcButton>;

export default meta;
type Story = StoryObj<ObcButton>;

// Basic variants
export const Normal: Story = {
  args: {
    variant: ButtonVariant.normal,
    showLeadingIcon: true,
  },
};

export const Flat: Story = {
  args: {
    variant: ButtonVariant.flat,
    showLeadingIcon: true,
  },
};

export const Raised: Story = {
  args: {
    variant: ButtonVariant.raised,
    showLeadingIcon: true,
  },
};

// Icon examples
export const WithLeadingIcon: Story = {
  name: 'Leading Icon',
  args: {
    variant: ButtonVariant.normal,
    showLeadingIcon: true,
  },
};

export const WithTrailingIcon: Story = {
  name: 'Trailing Icon',
  args: {
    variant: ButtonVariant.normal,
    showTrailingIcon: true,
  },
};

export const WithBothIcons: Story = {
  name: 'Both Icons',
  args: {
    variant: ButtonVariant.normal,
    showLeadingIcon: true,
    showTrailingIcon: true,
  },
};

// Full width
export const FullWidth: Story = {
  name: 'Full Width',
  args: {
    variant: ButtonVariant.normal,
    fullWidth: true,
    showLeadingIcon: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    variant: ButtonVariant.normal,
    disabled: true,
    showLeadingIcon: true,
  },
};
