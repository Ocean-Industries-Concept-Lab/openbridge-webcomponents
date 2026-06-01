import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {PointerDirection, ObcPoiCardHeaderVariant} from './poi-card.js';
import './poi-card.js';
import {html} from 'lit';
import '../../icons/icon-vessel-type-passenger-outlined.js';

interface PoiCardArgs {
  pointerDirection: PointerDirection;
  fixedSize: boolean;
  showHeader: boolean;
  headerVariant: ObcPoiCardHeaderVariant;
  index: string;
  cardTitle: string;
  description: string;
  source: string;
  timestamp: string;
  hasLeadingIcon: boolean;
  hasCloseButton: boolean;
  interactive: boolean;
  hasAlert: boolean;
}

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

const meta: Meta<PoiCardArgs> = {
  title: 'AR/POI Card',
  tags: ['autodocs'],
  component: 'obc-poi-card',
  args: {
    pointerDirection: PointerDirection.None,
    fixedSize: false,
    showHeader: true,
    headerVariant: ObcPoiCardHeaderVariant.Condensed,
    index: '1',
    cardTitle: 'Title',
    description: '',
    source: 'SRC',
    timestamp: '',
    hasLeadingIcon: false,
    hasCloseButton: false,
    interactive: false,
    hasAlert: false,
  },
  argTypes: {
    pointerDirection: {
      control: 'select',
      options: Object.values(PointerDirection),
    },
    headerVariant: {
      control: 'select',
      options: Object.values(ObcPoiCardHeaderVariant),
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
          .showHeader=${args.showHeader}
          .headerVariant=${args.headerVariant}
          .index=${args.index}
          .cardTitle=${args.cardTitle}
          .description=${args.description}
          .source=${args.source}
          .timestamp=${args.timestamp}
          .hasLeadingIcon=${args.hasLeadingIcon}
          .hasCloseButton=${args.hasCloseButton}
          .interactive=${args.interactive}
          .hasAlert=${args.hasAlert}
        >
          ${content}
        </obc-poi-card>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<PoiCardArgs>;

// Basic Variants
export const Default: Story = {
  args: {
    pointerDirection: PointerDirection.None,
    showHeader: true,
    index: '1',
    cardTitle: 'Title',
    source: 'SRC',
  },
};

export const NoHeader: Story = {
  args: {
    showHeader: false,
  },
};

export const FixedSize: Story = {
  args: {
    fixedSize: true,
    index: '1',
    cardTitle: 'Fixed Size',
    source: 'SRC',
  },
};

// Pointer Direction
export const WithTopPointer: Story = {
  args: {
    pointerDirection: PointerDirection.Top,
    index: '1',
    cardTitle: 'Top Pointer',
    source: 'SRC',
  },
};

// Header Variants
export const HeaderTagVariant: Story = {
  args: {
    headerVariant: ObcPoiCardHeaderVariant.Tag,
    index: '1',
  },
};

export const HeaderCondensedVariant: Story = {
  args: {
    headerVariant: ObcPoiCardHeaderVariant.Condensed,
    index: '1',
    cardTitle: 'Condensed Header',
    source: 'SRC',
  },
};

export const HeaderRegularVariant: Story = {
  render: (args) => html`
    <div style="padding: 40px;">
      <obc-poi-card
        .pointerDirection=${args.pointerDirection}
        .fixedSize=${args.fixedSize}
        .showHeader=${args.showHeader}
        .headerVariant=${ObcPoiCardHeaderVariant.Regular}
        .index=${'1'}
        .cardTitle=${'Regular Header'}
        .source=${'AIS'}
        .hasLeadingIcon=${true}
        .interactive=${args.interactive}
        .hasAlert=${args.hasAlert}
      >
        <obi-vessel-type-passenger-outlined
          slot="leading-icon"
        ></obi-vessel-type-passenger-outlined>
        ${renderPlaceholder('Regular header with icon')}
      </obc-poi-card>
    </div>
  `,
};

export const HeaderDetailedVariant: Story = {
  render: (args) => html`
    <div style="padding: 40px;">
      <obc-poi-card
        .pointerDirection=${args.pointerDirection}
        .fixedSize=${args.fixedSize}
        .showHeader=${args.showHeader}
        .headerVariant=${ObcPoiCardHeaderVariant.Detailed}
        .index=${'1'}
        .cardTitle=${'MV Explorer'}
        .description=${'Passenger vessel'}
        .source=${'AIS'}
        .timestamp=${'2 min ago'}
        .hasCloseButton=${true}
        .interactive=${args.interactive}
        .hasAlert=${args.hasAlert}
      >
        <obi-vessel-type-passenger-outlined
          slot="poi-icon"
        ></obi-vessel-type-passenger-outlined>
        ${renderPlaceholder('Detailed header')}
      </obc-poi-card>
    </div>
  `,
};

// Interactive States
export const Interactive: Story = {
  args: {
    index: '1',
    cardTitle: 'Interactive',
    source: 'SRC',
    interactive: true,
  },
};

export const WithAlert: Story = {
  args: {
    index: '1',
    cardTitle: 'Alert',
    source: 'SRC',
    interactive: true,
    hasAlert: true,
  },
};

// Full Featured
export const FullFeatured: Story = {
  render: () => html`
    <div style="padding: 40px;">
      <obc-poi-card
        .pointerDirection=${PointerDirection.Bottom}
        .headerVariant=${ObcPoiCardHeaderVariant.Detailed}
        index="1"
        cardTitle="MV Explorer"
        description="Passenger vessel"
        source="AIS"
        timestamp="2 min ago"
        hasCloseButton
        interactive
      >
        <obi-vessel-type-passenger-outlined
          slot="poi-icon"
        ></obi-vessel-type-passenger-outlined>
        ${renderPlaceholder('Full featured card')}
      </obc-poi-card>
    </div>
  `,
};
