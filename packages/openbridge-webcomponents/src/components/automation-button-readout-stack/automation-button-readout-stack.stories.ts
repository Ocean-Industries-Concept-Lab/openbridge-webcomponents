import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  AutomationButtonReadoutStackSize,
  IdTagOrientation,
} from './automation-button-readout-stack.js';
import type {AutomationButtonReadoutStack as Readout} from './automation-button-readout-stack.js';
import './automation-button-readout-stack.js';
import {html} from 'lit';

const meta: Meta = {
  title: 'Building Blocks/Automation button readout stack',
  tags: ['6.0'],
  component: 'obc-automation-button-readout-stack',
  args: {
    tagValue: 0,
    readouts: [
      {
        type: 'value',
        value: 95,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
      {
        type: 'value',
        value: 50,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
    ],
  },
  parameters: {
    controls: {
      expanded: true,
      include: ['size', 'idTagOrientation', 'hasIdTag', 'tagValue', 'readouts'],
    },
  },
  argTypes: {
    size: {
      options: Object.values(AutomationButtonReadoutStackSize),
      control: {type: 'select'},
      table: {category: '01 General'},
    },
    idTagOrientation: {
      options: Object.values(IdTagOrientation),
      control: {type: 'inline-radio'},
      table: {category: '01 General'},
    },
    hasIdTag: {control: {type: 'boolean'}, table: {category: '01 General'}},
    tagValue: {
      control: {type: 'number'},
      if: {arg: 'hasIdTag'},
      table: {category: '01 General'},
    },
    readouts: {
      control: {type: 'object'},
      table: {category: '02 Readouts'},
    },
  },
  render: (args) => {
    type Controls = {
      size: AutomationButtonReadoutStackSize;
      idTagOrientation: IdTagOrientation;
      hasIdTag: boolean;
      tagValue: number;
      readouts: Readout[];
    };
    const a = args as unknown as Controls;
    const tag = a.hasIdTag ? {value: Number(a.tagValue ?? 0)} : null;

    return html`
      <obc-automation-button-readout-stack
        .size=${a.size}
        .idTagOrientation=${a.idTagOrientation}
        .hasIdTag=${a.hasIdTag}
        .tag=${tag}
        .readouts=${a.readouts || []}
      ></obc-automation-button-readout-stack>
    `;
  },
} as Meta;

export default meta;
type Story = StoryObj;

// Default story with all props enabled
export const Default: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [
      {
        type: 'value',
        value: 95,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
      {
        type: 'value',
        value: 50,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
    ],
  },
};

// Size variations
export const Small: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.small,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [
      {
        type: 'value',
        value: 95,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
      {
        type: 'value',
        value: 50,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
    ],
  },
};

export const Enhanced: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.enhanced,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [
      {
        type: 'value',
        value: 95,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
      {
        type: 'value',
        value: 50,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
    ],
  },
};

// ID Tag orientation variations
export const TagAtTop: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [
      {
        type: 'value',
        value: 95,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
      {
        type: 'value',
        value: 50,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
    ],
  },
};

export const TagAtBottom: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.bottom,
    hasIdTag: true,
    tagValue: 0,
    readouts: [
      {
        type: 'value',
        value: 95,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
      {
        type: 'value',
        value: 50,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
    ],
  },
};

// Visibility variations
export const OnlyTag: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [
      {
        type: 'value',
        value: 95,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
      {
        type: 'value',
        value: 50,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
    ],
  },
};

export const OnlyValue1: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: false,
    tagValue: 0,
    readouts: [
      {
        type: 'value',
        value: 95,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
      {
        type: 'value',
        value: 50,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
    ],
  },
};

export const OnlyValue2: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: false,
    tagValue: 0,
    readouts: [
      {
        type: 'value',
        value: 95,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
      {
        type: 'value',
        value: 50,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
    ],
  },
};

export const TagAndValue1: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [
      {
        type: 'value',
        value: 95,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
      {
        type: 'value',
        value: 50,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
    ],
  },
};

export const ValuesOnly: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: false,
    tagValue: 0,
    readouts: [
      {
        type: 'value',
        value: 95,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
      {
        type: 'value',
        value: 50,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
    ],
  },
};

// Direction variations
export const DifferentDirections: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [
      {
        type: 'value',
        value: 10,
        nDigits: 2,
        unit: '%',
        direction: 'up',
        hasIcon: true,
      },
      {
        type: 'value',
        value: 20,
        nDigits: 2,
        unit: '%',
        direction: 'down',
        hasIcon: true,
      },
    ],
  },
};

export const AllDirections: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [
      {
        type: 'value',
        value: 10,
        nDigits: 2,
        unit: '%',
        direction: 'up',
        hasIcon: true,
      },
      {
        type: 'value',
        value: 20,
        nDigits: 2,
        unit: '%',
        direction: 'down',
        hasIcon: true,
      },
      {
        type: 'value',
        value: 30,
        nDigits: 2,
        unit: '%',
        direction: 'left',
        hasIcon: true,
      },
      {
        type: 'value',
        value: 40,
        nDigits: 2,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
    ],
  },
};

// Custom units and tag variations
export const CustomUnits: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 1234,
    readouts: [
      {
        type: 'value',
        value: 25,
        nDigits: 2,
        unit: '°C',
        direction: 'up',
        hasIcon: true,
      },
      {
        type: 'value',
        value: 75,
        nDigits: 2,
        unit: 'rpm',
        direction: 'down',
        hasIcon: true,
      },
    ],
  },
};

export const CustomTag: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 9999,
    readouts: [],
  },
};

export const TagPadding: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
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
    tagValue: 0,
    readouts: [{type: 'state-off', value: 'Off', hasIcon: true}],
  },
};

export const StateOffWithoutIcon: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [{type: 'state-off', value: 'Off', hasIcon: false}],
  },
};

export const StateOffSizes: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.enhanced,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [{type: 'state-off', value: 'Off', hasIcon: true}],
  },
};

export const StateOffSmall: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.small,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [{type: 'state-off', value: 'Off', hasIcon: true}],
  },
};

export const MixedValueAndStateOff: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [
      {
        type: 'value',
        value: 95,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
      {type: 'state-off', value: 'Off', hasIcon: true},
    ],
  },
};

export const StateOffAtBottom: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.bottom,
    hasIdTag: true,
    tagValue: 0,
    readouts: [
      {
        type: 'value',
        value: 50,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
      {type: 'state-off', value: 'Off', hasIcon: true},
    ],
  },
};

// State-on type demonstrations
export const StateOnWithIcon: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [{type: 'state-on', value: 'On', hasIcon: true}],
  },
};

export const StateOnWithoutIcon: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [{type: 'state-on', value: 'On', hasIcon: false}],
  },
};

export const StateOnSizes: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.enhanced,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [{type: 'state-on', value: 'On', hasIcon: true}],
  },
};

export const StateOnSmall: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.small,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [{type: 'state-on', value: 'On', hasIcon: true}],
  },
};

export const MixedValueAndStateOn: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [
      {
        type: 'value',
        value: 95,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
      {type: 'state-on', value: 'On', hasIcon: true},
    ],
  },
};

export const StateOnAndOff: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [
      {type: 'state-on', value: 'On', hasIcon: true},
      {type: 'state-off', value: 'Off', hasIcon: true},
    ],
  },
};

// Button type demonstrations
export const ButtonWithIcon: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [{type: 'button', value: 25.5, hasIcon: true, unit: '°C'}],
  },
};

export const ButtonWithoutIcon: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [{type: 'button', value: 25.5, hasIcon: false, unit: '°C'}],
  },
};

export const ButtonSizes: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.enhanced,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [{type: 'button', value: 25.5, hasIcon: true, unit: '°C'}],
  },
};

export const ButtonSmall: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.small,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [{type: 'button', value: 25.5, hasIcon: true, unit: '°C'}],
  },
};

export const MixedValueAndButton: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [
      {
        type: 'value',
        value: 95,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
      {type: 'button', value: 25.5, hasIcon: true, unit: '°C'},
    ],
  },
};

export const AllTypes: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [
      {
        type: 'value',
        value: 95,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
      {type: 'button', value: 25.5, hasIcon: true, unit: '°C'},
    ],
  },
};

export const ButtonType: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [{type: 'button', value: 25.5, hasIcon: true, unit: '°C'}],
  },
};

// Icon variations
export const WithIcons: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [
      {
        type: 'value',
        value: 95,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
      {
        type: 'value',
        value: 50,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
    ],
  },
};

export const WithoutIcons: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [
      {
        type: 'value',
        value: 95,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: false,
      },
      {
        type: 'value',
        value: 50,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: false,
      },
    ],
  },
};

export const MixedIcons: Story = {
  args: {
    size: AutomationButtonReadoutStackSize.regular,
    idTagOrientation: IdTagOrientation.top,
    hasIdTag: true,
    tagValue: 0,
    readouts: [
      {
        type: 'value',
        value: 95,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: true,
      },
      {
        type: 'value',
        value: 50,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        hasIcon: false,
      },
    ],
  },
};
