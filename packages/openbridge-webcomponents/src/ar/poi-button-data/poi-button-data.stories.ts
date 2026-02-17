import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPoiButtonData} from './poi-button-data.js';
import './poi-button-data.js';
import '../building-blocks/poi-header/poi-header.js';
import '../../icons/icon-placeholder.js';
import {
  ObcPoiButtonType,
  PoiButtonVisualState,
} from '../building-blocks/poi-button/poi-button.js';
import {html} from 'lit';
import {ObcArAlertType} from '../types.js';
import {crossDecorator} from '../../storybook-util.js';

const meta: Meta<ObcPoiButtonData> = {
  title: 'AR/POI Button Data',
  tags: ['autodocs'],
  component: 'obc-poi-button-data',
  decorators: [crossDecorator],
  args: {
    selected: false,
    hasHeader: false,
    type: ObcPoiButtonType.Button,
    relativeDirection: 0,
    alertType: ObcArAlertType.None,
    value: PoiButtonVisualState.Unchecked,
    data: [],
  },
  argTypes: {
    relativeDirection: {
      control: {type: 'range', min: 0, max: 360},
    },
    selected: {
      control: {type: 'boolean'},
    },
    hasHeader: {
      control: {type: 'boolean'},
    },
    alertType: {
      control: {type: 'select'},
      options: Object.values(ObcArAlertType),
    },
    value: {
      control: {type: 'select'},
      options: Object.values(PoiButtonVisualState),
    },
    type: {
      control: {type: 'select'},
      options: Object.values(ObcPoiButtonType),
    },
  },
  render: (args) => {
    return html`
      <obc-poi-button-data
        .data=${args.data}
        .selected=${args.selected}
        .hasHeader=${args.hasHeader}
        .relativeDirection=${args.relativeDirection}
        .alertType=${args.alertType}
        .value=${args.value}
        .type=${args.type}
      >
        <obc-poi-header
          slot="header"
          content="1"
          type="id"
          state="selected"
          size="regular"
          has-indicator
        >
          <obi-placeholder slot="indicator"></obi-placeholder>
        </obc-poi-header>
      </obc-poi-button-data>
    `;
  },
} satisfies Meta<ObcPoiButtonData>;

export default meta;
type Story = StoryObj<ObcPoiButtonData>;

export const Button: Story = {
  args: {},
};

export const Enhanced: Story = {
  args: {
    type: ObcPoiButtonType.Enhanced,
  },
};

export const WithHeader: Story = {
  args: {
    hasHeader: true,
  },
};

export const WithValues: Story = {
  args: {
    data: [
      {value: '10', label: 'Lab', unit: 'Unit'},
      {value: '20', label: 'Lab 2', unit: 'Unit 2'},
    ],
  },
};
