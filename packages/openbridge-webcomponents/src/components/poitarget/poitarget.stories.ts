import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcPOITarget} from './poitarget';
import './poitarget';
import {beta6Decorator, widthDecorator} from '../../storybook-util';
import {
  POIStyle,
  POIState,
} from '../../navigation-instruments/poi-graphic-line/poi-config';

const meta: Meta<typeof ObcPOITarget> = {
  title: 'Application/POI Target',
  tags: ['autodocs'],
  component: 'obc-poitarget',
  argTypes: {
    POIStyle: {
      options: Object.values(POIStyle),
      control: {
        type: 'radio',
      },
    },
    POIState: {
      options: Object.values(POIState),
      control: {
        type: 'radio',
      },
    },
    height: {control: {type: 'range', min: 32, max: 240, step: 2}},
  },
  args: {
    height: 240,
    POIStyle: POIStyle.enhanced,
    POIState: POIState.solid,
  },
  // decorators: [widthDecorator, beta6Decorator],
} satisfies Meta<ObcPOITarget>;

export default meta;
type Story = StoryObj<ObcPOITarget>;

export const Primary: Story = {
  args: {},
};
