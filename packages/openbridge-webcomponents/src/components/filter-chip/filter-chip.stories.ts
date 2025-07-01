import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcFilterChip} from './filter-chip.js';
import './filter-chip.js';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-check-google.js';

const meta: Meta<ObcFilterChip> = {
  title: 'UI Components/Input/Filter Chip',
  tags: ['6.0'],
  component: 'obc-filter-chip',
  argTypes: {
    checked: {
      control: {type: 'boolean'},
    },
    disabled: {
      control: {type: 'boolean'},
    },
    label: {
      control: {type: 'text'},
    },
    showIcon: {
      control: {type: 'boolean'},
      description: 'Whether to show an icon when unchecked',
    },
  },
  args: {
    label: 'Label',
    checked: false,
    disabled: false,
    showIcon: true,
  },
} satisfies Meta<ObcFilterChip>;

export default meta;
type Story = StoryObj<ObcFilterChip>;

export const Checked: Story = {
  args: {
    label: 'Filter Chip',
    checked: true,
  },
  render: (args) => html`
    <obc-filter-chip
      label="${args.label}"
      .checked="${args.checked}"
      ?disabled="${args.disabled}"
      ?showIcon="${args.showIcon}"
    >
      <obi-placeholder></obi-placeholder>
    </obc-filter-chip>
  `,
};

export const Unchecked: Story = {
  args: {
    label: 'Filter Chip',
    checked: false,
  },
  render: (args) => html`
    <obc-filter-chip
      label="${args.label}"
      .checked="${args.checked}"
      ?disabled="${args.disabled}"
      ?showIcon="${args.showIcon}"
    >
      <obi-placeholder></obi-placeholder>
    </obc-filter-chip>
  `,
};
