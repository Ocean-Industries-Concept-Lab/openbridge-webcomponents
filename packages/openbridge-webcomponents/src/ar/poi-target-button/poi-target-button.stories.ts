import type {Meta, StoryObj} from '@storybook/web-components-vite';

import {
  ObcPoiTargetButton,
  ObcPoiTargetButtonType,
} from './poi-target-button.js';
import './poi-target-button.js';
import '../../icons/icon-placeholder.js';
import {html} from 'lit';
import {ObcArAlertType} from '../types.js';
import {crossDecorator} from '../../storybook-util.js';
import '../../icons/icon-collision-avoidance-overtaking.js';
const meta: Meta<ObcPoiTargetButton> = {
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
    visualState: 'normal',
    values: [],
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
    visualState: {
      control: {type: 'select'},
      options: ['normal', 'overlap'],
    },
    type: {
      control: {type: 'select'},
      options: Object.values(ObcPoiTargetButtonType),
    },
  },
  render: (args) => {
    return html`
      <obc-poi-target-button
        .values=${args.values}
        .selected=${args.selected}
        .relativeDirection=${args.relativeDirection}
        .alertType=${args.alertType}
        .selectedId=${args.selectedId}
        .visualState=${args.visualState}
        .type=${args.type}
        .hasRelation=${args.hasRelation}
      >
        <obi-placeholder></obi-placeholder>
        <obi-collision-avoidance-overtaking
          slot="relation"
          part="relation"
        ></obi-collision-avoidance-overtaking>
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
    visualState: 'overlap',
  },
};

export const OverlapEnhanced: Story = {
  args: {
    visualState: 'overlap',
    type: ObcPoiTargetButtonType.Enhanced,
  },
};

export const OverlapWithCaution: Story = {
  args: {
    visualState: 'overlap',
    alertType: ObcArAlertType.Caution,
  },
};

export const OverlapWithCautionEnhanced: Story = {
  args: {
    visualState: 'overlap',
    alertType: ObcArAlertType.Caution,
    type: ObcPoiTargetButtonType.Enhanced,
  },
};

export const OverlapWithWarning: Story = {
  args: {
    visualState: 'overlap',
    alertType: ObcArAlertType.Warning,
  },
};

export const OverlapWithAlarm: Story = {
  args: {
    visualState: 'overlap',
    alertType: ObcArAlertType.Alarm,
  },
};

export const WithValues: Story = {
  args: {
    values: [
      {value: '10', label: 'Lab', unit: 'Unit'},
      {value: '20', label: 'Lab 2', unit: 'Unit 2'},
    ],
  },
};

export const WithValuesAndRelation: Story = {
  args: {
    values: [
      {value: '10', label: 'Lab', unit: 'Unit'},
      {value: '20', label: 'Lab 2', unit: 'Unit 2'},
    ],
    hasRelation: true,
    selectedId: '1',
  },
  render: (args) => {
    return html`
      <obc-poi-target-button
        .values=${args.values}
        .selected=${args.selected}
        .relativeDirection=${args.relativeDirection}
        .alertType=${args.alertType}
        .selectedId=${args.selectedId}
        .visualState=${args.visualState}
        .type=${args.type}
        .hasRelation=${args.hasRelation}
      >
        <obi-placeholder></obi-placeholder>
        <obi-collision-avoidance-overtaking
          slot="relation"
          part="relation"
        ></obi-collision-avoidance-overtaking>
        <obi-placeholder slot="id-label"> </obi-placeholder>
      </obc-poi-target-button>
    `;
  },
};

export const WithValuesAlarm: Story = {
  args: {
    values: [
      {value: '10', label: 'Lab', unit: 'Unit'},
      {value: '20', label: 'Lab 2', unit: 'Unit 2'},
    ],
    alertType: ObcArAlertType.Alarm,
  },
};

export const WithValuesOverlap: Story = {
  args: {
    values: [
      {value: '10', label: 'Lab', unit: 'Unit'},
      {value: '20', label: 'Lab 2', unit: 'Unit 2'},
    ],
    visualState: 'overlap',
  },
};

/**
 * This story demonstrates the CSS variable animation capability.
 * Click the button to toggle size via --poi-size variable.
 */
export const AnimatedSizeToggle: Story = {
  args: {},
  render: () => {
    return html`
      <div style="padding: 50px;">
        <obc-poi-target-button id="animated-btn">
          <obi-placeholder></obi-placeholder>
        </obc-poi-target-button>
        <br /><br />
        <button
          @click=${() => {
            const btn = document.querySelector('#animated-btn') as HTMLElement;
            const currentSize =
              getComputedStyle(btn).getPropertyValue('--poi-size');
            if (currentSize && currentSize.trim() === '32px') {
              btn.style.removeProperty('--poi-size');
              btn.style.removeProperty('--obc-poi-target-icon-opacity');
            } else {
              btn.style.setProperty('--poi-size', '32px');
              btn.style.setProperty('--obc-poi-target-icon-opacity', '0');
            }
          }}
        >
          Toggle Size (32px ↔ 36px)
        </button>
      </div>
    `;
  },
};

/**
 * This story demonstrates enhanced type animation.
 */
export const AnimatedSizeToggleEnhanced: Story = {
  args: {
    type: ObcPoiTargetButtonType.Enhanced,
  },
  render: () => {
    return html`
      <div style="padding: 50px;">
        <obc-poi-target-button
          id="animated-btn-enhanced"
          .type=${ObcPoiTargetButtonType.Enhanced}
        >
          <obi-placeholder></obi-placeholder>
        </obc-poi-target-button>
        <br /><br />
        <button
          @click=${() => {
            const btn = document.querySelector(
              '#animated-btn-enhanced'
            ) as HTMLElement;
            const currentSize =
              getComputedStyle(btn).getPropertyValue('--poi-size');
            if (currentSize && currentSize.trim() === '36px') {
              btn.style.removeProperty('--poi-size');
              btn.style.removeProperty('--obc-poi-target-icon-opacity');
            } else {
              btn.style.setProperty('--poi-size', '36px');
              btn.style.setProperty('--obc-poi-target-icon-opacity', '0');
            }
          }}
        >
          Toggle Size (36px ↔ 52px)
        </button>
      </div>
    `;
  },
};
