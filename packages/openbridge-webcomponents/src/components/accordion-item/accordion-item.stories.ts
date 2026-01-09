import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcAccordionItem} from './accordion-item.js';
import './accordion-item.js';
import '../../icons/icon-placeholder.js';

const renderAccordionItem = (args: ObcAccordionItem) => html`
  <obc-accordion-item
    .title="${args.title}"
    .open="${args.open}"
    .disabled="${args.disabled}"
    .showContent="${args.showContent}"
    .showDivider="${args.showDivider}"
  >
    <div slot="expanded-content" style="margin: 16px;">
      <div
        style="background: #f3e7f3; height: 140px; padding: 32px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; border-radius: 4px;"
      >
        <div
          style="width: 48px; height: 48px; background: #935e92; border-radius: 50%; display: flex; align-items: center; justify-content: center;"
        >
          <obi-placeholder
            style="color: white; width: 24px; height: 24px;"
          ></obi-placeholder>
        </div>
        <div
          style="color: #935e92; font-size: 16px; font-weight: 370; text-align: center;"
        >
          Content placeholder
        </div>
        <div
          style="color: #935e92; font-size: 12px; font-weight: 370; text-align: center;"
        >
          Instance swap with custom components
        </div>
      </div>
    </div>
  </obc-accordion-item>
`;

const meta: Meta<ObcAccordionItem> = {
  title: 'UI Components/Sections/Accordion Item',
  tags: ['6.0'],
  globals: {
    backgrounds: {
      value: 'container-section-color',
    },
  },
  component: 'obc-accordion-item',
  argTypes: {
    title: {
      control: {type: 'text'},
    },
    open: {
      control: {type: 'boolean'},
    },
    disabled: {
      control: {type: 'boolean'},
    },
    showDivider: {
      control: {type: 'boolean'},
    },
  },
  args: {
    title: 'Title',
    open: false,
    disabled: false,
    showDivider: false,
  },
} satisfies Meta<ObcAccordionItem>;

export default meta;
type Story = StoryObj<ObcAccordionItem>;

export const Primary: Story = {
  args: {
    title: 'Accordion Item',
    open: false,
  },
  render: renderAccordionItem,
};

export const Open: Story = {
  args: {
    title: 'Open Item',
    open: true,
  },
  render: renderAccordionItem,
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Item',
    disabled: true,
    open: false,
  },
  render: renderAccordionItem,
};

export const DisabledOpen: Story = {
  args: {
    title: 'Disabled Open',
    disabled: true,
    open: true,
  },
  render: renderAccordionItem,
};

export const WithDivider: Story = {
  args: {
    title: 'Item with Divider',
    open: false,
    showDivider: true,
  },
  render: renderAccordionItem,
};

export const CustomContent: Story = {
  args: {
    title: 'Custom Content',
    open: true,
  },
  render: (args) => html`
    <obc-accordion-item
      .title=${args.title}
      .open=${args.open}
      .disabled=${args.disabled}
    >
      <div slot="expanded-content" style="margin: 16px;">
        <p
          style="margin: 0; color: #535353; font-size: 16px; line-height: 24px;"
        >
          This is custom content that can be anything you want. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </obc-accordion-item>
  `,
};

export const Multiple: Story = {
  args: {
    title: 'Multiple Items',
  },
  render: () => html`
    <div style="display: flex; flex-direction: column;">
      <obc-accordion-item
        title="First Item"
        .open=${false}
        .showDivider=${true}
      >
        <div slot="expanded-content" style="margin: 16px;">
          <div style="background: #f3e7f3; padding: 16px; border-radius: 4px;">
            Content for first accordion item
          </div>
        </div>
      </obc-accordion-item>

      <obc-accordion-item
        title="Second Item (Open)"
        .open=${true}
        .showDivider=${true}
      >
        <div slot="expanded-content" style="margin: 16px;">
          <div style="background: #f3e7f3; padding: 16px; border-radius: 4px;">
            Content for second accordion item that is open by default
          </div>
        </div>
      </obc-accordion-item>

      <obc-accordion-item
        title="Third Item"
        .open=${false}
        .showDivider=${true}
      >
        <div slot="expanded-content" style="margin: 16px;">
          <div style="background: #f3e7f3; padding: 16px; border-radius: 4px;">
            Content for third accordion item
          </div>
        </div>
      </obc-accordion-item>

      <obc-accordion-item
        title="Last Item (No Divider)"
        .disabled=${false}
        .open=${false}
        .showDivider=${false}
      >
        <div slot="expanded-content" style="margin: 16px;">
          <div style="background: #f3e7f3; padding: 16px; border-radius: 4px;">
            Last item typically doesn't need a divider
          </div>
        </div>
      </obc-accordion-item>
    </div>
  `,
};
