/* toggle-button-vertical-group.stories.ts */
import {html, nothing} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';

import '../../icons/icon-placeholder.js';

import './toggle-button-vertical-group.js';
import {ObcToggleButtonVerticalGroup} from './toggle-button-vertical-group.js';

import '../toggle-button-vertical-option/toggle-button-vertical-option.js';
import {
  ObcToggleButtonVerticalOptionType,
  ObcToggleButtonLabelPlacement,
} from '../toggle-button-vertical-option/toggle-button-vertical-option.js';

/* ───────────────── meta ───────────────── */

const meta: Meta<typeof ObcToggleButtonVerticalGroup> = {
  title: 'UI Components/Buttons/Toggle button – Vertical',
  component: 'obc-toggle-button-vertical-group',

  args: {
    value: 'opt-a',
    type: ObcToggleButtonVerticalOptionType.regular,
    labelPlacement: ObcToggleButtonLabelPlacement.inline,
    hasIcon: true,
    disabled: false,
  },

  parameters: {actions: {handles: ['value']}},

  argTypes: {
    value: {control: 'text'},
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
  },

  render: (args) => {
    /* shrink wrapper only when every button will be compact */
    const wrapperWidth =
      args.labelPlacement === ObcToggleButtonLabelPlacement.under
        ? 'fit-content'
        : '300px';

    return html`
      <div style="width:${wrapperWidth};">
        <obc-toggle-button-vertical-group
          .value=${args.value}
          .type=${args.type}
        >
          <!-- icon + label -->
          <obc-toggle-button-vertical-option
            value="opt-a"
            label="Option A"
            .hasIcon=${args.hasIcon}
            .labelPlacement=${args.labelPlacement}
            .disabled=${args.disabled}
          >
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-toggle-button-vertical-option>

          <!-- icon + label -->
          <obc-toggle-button-vertical-option
            value="opt-b"
            label="Option B"
            .hasIcon=${args.hasIcon}
            .labelPlacement=${args.labelPlacement}
            .disabled=${args.disabled}
          >
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-toggle-button-vertical-option>

          <!-- label only (shows alignment) -->
          <obc-toggle-button-vertical-option
            value="opt-c"
            label="Option C"
            .hasIcon=${args.hasIcon}
            .labelPlacement=${args.labelPlacement}
            .disabled=${args.disabled}
          >
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-toggle-button-vertical-option>
        </obc-toggle-button-vertical-group>
      </div>
    `;
  },
};
export default meta;

/* ───────────── stories ───────────── */

type Story = StoryObj<ObcToggleButtonVerticalGroup>;

export const Regular: Story = {};

/** Inline + Flat – all options have icon and label */
export const Flat: Story = {
  args: {type: ObcToggleButtonVerticalOptionType.flat},
};

/** Icons only – Regular */
export const IconsOnlyRegular: Story = {
  args: {type: ObcToggleButtonVerticalOptionType.regular},
  render: (args) => html`
    <div style="width:fit-content;">
      <obc-toggle-button-vertical-group .value=${args.value} .type=${args.type}>
        ${['a', 'b', 'c'].map(
          (k) => html`
            <obc-toggle-button-vertical-option
              .value=${`opt-${k}`}
              .hasIcon=${true}
              .disabled=${args.disabled}
            >
              <obi-placeholder slot="icon"></obi-placeholder>
            </obc-placeholder>
          `
        )}
      </obc-toggle-button-vertical-group>
    </div>
  `,
};

/** Icons only – Flat */
export const IconsOnlyFlat: Story = {
  args: {type: ObcToggleButtonVerticalOptionType.flat},
  render: IconsOnlyRegular.render,
};

/** Label under – Regular – all with icon */
export const LabelUnderRegular: Story = {
  args: {
    labelPlacement: ObcToggleButtonLabelPlacement.under,
    type: ObcToggleButtonVerticalOptionType.regular,
  },
  render: (args) => html`
    <div style="width:fit-content;">
      <obc-toggle-button-vertical-group .value=${args.value} .type=${args.type}>
        ${['a', 'b', 'c'].map(
          (k) => html`
            <obc-toggle-button-vertical-option
              .value=${`opt-${k}`}
              label="Label"
              .hasIcon=${true}
              .labelPlacement=${args.labelPlacement}
              .disabled=${args.disabled}
            >
              <obi-placeholder slot="icon"></obi-placeholder>
            </obc-toggle-button-vertical-option>
          `
        )}
      </obc-toggle-button-vertical-group>
    </div>
  `,
};

/** Label under – Flat – all with icon */
export const LabelUnderFlat: Story = {
  args: {
    labelPlacement: ObcToggleButtonLabelPlacement.under,
    type: ObcToggleButtonVerticalOptionType.flat,
  },
  render: LabelUnderRegular.render,
};

/** Label under – Mixed icons (some with, some without) – Regular */
export const LabelUnderMixedRegular: Story = {
  args: {
    labelPlacement: ObcToggleButtonLabelPlacement.under,
    type: ObcToggleButtonVerticalOptionType.regular,
  },
  render: (args) => html`
    <div style="width:fit-content;">
      <obc-toggle-button-vertical-group .value=${args.value} .type=${args.type}>
        <obc-toggle-button-vertical-option
          value="opt-a"
          label="With icon"
          .hasIcon=${true}
          .labelPlacement=${args.labelPlacement}
          .disabled=${args.disabled}
        >
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-vertical-option>

        <obc-toggle-button-vertical-option
          value="opt-b"
          label="No icon"
          .hasIcon=${false}
          .labelPlacement=${args.labelPlacement}
          .disabled=${args.disabled}
        ></obc-toggle-button-vertical-option>

        <obc-toggle-button-vertical-option
          value="opt-c"
          label="With icon"
          .hasIcon=${true}
          .labelPlacement=${args.labelPlacement}
          .disabled=${args.disabled}
        >
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-vertical-option>
      </obc-toggle-button-vertical-group>
    </div>
  `,
};

/** Label under – Mixed icons (some with, some without) – Regular */
export const IconUnderMixedRegular: Story = {
  args: {
    labelPlacement: ObcToggleButtonLabelPlacement.under,
    type: ObcToggleButtonVerticalOptionType.regular,
  },
  render: (args) => html`
    <div style="width:fit-content;">
      <obc-toggle-button-vertical-group .value=${args.value} .type=${args.type}>
        <obc-toggle-button-vertical-option
          value="opt-a"
          label="With icon"
          .hasIcon=${true}
          .labelPlacement=${args.labelPlacement}
          .disabled=${args.disabled}
        >
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-vertical-option>

        <obc-toggle-button-vertical-option
          value="opt-b"
          .hasIcon=${true}
          .labelPlacement=${args.labelPlacement}
          .disabled=${args.disabled}
        >
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-vertical-option>

        <obc-toggle-button-vertical-option
          value="opt-c"
          label="With icon"
          .hasIcon=${true}
          .labelPlacement=${args.labelPlacement}
          .disabled=${args.disabled}
        >
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-vertical-option>
      </obc-toggle-button-vertical-group>
    </div>
  `,
};

/** Inline – Mixed icons – Flat */
export const InlineMixedFlat: Story = {
  args: {
    labelPlacement: ObcToggleButtonLabelPlacement.inline,
    type: ObcToggleButtonVerticalOptionType.flat,
  },
  render: LabelUnderMixedRegular.render,
};

/** Inline – Mixed icons – Regular */
export const InlineMixedRegular: Story = {
  args: {
    labelPlacement: ObcToggleButtonLabelPlacement.inline,
    type: ObcToggleButtonVerticalOptionType.regular,
  },
  render: LabelUnderMixedRegular.render,
};

/** All options disabled */
export const DisabledOnly: Story = {
  args: {
    disabled: true,
  },
};
