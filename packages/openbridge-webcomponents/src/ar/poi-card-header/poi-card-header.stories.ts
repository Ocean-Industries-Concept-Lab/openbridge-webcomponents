import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPoiCardHeaderVariant} from './poi-card-header.js';
import './poi-card-header.js';
import {html} from 'lit';
import '../../icons/icon-vessel-type-passenger-outlined.js';
import '../../icons/icon-placeholder.js';

interface PoiCardHeaderArgs {
  variant: ObcPoiCardHeaderVariant;
  index: string;
  cardTitle: string;
  description: string;
  source: string;
  timestamp: string;
  hasLeadingIcon: boolean;
  hasCloseButton: boolean;
}

const meta: Meta<PoiCardHeaderArgs> = {
  title: 'AR/POI Card Header',
  tags: ['autodocs'],
  component: 'obc-poi-card-header',
  args: {
    variant: ObcPoiCardHeaderVariant.Regular,
    index: '1',
    cardTitle: 'Title',
    description: 'Description',
    source: 'SRC',
    timestamp: '2 min ago',
    hasLeadingIcon: true,
    hasCloseButton: true,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        ObcPoiCardHeaderVariant.Tag,
        ObcPoiCardHeaderVariant.Condensed,
        ObcPoiCardHeaderVariant.Regular,
        ObcPoiCardHeaderVariant.Detailed,
      ],
    },
  },
  render: (args) => {
    return html`
      <div style="width: 320px; background: #f0f0f0; padding: 16px;">
        <obc-poi-card-header
          .variant=${args.variant}
          .index=${args.index}
          .cardTitle=${args.cardTitle}
          .description=${args.description}
          .source=${args.source}
          .timestamp=${args.timestamp}
          .hasLeadingIcon=${args.hasLeadingIcon}
          .hasCloseButton=${args.hasCloseButton}
          @close-click=${() => console.log('Close clicked')}
        >
          <obi-placeholder slot="leading-icon"></obi-placeholder>
          <obi-vessel-type-passenger-outlined
            slot="poi-icon"
          ></obi-vessel-type-passenger-outlined>
        </obc-poi-card-header>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<PoiCardHeaderArgs>;

export const Tag: Story = {
  args: {
    variant: ObcPoiCardHeaderVariant.Tag,
    index: '1',
  },
};

export const Condensed: Story = {
  args: {
    variant: ObcPoiCardHeaderVariant.Condensed,
    index: '1',
    cardTitle: 'Title',
    source: 'SRC',
  },
};

export const CondensedNoSource: Story = {
  args: {
    variant: ObcPoiCardHeaderVariant.Condensed,
    index: '1',
    cardTitle: 'Title',
    source: '',
  },
};

export const Regular: Story = {
  args: {
    variant: ObcPoiCardHeaderVariant.Regular,
    index: '1',
    cardTitle: 'Title',
    source: 'SRC',
    hasLeadingIcon: true,
  },
};

export const RegularNoIcon: Story = {
  args: {
    variant: ObcPoiCardHeaderVariant.Regular,
    index: '1',
    cardTitle: 'Title',
    source: 'SRC',
    hasLeadingIcon: false,
  },
};

export const Detailed: Story = {
  args: {
    variant: ObcPoiCardHeaderVariant.Detailed,
    index: '1',
    cardTitle: 'Title',
    description: 'Description',
    source: 'SRC',
    timestamp: '2 min ago',
    hasCloseButton: true,
  },
};

export const DetailedNoCloseButton: Story = {
  args: {
    variant: ObcPoiCardHeaderVariant.Detailed,
    index: '1',
    cardTitle: 'MV Explorer',
    description: 'Passenger vessel',
    source: 'AIS',
    timestamp: '5 min ago',
    hasCloseButton: false,
  },
};

export const DetailedNoSource: Story = {
  args: {
    variant: ObcPoiCardHeaderVariant.Detailed,
    index: '2',
    cardTitle: 'Unknown Vessel',
    description: 'Cargo ship',
    source: '',
    timestamp: '1 min ago',
    hasCloseButton: true,
  },
};
