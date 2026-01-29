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

export const AnimatedOffsetBottom: Story = {
  args: {
    height: 192,
    value: TargetValue.checked,
    pointerType: Pointer.Line,
  },
  render: (args) => {
    let offset = 0;
    let direction = 1;

    const animate = () => {
      const target = document.querySelector('#animated-poi-target') as ObcPoiTarget;
      if (!target) return;

      offset += direction * 0.3;
      if (offset > 50) direction = -1;
      if (offset < -50) direction = 1;

      target.offset = offset;
      requestAnimationFrame(animate);
    };

    setTimeout(() => requestAnimationFrame(animate), 100);

    return html`
      <obc-poi-target
        id="animated-poi-target"
        style="top: calc(50% - ${args.height}px);"
        .height=${args.height}
        .value=${args.value}
        .pointerType=${args.pointerType}
      ></obc-poi-target>
    `;
  },
};

export const AnimatedOffsetTop: Story = {
  args: {
    height: 192,
    value: TargetValue.checked,
    pointerType: Pointer.Line,
  },
  render: (args) => {
    let buttonOffset = 0;
    let direction = 1;

    const animate = () => {
      const target = document.querySelector('#animated-poi-target-top') as ObcPoiTarget;
      if (!target) return;

      buttonOffset += direction * 0.3;
      if (buttonOffset > 50) direction = -1;
      if (buttonOffset < -50) direction = 1;

      target.style.transform = `translateX(${buttonOffset}px)`;
      target.offset = -buttonOffset;

      requestAnimationFrame(animate);
    };

    setTimeout(() => requestAnimationFrame(animate), 100);

    return html`
      <obc-poi-target
        id="animated-poi-target-top"
        style="top: calc(50% - ${args.height}px);"
        .height=${args.height}
        .value=${args.value}
        .pointerType=${args.pointerType}
      ></obc-poi-target>
    `;
  },
};
