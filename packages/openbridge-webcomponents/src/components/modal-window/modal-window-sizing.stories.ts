import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './modal-window.js';
import {ObcModalWindowSize} from './modal-window.js';
import '../../icons/icon-placeholder.js';

const meta = {
  title: 'Application Components/Containers/Modal Window/Sizing',
  component: 'obc-modal-window',
  tags: ['autodocs', '6.0'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `By default \`obc-modal-window\` is as tall as its content,
capped at \`90vh\`. To size it externally, set the
\`--obc-modal-window-height\` custom property on the element — a fixed value,
or \`100%\` to follow a host element sized by its container. The \`90vh\` cap
always applies and the content area scrolls when the content does not fit.

Every frame below is 349 × 360 px, outlined.`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const FRAME = 'width: 349px; height: 360px; outline: 1px dashed #d0021b;';
const FILLED = 'position: relative; width: 100%; height: 100%;';

const filledBody = html`
  <div slot="content" style=${FILLED}>
    <div
      style="position: absolute; inset: 0; padding: 16px; background: rgba(0, 122, 255, 0.12);"
    >
      Body content, sized by the modal.
    </div>
  </div>
`;

const naturalBody = html`
  <div
    slot="content"
    style="padding: 16px; background: rgba(0, 122, 255, 0.12);"
  >
    Body content at its natural height.
  </div>
`;

const modal = (style: string, body = filledBody) => html`
  <obc-modal-window
    style=${style}
    .size=${ObcModalWindowSize.Small}
    .hasOptionalAction=${false}
    .hasLeadingIcon=${true}
  >
    <obi-placeholder slot="leading-icon"></obi-placeholder>
    <span slot="title">Modal Title</span>
    ${body}
    <span slot="cancel-label">Cancel</span>
    <span slot="done-label">Done</span>
  </obc-modal-window>
`;

const labelled = (label: string, content: unknown) => html`
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <span style="font: 12px/1.4 sans-serif;">${label}</span>
    ${content}
  </div>
`;

const row = (...cells: unknown[]) => html`
  <div style="display: flex; gap: 32px; align-items: flex-start;">${cells}</div>
`;

export const ContentHeightByDefault: Story = {
  render: () =>
    row(
      labelled(
        'Plain frame — content height',
        html`<div style=${FRAME}>${modal('', naturalBody)}</div>`
      ),
      labelled(
        'Flex frame — still content height',
        html`<div style="${FRAME} display: flex;">
          ${modal('', naturalBody)}
        </div>`
      )
    ),
  parameters: {
    docs: {
      description: {
        story: `Without \`--obc-modal-window-height\` the modal keeps its
content height, also when a flex container stretches the host element. Nothing
an ancestor does can change the modal's height implicitly.`,
      },
    },
  },
};

export const FixedHeight: Story = {
  render: () =>
    row(
      labelled(
        '--obc-modal-window-height: 360px',
        html`<div style=${FRAME}>
          ${modal('--obc-modal-window-height: 360px;')}
        </div>`
      ),
      labelled(
        'Default for comparison',
        html`<div style=${FRAME}>${modal('')}</div>`
      )
    ),
  parameters: {
    docs: {
      description: {
        story: `A fixed \`--obc-modal-window-height\` sizes the modal exactly.
The body takes whatever the title bar and the action row leave, with no fixed
heights anywhere, and slotted content of \`height: 100%\` fills it. Values
taller than the viewport are still capped at \`90vh\`.`,
      },
    },
  },
};

export const FillContainer: Story = {
  render: () =>
    row(
      labelled(
        'Flex frame + --obc-modal-window-height: 100%',
        html`<div style="${FRAME} display: flex;">
          ${modal('--obc-modal-window-height: 100%;')}
        </div>`
      ),
      labelled(
        'Block frame + height: 100% on the element',
        html`<div style=${FRAME}>
          ${modal('height: 100%; --obc-modal-window-height: 100%;')}
        </div>`
      )
    ),
  parameters: {
    docs: {
      description: {
        story: `\`--obc-modal-window-height: 100%\` makes the modal follow the
host element's height: let a flex container stretch the host, or give the
element an explicit \`height\`. Use this when the surrounding layout owns the
modal's size.`,
      },
    },
  },
};
