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

/**
 * A small connected schematic built entirely from `obc-pipe-*` components,
 * placed on the 24px grid with absolute positioning. Each component's
 * connection anchor sits at its host's top-left corner, so positioning a
 * component at `left/top = n*24` snaps it onto the grid; adjacent open mouths
 * abut into one continuous run.
 *
 * Layout (grid cells, 24px each):
 * - A horizontal supply run enters top-left and reaches a tee.
 * - The tee branches downward; the branch turns right through a corner and
 *   ends in a flow arrow.
 * - The supply run continues right into a cross; the cross's vertical arms
 *   carry short stubs capped by endpoints.
 */
function connectedDemo() {
  // Every obc-pipe-* component anchors its connection point at the host's
  // top-left origin, so a component placed at grid cell (c, r) has its
  // connection point at grid coordinate (c, r). Pieces connect by sharing a
  // grid coordinate. One grid cell = 24px.
  const G = 24;
  const at = (col: number, row: number) =>
    `position:absolute; left:${col * G}px; top:${row * G}px;`;
  const blue = html``; // placeholder to keep prettier happy
  void blue;
  return html`
    <div
      style="position:relative; width:${10 * G}px; height:${6 *
      G}px; margin:8px 0 16px;"
    >
      <!-- Supply run enters at (0,1) and runs 3 cells to the tee at (3,1). -->
      <obc-pipe-straight
        style=${at(0, 1)}
        value="medium-flow"
        medium-color="Blue"
        .length=${3}
      ></obc-pipe-straight>

      <!-- Tee at (3,1): through-run left↔right, branch down. -->
      <obc-pipe-tee
        style=${at(3, 1)}
        value="medium-flow"
        medium-color="Blue"
        direction="bottom"
      ></obc-pipe-tee>

      <!-- Supply continues (3,1)→(6,1) into the cross. -->
      <obc-pipe-straight
        style=${at(3, 1)}
        value="medium-flow"
        medium-color="Blue"
        .length=${3}
      ></obc-pipe-straight>

      <!-- Cross at (6,1). -->
      <obc-pipe-cross
        style=${at(6, 1)}
        value="medium-flow"
        medium-color="Blue"
      ></obc-pipe-cross>

      <!-- Cross right arm (6,1)→(8,1) ending in an endpoint cap at (8,1). -->
      <obc-pipe-straight
        style=${at(6, 1)}
        value="medium-flow"
        medium-color="Blue"
        .length=${2}
      ></obc-pipe-straight>
      <obc-pipe-endpoint
        style=${at(8, 1)}
        value="medium-flow"
        medium-color="Blue"
        direction="right"
      ></obc-pipe-endpoint>

      <!-- Cross bottom arm: short vertical stub (6,1)→(6,2) capped at (6,2). -->
      <obc-pipe-straight
        style=${at(6, 1)}
        value="medium-flow"
        medium-color="Blue"
        orientation="vertical"
        .length=${1}
      ></obc-pipe-straight>
      <obc-pipe-endpoint
        style=${at(6, 2)}
        value="medium-flow"
        medium-color="Blue"
        direction="bottom"
      ></obc-pipe-endpoint>

      <!-- Cross top arm: short vertical stub (6,0)→(6,1) capped at (6,0). -->
      <obc-pipe-straight
        style=${at(6, 0)}
        value="medium-flow"
        medium-color="Blue"
        orientation="vertical"
        .length=${1}
      ></obc-pipe-straight>
      <obc-pipe-endpoint
        style=${at(6, 0)}
        value="medium-flow"
        medium-color="Blue"
        direction="top"
      ></obc-pipe-endpoint>

      <!-- Branch: vertical run down the tee, stopping at the corner's top
           mouth. A corner's bend arcs fill the middle of its tile, so
           connecting runs stop at the tile edge (half a cell short of the
           bend point) — hence the fractional length. -->
      <obc-pipe-straight
        style=${at(3, 1)}
        value="medium-flow"
        medium-color="Blue"
        orientation="vertical"
        .length=${1.5}
      ></obc-pipe-straight>

      <!-- Corner at (3,3): receives from top, turns to the right. -->
      <obc-pipe-corner
        style=${at(3, 3)}
        value="medium-flow"
        medium-color="Blue"
        direction="top"
      ></obc-pipe-corner>

      <!-- Run right from the corner's right mouth (3.5,3) to the arrow's
           stub mouth (4.5,3) — again stopping at the tile edges. -->
      <obc-pipe-straight
        style=${at(3.5, 3)}
        value="medium-flow"
        medium-color="Blue"
        .length=${1}
      ></obc-pipe-straight>

      <!-- Flow arrow terminating the branch at (5,3). -->
      <obc-pipe-arrow
        style=${at(5, 3)}
        value="medium-flow"
        medium-color="Blue"
        direction="right"
        flow="arrow-out"
      ></obc-pipe-arrow>
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
      <div style=${sectionTitleStyle}>Connected example</div>
      ${connectedDemo()}
    </div>
  `,
};
