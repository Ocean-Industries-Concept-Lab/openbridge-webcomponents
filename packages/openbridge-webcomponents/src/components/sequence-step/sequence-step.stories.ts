import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, nothing, type LitElement} from 'lit';
import './sequence-step.js';
import {
  SequenceOrientation,
  SequenceStyle,
  SequenceType,
  SequenceValue,
} from './sequence-step.js';
import {iconIds, iconIdToIconHtml} from '../../storybook-util.js';

/**
 * Force all loading spinners inside sequence steps to their final state
 * so visual snapshots are deterministic.
 */
const settleLoadingSpinners: Story['play'] = async ({canvasElement}) => {
  const steps = canvasElement.querySelectorAll('obc-sequence-step');
  for (const step of steps) {
    await (step as LitElement).updateComplete;
    const spinner = step.shadowRoot?.querySelector(
      'obc-sequence-loading-spinner'
    ) as (LitElement & {progressPercent: number}) | null;
    if (spinner) {
      spinner.progressPercent = 100;
      await spinner.updateComplete;
    }
  }
};

const states: SequenceValue[] = [
  SequenceValue.notStarted,
  SequenceValue.regular,
  SequenceValue.loading,
  SequenceValue.next,
  SequenceValue.active,
  SequenceValue.completed,
];

const cardStyle = `
  border: 1px solid var(--container-border-color, #d5d7de);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 140px;
  text-align: center;
`;

const meta: Meta = {
  title: 'Automation/Sequence Step',
  component: 'obc-sequence-step',
  parameters: {layout: 'centered'},
  argTypes: {
    type: {control: 'select', options: Object.values(SequenceType)},
    styleType: {control: 'select', options: Object.values(SequenceStyle)},
    value: {control: 'select', options: states},
    orientation: {
      control: 'select',
      options: Object.values(SequenceOrientation),
    },
    showStepInputConnector: {control: 'boolean'},
    showStepOutputConnector: {control: 'boolean'},
    hasIcon: {control: 'boolean'},
    leadingIcon: {
      control: {type: 'select'},
      options: iconIds,
    },
    label: {control: 'text'},
  },
  args: {
    type: SequenceType.medium,
    styleType: SequenceStyle.regular,
    value: SequenceValue.regular,
    orientation: SequenceOrientation.horizontal,
    showStepInputConnector: true,
    showStepOutputConnector: true,
    hasIcon: true,
    leadingIcon: 'placeholder',
    label: 'Label',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const renderStateGrid = ({
  type,
  styleType,
  orientations = [SequenceOrientation.horizontal],
  includeIcon = styleType === SequenceStyle.regular &&
    type !== SequenceType.small,
  iconId = 'placeholder',
  labelText = 'Label',
}: {
  type: SequenceType;
  styleType: SequenceStyle;
  orientations?: SequenceOrientation[];
  includeIcon?: boolean;
  iconId?: string;
  labelText?: string;
}) => html`
  <div style="display: flex; flex-direction: column; gap: 32px;">
    ${orientations.map(
      (orientation) => html`
        <div>
          <strong style="display: block; margin-bottom: 12px;"
            >${orientation === SequenceOrientation.horizontal
              ? 'Horizontal'
              : 'Vertical'}</strong
          >
          <div
            style="display: flex; flex-wrap: wrap; gap: 16px; justify-content: center;"
          >
            ${states.map(
              (value) => html`
                <div style=${cardStyle}>
                  <span style="text-transform: capitalize;">${value}</span>
                  <obc-sequence-step
                    .type=${type}
                    .styleType=${styleType}
                    .value=${value}
                    .orientation=${orientation}
                    .hasIcon=${includeIcon}
                  >
                    ${includeIcon
                      ? iconIdToIconHtml(iconId, {
                          slot: 'leading-icon',
                          useCssColor: '',
                        })
                      : nothing}
                    ${labelText}
                  </obc-sequence-step>
                </div>
              `
            )}
          </div>
        </div>
      `
    )}
  </div>
`;

export const Playground: Story = {
  render: (args) => {
    const labelText =
      args.styleType === SequenceStyle.point &&
      (args.type === SequenceType.medium || args.type === SequenceType.large)
        ? '1'
        : args.label;
    return html`
      <obc-sequence-step
        .type=${args.type}
        .styleType=${args.styleType}
        .value=${args.value}
        .orientation=${args.orientation}
        .showStepInputConnector=${args.showStepInputConnector}
        .showStepOutputConnector=${args.showStepOutputConnector}
        .hasIcon=${args.hasIcon}
      >
        ${args.hasIcon
          ? iconIdToIconHtml(args.leadingIcon as string, {
              slot: 'leading-icon',
              useCssColor: '',
            })
          : nothing}
        ${labelText}
      </obc-sequence-step>
    `;
  },
};

export const TypeOverview: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 32px; flex-wrap: wrap; justify-content: center;"
    >
      ${[
        {
          label: 'Small Indicator',
          type: SequenceType.small,
          style: SequenceStyle.regular,
        },
        {
          label: 'Medium Tag',
          type: SequenceType.medium,
          style: SequenceStyle.regular,
        },
        {
          label: 'Large Button',
          type: SequenceType.large,
          style: SequenceStyle.regular,
        },
      ].map(
        (item) => html`
          <div style=${cardStyle}>
            <strong>${item.label}</strong>
            <obc-sequence-step
              .type=${item.type}
              .styleType=${item.style}
              .value=${SequenceValue.regular}
              .orientation=${SequenceOrientation.horizontal}
              .hasIcon=${item.type !== SequenceType.small}
            >
              ${item.type !== SequenceType.small
                ? iconIdToIconHtml('placeholder', {
                    slot: 'leading-icon',
                    useCssColor: '',
                  })
                : nothing}
              Label
            </obc-sequence-step>
          </div>
        `
      )}
    </div>
  `,
};

export const SmallRegularStates: Story = {
  name: 'Small • Regular States',
  render: () =>
    renderStateGrid({
      type: SequenceType.small,
      styleType: SequenceStyle.regular,
      orientations: [SequenceOrientation.horizontal],
      includeIcon: false,
    }),
  play: settleLoadingSpinners,
};

export const SmallPointStates: Story = {
  name: 'Small • Point States',
  render: () =>
    renderStateGrid({
      type: SequenceType.small,
      styleType: SequenceStyle.point,
      orientations: [SequenceOrientation.horizontal],
      includeIcon: false,
    }),
  play: settleLoadingSpinners,
};

export const MediumRegularStates: Story = {
  name: 'Medium • Regular States',
  render: () =>
    renderStateGrid({
      type: SequenceType.medium,
      styleType: SequenceStyle.regular,
      orientations: [
        SequenceOrientation.horizontal,
        SequenceOrientation.vertical,
      ],
    }),
  play: settleLoadingSpinners,
};

export const MediumPointStates: Story = {
  name: 'Medium • Point States',
  render: () =>
    renderStateGrid({
      type: SequenceType.medium,
      styleType: SequenceStyle.point,
      orientations: [
        SequenceOrientation.horizontal,
        SequenceOrientation.vertical,
      ],
      includeIcon: false,
      labelText: '1',
    }),
  play: settleLoadingSpinners,
};

export const LargeButtonStates: Story = {
  name: 'Large • Regular States',
  render: () =>
    renderStateGrid({
      type: SequenceType.large,
      styleType: SequenceStyle.regular,
      orientations: [
        SequenceOrientation.horizontal,
        SequenceOrientation.vertical,
      ],
    }),
  play: settleLoadingSpinners,
};

export const LargePointStates: Story = {
  name: 'Large • Point States',
  render: () =>
    renderStateGrid({
      type: SequenceType.large,
      styleType: SequenceStyle.point,
      orientations: [
        SequenceOrientation.horizontal,
        SequenceOrientation.vertical,
      ],
      includeIcon: false,
      labelText: '1',
    }),
  play: settleLoadingSpinners,
};

export const ConnectorStyles: Story = {
  name: 'Connector Style States',
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 32px; max-width: 900px;"
    >
      ${[SequenceType.small, SequenceType.medium, SequenceType.large].map(
        (type) => html`
          <div>
            <strong style="display:block; margin-bottom: 12px;"
              >${type.charAt(0).toUpperCase() + type.slice(1)} connector</strong
            >
            <div
              style="display:flex; gap:16px; flex-wrap:wrap; justify-content:center;"
            >
              ${[
                SequenceValue.notStarted,
                SequenceValue.loading,
                SequenceValue.next,
                SequenceValue.active,
                SequenceValue.completed,
              ].map(
                (value) => html`
                  <div style=${cardStyle}>
                    <span>${value}</span>
                    <obc-sequence-step
                      .type=${type}
                      .styleType=${SequenceStyle.connector}
                      .value=${value}
                      .orientation=${SequenceOrientation.horizontal}
                      .hasIcon=${false}
                    ></obc-sequence-step>
                  </div>
                `
              )}
            </div>
          </div>
        `
      )}
    </div>
  `,
};

export const ConnectorStylesVertical: Story = {
  name: 'Connector Style States • Vertical',
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 32px; align-items: center;"
    >
      ${[SequenceType.small, SequenceType.medium, SequenceType.large].map(
        (type) => html`
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <strong
              style="display:block; margin-bottom: 12px; text-align:center;"
              >${type.charAt(0).toUpperCase() + type.slice(1)} connector</strong
            >
            <div
              style="display:flex; gap:16px; flex-wrap:wrap; justify-content:center;"
            >
              ${[
                SequenceValue.notStarted,
                SequenceValue.loading,
                SequenceValue.next,
                SequenceValue.active,
                SequenceValue.completed,
              ].map(
                (value) => html`
                  <div style=${cardStyle}>
                    <span>${value}</span>
                    <obc-sequence-step
                      .type=${type}
                      .styleType=${SequenceStyle.connector}
                      .value=${value}
                      orientation=${SequenceOrientation.vertical}
                      .hasIcon=${false}
                    ></obc-sequence-step>
                  </div>
                `
              )}
            </div>
          </div>
        `
      )}
    </div>
  `,
};

export const ConnectorFlags: Story = {
  render: () => {
    const variants = [
      {
        label: 'Icon + Both connectors',
        hasIcon: true,
        hasInput: true,
        hasOutput: true,
      },
      {
        label: 'No input connector',
        hasIcon: true,
        hasInput: false,
        hasOutput: true,
      },
      {
        label: 'No output connector',
        hasIcon: true,
        hasInput: true,
        hasOutput: false,
      },
      {label: 'No icon', hasIcon: false, hasInput: true, hasOutput: true},
    ];
    return html`
      <div
        style="display:flex; gap:16px; flex-wrap:wrap; justify-content:center;"
      >
        ${variants.map(
          (variant) => html`
            <div style=${cardStyle}>
              <span>${variant.label}</span>
              <obc-sequence-step
                .type=${SequenceType.large}
                .styleType=${SequenceStyle.regular}
                .value=${SequenceValue.regular}
                .orientation=${SequenceOrientation.horizontal}
                .showStepInputConnector=${variant.hasInput}
                .showStepOutputConnector=${variant.hasOutput}
                .hasIcon=${variant.hasIcon}
              >
                ${variant.hasIcon
                  ? iconIdToIconHtml('placeholder', {
                      slot: 'leading-icon',
                      useCssColor: '',
                    })
                  : nothing}
                Label
              </obc-sequence-step>
            </div>
          `
        )}
      </div>
    `;
  },
};

export const OrientationShowcase: Story = {
  render: () => html`
    <div style="display:flex; flex-direction:column; gap:24px;">
      ${[SequenceType.small, SequenceType.medium, SequenceType.large].map(
        (type) => html`
          <div
            style="display:flex; gap:24px; flex-wrap:wrap; justify-content:center;"
          >
            <div style=${cardStyle}>
              <strong>${type} horizontal</strong>
              <obc-sequence-step
                .type=${type}
                .styleType=${SequenceStyle.regular}
                .value=${SequenceValue.active}
                .orientation=${SequenceOrientation.horizontal}
                .showStepInputConnector=${true}
                .showStepOutputConnector=${true}
                .hasIcon=${type !== SequenceType.small}
              >
                ${type !== SequenceType.small
                  ? iconIdToIconHtml('placeholder', {
                      slot: 'leading-icon',
                      useCssColor: '',
                    })
                  : nothing}
                Label
              </obc-sequence-step>
            </div>
            <div style=${cardStyle}>
              <strong>${type} vertical</strong>
              <obc-sequence-step
                .type=${type}
                .styleType=${SequenceStyle.regular}
                .value=${SequenceValue.active}
                .orientation=${SequenceOrientation.vertical}
                .showStepInputConnector=${true}
                .showStepOutputConnector=${true}
                .hasIcon=${type !== SequenceType.small}
              >
                ${type !== SequenceType.small
                  ? iconIdToIconHtml('placeholder', {
                      slot: 'leading-icon',
                      useCssColor: '',
                    })
                  : nothing}
                Label
              </obc-sequence-step>
            </div>
          </div>
        `
      )}
    </div>
  `,
};
