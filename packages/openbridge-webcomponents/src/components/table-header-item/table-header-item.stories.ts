import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcTableHeaderItem,
  ObcTableHeaderItemType,
} from './table-header-item.js';
import './table-header-item.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';

const meta: Meta<typeof ObcTableHeaderItem> = {
  title: 'UI Components/Tables/Building Blocks/Table Header Item',
  tags: ['6.0'],
  component: 'obc-table-header-item',
  args: {
    sortable: true,
  },
  render: (args) => {
    return html`
      <obc-table-header-item
        .type=${args.type}
        .disabled=${args.disabled}
        .hasLeadingIcon=${args.hasLeadingIcon}
        .sortDirection=${args.sortDirection}
        .showDivider=${args.showDivider}
        .checked=${args.checked}
        .sortable=${args.sortable}
      >
        <obi-placeholder slot="leading-icon"></obi-placeholder>
        Header
      </obc-table-header-item>
    `;
  },
} satisfies Meta<ObcTableHeaderItem>;

export default meta;
type Story = StoryObj<ObcTableHeaderItem>;

export const Primary: Story = {
  args: {
    type: ObcTableHeaderItemType.Regular,
    checked: false,
    disabled: false,
    hasLeadingIcon: true,
    sortDirection: 'asc',
    showDivider: true,
  },
};

export const Checked: Story = {
  args: {
    hasLeadingIcon: true,
    checked: true,
    sortDirection: 'asc',
    showDivider: true,
  },
};

export const Sortable: Story = {
  args: {
    type: ObcTableHeaderItemType.Regular,
    sortable: true,
    checked: false,
    disabled: false,
    hasLeadingIcon: true,
    sortDirection: 'none',
    showDivider: true,
  },
};

export const NoIcon: Story = {
  args: {
    hasLeadingIcon: false,
    sortable: false,
    showDivider: true,
  },
};

export const IconOnly: Story = {
  args: {
    type: ObcTableHeaderItemType.IconOnly,
    hasLeadingIcon: true,
    sortable: true,
    sortDirection: 'asc',
    showDivider: true,
  },
};

export const Narrow: Story = {
  args: {
    type: ObcTableHeaderItemType.Narrow,
    hasLeadingIcon: false,
    sortable: true,
    sortDirection: 'asc',
    showDivider: true,
  },
};

export const WithLeadingIcon: Story = {
  args: {
    hasLeadingIcon: true,
  },
};

export const WithSortArrows: Story = {
  args: {
    sortable: true,
    sortDirection: 'asc',
  },
};

export const WithSortDescending: Story = {
  args: {
    sortable: true,
    sortDirection: 'desc',
  },
};

export const WithDivider: Story = {
  args: {
    hasLeadingIcon: true,
    sortable: true,
    sortDirection: 'asc',
    showDivider: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
