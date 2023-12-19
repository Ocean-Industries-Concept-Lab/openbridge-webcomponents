import type {Meta, StoryObj} from '@storybook/web-components';
import {AppMenu} from './app-menu';
import './app-menu';
import '../app-button/app-button';

const meta: Meta<typeof AppMenu> = {
  title: 'Application/App menu',
  tags: ['autodocs'],
  component: 'obc-app-menu',
} satisfies Meta<AppMenu>;

export default meta;
type Story = StoryObj<AppMenu>;

export const Primary: Story = {
  render: () => {
    return `<obc-app-menu>
    <obc-app-button icon="06-ship" label="Radar" checked></obc-app-button>
    <obc-app-button icon="06-ship" label="Label"></obc-app-button>
    <obc-app-button icon="06-ship" label="Label"></obc-app-button>
    <obc-app-button icon="06-ship" label="Label"></obc-app-button>
    <obc-app-button icon="06-ship" label="Label"></obc-app-button>
    <obc-app-button icon="06-ship" label="Label"></obc-app-button>
    <obc-app-button icon="06-ship" label="Label"></obc-app-button>
    <obc-app-button icon="06-ship" label="Label"></obc-app-button>
    <obc-app-button icon="06-ship" label="Label"></obc-app-button>
    <obc-app-button icon="06-ship" label="Label"></obc-app-button>
    <obc-app-button icon="06-ship" label="Label"></obc-app-button>
    <obc-app-button icon="06-ship" label="Label"></obc-app-button>
    </obc-app-menu>`;
  },
};
