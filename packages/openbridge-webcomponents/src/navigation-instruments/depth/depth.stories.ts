import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './depth.js';
import {DepthType, type DepthDataItem} from './depth.js';
import type {ChartLineDataItem} from '../../building-blocks/chart-line/chart-line-base.js';
import {AdviceType} from '../watch/advice.js';
import {VesselImage} from '../watch/watch.js';
import {InstrumentState, Priority} from '../types.js';

/** Seabed profile along the track; x is minutes ago or metres from the vessel. */
const seabed = (x: number) =>
  62 + Math.sin(x / 19) * 7 + Math.cos(x / 5.5) * 3 + Math.sin(x / 2.3) * 1.2;

const T0 = Date.UTC(2026, 8, 16, 10, 0, 0);

/** Ten minutes of history, one sample every 20 s, with the echo band below. */
const HISTORY: DepthDataItem[] = Array.from({length: 31}, (_, i) => {
  const minutesAgo = 10 - i / 3;
  const value = seabed(-minutesAgo * 20);
  return {
    x: T0 - minutesAgo * 60_000,
    value: Math.round(value * 10) / 10,
    echoValue:
      Math.round((value + 3 + Math.abs(Math.sin(i / 1.7)) * 4) * 10) / 10,
  };
});

const alongTrack = (
  from: number,
  to: number,
  f: (x: number) => number,
  step = 5
): ChartLineDataItem[] =>
  Array.from({length: Math.round((to - from) / step) + 1}, (_, i) => {
    const x = from + i * step;
    return {x, value: Math.round(f(x) * 10) / 10};
  });

const TRACK_HISTORY: DepthDataItem[] = alongTrack(-200, 0, seabed).map(
  (d, i) => ({
    ...d,
    echoValue:
      Math.round((d.value + 3 + Math.abs(Math.sin(i / 1.7)) * 4) * 10) / 10,
  })
);
const PREDICTION = alongTrack(0, 200, (x) => seabed(x) - 4);
/** Scanned seabed ahead; the sonar's slant range cuts the water column off. */
const SCAN = alongTrack(0, 200, (x) => seabed(x) + Math.sin(x / 9) * 3);

const meta: Meta = {
  title: 'Instruments/Depth',
  tags: ['autodocs', '6.1', 'experimental'],
  component: 'obc-depth',
  argTypes: {
    type: {control: {type: 'radio'}, options: Object.values(DepthType)},
    value: {control: {type: 'range', min: 0, max: 100, step: 0.1}},
    now: {control: {type: 'number'}},
    maxDepth: {control: {type: 'select'}, options: [undefined, 25, 100, 1000]},
    autoRange: {control: 'boolean'},
    hasScale: {control: 'boolean'},
    showVessel: {control: 'boolean'},
    hasValueLine: {control: 'boolean'},
    hasAdvice: {control: 'boolean'},
    scanRange: {control: {type: 'number'}},
    predictedDepth: {control: {type: 'number'}},
    vesselImage: {
      control: 'select',
      options: [
        VesselImage.psvSide,
        VesselImage.cargoSide,
        VesselImage.genericSide,
      ],
    },
    priority: {control: 'select', options: Object.values(Priority)},
    state: {control: 'select', options: Object.values(InstrumentState)},
  },
  args: {
    type: DepthType.regular,
    value: undefined,
    now: 0,
    maxDepth: 100,
    autoRange: false,
    hasScale: false,
    showVessel: false,
    hasValueLine: false,
    hasAdvice: false,
    scanRange: 110,
    predictedDepth: 58,
    vesselImage: VesselImage.psvSide,
    priority: Priority.enhanced,
    state: InstrumentState.active,
  },
  render: (args) => html`
    <div style="width: 384px; height: 384px">
      <obc-depth
        .type=${args.type}
        .data=${args.type === DepthType.regular ? HISTORY : TRACK_HISTORY}
        .prediction=${PREDICTION}
        .scan=${SCAN}
        .scanRange=${args.scanRange}
        .predictedDepth=${args.predictedDepth}
        .value=${args.value}
        .now=${args.now}
        .maxDepth=${args.maxDepth}
        .autoRange=${args.autoRange}
        .hasScale=${args.hasScale}
        .showVessel=${args.showVessel}
        .hasValueLine=${args.hasValueLine}
        .hasAdvice=${args.hasAdvice}
        .advice=${[{min: 0, max: 15, type: AdviceType.caution, hinted: false}]}
        .vesselImage=${args.vesselImage}
        .priority=${args.priority}
        .state=${args.state}
      ></obc-depth>
    </div>
  `,
  play: async () => {
    await new Promise((resolve) => setTimeout(resolve, 400));
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

// Sub-pixel anti-aliasing of the history line differs between runners
// (#1222); depth.spec.ts pins what these two stories show.
export const Default: Story = {
  name: 'Regular (History, Dot in the Band)',
  tags: ['!snapshot'],
};

export const RegularCondensed: Story = {
  tags: ['!snapshot'],
  args: {hasScale: true},
};

export const RegularVesselScale: Story = {
  args: {hasScale: true, showVessel: true},
};

export const Prediction: Story = {
  name: 'Prediction (Now-line, Dashed Prediction, Range Labels)',
  args: {type: DepthType.prediction},
};

export const PredictionCondensed: Story = {
  args: {type: DepthType.prediction, hasScale: true},
};

export const PredictionVesselScale: Story = {
  args: {type: DepthType.prediction, hasScale: true, showVessel: true},
};

export const Scanned: Story = {
  name: 'Scanned (Past Track, Scan Range, Predicted Depth)',
  args: {type: DepthType.scanned},
};

export const ScannedCondensed: Story = {
  args: {type: DepthType.scanned, hasScale: true},
};

export const ScannedVesselScale: Story = {
  args: {type: DepthType.scanned, hasScale: true, showVessel: true},
};

export const ActualLine: Story = {
  name: 'Actual Line (Current Depth Across the Chart)',
  args: {type: DepthType.prediction, hasScale: true, hasValueLine: true},
};

export const Advice: Story = {
  name: 'Advice (Caution Zone on the Scale)',
  args: {hasScale: true, hasAdvice: true},
};

export const RegularPriority: Story = {
  name: 'Regular Priority (Grey Palette)',
  args: {hasScale: true, priority: Priority.regular},
};

export const ShallowRange: Story = {
  name: 'Shallow Range (0 to 25 m)',
  args: {hasScale: true, maxDepth: 25},
  render: (args) => html`
    <div style="width: 384px; height: 384px">
      <obc-depth
        .data=${HISTORY.map((d) => ({
          ...d,
          value: d.value / 4,
          echoValue: (d.echoValue ?? d.value) / 4,
        }))}
        .maxDepth=${args.maxDepth}
        .hasScale=${args.hasScale}
        .priority=${args.priority}
      ></obc-depth>
    </div>
  `,
};

export const AutoRangeLive: Story = {
  name: 'Auto Range (Live)',
  tags: ['skip-test'],
  parameters: {
    docs: {
      description: {
        story:
          'The bottom drops from 20 m to 400 m and back over a minute; `autoRange` climbs the ladder as soon as the data exceeds a rung and steps down one rung at a time once the data is well inside it.',
      },
    },
  },
  args: {hasScale: true, autoRange: true, maxDepth: undefined},
  render: (args) => {
    const el = document.createElement('obc-depth');
    el.type = DepthType.regular;
    el.hasScale = args.hasScale;
    el.autoRange = args.autoRange;
    el.priority = args.priority;
    let t = 0;
    const tick = () => {
      t += 1;
      const depth = 20 + 380 * (0.5 - 0.5 * Math.cos((t / 90) * Math.PI));
      const now = Date.now();
      el.data = Array.from({length: 31}, (_, i) => {
        const back = 30 - i;
        const d = depth * (1 - back / 60) + Math.sin(i) * depth * 0.03;
        return {x: now - back * 20_000, value: d, echoValue: d * 1.05};
      });
    };
    tick();
    const timer = setInterval(tick, 1000);
    const observer = new MutationObserver(() => {
      if (!el.isConnected) {
        clearInterval(timer);
        observer.disconnect();
      }
    });
    observer.observe(document.body, {childList: true, subtree: true});
    const box = document.createElement('div');
    box.style.cssText = 'width: 384px; height: 384px';
    box.appendChild(el);
    return box;
  },
};
