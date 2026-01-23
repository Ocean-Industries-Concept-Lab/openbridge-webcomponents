import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  ObcProgressBar,
  ProgressBarMode,
  ProgressBarType,
  CircularProgressState,
} from './progress-bar.js';
import './progress-bar.js';

const meta: Meta<typeof ObcProgressBar> = {
  title: 'UI Components/Messages and notifications/Progress bar',
  tags: ['6.0'],
  component: 'obc-progress-bar',
  decorators: [
    (story) =>
      html`<div style="max-width: 320px; margin: 0 auto;">${story()}</div>`,
  ],
  args: {
    type: ProgressBarType.linear,
    mode: ProgressBarMode.determinate,
    circularState: CircularProgressState.determinate,
    value: 40,
    showValue: false,
    showUnit: true,
    hasDescription: false,
    description: 'Description text',
    showState: false,
    stateLabel: 'Open',
    progressiveIndeterminate: false,
  },
  argTypes: {
    type: {
      control: {type: 'select'},
      options: Object.values(ProgressBarType),
      description: 'Type of progress indicator',
      table: {
        defaultValue: {summary: ProgressBarType.linear},
      },
    },
    mode: {
      control: {type: 'select'},
      options: Object.values(ProgressBarMode),
      description:
        'Progress mode for linear type (determinate or indeterminate)',
      table: {
        defaultValue: {summary: ProgressBarMode.determinate},
      },
      if: {arg: 'type', eq: ProgressBarType.linear},
    },
    circularState: {
      control: {type: 'select'},
      options: Object.values(CircularProgressState),
      description:
        'State for circular type (determinate, indeterminate, or icon)',
      table: {
        defaultValue: {summary: CircularProgressState.determinate},
      },
      if: {arg: 'type', eq: ProgressBarType.circular},
    },
    progressiveIndeterminate: {
      control: {type: 'boolean'},
      description:
        'Progressive indeterminate mode - spinning arc that grows with value (circular only)',
      table: {
        defaultValue: {summary: 'false'},
      },
      if: {arg: 'type', eq: ProgressBarType.circular},
    },
    value: {
      control: {type: 'range', min: 0, max: 100, step: 1},
      description:
        'Progress value (0-100). Used in determinate mode/state and progressive indeterminate.',
      table: {
        defaultValue: {summary: '0'},
      },
    },
    showValue: {
      control: {type: 'boolean'},
      description:
        'Show value label (linear only - shows percentage or "Loading" text)',
      table: {
        defaultValue: {summary: 'false'},
      },
      if: {arg: 'type', eq: ProgressBarType.linear},
    },
    showUnit: {
      control: {type: 'boolean'},
      description:
        'Show unit "%" (circular determinate and progressive indeterminate)',
      table: {
        defaultValue: {summary: 'true'},
      },
      if: {arg: 'type', eq: ProgressBarType.circular},
    },
    hasDescription: {
      control: {type: 'boolean'},
      description: 'Show description text below progress bar (linear only)',
      table: {
        defaultValue: {summary: 'false'},
      },
      if: {arg: 'type', eq: ProgressBarType.linear},
    },
    description: {
      control: {type: 'text'},
      description: 'Description text content (linear only)',
      table: {
        defaultValue: {summary: 'Description text'},
      },
      if: {arg: 'type', eq: ProgressBarType.linear},
    },
    showState: {
      control: {type: 'boolean'},
      description: 'Show state indicators (linear only, future feature)',
      table: {
        defaultValue: {summary: 'false'},
      },
      if: {arg: 'type', eq: ProgressBarType.linear},
    },
    stateLabel: {
      control: {type: 'text'},
      description: 'State label text (linear only)',
      if: {arg: 'type', eq: ProgressBarType.linear},
    },
  },
} satisfies Meta<ObcProgressBar>;

export default meta;
type Story = StoryObj<ObcProgressBar>;

export const LinearDeterminateWithDescriptionAndState: Story = {
  name: 'Linear - Determinate with Description and State',
  args: {
    type: ProgressBarType.linear,
    mode: ProgressBarMode.determinate,
    value: 65,
    showValue: true,
    hasDescription: true,
    description: 'Uploading files...',
    stateLabel: 'Open',
    showState: true,
  },
};

export const LinearDeterminateComplete: Story = {
  name: 'Linear - Determinate Complete',
  args: {
    type: ProgressBarType.linear,
    mode: ProgressBarMode.determinate,
    value: 100,
    showValue: true,
    hasDescription: true,
    description: 'Upload complete!',
  },
};

export const LinearDeterminateWithValue: Story = {
  name: 'Linear - Determinate with Value',
  args: {
    type: ProgressBarType.linear,
    mode: ProgressBarMode.determinate,
    value: 40,
    showValue: true,
  },
};

export const LinearPrimary: Story = {
  name: 'Linear - Primary',
  args: {
    type: ProgressBarType.linear,
    value: 40,
  },
};

export const LinearIndeterminateSimple: Story = {
  name: 'Linear - Indeterminate Simple',
  args: {
    type: ProgressBarType.linear,
    mode: ProgressBarMode.indeterminate,
    showValue: false,
    hasDescription: false,
  },
};

export const LinearIndeterminateWithLoading: Story = {
  name: 'Linear - Indeterminate with Loading',
  args: {
    type: ProgressBarType.linear,
    mode: ProgressBarMode.indeterminate,
    showValue: true,
    hasDescription: true,
    value: 65,
    stateLabel: 'Open',
    showState: true,
  },
};

export const CircularDeterminate: Story = {
  name: 'Circular - Determinate',
  args: {
    type: ProgressBarType.circular,
    circularState: CircularProgressState.determinate,
    value: 40,
    showUnit: true,
  },
};

export const CircularDeterminateWithoutUnit: Story = {
  name: 'Circular - Determinate without Unit',
  args: {
    type: ProgressBarType.circular,
    circularState: CircularProgressState.determinate,
    value: 75,
    showUnit: false,
  },
};

export const CircularIcon: Story = {
  name: 'Circular - Icon',
  args: {
    type: ProgressBarType.circular,
    circularState: CircularProgressState.icon,
  },
};

export const CircularIndeterminate: Story = {
  name: 'Circular - Indeterminate',
  args: {
    type: ProgressBarType.circular,
    circularState: CircularProgressState.indeterminate,
  },
};

export const CircularProgressiveIndeterminateStart: Story = {
  name: 'Circular - Progressive Indeterminate (0%)',
  args: {
    type: ProgressBarType.circular,
    progressiveIndeterminate: true,
    value: 0,
    showUnit: true,
  },
};

export const CircularProgressiveIndeterminateQuarter: Story = {
  name: 'Circular - Progressive Indeterminate (25%)',
  args: {
    type: ProgressBarType.circular,
    progressiveIndeterminate: true,
    value: 25,
    showUnit: true,
  },
};

export const CircularProgressiveIndeterminateHalf: Story = {
  name: 'Circular - Progressive Indeterminate (50%)',
  args: {
    type: ProgressBarType.circular,
    progressiveIndeterminate: true,
    value: 50,
    showUnit: true,
  },
};

export const CircularProgressiveIndeterminateThreeQuarters: Story = {
  name: 'Circular - Progressive Indeterminate (75%)',
  args: {
    type: ProgressBarType.circular,
    progressiveIndeterminate: true,
    value: 75,
    showUnit: true,
  },
};

export const CircularProgressiveIndeterminateComplete: Story = {
  name: 'Circular - Progressive Indeterminate (100%)',
  args: {
    type: ProgressBarType.circular,
    progressiveIndeterminate: true,
    value: 100,
    showUnit: true,
  },
};

export const LinearProgressAnimation: Story = {
  name: 'Linear - Progress Animation Demo',
  tags: ['skip-snapshot'],
  args: {
    type: ProgressBarType.linear,
    mode: ProgressBarMode.determinate,
    value: 0,
    showValue: true,
    hasDescription: true,
    description: 'Simulating file upload...',
  },
  render: (args) => {
    return html`
      <obc-progress-bar
        id="animated-linear-progress"
        type="${args.type}"
        mode="${args.mode}"
        value="0"
        ?showValue="${args.showValue}"
        ?hasDescription="${args.hasDescription}"
        description="${args.description}"
      ></obc-progress-bar>
      <script>
        (function () {
          setTimeout(() => {
            const progressBar = document.getElementById(
              'animated-linear-progress'
            );
            let value = 0;
            const interval = setInterval(() => {
              value += 1;
              if (value > 100) {
                value = 100;
                clearInterval(interval);
                progressBar.description = 'Upload complete!';
              }
              progressBar.value = value;
            }, 100);
          }, 50);
        })();
      </script>
    `;
  },
};

export const CircularProgressAnimation: Story = {
  name: 'Circular - Progress Animation Demo',
  tags: ['skip-snapshot'],
  args: {
    type: ProgressBarType.circular,
    circularState: CircularProgressState.determinate,
    value: 0,
    showUnit: true,
  },
  render: (args) => {
    return html`
      <obc-progress-bar
        id="animated-circular-progress"
        type="${args.type}"
        circularState="${args.circularState}"
        value="0"
        ?showUnit="${args.showUnit}"
      ></obc-progress-bar>
      <script>
        (function () {
          setTimeout(() => {
            const progressBar = document.getElementById(
              'animated-circular-progress'
            );
            let value = 0;
            const interval = setInterval(() => {
              value += 1;
              if (value > 100) {
                value = 100;
                clearInterval(interval);
              }
              progressBar.value = value;
            }, 100);
          }, 50);
        })();
      </script>
    `;
  },
};

export const CircularProgressiveIndeterminateAnimation: Story = {
  name: 'Circular - Progressive Indeterminate Animation Demo',
  tags: ['skip-snapshot'],
  args: {
    type: ProgressBarType.circular,
    progressiveIndeterminate: true,
    value: 0,
    showUnit: true,
  },
  render: (args) => {
    return html`
      <obc-progress-bar
        id="animated-progressive-circular"
        type="${args.type}"
        ?progressiveIndeterminate="${args.progressiveIndeterminate}"
        value="0"
        ?showUnit="${args.showUnit}"
      ></obc-progress-bar>
      <script>
        (function () {
          setTimeout(() => {
            const progressBar = document.getElementById(
              'animated-progressive-circular'
            );
            let value = 0;
            const interval = setInterval(() => {
              value += 1;
              if (value > 100) {
                value = 100;
                clearInterval(interval);
              }
              progressBar.value = value;
            }, 50);
          }, 50);
        })();
      </script>
    `;
  },
};
