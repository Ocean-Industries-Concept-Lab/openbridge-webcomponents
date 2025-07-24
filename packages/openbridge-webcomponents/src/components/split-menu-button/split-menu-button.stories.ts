import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcSplitMenuButton} from './split-menu-button.js';
import './split-menu-button.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';
import {ContextMenuType} from '../context-menu-input/context-menu-input.js';

const renderWithIcon = (args: StoryObj<ObcSplitMenuButton>['args']) => html`
  <obc-split-menu-button
    .label=${args?.label || ''}
    .hasIcon=${args?.hasIcon || false}
    .options=${args?.options || []}
    .selectedValues=${args?.selectedValues || []}
    .menuType=${args?.menuType || ContextMenuType.Regular}
    .multiSelect=${args?.multiSelect}
    .selectPerGroup=${args?.selectPerGroup || false}
    .persistSelection=${args?.persistSelection !== undefined
      ? args.persistSelection
      : true}
    .itemsPerColumn=${args?.itemsPerColumn || 5}
    .hasTitleBar=${args?.hasTitleBar || false}
    .menuTitle=${args?.menuTitle || ''}
    .fullWidth=${args?.fullWidth || false}
    .disabled=${args?.disabled || false}
    .openTop=${args?.openTop || false}
    .columnGroups=${args?.columnGroups || []}
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
    persistSelection: {
      control: 'boolean',
      description:
        'Show checked state for single-selection (persist selected visual)',
    },
    selectPerGroup: {
      control: 'boolean',
      description:
        'Allow single selection per group/column (for flyout and multi-column)',
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
    selectPerGroup: false,
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

/** Multi-column menu (multi select) */
export const MultiColumn: Story = {
  args: {
    label: 'Project Selection (Multi)',
    menuType: ContextMenuType.Multi,
    hasIcon: true,
    hasTitleBar: true,
    menuTitle: 'Select Projects',
    itemsPerColumn: 4,
    options: [
      {
        value: 'project1',
        label: 'Alpha Project',
        icon: html`<obi-placeholder></obi-placeholder>`,
      },
      {value: 'project2', label: 'Beta Initiative'},
      {value: 'project3', label: 'Gamma Research'},
      {
        value: 'project4',
        label: 'Delta Development',
        icon: html`<obi-placeholder></obi-placeholder>`,
      },
      {value: 'project5', label: 'Epsilon Testing'},
      {value: 'project6', label: 'Zeta Deployment'},
      {value: 'project7', label: 'Eta Maintenance'},
      {
        value: 'project8',
        label: 'Theta Support',
        icon: html`<obi-placeholder></obi-placeholder>`,
      },
      {value: 'project9', label: 'Iota Analytics'},
      {value: 'project10', label: 'Kappa Training'},
    ],
    selectedValues: ['project1', 'project4', 'project7'],
    multiSelect: false,
    selectPerGroup: false,
  },
  render: renderWithIcon,
};

/** Multi-column with subtitles/groups, multi select */
export const MultiColumnWithSubtitles: Story = {
  args: {
    label: 'Feature Selection (Multi)',
    menuType: ContextMenuType.MultiWithSubtitles,
    hasIcon: true,
    hasTitleBar: true,
    menuTitle: 'Choose Features',
    itemsPerColumn: 3,
    // Don't use options! Use columnGroups:
    columnGroups: [
      {
        title: 'Basic Features',
        columns: 1,
        options: [
          {
            value: 'basic1',
            label: 'User Management',
            icon: html`<obi-placeholder></obi-placeholder>`,
          },
          {value: 'basic2', label: 'File Storage'},
          {value: 'basic3', label: 'Basic Analytics'},
        ],
      },
      {
        title: 'Advanced Features',
        columns: 1,
        options: [
          {value: 'advanced1', label: 'API Access'},
          {
            value: 'advanced2',
            label: 'Custom Integrations',
            icon: html`<obi-placeholder></obi-placeholder>`,
          },
          {value: 'advanced3', label: 'Advanced Analytics'},
          {value: 'enterprise1', label: 'SSO Integration'},
        ],
      },
    ],
    selectedValues: ['basic1', 'advanced2'],
    multiSelect: false,
  },
  render: renderWithIcon,
};

/** Multi-column menu (single per column selection) */
export const MultiColumnGroupSelection: Story = {
  args: {
    label: 'Project Selection (One Per Column)',
    menuType: ContextMenuType.Multi,
    hasIcon: true,
    hasTitleBar: true,
    menuTitle: 'Select One Project Per Column',
    itemsPerColumn: 4,
    options: [
      {
        value: 'project1',
        label: 'Alpha Project',
        icon: html`<obi-placeholder></obi-placeholder>`,
      },
      {value: 'project2', label: 'Beta Initiative'},
      {value: 'project3', label: 'Gamma Research'},
      {
        value: 'project4',
        label: 'Delta Development',
        icon: html`<obi-placeholder></obi-placeholder>`,
      },
      {value: 'project5', label: 'Epsilon Testing'},
      {value: 'project6', label: 'Zeta Deployment'},
      {value: 'project7', label: 'Eta Maintenance'},
      {
        value: 'project8',
        label: 'Theta Support',
        icon: html`<obi-placeholder></obi-placeholder>`,
      },
      {value: 'project9', label: 'Iota Analytics'},
      {value: 'project10', label: 'Kappa Training'},
    ],
    selectedValues: ['project1', 'project8', 'project10'],
    multiSelect: true,
    selectPerGroup: true,
  },
  render: renderWithIcon,
};

export const MultiColumnWithSubtitlesGroupSelection: Story = {
  args: {
    label: 'Feature Selection (One Per Group)',
    menuType: ContextMenuType.MultiWithSubtitles,
    hasIcon: true,
    hasTitleBar: true,
    menuTitle: 'Choose One Feature Per Group',
    itemsPerColumn: 3,
    columnGroups: [
      {
        title: 'Basic Features',
        columns: 1,
        options: [
          {
            value: 'basic1',
            label: 'User Management',
            icon: html`<obi-placeholder></obi-placeholder>`,
          },
          {value: 'basic2', label: 'File Storage'},
          {value: 'basic3', label: 'Basic Analytics'},
        ],
      },
      {
        title: 'Advanced Features',
        columns: 1,
        options: [
          {value: 'advanced1', label: 'API Access'},
          {
            value: 'advanced2',
            label: 'Custom Integrations',
            icon: html`<obi-placeholder></obi-placeholder>`,
          },
          {value: 'advanced3', label: 'Advanced Analytics'},
          {value: 'enterprise1', label: 'SSO Integration'},
        ],
      },
    ],
    selectedValues: ['basic1', 'advanced2'],
    multiSelect: true,
    selectPerGroup: true,
  },
  render: renderWithIcon,
};
