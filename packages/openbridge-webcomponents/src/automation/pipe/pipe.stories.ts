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
 * placed on the 24px grid with absolute positioning.
 *
 * Composition rules (also spelled out inline below):
 * - Every fitting (tee, cross, corner, endpoint, arrow) occupies ONE 24px
 *   tile centred on its anchor, with its arm mouths open at the tile edges.
 * - A straight run spans from its anchor exactly `length` cells. A run
 *   connecting to a fitting must STOP AT THE FITTING'S TILE EDGE (half a
 *   cell from the fitting's anchor) — a run drawn into the fitting's tile
 *   redraws walls across the fitting's open mouths and interior. That is
 *   why runs sit at fractional grid positions with fractional lengths.
 * - Two fittings whose tiles abut (anchors one cell apart) connect directly
 *   with no run between them, like the cross's endpoints here.
 */
function connectedDemo() {
  // Every obc-pipe-* component anchors its connection point at the host's
  // top-left origin, so a component placed at `left/top = n*24` has its
  // anchor at grid coordinate n. One grid cell = 24px.
  const G = 24;
  const at = (col: number, row: number) =>
    `position:absolute; left:${col * G}px; top:${row * G}px;`;
  return html`
    <div
      style="position:relative; width:${10 * G}px; height:${6 *
      G}px; padding:24px; margin:8px 0 16px; overflow:visible;"
    >
      <!-- Supply run enters at (0,1) and stops at the tee's tile edge
           (2.5,1). -->
      <obc-pipe-straight
        style=${at(0, 1)}
        value="medium-flow"
        medium-color="Blue"
        .length=${2.5}
      ></obc-pipe-straight>

      <!-- Tee at (3,1): through-run left↔right, branch down. Its tile spans
           (2.5,1)..(3.5,1). -->
      <obc-pipe-tee
        style=${at(3, 1)}
        value="medium-flow"
        medium-color="Blue"
        direction="bottom"
      ></obc-pipe-tee>

      <!-- Supply continues from the tee's right tile edge (3.5,1) to the
           cross's left tile edge (5.5,1). -->
      <obc-pipe-straight
        style=${at(3.5, 1)}
        value="medium-flow"
        medium-color="Blue"
        .length=${2}
      ></obc-pipe-straight>

      <!-- Cross at (6,1). -->
      <obc-pipe-cross
        style=${at(6, 1)}
        value="medium-flow"
        medium-color="Blue"
      ></obc-pipe-cross>

      <!-- Cross right arm: run from the cross's right tile edge (6.5,1) to
           the endpoint's tile edge (7.5,1), capped at (8,1). -->
      <obc-pipe-straight
        style=${at(6.5, 1)}
        value="medium-flow"
        medium-color="Blue"
        .length=${1}
      ></obc-pipe-straight>
      <obc-pipe-endpoint
        style=${at(8, 1)}
        value="medium-flow"
        medium-color="Blue"
        direction="right"
      ></obc-pipe-endpoint>

      <!-- Cross top/bottom arms: the endpoint tiles at (6,0) and (6,2) abut
           the cross's tile edges directly — no run needed between two
           fittings whose tiles touch. -->
      <obc-pipe-endpoint
        style=${at(6, 0)}
        value="medium-flow"
        medium-color="Blue"
        direction="top"
      ></obc-pipe-endpoint>
      <obc-pipe-endpoint
        style=${at(6, 2)}
        value="medium-flow"
        medium-color="Blue"
        direction="bottom"
      ></obc-pipe-endpoint>

      <!-- Branch: vertical run from the tee's bottom tile edge (3,1.5) to
           the corner's top tile edge (3,2.5). -->
      <obc-pipe-straight
        style=${at(3, 1.5)}
        value="medium-flow"
        medium-color="Blue"
        orientation="vertical"
        .length=${1}
      ></obc-pipe-straight>

      <!-- Corner at (3,3): receives from top, turns to the right. -->
      <obc-pipe-corner
        style=${at(3, 3)}
        value="medium-flow"
        medium-color="Blue"
        direction="top"
      ></obc-pipe-corner>

      <!-- Run from the corner's right tile edge (3.5,3) to the arrow's tile
           edge (4.5,3). -->
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
