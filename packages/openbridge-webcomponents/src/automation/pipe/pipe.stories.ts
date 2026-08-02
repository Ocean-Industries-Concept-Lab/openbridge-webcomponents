import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './pipe-straight.js';
import './pipe-corner.js';
import './pipe-tee.js';
import './pipe-cross.js';
import './pipe-endpoint.js';
import './pipe-arrow.js';
import './pipe-overlap.js';
import type {PipeValue, PipeSize} from './pipe-types.js';

const VALUES: PipeValue[] = [
  'open-flow',
  'open-generic',
  'empty',
  'medium-flow',
  'enhanced',
  'running',
  'closed',
  'closed-dash',
];

const SIZES: PipeSize[] = ['small', 'medium', 'large', 'xl'];

const cellStyle =
  'display: flex; align-items: center; justify-content: center; width: 96px; height: 48px;';
const labelStyle =
  'font-family: var(--font-family-main, sans-serif); font-size: 11px; color: var(--instrument-frame-secondary-color, gray);';
const rowLabelStyle = `${labelStyle} width: 120px; flex: 0 0 auto; text-align: right; padding-right: 8px;`;
const sectionTitleStyle =
  'font-family: var(--font-family-main, sans-serif); font-size: 14px; font-weight: 600; margin: 24px 0 8px;';
const tableStyle = 'display: flex; flex-direction: column; gap: 4px;';
const headerRowStyle = 'display: flex; align-items: center;';
const bodyRowStyle = 'display: flex; align-items: center;';

/**
 * Overview catalog of the `obc-pipe-*` component family: straight runs,
 * corners, junctions (tee, cross), terminators (endpoint, arrow), and
 * non-connecting crossings (overlap). This story has no single backing
 * component — it renders every member of the family side by side so the
 * shared value/size/medium-color vocabulary can be compared at a glance.
 * See each component's own story (`Automation/Pipe/Straight`,
 * `Automation/Pipe/Corner`, etc.) for the full interactive controls.
 */
const meta: Meta = {
  title: 'Automation/Pipe/Overview',
  tags: ['autodocs', '6.0'],
  parameters: {
    docs: {
      description: {
        component:
          'Visual catalog of the `obc-pipe-*` family. The top grid shows every `value` × every `size` for `obc-pipe-straight`; the rows below show one representative size/value/direction combination for each of the other family members: `obc-pipe-corner`, `obc-pipe-tee`, `obc-pipe-cross`, `obc-pipe-endpoint`, `obc-pipe-arrow`, and `obc-pipe-overlap`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

function straightGrid() {
  return html`
    <div style=${tableStyle}>
      <div style=${headerRowStyle}>
        <div style=${rowLabelStyle}></div>
        ${SIZES.map(
          (size) =>
            html`<div style=${cellStyle}>
              <span style=${labelStyle}>${size}</span>
            </div>`
        )}
      </div>
      ${VALUES.map(
        (value) => html`
          <div style=${bodyRowStyle}>
            <span style=${rowLabelStyle}>${value}</span>
            ${SIZES.map(
              (size) => html`
                <div style=${cellStyle}>
                  <obc-pipe-straight
                    .value=${value}
                    .size=${size}
                    .length=${2}
                    medium-color="Teal"
                  ></obc-pipe-straight>
                </div>
              `
            )}
          </div>
        `
      )}
    </div>
  `;
}

function familyRow() {
  return html`
    <div
      style="display: flex; align-items: center; gap: 32px; flex-wrap: wrap;"
    >
      <div style=${cellStyle}>
        <div style=${labelStyle}>corner</div>
        <obc-pipe-corner
          value="open-flow"
          size="medium"
          direction="right"
        ></obc-pipe-corner>
      </div>
      <div style=${cellStyle}>
        <div style=${labelStyle}>tee</div>
        <obc-pipe-tee
          value="open-flow"
          size="medium"
          direction="bottom"
        ></obc-pipe-tee>
      </div>
      <div style=${cellStyle}>
        <div style=${labelStyle}>cross</div>
        <obc-pipe-cross value="open-flow" size="medium"></obc-pipe-cross>
      </div>
      <div style=${cellStyle}>
        <div style=${labelStyle}>endpoint</div>
        <obc-pipe-endpoint
          value="open-flow"
          size="medium"
          direction="right"
          variant="cap"
        ></obc-pipe-endpoint>
      </div>
      <div style=${cellStyle}>
        <div style=${labelStyle}>arrow</div>
        <obc-pipe-arrow
          value="open-flow"
          size="medium"
          direction="right"
          flow="arrow-out"
        ></obc-pipe-arrow>
      </div>
      <div style=${cellStyle}>
        <div style=${labelStyle}>overlap</div>
        <obc-pipe-overlap
          value="open-flow"
          size="medium"
          direction="vertical"
        ></obc-pipe-overlap>
      </div>
    </div>
  `;
}

export const Overview: Story = {
  render: () => html`
    <div>
      <div style=${sectionTitleStyle}>Straight — value × size</div>
      ${straightGrid()}
      <div style=${sectionTitleStyle}>Family — one representative each</div>
      ${familyRow()}
    </div>
  `,
};
