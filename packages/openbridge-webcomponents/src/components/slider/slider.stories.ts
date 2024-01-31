import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcSlider} from './slider';
import './slider';
import {iconIds, iconIdToIconHtml} from '../../storybook-util';
import {ifDefined} from 'lit/directives/if-defined.js';
import {html} from 'lit';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcSlider> = {
  title: 'Input/Slider',
  tags: ['autodocs'],
  component: 'obc-slider',
  argTypes: {
    value: {
      control: {type: 'number', min: 0, max: 100, step: 1},
    },
    step: {
      control: {type: 'number', min: 1, max: 100, step: 1},
    },

    iconLeft: {
      options: iconIds,
      control: {type: 'select'},
    },
    iconRight: {
      options: iconIds,
      control: {type: 'select'},
    },
  },
  render: (args) => {
    return html` <obc-slider
      value=${args.value}
      step=${ifDefined(args.step)}
      min="0"
      max="100"
    >
      ${args.iconLeft
        ? iconIdToIconHtml(args.iconLeft as unknown as string, {
            slot: 'icon-left',
          })
        : ''}
      ${args.iconRight
        ? iconIdToIconHtml(args.iconRight as unknown as string, {
            slot: 'icon-right',
          })
        : ''}
    </obc-slider>`;
  },
} satisfies Meta<ObcSlider>;

export default meta;
type Story = StoryObj<ObcSlider>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {
    value: 20,
    iconLeft: '04-brilliance-low',
    iconRight: '04-brilliance-high',
  },
};
