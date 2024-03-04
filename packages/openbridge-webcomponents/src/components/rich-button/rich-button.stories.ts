import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcRichButton} from './rich-button';
import './rich-button';
import {html} from 'lit';
import '../../icons/icon-01-placeholder';
import '../../icons/icon-02-chevron-right';
import '../../icons/icon-01-print';
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
    html`<obc-rich-button position=${args.position} size=${args.size} ?has-graphic=${args.hasGraphic}
      ?has-leading-icon=${args.hasLeadingIcon} ?has-trailing-icon=${args.hasTrailingIcon} ?has-status=${args.hasStatus}
    >
      <obi-01-placeholder slot="leading-icon"></obi-01-placeholder>
      <div slot="label">Title</div>
      <div slot="description">
        Description with multiple lines of text and more than one line of
        description
      </div>
      <obi-02-chevron-right slot="trailing-icon"></obi-02-chevron-right>
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

export const Bottom: Story = {
  args: {
    position: 'bottom',
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
      <obi-01-placeholder slot="leading-icon"></obi-01-placeholder>
      <div slot="label">Title</div>
      <div slot="status">Status</div>
      <obi-02-chevron-right slot="trailing-icon"></obi-02-chevron-right>
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
    html`<obc-rich-button position=${args.position} size=${args.size} ?has-graphic=${args.hasGraphic}
    ?has-leading-icon=${args.hasLeadingIcon} ?has-trailing-icon=${args.hasTrailingIcon} ?has-status=${args.hasStatus} ?graphic-border=${args.graphicBorder}>
      <div slot="graphic" style="width: 100%; height: 120px; color: var(--element-neutral-color); padding-top: 40px; padding-bottom: 32px">
        <obi-01-print></obi-01-print>
      </div>
      <obi-01-placeholder slot="leading-icon"></obi-01-placeholder>
      <div slot="label">Title</div>
      <div slot="status">Status</div>
      <obi-02-chevron-right slot="trailing-icon"></obi-02-chevron-right>
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
    html`<obc-rich-button position=${args.position} size=${args.size} ?has-graphic=${args.hasGraphic}
    ?has-leading-icon=${args.hasLeadingIcon} ?has-trailing-icon=${args.hasTrailingIcon} ?has-status=${args.hasStatus} ?graphic-border=${args.graphicBorder}>
      <div slot="graphic" style="width: 100%; height: 120px; color: var(--element-neutral-color); padding-top: 40px; padding-bottom: 32px">
        <obi-01-print></obi-01-print>
      </div>
      <obi-01-placeholder slot="leading-icon"></obi-01-placeholder>
      <div slot="label">Title</div>
      <div slot="status">Status</div>
      <obi-02-chevron-right slot="trailing-icon"></obi-02-chevron-right>
    </obc-rich-button> `,
};
