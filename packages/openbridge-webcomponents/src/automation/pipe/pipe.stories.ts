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
 * Overview catalog and usage guide for the `obc-pipe-*` component family:
 * straight runs, corners, junctions (tee, cross), terminators (endpoint,
 * arrow), and non-connecting crossings (overlap). This story has no single
 * backing component — it renders every member of the family side by side so
 * the shared value/size/medium-color vocabulary can be compared at a glance,
 * and its docs page carries the grid-placement rules for composing members
 * into a connected diagram. See each component's own story
 * (`Automation/Pipe/Straight`, `Automation/Pipe/Corner`, etc.) for the full
 * interactive controls.
 */
const meta: Meta = {
  title: 'Automation/Pipe/Overview',
  tags: ['autodocs', '6.0'],
  parameters: {
    docs: {
      description: {
        component: [
          'Visual catalog and usage guide for the `obc-pipe-*` family. The top grid shows every `value` × every `size` for `obc-pipe-straight`; the family row shows one representative of each other member; the connected example is a copy-paste starting point for composing a diagram.',
          '',
          '## Choosing a member',
          '',
          '| Component | Use for |',
          '| --- | --- |',
          '| `obc-pipe-straight` | A run of pipe, any whole or fractional number of cells long |',
          '| `obc-pipe-corner` | A 90° bend |',
          '| `obc-pipe-tee` | Three-way junction |',
          '| `obc-pipe-cross` | Four-way junction |',
          '| `obc-pipe-endpoint` | Terminating a run with a capped end |',
          '| `obc-pipe-arrow` | Terminating a run with a flow-direction arrowhead (`flow` selects in/out) |',
          '| `obc-pipe-overlap` | Two runs crossing *without* connecting |',
          '',
          'All members share the same `value`, `size`, and `medium-color` vocabulary, so a diagram changes state or scale by updating the same props everywhere.',
          '',
          '## Placing components on the grid',
          '',
          'Components compose on a 24px grid. Each host anchors its connection point at its own top-left origin, so absolute-position each piece at `left/top = column/row × 24px`:',
          '',
          '- **Fittings** (corner, tee, cross, endpoint, arrow, overlap) anchor at their tile **centre**; their open mouths sit half a cell (12px) out from the anchor, at the tile edges.',
          '- **Straights** anchor at their **start mouth** and extend `length` cells toward `orientation`.',
          '- A run connecting to a fitting must **stop at the fitting’s tile edge** — half a cell short of the fitting’s anchor — so runs sit at fractional positions with fractional lengths (see the connected example).',
          '- Two fittings whose tiles abut (anchors one cell apart) connect directly with no run between them.',
        ].join('\n'),
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

      <!-- Cross right arm: run from the cross's right tile edge (6.5,1) to the
           endpoint at (8,1). An endpoint's bar sits on its anchor and its mouth
           opens on the direction side — so to terminate a run reaching to the
           RIGHT, the endpoint's mouth must face LEFT (direction="left") with
           its anchor one cell past the run's end. -->
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
        direction="left"
      ></obc-pipe-endpoint>

      <!-- Cross top/bottom arms: the endpoint anchors sit at (6,0) and (6,2),
           one cell out from the cross centre, with their mouths facing back
           toward the cross (down / up respectively). -->
      <obc-pipe-endpoint
        style=${at(6, 0)}
        value="medium-flow"
        medium-color="Blue"
        direction="bottom"
      ></obc-pipe-endpoint>
      <obc-pipe-endpoint
        style=${at(6, 2)}
        value="medium-flow"
        medium-color="Blue"
        direction="top"
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
