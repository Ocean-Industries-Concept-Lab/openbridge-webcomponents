import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcInputChip} from './input-chip.js';
import './input-chip.js';
import '../../icons/icon-placeholder.js';

const meta: Meta<ObcInputChip> = {
  title: 'UI Components/Selection controls and switches/Input Chip',
  tags: ['6.0'],
  component: 'obc-input-chip',
  argTypes: {
    label: {
      control: {type: 'text'},
    },
    disabled: {
      control: {type: 'boolean'},
    },
    showIcon: {
      control: {type: 'boolean'},
      description: 'Whether to show the leading icon',
    },
  },
  args: {
    label: 'Label',
    disabled: false,
    showIcon: true,
  },
} satisfies Meta<ObcInputChip>;

export default meta;
type Story = StoryObj<ObcInputChip>;

export const InputChipWithIcon: Story = {
  args: {
    label: 'Label',
  },
  render: (args) => html`
    <obc-input-chip
      label="${args.label}"
      ?disabled="${args.disabled}"
      .showIcon="${args.showIcon}"
    >
      <obi-placeholder></obi-placeholder>
    </obc-input-chip>
  `,
};

export const InputChipWithoutIcon: Story = {
  args: {
    label: 'Label',
    showIcon: false,
  },
  render: (args) => html`
    <obc-input-chip
      label="${args.label}"
      ?disabled="${args.disabled}"
      .showIcon="${args.showIcon}"
    >
      <obi-placeholder></obi-placeholder>
    </obc-input-chip>
  `,
};

export const DisabledInputChip: Story = {
  args: {
    label: 'Label',
    disabled: true,
  },
  render: (args) => html`
    <obc-input-chip
      label="${args.label}"
      ?disabled="${args.disabled}"
      .showIcon="${args.showIcon}"
    >
      <obi-placeholder></obi-placeholder>
    </obc-input-chip>
  `,
};
