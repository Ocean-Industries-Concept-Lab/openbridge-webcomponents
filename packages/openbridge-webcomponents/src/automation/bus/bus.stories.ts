import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcBus, BusSize, BusVariant} from './bus.js';
import './bus.js';
import {html} from 'lit';

const meta: Meta<typeof ObcBus> = {
  title: 'Automation/Automation Devices/Bus',
  tags: ['autodocs', '6.1', 'wip'],
  component: 'obc-bus',
  args: {
    label: 'Title',
    size: BusSize.Small,
    variant: BusVariant.Regular,
    tint: false,
    vertical: false,
  },
  argTypes: {
    size: {
      options: Object.values(BusSize),
      control: {type: 'select'},
    },
    variant: {
      options: Object.values(BusVariant),
      control: {type: 'select'},
    },
  },
} satisfies Meta<ObcBus>;

export default meta;
type Story = StoryObj<ObcBus>;

export const Default: Story = {};

export const MediumSize: Story = {
  args: {size: BusSize.Medium},
};

export const Tint: Story = {
  args: {tint: true},
};

export const Vertical: Story = {
  args: {vertical: true},
};

export const AllVariants: Story = {
  render: (args) => html`
    <div
      style="display: grid; grid-template-columns: repeat(2, 200px); gap: 24px 40px; align-items: center;"
    >
      ${[false, true].map((tint) =>
        Object.values(BusVariant).map((variant) =>
          Object.values(BusSize).map(
            (size) => html`
              <obc-bus
                .size=${size}
                .variant=${variant}
                .tint=${tint}
                label=${args.label}
              ></obc-bus>
            `
          )
        )
      )}
    </div>
  `,
};
