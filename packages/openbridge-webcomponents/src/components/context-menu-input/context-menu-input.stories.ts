import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ObcContextMenuInput } from './context-menu-input.js';
import './context-menu-input.js';

const meta: Meta<typeof ObcContextMenuInput> = {
  title: 'UI Components/Input/ContextMenuInput',
  tags: ['6.0'],
  component: 'obc-context-menu-input',
  argTypes: {
    type: {
      control: 'select',
      options: ['regular', 'radio', 'checkboxes', 'nested-checkboxes', 'flyout', 'multi', 'multi-with-subtitles'],
      description: 'The variant type of context menu to display'
    },
    options: {
      control: 'object',
      description: 'Array of menu options with value, label, and optional level'
    },
    columnGroups: {
      control: 'object',
      description: 'Array of column groups for multi-with-subtitles layout'
    },
    selectedValues: {
      control: 'object',
      description: 'Array of currently selected option values'
    },
    hasTitleBar: {
      control: 'boolean',
      description: 'Whether to show a title bar with close button'
    },
    title: {
      control: 'text',
      description: 'Title text displayed in the title bar'
    },
    multiSelect: {
      control: 'boolean',
      description: 'Whether multiple selections are allowed'
    },
    radioGroupName: {
      control: 'text',
      description: 'Name attribute for radio button groups'
    },
    itemsPerColumn: {
      control: 'number',
      description: 'Number of items per column in multi-column layouts'
    },
    width: {
      control: 'number',
      description: 'Width of the context menu in pixels'
    },
    maxHeight: {
      control: 'number',
      description: 'Maximum height before scrolling'
    },
  },
  args: {
    type: 'regular',
    options: [
      { value: 'option1', label: 'First Option' },
      { value: 'option2', label: 'Second Option' },
      { value: 'option3', label: 'Third Option' },
      { value: 'option4', label: 'Fourth Option' },
      { value: 'option5', label: 'Fifth Option' },
    ],
    selectedValues: ['option2'],
    hasTitleBar: false,
    title: 'Menu',
    itemsPerColumn: 8,
    width: 200,
    maxHeight: 300,
  },
} satisfies Meta<ObcContextMenuInput>;

export default meta;
type Story = StoryObj<ObcContextMenuInput>;

/**
 * Default regular context menu with simple label-only items.
 */
export const Regular: Story = {};

/**
 * Radio button variant for single selection scenarios.
 * Only one option can be selected at a time.
 */
export const RadioButtons: Story = {
  args: {
    type: 'radio',
    options: [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
      { value: 'xlarge', label: 'Extra Large' }
    ],
    selectedValues: ['medium'],
  }
};

/**
 * Checkbox variant for multi-selection scenarios.
 * Multiple options can be selected simultaneously.
 */
export const Checkboxes: Story = {
  args: {
    type: 'checkboxes',
    options: [
      { value: 'feature1', label: 'Feature 1' },
      { value: 'feature2', label: 'Feature 2' },
      { value: 'feature3', label: 'Feature 3' },
      { value: 'feature4', label: 'Feature 4' },
      { value: 'feature5', label: 'Feature 5' }
    ],
    selectedValues: ['feature1', 'feature3'],
  }
};

/**
 * Nested checkboxes with hierarchical indentation.
 * Shows parent-child relationships between options.
 */
export const NestedCheckboxes: Story = {
  args: {
    type: 'nested-checkboxes',
    options: [
      { value: 'documents', label: 'Documents' },
      { value: 'reports', label: 'Reports', level: 2 },
      { value: 'monthly', label: 'Monthly Reports', level: 3 },
      { value: 'quarterly', label: 'Quarterly Reports', level: 3 },
      { value: 'presentations', label: 'Presentations', level: 2 },
      { value: 'images', label: 'Images' },
      { value: 'photos', label: 'Photos', level: 2 },
      { value: 'graphics', label: 'Graphics', level: 2 }
    ],
    selectedValues: ['documents', 'reports', 'monthly', 'images'],
  }
};

/**
 * Action-only flyout menu with no selection state.
 * Items trigger actions but don't show checkmarks.
 * Flyout closes after clicking any item.
 */
export const ActionOnlyFlyout: Story = {
  args: {
    type: 'flyout',
    multiSelect: false, // Explicitly disable multi-select
    selectedValues: [], // No items selected - pure action menu
    options: [
      { 
        value: 'file', 
        label: 'File',
        children: [
          { value: 'new', label: 'New' },
          { value: 'open', label: 'Open' },
          { value: 'save', label: 'Save' },
          { value: 'save-as', label: 'Save As...' },
          { value: 'close', label: 'Close' }
        ]
      },
      { 
        value: 'edit', 
        label: 'Edit',
        children: [
          { value: 'undo', label: 'Undo' },
          { value: 'redo', label: 'Redo' },
          { value: 'cut', label: 'Cut' },
          { value: 'copy', label: 'Copy' },
          { value: 'paste', label: 'Paste' }
        ]
      },
      { 
        value: 'view', 
        label: 'View',
        children: [
          { value: 'zoom-in', label: 'Zoom In' },
          { value: 'zoom-out', label: 'Zoom Out' },
          { value: 'actual-size', label: 'Actual Size' },
          { value: 'fullscreen', label: 'Fullscreen' }
        ]
      },
      { 
        value: 'help', 
        label: 'Help'
      }
    ],
  }
};

/**
 * Multi-select flyout menu where multiple items can be selected within each submenu group.
 * Shows checkmarks on selected items. Each submenu allows multiple selections.
 */
export const MultiSelectFlyout: Story = {
  args: {
    type: 'flyout',
    multiSelect: true, // Allow multiple selections per submenu
    selectedValues: ['save', 'save-as', 'copy', 'paste', 'zoom-in', 'fullscreen'], // Multiple from each group
    options: [
      { 
        value: 'file', 
        label: 'File',
        children: [
          { value: 'new', label: 'New' },
          { value: 'open', label: 'Open' },
          { value: 'save', label: 'Save' },
          { value: 'save-as', label: 'Save As...' },
          { value: 'close', label: 'Close' }
        ]
      },
      { 
        value: 'edit', 
        label: 'Edit',
        children: [
          { value: 'undo', label: 'Undo' },
          { value: 'redo', label: 'Redo' },
          { value: 'cut', label: 'Cut' },
          { value: 'copy', label: 'Copy' },
          { value: 'paste', label: 'Paste' }
        ]
      },
      { 
        value: 'view', 
        label: 'View',
        children: [
          { value: 'zoom-in', label: 'Zoom In' },
          { value: 'zoom-out', label: 'Zoom Out' },
          { value: 'actual-size', label: 'Actual Size' },
          { value: 'fullscreen', label: 'Fullscreen' }
        ]
      },
      { 
        value: 'tools', 
        label: 'Tools',
        children: [
          { value: 'settings', label: 'Settings' },
          { value: 'plugins', label: 'Plugins' },
          { value: 'export', label: 'Export' }
        ]
      },
      { 
        value: 'help', 
        label: 'Help'
      }
    ],
  }
};

/**
 * Single selection flyout menu where only one item can be selected per submenu group.
 * Shows checkmark on selected items. Each submenu operates independently.
 */
export const SingleSelectFlyout: Story = {
  args: {
    type: 'flyout',
    multiSelect: false, // Single selection per submenu
    selectedValues: ['save', 'copy', 'zoom-in'], // One from each submenu group
    options: [
      { 
        value: 'file', 
        label: 'File',
        children: [
          { value: 'new', label: 'New' },
          { value: 'open', label: 'Open' },
          { value: 'save', label: 'Save' },
          { value: 'save-as', label: 'Save As...' }
        ]
      },
      { 
        value: 'edit', 
        label: 'Edit',
        children: [
          { value: 'undo', label: 'Undo' },
          { value: 'redo', label: 'Redo' },
          { value: 'cut', label: 'Cut' },
          { value: 'copy', label: 'Copy' }
        ]
      },
      { 
        value: 'view', 
        label: 'View',
        children: [
          { value: 'zoom-in', label: 'Zoom In' },
          { value: 'zoom-out', label: 'Zoom Out' },
          { value: 'actual-size', label: 'Actual Size' },
          { value: 'fullscreen', label: 'Fullscreen' }
        ]
      },
      { 
        value: 'help', 
        label: 'Help'
      }
    ],
  }
};

/**
 * Per-group selection flyout menu where one item can be selected per submenu group.
 * Allows selecting one item from File menu, one from Edit menu, etc.
 */
export const PerGroupSelectFlyout: Story = {
  args: {
    type: 'flyout',
    selectPerGroup: true, // Enable per-group selection
    selectedValues: ['save', 'copy', 'zoom-in'], // One from each group
    options: [
      { 
        value: 'file', 
        label: 'File',
        children: [
          { value: 'new', label: 'New' },
          { value: 'open', label: 'Open' },
          { value: 'save', label: 'Save' },
          { value: 'save-as', label: 'Save As...' }
        ]
      },
      { 
        value: 'edit', 
        label: 'Edit',
        children: [
          { value: 'undo', label: 'Undo' },
          { value: 'redo', label: 'Redo' },
          { value: 'cut', label: 'Cut' },
          { value: 'copy', label: 'Copy' }
        ]
      },
      { 
        value: 'view', 
        label: 'View',
        children: [
          { value: 'zoom-in', label: 'Zoom In' },
          { value: 'zoom-out', label: 'Zoom Out' },
          { value: 'actual-size', label: 'Actual Size' },
          { value: 'fullscreen', label: 'Fullscreen' }
        ]
      },
      { 
        value: 'help', 
        label: 'Help'
      }
    ],
  }
};

/**
 * Multi-column layout for organizing large sets of options.
 * Options are distributed across multiple columns for better space utilization.
 */
export const MultiColumn: Story = {
  args: {
    type: 'multi',
    hasTitleBar: true,
    title: 'Multi-Column Selection',
    options: [
      { value: 'item1', label: 'Item 1' },
      { value: 'item2', label: 'Item 2' },
      { value: 'item3', label: 'Item 3' },
      { value: 'item4', label: 'Item 4' },
      { value: 'item5', label: 'Item 5' },
      { value: 'item6', label: 'Item 6' },
      { value: 'item7', label: 'Item 7' },
      { value: 'item8', label: 'Item 8' },
      { value: 'item9', label: 'Item 9' },
      { value: 'item10', label: 'Item 10' },
      { value: 'item11', label: 'Item 11' },
      { value: 'item12', label: 'Item 12' }
    ],
    selectedValues: ['item3', 'item7', 'item11'],
    itemsPerColumn: 4,
    width: 600,
    maxHeight: 400,
  }
};

/**
 * Multi-column layout with subtitle headers for section organization.
 * Each column group has its own header creating distinct sections.
 */
export const MultiColumnWithSubtitles: Story = {
  args: {
    type: 'multi-with-subtitles',
    hasTitleBar: true,
    title: 'Feature Selection',
    columnGroups: [
      {
        title: 'Basic Features',
        columns: 1,
        options: [
          { value: 'basic1', label: 'Basic Feature 1' },
          { value: 'basic2', label: 'Basic Feature 2' },
          { value: 'basic3', label: 'Basic Feature 3' },
          { value: 'basic4', label: 'Basic Feature 4' }
        ]
      },
      {
        title: 'Advanced Features',
        columns: 1,
        options: [
          { value: 'advanced1', label: 'Advanced Feature 1' },
          { value: 'advanced2', label: 'Advanced Feature 2' },
          { value: 'advanced3', label: 'Advanced Feature 3' },
          { value: 'advanced4', label: 'Advanced Feature 4' }
        ]
      },
      {
        title: 'Premium Features',
        columns: 1,
        options: [
          { value: 'premium1', label: 'Premium Feature 1' },
          { value: 'premium2', label: 'Premium Feature 2' },
          { value: 'premium3', label: 'Premium Feature 3' },
          
        ]
      }
    ],
    selectedValues: ['basic1', 'advanced2', 'premium3'],
    itemsPerColumn: 5,
    width: 900,
    maxHeight: 400,
  }
};