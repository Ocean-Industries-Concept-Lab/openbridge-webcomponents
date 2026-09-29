import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcCard} from './card.js';
import './card.js';
import {html} from 'lit';

const meta = {
  title: 'UI Components/Sections/Card',
  tags: ['autodocs', '6.0'],
  component: 'obc-card',
  args: {
    showTitle: true,
    hasDialog: false,
    dialogTimeOutSeconds: 20,
    dialogVisibleTimerSeconds: 10,
  },
} satisfies Meta<ObcCard>;

export default meta;
type Story = StoryObj<ObcCard>;

const cardContent = html`
  <div
    style="height: 100px; width: 100%; background-color: var(--base-red-200); display: flex; align-items: center; justify-content: center;"
  >
    Content
  </div>
`;

const dialogContent = html`
  <div slot="dialog-title">Dialog Title</div>
  <div
    slot="dialog-content"
    style="height: 100px; width: 200px; background-color: var(--base-blue-200); display: flex; align-items: center; justify-content: center;"
  >
    Dialog Content
  </div>
`;

const dialogCard = (args: ObcCard) => html`
  <obc-card
    hasDialog
    style="width: 200px;"
    .dialogTimeOutSeconds=${args.dialogTimeOutSeconds}
    .dialogVisibleTimerSeconds=${args.dialogVisibleTimerSeconds}
  >
    <div slot="title">Title</div>
    ${cardContent} ${dialogContent}
  </obc-card>
`;

export const Regular: Story = {
  render: (args) => html`
    <obc-card .showTitle=${args.showTitle}>
      <div slot="title">Title</div>
      ${cardContent}
    </obc-card>
  `,
};

export const WithDialog: Story = {
  args: {hasDialog: true},
  render: dialogCard,
};

export const WithDialogNoAutoclose: Story = {
  args: {hasDialog: true, dialogTimeOutSeconds: 0},
  render: dialogCard,
};

export const WithDialogShortTimeout: Story = {
  args: {
    hasDialog: true,
    dialogTimeOutSeconds: 5,
    dialogVisibleTimerSeconds: 3,
  },
  render: dialogCard,
};

export const NoTitle: Story = {
  args: {showTitle: false},
  render: (args) => html`
    <obc-card .showTitle=${args.showTitle}>${cardContent}</obc-card>
  `,
};
