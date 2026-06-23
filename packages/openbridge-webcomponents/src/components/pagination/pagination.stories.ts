import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcPagination, PaginationVariant} from './pagination.js';
import './pagination.js';

const meta: Meta<ObcPagination> = {
  title: 'UI Components/Menus and Navigation/Pagination',
  component: 'obc-pagination',
  tags: ['6.0'],

  argTypes: {
    variant: {
      control: {type: 'select'},
      options: Object.values(PaginationVariant),
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
    disabled: {
      control: {type: 'boolean'},
    },
  },

  args: {
    variant: PaginationVariant.regular,
    pages: 5,
    currentPage: 1,
    fullWidth: false,
    disabled: false,
  },
};
export default meta;

type Story = StoryObj<ObcPagination>;

function renderPagination(args: ObcPagination) {
  return html`
    <obc-pagination
      .variant=${args.variant}
      .pages=${args.pages}
      .currentPage=${args.currentPage}
      .fullWidth=${args.fullWidth}
      .disabled=${args.disabled}
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
    variant: PaginationVariant.regular,
    pages: 5,
    currentPage: 2,
  },
  render: renderPagination,
};

export const Flat: Story = {
  args: {
    variant: PaginationVariant.flat,
    pages: 4,
    currentPage: 3,
  },
  render: renderPagination,
};

export const Condensed: Story = {
  args: {
    variant: PaginationVariant.condensed,
    pages: 6,
    currentPage: 3,
  },
  render: renderPagination,
};

export const FullWidthCondensed: Story = {
  args: {
    variant: PaginationVariant.condensed,
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
    variant: PaginationVariant.regular,
    pages: 1,
    currentPage: 1,
  },
  render: renderPagination,
};

export const LastPage: Story = {
  args: {
    variant: PaginationVariant.regular,
    pages: 6,
    currentPage: 6,
  },
  render: renderPagination,
};

export const LargeSet: Story = {
  name: 'Many Pages (20)',
  args: {
    variant: PaginationVariant.regular,
    pages: 20,
    currentPage: 10,
  },
  render: renderPagination,
};

export const Disabled: Story = {
  args: {
    variant: PaginationVariant.regular,
    pages: 5,
    currentPage: 2,
    disabled: true,
  },
  render: renderPagination,
};
