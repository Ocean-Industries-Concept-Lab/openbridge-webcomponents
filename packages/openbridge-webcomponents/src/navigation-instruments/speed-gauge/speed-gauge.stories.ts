import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcSpeedGauge, ObcSpeedGaugeNeedleType} from './speed-gauge.js';
import './speed-gauge.js';
import {html} from 'lit';
import {
  playgroundColumn,
  resizableStoryBox,
  storyHint,
  widthDecorator,
} from '../../storybook-util.js';
import {AdviceType} from '../watch/advice.js';
import {TickmarkStyle} from '../watch/tickmark.js';
import {Priority} from '../types.js';

const meta: Meta<typeof ObcSpeedGauge> = {
  title: 'Instruments/Speed Gauge',
  tags: ['autodocs', '6.0'],
  component: 'obc-speed-gauge',
  args: {
    minSpeed: -20,
    maxSpeed: 100,
    width: 512,
    speed: 50,
    priority: Priority.enhanced,
    touching: false,
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    speed: {control: {type: 'range', min: -20, max: 100, step: 1}},
    minSpeed: {control: {type: 'range', min: -20, max: 0, step: 1}},
    maxSpeed: {control: {type: 'range', min: 0, max: 100, step: 1}},
    setpoint: {control: {type: 'range', min: -20, max: 100, step: 1}},
    touching: {control: 'boolean'},
    priority: {control: 'select', options: Object.values(Priority)},
    showLabels: {control: 'boolean'},
    tickmarksInside: {control: 'boolean'},
    tickmarkStyle: {
      control: 'select',
      options: Object.values(TickmarkStyle),
    },
    hasReadout: {control: 'boolean'},
    faceDiameter: {
      control: {type: 'range', min: 100, max: 600, step: 10},
      description:
        'Pins the outer-ring diameter in px (fixed intrinsic size, equal circumference across instruments). Clear to return to fill-the-container sizing.',
    },
    label: {control: 'text'},
    unit: {control: 'text'},
    fractionDigits: {control: 'number'},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcSpeedGauge>;

export default meta;
type Story = StoryObj<ObcSpeedGauge>;

export const Enhanced: Story = {
  args: {priority: Priority.enhanced, setpoint: 40},
};
export const Regular: Story = {
  args: {priority: Priority.regular},
};

export const Labels: Story = {
  args: {showLabels: true},
};

export const NeedleBar: Story = {
  args: {needleType: ObcSpeedGaugeNeedleType.bar},
};

export const Advices: Story = {
  args: {
    speedAdvices: [
      {minSpeed: 5, maxSpeed: 10, type: AdviceType.advice, hinted: true},
      {minSpeed: 20, maxSpeed: 100, type: AdviceType.caution, hinted: true},
    ],
    speed: 25,
  },
};

export const Readout: Story = {
  args: {
    hasReadout: true,
  },
};

export const LabelRoomHighSpeed: Story = {
  name: 'Label Room — 4-Digit Scale in A Short Cell (#1021)',
  args: {
    minSpeed: 0,
    maxSpeed: 3600,
    speed: 2400,
    tickmarkInterval: 900,
    showLabels: true,
    hasReadout: true,
    width: 600,
    height: 220,
  } as never,
};

type SizingPlaygroundArgs = Partial<ObcSpeedGauge> & {
  lockFaceDiameter?: boolean;
};

/**
 * Interactive sizing playground: drag the dashed box's bottom-right corner to
 * resize it. The first gauge is pinned to a fixed intrinsic size by the
 * `faceDiameter` control, while the second adapts to the remaining flex
 * space, reserving room for its 4-digit labels adaptively (issue #1021).
 * Enable `lockFaceDiameter` to pin both to the same circumference regardless
 * of their label widths. Related: *Sizing Playground* stories under Building
 * Blocks/Watch, Building Blocks/Instrument Radial and Instruments/Gauge
 * Radial.
 */
export const SizingPlayground: StoryObj<SizingPlaygroundArgs> = {
  name: 'Sizing Playground — FaceDiameter + Resizable (Manual)',
  tags: ['skip-test'],
  parameters: {widthDecorator: false},
  args: {
    faceDiameter: 220,
    lockFaceDiameter: false,
  },
  argTypes: {
    lockFaceDiameter: {
      control: 'boolean',
      description:
        'Apply faceDiameter to every instance (equal circumference) instead of only the first.',
    },
  },
  render: (args) => {
    const instances = [
      {label: '2-digit scale', max: 40, interval: 10},
      {label: '4-digit scale', max: 3600, interval: 900},
    ];
    const fd = (index: number) =>
      index === 0 || args.lockFaceDiameter ? args.faceDiameter : undefined;
    const caption = (index: number, label: string) =>
      fd(index) !== undefined
        ? `${label} — pinned ${fd(index)}px`
        : `${label} — adaptive (flex)`;
    return html`
      ${storyHint(
        'Drag the bottom-right corner of the dashed box to resize it. The first gauge is pinned by the faceDiameter control; the second adapts to the remaining flex space. Enable lockFaceDiameter to pin both to the same circumference.'
      )}
      ${resizableStoryBox(
        html`
          ${instances.map((g, index) =>
            playgroundColumn(
              caption(index, g.label),
              html`
                <obc-speed-gauge
                  .speed=${g.max * 0.6}
                  .maxSpeed=${g.max}
                  .tickmarkInterval=${g.interval}
                  .showLabels=${true}
                  .faceDiameter=${fd(index)}
                ></obc-speed-gauge>
              `,
              {pinned: fd(index) !== undefined}
            )
          )}
        `,
        {width: 680, height: 340}
      )}
    `;
  },
};
