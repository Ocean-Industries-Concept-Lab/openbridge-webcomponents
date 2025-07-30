import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcSlideButton} from './slide-button.js';
import './slide-button.js';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-chevron-double-right-google.js';
import '../../icons/icon-command-in.js';
import {html} from 'lit';

const meta: Meta<typeof ObcSlideButton> = {
  title: 'UI Components/Buttons/Slide button',
  tags: ['6.0'],
  component: 'obc-slide-button',
  args: {},
  render: (args) => {
    return html`<obc-slide-button
      .disabled=${args.disabled}
      .hasLeadingIcon=${args.hasLeadingIcon}
      .hugContent=${args.hugContent}
    >
      <div slot="leading-icon">
        <obi-placeholder></obi-placeholder>
      </div>
      <div slot="label">Slide to confirm</div>
    </obc-slide-button>`;
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the slide button is disabled',
    },
    hasLeadingIcon: {
      control: 'boolean',
      description: 'Whether to show the leading icon',
    },
    hugContent: {
      control: 'boolean',
      description: 'Whether the button should hug its content',
    },
  },
} satisfies Meta<ObcSlideButton>;

export default meta;
type Story = StoryObj<ObcSlideButton>;

export const Default: Story = {
  args: {
    disabled: false,
    hasLeadingIcon: true,
    hugContent: false,
  },
};

export const WithoutIcon: Story = {
  args: {
    disabled: false,
    hasLeadingIcon: false,
    hugContent: false,
  },
};

export const HugContent: Story = {
  args: {
    disabled: false,
    hasLeadingIcon: true,
    hugContent: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    hasLeadingIcon: true,
    hugContent: false,
  },
};

export const CommandExample: Story = {
  args: {
    disabled: false,
    hasLeadingIcon: true,
    hugContent: false,
  },
  render: (args) => {
    return html`<obc-slide-button
      .disabled=${args.disabled}
      .hasLeadingIcon=${args.hasLeadingIcon}
      .hugContent=${args.hugContent}
    >
      <div slot="leading-icon">
        <obi-command-in></obi-command-in>
      </div>
      <div slot="label">Request CMD</div>
    </obc-slide-button>`;
  },
};

export const CustomLabels: Story = {
  args: {
    disabled: false,
    hasLeadingIcon: true,
    hugContent: false,
  },
  render: (args) => {
    return html`<obc-slide-button
      .disabled=${args.disabled}
      .hasLeadingIcon=${args.hasLeadingIcon}
      .hugContent=${args.hugContent}
    >
      <div slot="leading-icon">
        <obi-placeholder></obi-placeholder>
      </div>
      <div slot="label">Emergency stop</div>
    </obc-slide-button>`;
  },
};

export const InteractiveDemo: Story = {
  args: {
    disabled: false,
    hasLeadingIcon: true,
    hugContent: false,
  },
  render: (args) => {
    return html`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <h3>Interactive Demo</h3>
        <p>Try sliding the button to the right to trigger the action. The button will snap back after release.</p>
        <obc-slide-button
          .disabled=${args.disabled}
          .hasLeadingIcon=${args.hasLeadingIcon}
          .hugContent=${args.hugContent}
          @slide=${(e: CustomEvent) => {
            console.log('Slide completed:', e.detail);
            alert('Action triggered!');
          }}
        >
          <div slot="leading-icon">
            <obi-placeholder></obi-placeholder>
          </div>
          <div slot="label">Slide to activate</div>
        </obc-slide-button>
      </div>
    `;
  },
};