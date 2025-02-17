import type {Meta, StoryObj} from '@storybook/web-components';
import {
  ObcRichButton,
  ObcRichButtonPosition,
  ObcRichButtonSize,
} from './rich-button';
import './rich-button';
import {html} from 'lit';
import '../../icons/icon-placeholder';
import '../../icons/icon-chevron-right-google';
import '../../icons/icon-print';
import '../../icons/icon-support-google';
import '../button/button';
import {spread} from '@open-wc/lit-helpers';

const meta: Meta<typeof ObcRichButton> = {
  title: 'Button/Rich button',
  tags: ['autodocs'],
  component: 'obc-rich-button',
  args: {
    position: ObcRichButtonPosition.Regular,
    size: ObcRichButtonSize.MultiLine,
  },
  parameters: {
    backgrounds: {
      default: 'container-section-color',
    },
  },
  argTypes: {
    position: {
      control: {type: 'select'},
      options: Object.values(ObcRichButtonPosition),
    },
    size: {
      control: {type: 'select'},
      options: Object.values(ObcRichButtonSize),
    },
  },
  decorators: (story) => html`<div style="width: 400px;">${story()}</div>`,
  render: (args) =>
    html`<obc-rich-button
      .position=${args.position}
      .size=${args.size}
      .border=${args.border}
      .href=${args.href}
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
  render: (args) =>
    html`<obc-rich-button
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
    </obc-rich-button> `,
};

export const Top: Story = {
  args: {
    position: ObcRichButtonPosition.Top,
  },
};

export const RegularWithStatusAndAction: Story = {
  args: {
    size: ObcRichButtonSize.DoubleLine,
  },
  render: (args) =>
    html`<obc-rich-button ${spread(args)}>
      <obi-placeholder slot="leading-icon"></obi-placeholder>
      <div slot="label">Title</div>
      <div slot="status">Status</div>
      <obc-button slot="action">Action</obc-button>
      <obi-chevron-right-google slot="trailing-icon"></obi-chevron-right-google>
    </obc-rich-button> `,
};

export const TopWithBoarder: Story = {
  args: {
    position: ObcRichButtonPosition.Top,
    border: true,
  },
};

export const Bottom: Story = {
  args: {
    position: ObcRichButtonPosition.Bottom,
  },
};

export const BottomWithBoarder: Story = {
  args: {
    position: ObcRichButtonPosition.Bottom,
    border: true,
  },
};

export const Center: Story = {
  args: {
    position: ObcRichButtonPosition.Center,
  },
};

export const SingleLine: Story = {
  args: {
    size: ObcRichButtonSize.SingleLine,
  },
};

export const DoubleLine: Story = {
  args: {
    size: ObcRichButtonSize.DoubleLine,
  },
};

export const MultiLine: Story = {
  args: {
    size: ObcRichButtonSize.MultiLine,
  },
};

export const Link: Story = {
  args: {
    size: ObcRichButtonSize.MultiLine,
    href: 'https://www.google.com',
  },
};

export const WithStatus: Story = {
  args: {
    size: ObcRichButtonSize.DoubleLine,
  },
  render: (args) =>
    html`<obc-rich-button ${spread(args)}>
      <obi-placeholder slot="leading-icon"></obi-placeholder>
      <div slot="label">Title</div>
      <div slot="status">Status</div>
      <obi-chevron-right-google slot="trailing-icon"></obi-chevron-right-google>
    </obc-rich-button> `,
};

export const WithGraphic: Story = {
  args: {
    size: ObcRichButtonSize.DoubleLine,
    graphicBorder: false,
  },
  render: (args) =>
    html`<obc-rich-button
      .position=${args.position}
      .size=${args.size}
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
      <obi-chevron-right-google slot="trailing-icon"></obi-chevron-right-google>
    </obc-rich-button> `,
};

export const WithGraphicBorder: Story = {
  args: {
    size: ObcRichButtonSize.DoubleLine,
    graphicBorder: true,
  },
  render: (args) =>
    html`<obc-rich-button
      .position=${args.position}
      .size=${args.size}
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
      <obi-chevron-right-google slot="trailing-icon"></obi-chevron-right-google>
    </obc-rich-button> `,
};

export const WithGraphicInfo: Story = {
  args: {
    size: 'multi-line',
    graphicBorder: false,
    info: true,
  },
  render: (args) =>
    html`<obc-rich-button
      .position=${args.position}
      .size=${args.size}
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
      <obi-chevron-right-google slot="trailing-icon"></obi-chevron-right-google>
    </obc-rich-button> `,
};
