import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcFormGroup, FormGroupType} from './form-group.js';
import './form-group.js';
import '../form-item/form-item.js';
import {FormItemType} from '../form-item/form-item.js';

const meta: Meta<ObcFormGroup> = {
  title: 'UI Components/Forms/Form Group',
  tags: ['autodocs', '6.1'],
  component: 'obc-form-group',
  args: {
    type: FormGroupType.View,
    subtitle: 'Subtitle',
    description: 'Some text here to describe what this part is about',
  },
  argTypes: {
    type: {
      control: {type: 'select'},
      options: Object.values(FormGroupType),
    },
    subtitle: {control: 'text'},
    description: {control: 'text'},
  },
  render: (args) => html`
    <div style="width: 500px;">
      <obc-form-group
        .type=${args.type}
        .subtitle=${args.subtitle}
        .description=${args.description}
      >
        <obc-form-item
          .type=${args.type === FormGroupType.Enabled
            ? FormItemType.EnabledActionFirst
            : args.type === FormGroupType.Filled
              ? FormItemType.FilledStatusFirst
              : args.type === FormGroupType.Inactive
                ? FormItemType.Inactive
                : FormItemType.View}
          label="This is a list item with multiple lines that can take up as much space as it needs. Like it can be really long and go on for a while."
          showDivider
        ></obc-form-item>
        <obc-form-item
          .type=${args.type === FormGroupType.Enabled
            ? FormItemType.EnabledActionFirst
            : args.type === FormGroupType.Filled
              ? FormItemType.FilledStatusFirst
              : args.type === FormGroupType.Inactive
                ? FormItemType.Inactive
                : FormItemType.View}
          label="This is a list item with multiple lines that can take up as much space as it needs. Like it can be really long and go on for a while."
        ></obc-form-item>
      </obc-form-group>
    </div>
  `,
};

export default meta;
type Story = StoryObj<ObcFormGroup>;

export const View: Story = {
  args: {type: FormGroupType.View},
};

export const EnabledActionFirst: Story = {
  args: {type: FormGroupType.Enabled},
};

export const FilledStatusFirst: Story = {
  args: {type: FormGroupType.Filled},
};

export const EnabledActionLast: Story = {
  args: {type: FormGroupType.Enabled},
  render: (args) => html`
    <div style="width: 500px;">
      <obc-form-group
        .type=${args.type}
        .subtitle=${args.subtitle}
        .description=${args.description}
      >
        <obc-form-item
          type="enabled-action-last"
          label="This is a list item with multiple lines that can take up as much space as it needs. Like it can be really long and go on for a while."
          showDivider
        ></obc-form-item>
        <obc-form-item
          type="enabled-action-last"
          label="This is a list item with multiple lines that can take up as much space as it needs. Like it can be really long and go on for a while."
        ></obc-form-item>
      </obc-form-group>
    </div>
  `,
};

export const FilledStatusLast: Story = {
  args: {type: FormGroupType.Filled},
  render: (args) => html`
    <div style="width: 500px;">
      <obc-form-group
        .type=${args.type}
        .subtitle=${args.subtitle}
        .description=${args.description}
      >
        <obc-form-item
          type="filled-status-last"
          label="This is a list item with multiple lines that can take up as much space as it needs. Like it can be really long and go on for a while."
          checked
          showDivider
        ></obc-form-item>
        <obc-form-item
          type="filled-status-last"
          label="This is a list item with multiple lines that can take up as much space as it needs. Like it can be really long and go on for a while."
          checked
        ></obc-form-item>
      </obc-form-group>
    </div>
  `,
};

export const Inactive: Story = {
  args: {type: FormGroupType.Inactive},
};

export const AllTypes: Story = {
  render: () => html`
    <div
      style="width: 500px; display: flex; flex-direction: column; gap: 32px;"
    >
      <obc-form-group
        type="view"
        subtitle="Subtitle"
        description="Some text here to describe what this part is about"
      >
        <obc-form-item
          type="view"
          label="This is a list item with multiple lines that can take up as much space as it needs. Like it can be really long and go on for a while."
          showDivider
        ></obc-form-item>
        <obc-form-item
          type="view"
          label="This is a list item with multiple lines that can take up as much space as it needs. Like it can be really long and go on for a while."
        ></obc-form-item>
      </obc-form-group>

      <obc-form-group
        type="enabled"
        subtitle="Subtitle"
        description="Some text here to describe what this part is about"
      >
        <obc-form-item
          type="enabled-action-first"
          label="This is a list item with multiple lines that can take up as much space as it needs. Like it can be really long and go on for a while."
          showDivider
        ></obc-form-item>
        <obc-form-item
          type="enabled-action-first"
          label="This is a list item with multiple lines that can take up as much space as it needs. Like it can be really long and go on for a while."
        ></obc-form-item>
      </obc-form-group>

      <obc-form-group
        type="filled"
        subtitle="Subtitle"
        description="Some text here to describe what this part is about"
      >
        <obc-form-item
          type="filled-status-first"
          label="This is a list item with multiple lines that can take up as much space as it needs. Like it can be really long and go on for a while."
          checked
          showDivider
        ></obc-form-item>
        <obc-form-item
          type="filled-status-first"
          label="This is a list item with multiple lines that can take up as much space as it needs. Like it can be really long and go on for a while."
          checked
        ></obc-form-item>
      </obc-form-group>

      <obc-form-group
        type="enabled"
        subtitle="Subtitle"
        description="Some text here to describe what this part is about"
      >
        <obc-form-item
          type="enabled-action-last"
          label="This is a list item with multiple lines that can take up as much space as it needs. Like it can be really long and go on for a while."
          showDivider
        ></obc-form-item>
        <obc-form-item
          type="enabled-action-last"
          label="This is a list item with multiple lines that can take up as much space as it needs. Like it can be really long and go on for a while."
        ></obc-form-item>
      </obc-form-group>

      <obc-form-group
        type="filled"
        subtitle="Subtitle"
        description="Some text here to describe what this part is about"
      >
        <obc-form-item
          type="filled-status-last"
          label="This is a list item with multiple lines that can take up as much space as it needs. Like it can be really long and go on for a while."
          checked
          showDivider
        ></obc-form-item>
        <obc-form-item
          type="filled-status-last"
          label="This is a list item with multiple lines that can take up as much space as it needs. Like it can be really long and go on for a while."
          checked
        ></obc-form-item>
      </obc-form-group>

      <obc-form-group
        type="inactive"
        subtitle="Subtitle"
        description="Some text here to describe what this part is about"
      >
        <obc-form-item
          type="inactive"
          label="This is a list item with multiple lines that can take up as much space as it needs. Like it can be really long and go on for a while."
        ></obc-form-item>
        <obc-form-item
          type="inactive"
          label="This is a list item with multiple lines that can take up as much space as it needs. Like it can be really long and go on for a while."
        ></obc-form-item>
      </obc-form-group>
    </div>
  `,
};

export const RichTextSubtitle: Story = {
  render: () => html`
    <div style="width: 500px;">
      <obc-form-group type="enabled" description="Monitor gas concentrations">
        <span slot="subtitle">CO<sub>2</sub> Settings</span>
        <obc-form-item
          type="enabled-action-first"
          label="Enable monitoring"
          showDivider
        ></obc-form-item>
        <obc-form-item
          type="enabled-action-first"
          label="Enable alerts"
        ></obc-form-item>
      </obc-form-group>
    </div>
  `,
};
