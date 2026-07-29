import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {expect, waitFor} from 'storybook/test';
import {ObcSlideButton, type ObcSlideButtonSlideEvent} from './slide-button.js';
import './slide-button.js';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-chevron-double-right-google.js';
import '../../icons/icon-command-in.js';
import {html} from 'lit';

const meta: Meta<typeof ObcSlideButton> = {
  title: 'UI Components/Buttons/Slide Button',
  tags: ['6.0'],
  component: 'obc-slide-button',
  args: {},
  render: (args) => {
    return html`<obc-slide-button
      .disabled=${args.disabled}
      .hasLeadingIcon=${args.hasLeadingIcon}
      .hugContent=${args.hugContent}
      .autoDisable=${args.autoDisable}
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
    autoDisable: {
      control: 'boolean',
      description:
        'Whether to automatically disable the button after successful slide',
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
    autoDisable: false,
  },
};

export const WithoutIcon: Story = {
  args: {
    disabled: false,
    hasLeadingIcon: false,
    hugContent: false,
    autoDisable: false,
  },
};

export const HugContentWithIcon: Story = {
  args: {
    disabled: false,
    hasLeadingIcon: true,
    hugContent: true,
    autoDisable: false,
  },
};

export const HugContentWithoutIcon: Story = {
  args: {
    disabled: false,
    hasLeadingIcon: false,
    hugContent: true,
    autoDisable: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    hasLeadingIcon: true,
    hugContent: true,
    autoDisable: false,
  },
};

export const CustomLabels: Story = {
  args: {
    disabled: false,
    hasLeadingIcon: true,
    hugContent: true,
    autoDisable: false,
  },
  render: (args) => {
    return html`<obc-slide-button
      .disabled=${args.disabled}
      .hasLeadingIcon=${args.hasLeadingIcon}
      .hugContent=${args.hugContent}
      .autoDisable=${args.autoDisable}
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
    hugContent: true,
    autoDisable: false,
  },
  render: (args) => {
    return html`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <h3>Interactive Demo</h3>
        <p>
          Try sliding the button to the right to trigger the action. The button
          will snap back after release.
        </p>
        <obc-slide-button
          .disabled=${args.disabled}
          .hasLeadingIcon=${args.hasLeadingIcon}
          .hugContent=${args.hugContent}
          .autoDisable=${args.autoDisable}
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

export const AutoDisableDemo: Story = {
  args: {
    disabled: false,
    hasLeadingIcon: true,
    hugContent: true,
    autoDisable: true,
  },
  render: (args) => {
    return html`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <h3>Auto-Disable Demo</h3>
        <p>
          This button will automatically disable itself after being triggered to
          prevent double-actions.
        </p>
        <obc-slide-button
          .disabled=${args.disabled}
          .hasLeadingIcon=${args.hasLeadingIcon}
          .hugContent=${args.hugContent}
          .autoDisable=${args.autoDisable}
          @slide=${(e: CustomEvent) => {
            console.log('Slide completed:', e.detail);
            alert('Action triggered! Button is now disabled.');
          }}
        >
          <div slot="leading-icon">
            <obi-placeholder></obi-placeholder>
          </div>
          <div slot="label">Delete Account</div>
        </obc-slide-button>
      </div>
    `;
  },
};

export const KeyboardActivation: Story = {
  args: {
    disabled: false,
    hasLeadingIcon: true,
    hugContent: false,
    autoDisable: false,
  },
  render: (args) => {
    let slideCount = 0;
    const onSlide = (e: ObcSlideButtonSlideEvent) => {
      slideCount += 1;
      const status = document.getElementById('keyboard-slide-status');
      if (status) {
        status.textContent = `slides: ${slideCount}, completed: ${e.detail.completed}`;
      }
    };
    return html`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <obc-slide-button
          .disabled=${args.disabled}
          .hasLeadingIcon=${args.hasLeadingIcon}
          .hugContent=${args.hugContent}
          .autoDisable=${args.autoDisable}
          @slide=${onSlide}
        >
          <div slot="leading-icon">
            <obi-placeholder></obi-placeholder>
          </div>
          <div slot="label">Slide to confirm</div>
        </obc-slide-button>
        <div id="keyboard-slide-status">no slide yet</div>
      </div>
    `;
  },
  play: async ({canvasElement, userEvent}) => {
    const button = canvasElement.querySelector('obc-slide-button')!;
    const target = button.shadowRoot!.querySelector<HTMLElement>(
      '.button-touch-target'
    )!;
    await expect(target.getAttribute('role')).toBe('button');
    await expect(target.getAttribute('tabindex')).toBe('0');
    target.focus();
    await expect(button.shadowRoot!.activeElement).toBe(target);
    await userEvent.keyboard('{Enter}');
    const status = canvasElement.querySelector('#keyboard-slide-status')!;
    await expect(status.textContent).toBe('slides: 1, completed: true');
    await userEvent.keyboard(' ');
    await expect(status.textContent).toBe('slides: 2, completed: true');
  },
};

export const KeyboardDisabled: Story = {
  args: {
    disabled: true,
    hasLeadingIcon: true,
    hugContent: false,
    autoDisable: false,
  },
  render: (args) => {
    const onSlide = () => {
      const status = document.getElementById('keyboard-disabled-status');
      if (status) status.textContent = 'slide fired';
    };
    return html`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <obc-slide-button
          .disabled=${args.disabled}
          .hasLeadingIcon=${args.hasLeadingIcon}
          .hugContent=${args.hugContent}
          .autoDisable=${args.autoDisable}
          @slide=${onSlide}
        >
          <div slot="leading-icon">
            <obi-placeholder></obi-placeholder>
          </div>
          <div slot="label">Slide to confirm</div>
        </obc-slide-button>
        <div id="keyboard-disabled-status">no slide yet</div>
      </div>
    `;
  },
  play: async ({canvasElement, userEvent}) => {
    const button = canvasElement.querySelector('obc-slide-button')!;
    const target = button.shadowRoot!.querySelector<HTMLElement>(
      '.button-touch-target'
    )!;
    await expect(target.getAttribute('tabindex')).toBe('-1');
    await expect(target.getAttribute('aria-disabled')).toBe('true');
    target.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    const status = canvasElement.querySelector('#keyboard-disabled-status')!;
    await expect(status.textContent).toBe('no slide yet');
  },
};

export const KeyboardAutoDisable: Story = {
  args: {
    disabled: false,
    hasLeadingIcon: true,
    hugContent: false,
    autoDisable: true,
  },
  render: (args) => {
    return html`<obc-slide-button
      .disabled=${args.disabled}
      .hasLeadingIcon=${args.hasLeadingIcon}
      .hugContent=${args.hugContent}
      .autoDisable=${args.autoDisable}
    >
      <div slot="leading-icon">
        <obi-placeholder></obi-placeholder>
      </div>
      <div slot="label">Slide to confirm</div>
    </obc-slide-button>`;
  },
  play: async ({canvasElement, userEvent}) => {
    const button = canvasElement.querySelector('obc-slide-button')!;
    const target = button.shadowRoot!.querySelector<HTMLElement>(
      '.button-touch-target'
    )!;
    target.focus();
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(button.disabled).toBe(true), {timeout: 2000});
    await expect(target.getAttribute('tabindex')).toBe('-1');
  },
};
