import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcPoiTarget, Pointer} from './poi-target';
import './poi-target';
import {beta6Decorator} from '../../storybook-util';

const meta: Meta<typeof ObcPoiTarget> = {
  title: 'Navigation Instruments/POI Target',
  tags: ['autodocs'],
  component: 'obc-poi-target',
  args: {
    height: 188,
    value: 'checked',
    pointerType: Pointer.Line,
    relativeDirection: 0,
  },
  argTypes: {
    height: {control: {type: 'range', min: 32, max: 243, step: 1}},
    value: {
      options: ['enabled', 'checked'],
      control: {type: 'select'},
    },
    pointerType: {
      options: [
        Pointer.Line,
        Pointer.ArrowLeft,
        Pointer.ArrowRight,
        Pointer.None,
      ],
      control: {type: 'select'},
    },
    relativeDirection: {
      control: {type: 'range', min: 0, max: 360},
    },
  },
  decorators: [beta6Decorator],
} satisfies Meta<ObcPoiTarget>;

export default meta;
type Story = StoryObj<ObcPoiTarget>;

export const Primary: Story = {
  args: {},
};
