import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPoiGraphicLine} from './poi-graphic-line.js';
import './poi-graphic-line.js';
import {POIStyle} from './poi-config.js';

const meta: Meta<typeof ObcPoiGraphicLine> = {
  title: 'AR/Building blocks/POI Graphic Line',
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
    offset: {control: {type: 'range', min: -100, max: 100, step: 1}},
  },
  args: {
    lineHeight: 96,
    lineStyle: POIStyle.Enhanced,
    offset: 0,
  },
} satisfies Meta<ObcPoiGraphicLine>;

export default meta;
type Story = StoryObj<ObcPoiGraphicLine>;

export const Normal: Story = {
  args: {
    lineHeight: 96,
    lineStyle: POIStyle.Normal,
    offset: 0,
  },
};

export const Offset: Story = {
  args: {
    lineHeight: 96,
    lineStyle: POIStyle.Normal,
    offset: 10,
  },
};

export const Enhanced: Story = {
  args: {
    lineHeight: 96,
    lineStyle: POIStyle.Enhanced,
  },
};
