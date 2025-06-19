import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcUserButton, StyleType, Variant} from './user-button.js';
import './user-button.js';
import {html} from 'lit';

const meta: Meta<ObcUserButton> = {
  title: 'Button/User Button',
  tags: ['6.0'],
  component: 'obc-user-button',
  argTypes: {
    styleType: {
      control: {type: 'select'},
      options: Object.values(StyleType),
    },
    variant: {
      control: {type: 'select'},
      options: Object.values(Variant),
    },
    disabled: {
      control: {type: 'boolean'},
    },
    static: {
      control: {type: 'boolean'},
    },
    initials: {
      control: {type: 'text'},
    },
  },
  args: {
    variant: Variant.icon,
    styleType: StyleType.flat,
    disabled: false,
    static: false,
    initials: 'AB',
    label: '',
  },
} satisfies Meta<ObcUserButton>;

export default meta;
type Story = StoryObj<ObcUserButton>;

export const Primary: Story = {
  args: {
    variant: Variant.icon,
    styleType: StyleType.flat,
  },
};

export const WithInitials: Story = {
  args: {
    variant: Variant.initials,
    initials: 'JD',
    styleType: StyleType.flat,
  },
};

export const InitialsNormal: Story = {
  args: {
    variant: Variant.initials,
    initials: 'AB',
    styleType: StyleType.normal,
  },
};

export const InitialsSelected: Story = {
  args: {
    variant: Variant.initials,
    initials: 'CD',
    styleType: StyleType.selected,
  },
};

export const IconNormal: Story = {
  args: {
    variant: Variant.icon,
    styleType: StyleType.normal,
  },
};

export const IconSelected: Story = {
  args: {
    variant: Variant.icon,
    styleType: StyleType.selected,
  },
};

export const DisabledWithInitials: Story = {
  args: {
    variant: Variant.initials,
    initials: 'XY',
    disabled: true,
    styleType: StyleType.normal,
  },
};

export const DisabledIcon: Story = {
  args: {
    variant: Variant.icon,
    disabled: true,
    styleType: StyleType.normal,
  },
};

export const StaticWithInitials: Story = {
  args: {
    variant: Variant.initials,
    initials: 'ST',
    static: true,
    styleType: StyleType.normal,
  },
};

export const StaticIcon: Story = {
  args: {
    variant: Variant.icon,
    static: true,
    styleType: StyleType.normal,
  },
};

export const InvalidInitials: Story = {
  name: 'Invalid Initials (Falls back to Icon)',
  args: {
    variant: Variant.initials,
    initials: 'A',
    styleType: StyleType.flat,
  },
};

export const TooManyInitials: Story = {
  name: 'Too Many Initials (Falls back to Icon)',
  args: {
    variant: Variant.initials,
    initials: 'ABC',
    styleType: StyleType.flat,
  },
};
