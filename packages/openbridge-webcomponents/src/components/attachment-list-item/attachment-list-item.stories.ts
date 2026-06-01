import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcAttachmentListItem} from './attachment-list-item.js';
import './attachment-list-item.js';
import '../icon-button/icon-button.js';
import '../tag/tag.js';
import '../../icons/icon-placeholder.js';
import {html} from 'lit';

const meta: Meta<ObcAttachmentListItem> = {
  title: 'UI Components/Tables and Lists/Attachment List Item',
  tags: ['autodocs', '6.1'],
  component: 'obc-attachment-list-item',
  args: {
    label: 'Document.pdf',
    hasLeadingIcon: true,
    hasTimeDate: true,
    hasTrailingAction: true,
    date: '09 May 2025',
    time: '10:41:32',
    showDivider: false,
    amplified: false,
    disabled: false,
    hasIndex: false,
    index: '00',
    hasTag: false,
  },
  argTypes: {
    label: {control: 'text'},
    date: {control: 'text'},
    time: {control: 'text'},
    index: {control: 'text'},
  },
  render: (args) => html`
    <div style="width: 472px;">
      <obc-attachment-list-item
        .label=${args.label}
        .date=${args.date}
        .time=${args.time}
        .index=${args.index}
        ?hasLeadingIcon=${args.hasLeadingIcon}
        ?hasTimeDate=${args.hasTimeDate}
        ?hasTrailingAction=${args.hasTrailingAction}
        ?showDivider=${args.showDivider}
        ?amplified=${args.amplified}
        ?disabled=${args.disabled}
        ?hasIndex=${args.hasIndex}
        ?hasTag=${args.hasTag}
      >
        <obi-placeholder slot="leading-icon"></obi-placeholder>
        <obc-tag slot="tag" label="Label" hasIcon>
          <obi-placeholder></obi-placeholder>
        </obc-tag>
        <obc-icon-button slot="trailing-action" variant="flat">
          <obi-placeholder></obi-placeholder>
        </obc-icon-button>
      </obc-attachment-list-item>
    </div>
  `,
};

export default meta;
type Story = StoryObj<ObcAttachmentListItem>;

export const Default: Story = {};

export const WithDivider: Story = {
  args: {
    showDivider: true,
  },
};

export const Amplified: Story = {
  args: {
    amplified: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithIndex: Story = {
  args: {
    hasIndex: true,
    index: '01',
  },
};

export const WithTag: Story = {
  args: {
    hasTag: true,
  },
};

export const MinimalItem: Story = {
  args: {
    hasLeadingIcon: false,
    hasTimeDate: false,
    hasTrailingAction: false,
  },
};

export const AllStates: Story = {
  render: () => html`
    <div style="width: 472px; display: flex; flex-direction: column;">
      <obc-attachment-list-item
        label="Enabled"
        date="09 May 2025"
        time="10:41:32"
        hasLeadingIcon
        hasTimeDate
        hasTrailingAction
        showDivider
      >
        <obi-placeholder slot="leading-icon"></obi-placeholder>
        <obc-icon-button slot="trailing-action" variant="flat">
          <obi-placeholder></obi-placeholder>
        </obc-icon-button>
      </obc-attachment-list-item>
      <obc-attachment-list-item
        label="Disabled"
        date="09 May 2025"
        time="10:41:32"
        hasLeadingIcon
        hasTimeDate
        hasTrailingAction
        hasTag
        disabled
        showDivider
      >
        <obi-placeholder slot="leading-icon"></obi-placeholder>
        <obc-tag slot="tag" label="Label" hasIcon>
          <obi-placeholder></obi-placeholder>
        </obc-tag>
        <obc-icon-button slot="trailing-action" variant="flat">
          <obi-placeholder></obi-placeholder>
        </obc-icon-button>
      </obc-attachment-list-item>
      <obc-attachment-list-item
        label="Amplified"
        date="09 May 2025"
        time="10:41:32"
        hasLeadingIcon
        hasTimeDate
        hasTrailingAction
        amplified
      >
        <obi-placeholder slot="leading-icon"></obi-placeholder>
        <obc-icon-button slot="trailing-action" variant="flat">
          <obi-placeholder></obi-placeholder>
        </obc-icon-button>
      </obc-attachment-list-item>
    </div>
  `,
};
