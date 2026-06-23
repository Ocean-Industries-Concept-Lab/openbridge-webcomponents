import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, nothing} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {
  ObcSequenceCard,
  ObcSequenceCardProgressType,
  ObcSequenceCardSize,
  ObcSequenceCardState,
  ObcSequenceCardTitleType,
} from './sequence-card.js';
import './sequence-card.js';
import '../button/button.js';
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
  fullWidth: boolean;
  fullHeight: boolean;
  horizontal: boolean;
  hasLeadingIcon: boolean;
  cardTitle: string;
  subtitle: string;
  hasTimeStamp: boolean;
  timeLabel: string;
  time: string;
  leftTime: string;
  hasContent: boolean;
  hasActions: boolean;
  progressLabel: string;
  progressValue: SequenceValue;
  onActionClick?: () => void;
  onAction2Click?: () => void;
};

const renderSequenceCard = (args: SequenceCardStoryArgs) => html`
  <div>
    <style>
      /* Demo-only placeholder styles for Storybook. */
      .sequence-card-story .content-placeholder {
        padding: 31px 32px 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        border-top: 1px solid var(--base-purple-100);
        background: var(--base-purple-050);
        width: 100%;
        box-sizing: border-box;
        color: var(--element-neutral-color);
      }

      .sequence-card-story .content-placeholder .placeholder-icon {
        width: 44px;
        height: 44px;
        color: var(--base-purple-300);
        fill: currentColor;
      }

      .sequence-card-story .content-placeholder .placeholder-title {
        font-family: var(--font-family-main);
        font-weight: var(--global-typography-ui-body-font-weight);
        font-size: var(--global-typography-ui-body-font-size);
        line-height: var(--global-typography-ui-body-line-height);
        font-feature-settings:
          'liga' off,
          'clig' off,
          'ss04' on;
        color: var(--base-purple-400);
      }

      .sequence-card-story .content-placeholder .placeholder-subtitle {
        font-family: var(--font-family-main);
        font-weight: var(--font-weight-regular);
        font-size: var(--global-typography-ui-label-font-size);
        line-height: var(--global-typography-ui-label-line-height);
        font-feature-settings:
          'liga' off,
          'clig' off,
          'ss04' on;
        width: 55%;
        color: var(--base-purple-400);
        text-align: center;
      }

      .sequence-card-story.progress-left-side.is-vertical
        .content-placeholder
        .placeholder-subtitle {
        width: 62%;
      }

      .sequence-card-story.progress-left-side.is-vertical.is-horizontal
        .content-placeholder
        .placeholder-subtitle {
        width: 70%;
      }
    </style>
    <obc-sequence-card
      class=${classMap({
        'sequence-card-story': true,
        'progress-left-side':
          args.progressType === ObcSequenceCardProgressType.LeftSide,
        'is-vertical': !args.horizontal,
        'is-horizontal': args.horizontal,
      })}
      .size=${args.size}
      .titleType=${args.titleType}
      .progressType=${args.progressType}
      .state=${args.state}
      .fullWidth=${args.fullWidth}
      .fullHeight=${args.fullHeight}
      .horizontal=${args.horizontal}
      .hasLeadingIcon=${args.hasLeadingIcon}
      .cardTitle=${args.cardTitle}
      .subtitle=${args.subtitle}
      .hasTimeStamp=${args.hasTimeStamp}
      .timeLabel=${args.timeLabel}
      .time=${args.time}
      .leftTime=${args.leftTime}
      .hasContent=${args.hasContent}
      .hasActions=${args.hasActions}
      .progressLabel=${args.progressLabel}
      .progressValue=${args.progressValue}
    >
      ${args.hasLeadingIcon
        ? html`
            <span slot="leading-icon">
              <obi-placeholder></obi-placeholder>
            </span>
          `
        : nothing}
      ${args.hasContent
        ? html`
            <!-- Demo-only placeholder content for Storybook. -->
            <div class="content-placeholder">
              <div class="placeholder-icon">
                <obi-placeholder></obi-placeholder>
              </div>
              <div class="placeholder-title">Content placeholder</div>
              <div class="placeholder-subtitle">
                Instance swap with custom components
              </div>
            </div>
          `
        : nothing}
      ${args.hasActions
        ? html`
            <!-- Demo-only action buttons for Storybook. -->
            <obc-button
              slot="actions"
              variant="normal"
              .showLeadingIcon=${true}
              .fullWidth=${true}
              @click=${() => args.onActionClick?.()}
            >
              <span slot="leading-icon">
                <obi-check-google></obi-check-google>
              </span>
              Label
            </obc-button>
            <obc-button
              slot="actions"
              variant="normal"
              .showLeadingIcon=${true}
              .fullWidth=${true}
              @click=${() => args.onAction2Click?.()}
            >
              <span slot="leading-icon">
                <obi-close-google></obi-close-google>
              </span>
              Label
            </obc-button>
          `
        : nothing}
    </obc-sequence-card>
  </div>
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
          '- **Actions:** provide custom buttons via the `actions` slot.',
          '',
          '### Slots',
          '- `leading-icon`, `title`, `subtitle`, `time-stamp`, `left-time-stamp`.',
          '- `actions` (optional): consumer-defined action buttons.',
          '- Default slot for content (no built-in placeholder).',
          '',
          '### Notes',
          '- The component does not emit action events by default.',
          '- Storybook uses demo-only slots/styles and logs click actions for UI preview.',
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
          '  <!-- default slot: your content -->',
          '</obc-sequence-card>',
          '```',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    onActionClick: {
      action: 'action-click',
      table: {disable: true},
    },
    onAction2Click: {
      action: 'action2-click',
      table: {disable: true},
    },
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
    cardTitle: {control: {type: 'text'}},
    subtitle: {control: {type: 'text'}},
    timeLabel: {control: {type: 'text'}},
    time: {control: {type: 'text'}},
    leftTime: {control: {type: 'text'}},
  },
  args: {
    size: ObcSequenceCardSize.Regular,
    titleType: ObcSequenceCardTitleType.Single,
    progressType: ObcSequenceCardProgressType.Centered,
    state: ObcSequenceCardState.Active,
    fullWidth: false,
    fullHeight: false,
    horizontal: false,
    hasLeadingIcon: true,
    cardTitle: 'Title',
    subtitle: 'Subtitle',
    hasTimeStamp: true,
    timeLabel: 'TWOL',
    time: '00:00:00',
    leftTime: '00:00',
    hasContent: true,
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
