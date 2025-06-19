import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ObcUserButton, StyleType } from './user-button.js';
import './user-button.js';


const meta: Meta<ObcUserButton> = {
  title: 'Button/User Button',
  tags: ['6.0'],
  component: "obc-user-button",
  argTypes: {
    styleType: {
      control: { type: 'select' },
      options: Object.values(StyleType),
    },
    useIcon: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    static: {
      control: { type: 'boolean' },
    },
    initials: {
      control: { type: 'text' },
    },
  },
  args: {
    useIcon: true,
    styleType: StyleType.flat,
    disabled: false,
    static: false,
    initials: 'AB',
  },
} satisfies Meta<ObcUserButton>;

export default meta;
type Story = StoryObj<ObcUserButton>;

export const Primary: Story = {
  args: {
    useIcon: true,
    styleType: StyleType.flat,
  },
  render: (args) => html`
    <obc-user-button
      .useIcon="${args.useIcon}"
      .styleType="${args.styleType}"
      .disabled="${args.disabled}"
      .static="${args.static}"
      initials="${args.initials}">
    </obc-user-button>
  `,
};

export const WithInitials: Story = {
  args: {
    useIcon: false,
    initials: 'JD',
    styleType: StyleType.flat,
  },
  render: (args) => html`
    <obc-user-button
      .useIcon="${args.useIcon}"
      .styleType="${args.styleType}"
      .disabled="${args.disabled}"
      .static="${args.static}"
      initials="${args.initials}">
    </obc-user-button>
  `,
};

export const InitialsNormal: Story = {
  args: {
    useIcon: false,
    initials: 'AB',
    styleType: StyleType.normal,
  },
  render: (args) => html`
    <obc-user-button
      .useIcon="${args.useIcon}"
      .styleType="${args.styleType}"
      .disabled="${args.disabled}"
      .static="${args.static}"
      initials="${args.initials}">
    </obc-user-button>
  `,
};

export const InitialsSelected: Story = {
  args: {
    useIcon: false,
    initials: 'CD',
    styleType: StyleType.selected,
  },
  render: (args) => html`
    <obc-user-button
      .useIcon="${args.useIcon}"
      .styleType="${args.styleType}"
      .disabled="${args.disabled}"
      .static="${args.static}"
      initials="${args.initials}">
    </obc-user-button>
  `,
};

export const IconNormal: Story = {
  args: {
    useIcon: true,
    styleType: StyleType.normal,
  },
  render: (args) => html`
    <obc-user-button
      .useIcon="${args.useIcon}"
      .styleType="${args.styleType}"
      .disabled="${args.disabled}"
      .static="${args.static}"
      initials="${args.initials}">
    </obc-user-button>
  `,
};

export const IconSelected: Story = {
  args: {
    useIcon: true,
    styleType: StyleType.selected,
  },
  render: (args) => html`
    <obc-user-button
      .useIcon="${args.useIcon}"
      .styleType="${args.styleType}"
      .disabled="${args.disabled}"
      .static="${args.static}"
      initials="${args.initials}">
    </obc-user-button>
  `,
};

export const DisabledWithInitials: Story = {
  args: {
    useIcon: false,
    initials: 'XY',
    disabled: true,
    styleType: StyleType.normal,
  },
  render: (args) => html`
    <obc-user-button
      .useIcon="${args.useIcon}"
      .styleType="${args.styleType}"
      .disabled="${args.disabled}"
      .static="${args.static}"
      initials="${args.initials}">
    </obc-user-button>
  `,
};

export const DisabledIcon: Story = {
  args: {
    useIcon: true,
    disabled: true,
    styleType: StyleType.normal,
  },
  render: (args) => html`
    <obc-user-button
      .useIcon="${args.useIcon}"
      .styleType="${args.styleType}"
      .disabled="${args.disabled}"
      .static="${args.static}"
      initials="${args.initials}">
    </obc-user-button>
  `,
};

export const StaticWithInitials: Story = {
  args: {
    useIcon: false,
    initials: 'ST',
    static: true,
    styleType: StyleType.normal,
  },
  render: (args) => html`
    <obc-user-button
      .useIcon="${args.useIcon}"
      .styleType="${args.styleType}"
      .disabled="${args.disabled}"
      .static="${args.static}"
      initials="${args.initials}">
    </obc-user-button>
  `,
};

export const StaticIcon: Story = {
  args: {
    useIcon: true,
    static: true,
    styleType: StyleType.normal,
  },
  render: (args) => html`
    <obc-user-button
      .useIcon="${args.useIcon}"
      .styleType="${args.styleType}"
      .disabled="${args.disabled}"
      .static="${args.static}"
      initials="${args.initials}">
    </obc-user-button>
  `,
};

export const InvalidInitials: Story = {
  name: 'Invalid Initials (Falls back to Icon)',
  args: {
    useIcon: false,
    initials: 'A',
    styleType: StyleType.flat,
  },
  render: (args) => html`
    <obc-user-button
      .useIcon="${args.useIcon}"
      .styleType="${args.styleType}"
      .disabled="${args.disabled}"
      .static="${args.static}"
      initials="${args.initials}">
    </obc-user-button>
  `,
};

export const TooManyInitials: Story = {
  name: 'Too Many Initials (Falls back to Icon)',
  args: {
    useIcon: false,
    initials: 'ABC',
    styleType: StyleType.flat,
  },
  render: (args) => html`
    <obc-user-button
      .useIcon="${args.useIcon}"
      .styleType="${args.styleType}"
      .disabled="${args.disabled}"
      .static="${args.static}"
      initials="${args.initials}">
    </obc-user-button>
  `,
};