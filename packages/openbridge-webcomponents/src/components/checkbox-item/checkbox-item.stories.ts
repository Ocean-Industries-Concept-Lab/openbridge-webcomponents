import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {CheckboxStatus} from '../checkbox/checkbox.js';
import {
  ObcCheckboxItem,
  ObcCheckboxItemHoverStyle,
  ObcCheckboxItemState,
} from './checkbox-item.js';
import './checkbox-item.js';

const statusVariants = [
  CheckboxStatus.unchecked,
  CheckboxStatus.checked,
  CheckboxStatus.mixed,
] as const;

const renderStatusGroup = (opts: {
  state: ObcCheckboxItemState;
  hoverStyle: ObcCheckboxItemHoverStyle;
  disabled: boolean;
  label: string;
  isNested: boolean;
  isLevel1: boolean;
  isLevel2: boolean;
}) => html`
  <div style="display:flex; justify-content:flex-start; width:100%;">
    <div style="display:flex; align-items:center; gap:24px; min-height:96px;">
      ${statusVariants.map(
        (status) =>
          html`<obc-checkbox-item
            .status=${status}
            .state=${opts.state}
            .hoverStyle=${opts.hoverStyle}
            .disabled=${opts.disabled}
            .label=${opts.label}
            .isNested=${opts.isNested}
            .isLevel1=${opts.isLevel1}
            .isLevel2=${opts.isLevel2}
          ></obc-checkbox-item>`
      )}
    </div>
  </div>
`;

const renderStateRow = (
  title: string,
  opts: {
    state: ObcCheckboxItemState;
    hoverStyle: ObcCheckboxItemHoverStyle;
    label: string;
    isNested: boolean;
    isLevel1: boolean;
    isLevel2: boolean;
  }
) => html`
  <div style="display:flex; flex-direction:column; gap:8px; width:100%;">
    <div style="font-weight:600;">${title}</div>
    ${renderStatusGroup({
      ...opts,
      disabled: false,
    })}
  </div>
`;

const renderVariantRows = (opts: {
  hoverStyle: ObcCheckboxItemHoverStyle;
  label: string;
  isNested: boolean;
  isLevel1: boolean;
  isLevel2: boolean;
}) => html`
  <div style="display:flex; flex-direction:column; gap:20px; width:100%;">
    ${renderStateRow('Enabled', {
      ...opts,
      state: ObcCheckboxItemState.enabled,
    })}
    ${renderStateRow('Disabled', {
      ...opts,
      state: ObcCheckboxItemState.disabled,
    })}
  </div>
`;

const meta = {
  title: 'UI Components/Selection Controls and Switches/Checkbox Item',
  tags: ['6.0'],
  component: 'obc-checkbox-item',
  parameters: {
    layout: 'centered',
    actions: {
      handles: ['change'],
    },
  },
  render: (args, context) => {
    const checkboxItem = html`<obc-checkbox-item
      .status=${args.status}
      .state=${args.state}
      .disabled=${args.disabled}
      .hoverStyle=${args.hoverStyle}
      .label=${args.label}
      .isNested=${args.isNested}
      .isLevel1=${args.isLevel1}
      .isLevel2=${args.isLevel2}
    ></obc-checkbox-item>`;

    if (context.viewMode === 'docs') {
      return html`<div
        style="display:flex; justify-content:flex-start; width:100%;"
      >
        ${checkboxItem}
      </div>`;
    }

    return html`<div
      style="display:flex; align-items:center; justify-content:center; width:100%; min-height:100vh;"
    >
      <obc-checkbox-item
        style="width:fit-content;"
        .status=${args.status}
        .state=${args.state}
        .disabled=${args.disabled}
        .hoverStyle=${args.hoverStyle}
        .label=${args.label}
        .isNested=${args.isNested}
        .isLevel1=${args.isLevel1}
        .isLevel2=${args.isLevel2}
      ></obc-checkbox-item>
    </div>`;
  },
  argTypes: {
    status: {
      name: 'Status',
      options: [
        CheckboxStatus.unchecked,
        CheckboxStatus.checked,
        CheckboxStatus.mixed,
      ],
      control: {type: 'select'},
    },
    state: {
      name: 'State',
      options: Object.values(ObcCheckboxItemState),
      control: {type: 'select'},
    },
    hoverStyle: {
      name: 'Hover style',
      options: Object.values(ObcCheckboxItemHoverStyle),
      control: {type: 'select'},
    },
    disabled: {
      name: 'Disabled',
      control: {type: 'boolean'},
    },
    label: {
      name: 'Label',
      control: {type: 'text'},
    },
    isNested: {
      name: 'Is nested',
      control: {type: 'boolean'},
    },
    isLevel1: {
      name: 'Is level 1',
      control: {type: 'boolean'},
    },
    isLevel2: {
      name: 'Is level 2',
      control: {type: 'boolean'},
    },
  },
} satisfies Meta<ObcCheckboxItem>;

export default meta;
type Story = StoryObj<ObcCheckboxItem>;

export const Playground: Story = {
  args: {
    status: CheckboxStatus.unchecked,
    state: ObcCheckboxItemState.enabled,
    hoverStyle: ObcCheckboxItemHoverStyle.touchTarget,
    label: 'Label',
    disabled: false,
    isNested: false,
    isLevel1: false,
    isLevel2: false,
  },
};

export const Nested: Story = {
  args: {
    status: CheckboxStatus.unchecked,
    state: ObcCheckboxItemState.enabled,
    hoverStyle: ObcCheckboxItemHoverStyle.touchTarget,
    label: 'Label',
    disabled: false,
    isNested: true,
    isLevel1: false,
    isLevel2: false,
  },
  render: (args) =>
    renderVariantRows({
      hoverStyle: args.hoverStyle,
      label: args.label,
      isNested: true,
      isLevel1: false,
      isLevel2: false,
    }),
};

export const Level1: Story = {
  args: {
    status: CheckboxStatus.unchecked,
    state: ObcCheckboxItemState.enabled,
    hoverStyle: ObcCheckboxItemHoverStyle.touchTarget,
    label: 'Label',
    disabled: false,
    isNested: true,
    isLevel1: true,
    isLevel2: false,
  },
  render: (args) =>
    renderVariantRows({
      hoverStyle: args.hoverStyle,
      label: args.label,
      isNested: true,
      isLevel1: true,
      isLevel2: false,
    }),
};

export const Level2: Story = {
  args: {
    status: CheckboxStatus.unchecked,
    state: ObcCheckboxItemState.enabled,
    hoverStyle: ObcCheckboxItemHoverStyle.touchTarget,
    label: 'Label',
    disabled: false,
    isNested: true,
    isLevel1: false,
    isLevel2: true,
  },
  render: (args) =>
    renderVariantRows({
      hoverStyle: args.hoverStyle,
      label: args.label,
      isNested: true,
      isLevel1: false,
      isLevel2: true,
    }),
};
