import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcAlertIcon} from './alert-icon.js';
import './alert-icon.js';
import {html} from 'lit';
import {AlertType} from '../../types.js';

const meta: Meta<typeof ObcAlertIcon> = {
  title: 'Application Components/Alerts/Alert Icon',
  tags: ['autodocs', '6.0'],
  component: 'obc-alert-icon',
  args: {
    type: AlertType.Alarm,
    acknowledged: false,
    active: true,
    outline: false,
  },
  argTypes: {
    type: {
      control: {type: 'select', options: Object.values(AlertType)},
    },
    acknowledged: {
      control: {type: 'boolean'},
    },
    active: {
      control: {type: 'boolean'},
    },
  },
  render: (args) =>
    html` <div style="width:64px;height:64px">
      <obc-alert-icon
        .type=${args.type}
        .acknowledged=${args.acknowledged}
        .active=${args.active}
      ></obc-alert-icon>
    </div>`,
} satisfies Meta<ObcAlertIcon>;

export default meta;
type Story = StoryObj<ObcAlertIcon>;

export const AlarmUnacknowledged: Story = {};

export const AlarmRectified: Story = {
  args: {
    type: AlertType.Alarm,
    acknowledged: true,
    active: false,
  },
};

export const AlarmAcknowledged: Story = {
  args: {
    type: AlertType.Alarm,
    acknowledged: true,
    active: true,
  },
};

export const WarningUnacknowledged: Story = {
  args: {
    type: AlertType.Warning,
    acknowledged: false,
    active: true,
  },
};

export const WarningRectified: Story = {
  args: {
    type: AlertType.Warning,
    acknowledged: true,
    active: false,
  },
};

export const WarningAcknowledged: Story = {
  args: {
    type: AlertType.Warning,
    acknowledged: true,
    active: true,
  },
};

export const Caution: Story = {
  args: {
    type: AlertType.Caution,
    acknowledged: false,
    active: true,
  },
};

export const LevelCritical: Story = {
  args: {
    type: AlertType.LevelCritical,
    acknowledged: false,
    active: true,
  },
};

export const LevelHigh: Story = {
  args: {
    type: AlertType.LevelHigh,
    acknowledged: false,
    active: true,
  },
};

export const LevelMedium: Story = {
  args: {
    type: AlertType.LevelMedium,
    acknowledged: false,
    active: true,
  },
};

export const LevelLow: Story = {
  args: {
    type: AlertType.LevelLow,
    acknowledged: false,
    active: true,
  },
};

export const LevelDiagnostic: Story = {
  args: {
    type: AlertType.LevelDiagnostic,
    acknowledged: false,
    active: true,
  },
};

export const AlarmRectifiedNoAck: Story = {
  args: {
    type: AlertType.Alarm,
    acknowledged: false,
    active: false,
  },
};

export const ApiMatrix: Story = {
  render: (args) =>
    html` <div
      style="display:grid;grid-template-columns: auto repeat(8,32px);gap:16px"
    >
      <div></div>
      ${Object.values(AlertType).map(
        (type) =>
          html`<div
            style="display:flex;flex-direction:column;align-items:center"
          >
            ${type}
          </div>`
      )}
      ${renderRow('Active', {
        acknowledged: false,
        active: true,
        silenced: false,
      })}
      ${renderRow('Acknowledged', {
        acknowledged: true,
        active: true,
        silenced: false,
      })}
      ${renderRow('Silenced', {
        acknowledged: false,
        active: true,
        silenced: true,
      })}
      ${renderRow('Rectified', {
        acknowledged: true,
        active: false,
        silenced: false,
      })}
      ${renderRow('Rectified unacknowledged', {
        acknowledged: false,
        active: false,
        silenced: false,
      })}
    </div>`,
};

function renderRow(
  label: string,
  options: {acknowledged: boolean; active: boolean; silenced: boolean}
) {
  return html`
    <div style="display:flex;flex-direction:column;align-items:center">${label}</div>
    ${Object.values(AlertType).map(
      (type) => html`
        <obc-alert-icon
          .type=${type}
          .acknowledged=${options.acknowledged}
          .active=${options.active}
          .silenced=${options.silenced}
        ></obc-alert-icon>
      `
    )}
  </div>`;
}
