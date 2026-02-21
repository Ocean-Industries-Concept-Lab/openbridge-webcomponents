import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcTitleContainer, TitleContainerState} from './title-container.js';
import './title-container.js';
import '../../icons/icon-placeholder.js';

const meta: Meta<ObcTitleContainer> = {
  title: 'UI Components/Forms/Title Container',
  tags: ['autodocs', '6.1'],
  component: 'obc-title-container',
  args: {
    state: TitleContainerState.Enabled,
    title: 'Title',
    label: 'Label',
    hasIcon: false,
    hasAction1: false,
    hasAction2: false,
  },
  argTypes: {
    state: {
      control: {type: 'select'},
      options: Object.values(TitleContainerState),
    },
    title: {control: 'text'},
    label: {control: 'text'},
  },
  render: (args) => html`
    <div style="width: 640px;">
      <obc-title-container
        .state=${args.state}
        .title=${args.title}
        .label=${args.label}
        ?hasIcon=${args.hasIcon}
        ?hasAction1=${args.hasAction1}
        ?hasAction2=${args.hasAction2}
      >
        <obi-placeholder slot="icon"></obi-placeholder>
        <obi-placeholder slot="action-1"></obi-placeholder>
        <obi-placeholder slot="action-2"></obi-placeholder>
      </obc-title-container>
    </div>
  `,
};

export default meta;
type Story = StoryObj<ObcTitleContainer>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {hasIcon: true},
};

export const WithActions: Story = {
  args: {hasAction1: true, hasAction2: true},
};

export const WithIconAndActions: Story = {
  args: {hasIcon: true, hasAction1: true, hasAction2: true},
};

export const Inactive: Story = {
  args: {state: TitleContainerState.Inactive, hasIcon: true},
};

export const AllVariants: Story = {
  render: () => html`
    <div
      style="width: 640px; display: flex; flex-direction: column; gap: 16px;"
    >
      <obc-title-container
        title="Enabled"
        label="No actions"
      ></obc-title-container>

      <obc-title-container title="Enabled" label="With icon" hasIcon>
        <obi-placeholder slot="icon"></obi-placeholder>
      </obc-title-container>

      <obc-title-container
        title="Enabled"
        label="With actions"
        hasIcon
        hasAction1
        hasAction2
      >
        <obi-placeholder slot="icon"></obi-placeholder>
        <obi-placeholder slot="action-1"></obi-placeholder>
        <obi-placeholder slot="action-2"></obi-placeholder>
      </obc-title-container>

      <obc-title-container
        state="inactive"
        title="Inactive"
        label="With actions"
        hasIcon
        hasAction1
        hasAction2
      >
        <obi-placeholder slot="icon"></obi-placeholder>
        <obi-placeholder slot="action-1"></obi-placeholder>
        <obi-placeholder slot="action-2"></obi-placeholder>
      </obc-title-container>
    </div>
  `,
};

export const RichTextTitle: Story = {
  args: {hasIcon: true},
  render: (args) => html`
    <div style="width: 640px;">
      <obc-title-container
        .state=${args.state}
        label="Settings"
        ?hasIcon=${args.hasIcon}
      >
        <obi-placeholder slot="icon"></obi-placeholder>
        <span slot="title">CO<sub>2</sub> Monitor</span>
      </obc-title-container>
    </div>
  `,
};
