import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcPoiLine} from './poi-line.js';
import './poi-line.js';
import {POIStyle} from '../poi-graphic-line/poi-config.js';
import {crossDecorator} from '../../storybook-util.js';
import {html} from 'lit';
const meta: Meta<typeof ObcPoiLine> = {
  title: 'AR/Building blocks/POI Line',
  tags: ['autodocs'],
  decorators: [crossDecorator],
  component: 'obc-poi-line',
  argTypes: {
    poiStyle: {
      options: [POIStyle.Normal, POIStyle.Enhanced],
      control: {type: 'select'},
    },
    height: {control: {type: 'range', min: 32, max: 200, step: 1}},
    offset: {control: {type: 'range', min: -100, max: 100, step: 1}},
  },
  args: {
    poiStyle: POIStyle.Enhanced,
    height: 96,
    offset: 0,
  },
  render: (args) => {
    return html`
      <obc-poi-line
        .poiStyle=${args.poiStyle}
        .height=${args.height}
        .offset=${args.offset}
        style="transform: translateY(${-args.height}px)"
      ></obc-poi-line>
    `;
  },
} satisfies Meta<ObcPoiLine>;

export default meta;
type Story = StoryObj<ObcPoiLine>;

export const Normal: Story = {
  args: {
    poiStyle: POIStyle.Normal,
  },
};

export const Offset: Story = {
  args: {
    poiStyle: POIStyle.Normal,
    offset: 10,
  },
};

export const Enhanced: Story = {
  args: {
    poiStyle: POIStyle.Enhanced,
  },
};
