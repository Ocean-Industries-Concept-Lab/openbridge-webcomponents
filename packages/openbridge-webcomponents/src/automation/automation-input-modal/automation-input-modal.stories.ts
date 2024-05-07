import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcAutomationInputModal} from './automation-input-modal';
import './automation-input-modal';
import '../../components/icon-button/icon-button';
import '../../icons/icon-01-close';
import '../../icons/icon-01-stop';
import '../../icons/icon-08-forward';
import '../../components/input/input';
import '../../components/notification-button/notification-button';
import '../../icons/icon-02-chevron-double-left';
import '../../icons/icon-02-chevron-left';
import '../../icons/icon-02-chevron-double-right';
import '../../icons/icon-02-chevron-right';
import '../../components/toggle-button-group/toggle-button-group';
import '../../components/toggle-button-option/toggle-button-option';

import {html} from 'lit';

const meta: Meta<typeof ObcAutomationInputModal> = {
  title: 'Automation/InputModal',
  tags: ['autodocs'],
  component: 'obc-automation-input-modal',
  args: {},
} satisfies Meta<ObcAutomationInputModal>;

export default meta;
type Story = StoryObj<ObcAutomationInputModal>;

export const Compact: Story = {
  render: () => html`
    <style>
      .speed {
        display: grid;
        grid-template-columns: min-content min-content 100px min-content min-content;
      }
      .label {
        text-align: center;
        color: var(--element-neutral-color);
        font-feature-settings:
          'ss02' on,
          'clig' off,
          'liga' off;
        /* UI/Label */
        font-family: 'Noto Sans';
        font-size: 12px;
        font-style: normal;
        font-weight: 370;
        line-height: 16px; /* 133.333% */
      }
    </style>
    <obc-automation-input-modal>
      <div slot="header">
        <obc-icon-button variant="flat">
          <obi-01-close></obi-01-close>
        </obc-icon-button>
      </div>
      <div slot="preview"></div>
      <div slot="actions">
        <obc-toggle-button-group has-labels value="run">
          <obc-toggle-button-option value="stop"
            >Stop
            <obi-01-stop slot="icon"></obi-01-stop>
          </obc-toggle-button-option>
          <obc-toggle-button-option value="run"
            >Run
            <obi-08-forward slot="icon"></obi-08-forward>
          </obc-toggle-button-option>
        </obc-toggle-button-group>
        <div class="speed">
          <obc-notification-button icon corner-left open-right>
            <obi-02-chevron-double-left></obi-02-chevron-double-left>
          </obc-notification-button>
          <obc-notification-button icon open-right>
            <obi-02-chevron-left></obi-02-chevron-left>
          </obc-notification-button>
          <obc-input
            value="10"
            squared
            textAlign="center"
            font="button"
          ></obc-input>
          <obc-notification-button icon open-left>
            <obi-02-chevron-right></obi-02-chevron-right>
          </obc-notification-button>
          <obc-notification-button icon corner-right open-left>
            <obi-02-chevron-double-right></obi-02-chevron-double-right>
          </obc-notification-button>
          <div class="label">-10</div>
          <div class="label">-1</div>
          <div class="label">Speed</div>
          <div class="label">+1</div>
          <div class="label">+10</div>
        </div>
      </div>
    </obc-automation-input-modal>
  `,
};
