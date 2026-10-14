import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './alert-menu-item-experimental.js';
import {
  ObcAlertMenuItemExperimental,
  type ObcAlertMenuItemExperimentalActionClickEvent,
} from './alert-menu-item-experimental.js';
import {ObcMessageMenuItemSize} from '../message-menu-item/message-menu-item.js';
import {
  applyActionToMenuItem,
  drawStoryWithAlertStandard,
} from '../../storybook-util.js';

const applyClickedAction = (
  event: ObcAlertMenuItemExperimentalActionClickEvent
) =>
  applyActionToMenuItem(
    event.currentTarget as ObcAlertMenuItemExperimental,
    event.detail.actionId
  );

const meta: Meta<ObcAlertMenuItemExperimental> = {
  title: 'Application Components/Alerts/Alert Menu Item Experimental',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-menu-item-experimental',
  beforeEach: drawStoryWithAlertStandard('iec-62923'),
  args: {
    criticality: 'alarm',
    state: 'active-unacknowledged',
    title: 'ME 1',
    description: 'Port main engine temperature exceeds normal operating range',
    time: '14:30:00',
    size: ObcMessageMenuItemSize.SingleLine,
  },
  argTypes: {
    size: {
      control: {type: 'select'},
      options: Object.values(ObcMessageMenuItemSize),
    },
  },
  render: (args) =>
    html`<obc-alert-menu-item-experimental
      .criticality=${args.criticality}
      .state=${args.state}
      .title=${args.title}
      .description=${args.description}
      .time=${args.time}
      .size=${args.size}
      @action-click=${applyClickedAction}
      style="width: 480px"
    ></obc-alert-menu-item-experimental>`,
};

export default meta;
type Story = StoryObj<ObcAlertMenuItemExperimental>;

export const Regular: Story = {};

export const AcknowledgeNotAllowed: Story = {
  args: {
    criticality: 'warning',
    state: 'active-unacknowledged-acknowledge-not-allowed',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The state offers no action, so the item shows the glyph IEC 62923 defines for an alert that is acknowledged somewhere else.',
      },
    },
  },
};

export const TwoActions: Story = {
  beforeEach: drawStoryWithAlertStandard('isa-18.2'),
  args: {
    criticality: 'high',
    state: 'unacknowledged',
  },
  parameters: {
    docs: {
      description: {
        story:
          'An unacknowledged ISA-18.2 alarm offers two actions, so the item shows a button for each.',
      },
    },
  },
};
