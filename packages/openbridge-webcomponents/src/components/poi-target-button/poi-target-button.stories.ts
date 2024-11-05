import type {Meta, StoryObj} from '@storybook/web-components';

import {ObcPoiTargetButton} from './poi-target-button';
import './poi-target-button';

const meta: Meta<typeof ObcPoiTargetButton> = {
  title: 'Button/POI Target Button',
  tags: ['autodocs'],
  component: 'obc-poi-target-button',
  args: {
    variant: 'normal',
    value: 'checked',
    relativeDirection: 0,
  },
  argTypes: {
    variant: {
      options: ['normal', 'flat', 'raised'],
      control: {type: 'select'},
    },
    value: {
      options: ['enabled', 'checked'],
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
