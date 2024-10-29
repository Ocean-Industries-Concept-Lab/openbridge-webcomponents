import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcPoiLine} from './poi-line';
import './poi-line';
import {widthDecorator} from '../../storybook-util';

const meta: Meta<typeof ObcPoiLine> = {
  title: 'Building blocks/POI Line',
  tags: ['autodocs'],
  component: 'obc-poi-line',
  args: {
    width: 512,
    height: 100,
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    height: {control: {type: 'range', min: 32, max: 196, step: 1}},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcPoiLine>;

export default meta;
type Story = StoryObj<ObcPoiLine>;

export const Primary: Story = {
  args: {},
};
