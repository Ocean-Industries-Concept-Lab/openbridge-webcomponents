import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcButton, ButtonSize, ButtonVariant } from './button';
import './button';
import { iconIds, iconIdToIconHtml } from '../../storybook-util';
import { html } from 'lit';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcButton> = {
  title: 'Button/Button',
  tags: ['autodocs'],
  component: 'obc-button',
  args: {
    size: 'regular',
    label: 'Button',
    leadingIcon: '01-placeholder',
    fullWidth: false,
  },
  argTypes: {
    variant: {
      options: Object.keys(ButtonVariant),
      control: { type: 'select' },
    },
    size: {
      options: Object.keys(ButtonSize),
      control: { type: 'select' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    label: {
      control: { type: 'text' },
    },
    leadingIcon: {
      options: iconIds,
      control: { type: 'select' },
    },
    trailingIcon: {
      options: iconIds,
      control: { type: 'select' },
    },
  },
  render: (args) =>
    html`<obc-button
      .variant=${args.variant}
      .size=${args.size}
      .fullWidth=${args.fullWidth}
      .hugText=${args.hugText}
      .checked=${args.checked}
      .disabled=${args.disabled}
    >
      ${args.leadingIcon
        ? iconIdToIconHtml(args.leadingIcon as unknown as string, {
          size: '24',
          slot: 'leading-icon',
        })
        : ''}
      ${args.label}
      ${args.trailingIcon
        ? iconIdToIconHtml(args.trailingIcon as unknown as string, {
          size: '24',
          slot: 'trailing-icon',
        })
        : ''}
    </obc-button>`,
} satisfies Meta<ObcButton>;

export default meta;
type Story = StoryObj<ObcButton>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Normal: Story = {
  args: {
    variant: ButtonVariant.Normal,
  },
};

export const NormalHugText: Story = {
  args: {
    variant: ButtonVariant.Normal,
    hugText: true,
  },
};

export const NormalNoIcon: Story = {
  args: {
    variant: ButtonVariant.Normal,
    leadingIcon: undefined,
  },
};

export const NormalFullWidth: Story = {
  args: {
    variant: ButtonVariant.Normal,
    fullWidth: true,
  },
};

export const NormalFullWidthBothIcon: Story = {
  args: {
    variant: ButtonVariant.Normal,
    fullWidth: true,
    trailingIcon: '01-placeholder',
  },
};

export const Flat: Story = {
  args: {
    variant: ButtonVariant.Flat,
  },
};

export const Raised: Story = {
  args: {
    variant: ButtonVariant.Raised,
  },
};

export const NormalLarge: Story = {
  args: {
    variant: ButtonVariant.Normal,
    size: ButtonSize.Large,
  },
};

export const Checked: Story = {
  args: {
    variant: ButtonVariant.Check,
    checked: true,
  },
};

export const Unchecked: Story = {
  args: {
    variant: ButtonVariant.Check,
  },
};

export const NormalDisabled: Story = {
  args: {
    variant: ButtonVariant.Normal,
    disabled: true,
  },
};

export const FlatDisabled: Story = {
  args: {
    variant: ButtonVariant.Flat,
    disabled: true,
  },
};

export const RaisedDisabled: Story = {
  args: {
    variant: ButtonVariant.Raised,
    disabled: true,
  },
};

export const CheckDisabled: Story = {
  args: {
    variant: ButtonVariant.Check,
    checked: true,
    disabled: true,
  },
};

export const UncheckedDisabled: Story = {
  args: {
    variant: ButtonVariant.Check,
    disabled: true,
  },
};
