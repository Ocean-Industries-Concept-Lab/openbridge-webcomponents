import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  ObcPoiHeader,
  ObcPoiHeaderSize,
  ObcPoiHeaderState,
  ObcPoiHeaderType,
} from './poi-header.js';
import './poi-header.js';

const meta: Meta<ObcPoiHeader> = {
  title: 'AR/Building blocks/POI Header',
  tags: ['autodocs'],
  component: 'obc-poi-header',
  args: {
    content: '1',
    label: 'Data',
    size: ObcPoiHeaderSize.Regular,
    state: ObcPoiHeaderState.Selected,
    type: ObcPoiHeaderType.Data,
    hasIndicator: true,
  },
  argTypes: {
    size: {
      control: {type: 'select'},
      options: Object.values(ObcPoiHeaderSize),
    },
    state: {
      control: {type: 'select'},
      options: Object.values(ObcPoiHeaderState),
    },
    type: {
      control: {type: 'select'},
      options: Object.values(ObcPoiHeaderType),
    },
  },
  render: (args) => html`
    <div
      style="display: flex; align-items: center; justify-content: center; min-height: 72px; padding: 16px;"
    >
      <obc-poi-header
        .content=${args.content}
        .label=${args.label}
        .size=${args.size}
        .state=${args.state}
        .type=${args.type}
        .hasIndicator=${args.hasIndicator}
      ></obc-poi-header>
    </div>
  `,
};

export default meta;
type Story = StoryObj<ObcPoiHeader>;

export const Interactive: Story = {};

export const DataStates: Story = {
  render: () => html`
    <div style="padding: 16px; background: #fff; width: 320px;">
      <div
        style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;"
      >
        <obc-poi-header
          type=${ObcPoiHeaderType.Data}
          state=${ObcPoiHeaderState.Enabled}
          content="1"
          label="Data"
          has-indicator
        ></obc-poi-header>
        <obc-poi-header
          type=${ObcPoiHeaderType.Data}
          state=${ObcPoiHeaderState.Selected}
          content="1"
          label="Data"
          has-indicator
        ></obc-poi-header>
        <obc-poi-header
          type=${ObcPoiHeaderType.Data}
          state=${ObcPoiHeaderState.Caution}
          content="1"
          label="Data"
          has-indicator
        ></obc-poi-header>
        <obc-poi-header
          type=${ObcPoiHeaderType.Data}
          state=${ObcPoiHeaderState.Warning}
          content="1"
          label="Data"
          has-indicator
        ></obc-poi-header>
        <obc-poi-header
          type=${ObcPoiHeaderType.Data}
          state=${ObcPoiHeaderState.Alarm}
          content="1"
          label="Data"
          has-indicator
        ></obc-poi-header>
      </div>
    </div>
  `,
};

export const IdStates: Story = {
  render: () => html`
    <div style="padding: 16px; width: 320px;">
      <div
        style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;"
      >
        <obc-poi-header
          type=${ObcPoiHeaderType.Id}
          state=${ObcPoiHeaderState.Enabled}
          content="1"
          has-indicator
        ></obc-poi-header>
        <obc-poi-header
          type=${ObcPoiHeaderType.Id}
          state=${ObcPoiHeaderState.Selected}
          content="1"
          has-indicator
        ></obc-poi-header>
        <obc-poi-header
          type=${ObcPoiHeaderType.Id}
          state=${ObcPoiHeaderState.Caution}
          content="1"
          has-indicator
        ></obc-poi-header>
        <obc-poi-header
          type=${ObcPoiHeaderType.Id}
          state=${ObcPoiHeaderState.Warning}
          content="1"
          has-indicator
        ></obc-poi-header>
        <obc-poi-header
          type=${ObcPoiHeaderType.Id}
          state=${ObcPoiHeaderState.Alarm}
          content="1"
          has-indicator
        ></obc-poi-header>
      </div>
    </div>
  `,
};
