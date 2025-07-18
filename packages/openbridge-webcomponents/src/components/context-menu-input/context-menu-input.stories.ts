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
    subtitle1: {
      control: 'text',
      description: 'First subtitle for multi-column layouts'
    },
    subtitle2: {
      control: 'text',
      description: 'Second subtitle for multi-column layouts'
    },
    multiSelect: {
      control: 'boolean',
      description: 'Whether multiple selections are allowed'
    },
    radioGroupName: {
      control: 'text',
      description: 'Name attribute for radio button groups'
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
    subtitle1: 'Subtitle 1',
    subtitle2: 'Subtitle 2',
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
      { value: 'feature1', label: 'Enable Feature 1' },
      { value: 'feature2', label: 'Enable Feature 2' },
      { value: 'feature3', label: 'Enable Feature 3' },
      { value: 'feature4', label: 'Enable Feature 4' },
      { value: 'feature5', label: 'Enable Feature 5' }
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
 * Flyout menu variant with arrow indicators for sub-menus.
 * Items can have nested flyout menus.
 */
export const FlyoutMenu: Story = {
  args: {
    type: 'flyout',
    options: [
      { value: 'file', label: 'File' },
      { value: 'edit-submenu', label: 'Edit' },
      { value: 'view-submenu', label: 'View' },
      { value: 'tools-submenu', label: 'Tools' },
      { value: 'help', label: 'Help' }
    ],
    selectedValues: ['edit-submenu'],
  }
};

/**
 * Multi-column layout for organizing large sets of options.
 * Options are distributed across multiple columns.
 */
export const MultiColumn: Story = {
  args: {
    type: 'multi',
    options: [
      { value: 'col1-1', label: 'Column 1 Item 1' },
      { value: 'col1-2', label: 'Column 1 Item 2' },
      { value: 'col1-3', label: 'Column 1 Item 3' },
      { value: 'col1-4', label: 'Column 1 Item 4' },
      { value: 'col2-1', label: 'Column 2 Item 1' },
      { value: 'col2-2', label: 'Column 2 Item 2' },
      { value: 'col2-3', label: 'Column 2 Item 3' },
      { value: 'col2-4', label: 'Column 2 Item 4' }
    ],
    selectedValues: ['col1-2', 'col2-1'],
    width: 400,
  }
};

/**
 * Multi-column layout with subtitle headers for section organization.
 * Includes subtitle bars to separate different sections.
 */
export const MultiColumnWithSubtitles: Story = {
  args: {
    type: 'multi-with-subtitles',
    options: [
      { value: 'basic1', label: 'Basic Option 1' },
      { value: 'basic2', label: 'Basic Option 2' },
      { value: 'basic3', label: 'Basic Option 3' },
      { value: 'advanced1', label: 'Advanced Option 1' },
      { value: 'advanced2', label: 'Advanced Option 2' },
      { value: 'advanced3', label: 'Advanced Option 3' }
    ],
    selectedValues: ['basic1', 'advanced2'],
    subtitle1: 'Basic Features',
    subtitle2: 'Advanced Features',
    width: 400,
  }
};

/**
 * Context menu with title bar and close button.
 * Useful for modal-like menu experiences.
 */
export const WithTitleBar: Story = {
  args: {
    type: 'checkboxes',
    hasTitleBar: true,
    title: 'Filter Options',
    options: [
      { value: 'active', label: 'Show Active Items' },
      { value: 'inactive', label: 'Show Inactive Items' },
      { value: 'pending', label: 'Show Pending Items' },
      { value: 'archived', label: 'Show Archived Items' }
    ],
    selectedValues: ['active', 'pending'],
  }
};

/**
 * Large scrollable menu demonstrating overflow behavior.
 * Shows how the menu handles many options with scrolling.
 */
export const ScrollableMenu: Story = {
  args: {
    type: 'regular',
    options: Array.from({ length: 20 }, (_, i) => ({
      value: `option${i + 1}`,
      label: `Menu Option ${i + 1}`
    })),
    selectedValues: ['option5', 'option12'],
    maxHeight: 200,
  }
};

/**
 * Real-world example: Document type filter menu.
 * Demonstrates a practical use case with meaningful options.
 */
export const DocumentTypeFilter: Story = {
  args: {
    type: 'nested-checkboxes',
    hasTitleBar: true,
    title: 'Document Types',
    options: [
      { value: 'contracts', label: 'Contracts' },
      { value: 'service-contracts', label: 'Service Contracts', level: 2 },
      { value: 'vendor-contracts', label: 'Vendor Contracts', level: 2 },
      { value: 'employment-contracts', label: 'Employment Contracts', level: 2 },
      { value: 'reports', label: 'Reports' },
      { value: 'financial-reports', label: 'Financial Reports', level: 2 },
      { value: 'status-reports', label: 'Status Reports', level: 2 },
      { value: 'technical-docs', label: 'Technical Documentation' },
      { value: 'specifications', label: 'Specifications', level: 2 },
      { value: 'manuals', label: 'User Manuals', level: 2 },
      { value: 'apis', label: 'API Documentation', level: 2 }
    ],
    selectedValues: ['contracts', 'service-contracts', 'reports'],
    width: 280,
  }
};

/**
 * Empty state showing how the menu behaves with no options.
 */
export const EmptyMenu: Story = {
  args: {
    type: 'regular',
    options: [],
    selectedValues: [],
    hasTitleBar: true,
    title: 'No Options Available',
  }
};

/**
 * Single option menu to test edge case behavior.
 */
export const SingleOption: Story = {
  args: {
    type: 'radio',
    options: [
      { value: 'only-option', label: 'Only Available Option' }
    ],
    selectedValues: [],
  }
};