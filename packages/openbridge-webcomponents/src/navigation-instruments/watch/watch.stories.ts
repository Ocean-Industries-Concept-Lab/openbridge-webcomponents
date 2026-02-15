import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcWatch,
  VesselImage,
  VesselImageSize,
  WatchCircleType,
} from './watch.js';
import './watch.js';
import {widthDecorator} from '../../storybook-util.js';
import {AdviceState, AdviceType} from './advice.js';
import {InstrumentState, Priority} from '../types.js';
import {TickmarkType} from './tickmark.js';
import {html, svg} from 'lit';

const meta: Meta<typeof ObcWatch> = {
  title: 'Building blocks/Watch',
  tags: ['autodocs'],
  component: 'obc-watch',
  parameters: {
    docs: {
      description: {
        component: `# \`<obc-watch>\` - Core SVG renderer for circular/radial watch-based instruments

This component renders all circular instrument elements including rings, tickmarks, bar areas, needles, advices, setpoints, vessel images, and environmental indicators (wind/current). It serves as the foundation for compass, heading, rudder, speed-gauge, and other radial navigation instruments.

## Setpoint Behavior

The setpoint marker visual state is derived from the combination of \`atAngleSetpoint\`, \`atAngleSetpointZero\`, and \`focused\` properties:

- **notEqual**: Value differs from setpoint (triangular marker, offset outward)
- **equal**: Value matches setpoint (line marker, sits on ring)
- **equalZero**: Value matches setpoint at zero angle (double-line marker, offset outward)
- **focus**: User is actively adjusting (e.g., dragging) - shows focus visual state

The \`RADIAL_SETPOINT_INWARD_ADJUST\` constant (4px) fine-tunes radial setpoint positioning to match Figma designs, applied on top of visual state offsets from setpoint.ts.

The \`colorMode\` property allows overriding the derived color mode (enhanced for enhanced priority, regular for other states).

## Properties

| Property | Type | Description |
|----------|------|-------------|
| \`state\` | \`InstrumentState\` | Instrument state (active, loading, off) |
| \`angleSetpoint\` | \`number \\| undefined\` | Setpoint angle in degrees (0° = 12 o'clock) |
| \`atAngleSetpoint\` | \`boolean\` | Whether value matches setpoint (within deadband) |
| \`atAngleSetpointZero\` | \`boolean\` | Whether setpoint is at zero angle |
| \`focused\` | \`boolean\` | Whether user is actively adjusting the setpoint |
| \`colorMode\` | \`SetpointColorMode \\| undefined\` | Optional override for setpoint color mode |

## Usage

This component is typically not used directly. Instead, use the higher-level wrapper components:
- \`obc-compass\` - Full compass with HDG/COG arrows, ROT, vessel, wind/current
- \`obc-heading\` - Simplified compass with HDG/COG arrows only
- \`obc-rudder\` - Half-circle rudder indicator
- \`obc-speed-gauge\` - Speed arc with needle
- \`obc-azimuth-thruster\` - Thruster with angle setpoint and thrust bar
- \`obc-instrument-radial\` - Generic building block for radial gauges

Source of truth: \`packages/openbridge-webcomponents/src/navigation-instruments/watch/watch.ts\``,
      },
    },
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 800, step: 10}},
    state: {control: {type: 'select'}, options: Object.values(InstrumentState)},
    watchCircleType: {
      control: {type: 'select'},
      options: Object.values(WatchCircleType),
    },
    areas: {control: {type: 'object'}},
    padding: {control: {type: 'range', min: 0, max: 100, step: 1}},
    vessels: {control: {type: 'object'}},
    wind: {control: {type: 'range', min: 0, max: 12, step: 1}},
    windFromDirectionDeg: {control: {type: 'range', min: 0, max: 360, step: 1}},
    windSymbolRadius: {control: {type: 'range', min: 0, max: 360, step: 1}},
    current: {control: {type: 'range', min: 0, max: 4, step: 1}},
    currentFromDirectionDeg: {
      control: {type: 'range', min: 0, max: 360, step: 1},
    },
    currentSymbolRadius: {control: {type: 'range', min: 0, max: 360, step: 1}},
    rotation: {control: {type: 'range', min: 0, max: 360, step: 1}},
    priority: {control: 'select', options: Object.values(Priority)},
  },
  args: {
    width: 400,
    windSymbolRadius: 160,
    currentSymbolRadius: 160,
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcWatch>;

export default meta;
type Story = StoryObj<ObcWatch>;

export const InCommand: Story = {
  args: {
    angleSetpoint: 90,
    state: InstrumentState.active,
    priority: Priority.enhanced,
  },
  argTypes: {
    angleSetpoint: {control: {type: 'range', min: 0, max: 360, step: 1}},
  },
};

export const WithVesselImage: Story = {
  args: {
    angleSetpoint: 90,
    state: InstrumentState.active,
    priority: Priority.enhanced,
    vessels: [
      {
        size: VesselImageSize.large,
        vesselImage: VesselImage.psvTop,
        transform: 'rotate(10deg)',
      },
    ],
  },
  argTypes: {
    angleSetpoint: {control: {type: 'range', min: 0, max: 360, step: 1}},
  },
};

export const WithBarAreas: Story = {
  args: {
    state: InstrumentState.active,
    priority: Priority.enhanced,
    areas: [
      {
        startAngle: -90,
        endAngle: 90,
        roundInsideCut: true,
        roundOutsideCut: true,
      },
    ],
    barAreas: [
      {
        startAngle: -90,
        endAngle: 0,
        fillColor: 'var(--instrument-enhanced-tertiary-color)',
      },
    ],
    needles: [
      {
        angle: 0,
        fillColor: 'var(--instrument-enhanced-secondary-color)',
        strokeColor: 'var(--border-silhouette-color)',
      },
    ],
    watchCircleType: WatchCircleType.double,
  },
  argTypes: {
    angleSetpoint: {control: {type: 'range', min: 0, max: 360, step: 1}},
  },
};

export const WithStarboardPortIndicator: Story = {
  args: {
    state: InstrumentState.active,
    priority: Priority.enhanced,
    starboardPortIndicator: true,
  },
};

export const WithWind: Story = {
  args: {
    wind: 10,
    windFromDirectionDeg: 116,
    padding: 70,
    windSymbolRadius: 190,
    current: 2,
    currentFromDirectionDeg: 238,
    currentSymbolRadius: 190,
    crosshairEnabled: true,
  },
};

export const Active: Story = {
  args: {
    angleSetpoint: 90,
    state: InstrumentState.active,
  },
  argTypes: {
    angleSetpoint: {control: {type: 'range', min: 0, max: 360, step: 1}},
  },
};

export const CutRounded: Story = {
  args: {
    areas: [
      {
        startAngle: 90,
        endAngle: 270,
        roundInsideCut: true,
        roundOutsideCut: true,
      },
    ],
  },
};

export const Cut: Story = {
  args: {
    areas: [
      {
        startAngle: 90,
        endAngle: 270,
        roundInsideCut: false,
        roundOutsideCut: false,
      },
    ],
  },
};

export const Advice: Story = {
  args: {
    angleSetpoint: 90,
    advices: [
      {
        minAngle: 20,
        maxAngle: 50,
        type: AdviceType.advice,
        state: AdviceState.hinted,
      },
      {
        minAngle: 60,
        maxAngle: 100,
        type: AdviceType.advice,
        state: AdviceState.regular,
      },
      {
        minAngle: 110,
        maxAngle: 140,
        type: AdviceType.advice,
        state: AdviceState.triggered,
      },
      {
        minAngle: 190,
        maxAngle: 230,
        type: AdviceType.caution,
        state: AdviceState.hinted,
      },
      {
        minAngle: 240,
        maxAngle: 280,
        type: AdviceType.caution,
        state: AdviceState.regular,
      },
      {
        minAngle: 290,
        maxAngle: 320,
        type: AdviceType.caution,
        state: AdviceState.triggered,
      },
    ],
  },
  argTypes: {
    angleSetpoint: {control: {type: 'range', min: 0, max: 360, step: 1}},
  },
};

export const Tickmarks: Story = {
  args: {
    tickmarks: [
      // every 15 degrees
      ...Array.from({length: 24}, (_, i) => ({
        angle: i * 15,
        type: TickmarkType.secondary,
        text: `${i * 15}`,
      })),
    ],
  },
};

export const TickmarksInside: Story = {
  args: {
    tickmarks: [
      ...Array.from({length: 24}, (_, i) => ({
        angle: i * 15,
        type: TickmarkType.secondary,
        text: `${i * 15}`,
      })),
    ],
    tickmarksInside: true,
  },
};

export const Off: Story = {
  args: {
    windSymbolRadius: 160,
    currentSymbolRadius: 160,
    angleSetpoint: 90,
    state: InstrumentState.off,
    watchCircleType: WatchCircleType.triple,
  },

  argTypes: {
    angleSetpoint: {
      control: {
        type: 'range',
        min: 0,
        max: 360,
        step: 1,
      },
    },
  },
};

export const Tripple: Story = {
  args: {
    windSymbolRadius: 160,
    currentSymbolRadius: 160,
    angleSetpoint: 90,
    state: InstrumentState.active,
    priority: Priority.enhanced,
    watchCircleType: WatchCircleType.triple,
  },

  argTypes: {
    angleSetpoint: {
      control: {
        type: 'range',
        min: 0,
        max: 360,
        step: 1,
      },
    },
  },
};

export const CutTripleWatch: Story = {
  args: {
    windSymbolRadius: 160,
    currentSymbolRadius: 160,
    areas: [
      {
        startAngle: 90,
        endAngle: 270,
        roundInsideCut: true,
        roundOutsideCut: true,
      },
    ],
    watchCircleType: WatchCircleType.triple,
  },
};

export const MultiCut: Story = {
  args: {
    watchCircleType: WatchCircleType.double,
    areas: [
      {
        startAngle: 60,
        endAngle: 120,
        roundInsideCut: true,
        roundOutsideCut: true,
      },
      {
        startAngle: 240,
        endAngle: 300,
        roundInsideCut: true,
        roundOutsideCut: true,
      },
      {
        startAngle: 315,
        endAngle: 45,
        roundInsideCut: true,
        roundOutsideCut: true,
      },
      {
        startAngle: 135,
        endAngle: 225,
        roundInsideCut: true,
        roundOutsideCut: true,
      },
    ],
    barAreas: [
      {
        startAngle: 70,
        endAngle: 110,
        fillColor: 'var(--instrument-enhanced-tertiary-color)',
      },
      {
        startAngle: -10,
        endAngle: 10,
        fillColor: 'var(--instrument-enhanced-tertiary-color)',
      },
      {
        startAngle: 190,
        endAngle: 170,
        fillColor: 'var(--instrument-enhanced-tertiary-color)',
      },
      {
        startAngle: 240,
        endAngle: 300,
        fillColor: 'var(--instrument-enhanced-tertiary-color)',
      },
    ],
    needles: [
      {
        angle: 80,
        fillColor: 'var(--instrument-enhanced-secondary-color)',
        strokeColor: 'var(--border-silhouette-color)',
      },
      {
        angle: 3,
        fillColor: 'var(--instrument-enhanced-secondary-color)',
        strokeColor: 'var(--border-silhouette-color)',
      },
      {
        angle: 183,
        fillColor: 'var(--instrument-enhanced-secondary-color)',
        strokeColor: 'var(--border-silhouette-color)',
      },
      {
        angle: 260,
        fillColor: 'var(--instrument-enhanced-secondary-color)',
        strokeColor: 'var(--border-silhouette-color)',
      },
    ],
    vessels: [
      {
        size: VesselImageSize.large,
        vesselImage: VesselImage.psvSide,
        transform: 'rotate(-10deg)',
      },
      {
        size: VesselImageSize.large,
        vesselImage: VesselImage.psvFore,
        transform: 'rotate(3deg)',
      },
    ],
  },
};

export const TickmarksTest: Story = {
  args: {
    tickmarks: [
      // every 15 degrees
      ...Array.from({length: 24}, (_, i) => ({
        angle: i * 15,
        type: TickmarkType.secondary,
        text: `000`,
      })),
    ],
  },
  render: (args) => {
    return html`
    <style>
      .container {
        position: relative;
        width: 472px;
        height: 472px;
      }

      .container * {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
      }
    </style>
    <div class="container">
      <obc-watch .tickmarks=${args.tickmarks}></obc-watch>
      <svg width="472" height="472" viewBox="-36 -36 472 472">
        <circle cx="200" cy="200" r="184" stroke="green" stroke-width="2" fill="none" opacity="0.5"/>
        <circle cx="200" cy="200" r="193" stroke="blue" stroke-width="2" fill="none" opacity="0.5">
        ${args.tickmarks.map(
          (tickmark) => svg`
          <line x1="200" y1="200" 
            x2=${200 + Math.cos((tickmark.angle * Math.PI) / 180) * 200} 
            y2=${200 + Math.sin((tickmark.angle * Math.PI) / 180) * 200} 
            stroke="darkgreen" stroke-width="2" opacity="0.5"/>
        `
        )}
      </svg>
      
      </div>
    `;
  },
};

export const TickmarksInsideTest: Story = {
  args: {
    tickmarks: [
      // every 15 degrees
      ...Array.from({length: 24}, (_, i) => ({
        angle: i * 15,
        type: TickmarkType.secondary,
        text: `000`,
      })),
    ],
  },
  render: (args) => {
    return html`
      <style>
        .container {
          position: relative;
          width: 400px;
          height: 400px;
        }

        .container * {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          margin: auto;
        }
      </style>
      <div class="container">
        <svg width="400" height="400" viewBox="0 0 400 400">
          <circle
            cx="200"
            cy="200"
            r="160"
            stroke="red"
            stroke-width="2"
            fill="none"
            opacity="0.5"
          />
          <circle
            cx="200"
            cy="200"
            r="151"
            stroke="blue"
            stroke-width="2"
            fill="none"
            opacity="0.5"
          />
          ${args.tickmarks.map(
            (tickmark) => svg`
          <line x1="200" y1="200" 
            x2=${200 + Math.cos((tickmark.angle * Math.PI) / 180) * 200} 
            y2=${200 + Math.sin((tickmark.angle * Math.PI) / 180) * 200} 
            stroke="darkgreen" stroke-width="2" opacity="0.5"/>
        `
          )}
        </svg>
        <obc-watch
          .tickmarks=${args.tickmarks}
          .tickmarksInside=${true}
        ></obc-watch>
      </div>
    `;
  },
};

export const TickmarksTestRotation: Story = {
  args: {
    tickmarks: [
      // every 15 degrees
      ...Array.from({length: 24}, (_, i) => ({
        angle: i * 15,
        type: TickmarkType.secondary,
        text: `000`,
      })),
    ],
    rotation: 45,
  },
  render: (args) => {
    return html`
      <style>
        .container {
          position: relative;
          width: 472px;
          height: 472px;
        }

        .container * {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          margin: auto;
        }
      </style>
      <div class="container">
        <obc-watch
          .tickmarks=${args.tickmarks}
          .rotation=${args.rotation}
        ></obc-watch>
        <svg
          width="472"
          height="472"
          viewBox="-36 -36 472 472"
          transform="rotate(${args.rotation})"
        >
          <circle
            cx="200"
            cy="200"
            r="203"
            stroke="blue"
            stroke-width="1"
            fill="none"
            opacity="0.5"
          />
          <circle
            cx="200"
            cy="200"
            r="184"
            stroke="red"
            stroke-width="1"
            fill="none"
            opacity="0.5"
          />
          ${args.tickmarks.map(
            (tickmark) => svg`
          <line x1="200" y1="200" 
            x2=${200 + Math.cos((tickmark.angle * Math.PI) / 180) * 200} 
            y2=${200 + Math.sin((tickmark.angle * Math.PI) / 180) * 200} 
            stroke="hsl(${tickmark.angle}, 100%, 50%)" stroke-width="2" opacity="1"/>
        `
          )}
        </svg>
      </div>
    `;
  },
};

export const TickmarksTestInsideRotation: Story = {
  args: {
    tickmarks: [
      // every 15 degrees
      ...Array.from({length: 24}, (_, i) => ({
        angle: i * 15,
        type: TickmarkType.secondary,
        text: `000`,
      })),
    ],
    rotation: 45,
  },
  render: (args) => {
    return html`
      <style>
        .container {
          position: relative;
          width: 400px;
          height: 400px;
        }

        .container * {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      </style>
      <div class="container">
        <obc-watch
          .tickmarks=${args.tickmarks}
          .tickmarksInside=${true}
          .rotation=${args.rotation}
        ></obc-watch>
        <svg width="400" height="400" viewBox="0 0 400 400">
          <circle
            cx="200"
            cy="200"
            r="160"
            stroke="red"
            stroke-width="2"
            fill="none"
            opacity="0.5"
          />
          <circle
            cx="200"
            cy="200"
            r="151"
            stroke="blue"
            stroke-width="2"
            fill="none"
            opacity="0.5"
          />
          <circle
            cx="200"
            cy="200"
            r="141"
            stroke="blue"
            stroke-width="1"
            fill="none"
            opacity="0.5"
          />
          ${args.tickmarks.map(
            (tickmark) => svg`
          <line x1="200" y1="200" 
            x2=${200 + Math.cos((tickmark.angle * Math.PI) / 180) * 200} 
            y2=${200 + Math.sin((tickmark.angle * Math.PI) / 180) * 200} 
            stroke="darkgreen" stroke-width="2" opacity="0.5"/>
        `
          )}
        </svg>
      </div>
    `;
  },
};

/**
 * Side-by-side comparison of setpoint visual states for radial instruments.
 *
 * This story demonstrates the same state grid as bar-vertical/horizontal and
 * gauge-vertical/horizontal components, but for radial (watch-based) instruments.
 *
 * | State | Description |
 * |-------|-------------|
 * | **enhanced** | Enhanced colors, value matches setpoint |
 * | **active** | Enhanced colors, value differs from setpoint |
 * | **loading** | Disabled/tertiary colors |
 * | **off** | Disabled/tertiary colors |
 * | **adjusting** | Dual markers: original dimmed, new in focus state |
 */
export const StateComparison: Story = {
  name: 'State comparison (enhanced/active/loading/off/adjusting)',

  render: () => html`
    <div style="display: flex; gap: 24px; align-items: flex-start;">
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          enhanced
        </div>
        <div style="width: 160px; height: 160px;">
          <obc-watch
            .state=${InstrumentState.active}
            .priority=${Priority.enhanced}
            .angleSetpoint=${45}
            .atAngleSetpoint=${true}
            .watchCircleType=${WatchCircleType.double}
            .areas=${[
              {
                startAngle: -90,
                endAngle: 90,
                roundInsideCut: true,
                roundOutsideCut: true,
              },
            ]}
            .barAreas=${[
              {
                startAngle: 0,
                endAngle: 45,
                fillColor: 'var(--instrument-enhanced-tertiary-color)',
              },
            ]}
          ></obc-watch>
        </div>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          active
        </div>
        <div style="width: 160px; height: 160px;">
          <obc-watch
            .state=${InstrumentState.active}
            .angleSetpoint=${60}
            .atAngleSetpoint=${false}
            .watchCircleType=${WatchCircleType.double}
            .areas=${[
              {
                startAngle: -90,
                endAngle: 90,
                roundInsideCut: true,
                roundOutsideCut: true,
              },
            ]}
            .barAreas=${[
              {
                startAngle: 0,
                endAngle: 30,
                fillColor: 'var(--instrument-regular-tertiary-color)',
              },
            ]}
          ></obc-watch>
        </div>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          loading
        </div>
        <div style="width: 160px; height: 160px;">
          <obc-watch
            .state=${InstrumentState.loading}
            .angleSetpoint=${45}
            .atAngleSetpoint=${false}
            .watchCircleType=${WatchCircleType.double}
            .areas=${[
              {
                startAngle: -90,
                endAngle: 90,
                roundInsideCut: true,
                roundOutsideCut: true,
              },
            ]}
            .barAreas=${[
              {
                startAngle: 0,
                endAngle: 20,
                fillColor: 'var(--instrument-frame-tertiary-color)',
              },
            ]}
          ></obc-watch>
        </div>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">off</div>
        <div style="width: 160px; height: 160px;">
          <obc-watch
            .state=${InstrumentState.off}
            .angleSetpoint=${45}
            .atAngleSetpoint=${false}
            .watchCircleType=${WatchCircleType.double}
            .areas=${[
              {
                startAngle: -90,
                endAngle: 90,
                roundInsideCut: true,
                roundOutsideCut: true,
              },
            ]}
            .barAreas=${[
              {
                startAngle: 0,
                endAngle: 60,
                fillColor: 'var(--instrument-frame-tertiary-color)',
              },
            ]}
          ></obc-watch>
        </div>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          adjusting (dual markers)
        </div>
        <div style="width: 160px; height: 160px;">
          <obc-watch
            .state=${InstrumentState.active}
            .priority=${Priority.enhanced}
            .angleSetpoint=${30}
            .newAngleSetpoint=${60}
            .atAngleSetpoint=${true}
            .watchCircleType=${WatchCircleType.double}
            .areas=${[
              {
                startAngle: -90,
                endAngle: 90,
                roundInsideCut: true,
                roundOutsideCut: true,
              },
            ]}
            .barAreas=${[
              {
                startAngle: 0,
                endAngle: 30,
                fillColor: 'var(--instrument-enhanced-tertiary-color)',
              },
            ]}
          ></obc-watch>
        </div>
      </div>
    </div>
  `,
};
