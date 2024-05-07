import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcBadge} from './badge';
import './badge';
import {html} from 'lit';
import '../../icons/icon-01-placeholder';

const meta: Meta<typeof ObcBadge> = {
  title: 'Automation/Badge',
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
      <obi-01-placeholder></obi-01-placeholder>
    </obc-badge>`;
  },
};

export const Large: Story = {
  render(args) {
    return html`<obc-badge number=${args.number} size="large">
      <obi-01-placeholder></obi-01-placeholder>
    </obc-badge>`;
  },
};

export const NoNumber: Story = {
  render() {
    return html`<obc-badge hide-number size="regular">
      <obi-01-placeholder></obi-01-placeholder>
    </obc-badge>`;
  },
};

export const NoNumberLarge: Story = {
  render() {
    return html`<obc-badge hide-number size="large">
      <obi-01-placeholder></obi-01-placeholder>
    </obc-badge>`;
  },
};

export const Alarm: Story = {
  render(args) {
    return html`<obc-badge number=${args.number} type="alarm">
      <obi-01-placeholder></obi-01-placeholder>
    </obc-badge>`;
  },
};

export const Warning: Story = {
  render(args) {
    return html`<obc-badge number=${args.number} type="warning">
      <obi-01-placeholder></obi-01-placeholder>
    </obc-badge>`;
  },
};

export const Caution: Story = {
  render(args) {
    return html`<obc-badge number=${args.number} type="caution">
      <obi-01-placeholder></obi-01-placeholder>
    </obc-badge>`;
  },
};

export const Running: Story = {
  render(args) {
    return html`<obc-badge number=${args.number} type="running">
      <obi-01-placeholder></obi-01-placeholder>
    </obc-badge>`;
  },
};

export const Notification: Story = {
  render(args) {
    return html`<obc-badge number=${args.number} type="notification">
      <obi-01-placeholder></obi-01-placeholder>
    </obc-badge>`;
  },
};

export const Enhance: Story = {
  render(args) {
    return html`<obc-badge number=${args.number} type="enhance">
      <obi-01-placeholder></obi-01-placeholder>
    </obc-badge>`;
  },
};

export const Flat: Story = {
  render(args) {
    return html`<obc-badge number=${args.number} type="flat">
      <obi-01-placeholder></obi-01-placeholder>
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
    return html`<obc-badge hide-number type="automation">
      <obi-01-placeholder></obi-01-placeholder>
    </obc-badge>`;
  },
};
