import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcRichButton} from './rich-button';
import './rich-button';
import {html} from 'lit';
import '../../icons/icon-placeholder';
import '../../icons/icon-chevron-right-google';
import '../../icons/icon-print';
import '../../icons/icon-support-google';
import {spread} from '@open-wc/lit-helpers';

const meta: Meta<typeof ObcRichButton> = {
  title: 'Button/Rich button',
  tags: ['autodocs'],
  component: 'obc-rich-button',
  args: {
    position: 'regular',
    size: 'multi-line',
    hasLeadingIcon: true,
    hasTrailingIcon: true,
  },
  parameters: {
    backgrounds: {
      default: 'container-section-color',
    },
  },
  argTypes: {
    position: {
      control: {type: 'select'},
      options: ['regular', 'top', 'bottom', 'center'],
    },
    size: {
      control: {type: 'select'},
      options: ['single-line', 'double-line', 'multi-line'],
    },
  },
  decorators: (story) => html`<div style="width: 400px;">${story()}</div>`,
  render: (args) =>
    html`<obc-rich-button
      .position=${args.position}
      .size=${args.size}
      .hasGraphic=${args.hasGraphic}
      .hasLeadingIcon=${args.hasLeadingIcon}
      .hasTrailingIcon=${args.hasTrailingIcon}
      .hasStatus=${args.hasStatus}
      .border=${args.border}
    >
      <obi-placeholder slot="leading-icon"></obi-placeholder>
      <div slot="label">Title</div>
      <div slot="description">
        Description with multiple lines of text and more than one line of
        description
      </div>
      <obi-chevron-right-google slot="trailing-icon"></obi-chevron-right-google>
    </obc-rich-button> `,
} satisfies Meta<ObcRichButton>;

export default meta;
type Story = StoryObj<ObcRichButton>;

export const Regular: Story = {};

export const RegularNoIcons: Story = {
  args: {
    hasLeadingIcon: false,
    hasTrailingIcon: false,
  },
};

export const Top: Story = {
  args: {
    position: 'top',
  },
};

export const TopWithBoarder: Story = {
  args: {
    position: 'top',
    border: true,
  },
};

export const Bottom: Story = {
  args: {
    position: 'bottom',
  },
};

export const BottomWithBoarder: Story = {
  args: {
    position: 'bottom',
    border: true,
  },
};

export const Center: Story = {
  args: {
    position: 'center',
  },
};

export const SingleLine: Story = {
  args: {
    size: 'single-line',
  },
};

export const DoubleLine: Story = {
  args: {
    size: 'double-line',
  },
};

export const MultiLine: Story = {
  args: {
    size: 'multi-line',
  },
};

export const WithStatus: Story = {
  args: {
    size: 'double-line',
    hasStatus: true,
    hasLeadingIcon: true,
    hasTrailingIcon: true,
  },
  render: (args) =>
    html`<obc-rich-button ${spread(args)}>
      <obi-placeholder slot="leading-icon"></obi-placeholder>
      <div slot="label">Title</div>
      <div slot="status">Status</div>
      <obi-chevron-right slot="trailing-icon"></obi-chevron-right>
    </obc-rich-button> `,
};

export const WithGraphic: Story = {
  args: {
    size: 'double-line',
    hasStatus: true,
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    hasGraphic: true,
    graphicBorder: false,
  },
  render: (args) =>
    html`<obc-rich-button
      .position=${args.position}
      .size=${args.size}
      .hasGraphic=${args.hasGraphic}
      .hasLeadingIcon=${args.hasLeadingIcon}
      .hasTrailingIcon=${args.hasTrailingIcon}
      .hasStatus=${args.hasStatus}
      .graphicBorder=${args.graphicBorder}
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
      <obi-chevron-right slot="trailing-icon"></obi-chevron-right>
    </obc-rich-button> `,
};

export const WithGraphicBorder: Story = {
  args: {
    size: 'double-line',
    hasStatus: true,
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    hasGraphic: true,
    graphicBorder: true,
  },
  render: (args) =>
    html`<obc-rich-button
      .position=${args.position}
      .size=${args.size}
      .hasGraphic=${args.hasGraphic}
      .hasLeadingIcon=${args.hasLeadingIcon}
      .hasTrailingIcon=${args.hasTrailingIcon}
      .hasStatus=${args.hasStatus}
      .graphicBorder=${args.graphicBorder}
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
      <obi-chevron-right slot="trailing-icon"></obi-chevron-right>
    </obc-rich-button> `,
};

export const WithGraphicInfo: Story = {
  args: {
    size: 'multi-line',
    hasLeadingIcon: false,
    hasTrailingIcon: false,
    hasGraphic: true,
    graphicBorder: false,
    info: true,
  },
  render: (args) =>
    html`<obc-rich-button
      .position=${args.position}
      .size=${args.size}
      .hasGraphic=${args.hasGraphic}
      .hasLeadingIcon=${args.hasLeadingIcon}
      .hasTrailingIcon=${args.hasTrailingIcon}
      .graphicBorder=${args.graphicBorder}
      .info=${args.info}
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
      <obi-chevron-right slot="trailing-icon"></obi-chevron-right>
    </obc-rich-button> `,
};
