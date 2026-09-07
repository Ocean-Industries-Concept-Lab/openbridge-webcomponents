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

type RowOptions = {
  hoverStyle: ObcCheckboxItemHoverStyle;
  label: string;
  description: string;
  level: number;
  expandable: boolean;
  expanded: boolean;
};

const renderStatusGroup = (
  opts: RowOptions & {state: ObcCheckboxItemState; disabled: boolean}
) => html`
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
            .description=${opts.description}
            .level=${opts.level}
            .expandable=${opts.expandable}
            .expanded=${opts.expanded}
          ></obc-checkbox-item>`
      )}
    </div>
  </div>
`;

const renderStateRow = (
  title: string,
  opts: RowOptions & {state: ObcCheckboxItemState}
) => html`
  <div style="display:flex; flex-direction:column; gap:8px; width:100%;">
    <div style="font-weight:600;">${title}</div>
    ${renderStatusGroup({
      ...opts,
      disabled: false,
    })}
  </div>
`;

const renderVariantRows = (opts: RowOptions) => html`
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
      handles: ['change', 'expand-toggle'],
    },
  },
  render: (args, context) => {
    const checkboxItem = html`<obc-checkbox-item
      .status=${args.status}
      .state=${args.state}
      .disabled=${args.disabled}
      .hoverStyle=${args.hoverStyle}
      .label=${args.label}
      .description=${args.description}
      .level=${args.level}
      .expandable=${args.expandable}
      .expanded=${args.expanded}
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
        .description=${args.description}
        .level=${args.level}
        .expandable=${args.expandable}
        .expanded=${args.expanded}
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
    label: {
      name: 'Label',
      control: {type: 'text'},
    },
    description: {
      name: 'Description',
      control: {type: 'text'},
    },
    level: {
      name: 'Level',
      control: {type: 'number', min: 0, max: 4, step: 1},
    },
    expandable: {
      name: 'Expandable',
      control: {type: 'boolean'},
    },
    expanded: {
      name: 'Expanded',
      control: {type: 'boolean'},
      if: {arg: 'expandable', truthy: true},
    },
  },
} satisfies Meta<ObcCheckboxItem>;

export default meta;
type Story = StoryObj<ObcCheckboxItem>;

const defaultArgs = {
  status: CheckboxStatus.unchecked,
  state: ObcCheckboxItemState.enabled,
  hoverStyle: ObcCheckboxItemHoverStyle.touchTarget,
  label: 'Label',
  description: '',
  disabled: false,
  level: 0,
  expandable: false,
  expanded: false,
};

export const Playground: Story = {
  args: defaultArgs,
};

export const Nested: Story = {
  args: {...defaultArgs, level: 1},
  render: (args) =>
    renderVariantRows({
      hoverStyle: args.hoverStyle,
      label: args.label,
      description: '',
      level: 1,
      expandable: false,
      expanded: false,
    }),
};

export const Expandable: Story = {
  args: {...defaultArgs, level: 1, expandable: true},
  render: (args) => html`
    <div style="display:flex; flex-direction:column; gap:20px; width:100%;">
      ${renderStateRow('Collapsed', {
        state: ObcCheckboxItemState.enabled,
        hoverStyle: args.hoverStyle,
        label: args.label,
        description: '',
        level: 1,
        expandable: true,
        expanded: false,
      })}
      ${renderStateRow('Expanded', {
        state: ObcCheckboxItemState.enabled,
        hoverStyle: args.hoverStyle,
        label: args.label,
        description: '',
        level: 1,
        expandable: true,
        expanded: true,
      })}
    </div>
  `,
};

export const Level2: Story = {
  args: {...defaultArgs, level: 2},
  render: (args) =>
    renderVariantRows({
      hoverStyle: args.hoverStyle,
      label: args.label,
      description: '',
      level: 2,
      expandable: false,
      expanded: false,
    }),
};

export const WithDescription: Story = {
  args: {...defaultArgs, description: 'Description'},
  render: (args) =>
    renderVariantRows({
      hoverStyle: args.hoverStyle,
      label: args.label,
      description: args.description,
      level: 0,
      expandable: false,
      expanded: false,
    }),
};
