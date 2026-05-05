import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPoiButtonData} from './poi-button-data.js';
import './poi-button-data.js';
import '../building-blocks/poi-header/poi-header.js';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-vessel-generic-default-filled.js';
import {
  ObcPoiButtonLayout,
  ObcPoiButtonState,
  ObcPoiButtonType,
  PoiButtonVisualState,
} from './poi-button.js';
import {html} from 'lit';
import {crossDecorator} from '../../storybook-util.js';

const meta: Meta<ObcPoiButtonData> = {
  title: 'AR/POI Button/POI Button Data',
  tags: ['autodocs'],
  component: 'obc-poi-button-data',
  decorators: [crossDecorator],
  args: {
    selected: false,
    hasHeader: false,
    type: ObcPoiButtonType.Button,
    layout: ObcPoiButtonLayout.Anchored,
    relativeDirection: 0,
    state: ObcPoiButtonState.Enabled,
    value: PoiButtonVisualState.Unchecked,
    inExpandedGroup: false,
    data: [],
  },
  argTypes: {
    relativeDirection: {
      control: {type: 'range', min: 0, max: 360},
    },
    selected: {
      control: {type: 'boolean'},
    },
    hasData: {
      control: false,
      table: {disable: true},
    },
    hasHeader: {
      control: {type: 'boolean'},
    },
    state: {
      control: {type: 'select'},
      options: Object.values(ObcPoiButtonState),
    },
    header: {
      control: false,
      table: {disable: true},
    },
    value: {
      control: {type: 'select'},
      options: Object.values(PoiButtonVisualState),
    },
    type: {
      control: {type: 'select'},
      options: Object.values(ObcPoiButtonType),
    },
    layout: {
      control: {type: 'select'},
      options: Object.values(ObcPoiButtonLayout),
    },
    inExpandedGroup: {
      control: {type: 'boolean'},
    },
    resolvedHeaderState: {
      control: false,
      table: {disable: true},
    },
    resolvedHeaderType: {
      control: false,
      table: {disable: true},
    },
    resolvedHeaderSize: {
      control: false,
      table: {disable: true},
    },
    poiObjectType: {
      control: false,
      table: {disable: true},
    },
    poiObjectState: {
      control: false,
      table: {disable: true},
    },
    selectionFrameType: {
      control: false,
      table: {disable: true},
    },
    selectionFrameState: {
      control: false,
      table: {disable: true},
    },
  },
  parameters: {
    controls: {
      include: [
        'selected',
        'hasHeader',
        'type',
        'layout',
        'relativeDirection',
        'state',
        'value',
        'inExpandedGroup',
        'data',
      ],
    },
    docs: {
      controls: {
        include: [
          'selected',
          'hasHeader',
          'type',
          'layout',
          'relativeDirection',
          'state',
          'value',
          'inExpandedGroup',
          'data',
        ],
      },
    },
  },
  render: (args) => {
    return html`
      <obc-poi-button-data
        .data=${args.data}
        .selected=${args.selected}
        .hasHeader=${args.hasHeader}
        .relativeDirection=${args.relativeDirection}
        .layout=${args.layout}
        .state=${args.state}
        .value=${args.value}
        .type=${args.type}
        .inExpandedGroup=${args.inExpandedGroup}
      >
        <obi-vessel-generic-default-filled></obi-vessel-generic-default-filled>
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
