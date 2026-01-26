import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPoiCard, PointerDirection} from './poi-card.js';
import './poi-card.js';
import {html} from 'lit';

function renderPlaceholder(text: string = 'Content placeholder') {
  return html`
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 32px;
        background: var(--base-purple-050);
        border: 1px solid var(--base-purple-100);
        width: 240px;
        height: 180px;
      "
    >
      <span style="color: var(--base-purple-400);">${text}</span>
    </div>
  `;
}

function renderFixedPlaceholder(text: string = 'Content') {
  return html`
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        background: var(--base-purple-050);
        border: 1px solid var(--base-purple-100);
      "
    >
      <span style="color: var(--base-purple-400);">${text}</span>
    </div>
  `;
}

const meta: Meta<typeof ObcPoiCard> = {
  title: 'AR/POI Card',
  tags: ['autodocs'],
  component: 'obc-poi-card',
  args: {
    pointerDirection: PointerDirection.None,
    fixedSize: false,
    noHeader: false,
    index: '1',
    title: 'Title',
    source: 'SRC',
    nonInteractive: false,
    hasFocus: false,
    hasAlert: false,
  },
  argTypes: {
    pointerDirection: {
      control: 'select',
      options: Object.values(PointerDirection),
    },
  },
  render: (args) => {
    const content = args.fixedSize
      ? renderFixedPlaceholder('Content')
      : renderPlaceholder('Content placeholder');
    return html`
      <div style="padding: 40px;">
        <obc-poi-card
          .pointerDirection=${args.pointerDirection}
          .fixedSize=${args.fixedSize}
          .noHeader=${args.noHeader}
          .index=${args.index}
          .title=${args.title}
          .source=${args.source}
          .nonInteractive=${args.nonInteractive}
          .hasFocus=${args.hasFocus}
          .hasAlert=${args.hasAlert}
        >
          ${content}
        </obc-poi-card>
      </div>
    `;
  },
} satisfies Meta<ObcPoiCard>;

export default meta;
type Story = StoryObj<ObcPoiCard>;

export const Default: Story = {
  args: {
    pointerDirection: PointerDirection.None,
    noHeader: false,
    index: '1',
    title: 'Title',
    source: 'SRC',
  },
};

export const NoHeader: Story = {
  args: {
    noHeader: true,
  },
};

export const WithTopPointer: Story = {
  args: {
    pointerDirection: PointerDirection.Top,
    index: '1',
    title: 'Top Pointer',
    source: 'SRC',
  },
};

export const WithBottomPointer: Story = {
  args: {
    pointerDirection: PointerDirection.Bottom,
    index: '2',
    title: 'Bottom Pointer',
    source: 'AIS',
  },
};

export const WithLeftPointer: Story = {
  args: {
    pointerDirection: PointerDirection.Left,
    index: '3',
    title: 'Left Pointer',
    source: 'SRC',
  },
};

export const WithRightPointer: Story = {
  args: {
    pointerDirection: PointerDirection.Right,
    index: '4',
    title: 'Right Pointer',
    source: 'AIS',
  },
};

export const FixedSize: Story = {
  args: {
    fixedSize: true,
    index: '1',
    title: 'Fixed Size',
    source: 'SRC',
  },
};

export const FixedSizeWithPointer: Story = {
  args: {
    fixedSize: true,
    pointerDirection: PointerDirection.Bottom,
    index: '1',
    title: 'Fixed + Pointer',
    source: 'SRC',
  },
};

export const WithFocus: Story = {
  args: {
    index: '1',
    title: 'Focused',
    source: 'SRC',
    hasFocus: true,
  },
};

export const WithAlert: Story = {
  args: {
    index: '1',
    title: 'Alert',
    source: 'SRC',
    hasAlert: true,
  },
};

export const WithFocusAndAlert: Story = {
  args: {
    index: '1',
    title: 'Focus + Alert',
    source: 'SRC',
    hasFocus: true,
    hasAlert: true,
  },
};

export const NonInteractive: Story = {
  args: {
    index: '1',
    title: 'Non-Interactive',
    source: 'SRC',
    nonInteractive: true,
  },
};

export const AllPointerDirections: Story = {
  render: () => html`
    <div
      style="display: flex; flex-wrap: wrap; gap: 40px; padding: 40px; align-items: center;"
    >
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px;">None</div>
        <obc-poi-card
          .pointerDirection=${PointerDirection.None}
          index="1"
          title="None"
          source="SRC"
        >
          ${renderPlaceholder('No pointer')}
        </obc-poi-card>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px;">Top</div>
        <obc-poi-card
          .pointerDirection=${PointerDirection.Top}
          index="2"
          title="Top"
          source="SRC"
        >
          ${renderPlaceholder('Top pointer')}
        </obc-poi-card>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px;">Bottom</div>
        <obc-poi-card
          .pointerDirection=${PointerDirection.Bottom}
          index="3"
          title="Bottom"
          source="SRC"
        >
          ${renderPlaceholder('Bottom pointer')}
        </obc-poi-card>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px;">Left</div>
        <obc-poi-card
          .pointerDirection=${PointerDirection.Left}
          index="4"
          title="Left"
          source="SRC"
        >
          ${renderPlaceholder('Left pointer')}
        </obc-poi-card>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px;">Right</div>
        <obc-poi-card
          .pointerDirection=${PointerDirection.Right}
          index="5"
          title="Right"
          source="SRC"
        >
          ${renderPlaceholder('Right pointer')}
        </obc-poi-card>
      </div>
    </div>
  `,
};

export const InteractionStates: Story = {
  render: () => html`
    <div
      style="display: flex; flex-wrap: wrap; gap: 40px; padding: 40px; align-items: start;"
    >
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px;">Normal</div>
        <obc-poi-card index="1" title="Normal" source="SRC">
          ${renderPlaceholder('Normal state')}
        </obc-poi-card>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px;">Focus</div>
        <obc-poi-card index="2" title="Focus" source="SRC" hasFocus>
          ${renderPlaceholder('Focus state')}
        </obc-poi-card>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px;">Alert</div>
        <obc-poi-card index="3" title="Alert" source="SRC" hasAlert>
          ${renderPlaceholder('Alert state')}
        </obc-poi-card>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px;">Focus + Alert</div>
        <obc-poi-card index="4" title="Both" source="SRC" hasFocus hasAlert>
          ${renderPlaceholder('Both states')}
        </obc-poi-card>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px;">Non-Interactive</div>
        <obc-poi-card index="5" title="Disabled" source="SRC" nonInteractive>
          ${renderPlaceholder('Non-interactive')}
        </obc-poi-card>
      </div>
    </div>
  `,
};

export const SizeComparison: Story = {
  render: () => html`
    <div
      style="display: flex; flex-wrap: wrap; gap: 40px; padding: 40px; align-items: start;"
    >
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px;">Hug Content</div>
        <obc-poi-card index="1" title="Hug" source="SRC">
          ${renderPlaceholder('Hugs content')}
        </obc-poi-card>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px;">Fixed 256x256</div>
        <obc-poi-card index="2" title="Fixed" source="SRC" fixedSize>
          ${renderFixedPlaceholder('Fixed 256x256')}
        </obc-poi-card>
      </div>
    </div>
  `,
};

export const HeaderVariants: Story = {
  render: () => html`
    <div
      style="display: flex; flex-wrap: wrap; gap: 40px; padding: 40px; align-items: start;"
    >
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px;">With Header</div>
        <obc-poi-card index="1" title="With Header" source="AIS">
          ${renderPlaceholder('Has header')}
        </obc-poi-card>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px;">No Header</div>
        <obc-poi-card noHeader>
          ${renderPlaceholder('No header')}
        </obc-poi-card>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px;">No Source</div>
        <obc-poi-card index="3" title="No Source" source="">
          ${renderPlaceholder('No source badge')}
        </obc-poi-card>
      </div>
    </div>
  `,
};
