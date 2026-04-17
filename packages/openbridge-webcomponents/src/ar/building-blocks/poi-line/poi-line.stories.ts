import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPoiLine} from './poi-line.js';
import './poi-line.js';
import {
  POI_LINE_TYPE_OPTIONS,
  POILineType,
  POI_STYLE_OPTIONS,
  POIStyle,
  POI_VISUAL_VARIANTS,
} from '../poi-graphic-line/poi-graphic-line.js';
import {crossDecorator} from '../../../storybook-util.js';
import {html} from 'lit';
const meta: Meta<ObcPoiLine> = {
  title: 'AR/Building Blocks/POI Line',
  tags: ['autodocs', 'skip-test'],
  decorators: [crossDecorator],
  component: 'obc-poi-line',
  argTypes: {
    poiStyle: {
      options: POI_STYLE_OPTIONS,
      control: {type: 'select'},
    },
    lineType: {
      options: POI_LINE_TYPE_OPTIONS,
      control: {type: 'radio'},
    },
    height: {control: {type: 'range', min: 32, max: 200, step: 1}},
    offset: {control: {type: 'range', min: -100, max: 100, step: 1}},
  },
  args: {
    poiStyle: POIStyle.Regular,
    lineType: POILineType.Regular,
    height: 96,
    offset: 0,
  },
  render: (args) => {
    return html`
      <obc-poi-line
        .poiStyle=${args.poiStyle}
        .lineType=${args.lineType}
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
    poiStyle: POIStyle.Regular,
    lineType: POILineType.Regular,
  },
};

export const Offset: Story = {
  args: {
    poiStyle: POIStyle.Regular,
    lineType: POILineType.Regular,
    offset: 10,
  },
};

export const Enhanced: Story = {
  args: {
    poiStyle: POIStyle.Selected,
    lineType: POILineType.Regular,
  },
};

export const AllStyles: Story = {
  render: () => html`
    <div style="display: flex; gap: 26px;">
      ${POI_VISUAL_VARIANTS.map(
        (variant) => html`
          <obc-poi-line
            .poiStyle=${variant.style}
            .lineType=${variant.type}
            .height=${variant.type === POILineType.Dashed ? 96 : 160}
            .hasPointer=${false}
            style="transform: translateY(-${variant.type === POILineType.Dashed
              ? 96
              : 160}px)"
          ></obc-poi-line>
        `
      )}
    </div>
  `,
};
