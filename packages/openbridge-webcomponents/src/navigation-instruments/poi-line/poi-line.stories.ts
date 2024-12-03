import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcPoiLine} from './poi-line';
import './poi-line';
import {POIStyle} from '../poi-graphic-line/poi-config';

const meta: Meta<typeof ObcPoiLine> = {
  title: 'Building blocks/POI Line',
  tags: ['autodocs'],
  component: 'obc-poi-line',
  argTypes: {
    poiStyle: {
      options: [POIStyle.Normal, POIStyle.Enhanced],
      control: {type: 'select'},
    },
    height: {control: {type: 'range', min: 32, max: 200, step: 1}},
  },
  args: {
    poiStyle: POIStyle.Enhanced,
    height: 96,
  },
} satisfies Meta<ObcPoiLine>;

export default meta;
type Story = StoryObj<ObcPoiLine>;

export const Primary: Story = {
  args: {},
};
