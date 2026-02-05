import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {crossDecorator} from '../../../storybook-util.js';
import './poi.js';
import {ObcPoi, ObcPoiType, ObcPoiValue} from './poi.js';
import '../../../icons/icon-placeholder.js';

const meta: Meta<ObcPoi> = {
  title: 'AR/Building blocks/POI',
  tags: ['autodocs'],
  component: 'obc-poi',
  decorators: [crossDecorator],
  args: {
    type: ObcPoiType.Line,
    value: ObcPoiValue.Enabled,
    relativeDirection: 0,
    lineHeight: 96,
    offset: 0,
    hasPointer: true,
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
    relativeDirection: {control: {type: 'range', min: 0, max: 360}},
    lineHeight: {control: {type: 'range', min: 32, max: 200, step: 1}},
    offset: {control: {type: 'range', min: -100, max: 100, step: 1}},
    hasPointer: {control: {type: 'boolean'}},
  },
  render: (args) => {
    return html`
      <obc-poi
        .type=${args.type}
        .value=${args.value}
        .relativeDirection=${args.relativeDirection}
        .lineHeight=${args.lineHeight}
        .offset=${args.offset}
        .hasPointer=${args.hasPointer}
      >
        <obi-placeholder></obi-placeholder>
      </obc-poi>
    `;
  },
} satisfies Meta<ObcPoi>;

export default meta;
type Story = StoryObj<ObcPoi>;

export const Line: Story = {
  args: {
    type: ObcPoiType.Line,
    value: ObcPoiValue.Enabled,
  },
};

export const OffsetLeft: Story = {
  args: {
    type: ObcPoiType.OffsetLeft,
    value: ObcPoiValue.Enabled,
  },
};

export const OffsetRight: Story = {
  args: {
    type: ObcPoiType.OffsetRight,
    value: ObcPoiValue.Enabled,
  },
};

export const Point: Story = {
  args: {
    type: ObcPoiType.Point,
    value: ObcPoiValue.Enabled,
  },
};

export const OutsideLeft: Story = {
  args: {
    type: ObcPoiType.OutsideLeft,
    value: ObcPoiValue.Enabled,
    hasPointer: false,
  },
};

export const OutsideRight: Story = {
  args: {
    type: ObcPoiType.OutsideRight,
    value: ObcPoiValue.Enabled,
    hasPointer: false,
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
