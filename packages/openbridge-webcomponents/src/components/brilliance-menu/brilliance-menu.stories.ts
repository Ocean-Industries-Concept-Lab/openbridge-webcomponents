import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcBrillianceMenu,
  ObcBrillianceInputVariant,
  ObcBrillianceMenuVariant,
} from './brilliance-menu.js';
import './brilliance-menu.js';
import {bindPopoverTrigger} from '../../internal/popover-controller.js';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcBrillianceMenu> = {
  title: 'Application Components/Menus/Brilliance Menu',
  tags: ['autodocs', '6.0'],
  component: 'obc-brilliance-menu',
  argTypes: {},
  args: {
    showLinkBrightness: true,
    showLinkPalette: true,
    showScreenControlLink: true,
  },
} satisfies Meta<ObcBrillianceMenu>;

export default meta;
type Story = StoryObj<ObcBrillianceMenu>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {},
};

export const Tabbed: Story = {
  args: {
    variant: ObcBrillianceMenuVariant.tabbed,
  },
};

export const Lumen: Story = {
  args: {
    brightness: 160,
    brightnessMax: 2000,
    brightnessUnit: 'lm',
    brightnessMinorStep: 50,
    brightnessMajorStep: 250,
    brightnessInputVariant: ObcBrillianceInputVariant.slider,
  },
};

export const NoLink: Story = {
  args: {
    showLinkBrightness: false,
    showLinkPalette: false,
    brightnessInputVariant: ObcBrillianceInputVariant.slider,
    showScreenControlLink: false,
  },
};

export const Compact: Story = {
  args: {
    variant: ObcBrillianceMenuVariant.compact,
  },
};

export const NoNightPalette: Story = {
  args: {
    showNightPalette: false,
  },
};

export const NoDuskPaletteCompact: Story = {
  args: {
    variant: ObcBrillianceMenuVariant.compact,
    showDuskPalette: false,
  },
};

/**
 * `softDismiss` hands dismissal to the browser: the menu moves to the top
 * layer, and a click outside, `Escape`, or another popover opening closes it
 * (#1293). Click the button, then click the page behind it — the click both
 * closes the menu and lands on what it hit, which is what a backdrop element
 * cannot do.
 *
 * `bindPopoverTrigger` wires the button. A naive toggle in a click handler
 * would leave the menu stuck open, because light dismiss already closed it on
 * `pointerdown`.
 */
export const SoftDismiss: Story = {
  // A live behaviour, not a look: snapshotting it would pin one frame of an
  // interaction and tell a reader nothing.
  tags: ['skip-test'],
  args: {
    softDismiss: true,
  },
  render: (args) => {
    const menu = document.createElement('obc-brilliance-menu');
    Object.assign(menu, args);
    menu.style.cssText =
      'position: fixed; position-anchor: --soft-dismiss-demo;' +
      'top: calc(anchor(bottom) + 4px); left: anchor(left);';

    const trigger = document.createElement('button');
    trigger.textContent = 'Brilliance';
    trigger.style.cssText = 'anchor-name: --soft-dismiss-demo;';
    bindPopoverTrigger(trigger, menu);

    let hits = 0;
    const behind = document.createElement('button');
    behind.textContent = 'a button behind the menu';
    behind.style.cssText = 'display: block; margin-top: 240px;';
    behind.addEventListener('click', () => {
      behind.textContent = `clicked ${++hits} time${hits === 1 ? '' : 's'}`;
    });

    const root = document.createElement('div');
    root.append(trigger, menu, behind);
    return root;
  },
};
