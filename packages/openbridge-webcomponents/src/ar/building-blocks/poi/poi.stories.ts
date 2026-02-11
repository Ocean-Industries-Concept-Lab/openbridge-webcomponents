import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {crossDecorator} from '../../../storybook-util.js';
import './poi.js';
import {ObcPoi, ObcPoiState, ObcPoiType, ObcPoiValue} from './poi.js';
import {
  ObcPoiPointerState,
  ObcPoiPointerType,
} from '../poi-pointer/poi-pointer.js';
import {
  ObcPoiHeaderSize,
  ObcPoiHeaderState,
  ObcPoiHeaderType,
} from '../poi-header/poi-header.js';
import '../../../icons/icon-placeholder.js';
import '../../../icons/icon-collision-avoidance-overtaking.js';

const meta: Meta<ObcPoi> = {
  title: 'AR/Building blocks/POI',
  tags: ['autodocs'],
  component: 'obc-poi',
  decorators: [crossDecorator],
  args: {
    type: ObcPoiType.Line,
    value: ObcPoiValue.Unchecked,
    state: ObcPoiState.Enabled,
    x: 444,
    y: 96,
    buttonY: 80,
    fixedTarget: false,
    outsideAngle: 315,
    hasPointer: false,
    pointerType: undefined,
    pointerState: undefined,
    animatePosition: false,
    relativeDirection: 0,
    buttonOffsetX: 0,
    targetOffsetX: 0,
    header: null,
    selected: false,
    hasRelation: false,
    data: [],
  },
  argTypes: {
    type: {
      control: {type: 'select'},
      options: Object.values(ObcPoiType),
    },
    value: {
      control: {type: 'select'},
      options: Object.values(ObcPoiValue),
    },
    state: {
      control: {type: 'select'},
      options: Object.values(ObcPoiState),
    },
    x: {control: {type: 'range', min: 0, max: 888, step: 1}},
    y: {control: {type: 'range', min: 0, max: 280, step: 1}},
    buttonY: {control: {type: 'range', min: 0, max: 480, step: 1}},
    fixedTarget: {control: {type: 'boolean'}},
    outsideAngle: {
      control: {type: 'range', min: 0, max: 360, step: 1},
      if: {arg: 'type', eq: ObcPoiType.Outside},
    },
    hasPointer: {control: {type: 'boolean'}},
    pointerType: {
      control: {type: 'select'},
      options: [undefined, ...Object.values(ObcPoiPointerType)],
    },
    pointerState: {
      control: {type: 'select'},
      options: [undefined, ...Object.values(ObcPoiPointerState)],
    },
    animatePosition: {control: {type: 'boolean'}},
    relativeDirection: {control: {type: 'range', min: 0, max: 360}},
    buttonOffsetX: {control: {type: 'range', min: -150, max: 150, step: 1}},
    targetOffsetX: {control: {type: 'range', min: -150, max: 150, step: 1}},
    header: {control: {type: 'object'}},
    selected: {control: {type: 'boolean'}},
    hasRelation: {control: {type: 'boolean'}},
    data: {
      control: 'object',
      description:
        'Array of value objects with value, label, and unit (also accepts JSON via values attribute)',
    },
  },
  parameters: {
    controls: {
      include: [
        'type',
        'value',
        'state',
        'x',
        'y',
        'buttonY',
        'fixedTarget',
        'outsideAngle',
        'hasPointer',
        'pointerType',
        'pointerState',
        'animatePosition',
        'relativeDirection',
        'buttonOffsetX',
        'targetOffsetX',
        'header',
        'selected',
        'hasRelation',
        'data',
      ],
    },
  },
  render: (args) => {
    return html`
      <style>
        .wrapper {
          height: 420px !important;
        }

        .frame {
          position: relative;
          width: 888px;
          height: 160px;
          transform: translate(-50%, -50%);
        }
      </style>
      <div class="frame">
        <obc-poi
          .type=${args.type}
          .value=${args.value}
          .state=${args.state}
          .x=${args.x}
          .y=${args.y}
          .buttonY=${args.buttonY}
          .fixedTarget=${args.fixedTarget}
          .outsideAngle=${args.outsideAngle}
          .hasPointer=${args.hasPointer}
          .pointerType=${args.pointerType}
          .pointerState=${args.pointerState}
          .animatePosition=${args.animatePosition}
          .relativeDirection=${args.relativeDirection}
          .buttonOffsetX=${args.buttonOffsetX}
          .targetOffsetX=${args.targetOffsetX}
          .header=${args.header}
          .selected=${args.selected}
          .hasRelation=${args.hasRelation}
          .data=${args.data}
        >
          <obi-placeholder></obi-placeholder>
          ${args.header?.hasIndicator
            ? html`<obi-placeholder slot="id-label"></obi-placeholder>`
            : html``}
          <obi-collision-avoidance-overtaking
            slot="relation"
          ></obi-collision-avoidance-overtaking>
        </obc-poi>
      </div>
    `;
  },
} satisfies Meta<ObcPoi>;

export default meta;
type Story = StoryObj<ObcPoi>;

export const Line: Story = {
  args: {
    type: ObcPoiType.Line,
    value: ObcPoiValue.Unchecked,
  },
};

export const Offset: Story = {
  args: {
    type: ObcPoiType.Offset,
    value: ObcPoiValue.Unchecked,
    targetOffsetX: 32,
  },
};

export const Point: Story = {
  args: {
    type: ObcPoiType.Point,
    value: ObcPoiValue.Unchecked,
  },
};

export const Outside: Story = {
  args: {
    type: ObcPoiType.Outside,
    value: ObcPoiValue.Unchecked,
    outsideAngle: 315,
    hasPointer: true,
  },
};

export const Checked: Story = {
  args: {
    type: ObcPoiType.Line,
    value: ObcPoiValue.Checked,
  },
};

export const Activated: Story = {
  args: {
    type: ObcPoiType.Line,
    value: ObcPoiValue.Activated,
  },
};

export const Overlapped: Story = {
  args: {
    type: ObcPoiType.Line,
    value: ObcPoiValue.Overlapped,
  },
};

export const Alarm: Story = {
  args: {
    type: ObcPoiType.Line,
    state: ObcPoiState.Alarm,
    value: ObcPoiValue.Checked,
  },
};

export const WithHeader: Story = {
  args: {
    type: ObcPoiType.Line,
    value: ObcPoiValue.Unchecked,
    header: {
      content: '1',
      type: ObcPoiHeaderType.Id,
      state: ObcPoiHeaderState.Selected,
      size: ObcPoiHeaderSize.Regular,
      hasIndicator: true,
    },
  },
};

export const WithValues: Story = {
  args: {
    type: ObcPoiType.Line,
    value: ObcPoiValue.Unchecked,
    data: [
      {value: '10', label: 'Lab', unit: 'Unit'},
      {value: '20', label: 'Lab 2', unit: 'Unit 2'},
    ],
  },
};
