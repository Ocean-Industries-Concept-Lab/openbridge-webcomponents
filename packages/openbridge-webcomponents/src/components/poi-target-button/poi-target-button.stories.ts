import type {Meta, StoryObj} from '@storybook/web-components';

import {ObcPoiTargetButton} from './poi-target-button';
import './poi-target-button';
import {Pointer} from '../../navigation-instruments/poi-target/poi-target';

const meta: Meta<typeof ObcPoiTargetButton> = {
  title: 'Button/POI Target Button',
  tags: ['autodocs'],
  component: 'obc-poi-target-button',
  args: {
    value: 'checked',
    relativeDirection: 0,
    pointer: Pointer.None,
  },
  argTypes: {
    value: {
      options: ['unchecked', 'checked'],
      control: {type: 'select'},
    },
    pointer: {
      options: [Pointer.None, Pointer.ArrowLeft, Pointer.ArrowRight],
      control: {type: 'select'},
    },
    relativeDirection: {
      control: {type: 'range', min: 0, max: 360},
    },
  },
} satisfies Meta<ObcPoiTargetButton>;

export default meta;
type Story = StoryObj<ObcPoiTargetButton>;

export const Primary: Story = {
  args: {},
};
