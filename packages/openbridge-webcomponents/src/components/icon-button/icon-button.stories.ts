import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit-html';
import {IconButtonVariant, ObcIconButton} from './icon-button.js';
import './icon-button.js';
import {iconIds, iconIdToIconHtml} from '../../storybook-util.js';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcIconButton> = {
  title: 'Button/Icon',
  tags: ['autodocs', '6.0'],
  component: 'obc-icon-button',
  args: {
    icon: 'placeholder',
  },
  render: (args) => html`
    <obc-icon-button
      variant=${args.variant}
      ?cornerleft=${args.cornerLeft}
      ?cornerright=${args.cornerRight}
      ?activecolor=${args.activeColor}
      ?activated=${args.activated}
      ?wide=${args.wide}
      ?disabled=${args.disabled}
      .progress=${args.progress}
    >
      ${iconIdToIconHtml(args.icon)}
    </obc-icon-button>
  `,
  argTypes: {
    icon: {
      options: iconIds,
      control: {type: 'select'},
    },
    variant: {
      options: Object.values(IconButtonVariant),
      control: {type: 'select'},
    },
    progress: {
      control: {type: 'range', min: 0, max: 100, step: 1},
    },
  },
} satisfies Meta<ObcIconButton>;

export default meta;
type Story = StoryObj<ObcIconButton>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Normal: Story = {
  args: {
    variant: IconButtonVariant.normal,
  },
};

export const Large: Story = {
  args: {
    variant: IconButtonVariant.normal,
  },
  globals: {
    componentSize: 'obc-component-size-large',
  },
};

export const NormalWide: Story = {
  args: {
    variant: IconButtonVariant.normal,
    wide: true,
  },
};

export const Disabled: Story = {
  args: {
    variant: IconButtonVariant.normal,
    disabled: true,
  },
};

export const Raised: Story = {
  args: {
    variant: IconButtonVariant.raised,
  },
};

export const Flat: Story = {
  args: {
    variant: IconButtonVariant.flat,
  },
};

export const NormalWithLabel: Story = {
  args: {
    variant: IconButtonVariant.normal,
    label: 'Label',
  },
  render: (args) => html`
    <obc-icon-button
      variant=${args.variant}
      ?cornerleft=${args.cornerLeft}
      ?cornerright=${args.cornerRight}
      ?activecolor=${args.activeColor}
      ?activated=${args.activated}
      ?wide=${args.wide}
      ?disabled=${args.disabled}
    >
      ${iconIdToIconHtml(args.icon)}
      <span slot="label">${args.label}</span>
    </obc-icon-button>
  `,
};

export const WideWithLabel: Story = {
  args: {
    variant: IconButtonVariant.normal,
    label: 'Label',
    wide: true,
  },
  render: (args) => html`
    <obc-icon-button
      variant=${args.variant}
      ?cornerleft=${args.cornerLeft}
      ?cornerright=${args.cornerRight}
      ?activecolor=${args.activeColor}
      ?activated=${args.activated}
      ?disabled=${args.disabled}
      ?wide=${args.wide}
    >
      ${iconIdToIconHtml(args.icon)}
      <span slot="label">${args.label}</span>
    </obc-icon-button>
  `,
};

export const FlatActivated: Story = {
  args: {
    variant: IconButtonVariant.flat,
    activated: true,
  },
};

export const CornerLeft: Story = {
  args: {
    variant: IconButtonVariant.normal,
    cornerLeft: true,
  },
};

export const CornerRight: Story = {
  args: {
    variant: IconButtonVariant.normal,
    cornerRight: true,
  },
};

export const Progress: Story = {
  args: {
    variant: IconButtonVariant.flat,
    progress: 50,
  },
};
