import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  ObcProgressButton,
  ProgressButtonType,
  ButtonStyle,
  ProgressMode,
  type ProgressButtonClickEvent,
} from './progress-button.js';
import './progress-button.js';
import '../../icons/icon-placeholder.js';

interface ProgressButtonArgs {
  type: ProgressButtonType;
  buttonStyle: ButtonStyle;
  mode: ProgressMode;
  value: number;
  label: string;
  disabled: boolean;
  showProgress: boolean;
  hasLeadingIcon: boolean;
  hasTrailingIcon: boolean;
  hasAlert: boolean;
  progressiveIndeterminate: boolean;
  showLabel: boolean;
}

const meta: Meta<typeof ObcProgressButton> = {
  title: 'UI Components/Message and notifications/Progress Button',
  tags: ['6.0'],
  component: 'obc-progress-button',
  decorators: [
    (story) =>
      html`<div
        style="padding: 40px; display: flex; justify-content: center; align-items: center; min-height: 200px;"
      >
        ${story()}
      </div>`,
  ],
  args: {
    type: ProgressButtonType.Linear,
    buttonStyle: ButtonStyle.Regular,
    mode: ProgressMode.Determinate,
    value: 0,
    label: 'Button',
    disabled: false,
    showProgress: true,
    hasLeadingIcon: true,
    hasTrailingIcon: false,
    hasAlert: false,
    progressiveIndeterminate: false,
    showLabel: false,
  },
  argTypes: {
    type: {
      control: {type: 'select'},
      options: Object.values(ProgressButtonType),
      description: 'Type of progress button',
      table: {
        defaultValue: {summary: ProgressButtonType.Linear},
      },
    },
    buttonStyle: {
      control: {type: 'select'},
      options: Object.values(ButtonStyle),
      description: 'Visual style of the button',
      table: {
        defaultValue: {summary: ButtonStyle.Regular},
      },
    },
    mode: {
      control: {type: 'select'},
      options: Object.values(ProgressMode),
      description: 'Progress mode',
      table: {
        defaultValue: {summary: ProgressMode.Determinate},
      },
    },
    value: {
      control: {type: 'range', min: 0, max: 100, step: 1},
      description: 'Progress value (0-100)',
      table: {
        defaultValue: {summary: '0'},
      },
    },
    label: {
      control: {type: 'text'},
      description: 'Button label text',
      table: {
        defaultValue: {summary: 'Button'},
      },
    },
    disabled: {
      control: {type: 'boolean'},
      description: 'Disable the button',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    showProgress: {
      control: {type: 'boolean'},
      description: 'Show progress indicator',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    hasLeadingIcon: {
      control: {type: 'boolean'},
      description: 'Has leading icon slot (linear only)',
      table: {
        defaultValue: {summary: 'false'},
      },
      if: {arg: 'type', eq: ProgressButtonType.Linear},
    },
    hasTrailingIcon: {
      control: {type: 'boolean'},
      description: 'Has trailing icon slot (linear only)',
      table: {
        defaultValue: {summary: 'false'},
      },
      if: {arg: 'type', eq: ProgressButtonType.Linear},
    },
    hasAlert: {
      control: {type: 'boolean'},
      description: 'Show alert state (red border)',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    progressiveIndeterminate: {
      control: {type: 'boolean'},
      description: 'Progressive indeterminate mode (circular only)',
      table: {
        defaultValue: {summary: 'false'},
      },
      if: {arg: 'type', eq: ProgressButtonType.Circular},
    },
    showLabel: {
      control: {type: 'boolean'},
      description: 'Show label below circular button',
      table: {
        defaultValue: {summary: 'false'},
      },
      if: {arg: 'type', eq: ProgressButtonType.Circular},
    },
  },
} satisfies Meta<ObcProgressButton>;

export default meta;
type Story = StoryObj<ObcProgressButton>;

const renderLinearButton = (args: ProgressButtonArgs) => html`
  <obc-progress-button
    type="${args.type}"
    buttonStyle="${args.buttonStyle}"
    mode="${args.mode}"
    value="${args.value}"
    label="${args.label}"
    .disabled=${args.disabled}
    .showProgress=${args.showProgress}
    .hasLeadingIcon=${args.hasLeadingIcon}
    .hasTrailingIcon=${args.hasTrailingIcon}
    .hasAlert=${args.hasAlert}
  >
    ${args.hasLeadingIcon
      ? html`<obi-placeholder slot="leading-icon"></obi-placeholder>`
      : ''}
    ${args.hasTrailingIcon
      ? html`<obi-placeholder slot="trailing-icon"></obi-placeholder>`
      : ''}
  </obc-progress-button>
`;

const renderCircularButton = (args: ProgressButtonArgs) => html`
  <obc-progress-button
    type="${args.type}"
    buttonStyle="${args.buttonStyle}"
    mode="${args.mode}"
    value="${args.value}"
    label="${args.label}"
    .disabled=${args.disabled}
    .showProgress=${args.showProgress}
    .hasAlert=${args.hasAlert}
    .progressiveIndeterminate=${args.progressiveIndeterminate}
    .showLabel=${args.showLabel}
  >
    <obi-placeholder slot="icon"></obi-placeholder>
  </obc-progress-button>
`;

export const LinearRegular: Story = {
  name: 'Linear - Regular',
  args: {
    type: ProgressButtonType.Linear,
    buttonStyle: ButtonStyle.Regular,
    label: 'Upload File',
  },
  render: renderLinearButton,
};

export const LinearFlat: Story = {
  name: 'Linear - Flat',
  args: {
    type: ProgressButtonType.Linear,
    buttonStyle: ButtonStyle.Flat,
    label: 'Cancel',
  },
  render: renderLinearButton,
};

export const LinearRaised: Story = {
  name: 'Linear - Raised',
  args: {
    type: ProgressButtonType.Linear,
    buttonStyle: ButtonStyle.Raised,
    label: 'Download',
  },
  render: renderLinearButton,
};

export const LinearWithProgress: Story = {
  name: 'Linear - With Progress',
  args: {
    type: ProgressButtonType.Linear,
    buttonStyle: ButtonStyle.Raised,
    label: 'Uploading...',
    showProgress: true,
    mode: ProgressMode.Determinate,
    value: 45,
  },
  render: renderLinearButton,
};

export const LinearIndeterminate: Story = {
  name: 'Linear - Indeterminate Progress',
  args: {
    type: ProgressButtonType.Linear,
    buttonStyle: ButtonStyle.Raised,
    label: 'Processing...',
    showProgress: true,
    mode: ProgressMode.Indeterminate,
  },
  render: renderLinearButton,
};

export const LinearWithIcons: Story = {
  name: 'Linear - With Icons',
  args: {
    type: ProgressButtonType.Linear,
    buttonStyle: ButtonStyle.Raised,
    label: 'Upload File',
    hasLeadingIcon: true,
    hasTrailingIcon: true,
  },
  render: renderLinearButton,
};

export const LinearWithAlert: Story = {
  name: 'Linear - Alert State',
  args: {
    type: ProgressButtonType.Linear,
    buttonStyle: ButtonStyle.Raised,
    label: 'Error - Try Again',
    hasAlert: true,
    showProgress: true,
    value: 75,
  },
  render: renderLinearButton,
};

export const LinearDisabled: Story = {
  name: 'Linear - Disabled',
  args: {
    type: ProgressButtonType.Linear,
    buttonStyle: ButtonStyle.Raised,
    label: 'Disabled Button',
    disabled: true,
  },
  render: renderLinearButton,
};

export const Circular: Story = {
  args: {
    type: ProgressButtonType.Circular,
    buttonStyle: ButtonStyle.Regular,
    showProgress: true,
    value: 30,
  },
  render: renderCircularButton,
};

export const CircularWithLabel: Story = {
  name: 'Circular - With Label',
  args: {
    type: ProgressButtonType.Circular,
    buttonStyle: ButtonStyle.Raised,
    label: 'Action',
    showLabel: true,
    showProgress: true,
    value: 40,
  },
  render: renderCircularButton,
};

export const CircularDeterminate: Story = {
  name: 'Circular - Determinate Progress',
  args: {
    type: ProgressButtonType.Circular,
    buttonStyle: ButtonStyle.Raised,
    showProgress: true,
    mode: ProgressMode.Determinate,
    value: 65,
  },
  render: renderCircularButton,
};

export const CircularIndeterminate: Story = {
  name: 'Circular - Indeterminate Progress',
  args: {
    type: ProgressButtonType.Circular,
    buttonStyle: ButtonStyle.Raised,
    showProgress: true,
    mode: ProgressMode.Indeterminate,
  },
  render: renderCircularButton,
};

export const CircularProgressiveIndeterminate: Story = {
  name: 'Circular - Progressive Indeterminate',
  args: {
    type: ProgressButtonType.Circular,
    showProgress: true,
    progressiveIndeterminate: true,
    value: 70,
  },
  render: renderCircularButton,
};

export const CircularWithAlert: Story = {
  name: 'Circular - Alert State',
  args: {
    type: ProgressButtonType.Circular,
    buttonStyle: ButtonStyle.Raised,
    hasAlert: true,
    showProgress: true,
    value: 50,
  },
  render: renderCircularButton,
};

export const CircularWithLabelAndAlert: Story = {
  name: 'Circular - With Label and Alert',
  args: {
    type: ProgressButtonType.Circular,
    buttonStyle: ButtonStyle.Raised,
    label: 'Error',
    showLabel: true,
    hasAlert: true,
    showProgress: true,
    progressiveIndeterminate: true,
    value: 75,
  },
  render: renderCircularButton,
};

export const LinearProgressAnimation: Story = {
  name: 'Linear - Progress Animation Demo',
  tags: ['skip-snapshot'],
  args: {
    type: ProgressButtonType.Linear,
    buttonStyle: ButtonStyle.Raised,
    label: 'Upload File',
    showProgress: true,
    mode: ProgressMode.Determinate,
    value: 0,
  },
  render: (args) => {
    setTimeout(() => {
      const button = document.getElementById(
        'animated-linear-button'
      ) as ObcProgressButton;
      if (button) {
        let value = 0;
        const interval = setInterval(() => {
          value += 2;
          if (value > 100) {
            value = 100;
            button.label = 'Upload Complete!';
            clearInterval(interval);
          } else {
            button.label = `Uploading... ${value}%`;
          }
          button.value = value;
        }, 100);
      }
    }, 100);

    return html`
      <obc-progress-button
        id="animated-linear-button"
        type="${args.type}"
        buttonStyle="${args.buttonStyle}"
        label="${args.label}"
        .showProgress=${args.showProgress}
        mode="${args.mode}"
        value="${args.value}"
        @obc-click="${(e: CustomEvent<ProgressButtonClickEvent>) => {
          console.log('Button clicked with value:', e.detail.value);
        }}"
      >
      </obc-progress-button>
    `;
  },
};

export const CircularProgressAnimation: Story = {
  name: 'Circular - Progress Animation Demo',
  tags: ['skip-snapshot'],
  args: {
    type: ProgressButtonType.Circular,
    buttonStyle: ButtonStyle.Raised,
    showProgress: true,
    progressiveIndeterminate: true,
    value: 0,
    showLabel: true,
    label: 'Uploading',
  },
  render: (args) => {
    setTimeout(() => {
      const button = document.getElementById(
        'animated-circular-button'
      ) as ObcProgressButton;
      if (button) {
        let value = 0;
        const interval = setInterval(() => {
          value += 1;
          if (value > 100) {
            value = 100;
            button.label = 'Complete!';
            clearInterval(interval);
          } else {
            button.label = `${value}%`;
          }
          button.value = value;
        }, 50);
      }
    }, 100);

    return html`
      <obc-progress-button
        id="animated-circular-button"
        type="${args.type}"
        buttonStyle="${args.buttonStyle}"
        .showProgress=${args.showProgress}
        .progressiveIndeterminate=${args.progressiveIndeterminate}
        value="${args.value}"
        .showLabel=${args.showLabel}
        label="${args.label}"
        @obc-click="${(e: CustomEvent<ProgressButtonClickEvent>) => {
          console.log('Button clicked with value:', e.detail.value);
        }}"
      >
        <obi-placeholder slot="icon"></obi-placeholder>
      </obc-progress-button>
    `;
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    let linearAnimating = false;
    let circularAnimating = false;

    return html`
      <div
        style="display: flex; flex-direction: column; gap: 20px; align-items: center;"
      >
        <div style="display: flex; gap: 20px;">
          <obc-progress-button
            type="${ProgressButtonType.Linear}"
            buttonStyle="${ButtonStyle.Raised}"
            label="Start Upload"
            @obc-click="${(e: Event) => {
              const target = e.target as ObcProgressButton;

              if (linearAnimating) return;

              linearAnimating = true;
              target.showProgress = true;
              target.label = 'Uploading...';
              let value = 0;
              const interval = setInterval(() => {
                value += 1;
                target.value = value;
                if (value >= 100) {
                  clearInterval(interval);
                  target.label = 'Complete!';
                  setTimeout(() => {
                    target.showProgress = false;
                    target.label = 'Start Upload';
                    target.value = 0;
                    linearAnimating = false;
                  }, 2000);
                }
              }, 100);
            }}"
          ></obc-progress-button>

          <obc-progress-button
            type="${ProgressButtonType.Circular}"
            buttonStyle="${ButtonStyle.Raised}"
            @obc-click="${(e: Event) => {
              const target = e.target as ObcProgressButton;

              if (circularAnimating) return;

              circularAnimating = true;
              target.showProgress = true;
              target.progressiveIndeterminate = true;
              let value = 0;
              const interval = setInterval(() => {
                value += 1;
                target.value = value;
                if (value >= 100) {
                  clearInterval(interval);
                  setTimeout(() => {
                    target.showProgress = false;
                    target.value = 0;
                    target.progressiveIndeterminate = false;
                    circularAnimating = false;
                  }, 2000);
                }
              }, 100);
            }}"
          >
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-progress-button>
        </div>

        <p style="color: #666; font-size: 14px;">
          Click the buttons to see progress animation
        </p>
      </div>
    `;
  },
};
