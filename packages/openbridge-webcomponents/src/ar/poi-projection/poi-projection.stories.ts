import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  MediaFit,
  computeMediaProjection,
  projectPoint,
} from './poi-projection.js';
import {moduleDocs} from '../../../.storybook/manifest-docs.js';

type PoiProjectionArgs = {
  mediaWidth: number;
  mediaHeight: number;
  renderWidth: number;
  renderHeight: number;
  fit: MediaFit;
  pointX: number;
  pointY: number;
};

const meta: Meta<PoiProjectionArgs> = {
  title: 'AR/POI Projection',
  tags: ['autodocs', '6.1'],
  parameters: {
    docs: {
      description: {
        component: moduleDocs('ar/poi-projection/poi-projection.ts'),
      },
    },
  },
  args: {
    mediaWidth: 1920,
    mediaHeight: 1080,
    renderWidth: 480,
    renderHeight: 360,
    fit: MediaFit.Contain,
    pointX: 960,
    pointY: 540,
  },
  argTypes: {
    mediaWidth: {control: {type: 'number'}},
    mediaHeight: {control: {type: 'number'}},
    renderWidth: {control: {type: 'number'}},
    renderHeight: {control: {type: 'number'}},
    fit: {control: {type: 'select'}, options: Object.values(MediaFit)},
    pointX: {control: {type: 'number'}},
    pointY: {control: {type: 'number'}},
  },
} satisfies Meta<PoiProjectionArgs>;

export default meta;
type Story = StoryObj<PoiProjectionArgs>;

const renderDemo = (args: PoiProjectionArgs) => {
  const projection = computeMediaProjection({
    mediaWidth: args.mediaWidth,
    mediaHeight: args.mediaHeight,
    renderWidth: args.renderWidth,
    renderHeight: args.renderHeight,
    fit: args.fit,
  });
  const point = projection
    ? projectPoint(projection, args.pointX, args.pointY)
    : null;

  return html`
    <div
      style="position: relative; width: ${args.renderWidth}px; height: ${args.renderHeight}px; border: 1px solid var(--instrument-frame-primary-color, #888); overflow: hidden;"
    >
      ${projection
        ? html`
            <div
              style="position: absolute; left: ${projection.offsetX}px; top: ${projection.offsetY}px; width: ${projection.contentWidth}px; height: ${projection.contentHeight}px; background: var(--container-backdrop-color, rgb(0 0 0 / 8%));"
            ></div>
          `
        : null}
      ${point
        ? html`
            <div
              style="position: absolute; left: ${point.x -
              4}px; top: ${point.y -
              4}px; width: 8px; height: 8px; border-radius: 50%; background: var(--instrument-enhanced-primary-color, #2a6);"
            ></div>
          `
        : null}
    </div>
  `;
};

export const Contain: Story = {
  render: renderDemo,
};

export const Cover: Story = {
  args: {fit: MediaFit.Cover},
  render: renderDemo,
};
