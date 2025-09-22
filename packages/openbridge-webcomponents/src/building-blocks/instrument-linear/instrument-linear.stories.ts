import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {watchfaceLinear} from './instrument-linear.js';
import './instrument-linear.js';
import {
  AdviceState,
  AdviceType,
} from '../../navigation-instruments/watch/advice.js';
import {html} from 'lit';

const meta: Meta = {
  title: 'Building Blocks/Instrument Linear',
  tags: ['6.0'],
  argTypes: {
    min: {
      control: {
        type: 'range',
        min: -100,
        max: 100,
      },
    },
    max: {
      control: {
        type: 'range',
        min: -100,
        max: 100,
      },
    },
    value: {
      control: {
        type: 'range',
        min: -100,
        max: 100,
      },
    },
    width: {
      control: {
        type: 'range',
        min: 0,
        max: 72,
      },
    },
    scaleWidth: {
      control: {
        type: 'range',
        min: 0,
        max: 72,
      },
    },
    height: {
      control: {
        type: 'range',
        min: 0,
        max: 512,
      },
    },
    mainTickmark: {
      control: {
        type: 'range',
        min: -100,
        max: 100,
      },
    },
    primaryTickbarsInterval: {
      control: {
        type: 'range',
        min: 1,
        max: 100,
      },
    },
    secondaryTickbarsInterval: {
      control: {
        type: 'range',
        min: 1,
        max: 100,
      },
    },
    enhanced: {
      control: {
        type: 'boolean',
      },
    },
    advice: {
      control: {
        type: 'object',
      },
    },
  },
  args: {
    min: -10,
    max: 100,
    width: 72,
    scaleWidth: 24,
    height: 370,
    mainTickmark: 0,
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
    enhanced: false,
    advice: [],
  },
  render: (args) => {
    return html`<svg width="400" height="400" viewBox="-200 -200 400 400">
      ${watchfaceLinear(
        {height: args.height, width: args.width, scaleWidth: args.scaleWidth},
        {
          min: args.min,
          max: args.max,
        },
        {
          value: args.value,
        },
        {container: 'var(--instrument-frame-primary-color)'},
        {
          hideContainer: false,
          off: false,
          enhanced: args.enhanced,
        },
        {
          mainTickbar: args.mainTickmark,
          primaryTickbarsInterval: args.primaryTickbarsInterval,
          secondaryTickbarsInterval: args.secondaryTickbarsInterval,
        },
        args.advice
      )}
    </svg>`;
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Positive: Story = {
  args: {
    min: 0,
    max: 50,
    value: 50,
  },
};

export const Range: Story = {
  args: {
    min: -20,
    max: 20,
    value: 0,
    mainTickmark: 10,
    secondaryTickbarsInterval: 10,
  },
};

export const FullRange: Story = {
  args: {
    min: -100,
    max: 100,
    value: 0,
  },
};

export const AdviceRange: Story = {
  args: {
    min: -50,
    max: 50,
    value: 0,
    advice: [
      {
        min: 80,
        max: 100,
        type: AdviceType.caution,
        state: AdviceState.triggered,
      },
      {
        min: 50,
        max: 70,
        type: AdviceType.caution,
        state: AdviceState.regular,
      },
      {
        min: 20,
        max: 40,
        type: AdviceType.caution,
        state: AdviceState.hinted,
      },
      {
        min: -20,
        max: 20,
        type: AdviceType.advice,
        state: AdviceState.triggered,
      },

      {
        min: -40,
        max: -20,
        type: AdviceType.advice,
        state: AdviceState.regular,
      },
      {
        min: -60,
        max: -40,
        type: AdviceType.advice,
        state: AdviceState.hinted,
      },
    ],
  },
};
