import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcContextMenuInput} from './context-menu-input.js';
import './context-menu-input.js';
import '../../icons/icon-placeholder.js';

const meta: Meta<typeof ObcContextMenuInput> = {
  title: 'UI Components/Menus and Navigation/Context Menu Input',
  tags: ['6.0'],
  component: 'obc-context-menu-input',
  argTypes: {
    type: {
      control: 'select',
      options: [
        'regular',
        'checkboxes',
        'nested-checkboxes',
        'flyout',
        'multi',
        'multi-with-subtitles',
      ],
      description: 'The variant type of context menu to display',
    },
    options: {
      control: 'object',
      description:
        'Array of menu options with value, label, and optional level and icon',
    },
    columnGroups: {
      control: 'object',
      description: 'Array of column groups for multi-with-subtitles layout',
    },
    selectedValues: {
      control: 'object',
      description: 'Array of currently selected option values',
    },
    hasTitleBar: {
      control: 'boolean',
      description: 'Whether to show a title bar with close button',
    },
    title: {
      control: 'text',
      description: 'Title text displayed in the title bar',
    },
    multiSelect: {
      control: 'boolean',
      description: 'Whether multiple selections are allowed',
    },
    itemsPerColumn: {
      control: 'number',
      description: 'Number of items per column in multi-column layouts',
    },
  },
  args: {
    type: 'regular',
    options: [
      {
        value: 'option1',
        label: 'First Option',
        icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
      },
      {value: 'option2', label: 'Second Option'},
      {
        value: 'option3',
        label: 'Third Option',
        icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
      },
      {value: 'option4', label: 'Fourth Option'},
      {value: 'option5', label: 'Fifth Option'},
    ],
    selectedValues: ['option2'],
    hasTitleBar: false,
    title: 'Menu',
    itemsPerColumn: 8,
  },
} satisfies Meta<ObcContextMenuInput>;

export default meta;
type Story = StoryObj<ObcContextMenuInput>;

/** Default regular context menu with label-only and icon items. */
export const Regular: Story = {};

/** Checkbox variant, some with icons. */
export const Checkboxes: Story = {
  args: {
    type: 'checkboxes',
    options: [
      {value: 'feature1', label: 'Feature 1'},
      {value: 'feature2', label: 'Feature 2'},
      {value: 'feature3', label: 'Feature 3'},
      {value: 'feature4', label: 'Feature 4'},
      {value: 'feature5', label: 'Feature 5'},
    ],
    selectedValues: ['feature1', 'feature3'],
  },
};

/** Nested checkboxes, some nested items with icons. */
export const NestedCheckboxes: Story = {
  args: {
    type: 'nested-checkboxes',
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

/** Flyout menu with group icons and some child icons. */
export const ActionOnlyFlyout: Story = {
  args: {
    type: 'flyout',
    multiSelect: false,
    selectedValues: [],
    options: [
      {
        value: 'file',
        label: 'File',
        icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
        children: [
          {value: 'new', label: 'New'},
          {
            value: 'open',
            label: 'Open',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
          {value: 'save', label: 'Save'},
          {value: 'save-as', label: 'Save As...'},
          {
            value: 'close',
            label: 'Close',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
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
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
          {value: 'cut', label: 'Cut'},
          {value: 'copy', label: 'Copy'},
          {
            value: 'paste',
            label: 'Paste',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
        ],
      },
      {
        value: 'view',
        label: 'View',
        icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
        children: [
          {value: 'zoom-in', label: 'Zoom In'},
          {value: 'zoom-out', label: 'Zoom Out'},
          {
            value: 'actual-size',
            label: 'Actual Size',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
          {value: 'fullscreen', label: 'Fullscreen'},
        ],
      },
      {
        value: 'help',
        label: 'Help',
      },
    ],
  },
};

/** Multi-select flyout menu with group and child icons. */
export const MultiSelectFlyout: Story = {
  args: {
    type: 'flyout',
    multiSelect: true,
    selectedValues: [
      'save',
      'save-as',
      'copy',
      'paste',
      'zoom-in',
      'fullscreen',
    ],
    options: [
      {
        value: 'file',
        label: 'File',
        icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
        children: [
          {value: 'new', label: 'New'},
          {value: 'open', label: 'Open'},
          {value: 'save', label: 'Save'},
          {value: 'save-as', label: 'Save As...'},
          {
            value: 'close',
            label: 'Close',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
        ],
      },
      {
        value: 'edit',
        label: 'Edit',
        children: [
          {
            value: 'undo',
            label: 'Undo',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
          {value: 'redo', label: 'Redo'},
          {value: 'cut', label: 'Cut'},
          {value: 'copy', label: 'Copy'},
          {value: 'paste', label: 'Paste'},
        ],
      },
      {
        value: 'view',
        label: 'View',
        children: [
          {
            value: 'zoom-in',
            label: 'Zoom In',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
          {value: 'zoom-out', label: 'Zoom Out'},
          {value: 'actual-size', label: 'Actual Size'},
          {
            value: 'fullscreen',
            label: 'Fullscreen',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
        ],
      },
      {
        value: 'tools',
        label: 'Tools',
        icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
        children: [
          {value: 'settings', label: 'Settings'},
          {
            value: 'plugins',
            label: 'Plugins',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
          {value: 'export', label: 'Export'},
        ],
      },
      {
        value: 'help',
        label: 'Help',
      },
    ],
  },
};

/** Single selection flyout menu with group and child icons. */
export const SingleSelectFlyout: Story = {
  args: {
    type: 'flyout',
    multiSelect: false,
    selectedValues: ['save', 'copy', 'zoom-in'],
    options: [
      {
        value: 'file',
        label: 'File',
        icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
        children: [
          {value: 'new', label: 'New'},
          {value: 'open', label: 'Open'},
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
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
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
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
          {value: 'zoom-out', label: 'Zoom Out'},
          {value: 'actual-size', label: 'Actual Size'},
          {value: 'fullscreen', label: 'Fullscreen'},
        ],
      },
      {
        value: 'help',
        label: 'Help',
      },
    ],
  },
};

/** Per-group selection flyout menu with group and child icons. */
export const PerGroupSelectFlyout: Story = {
  args: {
    type: 'flyout',
    selectPerGroup: true,
    selectedValues: ['save', 'copy', 'zoom-in'],
    options: [
      {
        value: 'file',
        label: 'File',
        icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
        children: [
          {value: 'new', label: 'New'},
          {value: 'open', label: 'Open'},
          {value: 'save', label: 'Save'},
          {value: 'save-as', label: 'Save As...'},
        ],
      },
      {
        value: 'edit',
        label: 'Edit',
        children: [
          {value: 'undo', label: 'Undo'},
          {value: 'redo', label: 'Redo'},
          {value: 'cut', label: 'Cut'},
          {
            value: 'copy',
            label: 'Copy',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
        ],
      },
      {
        value: 'view',
        label: 'View',
        children: [
          {
            value: 'zoom-in',
            label: 'Zoom In',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
          {value: 'zoom-out', label: 'Zoom Out'},
          {value: 'actual-size', label: 'Actual Size'},
          {value: 'fullscreen', label: 'Fullscreen'},
        ],
      },
      {
        value: 'help',
        label: 'Help',
      },
    ],
  },
};

/** Multi-column menu (no groups), mix of icons. */
export const MultiColumn: Story = {
  args: {
    type: 'multi',
    hasTitleBar: true,
    title: 'Multi-Column Selection',
    options: [
      {
        value: 'item1',
        label: 'Item 1',
        icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
      },
      {value: 'item2', label: 'Item 2'},
      {value: 'item3', label: 'Item 3'},
      {
        value: 'item4',
        label: 'Item 4',
        icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
      },
      {value: 'item5', label: 'Item 5'},
      {value: 'item6', label: 'Item 6'},
      {value: 'item7', label: 'Item 7'},
      {
        value: 'item8',
        label: 'Item 8',
        icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
      },
      {value: 'item9', label: 'Item 9'},
      {value: 'item10', label: 'Item 10'},
      {
        value: 'item11',
        label: 'Item 11',
        icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
      },
      {value: 'item12', label: 'Item 12'},
    ],
    selectedValues: ['item3', 'item7', 'item11'],
    itemsPerColumn: 4,
  },
};

/** Multi-column with subtitles/groups, group options have some icons. */
export const MultiColumnWithSubtitles: Story = {
  args: {
    type: 'multi-with-subtitles',
    hasTitleBar: true,
    title: 'Feature Selection',
    columnGroups: [
      {
        title: 'Subtitle 1',
        columns: 1,
        options: [
          {
            value: 'basic1',
            label: 'Item 1',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
          {value: 'basic2', label: 'Item 2'},
          {
            value: 'basic3',
            label: 'Item 3',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
          {value: 'basic4', label: 'Item 4'},
        ],
      },
      {
        title: 'Subtitle 2',
        columns: 1,
        options: [
          {value: 'advanced1', label: 'Item 1'},
          {value: 'advanced2', label: 'Item 2'},
          {
            value: 'advanced3',
            label: 'Item 3',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
          {value: 'advanced4', label: 'Item 4'},
        ],
      },
      {
        title: 'Subtitle 3',
        columns: 1,
        options: [
          {value: 'premium1', label: 'Item 1'},
          {
            value: 'premium2',
            label: 'Item 2',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
          {value: 'premium3', label: 'Item 3'},
          {
            value: 'premium4',
            label: 'Item 4',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
          {value: 'premium5', label: 'Item 5'},
          {
            value: 'premium6',
            label: 'Item 6',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
          {value: 'premium7', label: 'Item 7'},
        ],
      },
    ],
    selectedValues: ['basic1', 'advanced2', 'premium3'],
    itemsPerColumn: 5,
  },
};

/** Multi-column menu, only one option per column can be selected (group selection). */
export const MultiColumnGroupSelection: Story = {
  args: {
    type: 'multi',
    hasTitleBar: true,
    title: 'Multi-Column Selection (Group Select)',
    options: [
      {
        value: 'item1',
        label: 'Item 1',
        icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
      },
      {value: 'item2', label: 'Item 2'},
      {value: 'item3', label: 'Item 3'},
      {
        value: 'item4',
        label: 'Item 4',
        icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
      },
      {value: 'item5', label: 'Item 5'},
      {value: 'item6', label: 'Item 6'},
      {value: 'item7', label: 'Item 7'},
      {
        value: 'item8',
        label: 'Item 8',
        icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
      },
      {value: 'item9', label: 'Item 9'},
      {value: 'item10', label: 'Item 10'},
      {
        value: 'item11',
        label: 'Item 11',
        icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
      },
      {value: 'item12', label: 'Item 12'},
    ],
    selectedValues: ['item3', 'item7', 'item11'],
    itemsPerColumn: 4,
    selectPerGroup: true,
    multiSelect: true,
  },
};

/** Multi-column with subtitles/groups, only one option per group/column can be selected. */
export const MultiColumnWithSubtitlesGroupSelection: Story = {
  args: {
    type: 'multi-with-subtitles',
    hasTitleBar: true,
    title: 'Feature Selection (One Per Group)',
    columnGroups: [
      {
        title: 'Subtitle 1',
        columns: 1,
        options: [
          {
            value: 'basic1',
            label: 'Item 1',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
          {value: 'basic2', label: 'Item 2'},
          {
            value: 'basic3',
            label: 'Item 3',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
          {value: 'basic4', label: 'Item 4'},
        ],
      },
      {
        title: 'Subtitle 2',
        columns: 1,
        options: [
          {value: 'advanced1', label: 'Item 1'},
          {value: 'advanced2', label: 'Item 2'},
          {
            value: 'advanced3',
            label: 'Item 3',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
          {value: 'advanced4', label: 'Item 4'},
        ],
      },
      {
        title: 'Subtitle 3',
        columns: 1,
        options: [
          {value: 'premium1', label: 'Item 1'},
          {
            value: 'premium2',
            label: 'Item 2',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
          {value: 'premium3', label: 'Item 3'},
          {
            value: 'premium4',
            label: 'Item 4',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
          {value: 'premium5', label: 'Item 5'},
          {
            value: 'premium6',
            label: 'Item 6',
            icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
          },
          {value: 'premium7', label: 'Item 7'},
        ],
      },
    ],
    selectedValues: ['basic1', 'advanced2', 'premium3'],
    itemsPerColumn: 5,
    selectPerGroup: true,
    multiSelect: true,
  },
};
