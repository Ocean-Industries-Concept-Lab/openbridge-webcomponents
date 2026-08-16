import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './modal-window.js';
import {ObcModalWindowSize} from './modal-window.js';
import '../card/card.js';
import '../../icons/icon-placeholder.js';

const meta = {
  title: 'Application Components/Containers/Modal Window/Sizing',
  component: 'obc-modal-window',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `\`obc-modal-window\` declares no \`:host\` rule and its
\`.wrapper\` sets \`width: 100%\` but no height, so the element cannot be sized
by its container. \`obc-card\` and \`obc-tabbed-card\` both declare
\`:host { display: block }\` plus a full-height wrapper and size as expected.

These stories reproduce the two resulting defects and show the fix. Every frame
is 349 × 360 px, outlined.`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const FRAME = 'width: 349px; height: 360px; outline: 1px dashed #d0021b;';
const FILLED = 'position: relative; width: 100%; height: 100%;';

const modal = (style: string, patched = false) => html`
  <obc-modal-window
    style=${style}
    ?data-patched=${patched}
    .size=${ObcModalWindowSize.Small}
    .hasOptionalAction=${false}
    .hasLeadingIcon=${true}
  >
    <obi-placeholder slot="leading-icon"></obi-placeholder>
    <span slot="title">Modal Title</span>
    <div slot="content" style=${FILLED}>
      <div
        style="position: absolute; inset: 0; padding: 16px; background: rgba(0, 122, 255, 0.12);"
      >
        Body content, sized by the modal.
      </div>
    </div>
    <span slot="cancel-label">Cancel</span>
    <span slot="done-label">Done</span>
  </obc-modal-window>
`;

const card = (style: string) => html`
  <obc-card style=${style}>
    <span slot="title">Card Title</span>
    <div style="padding: 16px; background: rgba(0, 122, 255, 0.12);">
      Body content, sized by the card.
    </div>
  </obc-card>
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

export const ExplicitHeightIsIgnored: Story = {
  render: () =>
    row(
      labelled(
        'obc-modal-window — height: 360px ignored',
        html`<div style=${FRAME}>${modal('height: 360px;')}</div>`
      ),
      labelled(
        'obc-card — same declaration honoured',
        html`<div style=${FRAME}>${card('height: 360px;')}</div>`
      )
    ),
  parameters: {
    docs: {
      description: {
        story: `Both elements carry \`style="height: 360px"\`. The card grows to
360 px; the modal stays at its content height, because \`height\` does not apply
to a non-replaced inline element and the modal never declares
\`:host { display: block }\`.`,
      },
    },
  },
};

export const ContentAreaCollapses: Story = {
  render: () =>
    row(
      labelled(
        'obc-modal-window — host stretches, body is 0 px',
        html`<div style="${FRAME} display: flex;">${modal('')}</div>`
      ),
      labelled(
        'obc-card — fills the same flex frame',
        html`<div style="${FRAME} display: flex;">${card('')}</div>`
      )
    ),
  parameters: {
    docs: {
      description: {
        story: `A flex container blockifies the host and stretches it to 360 px,
masking the first defect. \`.wrapper\` still has no height, so it stays at
content height and \`.content-area\` never becomes a definite box: slotted
content of \`height: 100%\` resolves to 0 and the body disappears. This is what
any host framework that fills the modal body sees.`,
      },
    },
  },
};

export const ProposedFix: Story = {
  render: () =>
    row(
      labelled(
        'Unpatched',
        html`<div style=${FRAME}>${modal('height: 360px;')}</div>`
      ),
      labelled(
        ':host { display: block } + .wrapper { height: 100% }',
        html`<div style=${FRAME}>${modal('height: 360px;', true)}</div>`
      )
    ),
  play: async ({canvasElement}) => {
    const host = canvasElement.querySelector(
      'obc-modal-window[data-patched]'
    ) as HTMLElement & {updateComplete: Promise<unknown>};
    await host.updateComplete;
    const style = document.createElement('style');
    style.textContent = ':host { display: block; } .wrapper { height: 100%; }';
    host.shadowRoot!.appendChild(style);
  },
  parameters: {
    docs: {
      description: {
        story: `The right-hand modal gets the two rules injected into its shadow
root at runtime; in a fix they belong in \`modal-window.css\`. It then honours
the given height and the body takes whatever the title bar and action row leave,
with no fixed heights anywhere. \`.wrapper\` already carries
\`max-height: 90vh\`, and a percentage height against an auto-height parent
computes to \`auto\`, so consumers that do not size the modal are unaffected.`,
      },
    },
  },
};
