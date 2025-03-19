import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcPoiGraphicLine} from './poi-graphic-line.js';
import './poi-graphic-line.js';
import {POIStyle} from './poi-config.js';

const meta: Meta<typeof ObcPoiGraphicLine> = {
  title: 'Building blocks/POI Graphic Line',
  tags: ['autodocs'],
  component: 'obc-poi-graphic-line',
  argTypes: {
    lineStyle: {
      options: Object.values(POIStyle),
      control: {
        type: 'radio',
      },
    },

    lineHeight: {control: {type: 'range', min: 32, max: 192, step: 2}},
  },
  args: {
    lineHeight: 96,
    lineStyle: POIStyle.Enhanced,
  },
} satisfies Meta<ObcPoiGraphicLine>;

export default meta;
type Story = StoryObj<ObcPoiGraphicLine>;

export const Primary: Story = {
  args: {},
};
