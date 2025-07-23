import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcContextMenuButton} from './context-menu-button.js';
import './context-menu-button.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';
import {ContextMenuType} from '../context-menu-input/context-menu-input.js';

const renderWithIcon = (args: StoryObj<ObcContextMenuButton>['args']) => html`
  <div style="padding-top: 200px; overflow: visible; min-height: 300px;">
    <obc-context-menu-button
      .label=${args?.label || ''}
      .options=${args?.options || []}
      .selectedValues=${args?.selectedValues || []}
      .fullWidth=${args?.fullWidth || false}
      .hasIcon=${args?.hasIcon || false}
      .menuType=${args?.menuType || ContextMenuType.Regular}
      .multiSelect=${args?.multiSelect}
      .selectPerGroup=${args?.selectPerGroup}
      .hasTitleBar=${args?.hasTitleBar || false}
      .menuTitle=${args?.menuTitle || ''}
      .itemsPerColumn=${args?.itemsPerColumn || 5}
      .openTop=${args?.openTop || false}
      .disabled=${args?.disabled || false}
    >
      <obi-placeholder slot="icon"></obi-placeholder>
    </obc-context-menu-button>
  </div>
`;

const renderIconOnly = (args: StoryObj<ObcContextMenuButton>['args']) => html`
  <div style="padding-top: 200px; overflow: visible; min-height: 300px;">
    <obc-context-menu-button
      .options=${args?.options || []}
      .selectedValues=${args?.selectedValues || []}
      .fullWidth=${args?.fullWidth || false}
      .hasIcon=${args?.hasIcon || false}
      .menuType=${args?.menuType || ContextMenuType.Regular}
      .multiSelect=${args?.multiSelect}
      .selectPerGroup=${args?.selectPerGroup}
      .hasTitleBar=${args?.hasTitleBar || false}
      .menuTitle=${args?.menuTitle || ''}
      .itemsPerColumn=${args?.itemsPerColumn || 5}
      .openTop=${args?.openTop || false}
      .disabled=${args?.disabled || false}
    >
      <obi-placeholder slot="icon"></obi-placeholder>
    </obc-context-menu-button>
  </div>
`;

const meta: Meta<ObcContextMenuButton> = {
  title: 'UI Components/Input/Context Menu Button',
  tags: ['autodocs'],
  component: 'obc-context-menu-button',
  argTypes: {
    label: {control: 'text', description: 'Constant label on the button'},
    options: {
      control: 'object',
      description:
        'Array of options with value, label, icon, and optional level/children',
    },
    selectedValues: {
      control: 'object',
      description: 'Currently selected option values',
    },
    fullWidth: {control: 'boolean', description: 'Fills the container width'},
    hasIcon: {
      control: 'boolean',
      description: 'Show an icon slot in the button',
    },
    menuType: {
      control: 'select',
      options: Object.values(ContextMenuType),
      description: 'The variant type of context menu to display',
    },
    multiSelect: {
      control: 'boolean',
      description: 'Whether multiple selections are allowed',
    },
    selectPerGroup: {
      control: 'boolean',
      description: 'Allows single selection per group (flyout only)',
    },
    hasTitleBar: {
      control: 'boolean',
      description: 'Whether to show a title bar with close button',
    },
    menuTitle: {
      control: 'text',
      description: 'Title text displayed in the title bar',
    },
    itemsPerColumn: {
      control: 'number',
      description: 'Number of items per column in multi-column layouts',
    },
    radioGroupName: {
      control: 'text',
      description: 'Name attribute for radio button groups',
    },
    openTop: {
      control: 'boolean',
      description: 'Open the dropdown above the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the context menu button',
    },
  },
  args: {
    label: 'Menu button',
    options: [
      {
        value: 'option1',
        label: 'First Option',
        icon: html`<obi-placeholder></obi-placeholder>`,
      },
      {value: 'option2', label: 'Second Option'},
      {
        value: 'option3',
        label: 'Third Option',
        icon: html`<obi-placeholder></obi-placeholder>`,
      },
      {value: 'option4', label: 'Fourth Option'},
      {value: 'option5', label: 'Fifth Option'},
    ],
    selectedValues: ['option2'],
    fullWidth: false,
    hasIcon: false,
    menuType: ContextMenuType.Regular,
    itemsPerColumn: 5,
    openTop: false,
    disabled: false,
  },
} satisfies Meta<ObcContextMenuButton>;

export default meta;
type Story = StoryObj<ObcContextMenuButton>;

/** Default regular context menu button with icon and label. */
export const Regular: Story = {
  args: {
    hasIcon: true,
  },
  render: renderWithIcon,
};

/** Icon-only context menu button without label. */
export const IconOnly: Story = {
  args: {
    hasIcon: true,
    label: '', // Empty label for icon-only
  },
  render: renderIconOnly,
};

/** Context menu that opens above the button. */
export const OpenTop: Story = {
  args: {
    label: 'Open Above',
    hasIcon: true,
    openTop: true,
  },
  render: renderWithIcon,
};

/** Default regular context menu button with icon and label. */
export const Disabled: Story = {
  args: {
    hasIcon: true,
    disabled: true,
  },
  render: renderWithIcon,
};

/** Multi-select with regular navigation items. */
export const RegularMultiSelect: Story = {
  name: 'Regular (Multi-Select)',
  args: {
    label: 'Multi-Select Menu',
    menuType: ContextMenuType.Regular,
    multiSelect: true,
    selectedValues: ['option2', 'option4'],
  },
};

/** Radio button variant for single selection. */
export const RadioButtons: Story = {
  args: {
    label: 'Size Selection',
    menuType: ContextMenuType.Radio,
    options: [
      {value: 'small', label: 'Small'},
      {value: 'medium', label: 'Medium'},
      {value: 'large', label: 'Large'},
      {value: 'xlarge', label: 'Extra Large'},
    ],
    selectedValues: ['medium'],
  },
};

/** Checkbox variant for multi-selection. */
export const Checkboxes: Story = {
  args: {
    label: 'Feature Selection',
    menuType: ContextMenuType.Checkboxes,
    options: [
      {value: 'analytics', label: 'Analytics'},
      {value: 'realtime', label: 'Real-time Sync'},
      {value: 'storage', label: 'Cloud Storage'},
      {value: 'collaboration', label: 'Team Collaboration'},
      {value: 'api', label: 'API Access'},
    ],
    selectedValues: ['analytics', 'storage'],
  },
};

/** Nested checkboxes with hierarchical structure. */
export const NestedCheckboxes: Story = {
  args: {
    label: 'Category Filter',
    menuType: ContextMenuType.NestedCheckboxes,
    options: [
      {value: 'documents', label: 'Documents'},
      {value: 'reports', label: 'Reports', level: 2},
      {value: 'monthly', label: 'Monthly Reports', level: 3},
      {value: 'quarterly', label: 'Quarterly Reports', level: 3},
      {value: 'presentations', label: 'Presentations', level: 2},
      {value: 'images', label: 'Images'},
      {value: 'photos', label: 'Photos', level: 2},
      {value: 'graphics', label: 'Graphics', level: 2},
    ],
    selectedValues: ['documents', 'reports', 'monthly', 'images'],
  },
};

/** Flyout menu with grouped actions. */
export const FlyoutMenu: Story = {
  args: {
    label: 'Actions Menu',
    menuType: ContextMenuType.Flyout,
    multiSelect: false,
    options: [
      {
        value: 'file',
        label: 'File',
        icon: html`<obi-placeholder></obi-placeholder>`,
        children: [
          {value: 'new', label: 'New'},
          {
            value: 'open',
            label: 'Open',
            icon: html`<obi-placeholder></obi-placeholder>`,
          },
          {value: 'save', label: 'Save'},
          {value: 'save-as', label: 'Save As...'},
        ],
      },
      {
        value: 'edit',
        label: 'Edit',
        children: [
          {value: 'undo', label: 'Undo'},
          {
            value: 'redo',
            label: 'Redo',
            icon: html`<obi-placeholder></obi-placeholder>`,
          },
          {value: 'cut', label: 'Cut'},
          {value: 'copy', label: 'Copy'},
        ],
      },
      {
        value: 'view',
        label: 'View',
        children: [
          {
            value: 'zoom-in',
            label: 'Zoom In',
            icon: html`<obi-placeholder></obi-placeholder>`,
          },
          {value: 'zoom-out', label: 'Zoom Out'},
          {value: 'fullscreen', label: 'Fullscreen'},
        ],
      },
      {value: 'help', label: 'Help'},
    ],
    selectedValues: [],
  },
};

/** Multi-select flyout menu. */
export const MultiSelectFlyout: Story = {
  args: {
    label: 'Bulk Operations',
    menuType: ContextMenuType.Flyout,
    multiSelect: true,
    options: [
      {
        value: 'file-ops',
        label: 'File Operations',
        icon: html`<obi-placeholder></obi-placeholder>`,
        children: [
          {value: 'copy', label: 'Copy Files'},
          {value: 'move', label: 'Move Files'},
          {
            value: 'compress',
            label: 'Compress Files',
            icon: html`<obi-placeholder></obi-placeholder>`,
          },
        ],
      },
      {
        value: 'sharing',
        label: 'Sharing',
        children: [
          {
            value: 'share-link',
            label: 'Create Share Link',
            icon: html`<obi-placeholder></obi-placeholder>`,
          },
          {value: 'permissions', label: 'Set Permissions'},
          {value: 'export-report', label: 'Export Sharing Report'},
        ],
      },
      {
        value: 'maintenance',
        label: 'Maintenance',
        icon: html`<obi-placeholder></obi-placeholder>`,
        children: [
          {value: 'cleanup', label: 'Clean Up Files'},
          {
            value: 'optimize',
            label: 'Optimize Storage',
            icon: html`<obi-placeholder></obi-placeholder>`,
          },
        ],
      },
    ],
    selectedValues: ['copy', 'share-link', 'cleanup'],
  },
};

/** Per-group selection flyout menu. */
export const PerGroupSelectFlyout: Story = {
  args: {
    label: 'Settings',
    menuType: ContextMenuType.Flyout,
    selectPerGroup: true,
    options: [
      {
        value: 'theme',
        label: 'Theme',
        children: [
          {value: 'light', label: 'Light Theme'},
          {value: 'dark', label: 'Dark Theme'},
          {value: 'auto', label: 'Auto Theme'},
        ],
      },
      {
        value: 'language',
        label: 'Language',
        children: [
          {value: 'en', label: 'English'},
          {value: 'es', label: 'Spanish'},
          {value: 'fr', label: 'French'},
        ],
      },
      {
        value: 'notifications',
        label: 'Notifications',
        children: [
          {value: 'all', label: 'All Notifications'},
          {value: 'important', label: 'Important Only'},
          {value: 'none', label: 'None'},
        ],
      },
    ],
    selectedValues: ['dark', 'en', 'important'],
  },
};

/** Multi-column menu layout. */
export const MultiColumn: Story = {
  args: {
    label: 'Project Selection',
    menuType: ContextMenuType.Multi,
    hasTitleBar: true,
    menuTitle: 'Select Projects',
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
    itemsPerColumn: 4,
  },
};

/** Multi-column menu with subtitles and groups. */
export const MultiColumnWithSubtitles: Story = {
  args: {
    label: 'Feature Selection',
    menuType: ContextMenuType.MultiWithSubtitles,
    hasTitleBar: true,
    menuTitle: 'Choose Features',
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
    itemsPerColumn: 3,
  },
};
