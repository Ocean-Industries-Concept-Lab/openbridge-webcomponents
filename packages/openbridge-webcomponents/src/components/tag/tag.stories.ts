import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcTag, TagColor, TagSize} from './tag.js';
import './tag.js';
import '../../icons/icon-placeholder.js';

const meta: Meta<ObcTag> = {
  title: 'UI Components/Selection Controls and Switches/Tag',
  tags: ['6.0'],
  component: 'obc-tag',
  argTypes: {
    label: {
      control: {type: 'text'},
    },
    color: {
      control: {type: 'select'},
      options: Object.values(TagColor),
      description: 'Color variant of the tag',
    },
    size: {
      control: {type: 'select'},
      options: Object.values(TagSize),
      description: 'Size variant of the tag',
    },
    hasIcon: {
      control: {type: 'boolean'},
      description: 'Whether to show the leading icon',
    },
  },
  args: {
    label: 'Label',
    color: TagColor.gray,
    size: TagSize.regular,
    hasIcon: true,
  },
} satisfies Meta<ObcTag>;

export default meta;
type Story = StoryObj<ObcTag>;

const tagColors = Object.values(TagColor);
const tagSizes = Object.values(TagSize);

export const Primary: Story = {
  args: {
    label: 'Label',
    hasIcon: true,
  },
  render: (args) => html`
    <obc-tag
      label="${args.label}"
      color="${args.color}"
      size="${args.size}"
      ?hasIcon="${args.hasIcon}"
    >
      <obi-placeholder></obi-placeholder>
    </obc-tag>
  `,
};

export const Large: Story = {
  args: {
    label: 'Label',
    hasIcon: true,
    size: TagSize.large,
  },
  render: (args) => html`
    <obc-tag
      label="${args.label}"
      color="${args.color}"
      size="${args.size}"
      ?hasIcon="${args.hasIcon}"
    >
      <obi-placeholder></obi-placeholder>
    </obc-tag>
  `,
};

export const AllSizesAndColors: Story = {
  args: {
    label: 'Label',
    hasIcon: true,
  },
  render: (args) => html`
    <div
      style="
        display: grid;
        grid-template-columns: repeat(${tagSizes.length}, max-content);
        align-items: center;
        gap: 16px 48px;
        padding: 24px;
      "
    >
      ${tagColors.map((color) =>
        tagSizes.map(
          (size) => html`
            <obc-tag
              label="${args.label}"
              color="${color}"
              size="${size}"
              ?hasIcon="${args.hasIcon}"
            >
              <obi-placeholder></obi-placeholder>
            </obc-tag>
          `
        )
      )}
    </div>
  `,
};

export const WithoutIcon: Story = {
  args: {
    label: 'Label',
    hasIcon: false,
  },
  render: (args) => html`
    <obc-tag
      label="${args.label}"
      color="${args.color}"
      size="${args.size}"
      ?hasIcon="${args.hasIcon}"
    >
    </obc-tag>
  `,
};

export const Gray: Story = {
  args: {
    label: 'Gray',
    color: TagColor.gray,
    hasIcon: true,
  },
  render: (args) => html`
    <obc-tag
      label="${args.label}"
      color="${args.color}"
      size="${args.size}"
      ?hasIcon="${args.hasIcon}"
    >
      <obi-placeholder></obi-placeholder>
    </obc-tag>
  `,
};

export const Blue: Story = {
  args: {
    label: 'Blue',
    color: TagColor.blue,
    hasIcon: true,
  },
  render: (args) => html`
    <obc-tag
      label="${args.label}"
      color="${args.color}"
      size="${args.size}"
      ?hasIcon="${args.hasIcon}"
    >
      <obi-placeholder></obi-placeholder>
    </obc-tag>
  `,
};

export const Cyan: Story = {
  args: {
    label: 'Cyan',
    color: TagColor.cyan,
    hasIcon: true,
  },
  render: (args) => html`
    <obc-tag
      label="${args.label}"
      color="${args.color}"
      size="${args.size}"
      ?hasIcon="${args.hasIcon}"
    >
      <obi-placeholder></obi-placeholder>
    </obc-tag>
  `,
};

export const Teal: Story = {
  args: {
    label: 'Teal',
    color: TagColor.teal,
    hasIcon: true,
  },
  render: (args) => html`
    <obc-tag
      label="${args.label}"
      color="${args.color}"
      size="${args.size}"
      ?hasIcon="${args.hasIcon}"
    >
      <obi-placeholder></obi-placeholder>
    </obc-tag>
  `,
};

export const Green: Story = {
  args: {
    label: 'Green',
    color: TagColor.green,
    hasIcon: true,
  },
  render: (args) => html`
    <obc-tag
      label="${args.label}"
      color="${args.color}"
      size="${args.size}"
      ?hasIcon="${args.hasIcon}"
    >
      <obi-placeholder></obi-placeholder>
    </obc-tag>
  `,
};

export const Yellow: Story = {
  args: {
    label: 'Yellow',
    color: TagColor.yellow,
    hasIcon: true,
  },
  render: (args) => html`
    <obc-tag
      label="${args.label}"
      color="${args.color}"
      size="${args.size}"
      ?hasIcon="${args.hasIcon}"
    >
      <obi-placeholder></obi-placeholder>
    </obc-tag>
  `,
};

export const Orange: Story = {
  args: {
    label: 'Orange',
    color: TagColor.orange,
    hasIcon: true,
  },
  render: (args) => html`
    <obc-tag
      label="${args.label}"
      color="${args.color}"
      size="${args.size}"
      ?hasIcon="${args.hasIcon}"
    >
      <obi-placeholder></obi-placeholder>
    </obc-tag>
  `,
};

export const Red: Story = {
  args: {
    label: 'Red',
    color: TagColor.red,
    hasIcon: true,
  },
  render: (args) => html`
    <obc-tag
      label="${args.label}"
      color="${args.color}"
      size="${args.size}"
      ?hasIcon="${args.hasIcon}"
    >
      <obi-placeholder></obi-placeholder>
    </obc-tag>
  `,
};

export const Purple: Story = {
  args: {
    label: 'Purple',
    color: TagColor.purple,
    hasIcon: true,
  },
  render: (args) => html`
    <obc-tag
      label="${args.label}"
      color="${args.color}"
      size="${args.size}"
      ?hasIcon="${args.hasIcon}"
    >
      <obi-placeholder></obi-placeholder>
    </obc-tag>
  `,
};

export const Indigo: Story = {
  args: {
    label: 'Indigo',
    color: TagColor.indigo,
    hasIcon: true,
  },
  render: (args) => html`
    <obc-tag
      label="${args.label}"
      color="${args.color}"
      size="${args.size}"
      ?hasIcon="${args.hasIcon}"
    >
      <obi-placeholder></obi-placeholder>
    </obc-tag>
  `,
};
