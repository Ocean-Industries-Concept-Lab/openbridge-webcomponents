import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcSplitMenuButton} from './split-menu-button.js';
import './split-menu-button.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';
import {ContextMenuType} from '../context-menu-input/context-menu-input.js';

// Shared render function for stories with icons
const renderWithIcon = (args: StoryObj<ObcSplitMenuButton>['args']) => html`
  <obc-split-menu-button
    .label=${args?.label || ''}
    .hasIcon=${args?.hasIcon || false}
    .options=${args?.options || []}
    .selectedValues=${args?.selectedValues || []}
    .menuType=${args?.menuType || ContextMenuType.Regular}
    .multiSelect=${args?.multiSelect}
    .hasTitleBar=${args?.hasTitleBar || false}
    .menuTitle=${args?.menuTitle || ''}
    .fullWidth=${args?.fullWidth || false}
    .disabled=${args?.disabled || false}
    .openTop=${args?.openTop || false}
  >
    <obi-placeholder slot="icon"></obi-placeholder>
  </obc-split-menu-button>
`;

const meta: Meta<ObcSplitMenuButton> = {
  title: 'UI Components/Input/Split Menu Button',
  tags: ['autodocs'],
  component: 'obc-split-menu-button',
  decorators: [
    (story) => html`
      <div style="padding-top: 200px; overflow: visible; min-height: 300px;">
        ${story()}
      </div>
    `,
  ],
  argTypes: {
    label: {control: 'text', description: 'Label for the primary button'},
    hasIcon: {
      control: 'boolean',
      description: 'Show an icon in the primary button',
    },
    options: {control: 'object', description: 'Array of dropdown menu options'},
    selectedValues: {
      control: 'object',
      description: 'Currently selected values in dropdown',
    },
    menuType: {
      control: 'select',
      options: Object.values(ContextMenuType),
      description: 'Type of dropdown menu',
    },
    multiSelect: {
      control: 'boolean',
      description: 'Allow multiple selections in dropdown',
    },
    hasTitleBar: {
      control: 'boolean',
      description: 'Show title bar in dropdown menu',
    },
    menuTitle: {control: 'text', description: 'Title for the dropdown menu'},
    fullWidth: {
      control: 'boolean',
      description: 'Make button fill container width',
    },
    disabled: {control: 'boolean', description: 'Disable both buttons'},
    openTop: {
      control: 'boolean',
      description: 'Open the dropdown above the button',
    },
  },
  args: {
    label: 'Split Button',
    hasIcon: false,
    options: [
      {value: 'action1', label: 'Action 1'},
      {value: 'action2', label: 'Action 2'},
      {value: 'action3', label: 'Action 3'},
      {value: 'action4', label: 'Action 4'},
    ],
    selectedValues: [],
    menuType: ContextMenuType.Regular,
    multiSelect: false,
    hasTitleBar: false,
    menuTitle: '',
    fullWidth: false,
    disabled: false,
    openTop: false,
  },
} satisfies Meta<ObcSplitMenuButton>;

export default meta;
type Story = StoryObj<ObcSplitMenuButton>;

/** Basic split button with primary action and dropdown menu. */
export const Basic: Story = {};

/** Split button that opens the dropdown above the button. */
export const OpenTop: Story = {
  args: {
    label: 'Open Above',
    hasIcon: true,
    openTop: true,
  },
  render: renderWithIcon,
};

/** Split button with an icon in the primary button. */
export const WithIcon: Story = {
  args: {
    label: 'Save Document',
    hasIcon: true,
    options: [
      {value: 'save-as', label: 'Save As...'},
      {value: 'save-copy', label: 'Save Copy'},
      {value: 'export-pdf', label: 'Export as PDF'},
      {value: 'export-word', label: 'Export as Word'},
    ],
  },
  render: renderWithIcon,
};

/** Multi-select dropdown with checkboxes. */
export const MultiSelect: Story = {
  args: {
    label: 'Apply Filters',
    hasIcon: true,
    menuType: ContextMenuType.Checkboxes,
    multiSelect: true,
    options: [
      {value: 'filter1', label: 'Show Active Items'},
      {value: 'filter2', label: 'Show Completed Items'},
      {value: 'filter3', label: 'Show Archived Items'},
      {value: 'filter4', label: 'Show Draft Items'},
    ],
    selectedValues: ['filter1', 'filter3'],
  },
  render: renderWithIcon,
};

/** Radio button selection dropdown. */
export const RadioSelect: Story = {
  args: {
    label: 'Change Status',
    menuType: ContextMenuType.Radio,
    options: [
      {value: 'draft', label: 'Draft'},
      {value: 'review', label: 'In Review'},
      {value: 'approved', label: 'Approved'},
      {value: 'published', label: 'Published'},
    ],
    selectedValues: ['review'],
  },
};

/** Full width split button. */
export const FullWidth: Story = {
  args: {
    label: 'Create New Item',
    hasIcon: true,
    fullWidth: true,
    hasTitleBar: true,
    menuTitle: 'Creation Options',
    options: [
      {value: 'document', label: 'New Document'},
      {value: 'folder', label: 'New Folder'},
      {value: 'project', label: 'New Project'},
      {value: 'template', label: 'From Template'},
    ],
  },
  render: renderWithIcon,
};

/** Disabled split button. */
export const Disabled: Story = {
  args: {
    label: 'Disabled Action',
    hasIcon: true,
    disabled: true,
    options: [
      {value: 'option1', label: 'Option 1'},
      {value: 'option2', label: 'Option 2'},
    ],
  },
  render: renderWithIcon,
};

/** Complex flyout menu example. */
export const FlyoutMenu: Story = {
  args: {
    label: 'Quick Actions',
    hasIcon: true,
    menuType: ContextMenuType.Flyout,
    multiSelect: false,
    options: [
      {
        value: 'file',
        label: 'File Operations',
        children: [
          {value: 'new', label: 'New File'},
          {value: 'open', label: 'Open File'},
          {value: 'recent', label: 'Recent Files'},
        ],
      },
      {
        value: 'edit',
        label: 'Edit Operations',
        children: [
          {value: 'copy', label: 'Copy'},
          {value: 'paste', label: 'Paste'},
          {value: 'undo', label: 'Undo'},
        ],
      },
      {
        value: 'view',
        label: 'View Options',
        children: [
          {value: 'zoom-in', label: 'Zoom In'},
          {value: 'zoom-out', label: 'Zoom Out'},
          {value: 'fullscreen', label: 'Full Screen'},
        ],
      },
    ],
  },
  render: renderWithIcon,
};
