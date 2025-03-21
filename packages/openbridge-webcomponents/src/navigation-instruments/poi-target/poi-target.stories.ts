import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcPoiTarget, Pointer, TargetValue} from './poi-target';
import './poi-target';

const meta: Meta<typeof ObcPoiTarget> = {
  title: 'Navigation Instruments/POI Target',
  tags: ['autodocs'],
  component: 'obc-poi-target',
  args: {
    height: 192,
    value: TargetValue.checked,
    pointerType: Pointer.Line,
    relativeDirection: 0,
  },
  argTypes: {
    height: {control: {type: 'range', min: 32, max: 243, step: 1}},
    value: {
      options: [TargetValue.enabled, TargetValue.checked],
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
} satisfies Meta<ObcPoiTarget>;

export default meta;
type Story = StoryObj<ObcPoiTarget>;

export const Primary: Story = {
  args: {},
};
