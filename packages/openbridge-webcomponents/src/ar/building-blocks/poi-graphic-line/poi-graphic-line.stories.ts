import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPoiGraphicLine} from './poi-graphic-line.js';
import './poi-graphic-line.js';
import {html} from 'lit';
import {
  POI_LINE_TYPE_OPTIONS,
  POILineType,
  POI_STYLE_OPTIONS,
  POIStyle,
  POI_VISUAL_VARIANTS,
} from './poi-graphic-line.js';

const meta: Meta<ObcPoiGraphicLine> = {
  title: 'AR/Building blocks/POI Graphic Line',
  tags: ['autodocs'],
  component: 'obc-poi-graphic-line',
  argTypes: {
    lineStyle: {
      options: POI_STYLE_OPTIONS,
      control: {
        type: 'radio',
      },
    },
    lineType: {
      options: POI_LINE_TYPE_OPTIONS,
      control: {
        type: 'radio',
      },
    },
    lineHeight: {control: {type: 'range', min: 32, max: 192, step: 2}},
    offset: {control: {type: 'range', min: -100, max: 100, step: 1}},
  },
  args: {
    lineHeight: 96,
    lineStyle: POIStyle.Regular,
    lineType: POILineType.Regular,
    offset: 0,
  },
} satisfies Meta<ObcPoiGraphicLine>;

export default meta;
type Story = StoryObj<ObcPoiGraphicLine>;

export const Normal: Story = {
  args: {
    lineHeight: 96,
    lineStyle: POIStyle.Regular,
    lineType: POILineType.Regular,
    offset: 0,
  },
};

export const Offset: Story = {
  args: {
    lineHeight: 96,
    lineStyle: POIStyle.Regular,
    lineType: POILineType.Regular,
    offset: 10,
  },
};

export const Enhanced: Story = {
  args: {
    lineHeight: 96,
    lineStyle: POIStyle.Selected,
    lineType: POILineType.Regular,
  },
};

export const AllStyles: Story = {
  render: () => html`
    <div style="display: flex; gap: 26px;">
      ${POI_VISUAL_VARIANTS.map(
        (variant) => html`
          <obc-poi-graphic-line
            .lineHeight=${variant.type === POILineType.Dashed ? 96 : 160}
            .lineStyle=${variant.style}
            .lineType=${variant.type}
          ></obc-poi-graphic-line>
        `
      )}
    </div>
  `,
};
