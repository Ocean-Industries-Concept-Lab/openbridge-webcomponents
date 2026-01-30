import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPoiTarget, Pointer, TargetValue} from './poi-target.js';
import './poi-target.js';
import {crossDecorator} from '../../storybook-util.js';
import {html} from 'lit';
const meta: Meta<typeof ObcPoiTarget> = {
  title: 'AR/POI Target',
  tags: ['autodocs'],
  component: 'obc-poi-target',
  args: {
    height: 192,
    value: TargetValue.checked,
    pointerType: Pointer.Line,
    relativeDirection: 0,
    offset: 0,
    values: [],
  },
  decorators: [crossDecorator],
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
    offset: {
      control: {type: 'range', min: -100, max: 100, step: 1},
    },
    values: {
      control: {type: 'object'},
    },
  },
  render: (args) => {
    return html`
      <obc-poi-target
        style="top: calc( 50% - ${args.height}px );"
        .height=${args.height}
        .value=${args.value}
        .pointerType=${args.pointerType}
        .relativeDirection=${args.relativeDirection}
        .offset=${args.offset}
        .values=${args.values}
      ></obc-poi-target>
    `;
  },
} satisfies Meta<ObcPoiTarget>;

export default meta;
type Story = StoryObj<ObcPoiTarget>;

export const Normal: Story = {
  args: {
    value: TargetValue.enabled,
  },
};

export const Enhanced: Story = {
  args: {
    value: TargetValue.checked,
  },
};

export const WithValues: Story = {
  args: {
    value: TargetValue.enabled,
    values: [
      {value: '12.5', label: 'CPA', unit: 'NM'},
      {value: '08:32', label: 'TCPA', unit: ''},
    ],
  },
};
