import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcAppMenu} from './app-menu';
import './app-menu';
import '../app-button/app-button';
import {html} from 'lit';
import '../../icons/icon-06-ship';

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
        ><obi-06-ship slot="icon"></obi-06-ship
      ></obc-app-button>
      <obc-app-button label="Label"
        ><obi-06-ship slot="icon"></obi-06-ship
      ></obc-app-button>
      <obc-app-button label="Label"
        ><obi-06-ship slot="icon"></obi-06-ship
      ></obc-app-button>
      <obc-app-button label="Label"
        ><obi-06-ship slot="icon"></obi-06-ship
      ></obc-app-button>
      <obc-app-button label="Label"
        ><obi-06-ship slot="icon"></obi-06-ship
      ></obc-app-button>
      <obc-app-button label="Label"
        ><obi-06-ship slot="icon"></obi-06-ship
      ></obc-app-button>
      <obc-app-button label="Label"
        ><obi-06-ship slot="icon"></obi-06-ship
      ></obc-app-button>
      <obc-app-button label="Label"
        ><obi-06-ship slot="icon"></obi-06-ship
      ></obc-app-button>
      <obc-app-button label="Label"
        ><obi-06-ship slot="icon"></obi-06-ship
      ></obc-app-button>
      <obc-app-button label="Label"
        ><obi-06-ship slot="icon"></obi-06-ship
      ></obc-app-button>
      <obc-app-button label="Label"
        ><obi-06-ship slot="icon"></obi-06-ship
      ></obc-app-button>
      <obc-app-button label="Label"
        ><obi-06-ship slot="icon"></obi-06-ship
      ></obc-app-button>
    </obc-app-menu>`;
  },
};
