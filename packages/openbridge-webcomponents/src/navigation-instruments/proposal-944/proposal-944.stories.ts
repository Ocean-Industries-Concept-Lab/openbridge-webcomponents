import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, type HTMLTemplateResult} from 'lit';
import '../speed-gauge/speed-gauge.js';
import '../compass/compass.js';
import '../heading/heading.js';
import '../speed-directions/speed-directions.js';
import {ObcSpeedGaugeNeedleType} from '../speed-gauge/speed-gauge.js';
import {CompassDirection, CompassPriorityElement} from '../compass/compass.js';
import {HdgArrowStyle, CogArrowStyle} from '../course-arrows/course-arrows.js';
import {RotPosition, RotType, VesselImage} from '../watch/watch.js';
import {
  SpeedDirectionsFrameStyle,
  SpeedDirectionsType,
} from '../speed-directions/speed-directions-geometry.js';
import {AdviceType} from '../watch/advice.js';
import {Priority} from '../types.js';
import {storyHint} from '../../storybook-util.js';

/** One captioned instrument in a reproduction row. */
function panel(
  caption: string,
  content: HTMLTemplateResult,
  size = 280
): HTMLTemplateResult {
  return html`<div
    style="display: flex; flex-direction: column; gap: 4px; flex: 0 0 auto;"
  >
    <span
      style="font-family: var(--font-family-main, sans-serif); font-size: 11px; color: var(--element-neutral-color, gray);"
      >${caption}</span
    >
    <div style="width: ${size}px; height: ${size}px;">${content}</div>
  </div>`;
}

function row(content: HTMLTemplateResult): HTMLTemplateResult {
  return html`<div
    style="display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-start;"
  >
    ${content}
  </div>`;
}

/** The story frame starts at the very top edge, so the page needs its own. */
function page(content: HTMLTemplateResult): HTMLTemplateResult {
  return html`<div style="padding: 16px;">${content}</div>`;
}

/** The gaps a reproduction could not close, listed under it. */
function gaps(items: string[]): HTMLTemplateResult {
  return html`<div
    style="max-width: 70ch; margin-top: 16px; font-family: var(--font-family-main, sans-serif); font-size: 12px; color: var(--element-neutral-color, gray);"
  >
    <strong>Not covered by a property today</strong>
    <ul style="margin: 4px 0 0; padding-left: 20px;">
      ${items.map((item) => html`<li>${item}</li>`)}
    </ul>
  </div>`;
}

const meta: Meta = {
  title: 'Proposals/Proposal 944 With Current Components',
  // A demonstration, not a component: nothing here is part of the library API,
  // so it carries no baselines.
  tags: [],
  parameters: {
    docs: {
      description: {
        component:
          'Each story below reproduces one instrument proposed in PR #944 ' +
          'from a component the library already ships, using nothing but its ' +
          'published properties. Under each is the short list of what the ' +
          'reproduction could not reach — the part that is a genuine request ' +
          'for the design team rather than a missing story.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * The proposal's speedometer is `obc-speed-gauge`. The four panels are the
 * official design's own variants (Figma 18912-138381): needle and bar, each
 * in the regular and the enhanced palette. The fifth adds the advice zone and
 * the setpoint the proposal draws as a second, dashed needle.
 */
export const Speedometer: Story = {
  render: () =>
    page(html`
      ${storyHint(
        'obc-speed-gauge covers the official speed gauge in full: the 225° arc, ' +
          'both needle types, the filled bar, the tick ladder with labels, the ' +
          'advice zones and the centred readout.'
      )}
      ${row(html`
        ${panel(
          'needleType="full"',
          html`<obc-speed-gauge
            .speed=${12.5}
            .maxSpeed=${25}
            .minSpeed=${-5}
            .tickmarkInterval=${5}
            .showLabels=${true}
            .hasReadout=${true}
            .label=${'Speed'}
            .unit=${'kn'}
            .needleType=${ObcSpeedGaugeNeedleType.full}
          ></obc-speed-gauge>`
        )}
        ${panel(
          'needleType="bar"',
          html`<obc-speed-gauge
            .speed=${12.5}
            .maxSpeed=${25}
            .minSpeed=${-5}
            .tickmarkInterval=${5}
            .showLabels=${true}
            .hasReadout=${true}
            .label=${'Speed'}
            .unit=${'kn'}
            .needleType=${ObcSpeedGaugeNeedleType.bar}
          ></obc-speed-gauge>`
        )}
        ${panel(
          'priority="enhanced"',
          html`<obc-speed-gauge
            .speed=${12.5}
            .maxSpeed=${25}
            .minSpeed=${-5}
            .tickmarkInterval=${5}
            .showLabels=${true}
            .hasReadout=${true}
            .label=${'Speed'}
            .unit=${'kn'}
            .priority=${Priority.enhanced}
          ></obc-speed-gauge>`
        )}
        ${panel(
          'speedAdvices + setpoint',
          html`<obc-speed-gauge
            .speed=${18}
            .maxSpeed=${25}
            .minSpeed=${-5}
            .tickmarkInterval=${5}
            .showLabels=${true}
            .hasReadout=${true}
            .label=${'Speed'}
            .unit=${'kn'}
            .setpoint=${14}
            .priority=${Priority.enhanced}
            .speedAdvices=${[
              {
                minSpeed: 20,
                maxSpeed: 25,
                type: AdviceType.advice,
                hinted: false,
              },
            ]}
          ></obc-speed-gauge>`
        )}
      `)}
      ${gaps([
        'A second needle. The proposal draws the target speed as a dashed ' +
          'needle; the design marks a setpoint with a triangle on the ring, ' +
          'which is what `setpoint` renders. Two live speeds on one face ' +
          '(SOG against STW) is a separate question.',
      ])}
    `),
};

/**
 * The proposal's true-relative instrument is `obc-compass`: vector arrows for
 * heading and course, the rate-of-turn bar on the outer scale, and the wind
 * and current symbols outside the ring.
 */
export const TrueRelative: Story = {
  render: () =>
    page(html`
      ${storyHint(
        'obc-compass already carries every layer of this instrument. The ' +
          'second panel is obc-heading, the reduced face, for a view without ' +
          'rate of turn or environment.'
      )}
      ${row(html`
        ${panel(
          'obc-compass — vector arrows, ROT bar on the scale, wind + current',
          html`<obc-compass
            .heading=${0}
            .courseOverGround=${42}
            .direction=${CompassDirection.NorthUp}
            .hdgArrowStyle=${HdgArrowStyle.vector}
            .cogArrowStyle=${CogArrowStyle.velocityVector}
            .rotType=${RotType.bar}
            .rotPosition=${RotPosition.scale}
            .rateOfTurnDegreesPerMinute=${32}
            .currentWindSpeedKnots=${20}
            .windFromDirection=${40}
            .currentSpeed=${3}
            .currentFromDirection=${62}
            .vesselImage=${VesselImage.psvTop}
            .showLabels=${true}
            .priority=${Priority.enhanced}
            .priorityElements=${[CompassPriorityElement.hdg]}
          ></obc-compass>`,
          420
        )}
        ${panel(
          'obc-heading — the same arrows on the reduced face',
          html`<obc-heading
            .heading=${0}
            .courseOverGround=${42}
            .hdgArrowStyle=${HdgArrowStyle.vector}
            .cogArrowStyle=${CogArrowStyle.vector}
            .vesselImage=${VesselImage.psvTop}
            .showLabels=${true}
            .priority=${Priority.enhanced}
          ></obc-heading>`,
          420
        )}
      `)}
      ${gaps([
        'The true/relative switch itself. The instrument draws whichever ' +
          'values it is given; which reference frame they are in is the ' +
          "consumer's choice, and nothing on the face says which is shown.",
      ])}
    `),
};

/**
 * The proposal's two long-lat instruments are `obc-speed-directions`, whose
 * `type` picks between the three-axis and the two-axis layout.
 */
export const LongLat: Story = {
  render: () =>
    page(html`
      ${storyHint(
        'obc-speed-directions places the chevrons on the vessel axes from ' +
          'signed speeds in knots. An axis with no value renders nothing, ' +
          'which is the proposal’s "without lat front speed" variant.'
      )}
      ${row(html`
        ${panel(
          'alongAthwartArrows',
          html`<obc-speed-directions
            .type=${SpeedDirectionsType.alongAthwartArrows}
            .frameStyle=${SpeedDirectionsFrameStyle.standalone}
            .speedAlongKnots=${4.2}
            .speedAthwartBowKnots=${0.8}
            .speedAthwartSternKnots=${-0.6}
          ></obc-speed-directions>`
        )}
        ${panel(
          'without the bow athwart speed',
          html`<obc-speed-directions
            .type=${SpeedDirectionsType.alongAthwartArrows}
            .frameStyle=${SpeedDirectionsFrameStyle.standalone}
            .speedAlongKnots=${4.2}
            .speedAthwartSternKnots=${-0.6}
          ></obc-speed-directions>`
        )}
        ${panel(
          'longLatArrows',
          html`<obc-speed-directions
            .type=${SpeedDirectionsType.longLatArrows}
            .frameStyle=${SpeedDirectionsFrameStyle.standalone}
            .speedAlongKnots=${4.2}
            .speedAthwartKnots=${1.4}
          ></obc-speed-directions>`
        )}
        ${panel(
          'alongAthwartBars, framed',
          html`<obc-speed-directions
            .type=${SpeedDirectionsType.alongAthwartBars}
            .frameStyle=${SpeedDirectionsFrameStyle.framed}
            .speedAlongKnots=${6.5}
            .speedAthwartBowKnots=${1.2}
            .speedAthwartSternKnots=${-0.9}
          ></obc-speed-directions>`
        )}
      `)}
      ${gaps([
        'The numeric readouts the proposal draws on the vessel, one per axis ' +
          'with its own Fore/Aft label and unit.',
        'The chevron key beside the instrument that says what the arrows mean.',
      ])}
    `),
};

/**
 * The proposal's environmental long-lat is the same instrument on its compass
 * frame. The second panel shows the layers it adds that live on `obc-compass`
 * instead, which is the part worth a design decision.
 */
export const LongLatEnvironmental: Story = {
  render: () =>
    page(html`
      ${storyHint(
        'frameStyle="compass" puts the speed chevrons on a watch face with a ' +
          'north arrow. The rate-of-turn band and the wind and current symbols ' +
          'the proposal draws around that face exist on obc-compass, not here.'
      )}
      ${row(html`
        ${panel(
          'obc-speed-directions frameStyle="compass"',
          html`<obc-speed-directions
            .type=${SpeedDirectionsType.alongAthwartArrows}
            .frameStyle=${SpeedDirectionsFrameStyle.compass}
            .speedAlongKnots=${4.2}
            .speedAthwartBowKnots=${1.1}
            .speedAthwartSternKnots=${1.1}
          ></obc-speed-directions>`,
          420
        )}
        ${panel(
          'the surrounding layers, on obc-compass',
          html`<obc-compass
            .heading=${0}
            .courseOverGround=${18}
            .hdgArrowStyle=${HdgArrowStyle.vector}
            .cogArrowStyle=${CogArrowStyle.vector}
            .rotType=${RotType.bar}
            .rotPosition=${RotPosition.scale}
            .rateOfTurnDegreesPerMinute=${28}
            .currentWindSpeedKnots=${20}
            .windFromDirection=${40}
            .currentSpeed=${3}
            .currentFromDirection=${62}
            .vesselImage=${VesselImage.psvTop}
            .showLabels=${true}
          ></obc-compass>`,
          420
        )}
      `)}
      ${gaps([
        'The two faces are separate components, so the proposal’s ' +
          'combination — speed chevrons plus rate-of-turn band plus wind and ' +
          'current on one face — cannot be assembled from properties today.',
        'N/E/S/W labels on the speed-directions compass frame. It renders main ' +
          'tickmarks at the quadrant diagonals and a north arrow, with no ' +
          'showLabels of its own.',
      ])}
    `),
};
