import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcAutomationInputModal } from './automation-input-modal';
import './automation-input-modal';
import '../../components/icon-button/icon-button';
import '../../icons/icon-close-google';
import '../../icons/icon-forward';
import '../../components/input/input';
import '../../components/notification-button/notification-button';
import '../../icons/icon-chevron-double-left-google';
import '../../icons/icon-chevron-left-google';
import '../../icons/icon-chevron-double-right-google';
import '../../icons/icon-chevron-right-google';
import '../../components/toggle-button-group/toggle-button-group';
import '../../components/toggle-button-option/toggle-button-option';

import { html } from 'lit';

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
          <obi-close-google></obi-close-google>
        </obc-icon-button>
      </div>
      <div slot="preview"></div>
      <div slot="actions">
        <obc-toggle-button-group hasLabels value="run">
          <obc-toggle-button-option value="stop"
            >Stop
            <obi-stop slot="icon"></obi-stop>
          </obc-toggle-button-option>
          <obc-toggle-button-option value="run"
            >Run
            <obi-forward slot="icon"></obi-forward>
          </obc-toggle-button-option>
        </obc-toggle-button-group>
        <div class="speed">
          <obc-notification-button icon cornerLeft openRight>
            <obi-chevron-double-left-google></obi-chevron-double-left-google>
          </obc-notification-button>
          <obc-notification-button icon openRight>
            <obi-chevron-left-google></obi-chevron-left-google>
          </obc-notification-button>
          <obc-input
            value="10"
            squared
            textAlign="center"
            font="button"
          ></obc-input>
          <obc-notification-button icon openLeft>
            <obi-chevron-right-google></obi-chevron-right-google>
          </obc-notification-button>
          <obc-notification-button icon cornerRight openLeft>
            <obi-chevron-double-right-google></obi-chevron-double-right-google>
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
