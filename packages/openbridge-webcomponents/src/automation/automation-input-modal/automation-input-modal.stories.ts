import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcAutomationInputModal} from './automation-input-modal.js';
import './automation-input-modal.js';
import '../../components/icon-button/icon-button.js';
import '../../icons/icon-close-google.js';
import '../../icons/icon-forward.js';
import '../../components/number-input-field/number-input-field.js';
import '../../components/notification-badge-button/notification-badge-button.js';
import '../../icons/icon-chevron-double-left-google.js';
import '../../icons/icon-chevron-left-google.js';
import '../../icons/icon-chevron-double-right-google.js';
import '../../icons/icon-chevron-right-google.js';
import '../../icons/icon-media-stop.js';
import '../../components/toggle-button-group/toggle-button-group.js';
import '../../components/toggle-button-option/toggle-button-option.js';

import {html} from 'lit';
import {
  ObcToggleButtonOptionType,
  ObcToggleButtonOptionVariant,
} from '../../components/toggle-button-option/toggle-button-option.js';
import '../../components/notification-badge-button/notification-badge-button.js';
import {ObcNumberInputFieldTextAlign} from '../../components/number-input-field/number-input-field.js';

const meta: Meta<typeof ObcAutomationInputModal> = {
  title: 'Automation/Automation Control',
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
      <obc-toggle-button-group
        slot="action-primary"
        .variant=${ObcToggleButtonOptionVariant.regular}
        value="run"
        .type=${ObcToggleButtonOptionType.iconTextUnder}
      >
        <obc-toggle-button-option
          value="stop"
          .variant=${ObcToggleButtonOptionVariant.regular}
          .type=${ObcToggleButtonOptionType.iconTextUnder}
          >Stop
          <obi-media-stop slot="icon"></obi-media-stop>
        </obc-toggle-button-option>
        <obc-toggle-button-option
          value="run"
          .variant=${ObcToggleButtonOptionVariant.regular}
          .type=${ObcToggleButtonOptionType.iconTextUnder}
          >Run
          <obi-forward slot="icon"></obi-forward>
        </obc-toggle-button-option>
      </obc-toggle-button-group>
      <div slot="action-secondary" class="speed">
        <obc-notification-badge-button icon cornerLeft openRight>
          <obi-chevron-double-left-google></obi-chevron-double-left-google>
        </obc-notification-badge-button>
        <obc-notification-badge-button icon openRight>
          <obi-chevron-left-google></obi-chevron-left-google>
        </obc-notification-badge-button>
        <obc-number-input-field
          value="10"
          .textAlign=${ObcNumberInputFieldTextAlign.Center}
          .squared=${true}
        ></obc-number-input-field>
        <obc-notification-badge-button icon openLeft>
          <obi-chevron-right-google></obi-chevron-right-google>
        </obc-notification-badge-button>
        <obc-notification-badge-button icon cornerRight openLeft>
          <obi-chevron-double-right-google></obi-chevron-double-right-google>
        </obc-notification-badge-button>
        <div class="label">-10</div>
        <div class="label">-1</div>
        <div class="label">Speed</div>
        <div class="label">+1</div>
        <div class="label">+10</div>
      </div>
    </obc-automation-input-modal>
  `,
};
