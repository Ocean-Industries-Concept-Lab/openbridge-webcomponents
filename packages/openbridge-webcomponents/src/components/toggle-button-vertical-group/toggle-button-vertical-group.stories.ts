import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';

import '../../icons/icon-placeholder.js';

import './toggle-button-vertical-group.js';
import {ObcToggleButtonVerticalGroup} from './toggle-button-vertical-group.js';

import '../toggle-button-vertical-option/toggle-button-vertical-option.js';
import {
  ObcToggleButtonVerticalOptionType,
  ObcToggleButtonLabelPlacement,
} from '../toggle-button-vertical-option/toggle-button-vertical-option.js';

const meta: Meta<typeof ObcToggleButtonVerticalGroup> = {
  title:
    'UI Components/Selection controls and switches/Toggle button – Vertical',
  component: 'obc-toggle-button-vertical-group',

  args: {
    value: 'opt-a',
    type: ObcToggleButtonVerticalOptionType.regular,
    labelPlacement: ObcToggleButtonLabelPlacement.inline,
    hasIcon: true,
    disabled: false,
    hugWidth: false,
  },

  parameters: {actions: {handles: ['value']}},

  argTypes: {
    value: {
      options: ['opt-a', 'opt-b', 'opt-c'],
      control: {type: 'select'},
    },
    type: {
      options: Object.values(ObcToggleButtonVerticalOptionType),
      control: {type: 'select'},
    },
    labelPlacement: {
      options: Object.values(ObcToggleButtonLabelPlacement),
      control: {type: 'select'},
    },
    hasIcon: {control: 'boolean'},
    disabled: {control: 'boolean'},
    hugWidth: {control: 'boolean'},
  },

  render: (args) => {
    const wrapperWidth =
      args.labelPlacement === ObcToggleButtonLabelPlacement.under
        ? 'fit-content'
        : '300px';

    return html`
      <div style="width:${wrapperWidth};">
        <obc-toggle-button-vertical-group
          .value=${args.value}
          .type=${args.type}
          .disabled=${args.disabled}
          .hugWidth=${args.hugWidth}
        >
          <obc-toggle-button-vertical-option
            value="opt-a"
            label="Option A"
            .hasIcon=${args.hasIcon}
            .labelPlacement=${args.labelPlacement}
          >
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-toggle-button-vertical-option>

          <obc-toggle-button-vertical-option
            value="opt-b"
            label="Option B"
            .hasIcon=${args.hasIcon}
            .labelPlacement=${args.labelPlacement}
          >
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-toggle-button-vertical-option>

          <obc-toggle-button-vertical-option
            value="opt-c"
            label="Option C"
            .hasIcon=${args.hasIcon}
            .labelPlacement=${args.labelPlacement}
          >
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-toggle-button-vertical-option>
        </obc-toggle-button-vertical-group>
      </div>
    `;
  },
};
export default meta;

type Story = StoryObj<ObcToggleButtonVerticalGroup>;

export const Regular: Story = {};

export const RegularDisabled: Story = {
  args: {disabled: true},
};

export const Flat: Story = {
  args: {type: ObcToggleButtonVerticalOptionType.flat},
};

export const FlatDisabled: Story = {
  args: {type: ObcToggleButtonVerticalOptionType.flat, disabled: true},
};

export const IconsOnlyRegular: Story = {
  args: {type: ObcToggleButtonVerticalOptionType.regular},
  render: (args) => html`
    <div style="width:fit-content;">
      <obc-toggle-button-vertical-group
        .value=${args.value}
        .type=${args.type}
        .disabled=${args.disabled}
        .hugWidth=${args.hugWidth}
      >
        ${['a', 'b', 'c'].map(
          (k) => html`
            <obc-toggle-button-vertical-option
              .value=${`opt-${k}`}
              .hasIcon=${true}
            >
              <obi-placeholder slot="icon"></obi-placeholder>
            </obc-toggle-button-vertical-option>
          `
        )}
      </obc-toggle-button-vertical-group>
    </div>
  `,
};

export const IconsOnlyRegularDisabled: Story = {
  args: {type: ObcToggleButtonVerticalOptionType.regular, disabled: true},
  render: IconsOnlyRegular.render,
};

export const IconsOnlyFlat: Story = {
  args: {type: ObcToggleButtonVerticalOptionType.flat},
  render: IconsOnlyRegular.render,
};

export const IconsOnlyFlatDisabled: Story = {
  args: {type: ObcToggleButtonVerticalOptionType.flat, disabled: true},
  render: IconsOnlyRegular.render,
};

export const LabelUnderRegular: Story = {
  args: {
    labelPlacement: ObcToggleButtonLabelPlacement.under,
    type: ObcToggleButtonVerticalOptionType.regular,
  },
  render: (args) => html`
    <div style="width:fit-content;">
      <obc-toggle-button-vertical-group
        .value=${args.value}
        .type=${args.type}
        .disabled=${args.disabled}
        .hugWidth=${args.hugWidth}
      >
        ${['a', 'b', 'c'].map(
          (k) => html`
            <obc-toggle-button-vertical-option
              .value=${`opt-${k}`}
              label="Label"
              .hasIcon=${true}
              .labelPlacement=${args.labelPlacement}
            >
              <obi-placeholder slot="icon"></obi-placeholder>
            </obc-toggle-button-vertical-option>
          `
        )}
      </obc-toggle-button-vertical-group>
    </div>
  `,
};

export const LabelUnderRegularDisabled: Story = {
  args: {
    labelPlacement: ObcToggleButtonLabelPlacement.under,
    type: ObcToggleButtonVerticalOptionType.regular,
    disabled: true,
  },
  render: LabelUnderRegular.render,
};

export const LabelUnderFlat: Story = {
  args: {
    labelPlacement: ObcToggleButtonLabelPlacement.under,
    type: ObcToggleButtonVerticalOptionType.flat,
  },
  render: LabelUnderRegular.render,
};

export const LabelUnderFlatDisabled: Story = {
  args: {
    labelPlacement: ObcToggleButtonLabelPlacement.under,
    type: ObcToggleButtonVerticalOptionType.flat,
    disabled: true,
  },
  render: LabelUnderRegular.render,
};

export const LabelUnderMixedRegular: Story = {
  args: {
    labelPlacement: ObcToggleButtonLabelPlacement.under,
    type: ObcToggleButtonVerticalOptionType.regular,
  },
  render: (args) => html`
    <div style="width:fit-content;">
      <obc-toggle-button-vertical-group
        .value=${args.value}
        .type=${args.type}
        .disabled=${args.disabled}
        .hugWidth=${args.hugWidth}
      >
        <obc-toggle-button-vertical-option
          value="opt-a"
          label="With icon"
          .hasIcon=${true}
          .labelPlacement=${args.labelPlacement}
        >
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-vertical-option>

        <obc-toggle-button-vertical-option
          value="opt-b"
          label="No icon"
          .hasIcon=${false}
          .labelPlacement=${args.labelPlacement}
        ></obc-toggle-button-vertical-option>

        <obc-toggle-button-vertical-option
          value="opt-c"
          label="With icon"
          .hasIcon=${true}
          .labelPlacement=${args.labelPlacement}
        >
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-vertical-option>
      </obc-toggle-button-vertical-group>
    </div>
  `,
};

export const IconUnderMixedRegular: Story = {
  args: {
    labelPlacement: ObcToggleButtonLabelPlacement.under,
    type: ObcToggleButtonVerticalOptionType.regular,
  },
  render: (args) => html`
    <div style="width:fit-content;">
      <obc-toggle-button-vertical-group
        .value=${args.value}
        .type=${args.type}
        .disabled=${args.disabled}
        .hugWidth=${args.hugWidth}
      >
        <obc-toggle-button-vertical-option
          value="opt-a"
          label="With icon"
          .hasIcon=${true}
          .labelPlacement=${args.labelPlacement}
        >
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-vertical-option>

        <obc-toggle-button-vertical-option
          value="opt-b"
          .hasIcon=${true}
          .labelPlacement=${args.labelPlacement}
        >
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-vertical-option>

        <obc-toggle-button-vertical-option
          value="opt-c"
          label="With icon"
          .hasIcon=${true}
          .labelPlacement=${args.labelPlacement}
        >
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-vertical-option>
      </obc-toggle-button-vertical-group>
    </div>
  `,
};

export const InlineMixedFlat: Story = {
  args: {
    labelPlacement: ObcToggleButtonLabelPlacement.inline,
    type: ObcToggleButtonVerticalOptionType.flat,
  },
  render: LabelUnderMixedRegular.render,
};

export const InlineMixedRegular: Story = {
  args: {
    labelPlacement: ObcToggleButtonLabelPlacement.inline,
    type: ObcToggleButtonVerticalOptionType.regular,
  },
  render: LabelUnderMixedRegular.render,
};

export const SelectionBehavior: Story = {
  args: {
    type: ObcToggleButtonVerticalOptionType.regular,
    value: 'opt-b',
    labelPlacement: ObcToggleButtonLabelPlacement.inline,
    hasIcon: false,
    disabled: false,
    hugWidth: false,
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <p>
        One option must always be selected. Disabled options cannot be selected.
      </p>
      <div style="width: 300px;">
        <obc-toggle-button-vertical-group
          .value=${args.value}
          .type=${args.type}
          .disabled=${args.disabled}
          .hugWidth=${args.hugWidth}
        >
          <obc-toggle-button-vertical-option
            value="opt-a"
            label="Option A"
            .labelPlacement=${args.labelPlacement}
            .hasIcon=${args.hasIcon}
          >
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-toggle-button-vertical-option>
          <obc-toggle-button-vertical-option
            value="opt-b"
            label="Option B"
            .labelPlacement=${args.labelPlacement}
            .hasIcon=${args.hasIcon}
          >
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-toggle-button-vertical-option>
          <obc-toggle-button-vertical-option
            value="opt-c"
            label="Option C"
            .labelPlacement=${args.labelPlacement}
            .hasIcon=${args.hasIcon}
          >
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-toggle-button-vertical-option>
        </obc-toggle-button-vertical-group>
      </div>
    </div>
  `,
};

export const MixedDisabledStates: Story = {
  args: {
    type: ObcToggleButtonVerticalOptionType.regular,
    value: 'opt-b',
    labelPlacement: ObcToggleButtonLabelPlacement.inline,
    hasIcon: false,
    disabled: false,
    hugWidth: false,
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <p>
        Individual options can be disabled. If selected option becomes disabled,
        selection moves to first available option.
      </p>
      <div style="width: 300px;">
        <obc-toggle-button-vertical-group
          .value=${args.value}
          .type=${args.type}
          .disabled=${args.disabled}
          .hugWidth=${args.hugWidth}
        >
          <obc-toggle-button-vertical-option
            value="opt-a"
            label="Option A"
            .labelPlacement=${args.labelPlacement}
            .hasIcon=${args.hasIcon}
          >
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-toggle-button-vertical-option>
          <obc-toggle-button-vertical-option
            value="opt-b"
            label="Option B (disabled)"
            disabled
            .labelPlacement=${args.labelPlacement}
            .hasIcon=${args.hasIcon}
          >
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-toggle-button-vertical-option>
          <obc-toggle-button-vertical-option
            value="opt-c"
            label="Option C"
            .labelPlacement=${args.labelPlacement}
            .hasIcon=${args.hasIcon}
          >
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-toggle-button-vertical-option>
          <obc-toggle-button-vertical-option
            value="opt-d"
            label="Option D (disabled)"
            disabled
            .labelPlacement=${args.labelPlacement}
            .hasIcon=${args.hasIcon}
          >
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-toggle-button-vertical-option>
        </obc-toggle-button-vertical-group>
      </div>
    </div>
  `,
};

export const InitiallyDisabledSelected: Story = {
  name: 'Initially Disabled Selection Falls Back',
  args: {
    type: ObcToggleButtonVerticalOptionType.regular,
    value: 'opt-b',
    labelPlacement: ObcToggleButtonLabelPlacement.inline,
    hasIcon: false,
    disabled: false,
    hugWidth: false,
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <p>
        If initial value points to a disabled option, it selects the first
        available option. Try changing the value control to 'opt-b' (disabled)
        to see it fall back to Option A.
      </p>
      <div style="width: 300px;">
        <obc-toggle-button-vertical-group
          .value=${args.value}
          .type=${args.type}
          .disabled=${args.disabled}
          .hugWidth=${args.hugWidth}
        >
          <obc-toggle-button-vertical-option
            value="opt-a"
            label="Option A"
            .labelPlacement=${args.labelPlacement}
            .hasIcon=${args.hasIcon}
          >
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-toggle-button-vertical-option>
          <obc-toggle-button-vertical-option
            value="opt-b"
            label="Option B (disabled)"
            disabled
            .labelPlacement=${args.labelPlacement}
            .hasIcon=${args.hasIcon}
          >
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-toggle-button-vertical-option>
          <obc-toggle-button-vertical-option
            value="opt-c"
            label="Option C"
            .labelPlacement=${args.labelPlacement}
            .hasIcon=${args.hasIcon}
          >
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-toggle-button-vertical-option>
        </obc-toggle-button-vertical-group>
      </div>
    </div>
  `,
};
