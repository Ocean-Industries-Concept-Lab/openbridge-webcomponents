import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, nothing} from 'lit';
import {ObcSequenceModalType} from './sequence-modal.js';
import './sequence-modal.js';
import '../button/button.js';
import '../../icons/icon-placeholder.js';

type SequenceModalStoryArgs = {
  type: ObcSequenceModalType;
  modalTitle: string;
  subtitle: string;
  stepLabel: string;
  hasTimeStamp: boolean;
  timeValue: string;
  timeLabel: string;
  hasActions: boolean;
  'action-1-click'?: (event?: PointerEvent) => void;
  'action-2-click'?: (event?: PointerEvent) => void;
  'close-click'?: (event?: CustomEvent) => void;
};

const renderSequenceModal = (args: SequenceModalStoryArgs) => {
  const onCloseClick = args['close-click'] ?? (() => undefined);
  const onAction1Click = args['action-1-click'] ?? (() => undefined);
  const onAction2Click = args['action-2-click'] ?? (() => undefined);
  return html`
    <div style="display: flex; justify-content: center;">
      <style>
        /* Demo-only placeholder styles for Storybook. */
        .sequence-modal-story .content-placeholder {
          padding: 31px 32px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          justify-content: center;
          border-top: 1px solid var(--base-purple-100);
          background: var(--base-purple-050);
          width: 100%;
          box-sizing: border-box;
          color: var(--element-neutral-color);
        }

        .sequence-modal-story .content-placeholder .placeholder-icon {
          width: 44px;
          height: 44px;
          color: var(--base-purple-300);
          fill: currentColor;
        }

        .sequence-modal-story .content-placeholder .placeholder-title {
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

        .sequence-modal-story .content-placeholder .placeholder-subtitle {
          font-family: var(--font-family-main);
          font-weight: var(--font-weight-regular);
          font-size: var(--global-typography-ui-label-font-size);
          line-height: var(--global-typography-ui-label-line-height);
          font-feature-settings:
            'liga' off,
            'clig' off,
            'ss04' on;
          width: 30%;
          color: var(--base-purple-400);
          text-align: center;
        }
      </style>
      <obc-sequence-modal
        class="sequence-modal-story"
        .type=${args.type}
        .modalTitle=${args.modalTitle}
        .subtitle=${args.subtitle}
        .stepLabel=${args.stepLabel}
        .hasTimeStamp=${args.hasTimeStamp}
        .timeValue=${args.timeValue}
        .timeLabel=${args.timeLabel}
        .hasActions=${args.hasActions}
        @close-click=${onCloseClick}
      >
        <div class="content-placeholder">
          <div class="placeholder-icon">
            <obi-placeholder></obi-placeholder>
          </div>
          <div class="placeholder-title">Content placeholder</div>
          <div class="placeholder-subtitle">
            Instance swap with custom components
          </div>
        </div>
        ${args.hasActions
          ? html`
              <obc-button
                slot="actions"
                variant="normal"
                .showLeadingIcon=${true}
                @click=${(event: PointerEvent) => onAction1Click(event)}
              >
                <span slot="leading-icon">
                  <obi-placeholder></obi-placeholder>
                </span>
                Label
              </obc-button>
              <obc-button
                slot="actions"
                variant="raised"
                .showLeadingIcon=${true}
                @click=${(event: PointerEvent) => onAction2Click(event)}
              >
                <span slot="leading-icon">
                  <obi-placeholder></obi-placeholder>
                </span>
                Label
              </obc-button>
            `
          : nothing}
      </obc-sequence-modal>
    </div>
  `;
};

const meta: Meta<SequenceModalStoryArgs> = {
  title: 'UI Components/Sections/Sequence Modal',
  tags: ['6.1'],
  component: 'obc-sequence-modal',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          '`<obc-sequence-modal>` – Sequence modal card with step indicator,',
          'timestamp, content, and actions.',
          '',
          '### Slots',
          '- `actions` (optional).',
          '- Default slot for content.',
          '',
          '### Events',
          '- `close-click`.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    type: {
      control: {type: 'select'},
      options: Object.values(ObcSequenceModalType),
    },
    modalTitle: {control: {type: 'text'}},
    subtitle: {control: {type: 'text'}},
    stepLabel: {control: {type: 'text'}},
    timeValue: {control: {type: 'text'}},
    timeLabel: {control: {type: 'text'}},
    'close-click': {action: 'close-click'},
    'action-1-click': {action: 'action-1-click'},
    'action-2-click': {action: 'action-2-click'},
  },
  args: {
    type: ObcSequenceModalType.Regular,
    modalTitle: 'Step title',
    subtitle: 'Subtitle',
    stepLabel: '1',
    hasTimeStamp: true,
    timeValue: '00:00:00',
    timeLabel: 'EST',
    hasActions: true,
  },
  render: (args) => renderSequenceModal(args as SequenceModalStoryArgs),
} satisfies Meta<SequenceModalStoryArgs>;

export default meta;

type Story = StoryObj<SequenceModalStoryArgs>;

export const Playground: Story = {
  args: {},
};

export const Regular: Story = {
  args: {
    type: ObcSequenceModalType.Regular,
  },
};

export const TwoLine: Story = {
  args: {
    type: ObcSequenceModalType.TwoLine,
  },
};
