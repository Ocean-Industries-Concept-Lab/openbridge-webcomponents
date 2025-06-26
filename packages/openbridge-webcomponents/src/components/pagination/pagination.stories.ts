import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { ObcPagination, PaginationType } from './pagination.js';
import './pagination.js';

const meta: Meta<ObcPagination> = {
  title: 'Navigation/Pagination',
  tags: ['6.0'],
  component: "obc-pagination",
  argTypes: {
    type: {
      control: { type: 'select' },
      options: Object.values(PaginationType),
    },
    pages: {
      control: { type: 'number', min: 1, max: 10 },
    },
    currentPage: {
      control: { type: 'number', min: 1 },
    },
  },
  args: {
    type: PaginationType.regular,
    pages: 5,
    currentPage: 1,
  },
} satisfies Meta<ObcPagination>;

export default meta;
type Story = StoryObj<ObcPagination>;

export const Regular: Story = {
  args: {
    type: PaginationType.regular,
    pages: 5,
    currentPage: 2,
  },
  render: (args) => html`
    <obc-pagination
      .type="${args.type}"
      .pages="${args.pages}"
      .currentPage="${args.currentPage}"
      @value="${(e: CustomEvent) => console.log('Page changed:', e.detail.value)}">
    </obc-pagination>
  `,
};

export const Flat: Story = {
  args: {
    type: PaginationType.flat,
    pages: 4,
    currentPage: 3,
  },
  render: (args) => html`
    <obc-pagination
      .type="${args.type}"
      .pages="${args.pages}"
      .currentPage="${args.currentPage}"
      @value="${(e: CustomEvent) => console.log('Page changed:', e.detail.value)}">
    </obc-pagination>
  `,
};

export const Condenced: Story = {
  args: {
    type: PaginationType.condenced,
    pages: 6,
    currentPage: 3,
  },
  render: (args) => html`
    <obc-pagination
      .type="${args.type}"
      .pages="${args.pages}"
      .currentPage="${args.currentPage}"
      @value="${(e: CustomEvent) => console.log('Page changed:', e.detail.value)}">
    </obc-pagination>
  `,
};

export const ManyPages: Story = {
  args: {
    type: PaginationType.regular,
    pages: 8,
    currentPage: 4,
  },
  render: (args) => html`
    <obc-pagination
      .type="${args.type}"
      .pages="${args.pages}"
      .currentPage="${args.currentPage}"
      @value="${(e: CustomEvent) => console.log('Page changed:', e.detail.value)}">
    </obc-pagination>
  `,
};