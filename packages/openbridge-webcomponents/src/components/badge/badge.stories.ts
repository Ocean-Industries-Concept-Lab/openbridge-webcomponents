import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcBadge} from './badge.js';
import './badge.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';

const meta: Meta<typeof ObcBadge> = {
  title: 'UI Components/Alert/Badge',
  tags: ['autodocs'],
  component: 'obc-badge',
  args: {
    number: 9,
  },
} satisfies Meta<ObcBadge>;

export default meta;
type Story = StoryObj<ObcBadge>;

export const Regular: Story = {
  render(args) {
    return html`<obc-badge number=${args.number} size="regular">
      <obi-placeholder></obi-placeholder>
    </obc-badge>`;
  },
};

export const Large: Story = {
  render(args) {
    return html`<obc-badge number=${args.number} size="large">
      <obi-placeholder></obi-placeholder>
    </obc-badge>`;
  },
};

export const NoNumber: Story = {
  render() {
    return html`<obc-badge hideNumber size="regular">
      <obi-placeholder></obi-placeholder>
    </obc-badge>`;
  },
};

export const NoNumberLarge: Story = {
  render() {
    return html`<obc-badge hideNumber size="large">
      <obi-placeholder></obi-placeholder>
    </obc-badge>`;
  },
};

export const Alarm: Story = {
  render(args) {
    return html`<obc-badge number=${args.number} type="alarm">
      <obi-placeholder></obi-placeholder>
    </obc-badge>`;
  },
};

export const Warning: Story = {
  render(args) {
    return html`<obc-badge number=${args.number} type="warning">
      <obi-placeholder></obi-placeholder>
    </obc-badge>`;
  },
};

export const Caution: Story = {
  render(args) {
    return html`<obc-badge number=${args.number} type="caution">
      <obi-placeholder></obi-placeholder>
    </obc-badge>`;
  },
};

export const Running: Story = {
  render(args) {
    return html`<obc-badge number=${args.number} type="running">
      <obi-placeholder></obi-placeholder>
    </obc-badge>`;
  },
};

export const Notification: Story = {
  render(args) {
    return html`<obc-badge number=${args.number} type="notification">
      <obi-placeholder></obi-placeholder>
    </obc-badge>`;
  },
};

export const Enhance: Story = {
  render(args) {
    return html`<obc-badge number=${args.number} type="enhance">
      <obi-placeholder></obi-placeholder>
    </obc-badge>`;
  },
};

export const Flat: Story = {
  render(args) {
    return html`<obc-badge number=${args.number} type="flat">
      <obi-placeholder></obi-placeholder>
    </obc-badge>`;
  },
};

export const Empty: Story = {
  render(args) {
    return html`<obc-badge number=${args.number} type="empty"> </obc-badge>`;
  },
};

export const Automation: Story = {
  render() {
    return html`<obc-badge hideNumber type="automation">
      <obi-placeholder></obi-placeholder>
    </obc-badge>`;
  },
};
