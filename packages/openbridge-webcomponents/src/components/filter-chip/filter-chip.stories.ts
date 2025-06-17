import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ObcFilterChip, ChipState } from './filter-chip.js';
import './filter-chip.js';

const meta: Meta<ObcFilterChip> = {
  title: 'Input/Filter Chip',
  tags: ['6.0'],
  component: "obc-filter-chip",
  argTypes: {
    state: {
      control: { type: 'select' },
      options: [ChipState.Unchecked, ChipState.Checked],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    label: {
      control: { type: 'text' },
    },
    showIcon: {
      control: { type: 'boolean' },
      description: 'Whether to show an icon when unchecked',
    },
  },
  args: {
    label: 'Label',
    state: ChipState.Unchecked,
    disabled: false,
    showIcon: true,
  },
} satisfies Meta<ObcFilterChip>;

export default meta;
type Story = StoryObj<ObcFilterChip>;

export const Primary: Story = {
  args: {
    label: 'Label',
    state: ChipState.Unchecked,
  },
  render: (args) => html`
    <obc-filter-chip
      label="${args.label}"
      .state="${args.state}"
      ?disabled="${args.disabled}"
      ?showIcon="${args.showIcon}">
      <obi-placeholder></obi-placeholder>
    </obc-filter-chip>
  `,
};

export const Checked: Story = {
  args: {
    label: 'Filter Chip',
    state: ChipState.Checked,
  },
  render: (args) => html`
    <obc-filter-chip
      label="${args.label}"
      .state="${args.state}"
      ?disabled="${args.disabled}"
      ?showIcon="${args.showIcon}">
      <obi-placeholder></obi-placeholder>
    </obc-filter-chip>
  `,
};

export const Unchecked: Story = {
  args: {
    label: 'Filter Chip',
    state: ChipState.Unchecked,
  },
  render: (args) => html`
    <obc-filter-chip
      label="${args.label}"
      state="${args.state}"
      ?disabled="${args.disabled}"
      ?showIcon="${args.showIcon}">
      <obi-placeholder></obi-placeholder>
    </obc-filter-chip>
  `,
};