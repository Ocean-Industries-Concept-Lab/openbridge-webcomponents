import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcButton} from './button';
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
      options: ['normal', 'flat', 'raised'],
      control: {type: 'select'},
    },
    size: {
      options: ['regular', 'large'],
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
    variant: 'normal',
  },
};

export const NormalHugText: Story = {
  args: {
    variant: 'normal',
    hugText: true,
  },
};

export const NormalNoIcon: Story = {
  args: {
    variant: 'normal',
    leadingIcon: undefined,
  },
};

export const NormalFullWidth: Story = {
  args: {
    variant: 'normal',
    fullWidth: true,
  },
};

export const NormalFullWidthBothIcon: Story = {
  args: {
    variant: 'normal',
    fullWidth: true,
    trailingIcon: 'placeholder',
  },
};

export const Flat: Story = {
  args: {
    variant: 'flat',
  },
};

export const Raised: Story = {
  args: {
    variant: 'raised',
  },
};

export const NormalLarge: Story = {
  args: {
    variant: 'normal',
    size: 'large',
  },
};

export const Checked: Story = {
  args: {
    variant: 'check',
    checked: true,
  },
};

export const Unchecked: Story = {
  args: {
    variant: 'check',
  },
};

export const NormalDisabled: Story = {
  args: {
    variant: 'normal',
    disabled: true,
  },
};

export const FlatDisabled: Story = {
  args: {
    variant: 'flat',
    disabled: true,
  },
};

export const RaisedDisabled: Story = {
  args: {
    variant: 'raised',
    disabled: true,
  },
};

export const CheckDisabled: Story = {
  args: {
    variant: 'check',
    checked: true,
    disabled: true,
  },
};

export const UncheckedDisabled: Story = {
  args: {
    variant: 'check',
    disabled: true,
  },
};
