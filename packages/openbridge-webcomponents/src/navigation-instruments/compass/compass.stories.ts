import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcCompass} from './compass';
import './compass';
import {beta6Decorator, widthDecorator} from '../../storybook-util';

const meta: Meta<typeof ObcCompass> = {
  title: 'Navigation Instruments/Compass',
  tags: ['autodocs'],
  component: 'obc-compass',
  args: {
    width: 512,
    heading: 311,
    COG: 0,
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    heading: {control: {type: 'range', min: 0, max: 360, step: 1}},
    COG: {control: {type: 'range', min: 0, max: 360, step: 1}},
  },
  decorators: [widthDecorator, beta6Decorator],
} satisfies Meta<ObcCompass>;

export default meta;
type Story = StoryObj<ObcCompass>;

export const Primary: Story = {
  args: {},
};
