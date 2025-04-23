import type {Meta, StoryObj} from '@storybook/web-components';
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
  },
  render: (args) => {
    return html`
      <div
        class="poi"
        style="background: red; width: 2px; height: 2px; transform: translate(-50%, -50%);"
      ></div>
      <obc-poi-target
        style="top: calc( 50% - ${args.height}px );"
        .height=${args.height}
        .value=${args.value}
        .pointerType=${args.pointerType}
        .relativeDirection=${args.relativeDirection}
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
