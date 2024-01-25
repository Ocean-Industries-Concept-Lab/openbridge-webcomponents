import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcThruster} from './thruster';
import './thruster';

const meta: Meta<typeof ObcThruster> = {
  title: 'Building blocks/Thruster',
  tags: ['autodocs'],
  component: 'obc-thruster',
  args: {},
} satisfies Meta<ObcThruster>;

export default meta;
type Story = StoryObj<ObcThruster>;

export const Primary: Story = {
  args: {
    thrust: 50,
    setpoint: 30,
  },
};
