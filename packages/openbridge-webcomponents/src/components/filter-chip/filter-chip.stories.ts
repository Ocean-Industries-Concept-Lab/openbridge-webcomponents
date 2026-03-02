import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcFilterChip} from './filter-chip.js';
import './filter-chip.js';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-check-google.js';

const meta: Meta<ObcFilterChip> = {
  title: 'UI Components/Selection Controls and Switches/Filter Chip',
  tags: ['6.0'],
  component: 'obc-filter-chip',
  argTypes: {
    checked: {control: 'boolean'},
    disabled: {control: 'boolean'},
    label: {control: 'text'},
    showIcon: {
      control: 'boolean',
      description: 'Whether to show a leading icon',
    },
  },
  args: {
    label: 'Filter Chip',
    disabled: false,
  },
} satisfies Meta<ObcFilterChip>;

export default meta;
type Story = StoryObj<ObcFilterChip>;

const Template = (args) => html`
  <obc-filter-chip
    label=${args.label}
    .checked=${args.checked}
    ?disabled=${args.disabled}
    ?showIcon=${args.showIcon}
  >
    <!-- leading-icon slot -->
    ${args.showIcon ? html`<obi-placeholder></obi-placeholder>` : null}
  </obc-filter-chip>
`;

/* ─────────────────────────  STORIES  ───────────────────────── */

export const CheckedWithIcon: Story = {
  name: 'Checked – icon on',
  args: {checked: true, showIcon: true},
  render: Template,
};

export const CheckedNoIcon: Story = {
  name: 'Checked – icon off',
  args: {checked: true, showIcon: false},
  render: Template,
};

export const UncheckedWithIcon: Story = {
  name: 'Unchecked – icon on',
  args: {checked: false, showIcon: true},
  render: Template,
};

export const UncheckedNoIcon: Story = {
  name: 'Unchecked – icon off',
  args: {checked: false, showIcon: false},
  render: Template,
};
