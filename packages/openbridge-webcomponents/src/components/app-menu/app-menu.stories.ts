import type {Meta, StoryObj} from '@storybook/web-components';
import {AppMenu, type MenuItem} from './app-menu';
import './app-menu';

const meta: Meta<typeof AppMenu> = {
  title: 'Application/App menu',
  tags: ['autodocs'],
  component: 'obc-app-menu',
  argTypes: {
    items: {control: {type: 'object'}},
    selectedItemId: {control: {type: 'text'}},
  },
} satisfies Meta<AppMenu>;

export default meta;
type Story = StoryObj<AppMenu>;

export const Primary: Story = {
  args: {
    selectedItemId: 'radar',
    items: [
      {name: 'Radar', icon: '06-ship', id: 'radar'},
      {name: 'Label', icon: '06-ship', id: 'app 1'},
      {name: 'Label', icon: '06-ship', id: 'app 2'},
      {name: 'Label', icon: '06-ship', id: 'app 3'},
      {name: 'Label', icon: '06-ship', id: 'app 4'},
      {name: 'Label', icon: '06-ship', id: 'app 5'},
      {name: 'Label', icon: '06-ship', id: 'app 6'},
      {name: 'Label', icon: '06-ship', id: 'app 7'},
      {name: 'Label', icon: '06-ship', id: 'app 8'},
      {name: 'Label', icon: '06-ship', id: 'app 9'},
      {name: 'Label', icon: '06-ship', id: 'app 10'},
      {name: 'Label', icon: '06-ship', id: 'app 11'},
    ] as Array<MenuItem>,
  },
};
