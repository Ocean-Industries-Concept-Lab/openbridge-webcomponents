import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcPoiLine} from './poi-line';
import './poi-line';
import {POIStyle} from '../poi-graphic-line/poi-config';

const meta: Meta<typeof ObcPoiLine> = {
  title: 'Building blocks/POI Line',
  tags: ['autodocs', '6.0'],
  component: 'obc-poi-line',
  argTypes: {
    lineStyle: {
      options: [POIStyle.Normal, POIStyle.Enhanced],
      control: {type: 'select'},
    },
    height: {control: {type: 'range', min: 32, max: 196, step: 1}},
  },
  args: {
    lineStyle: POIStyle.Enhanced,
    height: 100,
  },
} satisfies Meta<ObcPoiLine>;

export default meta;
type Story = StoryObj<ObcPoiLine>;

export const Primary: Story = {
  args: {},
};
