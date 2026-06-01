import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcBrillianceMenu,
  ObcBrillianceInputVariant,
  ObcBrillianceMenuVariant,
} from './brilliance-menu.js';
import './brilliance-menu.js';

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
