import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcPagination, PaginationType} from './pagination.js';
import './pagination.js';

const meta: Meta<ObcPagination> = {
  title: 'Navigation/Pagination',
  component: 'obc-pagination',
  tags: ['6.0'],

  argTypes: {
    type: {
      control: {type: 'select'},
      options: Object.values(PaginationType),
    },
    pages: {
      control: {type: 'number', min: 1, max: 50},
    },
    currentPage: {
      control: {type: 'number', min: 1},
    },
    fullWidth: {
      control: {type: 'boolean'},
    },
  },

  args: {
    type: PaginationType.regular,
    pages: 5,
    currentPage: 1,
    fullWidth: false,
  },
};
export default meta;

type Story = StoryObj<ObcPagination>;

function renderPagination(args: ObcPagination) {
  return html`
    <obc-pagination
      .type=${args.type}
      .pages=${args.pages}
      .currentPage=${args.currentPage}
      .fullWidth=${args.fullWidth}
    ></obc-pagination>
  `;
}

export const Playground: Story = {
  render: renderPagination,
  parameters: {
    controls: {expanded: true},
  },
};

export const Regular: Story = {
  args: {
    type: PaginationType.regular,
    pages: 5,
    currentPage: 2,
  },
  render: renderPagination,
};

export const Flat: Story = {
  args: {
    type: PaginationType.flat,
    pages: 4,
    currentPage: 3,
  },
  render: renderPagination,
};

export const Condensed: Story = {
  args: {
    type: PaginationType.condensed,
    pages: 6,
    currentPage: 3,
  },
  render: renderPagination,
};

export const FullWidthCondensed: Story = {
  args: {
    type: PaginationType.condensed,
    pages: 6,
    currentPage: 3,
    fullWidth: true,
  },
  render: (args) =>
    html`<div style="width: 500px;">${renderPagination(args)}</div>`,
};

export const EdgeCases: Story = {
  name: 'Edge Cases (1 page)',
  args: {
    type: PaginationType.regular,
    pages: 1,
    currentPage: 1,
  },
  render: renderPagination,
};

export const LastPage: Story = {
  args: {
    type: PaginationType.regular,
    pages: 6,
    currentPage: 6,
  },
  render: renderPagination,
};

export const LargeSet: Story = {
  name: 'Many Pages (20)',
  args: {
    type: PaginationType.regular,
    pages: 20,
    currentPage: 10,
  },
  render: renderPagination,
};
