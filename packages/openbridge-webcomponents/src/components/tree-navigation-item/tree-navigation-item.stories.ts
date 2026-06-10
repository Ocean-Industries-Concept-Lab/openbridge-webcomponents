import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcTreeNavigationItem,
  TreeBranchType,
  TreeTerminalType,
} from './tree-navigation-item.js';
import './tree-navigation-item.js';
import {iconIds, iconIdToIconHtml} from '../../storybook-util.js';
import {html} from 'lit';
import {BadgeType} from '../badge/badge.js';

const meta: Meta<typeof ObcTreeNavigationItem> = {
  title: 'UI Components/Menus and Navigation/Tree Navigation Item',
  tags: ['autodocs', '6.0'],
  component: 'obc-tree-navigation-item',
  args: {
    label: 'List item',
    icon: 'placeholder',
    branches: [TreeBranchType.straight, TreeBranchType.intersection],
    expandable: true,
    expanded: false,
    checked: false,
    disabled: false,
    hasLeadingIcon: true,
    terminalType: TreeTerminalType.regular,
    hasAlertBadge: false,
    alertCount: 9,
    alertType: BadgeType.alarm,
  },
  argTypes: {
    icon: {
      options: iconIds,
      control: {type: 'select'},
    },
    label: {control: {type: 'text'}},
    branches: {control: {type: 'object'}},
    expandable: {control: {type: 'boolean'}},
    expanded: {control: {type: 'boolean'}},
    checked: {control: {type: 'boolean'}},
    disabled: {control: {type: 'boolean'}},
    hasLeadingIcon: {control: {type: 'boolean'}},
    terminalType: {
      control: {type: 'select'},
      options: Object.values(TreeTerminalType),
    },
    hasAlertBadge: {control: {type: 'boolean'}},
    alertCount: {control: {type: 'number'}},
    alertType: {
      control: {type: 'select'},
      options: Object.values(BadgeType),
      if: {arg: 'hasAlertBadge'},
    },
  },
  render: (args) => {
    return html`<obc-tree-navigation-item
      .label=${args.label}
      .branches=${args.branches}
      ?expandable=${args.expandable}
      ?expanded=${args.expanded}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      .hasLeadingIcon=${args.hasLeadingIcon}
      .terminalType=${args.terminalType}
      .hasAlertBadge=${args.hasAlertBadge}
      .alertCount=${args.alertCount}
      .alertType=${args.alertType}
      @expand-toggle=${(e: CustomEvent<boolean>) => {
        (e.currentTarget as ObcTreeNavigationItem).expanded = e.detail;
      }}
    >
      ${args.hasLeadingIcon && args.icon
        ? iconIdToIconHtml(args.icon as unknown as string, {slot: 'icon'})
        : ''}
    </obc-tree-navigation-item>`;
  },
} satisfies Meta<ObcTreeNavigationItem>;

export default meta;
type Story = StoryObj<ObcTreeNavigationItem>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {checked: true, expandable: false},
};

export const Expanded: Story = {
  args: {expanded: true},
};

export const Disabled: Story = {
  args: {disabled: true},
};

export const Leaf: Story = {
  args: {expandable: false},
};

export const Root: Story = {
  args: {branches: []},
};

export const IndentedNoConnectors: Story = {
  args: {branches: [TreeBranchType.blank, TreeBranchType.blank]},
};

export const WithAlertBadge: Story = {
  args: {hasAlertBadge: true, alertCount: 9},
};

export const AggregatedHeader: Story = {
  args: {terminalType: TreeTerminalType.aggregatedHeader},
};

export const GroupHeader: Story = {
  args: {terminalType: TreeTerminalType.groupHeader},
};
