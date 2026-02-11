import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcPoiButton,
  ObcPoiButtonHeader,
  ObcPoiButtonType,
  PoiButtonVisualState,
} from './poi-button.js';
import './poi-button.js';
import '../../../icons/icon-placeholder.js';
import '../../../icons/icon-collision-avoidance-overtaking.js';
import {html, TemplateResult} from 'lit';
import {ObcArAlertType} from '../../types.js';
import {crossDecorator} from '../../../storybook-util.js';
import {ObcPoiHeaderState, ObcPoiHeaderType} from '../poi-header/poi-header.js';

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

function startOverlappedDataButtonLoop(id: string, pauseMs = 1000) {
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

    const wrapper = btn.shadowRoot?.querySelector(
      '.wrapper.has-data.alert-none.type-button'
    ) as HTMLElement | null;

    const nextValue = isOverlapped
      ? PoiButtonVisualState.Unchecked
      : PoiButtonVisualState.Overlapped;
    isOverlapped = !isOverlapped;

    if (!wrapper) {
      btn.value = nextValue;
      const timeout = window.setTimeout(toggle, pauseMs);
      overlapToggleLoops.set(id, timeout);
      return;
    }

    const fromStyle = getComputedStyle(wrapper);
    const fromFrame = {
      width: fromStyle.width,
      height: fromStyle.height,
      opacity: fromStyle.opacity,
      paddingTop: fromStyle.paddingTop,
      boxShadow: fromStyle.boxShadow,
    };

    btn.value = nextValue;

    requestAnimationFrame(() => {
      const toStyle = getComputedStyle(wrapper);
      const toFrame = {
        width: toStyle.width,
        height: toStyle.height,
        opacity: toStyle.opacity,
        paddingTop: toStyle.paddingTop,
        boxShadow: toStyle.boxShadow,
      };

      wrapper.animate([fromFrame, toFrame], {
        duration: 120,
        easing: 'ease-out',
      });
    });

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
  render: (args) => html`
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
  `,
} satisfies Meta<ObcPoiButton>;

export default meta;
type Story = StoryObj<ObcPoiButton>;

const canvasStyle =
  'transform: translate(-50%, -50%); width: min(1100px, 92vw); max-height: 88vh; overflow: auto; padding: 8px 12px 24px;';
const sectionStyle = 'margin-bottom: 24px;';
const headerStyle =
  'margin: 0 0 12px 0; font-family: sans-serif; font-size: 14px; font-weight: 600;';
const gridStyle =
  'display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 14px 16px; align-items: start;';
const itemStyle =
  'display: flex; flex-direction: column; align-items: center; gap: 8px;';
const stageStyle = 'position: relative; width: 140px; height: 130px;';
const stageTallStyle = 'position: relative; width: 180px; height: 220px;';
const buttonAnchorStyle = 'position: absolute; left: 50%; bottom: 0;';
const labelStyle =
  'font-size: 11px; line-height: 1.2; text-align: center; font-family: sans-serif;';

function renderOverview(content: TemplateResult) {
  return html`<div style=${canvasStyle}>${content}</div>`;
}

type MatrixButtonConfig = {
  type?: ObcPoiButtonType;
  value?: PoiButtonVisualState;
  selected?: boolean;
  alertType?: ObcArAlertType;
  header?: ObcPoiButtonHeader | null;
  data?: Array<{value: string; label: string; unit: string}>;
  hasRelation?: boolean;
  idLabel?: boolean;
  stageTall?: boolean;
  label: string;
};

const renderMatrixButton = (cfg: MatrixButtonConfig) => html`
  <div style=${itemStyle}>
    <div style=${cfg.stageTall ? stageTallStyle : stageStyle}>
      <obc-poi-button
        style=${buttonAnchorStyle}
        .type=${cfg.type ?? ObcPoiButtonType.Button}
        .value=${cfg.value ?? PoiButtonVisualState.Unchecked}
        .selected=${cfg.selected ?? false}
        .alertType=${cfg.alertType ?? ObcArAlertType.None}
        .header=${cfg.header ?? null}
        .data=${cfg.data ?? []}
        .hasRelation=${cfg.hasRelation ?? false}
      >
        <obi-placeholder></obi-placeholder>
        ${cfg.hasRelation
          ? html`<obi-collision-avoidance-overtaking
              slot="relation"
              part="relation"
            ></obi-collision-avoidance-overtaking>`
          : html``}
        ${cfg.idLabel
          ? html`<obi-placeholder slot="id-label"></obi-placeholder>`
          : html``}
      </obc-poi-button>
    </div>
    <div style=${labelStyle}>${cfg.label}</div>
  </div>
`;

export const Default: Story = {
  args: {},
};

export const AllTypes: Story = {
  render: () =>
    renderOverview(html`
      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({label: 'Button'})}
          ${renderMatrixButton({
            label: 'Enhanced',
            type: ObcPoiButtonType.Enhanced,
          })}
          ${renderMatrixButton({
            label: 'Selected',
            selected: true,
            header: {content: '1'},
          })}
          ${renderMatrixButton({
            label: 'Selected Enhanced',
            type: ObcPoiButtonType.Enhanced,
            selected: true,
            header: {content: '1'},
          })}
        </div>
      </div>
    `),
};

export const AllAlerts: Story = {
  render: () =>
    renderOverview(html`
      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({
            label: 'None',
            selected: true,
            header: {content: '1'},
          })}
          ${renderMatrixButton({
            label: 'Caution',
            selected: true,
            header: {content: '1'},
            alertType: ObcArAlertType.Caution,
          })}
          ${renderMatrixButton({
            label: 'Warning',
            selected: true,
            header: {content: '1'},
            alertType: ObcArAlertType.Warning,
          })}
          ${renderMatrixButton({
            label: 'Alarm',
            selected: true,
            header: {content: '1'},
            alertType: ObcArAlertType.Alarm,
          })}
        </div>
      </div>

      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({
            label: 'None',
            type: ObcPoiButtonType.Enhanced,
            selected: true,
            header: {content: '1'},
          })}
          ${renderMatrixButton({
            label: 'Caution',
            type: ObcPoiButtonType.Enhanced,
            selected: true,
            header: {content: '1'},
            alertType: ObcArAlertType.Caution,
          })}
          ${renderMatrixButton({
            label: 'Warning',
            type: ObcPoiButtonType.Enhanced,
            selected: true,
            header: {content: '1'},
            alertType: ObcArAlertType.Warning,
          })}
          ${renderMatrixButton({
            label: 'Alarm',
            type: ObcPoiButtonType.Enhanced,
            selected: true,
            header: {content: '1'},
            alertType: ObcArAlertType.Alarm,
          })}
        </div>
      </div>
    `),
};

export const AllOverlapped: Story = {
  render: () =>
    renderOverview(html`
      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({
            label: 'Button',
            value: PoiButtonVisualState.Overlapped,
          })}
          ${renderMatrixButton({
            label: 'Enhanced',
            type: ObcPoiButtonType.Enhanced,
            value: PoiButtonVisualState.Overlapped,
          })}
          ${renderMatrixButton({
            label: 'Caution',
            value: PoiButtonVisualState.Overlapped,
            alertType: ObcArAlertType.Caution,
          })}
          ${renderMatrixButton({
            label: 'Warning',
            value: PoiButtonVisualState.Overlapped,
            alertType: ObcArAlertType.Warning,
          })}
          ${renderMatrixButton({
            label: 'Alarm',
            value: PoiButtonVisualState.Overlapped,
            alertType: ObcArAlertType.Alarm,
          })}
        </div>
      </div>
    `),
};

export const AllData: Story = {
  render: () =>
    renderOverview(html`
      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({
            label: 'Values',
            stageTall: true,
            data: [
              {value: '10', label: 'Lab', unit: 'Unit'},
              {value: '20', label: 'Lab 2', unit: 'Unit 2'},
            ],
          })}
          ${renderMatrixButton({
            label: 'Values + Relation',
            stageTall: true,
            data: [
              {value: '10', label: 'Lab', unit: 'Unit'},
              {value: '20', label: 'Lab 2', unit: 'Unit 2'},
            ],
            hasRelation: true,
            header: {
              content: '1',
              type: ObcPoiHeaderType.Id,
              state: ObcPoiHeaderState.Selected,
              hasIndicator: true,
            },
            idLabel: true,
          })}
          ${renderMatrixButton({
            label: 'Values + Alarm',
            stageTall: true,
            data: [
              {value: '10', label: 'Lab', unit: 'Unit'},
              {value: '20', label: 'Lab 2', unit: 'Unit 2'},
            ],
            alertType: ObcArAlertType.Alarm,
          })}
          ${renderMatrixButton({
            label: 'Values + Overlapped',
            stageTall: true,
            data: [
              {value: '10', label: 'Lab', unit: 'Unit'},
              {value: '20', label: 'Lab 2', unit: 'Unit 2'},
            ],
            value: PoiButtonVisualState.Overlapped,
          })}
        </div>
      </div>
    `),
};

export const OverlappedAnimated: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Loops between normal and overlapped visual states for both Button and Enhanced types.',
      },
    },
  },
  render: () => {
    requestAnimationFrame(() => startOverlappedLoop('animated-btn', 1000));
    requestAnimationFrame(() =>
      startOverlappedLoop('animated-btn-enhanced', 1000)
    );

    return renderOverview(html`
      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          <div style=${itemStyle}>
            <div style=${stageStyle}>
              <obc-poi-button
                id="animated-btn"
                style="position: absolute; left: 50%; bottom: 0; --obc-poi-transition-duration: 100ms; --obc-poi-opacity-transition-duration: 100ms;"
              >
                <obi-placeholder></obi-placeholder>
              </obc-poi-button>
            </div>
            <div style=${labelStyle}>Button</div>
          </div>
          <div style=${itemStyle}>
            <div style=${stageStyle}>
              <obc-poi-button
                id="animated-btn-enhanced"
                style="position: absolute; left: 50%; bottom: 0; --obc-poi-transition-duration: 100ms; --obc-poi-opacity-transition-duration: 100ms;"
                .type=${ObcPoiButtonType.Enhanced}
              >
                <obi-placeholder></obi-placeholder>
              </obc-poi-button>
            </div>
            <div style=${labelStyle}>Enhanced</div>
          </div>
        </div>
      </div>
    `);
  },
};

export const OverlappedAnimatedWithData: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Loops between normal and overlapped visual states for data variants.',
      },
    },
  },
  render: () => {
    requestAnimationFrame(() =>
      startOverlappedDataButtonLoop('animated-btn-data', 1000)
    );

    const values = [
      {value: '10', label: 'Lab', unit: 'Unit'},
      {value: '20', label: 'Lab 2', unit: 'Unit 2'},
    ];

    return renderOverview(html`
      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          <div style=${itemStyle}>
            <div style=${stageTallStyle}>
              <obc-poi-button
                id="animated-btn-data"
                style="position: absolute; left: 50%; bottom: 0; --obc-poi-transition-duration: 100ms; --obc-poi-opacity-transition-duration: 100ms;"
                .data=${values}
              >
                <obi-placeholder></obi-placeholder>
              </obc-poi-button>
            </div>
            <div style=${labelStyle}>Values</div>
          </div>
        </div>
      </div>
    `);
  },
};
