import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcCommandMenu} from './command-menu.js';
import './command-menu.js';
import {html} from 'lit';
import '../../icons/icon-command-no.js';
import '../../icons/icon-joystick.js';

const meta: Meta<typeof ObcCommandMenu> = {
  title: 'Application/Command menu',
  tags: ['6.0'],
  component: 'obc-command-menu',
  args: {},

  render: (args) => {
    return html`
      <obc-command-menu .inCommand=${args.inCommand}>
        <div slot="command-icon">
          ${args.inCommand
            ? html`<obi-joystick></obi-joystick>`
            : html`<obi-command-no></obi-command-no>`}
        </div>
        <div slot="command-status">
          ${args.inCommand ? 'Joystick' : 'NO CMD'}
        </div>
        <div slot="command-description">
          ${args.inCommand ? 'DP' : 'CMD at DP'}
        </div>
        <div slot="command-location">Aft Bridge</div>
        <div slot="toogle-action-to-in-command-label">Take</div>
        <div slot="toogle-action-to-no-command-label">Release</div>
        <div slot="toogle-state-in-command-label">In CMD</div>
        <div slot="toogle-state-no-command-label">DP Aft Bridge</div>
      </obc-command-menu>
    `;
  },
} satisfies Meta<ObcCommandMenu>;

export default meta;
type Story = StoryObj<ObcCommandMenu>;

export const InCommand: Story = {
  args: {
    inCommand: true,
  },
};

export const NoCommand: Story = {
  args: {
    inCommand: false,
  },
};
