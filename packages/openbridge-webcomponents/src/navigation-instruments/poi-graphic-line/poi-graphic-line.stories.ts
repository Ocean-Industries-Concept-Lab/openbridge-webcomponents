import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcPoiGraphicLine} from './poi-graphic-line';
import './poi-graphic-line';
import {POIStyle, POIState} from './poi-config';
import {beta6Decorator, widthDecorator} from '../../storybook-util';

const meta: Meta<typeof ObcPoiGraphicLine> = {
  title: 'Building blocks/POI Graphic Line',
  tags: ['autodocs'],
  component: 'obc-poi-graphic-line',
  argTypes: {
    poiStyle: {
      options: Object.values(POIStyle),
      control: {
        type: 'radio',
      },
    },
    poiState: {
      options: Object.values(POIState),
      control: {
        type: 'radio',
      },
    },

    width: {control: {type: 'range', min: 4, max: 48, step: 1}},
    height: {control: {type: 'range', min: 32, max: 192, step: 2}},
  },
  args: {
    width: 4,
    height: 100,
    poiStyle: POIStyle.enhanced,
    poiState: POIState.solid,
  },
} satisfies Meta<ObcPoiGraphicLine>;

export default meta;
type Story = StoryObj<ObcPoiGraphicLine>;

export const Primary: Story = {
  args: {},
};
