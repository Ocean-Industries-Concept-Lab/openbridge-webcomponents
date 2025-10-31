import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcAutomationButtonReadoutStack, AutomationButtonReadoutStackSize, IdTagOrientation} from './automation-button-readout-stack.js';
import './automation-button-readout-stack.js';
import { html } from 'lit';

const meta: Meta<typeof ObcAutomationButtonReadoutStack> = {
  title: 'Building Blocks/Automation button readout stack',
  tags: ['6.0'],
  component: 'obc-automation-button-readout-stack',
  args: {
    // value1 controls
    value1: 95,
    unit1: '%',
    hasUnit1: true,
    direction1: 'right',
    hasArrow1: true,
    // value2 controls
    value2: 50,
    unit2: '%',
    hasUnit2: true,
    direction2: 'right',
    hasArrow2: true,
    // tag control
    tagValue: 0,
  },
  parameters: {
    controls: { 
      expanded: true,
      include: [
        'size',
        'idTagOrientation',
        'hasIdTag',
        'tagValue',
        'hasValue1',
        'hasValue2',
        'value1','unit1','hasUnit1','direction1','hasArrow1',
        'value2','unit2','hasUnit2','direction2','hasArrow2',
      ],
    },
  },
  argTypes: {
    // existing controls first
    size: {
      options: Object.values(AutomationButtonReadoutStackSize),
      control: { type: 'select' },
      table: { category: '01 General' },
    },
    idTagOrientation: {
      options: Object.values(IdTagOrientation),
      control: { type: 'inline-radio' },
      table: { category: '01 General' },
    },
    hasIdTag: { control: { type: 'boolean' }, table: { category: '01 General' } },

    // Tag controls directly under hasIdTag
    tagValue: { control: { type: 'number' }, if: { arg: 'hasIdTag' }, table: { category: '01 General' } },

    hasValue1: { control: { type: 'boolean' }, table: { category: '02 Toggles' } },
    hasValue2: { control: { type: 'boolean' }, table: { category: '02 Toggles' } },

    // value1 controls (shown only when hasValue1 is true)
    value1: { control: { type: 'number' }, if: { arg: 'hasValue1' }, table: { category: '03 Value 1' } },
    unit1: { control: { type: 'text' }, if: { arg: 'hasValue1' }, table: { category: '03 Value 1' } },
    hasUnit1: { control: { type: 'boolean' }, if: { arg: 'hasValue1' }, table: { category: '03 Value 1' } },
    direction1: { control: { type: 'select' }, options: ['up','down','left','right'], if: { arg: 'hasValue1' }, table: { category: '03 Value 1' } },
    hasArrow1: { control: { type: 'boolean' }, if: { arg: 'hasValue1' }, table: { category: '03 Value 1' } },

    // value2 controls (shown only when hasValue2 is true)
    value2: { control: { type: 'number' }, if: { arg: 'hasValue2' }, table: { category: '04 Value 2' } },
    unit2: { control: { type: 'text' }, if: { arg: 'hasValue2' }, table: { category: '04 Value 2' } },
    hasUnit2: { control: { type: 'boolean' }, if: { arg: 'hasValue2' }, table: { category: '04 Value 2' } },
    direction2: { control: { type: 'select' }, options: ['up','down','left','right'], if: { arg: 'hasValue2' }, table: { category: '04 Value 2' } },
    hasArrow2: { control: { type: 'boolean' }, if: { arg: 'hasValue2' }, table: { category: '04 Value 2' } },

    // Hide readouts from controls since it's computed from individual controls
    readouts: { table: { disable: true } },
  },
  render: (args) => {
    const unit1 = args.hasUnit1 ? args.unit1 : '';
    const unit2 = args.hasUnit2 ? args.unit2 : '';
    const tag = args.hasIdTag ? { value: Number(args.tagValue ?? 0) } : null;

    const readouts = [
      { type: 'value', value: Number(args.value1 ?? 0), nDigits: 3, unit: unit1, direction: args.direction1, hasIcon: !!args.hasArrow1 },
      { type: 'value', value: Number(args.value2 ?? 0), nDigits: 3, unit: unit2, direction: args.direction2, hasIcon: !!args.hasArrow2 },
    ];

    return html`
      <obc-automation-button-readout-stack
        .size=${args.size}
        .idTagOrientation=${args.idTagOrientation}
        .hasIdTag=${args.hasIdTag}
        .hasValue1=${args.hasValue1}
        .hasValue2=${args.hasValue2}
        .tag=${tag}
        .readouts=${readouts}
      ></obc-automation-button-readout-stack>
    `;
  },
} satisfies Meta<ObcAutomationButtonReadoutStack>;

export default meta;
type Story = StoryObj<ObcAutomationButtonReadoutStack>;

// Default story with all props enabled
export const Default: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: true,
    tagValue: 0,
    readouts: [
      { type: 'value', value: 95, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
      { type: 'value', value: 50, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
    ],
  },
};

// Size variations
export const Small: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.small,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: true,
    tagValue: 0,
    readouts: [
      { type: 'value', value: 95, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
      { type: 'value', value: 50, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
    ],
  },
};

export const Enhanced: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.enhanced,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: true,
    tagValue: 0,
    readouts: [
      { type: 'value', value: 95, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
      { type: 'value', value: 50, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
    ],
  },
};

// ID Tag orientation variations
export const TagAtTop: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: true,
    tagValue: 0,
    readouts: [
      { type: 'value', value: 95, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
      { type: 'value', value: 50, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
    ],
  },
};

export const TagAtBottom: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.bottom,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: true,
    tagValue: 0,
    readouts: [
      { type: 'value', value: 95, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
      { type: 'value', value: 50, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
    ],
  },
};

// Visibility variations
export const OnlyTag: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: false,
    hasValue2: false,
    tagValue: 0,
    readouts: [
      { type: 'value', value: 95, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
      { type: 'value', value: 50, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
    ],
  },
};

export const OnlyValue1: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: false,
    hasValue1: true,
    hasValue2: false,
    tagValue: 0,
    readouts: [
      { type: 'value', value: 95, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
      { type: 'value', value: 50, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
    ],
  },
};

export const OnlyValue2: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: false,
    hasValue1: false,
    hasValue2: true,
    tagValue: 0,
    readouts: [
      { type: 'value', value: 95, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
      { type: 'value', value: 50, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
    ],
  },
};

export const TagAndValue1: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: false,
    tagValue: 0,
    readouts: [
      { type: 'value', value: 95, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
      { type: 'value', value: 50, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
    ],
  },
};

export const ValuesOnly: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: false,
    hasValue1: true,
    hasValue2: true,
    tagValue: 0,
    readouts: [
      { type: 'value', value: 95, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
      { type: 'value', value: 50, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
    ],
  },
};

// Direction variations
export const DifferentDirections: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: true,
    tagValue: 0,
    readouts: [
      { type: 'value', value: 10, nDigits: 2, unit: '%', direction: 'up', hasIcon: true },
      { type: 'value', value: 20, nDigits: 2, unit: '%', direction: 'down', hasIcon: true },
    ],
  },
};

export const AllDirections: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: true,
    tagValue: 0,
    readouts: [
      { type: 'value', value: 10, nDigits: 2, unit: '%', direction: 'up', hasIcon: true },
      { type: 'value', value: 20, nDigits: 2, unit: '%', direction: 'down', hasIcon: true },
      { type: 'value', value: 30, nDigits: 2, unit: '%', direction: 'left', hasIcon: true },
      { type: 'value', value: 40, nDigits: 2, unit: '%', direction: 'right', hasIcon: true },
    ],
  },
};

// Custom units and tag variations
export const CustomUnits: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: true,
    tagValue: 1234,
    readouts: [
      { type: 'value', value: 25, nDigits: 2, unit: '°C', direction: 'up', hasIcon: true },
      { type: 'value', value: 75, nDigits: 2, unit: 'rpm', direction: 'down', hasIcon: true },
    ],
  },
};

export const CustomTag: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: false,
    hasValue2: false,
    tagValue: 9999,
    readouts: [],
  },
};

export const TagPadding: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: false,
    hasValue2: false,
    tagValue: 983,
    readouts: [],
  },
};

// State-off type demonstrations
export const StateOffWithIcon: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: false,
    tagValue: 0,
    readouts: [
      { type: 'state-off', value: 'Off', hasIcon: true },
    ],
  },
};

export const StateOffWithoutIcon: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: false,
    tagValue: 0,
    readouts: [
      { type: 'state-off', value: 'Off', hasIcon: false },
    ],
  },
};

export const StateOffSizes: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.enhanced,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: false,
    tagValue: 0,
    readouts: [
      { type: 'state-off', value: 'Off', hasIcon: true },
    ],
  },
};

export const StateOffSmall: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.small,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: false,
    tagValue: 0,
    readouts: [
      { type: 'state-off', value: 'Off', hasIcon: true },
    ],
  },
};

export const MixedValueAndStateOff: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: true,
    tagValue: 0,
    readouts: [
      { type: 'value', value: 95, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
      { type: 'state-off', value: 'Off', hasIcon: true },
    ],
  },
};

export const StateOffAtBottom: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.bottom,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: true,
    tagValue: 0,
    readouts: [
      { type: 'value', value: 50, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
      { type: 'state-off', value: 'Off', hasIcon: true },
    ],
  },
};

// State-on type demonstrations
export const StateOnWithIcon: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: false,
    tagValue: 0,
    readouts: [
      { type: 'state-on', value: 'On', hasIcon: true },
    ],
  },
};

export const StateOnWithoutIcon: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: false,
    tagValue: 0,
    readouts: [
      { type: 'state-on', value: 'On', hasIcon: false },
    ],
  },
};

export const StateOnSizes: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.enhanced,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: false,
    tagValue: 0,
    readouts: [
      { type: 'state-on', value: 'On', hasIcon: true },
    ],
  },
};

export const StateOnSmall: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.small,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: false,
    tagValue: 0,
    readouts: [
      { type: 'state-on', value: 'On', hasIcon: true },
    ],
  },
};

export const MixedValueAndStateOn: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: true,
    tagValue: 0,
    readouts: [
      { type: 'value', value: 95, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
      { type: 'state-on', value: 'On', hasIcon: true },
    ],
  },
};

export const StateOnAndOff: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: true,
    tagValue: 0,
    readouts: [
      { type: 'state-on', value: 'On', hasIcon: true },
      { type: 'state-off', value: 'Off', hasIcon: true },
    ],
  },
};

// Button type demonstrations
export const ButtonWithIcon: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: false,
    tagValue: 0,
    readouts: [
      { type: 'button', value: 25.5, hasIcon: true, unit: '°C' },
    ],
  },
};

export const ButtonWithoutIcon: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: false,
    tagValue: 0,
    readouts: [
      { type: 'button', value: 25.5, hasIcon: false, unit: '°C' },
    ],
  },
};

export const ButtonSizes: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.enhanced,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: false,
    tagValue: 0,
    readouts: [
      { type: 'button', value: 25.5, hasIcon: true, unit: '°C' },
    ],
  },
};

export const ButtonSmall: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.small,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: false,
    tagValue: 0,
    readouts: [
      { type: 'button', value: 25.5, hasIcon: true, unit: '°C' },
    ],
  },
};

export const MixedValueAndButton: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: true,
    tagValue: 0,
    readouts: [
      { type: 'value', value: 95, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
      { type: 'button', value: 25.5, hasIcon: true, unit: '°C' },
    ],
  },
};

export const AllTypes: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: true,
    tagValue: 0,
    readouts: [
      { type: 'value', value: 95, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
      { type: 'button', value: 25.5, hasIcon: true, unit: '°C' },
    ],
  },
};

export const ButtonType: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: true,
    tagValue: 0,
    readouts: [
      { type: 'button', value: 25.5, hasIcon: true, unit: '°C' },
    ],
  },
};

// Icon variations
export const WithIcons: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: true,
    tagValue: 0,
    readouts: [
      { type: 'value', value: 95, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
      { type: 'value', value: 50, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
    ],
  },
};

export const WithoutIcons: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: true,
    tagValue: 0,
    readouts: [
      { type: 'value', value: 95, nDigits: 3, unit: '%', direction: 'right', hasIcon: false },
      { type: 'value', value: 50, nDigits: 3, unit: '%', direction: 'right', hasIcon: false },
    ],
  },
};

export const MixedIcons: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    hasValue1: true,
    hasValue2: true,
    tagValue: 0,
    readouts: [
      { type: 'value', value: 95, nDigits: 3, unit: '%', direction: 'right', hasIcon: true },
      { type: 'value', value: 50, nDigits: 3, unit: '%', direction: 'right', hasIcon: false },
    ],
  },
};
