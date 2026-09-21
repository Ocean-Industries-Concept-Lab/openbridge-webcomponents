import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import '../icons/icon-vessel-type-cargo-colour.js';
import '../icons/icon-vessel-generic-default-colour.js';

const modes = [
  'neutral',
  'blue',
  'cyan',
  'teal',
  'green',
  'yellow',
  'orange',
  'red',
  'purple',
  'indigo',
];

const meta: Meta = {
  title: 'Palettes/Categorical Colour',
  parameters: {
    docs: {
      description: {
        component: `The ten \`Color-categorical\` modes from Figma are classes, \`obc-categorical-color-<mode>\`, like the size classes: put one on \`<html>\` for an app-wide default or on any ancestor for a subtree, and everything below that reads \`--base-categorical-*\` or \`--vessel-*\` follows it. \`neutral\` is the \`:root\` default. The block lives in \`src/palettes/manual.css\` until the plugin exports the collection (#1187).`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Modes: Story = {
  render: () => html`
    <style>
      .grid {
        display: grid;
        grid-template-columns: repeat(5, max-content);
        gap: 16px 24px;
      }
      .mode {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }
      .icons {
        display: flex;
        gap: 8px;
        height: 48px;
      }
      .chip {
        padding: 4px 12px;
        border-radius: 16px;
        border: 1px solid var(--vessel-border-color);
        background: var(--vessel-background-color);
        color: var(--vessel-active-color);
        font: 14px/20px var(--global-typography-font-family, sans-serif);
      }
      .chip span {
        color: var(--vessel-neutral-color);
      }
    </style>
    <div class="grid">
      ${modes.map(
        (mode) => html`
          <div class="mode obc-categorical-color-${mode}">
            <div class="icons">
              <obi-vessel-type-cargo-colour
                usecsscolor
              ></obi-vessel-type-cargo-colour>
              <obi-vessel-generic-default-colour
                usecsscolor
              ></obi-vessel-generic-default-colour>
            </div>
            <div class="chip">${mode} <span>vessel</span></div>
          </div>
        `
      )}
    </div>
  `,
};
