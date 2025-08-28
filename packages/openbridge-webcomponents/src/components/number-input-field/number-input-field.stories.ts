import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcNumberInputField, ObcNumberInputAlignment, ObcNumberInputState} from './number-input-field.js';
import './number-input-field.js';
import {iconIds, iconIdToIconHtml} from '../../storybook-util.js';
import {withActions} from 'storybook/actions/decorator';
import '../../icons/icon-placeholder.js';
import {html} from 'lit';

const meta: Meta<typeof ObcNumberInputField> = {
  title: 'UI Components/Input controls/Number Input Field',
  tags: ['autodocs', '6.0'],
  component: 'obc-number-input-field',
  args: {},
  argTypes: {
    value: {
      control: {type: 'text'},
      description: 'The current numerical value displayed in the input',
    },
    unit: {
      control: {type: 'text'},
      description: 'The unit text (e.g., "kg", "cm", "Unit")',
    },
    hasUnit: {
      control: {type: 'boolean'},
      description: 'Whether to display the unit text',
    },
    alignment: {
      control: {type: 'select'},
      options: Object.values(ObcNumberInputAlignment),
      description: 'Content alignment within the input field',
    },
    state: {
      control: {type: 'select'},
      options: Object.values(ObcNumberInputState),
      description: 'Visual state of the input field',
    },
    hasHelperText: {
      control: {type: 'boolean'},
      description: 'Whether to show helper text below the input',
    },
    hasLeadingIcon: {
      control: {type: 'boolean'},
      description: 'Whether to show a leading icon',
    },
    placeholder: {
      control: {type: 'text'},
      description: 'Placeholder text when input is empty',
    },
    required: {
      control: {type: 'boolean'},
      description: 'Whether the input is required for form validation',
    },
    leadingIcon: {
      control: {type: 'select'},
      options: ['', ...iconIds],
      description: 'Icon to display before the input (for stories only)',
    },
    helperText: {
      control: {type: 'text'},
      description: 'Helper text content (for stories only)',
    },
  },
  parameters: {
    actions: {
      handles: ['input', 'focus', 'blur'],
    },
  },
  render: (args) => {
    return html`<obc-number-input-field
      style="width: 240px; display: block;"
      value=${args.value || ''}
      unit=${args.unit || 'Unit'}
      .hasUnit=${args.hasUnit !== false}
      .alignment=${args.alignment || ObcNumberInputAlignment.Right}
      .state=${args.state || ObcNumberInputState.Enabled}
      .hasHelperText=${args.hasHelperText === true}
      .hasLeadingIcon=${args.hasLeadingIcon === true}
      placeholder=${args.placeholder || ''}
      .required=${args.required === true}
      @input=${console.log}
      @focus=${console.log}
      @blur=${console.log}
    >
      ${args.leadingIcon
        ? iconIdToIconHtml(args.leadingIcon, {slot: 'leading-icon'})
        : ''}
      ${args.helperText
        ? html`<div slot="helper-text">${args.helperText}</div>`
        : ''}
    </obc-number-input-field>`;
  },
  decorators: [withActions],
} satisfies Meta<ObcNumberInputField>;

export default meta;
type Story = StoryObj<ObcNumberInputField>;

export const Primary: Story = {
  args: {
    value: '123',
    unit: 'Unit',
  },
};

export const CenterAligned: Story = {
  args: {
    value: '123',
    unit: 'Unit',
    alignment: ObcNumberInputAlignment.Center,
  },
};

export const RightUnitOutside: Story = {
  args: {
    value: '123',
    unit: 'Unit',
    alignment: ObcNumberInputAlignment.RightUnitOutside,
  },
};

export const WithoutUnit: Story = {
  args: {
    value: '123',
    hasUnit: false,
  },
};

export const Empty: Story = {
  args: {
    placeholder: 'Enter number',
    unit: 'kg',
  },
};

export const Focused: Story = {
  args: {
    value: '123',
    unit: 'Unit',
    state: ObcNumberInputState.Focused,
  },
};

export const Typing: Story = {
  args: {
    value: '123',
    unit: 'Unit',
    state: ObcNumberInputState.Typing,
  },
};

export const Error: Story = {
  args: {
    value: '123',
    unit: 'Unit',
    state: ObcNumberInputState.Error,
  },
};

export const Disabled: Story = {
  args: {
    value: '123',
    unit: 'Unit',
    state: ObcNumberInputState.Disabled,
  },
};

export const WithHelperText: Story = {
  args: {
    value: '123',
    unit: 'cm',
    hasHelperText: true,
    helperText: 'Enter your height in centimeters',
  },
};

export const WithLeadingIcon: Story = {
  args: {
    value: '123',
    unit: 'Unit',
    hasLeadingIcon: true,
    leadingIcon: 'placeholder',
  },
};

export const CustomUnit: Story = {
  args: {
    value: '42',
    unit: 'kg',
    alignment: ObcNumberInputAlignment.Center,
  },
};

export const LongValue: Story = {
  args: {
    value: '1234567',
    unit: 'bytes',
    alignment: ObcNumberInputAlignment.Right,
  },
};

export const AllStates: Story = {
  render: () => {
    return html`
      <div style="display: flex; flex-direction: column; gap: 16px; width: 240px;">
        <div style="font-weight: bold; margin-bottom: 8px;">All States:</div>
        
        <div>
          <label style="display: block; font-size: 12px; margin-bottom: 4px;">Enabled</label>
          <obc-number-input-field 
            value="123" 
            unit="Unit"
            .state=${ObcNumberInputState.Enabled}>
          </obc-number-input-field>
        </div>

        <div>
          <label style="display: block; font-size: 12px; margin-bottom: 4px;">Filled</label>
          <obc-number-input-field 
            value="123" 
            unit="Unit"
            .state=${ObcNumberInputState.Filled}>
          </obc-number-input-field>
        </div>

        <div>
          <label style="display: block; font-size: 12px; margin-bottom: 4px;">Focused</label>
          <obc-number-input-field 
            value="123" 
            unit="Unit"
            .state=${ObcNumberInputState.Focused}>
          </obc-number-input-field>
        </div>

        <div>
          <label style="display: block; font-size: 12px; margin-bottom: 4px;">Typing</label>
          <obc-number-input-field 
            value="123" 
            unit="Unit"
            .state=${ObcNumberInputState.Typing}>
          </obc-number-input-field>
        </div>

        <div>
          <label style="display: block; font-size: 12px; margin-bottom: 4px;">Error</label>
          <obc-number-input-field 
            value="123" 
            unit="Unit"
            .state=${ObcNumberInputState.Error}>
          </obc-number-input-field>
        </div>

        <div>
          <label style="display: block; font-size: 12px; margin-bottom: 4px;">Disabled</label>
          <obc-number-input-field 
            value="123" 
            unit="Unit"
            .state=${ObcNumberInputState.Disabled}>
          </obc-number-input-field>
        </div>
      </div>
    `;
  },
};

export const AllAlignments: Story = {
  render: () => {
    return html`
      <div style="display: flex; flex-direction: column; gap: 16px; width: 240px;">
        <div style="font-weight: bold; margin-bottom: 8px;">All Alignments:</div>
        
        <div>
          <label style="display: block; font-size: 12px; margin-bottom: 4px;">Center</label>
          <obc-number-input-field 
            value="123" 
            unit="Unit"
            .alignment=${ObcNumberInputAlignment.Center}>
          </obc-number-input-field>
        </div>

        <div>
          <label style="display: block; font-size: 12px; margin-bottom: 4px;">Right</label>
          <obc-number-input-field 
            value="123" 
            unit="Unit"
            .alignment=${ObcNumberInputAlignment.Right}>
          </obc-number-input-field>
        </div>

        <div>
          <label style="display: block; font-size: 12px; margin-bottom: 4px;">Right (Unit Outside)</label>
          <obc-number-input-field 
            value="123" 
            unit="Unit"
            .alignment=${ObcNumberInputAlignment.RightUnitOutside}>
          </obc-number-input-field>
        </div>
      </div>
    `;
  },
};