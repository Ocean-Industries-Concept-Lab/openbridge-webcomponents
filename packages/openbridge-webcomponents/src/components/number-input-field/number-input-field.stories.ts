import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './number-input-field.js';
import {
  ObcNumberInputField,
  ObcNumberInputFieldTextAlign,
  ObcNumberInputFieldSize,
  ObcNumberInputFieldPlacement,
} from './number-input-field.js';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-ship.js';

const meta: Meta<typeof ObcNumberInputField> = {
  title: 'UI Components/Input Controls/Number Input Field',
  tags: ['autodocs', '6.0'],
  component: 'obc-number-input-field',
  args: {},
  argTypes: {
    value: {
      control: {type: 'number'},
      description: 'The current numerical value displayed in the input',
    },
    unit: {
      control: {type: 'text'},
      description:
        'The unit text (e.g., "kg", "%", "ms"). When set, the unit is displayed.',
    },
    placeholder: {
      control: {type: 'text'},
      description: 'Placeholder text shown when the input is empty',
    },
    textAlign: {
      control: {type: 'select'},
      options: Object.values(ObcNumberInputFieldTextAlign),
      description: 'Content alignment / unit placement',
    },
    disabled: {
      control: {type: 'boolean'},
      description: 'Disables the input field',
    },
    readonly: {
      control: {type: 'boolean'},
      description:
        'Makes the value selectable and copyable but not editable, and removes the hover and pressed states',
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
      options: Object.values(ObcNumberInputFieldSize),
      description: 'Size variant - Regular (32px) or Large (48px)',
    },
    hasLeadingIcon: {
      control: {type: 'boolean'},
      description: 'Whether to show a leading icon slot',
    },
    helperText: {
      control: {type: 'text'},
      description:
        'Helper text displayed below the field. When set, the helper text is shown.',
    },
    hasHelperIcon: {
      control: {type: 'boolean'},
      description: 'Whether to show an icon before the helper/error text',
    },
    helperPlacement: {
      control: {type: 'select'},
      options: Object.values(ObcNumberInputFieldPlacement),
      description: 'Placement of the helper/error text - Left or Center',
    },
    label: {
      control: {type: 'text'},
      description:
        'The label text displayed above the input field. When set, the label is shown.',
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
      options: Object.values(ObcNumberInputFieldPlacement),
      description: 'Placement of the label text - Left, Center, or Right',
    },
  },
  parameters: {
    actions: {
      handles: ['input', 'change', 'focusin', 'blur'],
    },
  },
  render: (args) => {
    return html`
      <div style="width: 260px;">
        <obc-number-input-field
          .value=${args.value ?? NaN}
          .unit=${args.unit ?? ''}
          .placeholder=${args.placeholder ?? ''}
          .textAlign=${args.textAlign ?? ObcNumberInputFieldTextAlign.Right}
          .size=${args.size ?? ObcNumberInputFieldSize.Regular}
          ?disabled=${args.disabled}
          ?readonly=${args.readonly}
          ?error=${args.error}
          .errorText=${args.errorText ?? ''}
          ?hasLeadingIcon=${args.hasLeadingIcon}
          .helperText=${args.helperText ?? ''}
          ?hasHelperIcon=${args.hasHelperIcon}
          .helperPlacement=${args.helperPlacement ??
          ObcNumberInputFieldPlacement.Left}
          .label=${args.label ?? ''}
          ?required=${args.required}
          ?hasLabelIcon=${args.hasLabelIcon}
          .labelPlacement=${args.labelPlacement ??
          ObcNumberInputFieldPlacement.Left}
          .decimalSeparator=${args.decimalSeparator ?? '.'}
          .groupSeparator=${args.groupSeparator ?? ','}
          .minFractionDigits=${args.minFractionDigits ?? 0}
          .maxFractionDigits=${args.maxFractionDigits ?? undefined}
          @input=${console.log}
          @change=${console.log}
        >
          ${args.hasLeadingIcon
            ? html`<obi-ship slot="leading-icon"></obi-ship>`
            : ''}
          ${args.hasLabelIcon
            ? html`<obi-placeholder slot="label-icon"></obi-placeholder>`
            : ''}
          ${args.hasHelperIcon
            ? html`<obi-placeholder slot="helper-icon"></obi-placeholder>`
            : ''}
        </obc-number-input-field>
      </div>
    `;
  },
} satisfies Meta<ObcNumberInputField>;

export default meta;
type Story = StoryObj<ObcNumberInputField>;

// =============================================================================
// BASIC
// =============================================================================

export const Default: Story = {
  args: {
    value: 123.45,
    unit: 'bar',
  },
};

export const WithPlaceholder: Story = {
  args: {
    value: NaN,
    unit: 'kg',
    placeholder: '0.0',
  },
};

export const WithLeadingIcon: Story = {
  args: {
    value: 18.5,
    unit: 'knots',
    hasLeadingIcon: true,
  },
};

// =============================================================================
// ALIGNMENT
// =============================================================================

export const AlignRight: Story = {
  args: {
    value: 456.78,
    unit: 'bar',
    textAlign: ObcNumberInputFieldTextAlign.Right,
  },
};

export const AlignCenter: Story = {
  args: {
    value: 22.5,
    unit: '°C',
    textAlign: ObcNumberInputFieldTextAlign.Center,
  },
};

export const AlignRightUnitOutside: Story = {
  args: {
    value: 1500,
    unit: 'RPM',
    textAlign: ObcNumberInputFieldTextAlign.RightUnitOutside,
  },
};

// =============================================================================
// CARET PLACEMENT
// =============================================================================

/**
 * Reports where the caret landed, so a click can be checked against where it was
 * aimed. Runs after the click so the component has settled.
 */
const reportCaret = (event: Event) => {
  const row = event.currentTarget as HTMLElement;
  const field = row.querySelector(
    'obc-number-input-field'
  ) as ObcNumberInputField | null;
  const output = row.querySelector('.caret-readout') as HTMLElement | null;
  if (!field || !output) return;
  setTimeout(() => {
    const input = field.shadowRoot?.querySelector(
      'input'
    ) as HTMLInputElement | null;
    output.textContent = input
      ? `caret ${input.selectionStart} of ${input.value.length}  ·  "${input.value}"`
      : '';
  });
};

const caretRow = (caption: string, field: ReturnType<typeof html>) => html`
  <div
    style="display:flex; align-items:center; gap:16px; margin-bottom:16px;"
    @click=${reportCaret}
  >
    <span style="width:240px; font:12px sans-serif; opacity:.8;"
      >${caption}</span
    >
    <div style="width:320px;">${field}</div>
    <code
      class="caret-readout"
      style="font:12px monospace; opacity:.8; min-width:220px;"
      >click the field</code
    >
  </div>
`;

const caretField = (
  textAlign: ObcNumberInputFieldTextAlign,
  hasLeadingIcon = false
) => html`
  <obc-number-input-field
    label="SV"
    unit="m/s"
    .value=${1234567.89}
    .textAlign=${textAlign}
    .maxFractionDigits=${6}
    ?hasLeadingIcon=${hasLeadingIcon}
  >
    ${hasLeadingIcon ? html`<obi-ship slot="leading-icon"></obi-ship>` : ''}
  </obc-number-input-field>
`;

/**
 * Every surface of the field is clickable. Inside the value the browser places the
 * caret from the real glyph metrics; the label, unit, icon and padding hold no text,
 * so the caret anchors to whichever end of the value was clicked towards.
 *
 * `center` is the interesting one: the input is only as wide as the digits, so most
 * of the field is padding rather than input.
 */
export const CaretPlacement: Story = {
  render: () => html`
    <div style="padding:8px;">
      ${caretRow(
        'right (default)',
        caretField(ObcNumberInputFieldTextAlign.Right)
      )}
      ${caretRow(
        'center — narrow input, wide padding',
        caretField(ObcNumberInputFieldTextAlign.Center)
      )}
      ${caretRow(
        'right-unit-outside',
        caretField(ObcNumberInputFieldTextAlign.RightUnitOutside)
      )}
      ${caretRow(
        'right + leading icon',
        caretField(ObcNumberInputFieldTextAlign.Right, true)
      )}
    </div>
  `,
};

/**
 * The same fields under CSS `zoom`, which Perspective and other hosts apply for
 * per-user UI scaling. Caret placement must be identical to `CaretPlacement` at
 * every scale — an offset that grows as you click further from the right edge means
 * pointer coordinates are being compared against unscaled metrics somewhere.
 */
export const CaretPlacementUnderZoom: Story = {
  render: () => html`
    <div style="padding:8px;">
      ${[0.5, 0.75, 1, 1.25].map(
        (zoom) => html`
          <div
            style="zoom:${zoom}; border-bottom:1px dashed currentColor; padding:8px 0;"
          >
            ${caretRow(
              `zoom ${zoom} · right`,
              caretField(ObcNumberInputFieldTextAlign.Right)
            )}
            ${caretRow(
              `zoom ${zoom} · center`,
              caretField(ObcNumberInputFieldTextAlign.Center)
            )}
          </div>
        `
      )}
    </div>
  `,
};

/**
 * Disabled fields must not move the caret or take focus. Readonly fields stay
 * focusable so the value can be selected and copied, but the field never moves the
 * caret for them either — the browser's own placement inside the value is all they
 * get.
 */
export const CaretPlacementInert: Story = {
  render: () => html`
    <div style="padding:8px;">
      ${caretRow(
        'disabled',
        html`<obc-number-input-field
          label="SV"
          unit="m/s"
          .value=${1234567.89}
          .maxFractionDigits=${6}
          disabled
        ></obc-number-input-field>`
      )}
      ${caretRow(
        'readonly',
        html`<obc-number-input-field
          label="SV"
          unit="m/s"
          .value=${1234567.89}
          .maxFractionDigits=${6}
          readonly
        ></obc-number-input-field>`
      )}
    </div>
  `,
};

// =============================================================================
// DECIMAL SEPARATOR
// =============================================================================

export const Formatting: Story = {
  args: {
    value: 12312.45,
    unit: 'bar',
    decimalSeparator: '.',
    groupSeparator: ',',
    minFractionDigits: 3,
    maxFractionDigits: 3,
  },
};

// =============================================================================
// SIZE
// =============================================================================

export const SizeRegular: Story = {
  args: {
    value: 123.45,
    unit: 'bar',
    size: ObcNumberInputFieldSize.Regular,
  },
};

export const SizeLarge: Story = {
  args: {
    value: 123.45,
    unit: 'bar',
    size: ObcNumberInputFieldSize.Large,
  },
};

// =============================================================================
// LABEL
// =============================================================================

export const WithLabel: Story = {
  args: {
    value: 75,
    unit: '%',
    label: 'Engine Load',
  },
};

export const WithLabelRequired: Story = {
  args: {
    value: NaN,
    unit: 'bar',
    label: 'Oil Pressure',
    required: true,
  },
};

export const WithLabelIcon: Story = {
  args: {
    value: 25.5,
    unit: '°C',
    label: 'Temperature',
    hasLabelIcon: true,
  },
};

export const LabelPlacementLeft: Story = {
  args: {
    value: 42,
    unit: 'kg',
    label: 'Weight',
    labelPlacement: ObcNumberInputFieldPlacement.Left,
  },
};

export const LabelPlacementCenter: Story = {
  args: {
    value: 50,
    unit: '%',
    label: 'Progress',
    labelPlacement: ObcNumberInputFieldPlacement.Center,
    textAlign: ObcNumberInputFieldTextAlign.Center,
  },
};

export const LabelPlacementRight: Story = {
  args: {
    value: 42,
    unit: 'kg',
    label: 'Weight',
    labelPlacement: ObcNumberInputFieldPlacement.Right,
  },
};

// =============================================================================
// HELPER TEXT
// =============================================================================

export const WithHelperText: Story = {
  args: {
    value: 3.5,
    unit: 'bar',
    helperText: 'Normal range: 3.0 - 4.5 bar',
  },
};

export const WithHelperTextIcon: Story = {
  args: {
    value: 25,
    unit: '°C',
    helperText: 'Optimal temperature',
    hasHelperIcon: true,
  },
};

export const HelperPlacementLeft: Story = {
  args: {
    value: 180,
    unit: 'cm',
    helperText: 'Height measurement',
    helperPlacement: ObcNumberInputFieldPlacement.Left,
  },
};

export const HelperPlacementCenter: Story = {
  args: {
    value: 100,
    unit: '%',
    helperText: 'Progress complete',
    helperPlacement: ObcNumberInputFieldPlacement.Center,
    textAlign: ObcNumberInputFieldTextAlign.Center,
  },
};

export const HelperPlacementRight: Story = {
  args: {
    value: 180,
    unit: 'cm',
    helperText: 'Height measurement',
    helperPlacement: ObcNumberInputFieldPlacement.Right,
  },
};

// =============================================================================
// STATES
// =============================================================================

export const Disabled: Story = {
  args: {
    value: 50,
    unit: '%',
    label: 'Throttle Position',
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    value: 50,
    unit: '%',
    label: 'Throttle Position',
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
    value: 999,
    unit: 'kPa',
    error: true,
    errorText: 'Value exceeds maximum limit',
  },
};

export const ErrorWithLabel: Story = {
  args: {
    value: NaN,
    unit: 'kg',
    label: 'Weight',
    required: true,
    error: true,
    errorText: 'This field is required',
  },
};

export const ErrorWithIcon: Story = {
  args: {
    value: 999,
    unit: 'kPa',
    error: true,
    errorText: 'Value exceeds maximum limit',
    hasHelperIcon: true,
  },
};

// =============================================================================
// COMPLETE EXAMPLES
// =============================================================================

export const Complete: Story = {
  args: {
    value: 85.5,
    unit: 'kW',
    label: 'Power Output',
    required: true,
    hasLeadingIcon: true,
    helperText: 'Maximum continuous rating: 100 kW',
  },
};

export const CompleteCenter: Story = {
  args: {
    value: 42,
    unit: 'Hz',
    label: 'Frequency',
    required: true,
    hasLeadingIcon: true,
    helperText: 'Standard: 50/60 Hz',
    labelPlacement: ObcNumberInputFieldPlacement.Center,
    helperPlacement: ObcNumberInputFieldPlacement.Center,
    textAlign: ObcNumberInputFieldTextAlign.Center,
  },
};

export const CompleteDisabled: Story = {
  args: {
    value: 100,
    unit: '%',
    label: 'System Load',
    hasLeadingIcon: true,
    helperText: 'System at maximum capacity',
    disabled: true,
  },
};

export const CompleteError: Story = {
  args: {
    value: 150,
    unit: 'bar',
    label: 'Pressure Alert',
    required: true,
    hasLeadingIcon: true,
    error: true,
    errorText: 'Critical: Pressure too high!',
  },
};
