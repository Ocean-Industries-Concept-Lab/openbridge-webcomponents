import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './modal-window.js';
import {ObcModalWindowSize} from './modal-window.js';
import '../../icons/icon-placeholder.js';

interface ModalWindowArgs {
  size: ObcModalWindowSize;
  hasOptionalAction: boolean;
  hasLeadingIcon: boolean;
  hasCancelAction: boolean;
  hasCloseAction: boolean;
}

const meta = {
  title: 'Application Components/Containers/Modal Window',
  component: 'obc-modal-window',
  tags: ['autodocs', '6.0'],
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(ObcModalWindowSize),
    },
  },
  args: {
    size: ObcModalWindowSize.Large,
    hasOptionalAction: true,
    hasLeadingIcon: true,
    hasCancelAction: true,
    hasCloseAction: true,
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (story) => html`
      <div style="width: 600px; height: 400px; display: flex;">${story()}</div>
    `,
  ],
} satisfies Meta<ModalWindowArgs>;

export default meta;
type Story = StoryObj<ModalWindowArgs>;

type ModalWindowTemplate = (args: ModalWindowArgs) => ReturnType<typeof html>;

const template: ModalWindowTemplate = (args) => html`
  <obc-modal-window
    .size=${args.size}
    .hasOptionalAction=${args.hasOptionalAction}
    .hasLeadingIcon=${args.hasLeadingIcon}
    .hasCancelAction=${args.hasCancelAction}
    .hasCloseAction=${args.hasCloseAction}
    @close-click=${() => console.log('Close clicked')}
    @cancel-click=${() => console.log('Cancel clicked')}
    @done-click=${() => console.log('Done clicked')}
    @option-click=${() => console.log('Option clicked')}
  >
    ${args.hasLeadingIcon
      ? html`<obi-placeholder slot="leading-icon"></obi-placeholder>`
      : ''}
    <span slot="title">Modal Title</span>
    <div slot="content" style="padding: 24px;">
      <p>This is the content area of the modal window.</p>
      <p>You can add any content here.</p>
    </div>
    <span slot="option-label">Option</span>
    <span slot="cancel-label">Cancel</span>
    <span slot="done-label">Done</span>
  </obc-modal-window>
`;

export const Large: Story = {
  render: template,
  args: {
    size: ObcModalWindowSize.Large,
  },
};

export const Medium: Story = {
  render: template,
  args: {
    size: ObcModalWindowSize.Medium,
  },
};

export const Small: Story = {
  render: template,
  args: {
    size: ObcModalWindowSize.Small,
  },
};

export const LargeWithoutOptionalAction: Story = {
  render: template,
  args: {
    size: ObcModalWindowSize.Large,
    hasOptionalAction: false,
  },
};

export const MediumWithoutOptionalAction: Story = {
  render: template,
  args: {
    size: ObcModalWindowSize.Medium,
    hasOptionalAction: false,
  },
};

export const SmallWithoutOptionalAction: Story = {
  render: template,
  args: {
    size: ObcModalWindowSize.Small,
    hasOptionalAction: false,
  },
};

export const WithoutLeadingIcon: Story = {
  render: template,
  args: {
    hasLeadingIcon: false,
  },
};

export const WithoutCancel: Story = {
  render: template,
  args: {
    hasCancelAction: false,
    hasOptionalAction: false,
  },
};

export const WithoutClose: Story = {
  render: template,
  args: {
    hasCloseAction: false,
  },
};

export const WithoutCancelAndClose: Story = {
  render: template,
  args: {
    hasCancelAction: false,
    hasCloseAction: false,
    hasOptionalAction: false,
  },
};
