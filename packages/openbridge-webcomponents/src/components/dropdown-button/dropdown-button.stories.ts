import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcDropdownButton, DropdownButtonType} from './dropdown-button.js';
import './dropdown-button.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';

const meta: Meta<ObcDropdownButton> = {
  title: 'UI Components/Buttons/Dropdown Button',
  tags: ['autodocs', '6.0'],
  component: 'obc-dropdown-button',
  argTypes: {
    options: {
      control: 'object',
    },
    value: {
      control: 'text',
    },
    fullWidth: {
      control: 'boolean',
    },
    type: {
      control: 'select',
      options: Object.values(DropdownButtonType),
    },
    openTop: {
      control: 'boolean',
    },
  },
  args: {
    options: [
      {
        value: 'volvo',
        label: 'Volvo',
      },
      {
        value: 'xc90',
        label: 'XC 90',
        level: 2,
      },
      {
        value: 'mercedes',
        label: 'Mercedes',
      },
      {
        value: 'audi',
        label: 'Audi',
      },
    ],
    value: 'volvo',
    type: DropdownButtonType.label,
  },
} satisfies Meta<ObcDropdownButton>;

export default meta;
type Story = StoryObj<ObcDropdownButton>;

export const Label: Story = {};

export const LabelIcon: Story = {
  args: {
    type: DropdownButtonType.labelIcon,
  },
  render: (args) => html`
    <obc-dropdown-button
      .options=${args.options}
      .value=${args.value}
      .type=${args.type}
    >
      <obi-placeholder slot="icon"></obi-placeholder>
    </obc-dropdown-button>
  `,
};

export const Icon: Story = {
  args: {
    type: DropdownButtonType.icon,
  },
  render: (args) => html`
    <obc-dropdown-button
      .options=${args.options}
      .value=${args.value}
      .type=${args.type}
    >
      <obi-placeholder slot="icon"></obi-placeholder>
    </obc-dropdown-button>
  `,
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
  render: (args) => html`
    <div style="width: 200px;">
      <obc-dropdown-button
        .options=${args.options}
        .value=${args.value}
        .fullWidth=${args.fullWidth}
      ></obc-dropdown-button>
    </div>
  `,
};

export const FullWidthWithIcon: Story = {
  args: {
    fullWidth: true,
    type: DropdownButtonType.labelIcon,
  },
  render: (args) => html`
    <div style="width: 200px;">
      <obc-dropdown-button
        .options=${args.options}
        .value=${args.value}
        .fullWidth=${args.fullWidth}
        .type=${args.type}
      >
        <obi-placeholder slot="icon"></obi-placeholder>
      </obc-dropdown-button>
    </div>
  `,
};

export const OpenTop: Story = {
  args: {
    openTop: true,
  },
};

export const OpenTopWithIcon: Story = {
  args: {
    openTop: true,
    type: DropdownButtonType.labelIcon,
  },
  render: (args) => html`
    <obc-dropdown-button
      .options=${args.options}
      .value=${args.value}
      .openTop=${args.openTop}
      .type=${args.type}
    >
      <obi-placeholder slot="icon"></obi-placeholder>
    </obc-dropdown-button>
  `,
};

export const PreSelected: Story = {
  args: {
    value: 'xc90',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledWithIcon: Story = {
  args: {
    disabled: true,
    type: DropdownButtonType.labelIcon,
  },
  render: (args) => html`
    <obc-dropdown-button
      .options=${args.options}
      .value=${args.value}
      .disabled=${args.disabled}
      .type=${args.type}
    >
      <obi-placeholder slot="icon"></obi-placeholder>
    </obc-dropdown-button>
  `,
};
