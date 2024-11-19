import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcPoiGraphicLine} from './poi-graphic-line';
import './poi-graphic-line';
import {POIStyle} from './poi-config';

const meta: Meta<typeof ObcPoiGraphicLine> = {
  title: 'Building blocks/POI Graphic Line',
  tags: ['autodocs', '6.0'],
  component: 'obc-poi-graphic-line',
  argTypes: {
    lineStyle: {
      options: Object.values(POIStyle),
      control: {
        type: 'radio',
      },
    },

    height: {control: {type: 'range', min: 32, max: 192, step: 2}},
  },
  args: {
    height: 100,
    lineStyle: POIStyle.Enhanced,
  },
  decorators: [],
} satisfies Meta<ObcPoiGraphicLine>;

export default meta;
type Story = StoryObj<ObcPoiGraphicLine>;

export const Primary: Story = {
  args: {},
};
