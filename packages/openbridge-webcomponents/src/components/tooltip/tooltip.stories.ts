import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcTooltip, TooltipType, TooltipVariant} from './tooltip.js';
import './tooltip.js';
import {html, nothing} from 'lit';
import '../../icons/icon-placeholder.js';

const meta: Meta<typeof ObcTooltip> = {
  title: 'UI Components/Message and alerts/Tooltip',
  tags: ['autodocs'],
  component: 'obc-tooltip',
  args: {
    type: TooltipType.label,
    variant: TooltipVariant.normal,
    label: 'Label',
    showIcon: false,
  },
  render: (args) =>
    html`<obc-tooltip
      type="${args.type}"
      variant="${args.variant}"
      label="${args.label}"
      .showIcon=${args.showIcon}
    >
      ${args.type === TooltipType.icon ||
      (args.type === TooltipType.label && args.showIcon)
        ? html`<obi-placeholder slot="icon"></obi-placeholder>`
        : nothing}
    </obc-tooltip>`,
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: Object.values(TooltipType),
      description: 'Type of tooltip display',
    },
    variant: {
      control: {
        type: 'select',
      },
      options: Object.values(TooltipVariant),
      description: 'Visual style and semantic meaning of the tooltip',
    },
    label: {
      control: 'text',
      description:
        'Text content displayed in the tooltip (only used when type="label")',
      if: {arg: 'type', eq: TooltipType.label},
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show the leading icon when type="label"',
      if: {arg: 'type', eq: TooltipType.label},
    },
  },
} satisfies Meta<ObcTooltip>;

export default meta;
type Story = StoryObj<ObcTooltip>;

export const NormalWithLabelAndIcon: Story = {
  args: {
    type: TooltipType.label,
    variant: TooltipVariant.normal,
    label: 'Label',
    showIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays text with a leading icon. Provides both visual and textual context.',
      },
    },
  },
};

export const NormalWithLabelOnly: Story = {
  args: {
    type: TooltipType.label,
    variant: TooltipVariant.normal,
    label: 'Label',
    showIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays only text in the tooltip. Clean and minimal for simple labels.',
      },
    },
  },
};

export const NormalWithIconOnly: Story = {
  args: {
    type: TooltipType.icon,
    variant: TooltipVariant.normal,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays only an icon in the tooltip. Useful for status indicators or simple visual cues.',
      },
    },
  },
};

export const Raised: Story = {
  args: {
    type: TooltipType.label,
    variant: TooltipVariant.raised,
    label: 'Label',
    showIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Elevated visual style with raised appearance.',
      },
    },
  },
};

export const Enhanced: Story = {
  args: {
    type: TooltipType.label,
    variant: TooltipVariant.enhanced,
    label: 'Label',
    showIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Enhanced/highlighted tooltip with blue background for important notifications.',
      },
    },
  },
};

export const Eco: Story = {
  args: {
    type: TooltipType.label,
    variant: TooltipVariant.eco,
    label: 'Label',
    showIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Environmental or positive state indicator with green background.',
      },
    },
  },
};

export const Alarm: Story = {
  args: {
    type: TooltipType.label,
    variant: TooltipVariant.alarm,
    label: 'Label',
    showIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Signals critical or urgent conditions with red background.',
      },
    },
  },
};

export const Warning: Story = {
  args: {
    type: TooltipType.label,
    variant: TooltipVariant.warning,
    label: 'Label',
    showIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Highlights warnings or potential problems with orange background.',
      },
    },
  },
};

export const Caution: Story = {
  args: {
    type: TooltipType.label,
    variant: TooltipVariant.caution,
    label: 'Label',
    showIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Indicates caution or minor issues with yellow background.',
      },
    },
  },
};
