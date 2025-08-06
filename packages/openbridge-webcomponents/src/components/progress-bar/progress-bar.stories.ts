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
  title: 'UI Components/Visual Feedback/Progress Indicators/Progress bar',
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
    value: {
      control: {type: 'range', min: 0, max: 100, step: 1},
      description:
        'Progress value (0-100). Only used in determinate mode/state.',
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
      description: 'Show unit "%" (circular determinate only)',
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

// Linear Progress Bar Stories
export const LinearPrimary: Story = {
  name: 'Linear - Primary',
  args: {
    type: ProgressBarType.linear,
    value: 40,
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

export const LinearDeterminateWithDescription: Story = {
  name: 'Linear - Determinate with Description',
  args: {
    type: ProgressBarType.linear,
    mode: ProgressBarMode.determinate,
    value: 65,
    showValue: true,
    hasDescription: true,
    description: 'Uploading files...',
  },
};

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
    hasDescription: false,
  },
};

export const LinearIndeterminateWithDescription: Story = {
  name: 'Linear - Indeterminate with Description',
  args: {
    type: ProgressBarType.linear,
    mode: ProgressBarMode.indeterminate,
    showValue: true,
    hasDescription: true,
    description: 'Please wait...',
  },
};

// Circular Progress Bar Stories
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

export const CircularDeterminateComplete: Story = {
  name: 'Circular - Determinate Complete',
  args: {
    type: ProgressBarType.circular,
    circularState: CircularProgressState.determinate,
    value: 100,
    showUnit: true,
  },
};

export const CircularIndeterminate: Story = {
  name: 'Circular - Indeterminate',
  args: {
    type: ProgressBarType.circular,
    circularState: CircularProgressState.indeterminate,
  },
};

export const CircularIcon: Story = {
  name: 'Circular - Icon',
  args: {
    type: ProgressBarType.circular,
    circularState: CircularProgressState.icon,
  },
};

// Animation Demos
export const LinearProgressAnimation: Story = {
  name: 'Linear - Progress Animation Demo',
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
              value += 2;
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
              value += 2;
              if (value > 100) {
                value = 100;
                clearInterval(interval);
                // Change to icon state when complete
                setTimeout(() => {
                  progressBar.circularState = 'icon';
                }, 500);
              }
              progressBar.value = value;
            }, 100);
          }, 50);
        })();
      </script>
    `;
  },
};

// Comparison Stories
export const AllLinearVariants: Story = {
  render: () => {
    return html`
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px; color: #666;">
            Determinate (0%)
          </h4>
          <obc-progress-bar
            type="linear"
            mode="determinate"
            value="0"
            showValue
          ></obc-progress-bar>
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px; color: #666;">
            Determinate (40%)
          </h4>
          <obc-progress-bar
            type="linear"
            mode="determinate"
            value="40"
            showValue
          ></obc-progress-bar>
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px; color: #666;">
            Determinate (100%)
          </h4>
          <obc-progress-bar
            type="linear"
            mode="determinate"
            value="100"
            showValue
          ></obc-progress-bar>
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px; color: #666;">
            Indeterminate
          </h4>
          <obc-progress-bar
            type="linear"
            mode="indeterminate"
            showValue
          ></obc-progress-bar>
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px; color: #666;">
            With Description
          </h4>
          <obc-progress-bar
            type="linear"
            mode="determinate"
            value="65"
            showValue
            hasDescription
            description="Processing data..."
          ></obc-progress-bar>
        </div>
      </div>
    `;
  },
};

export const AllCircularVariants: Story = {
  render: () => {
    return html`
      <div
        style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;"
      >
        <div style="text-align: center;">
          <obc-progress-bar
            type="circular"
            circularState="determinate"
            value="0"
            showUnit
          ></obc-progress-bar>
          <p style="margin-top: 8px; font-size: 12px; color: #666;">
            Determinate (0%)
          </p>
        </div>
        <div style="text-align: center;">
          <obc-progress-bar
            type="circular"
            circularState="determinate"
            value="40"
            showUnit
          ></obc-progress-bar>
          <p style="margin-top: 8px; font-size: 12px; color: #666;">
            Determinate (40%)
          </p>
        </div>
        <div style="text-align: center;">
          <obc-progress-bar
            type="circular"
            circularState="determinate"
            value="75"
            .showUnit=${false}
          ></obc-progress-bar>
          <p style="margin-top: 8px; font-size: 12px; color: #666;">
            Without Unit
          </p>
        </div>
        <div style="text-align: center;">
          <obc-progress-bar
            type="circular"
            circularState="determinate"
            value="100"
            showUnit
          ></obc-progress-bar>
          <p style="margin-top: 8px; font-size: 12px; color: #666;">
            Complete (100%)
          </p>
        </div>
        <div style="text-align: center;">
          <obc-progress-bar
            type="circular"
            circularState="indeterminate"
          ></obc-progress-bar>
          <p style="margin-top: 8px; font-size: 12px; color: #666;">
            Indeterminate
          </p>
        </div>
        <div style="text-align: center;">
          <obc-progress-bar
            type="circular"
            circularState="icon"
          ></obc-progress-bar>
          <p style="margin-top: 8px; font-size: 12px; color: #666;">
            Icon State
          </p>
        </div>
      </div>
    `;
  },
};

// Playground
export const Playground: Story = {
  args: {
    type: ProgressBarType.linear,
    mode: ProgressBarMode.determinate,
    value: 75,
    showValue: true,
    hasDescription: true,
    description: 'Processing data...',
  },
};
