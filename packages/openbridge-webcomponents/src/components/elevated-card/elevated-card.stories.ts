import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcElevatedCard,
  ObcElevatedCardPosition,
  ObcElevatedCardSize,
} from './elevated-card.js';
import './elevated-card.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-chevron-right-google.js';
import '../../icons/icon-print.js';
import '../../icons/icon-support-google.js';
import '../button/button.js';
import '../radio/radio.js';
import {spread} from '@open-wc/lit-helpers';

const meta: Meta<typeof ObcElevatedCard> = {
  title: 'UI Components/Sections/Elevated card',
  tags: ['autodocs', '6.0'],
  component: 'obc-elevated-card',
  args: {
    position: ObcElevatedCardPosition.Regular,
    size: ObcElevatedCardSize.MultiLine,
  },
  globals: {
    backgrounds: {
      value: 'container-section-color',
    },
  },
  argTypes: {
    position: {
      control: {type: 'select'},
      options: Object.values(ObcElevatedCardPosition),
    },
    size: {
      control: {type: 'select'},
      options: Object.values(ObcElevatedCardSize),
    },
  },
  decorators: (story) => html`<div style="width: 400px;">${story()}</div>`,
  render: (args) =>
    html`<obc-elevated-card
      .position=${args.position}
      .size=${args.size}
      .border=${args.border}
      .href=${args.href}
      .hasLeadingIcon=${args.hasLeadingIcon}
      .hasTrailingIcon=${args.hasTrailingIcon}
    >
      <obi-placeholder slot="leading-icon"></obi-placeholder>
      <div slot="label">Title</div>
      <div slot="description">
        Description with multiple lines of text and more than one line of
        description
      </div>
      <obi-chevron-right-google slot="trailing-icon"></obi-chevron-right-google>
    </obc-elevated-card> `,
} satisfies Meta<typeof ObcElevatedCard>;

export default meta;
type Story = StoryObj<typeof ObcElevatedCard>;

export const Regular: Story = {
  args: {
    hasLeadingIcon: true,
    hasTrailingIcon: true,
  },
};

export const Action: Story = {
  args: {
    size: ObcElevatedCardSize.DoubleLine,
    hasAction: true,
    hasLeadingIcon: true,
    hasStatus: true,
  },
  render: (args) =>
    html`<obc-elevated-card ${spread(args)}>
      <obi-placeholder slot="leading-icon"></obi-placeholder>
      <div slot="label">Title</div>
      <div slot="status">Status</div>
      <div slot="action">Action</div>
    </obc-elevated-card> `,
};

export const RegularNoIcons: Story = {
  render: (args) =>
    html`<obc-elevated-card
      .position=${args.position}
      .size=${args.size}
      .border=${args.border}
      .href=${args.href}
    >
      <div slot="label">Title</div>
      <div slot="description">
        Description with multiple lines of text and more than one line of
        description
      </div>
    </obc-elevated-card> `,
};

export const Top: Story = {
  args: {
    position: ObcElevatedCardPosition.Top,
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    hasStatus: true,
  },
};

export const RegularWithStatusAndNotClickable: Story = {
  args: {
    size: ObcElevatedCardSize.DoubleLine,
    notClickable: true,
    hasLeadingIcon: true,
    hasStatus: true,
  },
  render: (args) =>
    html`<obc-elevated-card ${spread(args)}>
      <obi-placeholder slot="leading-icon"></obi-placeholder>
      <div slot="label">Title</div>
      <div slot="status">Status</div>
    </obc-elevated-card> `,
};

export const TopWithBoarder: Story = {
  args: {
    position: ObcElevatedCardPosition.Top,
    border: true,
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    hasStatus: true,
  },
};

export const Bottom: Story = {
  args: {
    position: ObcElevatedCardPosition.Bottom,
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    hasStatus: true,
  },
};

export const BottomWithBoarder: Story = {
  args: {
    position: ObcElevatedCardPosition.Bottom,
    border: true,
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    hasStatus: true,
  },
};

export const Center: Story = {
  args: {
    position: ObcElevatedCardPosition.Center,
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    hasStatus: true,
  },
};

export const SingleLine: Story = {
  args: {
    size: ObcElevatedCardSize.SingleLine,
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    hasStatus: true,
  },
};

export const DoubleLine: Story = {
  args: {
    size: ObcElevatedCardSize.DoubleLine,
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    hasStatus: true,
  },
};

export const MultiLine: Story = {
  args: {
    size: ObcElevatedCardSize.MultiLine,
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    hasStatus: true,
  },
};

export const Link: Story = {
  args: {
    size: ObcElevatedCardSize.MultiLine,
    href: 'https://www.google.com',
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    hasStatus: true,
  },
};

export const WithStatus: Story = {
  args: {
    size: ObcElevatedCardSize.DoubleLine,
    hasLeadingIcon: true,
    hasStatus: true,
    hasTrailingIcon: true,
  },
  render: (args) =>
    html`<obc-elevated-card ${spread(args)}>
      <obi-placeholder slot="leading-icon"></obi-placeholder>
      <div slot="label">Title</div>
      <div slot="status">Status</div>
      <obi-chevron-right-google slot="trailing-icon"></obi-chevron-right-google>
    </obc-elevated-card> `,
};

export const WithGraphic: Story = {
  args: {
    size: ObcElevatedCardSize.DoubleLine,
    graphicBorder: false,
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    hasStatus: true,
    hasGraphic: true,
  },
  render: (args) =>
    html`<obc-elevated-card
      .position=${args.position}
      .size=${args.size}
      .graphicBorder=${args.graphicBorder}
      .hasLeadingIcon=${args.hasLeadingIcon}
      .hasTrailingIcon=${args.hasTrailingIcon}
      .hasStatus=${args.hasStatus}
      .hasGraphic=${args.hasGraphic}
    >
      <div
        slot="graphic"
        style="width: 100%; height: 120px; color: var(--element-neutral-color); padding-top: 40px; padding-bottom: 32px"
      >
        <obi-print></obi-print>
      </div>
      <obi-placeholder slot="leading-icon"></obi-placeholder>
      <div slot="label">Title</div>
      <div slot="status">Status</div>
      <obi-chevron-right-google slot="trailing-icon"></obi-chevron-right-google>
    </obc-elevated-card> `,
};

export const WithGraphicBorder: Story = {
  args: {
    size: ObcElevatedCardSize.DoubleLine,
    graphicBorder: true,
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    hasStatus: true,
    hasGraphic: true,
  },
  render: (args) =>
    html`<obc-elevated-card
      .position=${args.position}
      .size=${args.size}
      .graphicBorder=${args.graphicBorder}
      .hasLeadingIcon=${args.hasLeadingIcon}
      .hasTrailingIcon=${args.hasTrailingIcon}
      .hasStatus=${args.hasStatus}
      .hasGraphic=${args.hasGraphic}
    >
      <div
        slot="graphic"
        style="width: 100%; height: 120px; color: var(--element-neutral-color); padding-top: 40px; padding-bottom: 32px"
      >
        <obi-print></obi-print>
      </div>
      <obi-placeholder slot="leading-icon"></obi-placeholder>
      <div slot="label">Title</div>
      <div slot="status">Status</div>
      <obi-chevron-right-google slot="trailing-icon"></obi-chevron-right-google>
    </obc-elevated-card> `,
};

export const WithGraphicInfo: Story = {
  args: {
    size: 'multi-line',
    graphicBorder: false,
    info: true,
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    hasGraphic: true,
  },
  render: (args) =>
    html`<obc-elevated-card
      .position=${args.position}
      .size=${args.size}
      .graphicBorder=${args.graphicBorder}
      .info=${args.info}
      .hasLeadingIcon=${args.hasLeadingIcon}
      .hasTrailingIcon=${args.hasTrailingIcon}
      .hasStatus=${args.hasStatus}
      .hasGraphic=${args.hasGraphic}
    >
      <div
        slot="graphic"
        style="width: 100%; height: 120px; color: var(--element-active-inverted-color); background: var(--instrument-enhanced-secondary-color); padding-top: 40px; padding-bottom: 32px"
      >
        <obi-support-google></obi-support-google>
      </div>
      <obi-placeholder slot="leading-icon"></obi-placeholder>
      <div slot="label">Title</div>
      <div slot="description">
        A long description, with a text spanning over multiple lines. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
      <obi-chevron-right-google slot="trailing-icon"></obi-chevron-right-google>
    </obc-elevated-card> `,
};
