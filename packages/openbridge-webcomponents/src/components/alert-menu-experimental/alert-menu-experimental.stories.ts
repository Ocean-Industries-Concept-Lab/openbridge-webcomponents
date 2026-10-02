import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import './alert-menu-experimental.js';
import {
  ObcAlertMenuExperimental,
  ObcAlertMenuExperimentalAckAllVisibleClickEvent,
} from './alert-menu-experimental.js';
import type {ObcAlertMenuItem} from '../alert-menu-item/alert-menu-item.js';
import type {ObcTabbedCard} from '../tabbed-card/tabbed-card.js';
import {
  acknowledgeMenuItem,
  alertMenuItem,
  alertsInEveryState,
} from '../../storybook-util.js';
import type {StandardAlert} from '../../alert-system/standard-alert.js';

/** The standards the `standard` control offers, both built into the library. */
type BuiltInStandard = 'iec-62923' | 'isa-18.2' | undefined;

const handleAckAllVisible = (
  e: ObcAlertMenuExperimentalAckAllVisibleClickEvent
) => {
  for (const {element} of e.detail.visibleElements) {
    acknowledgeMenuItem(element as ObcAlertMenuItem);
  }
};

const renderItems = (alerts: StandardAlert[]) =>
  repeat(
    alerts,
    (alert) => alert.id,
    (alert) => alertMenuItem(alert, acknowledgeMenuItem)
  );

const meta: Meta<ObcAlertMenuExperimental> = {
  title: 'Application Components/Alerts/Alert Menu Experimental',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-menu-experimental',
  args: {
    hasShelved: true,
    hasBlocked: true,
    canAckAll: true,
    showSilenceButton: true,
    showAlertListButton: true,
  },
  argTypes: {
    standard: {
      control: {type: 'select'},
      options: ['iec-62923', 'isa-18.2'],
    },
  },
  render: (args) =>
    html`<obc-alert-menu-experimental
      .standard=${args.standard}
      .hasShelved=${args.hasShelved}
      .hasBlocked=${args.hasBlocked}
      .canAckAll=${args.canAckAll}
      .showSilenceButton=${args.showSilenceButton}
      .showAlertListButton=${args.showAlertListButton}
      @ack-all-visible-click=${handleAckAllVisible}
    >
      ${renderItems(alertsInEveryState(args.standard as BuiltInStandard))}
    </obc-alert-menu-experimental>`,
};

export default meta;
type Story = StoryObj<ObcAlertMenuExperimental>;

export const Regular: Story = {};

export const Automation: Story = {
  args: {standard: 'isa-18.2'},
  parameters: {
    docs: {
      description: {
        story:
          'ISA-18.2 lets several alarms be acknowledged at once, so the menu offers ACK visible. Under IEC 62923, the default, it does not: MSC.302 9.9 asks for one alarm at a time.',
      },
    },
  },
};

export const Empty: Story = {
  render: () =>
    html`<obc-alert-menu-experimental
      hasShelved
      hasBlocked
    ></obc-alert-menu-experimental>`,
};

export const Tabs: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The same alerts, one in each state, with each tab selected. Unacked keeps an alert whose condition has cleared until it is acked; Active and Unacked leave shelved and blocked alerts out.',
      },
    },
  },
  render: () =>
    html`<style>
        .menu-tabs {
          display: grid;
          grid-template-columns: repeat(2, max-content);
          gap: 16px;
        }
        .menu-tabs obc-alert-menu-experimental::part(wrapper) {
          width: 560px;
          height: 400px;
        }
      </style>
      <div class="menu-tabs">
        ${[0, 1, 2, 3].map(
          () =>
            html`<obc-alert-menu-experimental
              hasShelved
              hasBlocked
              canAckAll
              .showSilenceButton=${false}
              .showAlertListButton=${false}
            >
              ${renderItems(alertsInEveryState())}
            </obc-alert-menu-experimental>`
        )}
      </div>`,
  play: async ({canvasElement}) => {
    const menus = canvasElement.querySelectorAll('obc-alert-menu-experimental');
    for (const [index, menu] of [...menus].entries()) {
      await menu.updateComplete;
      const card = menu.shadowRoot!.querySelector(
        'obc-tabbed-card'
      ) as ObcTabbedCard;
      await card.updateComplete;
      card.shadowRoot!.querySelector<HTMLElement>(`#tab-${index}`)!.click();
      await menu.updateComplete;
    }
  },
};
