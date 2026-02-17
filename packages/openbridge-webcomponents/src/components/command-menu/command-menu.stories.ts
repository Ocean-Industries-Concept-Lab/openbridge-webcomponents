import type {Meta, StoryObj} from '@storybook/web-components-vite';
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
 * @property {boolean} inCommand - Whether the station is in command.
 *   When `true` the wrapper slots a joystick icon and "Joystick" status;
 *   when `false` it slots a no-command icon and "NO CMD" status.
 *   Default: `false`.
 * @property {boolean} hideLocation - Forwarded to `<obc-command-menu>` to
 *   hide or show the command location slot. Default: `false`.
 *
 * @example
 * ```html
 * <command-menu-story-wrapper
 *   .inCommand=${true}
 *   .hideLocation=${false}
 * ></command-menu-story-wrapper>
 * ```
 */
class CommandMenuStoryWrapper extends LitElement {
  @property({type: Boolean}) inCommand = false;
  @property({type: Boolean}) hideLocation = false;

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
        .hideLocation=${this.hideLocation}
        @change=${this.onCommandChange}
      >
        <div slot="command-icon">
          ${this.inCommand
            ? html`<obi-joystick></obi-joystick>`
            : html`<obi-command-no></obi-command-no>`}
        </div>
        <div slot="command-status">
          ${this.inCommand ? 'Joystick' : 'NO CMD'}
        </div>
        <div slot="command-description">
          ${this.inCommand ? 'DP' : 'CMD at DP'}
        </div>
        <div slot="command-location">Aft Bridge</div>
        <div slot="toogle-action-to-in-command-label">Take</div>
        <div slot="toogle-action-to-no-command-label">Release</div>
        <div slot="toogle-state-in-command-label">In CMD</div>
        <div slot="toogle-state-no-command-label">DP Aft Bridge</div>
      </obc-command-menu>
    `;
  }
}
customElements.define('command-menu-story-wrapper', CommandMenuStoryWrapper);

const meta: Meta<typeof ObcCommandMenu> = {
  title: 'Application Components/Menus/Command menu',
  tags: ['6.0'],
  component: 'obc-command-menu',
  args: {},

  render: (args) => {
    return html`
      <command-menu-story-wrapper
        .inCommand=${args.inCommand}
        .hideLocation=${args.hideLocation}
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
