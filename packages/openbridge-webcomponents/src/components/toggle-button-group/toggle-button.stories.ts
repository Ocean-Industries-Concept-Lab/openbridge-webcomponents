import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcToggleButtonGroup} from './toggle-button-group.js';
import './toggle-button-group.js';
import '../toggle-button-option/toggle-button-option.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';
import {
  ObcToggleButtonOptionType,
  ObcToggleButtonOptionVariant,
} from '../toggle-button-option/toggle-button-option.js';

const meta: Meta<typeof ObcToggleButtonGroup> = {
  title:
    'UI Components/Selection controls and switches/Toggle button - Horizontal',
  tags: ['autodocs', '6.0'],
  component: 'obc-toggle-button-group',
  args: {
    value: '1',
    hugText: false,
    variant: ObcToggleButtonOptionVariant.regular,
    disabled: false,
    externalControl: false,
  },
  parameters: {
    actions: {
      handles: ['value'],
    },
  },
  argTypes: {
    value: {
      options: ['1', '2', '3'],
      control: {type: 'select'},
    },
    activated: {
      options: [undefined, '1', '2', '3'],
      control: {type: 'select'},
    },
    variant: {
      options: Object.values(ObcToggleButtonOptionVariant),
      control: {type: 'select'},
    },
    type: {
      options: Object.values(ObcToggleButtonOptionType),
      control: {type: 'select'},
    },
    hugText: {
      control: {type: 'boolean'},
    },
    disabled: {
      control: {type: 'boolean'},
    },
    large : {
      control: {type: 'boolean'},
    },
  },
  render: (args) =>
    html` <div
      style="width: ${args.type === ObcToggleButtonOptionType.iconText
        ? 'fit-content'
        : 'fit-content'}"
    >
      <obc-toggle-button-group
        value=${args.value}
        variant=${args.variant}
        type=${args.type}
        .hugText=${args.hugText}
        .disabled=${args.disabled}
        .externalControl=${args.externalControl}
        .activated=${args.activated}
        .large=${args.large}
      >
        <obc-toggle-button-option
          value="1"
          variant="${args.variant}"
          type="${args.type}"
          .hugText="${args.hugText}"
          .disabled="${args.disabled}"
          >Option 1
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-option>
        <obc-toggle-button-option
          value="2"
          variant="${args.variant}"
          type="${args.type}"
          .hugText="${args.hugText}"
          .disabled="${args.disabled}"
          >Option 2
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-option>
        <obc-toggle-button-option
          value="3"
          variant="${args.variant}"
          type="${args.type}"
          .hugText="${args.hugText}"
          .disabled="${args.disabled}"
          >Option 3
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-option>
      </obc-toggle-button-group>
    </div>`,
} satisfies Meta<ObcToggleButtonGroup>;

export default meta;
type Story = StoryObj<ObcToggleButtonGroup>;

export const IconText: Story = {
  args: {
    type: ObcToggleButtonOptionType.iconText,
  },
};

export const IconTextRegularDisabled: Story = {
  args: {
    type: ObcToggleButtonOptionType.iconText,
    variant: ObcToggleButtonOptionVariant.regular,
    disabled: true,
  },
};

export const IconTextUnder: Story = {
  args: {
    type: ObcToggleButtonOptionType.iconTextUnder,
  },
};

export const IconTextUnderRegularDisabled: Story = {
  args: {
    type: ObcToggleButtonOptionType.iconTextUnder,
    variant: ObcToggleButtonOptionVariant.regular,
    disabled: true,
  },
};

export const Icon: Story = {
  args: {
    type: ObcToggleButtonOptionType.icon,
  },
};

export const IconRegularDisabled: Story = {
  args: {
    type: ObcToggleButtonOptionType.icon,
    variant: ObcToggleButtonOptionVariant.regular,
    disabled: true,
  },
};

export const Text: Story = {
  args: {
    type: ObcToggleButtonOptionType.text,
  },
};

export const TextRegularDisabled: Story = {
  args: {
    type: ObcToggleButtonOptionType.text,
    variant: ObcToggleButtonOptionVariant.regular,
    disabled: true,
  },
};

export const IconTextUnderFlat: Story = {
  args: {
    type: ObcToggleButtonOptionType.iconTextUnder,
    variant: ObcToggleButtonOptionVariant.flat,
  },
};

export const IconTextUnderFlatDisabled: Story = {
  args: {
    type: ObcToggleButtonOptionType.iconTextUnder,
    variant: ObcToggleButtonOptionVariant.flat,
    disabled: true,
  },
};

export const IconTextFlat: Story = {
  args: {
    type: ObcToggleButtonOptionType.iconText,
    variant: ObcToggleButtonOptionVariant.flat,
  },
};

export const IconTextFlatDisabled: Story = {
  args: {
    type: ObcToggleButtonOptionType.iconText,
    variant: ObcToggleButtonOptionVariant.flat,
    disabled: true,
  },
};

export const IconFlat: Story = {
  args: {
    type: ObcToggleButtonOptionType.icon,
    variant: ObcToggleButtonOptionVariant.flat,
  },
};

export const IconFlatDisabled: Story = {
  args: {
    type: ObcToggleButtonOptionType.icon,
    variant: ObcToggleButtonOptionVariant.flat,
    disabled: true,
  },
};

export const TextFlat: Story = {
  args: {
    type: ObcToggleButtonOptionType.text,
    variant: ObcToggleButtonOptionVariant.flat,
  },
};

export const TextFlatDisabled: Story = {
  args: {
    type: ObcToggleButtonOptionType.text,
    variant: ObcToggleButtonOptionVariant.flat,
    disabled: true,
  },
};

export const ExternalControl: Story = {
  args: {
    type: ObcToggleButtonOptionType.text,
    variant: ObcToggleButtonOptionVariant.regular,
    externalControl: true,
  },
};

export const ExternalControlActivated: Story = {
  args: {
    type: ObcToggleButtonOptionType.text,
    variant: ObcToggleButtonOptionVariant.regular,
    externalControl: true,
    activated: '2',
  },
};

export const DifferentTextLength: Story = {
  args: {
    type: ObcToggleButtonOptionType.text,
    variant: ObcToggleButtonOptionVariant.regular,
  },
  render: (args) => html`
    <obc-toggle-button-group
      value="${args.value}"
      variant="${args.variant}"
      type="${args.type}"
      .hugText="${args.hugText}"
      .disabled="${args.disabled}"
    >
      <obc-toggle-button-option
        value="1"
        variant="${args.variant}"
        type="${args.type}"
        .hugText="${args.hugText}"
        .disabled="${args.disabled}"
        >Option 1 with a long text
        <obi-placeholder slot="icon"></obi-placeholder>
      </obc-toggle-button-option>
      <obc-toggle-button-option
        value="2"
        variant="${args.variant}"
        type="${args.type}"
        .hugText="${args.hugText}"
        .disabled="${args.disabled}"
        >Short
        <obi-placeholder slot="icon"></obi-placeholder>
      </obc-toggle-button-option>
      <obc-toggle-button-option
        value="3"
        variant="${args.variant}"
        type="${args.type}"
        .hugText="${args.hugText}"
        .disabled="${args.disabled}"
        >Longer text
        <obi-placeholder slot="icon"></obi-placeholder>
      </obc-toggle-button-option>
    </obc-toggle-button-group>
  `,
};

export const SelectionBehavior: Story = {
  args: {
    type: ObcToggleButtonOptionType.text,
    value: '2',
    variant: ObcToggleButtonOptionVariant.regular,
    hugText: false,
    disabled: false,
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <p>
        One option must always be selected. Disabled options cannot be selected.
      </p>
      <obc-toggle-button-group
        value="${args.value}"
        variant="${args.variant}"
        type="${args.type}"
        .hugText="${args.hugText}"
        .disabled="${args.disabled}"
      >
        <obc-toggle-button-option value="1">Option 1</obc-toggle-button-option>
        <obc-toggle-button-option value="2">Option 2</obc-toggle-button-option>
        <obc-toggle-button-option value="3">Option 3</obc-toggle-button-option>
      </obc-toggle-button-group>
    </div>
  `,
};

export const MixedDisabledStates: Story = {
  args: {
    type: ObcToggleButtonOptionType.text,
    value: '2',
    variant: ObcToggleButtonOptionVariant.regular,
    hugText: false,
    disabled: false,
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <p>
        Individual options can be disabled. If selected option becomes disabled,
        selection moves to first available option.
      </p>
      <obc-toggle-button-group
        value="${args.value}"
        variant="${args.variant}"
        type="${args.type}"
        .hugText="${args.hugText}"
        .disabled="${args.disabled}"
      >
        <obc-toggle-button-option value="1">Option 1</obc-toggle-button-option>
        <obc-toggle-button-option value="2" disabled
          >Option 2 (disabled)</obc-toggle-button-option
        >
        <obc-toggle-button-option value="3">Option 3</obc-toggle-button-option>
        <obc-toggle-button-option value="4" disabled
          >Option 4 (disabled)</obc-toggle-button-option
        >
      </obc-toggle-button-group>
    </div>
  `,
};

export const AllOptionsDisabled: Story = {
  name: 'All Options Disabled - Selection Preserved',
  args: {
    type: ObcToggleButtonOptionType.text,
    value: '2',
    variant: ObcToggleButtonOptionVariant.regular,
    hugText: false,
    disabled: false,
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <p>When all options become disabled, the last selection is preserved.</p>
      <obc-toggle-button-group
        value="${args.value}"
        variant="${args.variant}"
        type="${args.type}"
        .hugText="${args.hugText}"
        .disabled="${args.disabled}"
      >
        <obc-toggle-button-option value="1" disabled
          >Option 1 (disabled)</obc-toggle-button-option
        >
        <obc-toggle-button-option value="2" disabled
          >Option 2 (disabled & selected)</obc-toggle-button-option
        >
        <obc-toggle-button-option value="3" disabled
          >Option 3 (disabled)</obc-toggle-button-option
        >
      </obc-toggle-button-group>
    </div>
  `,
};

export const InitiallyDisabledSelected: Story = {
  name: 'Initially Disabled Selection Falls Back',
  args: {
    type: ObcToggleButtonOptionType.text,
    value: '2',
    variant: ObcToggleButtonOptionVariant.regular,
    hugText: false,
    disabled: false,
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <p>
        If initial value points to a disabled option, it selects the first
        available option. Try changing the value control to '2' (disabled) to
        see it fall back to Option 1.
      </p>
      <obc-toggle-button-group
        value="${args.value}"
        variant="${args.variant}"
        type="${args.type}"
        .hugText="${args.hugText}"
        .disabled="${args.disabled}"
      >
        <obc-toggle-button-option value="1">Option 1</obc-toggle-button-option>
        <obc-toggle-button-option value="2" disabled
          >Option 2 (disabled)</obc-toggle-button-option
        >
        <obc-toggle-button-option value="3">Option 3</obc-toggle-button-option>
      </obc-toggle-button-group>
    </div>
  `,
};

export const ExternalControlActivatedDemo: Story = {
  args: {
    type: ObcToggleButtonOptionType.text,
    variant: ObcToggleButtonOptionVariant.regular,
    externalControl: true,
    activated: undefined,
  },
  render: (args) => html`
    <div
      style="width: ${args.type === ObcToggleButtonOptionType.iconText
        ? 'fit-content'
        : 'fit-content'}"
    >
      <obc-toggle-button-group
        value=${args.value}
        variant=${args.variant}
        type=${args.type}
        .hugText=${args.hugText}
        .disabled=${args.disabled}
        .externalControl=${args.externalControl}
        .activated=${args.activated}
        id="external-control-activated-demo"
        @value=${(e: CustomEvent) => {
          const target = e.target as ObcToggleButtonGroup;
          target.activated = e.detail.value;
          setTimeout(() => {
            target.value = e.detail.value;
          }, 1000);
        }}
      >
        <obc-toggle-button-option
          value="1"
          variant="${args.variant}"
          type="${args.type}"
          .hugText="${args.hugText}"
          .disabled="${args.disabled}"
          >Option 1
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-option>
        <obc-toggle-button-option
          value="2"
          variant="${args.variant}"
          type="${args.type}"
          .hugText="${args.hugText}"
          .disabled="${args.disabled}"
          >Option 2
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-option>
        <obc-toggle-button-option
          value="3"
          variant="${args.variant}"
          type="${args.type}"
          .hugText="${args.hugText}"
          .disabled="${args.disabled}"
          >Option 3
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-option>
      </obc-toggle-button-group>
    </div>
  `,
};
