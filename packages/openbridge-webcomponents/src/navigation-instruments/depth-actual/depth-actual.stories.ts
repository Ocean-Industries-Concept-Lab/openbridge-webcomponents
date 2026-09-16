import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcDepthActual} from './depth-actual.js';
import './depth-actual.js';
import {widthDecorator} from '../../storybook-util.js';
import {VesselImage} from '../watch/watch.js';
import {foreVessels} from '../watch/vessels/storybook-helper.js';
import {AdviceType} from '../watch/advice.js';
import {Priority} from '../types.js';

const meta: Meta<typeof ObcDepthActual> = {
  title: 'Instruments/Depth Actual',
  tags: ['autodocs', '6.0'],
  component: 'obc-depth-actual',
  args: {
    width: 400,
    depth: 75,
    draft: 5,
    vesselScale: 1,
    maxDepth: 100,
    autoRange: false,
    vesselImage: VesselImage.psvFore,
    priority: Priority.regular,
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    depth: {control: {type: 'range', min: 0, max: 1000, step: 0.25}},
    draft: {control: {type: 'range', min: 0, max: 20, step: 0.25}},
    vesselScale: {control: {type: 'range', min: 0.5, max: 2, step: 0.1}},
    maxDepth: {control: {type: 'select'}, options: [25, 100, 1000, 50]},
    autoRange: {control: 'boolean'},
    primaryTickmarkInterval: {control: {type: 'number'}},
    secondaryTickmarkInterval: {control: {type: 'number'}},
    vesselImage: {
      control: 'select',
      options: foreVessels,
    },
    priority: {
      control: 'select',
      options: Object.values(Priority),
    },
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcDepthActual>;

export default meta;
type Story = StoryObj<ObcDepthActual>;

export const Regular: Story = {
  name: 'Regular (0 to 100)',
  args: {},
};

export const Enhanced: Story = {
  name: 'Regular Enhanced',
  args: {
    priority: Priority.enhanced,
  },
};

export const Shallow: Story = {
  name: 'Shallow (0 to 25)',
  args: {maxDepth: 25, depth: 18.75, draft: 6.25},
};

export const ShallowEnhanced: Story = {
  args: {maxDepth: 25, depth: 18.75, draft: 6.25, priority: Priority.enhanced},
};

export const Deep: Story = {
  name: 'Deep (0 to 1000)',
  args: {maxDepth: 1000, depth: 1000, draft: 10},
};

export const DeepEnhanced: Story = {
  args: {maxDepth: 1000, depth: 850, draft: 10, priority: Priority.enhanced},
};

export const Advice: Story = {
  args: {
    advice: [{min: 0, max: 10, type: AdviceType.caution, hinted: true}],
  },
};

export const CustomRange: Story = {
  name: 'Custom Range (0 to 50, off the ladder)',
  parameters: {
    docs: {
      description: {
        story:
          'A `maxDepth` that is not a rung takes the layout of the nearest rung above it and a 1-2-5 tick ladder; the tick intervals can still be set explicitly.',
      },
    },
  },
  args: {maxDepth: 50, depth: 15, draft: 2},
};

export const AutoRangeLive: Story = {
  name: 'Auto Range (Live)',
  tags: ['skip-test'],
  parameters: {
    docs: {
      description: {
        story:
          'The depth sweeps from 5 m to 400 m and back; `autoRange` climbs the ladder as soon as the depth exceeds a rung and steps down one rung at a time once it is well inside the smaller one.',
      },
    },
  },
  args: {autoRange: true, maxDepth: undefined, draft: 4},
  render: (args) => {
    const el = document.createElement('obc-depth-actual');
    el.autoRange = true;
    el.draft = args.draft;
    el.priority = args.priority;
    let t = 0;
    const tick = () => {
      t += 1;
      el.depth = 5 + 395 * (0.5 - 0.5 * Math.cos((t / 60) * Math.PI));
    };
    tick();
    const timer = setInterval(tick, 500);
    new MutationObserver(() => {
      if (!el.isConnected) clearInterval(timer);
    }).observe(document.body, {childList: true, subtree: true});
    return el;
  },
};
