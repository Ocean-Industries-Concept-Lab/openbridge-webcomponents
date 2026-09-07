import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcCheckboxList} from './checkbox-list.js';
import './checkbox-list.js';
import '../checkbox-item/checkbox-item.js';
import {ObcCheckboxItemHoverStyle} from '../checkbox-item/checkbox-item.js';
import {CheckboxStatus} from '../checkbox/checkbox.js';

const meta = {
  title: 'UI Components/Selection Controls and Switches/Checkbox List',
  tags: ['autodocs', '6.1', 'beta'],
  component: 'obc-checkbox-list',
  parameters: {
    layout: 'centered',
    actions: {
      handles: ['change', 'expand-toggle'],
    },
  },
  argTypes: {
    hoverStyle: {
      name: 'Hover style',
      options: Object.values(ObcCheckboxItemHoverStyle),
      control: {type: 'select'},
    },
  },
  args: {
    hoverStyle: ObcCheckboxItemHoverStyle.touchTarget,
  },
} satisfies Meta<ObcCheckboxList>;

export default meta;
type Story = StoryObj<ObcCheckboxList>;

const regularRows = html`
  <obc-checkbox-item label="Label"></obc-checkbox-item>
  <obc-checkbox-item
    label="Label"
    status=${CheckboxStatus.checked}
  ></obc-checkbox-item>
  <obc-checkbox-item
    label="Label"
    status=${CheckboxStatus.checked}
  ></obc-checkbox-item>
  <obc-checkbox-item label="Label"></obc-checkbox-item>
`;

const nestedRows = html`
  <obc-checkbox-item
    level="1"
    expandable
    expanded
    label="Label"
    status=${CheckboxStatus.mixed}
  ></obc-checkbox-item>
  <obc-checkbox-item
    level="2"
    label="Label"
    status=${CheckboxStatus.checked}
  ></obc-checkbox-item>
  <obc-checkbox-item level="2" label="Label"></obc-checkbox-item>
  <obc-checkbox-item level="1" expandable label="Label"></obc-checkbox-item>
  <obc-checkbox-item
    level="2"
    label="Hidden until expanded"
  ></obc-checkbox-item>
`;

/** The Figma frame widths: 240px for a regular list, 320px for a nested one. */
const renderRegular: Story['render'] = (args) =>
  html`<obc-checkbox-list style="width:240px" .hoverStyle=${args.hoverStyle}>
    ${regularRows}
  </obc-checkbox-list>`;

const renderNested: Story['render'] = (args) =>
  html`<obc-checkbox-list style="width:320px" .hoverStyle=${args.hoverStyle}>
    ${nestedRows}
  </obc-checkbox-list>`;

export const Regular: Story = {
  render: renderRegular,
};

export const Nested: Story = {
  render: renderNested,
};

export const RegularVisualTarget: Story = {
  args: {hoverStyle: ObcCheckboxItemHoverStyle.visualTarget},
  render: renderRegular,
};

export const NestedVisualTarget: Story = {
  args: {hoverStyle: ObcCheckboxItemHoverStyle.visualTarget},
  render: renderNested,
};

export const WithDescriptions: Story = {
  render: (args) =>
    html`<obc-checkbox-list style="width:320px" .hoverStyle=${args.hoverStyle}>
      <obc-checkbox-item
        level="1"
        expandable
        expanded
        label="Reports"
        description="All report types"
        status=${CheckboxStatus.mixed}
      ></obc-checkbox-item>
      <obc-checkbox-item
        level="2"
        label="Monthly"
        description="Sent on the 1st"
        status=${CheckboxStatus.checked}
      ></obc-checkbox-item>
      <obc-checkbox-item
        level="2"
        label="Quarterly"
        description="Sent every third month"
      ></obc-checkbox-item>
    </obc-checkbox-list>`,
};
