import type {Meta, StoryObj} from '@storybook/web-components';
import {ButtonVariant, ObcButton} from './button';
import './button';
import {iconIds, iconIdToIconHtml} from '../../storybook-util';
import {html} from 'lit';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcButton> = {
  title: 'Button/Button',
  tags: ['autodocs'],
  component: 'obc-button',
  args: {
    size: 'regular',
    label: 'Button',
    leadingIcon: 'placeholder',
    fullWidth: false,
  },
  argTypes: {
    variant: {
      options: Object.values(ButtonVariant),
      control: {type: 'select'},
    },
    size: {
      options: ['obc-component-size-regular', 'obc-component-size-medium', 'obc-component-size-large', 'obc-component-size-xl'],
      control: {type: 'select'},
    },
    fullWidth: {
      control: {type: 'boolean'},
    },
    label: {
      control: {type: 'text'},
    },
    leadingIcon: {
      options: iconIds,
      control: {type: 'select'},
    },
    trailingIcon: {
      options: iconIds,
      control: {type: 'select'},
    },
  },
  render: (args) =>
    html`<obc-button
      .variant=${args.variant}
      .fullWidth=${args.fullWidth}
      .checked=${args.checked}
      .disabled=${args.disabled}
      class=${args.size}
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
    variant: ButtonVariant.normal,
  },
};

export const NormalNoIcon: Story = {
  args: {
    variant: ButtonVariant.normal,
    leadingIcon: undefined,
  },
};

export const NormalFullWidth: Story = {
  args: {
    variant: ButtonVariant.normal,
    fullWidth: true,
  },
};

export const NormalFullWidthBothIcon: Story = {
  args: {
    variant: ButtonVariant.normal,
    fullWidth: true,
    trailingIcon: 'placeholder',
  },
};

export const Flat: Story = {
  args: {
    variant: ButtonVariant.flat,
  },
};

export const Raised: Story = {
  args: {
    variant: ButtonVariant.raised,
  },
};

export const NormalLarge: Story = {
  args: {
    variant: ButtonVariant.normal,
    size: 'obc-component-size-large',
  },
};

export const Checked: Story = {
  args: {
    variant: ButtonVariant.check,
    checked: true,
  },
};

export const Unchecked: Story = {
  args: {
    variant: ButtonVariant.check,
  },
};

export const NormalDisabled: Story = {
  args: {
    variant: ButtonVariant.normal,
    disabled: true,
  },
};

export const FlatDisabled: Story = {
  args: {
    variant: ButtonVariant.flat,
    disabled: true,
  },
};

export const RaisedDisabled: Story = {
  args: {
    variant: ButtonVariant.raised,
    disabled: true,
  },
};

export const CheckDisabled: Story = {
  args: {
    variant: ButtonVariant.check,
    checked: true,
    disabled: true,
  },
};

export const UncheckedDisabled: Story = {
  args: {
    variant: ButtonVariant.check,
    disabled: true,
  },
};
