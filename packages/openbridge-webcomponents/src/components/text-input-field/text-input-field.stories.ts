import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './text-input-field.js';
import {
  ObcTextInputField,
  HTMLInputTypeAttribute,
  ObcTextInputFieldTextAlign,
  ObcTextInputFieldSize,
  ObcTextInputFieldPlacement,
} from './text-input-field.js';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-search.js';

const meta: Meta<typeof ObcTextInputField> = {
  title: 'UI Components/Input Controls/Text Input Field',
  tags: ['autodocs', '6.0'],
  component: 'obc-text-input-field',
  args: {},
  argTypes: {
    value: {
      control: {type: 'text'},
      description: 'The current text value displayed in the input',
    },
    placeholder: {
      control: {type: 'text'},
      description: 'Placeholder text shown when the input is empty',
    },
    type: {
      control: {type: 'select'},
      options: Object.values(HTMLInputTypeAttribute),
      description: 'HTML input type (text, password, email, etc.)',
    },
    textAlign: {
      control: {type: 'select'},
      options: Object.values(ObcTextInputFieldTextAlign),
      description: 'Text alignment in the input field',
    },
    disabled: {
      control: {type: 'boolean'},
      description: 'Disables the input field',
    },
    error: {
      control: {type: 'boolean'},
      description: 'Displays error styling and sets aria-invalid',
    },
    errorText: {
      control: {type: 'text'},
      description:
        'Error message text displayed below the field when error is true',
    },
    size: {
      control: {type: 'select'},
      options: Object.values(ObcTextInputFieldSize),
      description: 'Size variant - Regular (32px) or Large (48px)',
    },
    hasLeadingIcon: {
      control: {type: 'boolean'},
      description: 'Whether to show a leading icon slot',
    },
    hasClearButton: {
      control: {type: 'boolean'},
      description: 'Shows a clear button when the input has a value',
    },
    helperText: {
      control: {type: 'text'},
      description: 'Helper text displayed below the field',
    },
    hasHelperIcon: {
      control: {type: 'boolean'},
      description: 'Whether to show an icon before the helper/error text',
    },
    helperPlacement: {
      control: {type: 'select'},
      options: Object.values(ObcTextInputFieldPlacement),
      description:
        'Placement of the helper/error text - Left, Center, or Right',
    },
    label: {
      control: {type: 'text'},
      description: 'The label text displayed above the input field',
    },
    required: {
      control: {type: 'boolean'},
      description:
        'Shows a required indicator next to the label and sets aria-required',
    },
    hasLabelIcon: {
      control: {type: 'boolean'},
      description: 'Whether to show an icon before the label text',
    },
    labelPlacement: {
      control: {type: 'select'},
      options: Object.values(ObcTextInputFieldPlacement),
      description: 'Placement of the label text - Left, Center, or Right',
    },
    readonly: {
      control: {type: 'boolean'},
      description:
        'Makes the input read-only (allows selection/copying but not editing)',
    },
    name: {
      control: {type: 'text'},
      description: 'Name attribute for form integration',
    },
    maxlength: {
      control: {type: 'number'},
      description: 'Maximum number of characters allowed',
    },
    minlength: {
      control: {type: 'number'},
      description: 'Minimum number of characters required',
    },
  },
  parameters: {
    actions: {
      handles: ['input', 'change', 'focusin', 'blur', 'clear'],
    },
  },
  render: (args) => {
    return html`
      <div style="width: 260px;">
        <obc-text-input-field
          .value=${args.value ?? ''}
          .placeholder=${args.placeholder ?? ''}
          .type=${args.type ?? HTMLInputTypeAttribute.Text}
          .textAlign=${args.textAlign ?? ObcTextInputFieldTextAlign.Left}
          .size=${args.size ?? ObcTextInputFieldSize.Regular}
          ?disabled=${args.disabled}
          ?readonly=${args.readonly}
          ?error=${args.error}
          .errorText=${args.errorText ?? ''}
          .name=${args.name ?? ''}
          ?hasLeadingIcon=${args.hasLeadingIcon}
          ?hasClearButton=${args.hasClearButton}
          .helperText=${args.helperText ?? ''}
          ?hasHelperIcon=${args.hasHelperIcon}
          .helperPlacement=${args.helperPlacement ??
          ObcTextInputFieldPlacement.Left}
          .label=${args.label ?? ''}
          ?required=${args.required}
          ?hasLabelIcon=${args.hasLabelIcon}
          .labelPlacement=${args.labelPlacement ??
          ObcTextInputFieldPlacement.Left}
          .rejectUpdates=${args.rejectUpdates}
          .rejectUpdatesOnFocus=${args.rejectUpdatesOnFocus}
        >
          ${args.hasLeadingIcon
            ? html`<obi-search slot="leading-icon"></obi-search>`
            : ''}
          ${args.hasLabelIcon
            ? html`<obi-placeholder slot="label-icon"></obi-placeholder>`
            : ''}
          ${args.hasHelperIcon
            ? html`<obi-placeholder slot="helper-icon"></obi-placeholder>`
            : ''}
        </obc-text-input-field>
      </div>
    `;
  },
} satisfies Meta<ObcTextInputField>;

export default meta;
type Story = StoryObj<ObcTextInputField>;

// =============================================================================
// BASIC
// =============================================================================

export const Default: Story = {
  args: {
    value: 'Hello World',
    placeholder: 'Enter text...',
  },
};

export const WithPlaceholder: Story = {
  args: {
    value: '',
    placeholder: 'Type something...',
  },
};

export const WithLeadingIcon: Story = {
  args: {
    value: 'Search query',
    placeholder: 'Search...',
    hasLeadingIcon: true,
  },
};

export const WithClearButton: Story = {
  args: {
    value: 'Clear me',
    placeholder: 'Enter text...',
    hasClearButton: true,
  },
};

export const WithLeadingIconAndClearButton: Story = {
  args: {
    value: 'Search term',
    placeholder: 'Search...',
    hasLeadingIcon: true,
    hasClearButton: true,
  },
};

// =============================================================================
// ALIGNMENT
// =============================================================================

export const AlignLeft: Story = {
  args: {
    value: 'Left aligned',
    textAlign: ObcTextInputFieldTextAlign.Left,
  },
};

export const AlignCenter: Story = {
  args: {
    value: 'Centered',
    textAlign: ObcTextInputFieldTextAlign.Center,
  },
};

// =============================================================================
// SIZE
// =============================================================================

export const SizeRegular: Story = {
  args: {
    value: 'Regular size',
    size: ObcTextInputFieldSize.Regular,
  },
};

export const SizeLarge: Story = {
  args: {
    value: 'Large size',
    size: ObcTextInputFieldSize.Large,
  },
};

// =============================================================================
// LABEL
// =============================================================================

export const WithLabel: Story = {
  args: {
    value: 'John Doe',
    label: 'Full Name',
  },
};

export const WithLabelRequired: Story = {
  args: {
    value: '',
    placeholder: 'Enter your name',
    label: 'Full Name',
    required: true,
  },
};

export const WithLabelIcon: Story = {
  args: {
    value: 'Jane Doe',
    label: 'Contact Name',
    hasLabelIcon: true,
  },
};

export const LabelPlacementLeft: Story = {
  args: {
    value: 'Left label',
    label: 'Name',
    labelPlacement: ObcTextInputFieldPlacement.Left,
  },
};

export const LabelPlacementCenter: Story = {
  args: {
    value: 'Centered',
    label: 'Title',
    labelPlacement: ObcTextInputFieldPlacement.Center,
    textAlign: ObcTextInputFieldTextAlign.Center,
  },
};

export const LabelPlacementRight: Story = {
  args: {
    value: 'Right label',
    label: 'Code',
    labelPlacement: ObcTextInputFieldPlacement.Right,
  },
};

// =============================================================================
// HELPER TEXT
// =============================================================================

export const WithHelperText: Story = {
  args: {
    value: '',
    placeholder: 'Enter email',
    helperText: 'We will never share your email',
  },
};

export const WithHelperTextIcon: Story = {
  args: {
    value: 'example@email.com',
    helperText: 'Valid email format',
    hasHelperIcon: true,
  },
};

export const HelperPlacementLeft: Story = {
  args: {
    value: 'Some text',
    helperText: 'Left aligned helper',
    helperPlacement: ObcTextInputFieldPlacement.Left,
  },
};

export const HelperPlacementCenter: Story = {
  args: {
    value: 'Centered',
    helperText: 'Centered helper text',
    helperPlacement: ObcTextInputFieldPlacement.Center,
    textAlign: ObcTextInputFieldTextAlign.Center,
  },
};

export const HelperPlacementRight: Story = {
  args: {
    value: 'Some text',
    helperText: 'Right aligned helper',
    helperPlacement: ObcTextInputFieldPlacement.Right,
  },
};

// =============================================================================
// INPUT TYPES
// =============================================================================

export const TypeText: Story = {
  args: {
    value: 'Plain text',
    type: HTMLInputTypeAttribute.Text,
    label: 'Text Input',
  },
};

export const TypePassword: Story = {
  args: {
    value: 'secret123',
    type: HTMLInputTypeAttribute.Password,
    label: 'Password',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Password fields automatically include a visibility toggle button.',
      },
    },
  },
};

export const TypePasswordWithClearButton: Story = {
  args: {
    value: 'secret123',
    type: HTMLInputTypeAttribute.Password,
    label: 'Password',
    hasClearButton: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Password field with both visibility toggle (left) and clear button (right). The visibility toggle appears first, then the clear button.',
      },
    },
  },
};

export const TypeEmail: Story = {
  args: {
    value: 'user@example.com',
    type: HTMLInputTypeAttribute.Email,
    label: 'Email Address',
  },
};

export const TypeSearch: Story = {
  args: {
    value: '',
    placeholder: 'Search...',
    type: HTMLInputTypeAttribute.Search,
    hasLeadingIcon: true,
    hasClearButton: true,
  },
};

// =============================================================================
// STATES
// =============================================================================

export const Disabled: Story = {
  args: {
    value: 'Cannot edit',
    label: 'Disabled Field',
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    value: 'Select and copy me',
    label: 'Read-only Field',
    readonly: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Read-only fields allow selection and copying but prevent editing.',
      },
    },
  },
};

export const Error: Story = {
  args: {
    value: 'invalid-email',
    error: true,
    errorText: 'Please enter a valid email address',
  },
};

export const ErrorWithLabel: Story = {
  args: {
    value: '',
    label: 'Email',
    required: true,
    error: true,
    errorText: 'This field is required',
  },
};

export const ErrorWithIcon: Story = {
  args: {
    value: 'bad input',
    error: true,
    errorText: 'Invalid format',
    hasHelperIcon: true,
  },
};

// =============================================================================
// COMPLETE EXAMPLES
// =============================================================================

export const Complete: Story = {
  args: {
    value: 'John Smith',
    label: 'Full Name',
    required: true,
    hasLeadingIcon: true,
    helperText: 'Enter your legal name as it appears on your ID',
  },
};

export const CompleteCenter: Story = {
  args: {
    value: 'VESSEL-001',
    label: 'Vessel ID',
    required: true,
    helperText: 'Unique vessel identifier',
    labelPlacement: ObcTextInputFieldPlacement.Center,
    helperPlacement: ObcTextInputFieldPlacement.Center,
    textAlign: ObcTextInputFieldTextAlign.Center,
  },
};

export const CompleteDisabled: Story = {
  args: {
    value: 'System Generated',
    label: 'Reference Number',
    hasLeadingIcon: true,
    helperText: 'Auto-generated by system',
    disabled: true,
  },
};

export const CompleteError: Story = {
  args: {
    value: 'invalid',
    label: 'Callsign',
    required: true,
    hasLeadingIcon: true,
    error: true,
    errorText: 'Callsign must be 4-7 characters',
  },
};

export const SearchField: Story = {
  args: {
    value: '',
    placeholder: 'Search vessels...',
    hasLeadingIcon: true,
    hasClearButton: true,
    size: ObcTextInputFieldSize.Large,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A search input with leading search icon and built-in clear button.',
      },
    },
  },
};
