import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, nothing} from 'lit';
import {
  ObcSequenceCard,
  ObcSequenceCardProgressType,
  ObcSequenceCardSize,
  ObcSequenceCardState,
  ObcSequenceCardTitleType,
} from './sequence-card.js';
import './sequence-card.js';
import '../icon-button/icon-button.js';
import '../../icons/icon-check-google.js';
import '../../icons/icon-close-google.js';
import '../../icons/icon-placeholder.js';
import {SequenceValue} from '../sequence-step/sequence-step.js';

type SequenceCardStoryArgs = {
  size: ObcSequenceCardSize;
  titleType: ObcSequenceCardTitleType;
  progressType: ObcSequenceCardProgressType;
  state: ObcSequenceCardState;
  isVertical: boolean;
  isHorizontal: boolean;
  hasLeadingIcon: boolean;
  cardTitle: string;
  subtitle: string;
  hasTimeStamp: boolean;
  timeLabel: string;
  time: string;
  leftTime: string;
  hasContent: boolean;
  hasConnector: boolean;
  hasActions: boolean;
  progressLabel: string;
  progressValue: SequenceValue;
};

const renderSequenceCard = (args: SequenceCardStoryArgs) => html`
  <obc-sequence-card
    .size=${args.size}
    .titleType=${args.titleType}
    .progressType=${args.progressType}
    .state=${args.state}
    .isVertical=${args.isVertical}
    .isHorizontal=${args.isHorizontal}
    .hasLeadingIcon=${args.hasLeadingIcon}
    .cardTitle=${args.cardTitle}
    .subtitle=${args.subtitle}
    .hasTimeStamp=${args.hasTimeStamp}
    .timeLabel=${args.timeLabel}
    .time=${args.time}
    .leftTime=${args.leftTime}
    .hasContent=${args.hasContent}
    .hasConnector=${args.hasConnector}
    .hasActions=${args.hasActions}
    .progressLabel=${args.progressLabel}
    .progressValue=${args.progressValue}
  >
    ${args.hasActions
      ? html`
          <div slot="actions">
            <obc-icon-button variant="flat" aria-label="Confirm">
              <obi-check-google></obi-check-google>
            </obc-icon-button>
            <obc-icon-button variant="flat" aria-label="Dismiss">
              <obi-close-google></obi-close-google>
            </obc-icon-button>
          </div>
        `
      : nothing}
  </obc-sequence-card>
`;

const meta: Meta<ObcSequenceCard> = {
  title: 'UI Components/Sections/Sequence Card',
  tags: ['6.1'],
  component: 'obc-sequence-card',
  parameters: {
    layout: 'centered',
    controls: {
      exclude: ['progressValue'],
    },
    docs: {
      description: {
        component: [
          '`<obc-sequence-card>` – Timeline-style card with progress indicator,',
          'timestamps, content, and optional actions.',
          '',
          '### Features',
          '- **Sizes:** `regular` (large step) and `small` (small step).',
          '- **Progress layouts:** `centered` or `left-side`.',
          '- **States:** `active`, `flat`, `enhanced`.',
          '- **Layouts:** vertical or horizontal.',
          '- **Actions:** slot `actions` overrides the `actions` prop fallback.',
          '',
          '### Slots',
          '- `leading-icon`, `title`, `subtitle`, `time-stamp`, `left-time-stamp`.',
          '- `actions` (optional).',
          '- Default slot for content.',
          '',
          '### Events',
          '- `action-click` – First action button clicked.',
          '- `action2-click` – Second action button clicked.',
          '',
          '### Example',
          '```html',
          '<obc-sequence-card',
          '  size="regular"',
          '  progressType="left-side"',
          '  state="active"',
          '  hasActions',
          '>',
          '  <span slot="title">Title</span>',
          '  <span slot="subtitle">Subtitle</span>',
          '  <div slot="actions">...</div>',
          '</obc-sequence-card>',
          '```',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: {
      control: {type: 'select'},
      options: Object.values(ObcSequenceCardSize),
    },
    titleType: {
      control: {type: 'select'},
      options: Object.values(ObcSequenceCardTitleType),
    },
    progressType: {
      control: {type: 'select'},
      options: Object.values(ObcSequenceCardProgressType),
    },
    state: {
      control: {type: 'select'},
      options: Object.values(ObcSequenceCardState),
    },
    isVertical: {control: {type: 'boolean'}},
    isHorizontal: {control: {type: 'boolean'}},
    hasLeadingIcon: {control: {type: 'boolean'}},
    cardTitle: {control: {type: 'text'}},
    subtitle: {control: {type: 'text'}},
    hasTimeStamp: {control: {type: 'boolean'}},
    timeLabel: {control: {type: 'text'}},
    time: {control: {type: 'text'}},
    leftTime: {control: {type: 'text'}},
    hasContent: {control: {type: 'boolean'}},
    hasConnector: {control: {type: 'boolean'}},
    hasActions: {control: {type: 'boolean'}},
  },
  args: {
    size: ObcSequenceCardSize.Regular,
    titleType: ObcSequenceCardTitleType.Single,
    progressType: ObcSequenceCardProgressType.Centered,
    state: ObcSequenceCardState.Active,
    isVertical: true,
    isHorizontal: false,
    hasLeadingIcon: true,
    cardTitle: 'Title',
    subtitle: 'Subtitle',
    hasTimeStamp: true,
    timeLabel: 'TWOL',
    time: '00:00:00',
    leftTime: '00:00',
    hasContent: true,
    hasConnector: true,
    hasActions: false,
    progressLabel: '1',
    progressValue: SequenceValue.regular,
  },
  render: (args) => renderSequenceCard(args as SequenceCardStoryArgs),
} satisfies Meta<ObcSequenceCard>;

export default meta;

type Story = StoryObj<ObcSequenceCard>;

const renderProgressStateColumn = (
  base: SequenceCardStoryArgs,
  overrides: Partial<SequenceCardStoryArgs>
) => {
  const states = [
    ObcSequenceCardState.Active,
    ObcSequenceCardState.Flat,
    ObcSequenceCardState.Enhanced,
  ];
  const progressTypes = overrides.progressType
    ? [overrides.progressType]
    : [
        ObcSequenceCardProgressType.Centered,
        ObcSequenceCardProgressType.LeftSide,
      ];
  const titleTypes = [
    ObcSequenceCardTitleType.Single,
    ObcSequenceCardTitleType.TwoLine,
    ObcSequenceCardTitleType.Description,
  ];
  const itemLabelStyle =
    'font: 10px/1.2 var(--global-typography-ui-label-font-family, inherit); text-transform: uppercase; letter-spacing: 0.04em; color: var(--element-neutral-color, #777);';
  const itemStyle = 'display: flex; flex-direction: column; gap: 6px;';

  return html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      ${progressTypes.flatMap((progressType) =>
        states.map(
          (state) => html`
            <div style=${itemStyle}>
              <div style=${itemLabelStyle}>${progressType} · ${state}</div>
              ${titleTypes.map(
                (titleType) => html`
                  <div style=${itemStyle}>
                    <div style=${itemLabelStyle}>${titleType}</div>
                    ${renderSequenceCard({
                      ...base,
                      ...overrides,
                      progressType,
                      state,
                      titleType,
                    })}
                  </div>
                `
              )}
            </div>
          `
        )
      )}
    </div>
  `;
};

export const Playground: Story = {
  args: {},
};

export const WithActions: Story = {
  args: {
    hasActions: true,
  },
};

export const RegularCentered: Story = {
  render: (args) =>
    renderProgressStateColumn(args as SequenceCardStoryArgs, {
      size: ObcSequenceCardSize.Regular,
      progressType: ObcSequenceCardProgressType.Centered,
    }),
  parameters: {
    controls: {include: []},
  },
};

export const RegularLeftSide: Story = {
  render: (args) =>
    renderProgressStateColumn(args as SequenceCardStoryArgs, {
      size: ObcSequenceCardSize.Regular,
      progressType: ObcSequenceCardProgressType.LeftSide,
    }),
  parameters: {
    controls: {include: []},
  },
};

export const SmallCentered: Story = {
  render: (args) =>
    renderProgressStateColumn(args as SequenceCardStoryArgs, {
      size: ObcSequenceCardSize.Small,
      progressType: ObcSequenceCardProgressType.Centered,
    }),
  parameters: {
    controls: {include: []},
  },
};

export const SmallLeftSide: Story = {
  render: (args) =>
    renderProgressStateColumn(args as SequenceCardStoryArgs, {
      size: ObcSequenceCardSize.Small,
      progressType: ObcSequenceCardProgressType.LeftSide,
    }),
  parameters: {
    controls: {include: []},
  },
};
