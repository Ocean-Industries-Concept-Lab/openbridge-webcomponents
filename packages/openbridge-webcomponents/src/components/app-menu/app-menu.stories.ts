import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcAppMenu} from './app-menu.js';
import './app-menu.js';
import '../app-button/app-button.js';
import {html} from 'lit';
import '../../icons/icon-ship.js';

const meta: Meta<typeof ObcAppMenu> = {
  title: 'Application/App menu',
  tags: ['autodocs'],
  component: 'obc-app-menu',
} satisfies Meta<ObcAppMenu>;

export default meta;
type Story = StoryObj<ObcAppMenu>;

export const Primary: Story = {
  render: () => {
    return html`<obc-app-menu>
      <obc-app-button label="Radar" checked
        ><obi-ship slot="icon"></obi-ship
      ></obc-app-button>
      <obc-app-button label="Label"
        ><obi-ship slot="icon"></obi-ship
      ></obc-app-button>
      <obc-app-button label="Label"
        ><obi-ship slot="icon"></obi-ship
      ></obc-app-button>
      <obc-app-button label="Label"
        ><obi-ship slot="icon"></obi-ship
      ></obc-app-button>
      <obc-app-button label="Label"
        ><obi-ship slot="icon"></obi-ship
      ></obc-app-button>
      <obc-app-button label="Label"
        ><obi-ship slot="icon"></obi-ship
      ></obc-app-button>
      <obc-app-button label="Label"
        ><obi-ship slot="icon"></obi-ship
      ></obc-app-button>
      <obc-app-button label="Label"
        ><obi-ship slot="icon"></obi-ship
      ></obc-app-button>
      <obc-app-button label="Label"
        ><obi-ship slot="icon"></obi-ship
      ></obc-app-button>
      <obc-app-button label="Label"
        ><obi-ship slot="icon"></obi-ship
      ></obc-app-button>
      <obc-app-button label="Label"
        ><obi-ship slot="icon"></obi-ship
      ></obc-app-button>
      <obc-app-button label="Label"
        ><obi-ship slot="icon"></obi-ship
      ></obc-app-button>
    </obc-app-menu>`;
  },
};
