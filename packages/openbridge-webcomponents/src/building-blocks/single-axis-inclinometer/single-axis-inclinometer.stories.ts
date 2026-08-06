import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
// The base class is conceptually abstract and never registered as a custom
// element. Import the concrete subclasses for demonstration.
import {ObcPitch} from '../../navigation-instruments/pitch/pitch.js';
import '../../navigation-instruments/pitch/pitch.js';
import '../../navigation-instruments/roll/roll.js';
import {Priority} from '../../navigation-instruments/types.js';
import {widthDecorator} from '../../storybook-util.js';

const meta: Meta<typeof ObcPitch> = {
  title: 'Building Blocks/Single Axis Inclinometer Base',
  component: 'obc-pitch',
  tags: ['autodocs', '6.0'],
  parameters: {
    docs: {
      description: {
        component: `# Single Axis Inclinometer Base (abstract base class)

Shared base for the single-axis inclinometers \`<obc-pitch>\` and \`<obc-roll>\`.

Captures everything the two instruments have in common so each subclass only
supplies its axis-specific pieces:

- **Optional centre readout** (\`hasReadout\`) showing the value, label and unit
  instead of the horizon line, rotating indicator and vessel.
- **Arc framing** via \`arcAngle\` (half-extent in degrees) with optional
  \`zoomToFitArc\` enlargement of a narrow arc onto its own layer.
- **Average band** and a rotating value indicator.
- **Caution advice bands** derived from the subclass threshold.
- **\`regular\` / \`enhanced\` palette** via \`priority\`.
- **Optional opposite-side scale** (\`dual-scale\`).

## Concrete implementations

- \`<obc-pitch>\`: arc centred on the right; horizontal indicator line.
- \`<obc-roll>\`: arc centred at the bottom; vertical indicator line.

The base is declared as a concrete \`class\` (with hooks that throw if not
overridden) rather than \`abstract\` so the auto-generated framework wrappers
type-check. It is never registered as a custom element — use \`obc-pitch\` or
\`obc-roll\`.`,
      },
    },
  },
  args: {
    width: 400,
    pitch: 3,
    minAvgPitch: -6,
    maxAvgPitch: 6,
    maxPitchAdvice: 5,
    triggerPitchAdvice: true,
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    pitch: {control: {type: 'range', min: -10, max: 10, step: 0.1}},
    priority: {control: 'select', options: Object.values(Priority)},
    hasReadout: {control: 'boolean'},
    label: {control: 'text'},
    unit: {control: 'text'},
    fractionDigits: {control: 'number'},
    zoomToFitArc: {control: 'boolean'},
    arcAngle: {control: {type: 'range', min: 5, max: 45, step: 1}},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcPitch>;

export default meta;
type Story = StoryObj<ObcPitch>;

export const Pitch: Story = {
  tags: ['skip-test'],
  args: {},
};

export const PitchWithReadout: Story = {
  tags: ['skip-test'],
  args: {
    hasReadout: true,
  },
};

export const Roll: Story = {
  tags: ['skip-test'],
  render: () =>
    html`<obc-roll
      .roll=${3}
      .minAvgRoll=${-6}
      .maxAvgRoll=${6}
      .maxRollAdvice=${5}
      .triggerRollAdvice=${true}
    ></obc-roll>`,
};
