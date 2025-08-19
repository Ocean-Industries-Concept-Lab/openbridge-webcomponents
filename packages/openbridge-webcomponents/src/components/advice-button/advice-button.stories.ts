import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  ObcAdviceButton,
  AdviceButtonStyle,
  type AdviceButtonClickEvent,
} from './advice-button.js';
import './advice-button.js';
import '../button/button.js';

interface AdviceButtonArgs {
  buttonStyle: AdviceButtonStyle;
  count: number;
  showCount: boolean;
  isActive: boolean;
  ariaLabel: string;
}

const meta: Meta<typeof ObcAdviceButton> = {
  title: 'Application Components/Notifications/Advice message/Advice button',
  tags: ['6.0'],
  component: 'obc-advice-button',
  decorators: [
    (story) =>
      html`<div
        style="padding: 40px; display: flex; justify-content: center; align-items: center; min-height: 200px;"
      >
        ${story()}
      </div>`,
  ],
  args: {
    buttonStyle: AdviceButtonStyle.Flat,
    count: 0,
    showCount: true,
    isActive: false,
    ariaLabel: 'Advice',
  },
  argTypes: {
    buttonStyle: {
      control: {type: 'select'},
      options: Object.values(AdviceButtonStyle),
      description:
        'Visual style of the button (Normal/Enhanced require isActive to be true)',
      table: {
        defaultValue: {summary: AdviceButtonStyle.Flat},
      },
    },
    count: {
      control: {type: 'range', min: 0, max: 150, step: 1},
      description: 'Advice count',
      table: {
        defaultValue: {summary: '0'},
      },
    },
    showCount: {
      control: {type: 'boolean'},
      description: 'Show advice count badge',
      table: {
        defaultValue: {summary: 'true'},
      },
    },
    isActive: {
      control: {type: 'boolean'},
      description: 'Active/selected state',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    ariaLabel: {
      control: {type: 'text'},
      description: 'Accessibility label',
      table: {
        defaultValue: {summary: 'Advice'},
      },
    },
  },
} satisfies Meta<ObcAdviceButton>;

export default meta;
type Story = StoryObj<ObcAdviceButton>;

const renderButton = (args: AdviceButtonArgs) => html`
  <obc-advice-button
    buttonStyle="${args.buttonStyle}"
    count="${args.count}"
    ?showCount="${args.showCount}"
    ?isActive="${args.isActive}"
    ariaLabel="${args.ariaLabel}"
    @obc-click="${(e: CustomEvent<AdviceButtonClickEvent>) => {
      console.log(
        'Advice button clicked, count:',
        e.detail.count,
        'isActive:',
        e.detail.isActive
      );
    }}"
  >
  </obc-advice-button>
`;

export const AdviceFlatInactive: Story = {
  args: {
    isActive: false,
    count: 5,
    showCount: true,
  },
  render: renderButton,
};

export const AdviceFlatActive: Story = {
  args: {
    buttonStyle: AdviceButtonStyle.Flat,
    isActive: true,
  },
  render: renderButton,
};

export const AdviceNormalWithCounter: Story = {
  args: {
    count: 3,
    showCount: true,
    isActive: true,
    buttonStyle: AdviceButtonStyle.Normal,
  },
  render: renderButton,
};

export const AdviceNormalWithoutCounter: Story = {
  args: {
    buttonStyle: AdviceButtonStyle.Normal,
    showCount: false,
    isActive: true,
  },
  render: renderButton,
};

export const AdviceEnhancedWithCounter: Story = {
  args: {
    buttonStyle: AdviceButtonStyle.Enhanced,
    count: 3,
    showCount: true,
    isActive: true,
  },
  render: renderButton,
};

export const AdviceEnhancedWithoutCounter: Story = {
  args: {
    buttonStyle: AdviceButtonStyle.Enhanced,
    showCount: false,
    isActive: true,
  },
  render: renderButton,
};
