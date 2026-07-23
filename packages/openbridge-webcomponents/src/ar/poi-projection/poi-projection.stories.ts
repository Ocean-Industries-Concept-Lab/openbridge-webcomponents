import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  MediaFit,
  computeMediaProjection,
  projectPoint,
} from './poi-projection.js';

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
        component: `
Pure helper functions that map points from media pixel space
(video/image natural resolution) to rendered screen space, accounting
for \`cover\`/\`contain\` letterboxing. This is the same math
\`obc-poi-controller\` applies to its detections-driven targets,
exported so applications that manage their own POI elements can
project coordinates without re-implementing the transform.

- \`computeMediaProjection(input)\` — resolve scale and letterbox
  offsets once per resize/metadata change.
- \`projectPoint(projection, x, y)\` — media px → rendered px.
- \`projectPointToLayer(projection, x, y, layerBottom)\` — rendered
  point → \`obc-poi-data\` layer coordinates (\`x\` center px, \`y\`
  downward connector length, clamped to 0).
- \`projectBoxSize(projection, size)\` — scale a box dimension.

The demo below draws the rendered container (outer box), the scaled
media content region (shaded), and a marker at the projected point.
        `.trim(),
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
