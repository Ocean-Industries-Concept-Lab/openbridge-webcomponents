import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit-html';
import {ObcPoiTargetButton} from './poi-target-button';
import './poi-target-button';

const meta: Meta<typeof ObcPoiTargetButton> = {
  title: 'Button/POI Target Button',
  tags: ['autodocs'],
  component: 'obc-poi-target-button',
  args: {
    size: 'regular',
    type: 'vessel',
    variant: 'normal',
    value: 'checked',
    selected: false,
  },
  argTypes: {
    variant: {
      options: ['normal', 'flat', 'raised'],
      control: {type: 'select'},
    },
    value: {
      options: ['normal', 'checked'],
      control: {type: 'select'},
    },
  },
  render: (args) => html`
    <obc-poi-target-button
      size=${args.size}
      variant=${args.variant}
      type=${args.type}
      value=${args.value}
      ?selected=${args.selected}
    >
    </obc-poi-target-button>
  `,
} satisfies Meta<ObcPoiTargetButton>;

export default meta;
type Story = StoryObj<ObcPoiTargetButton>;

export const Primary: Story = {
  args: {},
};
