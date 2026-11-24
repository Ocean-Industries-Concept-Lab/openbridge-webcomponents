import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {expect, waitFor} from 'storybook/test';
import {ObcCommandMenu} from './command-menu.js';
import type {ObcCommandMenuChangeEvent} from './command-menu.js';
import './command-menu.js';
import {LitElement, html} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-command-no.js';
import '../../icons/icon-joystick.js';

/**
 * `<command-menu-story-wrapper>` – Reactive Storybook wrapper for `<obc-command-menu>`.
 *
 * Re-renders slotted icon and status content in response to the command-menu's
 * toggle events, which Storybook's static template cannot do on its own.
 *
 * @property inCommand - Whether the station is in command.
 *   When `true` the wrapper slots a joystick icon and "Joystick" status;
 *   when `false` it slots a no-command icon and "NO CMD" status.
 *   Default: `false`.
 * @property showLocation - Forwarded to `<obc-command-menu>` to
 *   hide or show the command location slot. Default: `true`.
 * @property disabled - Forwarded to `<obc-command-menu>`.
 * @property hasActionDescription - Forwarded to `<obc-command-menu>`.
 * @property actionDescription - Forwarded to `<obc-command-menu>`.
 *
 * @example
 * ```html
 * <command-menu-story-wrapper
 *   .inCommand=${true}
 *   .showLocation=${true}
 * ></command-menu-story-wrapper>
 * ```
 */
class CommandMenuStoryWrapper extends LitElement {
  @property({type: Boolean}) inCommand = false;
  @property({type: Boolean, attribute: false}) showLocation: boolean = true;
  @property({type: Boolean}) disabled = false;
  @property({type: Boolean}) hasActionDescription = false;
  @property({type: String}) actionDescription = 'Action description';

  override createRenderRoot() {
    return this;
  }

  private onCommandChange(e: ObcCommandMenuChangeEvent) {
    this.inCommand = e.detail.inCommand;
  }

  override render() {
    return html`
      <obc-command-menu
        .inCommand=${this.inCommand}
        .showLocation=${this.showLocation}
        .disabled=${this.disabled}
        .hasActionDescription=${this.hasActionDescription}
        .actionDescription=${this.actionDescription}
        @change=${this.onCommandChange}
      >
        <div slot="command-icon">
          ${
            this.inCommand
              ? html`<obi-joystick></obi-joystick>`
              : html`<obi-command-no></obi-command-no>`
          }
        </div>
        <div slot="command-status">
          ${this.inCommand ? 'Joystick' : 'NO CMD'}
        </div>
        <div slot="command-description">
          ${this.inCommand ? 'DP' : 'CMD at DP'}
        </div>
        <div slot="command-location">Aft Bridge</div>
        <div slot="toggle-action-to-in-command-label">Take</div>
        <div slot="toggle-action-to-no-command-label">Release</div>
        <div slot="toggle-state-in-command-label">In CMD</div>
        <div slot="toggle-state-no-command-label">DP Aft Bridge</div>
      </obc-command-menu>
    `;
  }
}
customElements.define('command-menu-story-wrapper', CommandMenuStoryWrapper);

const meta: Meta<typeof ObcCommandMenu> = {
  title: 'Application Components/Menus/Command Menu',
  tags: ['6.0', 'beta'],
  component: 'obc-command-menu',
  args: {
    showLocation: true,
    disabled: false,
    hasActionDescription: false,
    actionDescription: 'Action description',
  },

  render: (args) => {
    return html`
      <command-menu-story-wrapper
        .inCommand=${args.inCommand}
        .showLocation=${args.showLocation}
        .disabled=${args.disabled}
        .hasActionDescription=${args.hasActionDescription}
        .actionDescription=${args.actionDescription}
      ></command-menu-story-wrapper>
    `;
  },
} satisfies Meta<ObcCommandMenu>;

export default meta;
type Story = StoryObj<ObcCommandMenu>;

export const InCommand: Story = {
  args: {
    inCommand: true,
  },
};

export const NoCommand: Story = {
  args: {
    inCommand: false,
  },
};

export const WithActionDescription: Story = {
  args: {
    inCommand: false,
    hasActionDescription: true,
    actionDescription: 'Take command of the DP system',
  },
};

export const Disabled: Story = {
  args: {
    inCommand: false,
    disabled: true,
  },
};

export const DisabledInCommand: Story = {
  args: {
    inCommand: true,
    disabled: true,
  },
};

export const KeyboardToggle: Story = {
  args: {
    inCommand: false,
  },
  play: async ({canvasElement, userEvent}) => {
    const menu = canvasElement.querySelector('obc-command-menu')!;
    const swtch = menu.shadowRoot!.querySelector('obc-start-stop-switch')!;
    const wrapper = swtch.shadowRoot!.querySelector<HTMLElement>('.wrapper')!;
    await expect(wrapper.getAttribute('role')).toBe('switch');
    await expect(wrapper.getAttribute('aria-checked')).toBe('false');
    wrapper.focus();
    await userEvent.keyboard(' ');
    await expect(menu.inCommand).toBe(true);
    const status = canvasElement.querySelector('[slot="command-status"]')!;
    await waitFor(() => expect(status.textContent?.trim()).toBe('Joystick'));
    await expect(wrapper.getAttribute('aria-checked')).toBe('true');
  },
};
