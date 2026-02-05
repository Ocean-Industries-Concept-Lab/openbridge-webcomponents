import type {Meta, StoryObj} from '@storybook/web-components-vite';

import {
  ObcPoiButton,
  ObcPoiButtonType,
  PoiButtonVisualState,
} from './poi-button.js';
import './poi-button.js';
import '../../../icons/icon-placeholder.js';
import {html} from 'lit';
import {ObcArAlertType} from '../../types.js';
import {crossDecorator} from '../../../storybook-util.js';
import '../../../icons/icon-collision-avoidance-overtaking.js';

const overlapToggleLoops = new Map<string, number>();

function startOverlappedLoop(id: string, pauseMs = 1000) {
  if (overlapToggleLoops.has(id)) return;
  let isOverlapped = false;
  const toggle = () => {
    const btn = document.getElementById(id) as ObcPoiButton | null;
    if (!btn) {
      const timeout = overlapToggleLoops.get(id);
      if (timeout !== undefined) {
        window.clearTimeout(timeout);
        overlapToggleLoops.delete(id);
      }
      return;
    }
    isOverlapped = !isOverlapped;
    btn.value = isOverlapped
      ? PoiButtonVisualState.Overlapped
      : PoiButtonVisualState.Unchecked;
    const timeout = window.setTimeout(toggle, pauseMs);
    overlapToggleLoops.set(id, timeout);
  };

  toggle();
}

const meta: Meta<ObcPoiButton> = {
  title: 'AR/Building blocks/POI Button',
  tags: ['autodocs'],
  component: 'obc-poi-button',
  decorators: [crossDecorator],
  args: {
    selected: false,
    type: ObcPoiButtonType.Button,
    relativeDirection: 0,
    alertType: ObcArAlertType.None,
    header: null,
    value: PoiButtonVisualState.Unchecked,
    data: [],
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
    header: {
      control: {type: 'object'},
    },
    value: {
      control: {type: 'select'},
      options: Object.values(PoiButtonVisualState),
    },
    type: {
      control: {type: 'select'},
      options: Object.values(ObcPoiButtonType),
    },
  },
  render: (args) => {
    return html`
      <obc-poi-button
        .data=${args.data}
        .selected=${args.selected}
        .relativeDirection=${args.relativeDirection}
        .alertType=${args.alertType}
        .header=${args.header}
        .value=${args.value}
        .type=${args.type}
        .hasRelation=${args.hasRelation}
      >
        <obi-placeholder></obi-placeholder>
        <obi-collision-avoidance-overtaking
          slot="relation"
          part="relation"
        ></obi-collision-avoidance-overtaking>
      </obc-poi-button>
    `;
  },
} satisfies Meta<ObcPoiButton>;

export default meta;
type Story = StoryObj<ObcPoiButton>;

export const Button: Story = {
  args: {},
};

export const Enhanced: Story = {
  args: {
    type: ObcPoiButtonType.Enhanced,
  },
};

export const Selected: Story = {
  args: {
    selected: true,
    header: {content: '1'},
  },
};

export const SelectedEnhanced: Story = {
  args: {
    selected: true,
    header: {content: '1'},
    type: ObcPoiButtonType.Enhanced,
  },
};

export const Caution: Story = {
  args: {
    selected: true,
    header: {content: '1'},
    alertType: ObcArAlertType.Caution,
  },
};

export const CautionEnhanced: Story = {
  args: {
    selected: true,
    header: {content: '1'},
    alertType: ObcArAlertType.Caution,
    type: ObcPoiButtonType.Enhanced,
  },
};

export const Warning: Story = {
  args: {
    selected: true,
    header: {content: '1'},
    alertType: ObcArAlertType.Warning,
  },
};

export const Alarm: Story = {
  args: {
    selected: true,
    header: {content: '1'},
    alertType: ObcArAlertType.Alarm,
  },
};

export const Overlapped: Story = {
  args: {
    value: PoiButtonVisualState.Overlapped,
  },
};

export const OverlappedEnhanced: Story = {
  args: {
    value: PoiButtonVisualState.Overlapped,
    type: ObcPoiButtonType.Enhanced,
  },
};

export const OverlappedWithCaution: Story = {
  args: {
    value: PoiButtonVisualState.Overlapped,
    alertType: ObcArAlertType.Caution,
  },
};

export const OverlappedWithCautionEnhanced: Story = {
  args: {
    value: PoiButtonVisualState.Overlapped,
    alertType: ObcArAlertType.Caution,
    type: ObcPoiButtonType.Enhanced,
  },
};

export const OverlappedWithWarning: Story = {
  args: {
    value: PoiButtonVisualState.Overlapped,
    alertType: ObcArAlertType.Warning,
  },
};

export const OverlappedWithAlarm: Story = {
  args: {
    value: PoiButtonVisualState.Overlapped,
    alertType: ObcArAlertType.Alarm,
  },
};

export const WithValues: Story = {
  args: {
    data: [
      {value: '10', label: 'Lab', unit: 'Unit'},
      {value: '20', label: 'Lab 2', unit: 'Unit 2'},
    ],
  },
};

export const WithValuesAndRelation: Story = {
  args: {
    data: [
      {value: '10', label: 'Lab', unit: 'Unit'},
      {value: '20', label: 'Lab 2', unit: 'Unit 2'},
    ],
    hasRelation: true,
    header: {content: '1'},
  },
  render: (args) => {
    return html`
      <obc-poi-button
        .data=${args.data}
        .selected=${args.selected}
        .relativeDirection=${args.relativeDirection}
        .alertType=${args.alertType}
        .header=${args.header}
        .value=${args.value}
        .type=${args.type}
        .hasRelation=${args.hasRelation}
      >
        <obi-placeholder></obi-placeholder>
        <obi-collision-avoidance-overtaking
          slot="relation"
          part="relation"
        ></obi-collision-avoidance-overtaking>
        <obi-placeholder slot="id-label"> </obi-placeholder>
      </obc-poi-button>
    `;
  },
};

export const WithValuesAlarm: Story = {
  args: {
    data: [
      {value: '10', label: 'Lab', unit: 'Unit'},
      {value: '20', label: 'Lab 2', unit: 'Unit 2'},
    ],
    alertType: ObcArAlertType.Alarm,
  },
};

export const WithValuesOverlapped: Story = {
  args: {
    data: [
      {value: '10', label: 'Lab', unit: 'Unit'},
      {value: '20', label: 'Lab 2', unit: 'Unit 2'},
    ],
    value: PoiButtonVisualState.Overlapped,
  },
};

export const OverlappedAnimated: Story = {
  args: {
    type: ObcPoiButtonType.Button,
  },
  parameters: {
    docs: {
      description: {
        story: 'This story loops between normal and overlapped visual states.',
      },
    },
  },
  render: (args) => {
    const targetId = args.id ?? 'animated-btn';
    requestAnimationFrame(() => startOverlappedLoop(targetId, 1000));
    return html`
      <obc-poi-button
        id="animated-btn"
        style="--obc-poi-transition-duration: 100ms; --obc-poi-opacity-transition-duration: 100ms;"
      >
        <obi-placeholder></obi-placeholder>
      </obc-poi-button>
    `;
  },
};

export const OverlappedAnimatedEnhanced: Story = {
  args: {
    type: ObcPoiButtonType.Enhanced,
  },
  parameters: {
    docs: {
      description: {
        story: 'This story loops between normal and overlapped visual states.',
      },
    },
  },
  render: () => {
    requestAnimationFrame(() =>
      startOverlappedLoop('animated-btn-enhanced', 1000)
    );
    return html`
      <obc-poi-button
        id="animated-btn-enhanced"
        style="--obc-poi-transition-duration: 100ms; --obc-poi-opacity-transition-duration: 100ms;"
        .type=${ObcPoiButtonType.Enhanced}
      >
        <obi-placeholder></obi-placeholder>
      </obc-poi-button>
    `;
  },
};
