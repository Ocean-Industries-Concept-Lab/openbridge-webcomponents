import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import './alert-menu-experimental.js';
import {
  ObcAlertMenuExperimental,
  ObcAlertMenuExperimentalAckAllVisibleClickEvent,
} from './alert-menu-experimental.js';
import type {ObcAlertMenuItemExperimental} from '../alert-menu-item-experimental/alert-menu-item-experimental.js';
import type {ObcTabbedCard} from '../tabbed-card/tabbed-card.js';
import {ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON} from '../../alert-system/alert-standard.js';
import {
  alertMenuItem,
  alertsInEveryKindOfState,
  alertsInEveryKindOfStateOfTheConfiguredStandard,
  applyActionToMenuItem,
  drawStoryWithAlertStandard,
  type StoryAlert,
} from '../../storybook-util.js';

const acknowledgeVisibleItems = (
  event: ObcAlertMenuExperimentalAckAllVisibleClickEvent
) => {
  for (const {element} of event.detail.visibleElements) {
    applyActionToMenuItem(
      element as ObcAlertMenuItemExperimental,
      ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON
    );
  }
};

const renderItems = (alerts: StoryAlert[]) =>
  repeat(
    alerts,
    (alert) => alert.id,
    (alert) => alertMenuItem(alert)
  );

const meta: Meta<ObcAlertMenuExperimental> = {
  title: 'Application Components/Alerts/Alert Menu Experimental',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-menu-experimental',
  beforeEach: drawStoryWithAlertStandard('iec-62923'),
  args: {
    canAckAll: true,
    showSilenceButton: true,
    showAlertListButton: true,
  },
  render: (args) =>
    html`<obc-alert-menu-experimental
      .canAckAll=${args.canAckAll}
      .showSilenceButton=${args.showSilenceButton}
      .showAlertListButton=${args.showAlertListButton}
      @ack-all-visible-click=${acknowledgeVisibleItems}
    >
      ${renderItems(alertsInEveryKindOfStateOfTheConfiguredStandard())}
    </obc-alert-menu-experimental>`,
};

export default meta;
type Story = StoryObj<ObcAlertMenuExperimental>;

export const Regular: Story = {};

export const Automation: Story = {
  beforeEach: drawStoryWithAlertStandard('isa-18.2'),
  parameters: {
    docs: {
      description: {
        story:
          'ISA-18.2 declares five filters, so the menu has five tabs, and it lets several alarms be acknowledged at once, so the menu offers ACK visible. Under IEC 62923, as in the other stories, it does not: MSC.302 9.9 asks for one alarm at a time.',
      },
    },
  },
};

export const Empty: Story = {
  render: () =>
    html`<obc-alert-menu-experimental></obc-alert-menu-experimental>`,
};

const ISA_18_2_FILTER_COUNT = 5;

export const Tabs: Story = {
  beforeEach: drawStoryWithAlertStandard('isa-18.2'),
  parameters: {
    docs: {
      description: {
        story:
          'The same ISA-18.2 alarms, one in each kind of state, with each tab selected. Each tab is a filter the standard declares, and shows the alarms whose state is included in it.',
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
        ${Array.from(
          {length: ISA_18_2_FILTER_COUNT},
          () =>
            html`<obc-alert-menu-experimental
              canAckAll
              .showSilenceButton=${false}
              .showAlertListButton=${false}
            >
              ${renderItems(alertsInEveryKindOfState('isa-18.2'))}
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

export const NoAlertStandard: Story = {
  beforeEach: drawStoryWithAlertStandard(undefined),
  parameters: {
    docs: {
      description: {
        story:
          'Until the application calls `setAlertStandard()`, the menu has one tab, shows none of its items and says that no alert standard is set. The console says how to set one.',
      },
    },
  },
};
