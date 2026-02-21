import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, nothing} from 'lit';
import {ObcFormItem, FormItemType} from './form-item.js';
import './form-item.js';
import '../../icons/icon-placeholder.js';

const meta: Meta<ObcFormItem> = {
  title: 'UI Components/Forms/Form Item',
  tags: ['autodocs', '6.1'],
  component: 'obc-form-item',
  args: {
    type: FormItemType.View,
    label:
      'This is a list item with multiple lines that can take up as much space as it needs. Like it can be really long and go on for a while.',
    checked: false,
    disabled: false,
    hasIcon: false,
    hasError: false,
    errorText: '',
    showDivider: false,
  },
  argTypes: {
    type: {
      control: {type: 'select'},
      options: Object.values(FormItemType),
    },
    label: {control: 'text'},
    errorText: {control: 'text'},
  },
  render: (args) => html`
    <div style="width: 500px;">
      <obc-form-item
        .type=${args.type}
        .label=${args.label}
        ?checked=${args.checked}
        ?disabled=${args.disabled}
        ?hasIcon=${args.hasIcon}
        ?hasError=${args.hasError}
        .errorText=${args.errorText}
        ?showDivider=${args.showDivider}
      >
        ${args.hasIcon
          ? html`<obi-placeholder slot="icon"></obi-placeholder>`
          : nothing}
      </obc-form-item>
    </div>
  `,
};

export default meta;
type Story = StoryObj<ObcFormItem>;

export const View: Story = {
  args: {type: FormItemType.View, showDivider: true},
};

export const ViewWithIcon: Story = {
  args: {type: FormItemType.View, hasIcon: true, showDivider: true},
};

export const EnabledActionFirst: Story = {
  args: {type: FormItemType.EnabledActionFirst, showDivider: true},
};

export const EnabledActionFirstChecked: Story = {
  args: {
    type: FormItemType.EnabledActionFirst,
    checked: true,
    showDivider: true,
  },
};

export const EnabledActionFirstWithError: Story = {
  args: {
    type: FormItemType.EnabledActionFirst,
    hasError: true,
    errorText: 'Error text',
    showDivider: true,
  },
};

export const FilledStatusFirst: Story = {
  args: {
    type: FormItemType.FilledStatusFirst,
    checked: true,
    showDivider: true,
  },
};

export const EnabledActionLast: Story = {
  args: {type: FormItemType.EnabledActionLast, showDivider: true},
};

export const EnabledActionLastChecked: Story = {
  args: {
    type: FormItemType.EnabledActionLast,
    checked: true,
    showDivider: true,
  },
};

export const EnabledActionLastWithError: Story = {
  args: {
    type: FormItemType.EnabledActionLast,
    hasError: true,
    errorText: 'Error text',
    showDivider: true,
  },
};

export const FilledStatusLast: Story = {
  args: {
    type: FormItemType.FilledStatusLast,
    checked: true,
    showDivider: true,
  },
};

export const Inactive: Story = {
  args: {type: FormItemType.Inactive},
};

export const Disabled: Story = {
  args: {type: FormItemType.EnabledActionFirst, disabled: true},
};

export const AllTypes: Story = {
  render: () => html`
    <div
      style="width: 500px; display: flex; flex-direction: column; gap: 24px;"
    >
      <obc-form-item
        type="view"
        label="View — read-only text row"
        showDivider
      ></obc-form-item>

      <obc-form-item
        type="enabled-action-first"
        label="Enabled action first — checkbox left"
        showDivider
      ></obc-form-item>

      <obc-form-item
        type="filled-status-first"
        label="Filled status first — check icon left"
        checked
        showDivider
      ></obc-form-item>

      <obc-form-item
        type="enabled-action-last"
        label="Enabled action last — checkbox right"
        showDivider
      ></obc-form-item>

      <obc-form-item
        type="filled-status-last"
        label="Filled status last — check icon right"
        checked
        showDivider
      ></obc-form-item>

      <obc-form-item
        type="inactive"
        label="Inactive — greyed out"
      ></obc-form-item>
    </div>
  `,
};

export const RichTextSlot: Story = {
  render: () => html`
    <div style="width: 500px;">
      <obc-form-item type="enabled-action-first" showDivider>
        <span slot="label">CO<sub>2</sub> concentration level</span>
      </obc-form-item>
    </div>
  `,
};
