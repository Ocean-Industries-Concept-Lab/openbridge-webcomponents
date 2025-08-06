import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  ObcProgressBar,
  ProgressBarMode,
  ProgressBarType,
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
    value: 40,
    showValue: false,
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
      description: 'Progress mode (determinate or indeterminate)',
      table: {
        defaultValue: {summary: ProgressBarMode.determinate},
      },
    },
    value: {
      control: {type: 'range', min: 0, max: 100, step: 1},
      description: 'Progress value (0-100). Only used in determinate mode.',
      table: {
        defaultValue: {summary: '0'},
      },
    },
    showValue: {
      control: {type: 'boolean'},
      description: 'Show value label (percentage or "Loading" text)',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    hasDescription: {
      control: {type: 'boolean'},
      description: 'Show description text below progress bar',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    description: {
      control: {type: 'text'},
      description: 'Description text content',
      table: {
        defaultValue: {summary: 'Description text'},
      },
    },
    showState: {
      control: {type: 'boolean'},
      description: 'Show state indicators (future feature)',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    stateLabel: {
      control: {type: 'text'},
      description: 'State label text',
    },
  },
} satisfies Meta<ObcProgressBar>;

export default meta;
type Story = StoryObj<ObcProgressBar>;

export const DeterminateWithDescriptionAndState: Story = {
  args: {
    mode: ProgressBarMode.determinate,
    value: 65,
    showValue: true,
    hasDescription: true,
    description: 'Uploading files...',
    stateLabel: 'Open',
    showState: true,
  },
};
export const DeterminateWithDescription: Story = {
  name: 'Determinate with Description',
  args: {
    mode: ProgressBarMode.determinate,
    value: 65,
    showValue: true,
    hasDescription: true,
    description: 'Uploading files...',
  },
};

export const DeterminateWithValue: Story = {
  name: 'Determinate with Value',
  args: {
    mode: ProgressBarMode.determinate,
    value: 40,
    showValue: true,
  },
};

export const Primary: Story = {
  args: {
    value: 40,
  },
};

export const DeterminateComplete: Story = {
  args: {
    mode: ProgressBarMode.determinate,
    value: 100,
    showValue: true,
    hasDescription: true,
    description: 'Upload complete!',
  },
};

export const IndeterminateSimple: Story = {
  args: {
    mode: ProgressBarMode.indeterminate,
    showValue: false,
    hasDescription: false,
  },
};

export const IndeterminateWithLoading: Story = {
  args: {
    mode: ProgressBarMode.indeterminate,
    showValue: true,
    hasDescription: false,
  },
};

export const IndeterminateWithDescription: Story = {
  args: {
    mode: ProgressBarMode.indeterminate,
    showValue: true,
    hasDescription: true,
    description: 'Please wait...',
  },
};

export const ProgressAnimation: Story = {
  name: 'Progress Animation Demo',
  args: {
    mode: ProgressBarMode.determinate,
    value: 0,
    showValue: true,
    hasDescription: true,
    description: 'Simulating file upload...',
  },
  render: (args) => {
    return html`
      <obc-progress-bar
        id="animated-progress"
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
            const progressBar = document.getElementById('animated-progress');
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

export const Playground: Story = {
  args: {
    mode: ProgressBarMode.determinate,
    value: 75,
    showValue: true,
    hasDescription: true,
    description: 'Processing data...',
  },
};
