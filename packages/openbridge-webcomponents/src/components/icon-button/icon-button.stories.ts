import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit-html';
import {IconButtonVariant, ObcIconButton} from './icon-button';
import './icon-button';
import {iconIds, iconIdToIconHtml} from '../../storybook-util';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcIconButton> = {
  title: 'Button/Icon',
  tags: ['autodocs', '6.0'],
  component: 'obc-icon-button',
  args: {
    icon: 'placeholder',
    size: 'obc-component-size-regular',
  },
  render: (args) => html`
    <obc-icon-button
      class=${args.size}
      variant=${args.variant}
      ?cornerleft=${args.cornerLeft}
      ?cornerright=${args.cornerRight}
      ?activecolor=${args.activeColor}
      ?activated=${args.activated}
      ?wide=${args.wide}
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
    size: {
      options: [
        'obc-component-size-regular',
        'obc-component-size-medium',
        'obc-component-size-large',
        'obc-component-size-xl',
      ],
      control: {type: 'select'},
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
    size: 'obc-component-size-large',
  },
};

export const NormalWide: Story = {
  args: {
    variant: IconButtonVariant.normal,
    wide: true,
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
      class=${args.size}
      variant=${args.variant}
      ?cornerleft=${args.cornerLeft}
      ?cornerright=${args.cornerRight}
      ?activecolor=${args.activeColor}
      ?activated=${args.activated}
      ?wide=${args.wide}
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
      class=${args.size}
      variant=${args.variant}
      ?cornerleft=${args.cornerLeft}
      ?cornerright=${args.cornerRight}
      ?activecolor=${args.activeColor}
      ?activated=${args.activated}
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
