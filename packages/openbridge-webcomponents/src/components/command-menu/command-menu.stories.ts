import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcCommandMenu, ObcCommandMenuChangeEvent} from './command-menu.js';
import './command-menu.js';
import {LitElement, html} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-command-no.js';
import '../../icons/icon-joystick.js';

/**
 * Reactive wrapper so that slot content (icon, status text) updates
 * when the user drags the switch — Storybook's static template
 * would otherwise only re-render on args changes from the controls panel.
 */
class CommandMenuStoryWrapper extends LitElement {
  @property({type: Boolean}) inCommand = false;
  @property({type: Boolean}) hideLocation = false;

  // Opt out of shadow DOM so Storybook styles apply normally
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
