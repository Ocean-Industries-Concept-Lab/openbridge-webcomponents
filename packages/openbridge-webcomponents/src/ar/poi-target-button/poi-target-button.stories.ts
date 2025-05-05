import type {Meta, StoryObj} from '@storybook/web-components';

import {
  ObcPoiTargetButton,
  ObcPoiTargetButtonType,
} from './poi-target-button.js';
import './poi-target-button.js';
import '../../icons/icon-placeholder.js';
import {html} from 'lit';
import {ObcArAlertType} from '../types.js';
import {crossDecorator} from '../../storybook-util.js';
const meta: Meta<typeof ObcPoiTargetButton> = {
  title: 'AR/POI Target Button',
  tags: ['autodocs'],
  component: 'obc-poi-target-button',
  decorators: [crossDecorator],
  args: {
    selected: false,
    type: ObcPoiTargetButtonType.Button,
    relativeDirection: 0,
    alertType: ObcArAlertType.None,
    selectedId: null,
    overlap: false,
  },
  argTypes: {
    relativeDirection: {
      control: {type: 'range', min: 0, max: 360},
    },
    selected: {
      control: {type: 'boolean'},
    },
    alertType: {
      control: {type: 'select'},
      options: Object.values(ObcArAlertType),
    },
    selectedId: {
      control: {type: 'text'},
    },
    overlap: {
      control: {type: 'boolean'},
    },
    type: {
      control: {type: 'select'},
      options: Object.values(ObcPoiTargetButtonType),
    },
  },
  render: (args) => {
    return html`
      <obc-poi-target-button
        .selected=${args.selected}
        .relativeDirection=${args.relativeDirection}
        .alertType=${args.alertType}
        .selectedId=${args.selectedId}
        .overlap=${args.overlap}
        .type=${args.type}
      >
        <obi-placeholder></obi-placeholder>
      </obc-poi-target-button>
    `;
  },
} satisfies Meta<ObcPoiTargetButton>;

export default meta;
type Story = StoryObj<ObcPoiTargetButton>;

export const Button: Story = {
  args: {},
};

export const Enhanced: Story = {
  args: {
    type: ObcPoiTargetButtonType.Enhanced,
  },
};

export const Selected: Story = {
  args: {
    selected: true,
    selectedId: '1',
  },
};

export const SelectedEnhanced: Story = {
  args: {
    selected: true,
    selectedId: '1',
    type: ObcPoiTargetButtonType.Enhanced,
  },
};

export const Caution: Story = {
  args: {
    selected: true,
    selectedId: '1',
    alertType: ObcArAlertType.Caution,
  },
};

export const CautionEnhanced: Story = {
  args: {
    selected: true,
    selectedId: '1',
    alertType: ObcArAlertType.Caution,
    type: ObcPoiTargetButtonType.Enhanced,
  },
};

export const Warning: Story = {
  args: {
    selected: true,
    selectedId: '1',
    alertType: ObcArAlertType.Warning,
  },
};

export const Alarm: Story = {
  args: {
    selected: true,
    selectedId: '1',
    alertType: ObcArAlertType.Alarm,
  },
};

export const Overlap: Story = {
  args: {
    overlap: true,
  },
};

export const OverlapEnhanced: Story = {
  args: {
    overlap: true,
    type: ObcPoiTargetButtonType.Enhanced,
  },
};

export const OverlapWithCaution: Story = {
  args: {
    overlap: true,
    alertType: ObcArAlertType.Caution,
  },
};

export const OverlapWithCautionEnhanced: Story = {
  args: {
    overlap: true,
    alertType: ObcArAlertType.Caution,
    type: ObcPoiTargetButtonType.Enhanced,
  },
};

export const OverlapWithWarning: Story = {
  args: {
    overlap: true,
    alertType: ObcArAlertType.Warning,
  },
};

export const OverlapWithAlarm: Story = {
  args: {
    overlap: true,
    alertType: ObcArAlertType.Alarm,
  },
};
