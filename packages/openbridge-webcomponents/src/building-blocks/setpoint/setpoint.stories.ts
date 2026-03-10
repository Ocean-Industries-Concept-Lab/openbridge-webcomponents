import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {userEvent, within} from 'storybook/test';
import {gsap} from 'gsap';

// Import the bar-vertical component for displaying setpoints in context
import '../bar-vertical/bar-vertical.js';
// Import gauge-horizontal for the adjustment flow demo
import '../../navigation-instruments/gauge-horizontal/gauge-horizontal.js';
// Import watch for radial setpoint demos
import '../../navigation-instruments/watch/watch.js';
import {WatchCircleType} from '../../navigation-instruments/watch/watch.js';
// Import azimuth-thruster for multi-setpoint demo
import '../../navigation-instruments/azimuth-thruster/azimuth-thruster.js';
// Import types needed for bar-vertical configuration
import {InstrumentState, Priority} from '../../navigation-instruments/types.js';
import {
  ExternalScaleSide,
  FillMode,
  BorderRadiusPosition,
} from '../bar-vertical/bar-vertical.js';

/**
 * Setpoint Marker Visual States
 *
 * This module demonstrates the visual states of the setpoint marker used
 * across both radial (watch-based) and linear (external-scale) instruments.
 *
 * ## Visual States
 *
 * | State | Description | Size | Shape |
 * |-------|-------------|------|-------|
 * | `notEqual` | Input ≠ Output (value not at setpoint) | 100% | Filled |
 * | `equal` | Input = Output (value at setpoint) | 80% | Filled |
 * | `equalZero` | Input = Output = 0 | 80% + 8px offset | Filled |
 * | `focus` | User is actively adjusting | 100% | Filled + Border |
 *
 * ## Color Modes
 *
 * - **Regular**: Uses `--instrument-regular-*-color` palette
 * - **Enhanced**: Uses `--instrument-enhanced-*-color` palette (typically for enhanced priority)
 *
 * ## Disabled State
 *
 * Disabled is a separate boolean flag (not a color mode):
 * - Auto-derived from `InstrumentState.loading` or `InstrumentState.off`
 * - Uses `--instrument-frame-tertiary-color` (tertiary/disabled color)
 * - Can be manually overridden via `setpointDisabled` property
 *
 * ## Architecture
 *
 * The setpoint system is split into two layers:
 *
 * 1. **Design layer** (`svghelpers/setpoint.ts`): Pure visual states and drawing functions
 * 2. **API layer** (in parent instruments): Maps instrument state to visual state
 *
 * These stories demonstrate the design layer only.
 */
const meta = {
  title: 'Building Blocks/Setpoint',
  tags: ['autodocs', '6.0'],
  parameters: {
    docs: {
      description: {
        component: `# Setpoint Marker Visual States

The setpoint marker is a triangular indicator used to show the target/input value on instruments.

## Visual States

- **notEqual**: Value has not reached setpoint - full size, filled triangle
- **equal**: Value equals setpoint (within deadband) - 80% size, filled triangle  
- **equalZero**: Both value and setpoint are at zero - 80% size + 8px outward offset
- **focus**: User is actively adjusting - full size, filled with tertiary color and 2px border

## Color Modes

Each state can be rendered in two color palettes:
- **Regular**: For non-priority states
- **Enhanced**: For in-command/priority states (brighter colors)

## Disabled State

Disabled is a separate boolean flag (not a color mode):
- Auto-derived from \`InstrumentState.loading\` or \`InstrumentState.off\`
- Uses tertiary/gray color regardless of color mode
- Can be manually overridden

Source: \`packages/openbridge-webcomponents/src/svghelpers/setpoint.ts\``,
      },
    },
  },
  argTypes: {
    value: {
      description: 'Current value (bar fill position)',
      control: {type: 'range', min: -50, max: 50, step: 1},
    },
    setpoint: {
      description: 'Setpoint position (target value)',
      control: {type: 'range', min: -50, max: 50, step: 1},
    },
    newSetpoint: {
      description: 'New setpoint during adjustment (undefined = no adjustment)',
      control: {type: 'range', min: -50, max: 50, step: 1},
    },
    priority: {
      description: 'Use priority-based color palette',
      control: 'select',
      options: Object.values(Priority),
    },
    state: {
      description: 'Instrument state',
      control: {type: 'select'},
      options: Object.values(InstrumentState),
    },
    autoAtSetpointDeadband: {
      description: 'Deadband for auto at-setpoint detection',
      control: {type: 'range', min: 0, max: 10, step: 0.5},
    },
    setpointAtZeroDeadband: {
      description: 'Deadband for setpoint-at-zero detection',
      control: {type: 'range', min: 0, max: 5, step: 0.1},
    },
  },
  args: {
    value: 20,
    setpoint: 40,
    newSetpoint: undefined,
    priority: Priority.enhanced,
    state: InstrumentState.active,
    autoAtSetpointDeadband: 1,
    setpointAtZeroDeadband: 0.5,
  },
  render: (args) => html`
    <obc-bar-vertical
      minValue="-50"
      maxValue="50"
      height="280"
      side="${ExternalScaleSide.right}"
      primaryTickmarkInterval="25"
      secondaryTickmarkInterval="5"
      hasBar
      scaleBackground
      borderRadiusPosition="${BorderRadiusPosition.innerFirstChild}"
      .priority=${args.priority}
      fillMode="${FillMode.fill}"
      .value=${args.value}
      .setpoint=${args.setpoint}
      .newSetpoint=${args.newSetpoint}
      .state=${args.state}
      .autoAtSetpointDeadband=${args.autoAtSetpointDeadband}
      .setpointAtZeroDeadband=${args.setpointAtZeroDeadband}
    ></obc-bar-vertical>
  `,
} satisfies Meta;

export default meta;
type Story = StoryObj;

// Helper to render a bar-vertical with specific setpoint state
function renderSetpointDemo(config: {
  label: string;
  priority?: Priority;
  setpointOverride?: boolean;
  setpoint: number;
  newSetpoint?: number;
  value: number;
  state: InstrumentState;
  touching?: boolean;
}) {
  const {
    label,
    priority = Priority.regular,
    setpointOverride = false,
    setpoint,
    newSetpoint,
    value,
    state,
    touching = false,
  } = config;

  return html`
    <div style="text-align: center;">
      <div style="margin-bottom: 8px; font-size: 12px; color: #888;">
        ${label}
      </div>
      <obc-bar-vertical
        minValue="-50"
        maxValue="50"
        height="200"
        side="${ExternalScaleSide.right}"
        primaryTickmarkInterval="25"
        secondaryTickmarkInterval="5"
        hasBar
        scaleBackground
        borderRadiusPosition="${BorderRadiusPosition.innerFirstChild}"
        .priority=${priority}
        .setpointOverride=${setpointOverride}
        fillMode="${FillMode.fill}"
        .value=${value}
        .setpoint=${setpoint}
        .newSetpoint=${newSetpoint}
        .state=${state}
        .touching=${touching}
        autoAtSetpointDeadband="1"
        setpointAtZeroDeadband="0.5"
      ></obc-bar-vertical>
    </div>
  `;
}

// =============================================================================
// Individual State Stories
// =============================================================================

/**
 * **notEqual** - Input ≠ Output
 *
 * The setpoint marker is at full size (100%) when the current value
 * has not yet reached the setpoint.
 *
 * Use the controls to adjust value, setpoint, enhanced mode, etc.
 */
export const NotEqual: Story = {
  name: 'notEqual (Input ≠ Output)',
  args: {
    value: 20,
    setpoint: 40,
    newSetpoint: undefined,
    priority: Priority.enhanced,
    state: InstrumentState.active,
  },
};

/**
 * **equal** - Input = Output
 *
 * The setpoint marker shrinks to 80% size when the current value
 * equals the setpoint (within the deadband tolerance).
 *
 * Use the controls to adjust value, setpoint, enhanced mode, etc.
 */
export const Equal: Story = {
  name: 'equal (Input = Output)',
  args: {
    value: 40,
    setpoint: 40,
    newSetpoint: undefined,
    priority: Priority.enhanced,
    state: InstrumentState.active,
  },
};

/**
 * **equalZero** - Input = Output = 0
 *
 * When both value and setpoint are at zero, the marker shrinks to 80%
 * AND shifts 8px outward from the scale to avoid overlapping with
 * the zero position indicator.
 *
 * Use the controls to adjust value, setpoint, enhanced mode, etc.
 */
export const EqualZero: Story = {
  name: 'equalZero (Input = Output = 0)',
  args: {
    value: 0,
    setpoint: 0,
    newSetpoint: undefined,
    priority: Priority.enhanced,
    state: InstrumentState.active,
  },
};

/**
 * **focus** - User is actively adjusting (dual-marker mode)
 *
 * When the user is actively adjusting the setpoint (e.g., dragging),
 * setting `newSetpoint` triggers dual-marker mode:
 * - Original setpoint is dimmed (0.75 opacity)
 * - New setpoint shows in focus state (filled with border)
 *
 * Use the controls to adjust value, setpoint, newSetpoint, etc.
 */
export const Focus: Story = {
  name: 'focus (User adjusting)',
  args: {
    value: 10,
    setpoint: 20,
    newSetpoint: 50,
    priority: Priority.enhanced,
    state: InstrumentState.active,
  },
};

// =============================================================================
// Comparison Story
// =============================================================================

/**
 * **Visual State Comparison**
 *
 * Side-by-side comparison of all setpoint visual states for linear instruments (bar-vertical).
 *
 * - **Row 1**: regular — Priority.regular color palette
 * - **Row 2**: enhanced — Priority.enhanced color palette
 * - **Row 3**: focus — touching=true (no newSetpoint), marker in focus visual state
 * - **Row 4**: newSetpoint — dual-marker mode via `newSetpoint` (original dimmed, new in focus)
 * - **Row 5**: disabled — InstrumentState.off, tertiary/gray colors
 */
export const SetpointComparison: Story = {
  name: 'Visual State Comparison',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Header row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(3, 1fr); gap: 16px; align-items: center;"
      >
        <div></div>
        <div
          style="text-align: center; font-weight: bold; font-size: 12px; color: #ccc;"
        >
          notEqual
        </div>
        <div
          style="text-align: center; font-weight: bold; font-size: 12px; color: #ccc;"
        >
          equal
        </div>
        <div
          style="text-align: center; font-weight: bold; font-size: 12px; color: #ccc;"
        >
          equalZero
        </div>
      </div>

      <!-- regular row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(3, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 80px;">
          regular
        </div>
        ${renderSetpointDemo({
          label: 'value ≠ setpoint',
          setpoint: 40,
          value: 20,
          state: InstrumentState.active,
          priority: Priority.regular,
        })}
        ${renderSetpointDemo({
          label: 'value = setpoint',
          setpoint: 40,
          value: 40,
          state: InstrumentState.active,
          priority: Priority.regular,
        })}
        ${renderSetpointDemo({
          label: 'both = 0',
          setpoint: 0,
          value: 0,
          state: InstrumentState.active,
          priority: Priority.regular,
        })}
      </div>

      <!-- enhanced row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(3, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 80px;">
          enhanced
        </div>
        ${renderSetpointDemo({
          label: 'value ≠ setpoint',
          setpoint: 40,
          value: 20,
          state: InstrumentState.active,
          priority: Priority.enhanced,
        })}
        ${renderSetpointDemo({
          label: 'value = setpoint',
          setpoint: 40,
          value: 40,
          state: InstrumentState.active,
          priority: Priority.enhanced,
        })}
        ${renderSetpointDemo({
          label: 'both = 0',
          setpoint: 0,
          value: 0,
          state: InstrumentState.active,
          priority: Priority.enhanced,
        })}
      </div>

      <!-- focus row (touching=true, no newSetpoint) -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(3, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 80px;">
          focus
        </div>
        ${renderSetpointDemo({
          label: 'touching, value ≠ setpoint',
          setpoint: 40,
          value: 20,
          state: InstrumentState.active,
          priority: Priority.enhanced,
          touching: true,
        })}
        ${renderSetpointDemo({
          label: 'touching, value = setpoint',
          setpoint: 40,
          value: 40,
          state: InstrumentState.active,
          priority: Priority.enhanced,
          touching: true,
        })}
        ${renderSetpointDemo({
          label: 'touching, both = 0',
          setpoint: 0,
          value: 0,
          state: InstrumentState.active,
          priority: Priority.enhanced,
          touching: true,
        })}
      </div>

      <!-- newSetpoint row (dual-marker mode) -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(3, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 80px;">
          newSetpoint
        </div>
        ${renderSetpointDemo({
          label: 'setpoint at 20, new at 40',
          setpointOverride: true,
          setpoint: 20,
          newSetpoint: 40,
          value: 20,
          state: InstrumentState.active,
          priority: Priority.enhanced,
        })}
        ${renderSetpointDemo({
          label: 'setpoint at 40, new at 30',
          setpointOverride: true,
          setpoint: 40,
          newSetpoint: 30,
          value: 40,
          state: InstrumentState.active,
          priority: Priority.enhanced,
        })}
        ${renderSetpointDemo({
          label: 'setpoint at 0, new at 20',
          setpointOverride: true,
          setpoint: 0,
          newSetpoint: 20,
          value: 0,
          state: InstrumentState.active,
          priority: Priority.enhanced,
        })}
      </div>

      <!-- disabled row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(3, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 80px;">
          disabled
        </div>
        ${renderSetpointDemo({
          label: 'value ≠ setpoint',
          setpoint: 40,
          value: 20,
          state: InstrumentState.off,
        })}
        ${renderSetpointDemo({
          label: 'value = setpoint',
          setpoint: 40,
          value: 40,
          state: InstrumentState.off,
        })}
        ${renderSetpointDemo({
          label: 'both = 0',
          setpoint: 0,
          value: 0,
          state: InstrumentState.off,
        })}
      </div>

      <!-- Note -->
      <div style="font-size: 11px; color: #666; font-style: italic;">
        Note: "focus" row shows the marker in focus state triggered by
        touching=true (no newSetpoint). "newSetpoint" row shows dual-marker mode
        triggered by setting newSetpoint — the original setpoint is dimmed (0.75
        opacity) while the new setpoint shows in focus state. "equalZero" is
        auto-derived when setpoint is within setpointAtZeroDeadband (default
        0.5).
      </div>
    </div>
  `,
};

// =============================================================================
// Radial Setpoint Comparison Story
// =============================================================================

// Helper to render a watch with specific setpoint state
function renderRadialSetpointDemo(config: {
  label: string;
  angleSetpoint: number;
  newAngleSetpoint?: number;
  atAngleSetpoint?: boolean;
  touching?: boolean;
  state: InstrumentState;
  priority?: Priority;
  /** Fill arc end angle (start is always 0 for this demo) */
  fillEndAngle?: number;
  /** When true, derive setpoint color from priority even in loading/off states */
  setpointOverride?: boolean;
}) {
  const {
    label,
    angleSetpoint,
    newAngleSetpoint,
    atAngleSetpoint = false,
    touching = false,
    state,
    priority = Priority.regular,
    fillEndAngle,
    setpointOverride = false,
  } = config;

  // Determine bar fill color based on priority
  const fillColor =
    priority === Priority.enhanced
      ? 'var(--instrument-enhanced-tertiary-color)'
      : 'var(--instrument-regular-tertiary-color)';

  // Create barAreas if fillEndAngle is provided
  const barAreas =
    fillEndAngle !== undefined
      ? [
          {
            startAngle: 0,
            endAngle: fillEndAngle,
            fillColor,
          },
        ]
      : [];

  // Create areas (cut area) to match WithBarAreas style
  const areas =
    fillEndAngle !== undefined
      ? [
          {
            startAngle: -90,
            endAngle: 90,
            roundInsideCut: true,
            roundOutsideCut: true,
          },
        ]
      : [];

  return html`
    <div style="text-align: center;">
      <div style="margin-bottom: 8px; font-size: 12px; color: #888;">
        ${label}
      </div>
      <div style="width: 100%; height: 160px;">
        <obc-watch
          .state=${state}
          .priority=${priority}
          .angleSetpoint=${angleSetpoint}
          .newAngleSetpoint=${newAngleSetpoint}
          .atAngleSetpoint=${atAngleSetpoint}
          .touching=${touching}
          .setpointOverride=${setpointOverride}
          .watchCircleType=${WatchCircleType.double}
          .areas=${areas}
          .barAreas=${barAreas}
        ></obc-watch>
      </div>
    </div>
  `;
}

/**
 * Side-by-side comparison of all setpoint visual states for radial instruments (watch).
 *
 * Visual state mapping:
 * - **notEqual**: bar at 45°, setpoint at 60° (different positions)
 * - **equal**: bar at 45°, setpoint at 45° (same position, atSetpoint=true)
 * - **equalZero**: bar at 0°, setpoint at 0° (both at zero, auto-derived)
 *
 * Row mapping:
 * - **regular**: Priority.regular color palette
 * - **enhanced**: Priority.enhanced color palette
 * - **focus**: touching=true (no newAngleSetpoint) — marker in focus visual state
 * - **newSetpoint**: dual-marker mode via newAngleSetpoint (original dimmed, new in focus)
 * - **disabled**: InstrumentState.off — tertiary/gray colors
 */
export const SetpointComparisonRadial: Story = {
  name: 'Visual State Comparison (Radial)',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Header row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(3, 1fr); gap: 16px; align-items: center;"
      >
        <div></div>
        <div
          style="text-align: center; font-weight: bold; font-size: 12px; color: #ccc;"
        >
          notEqual
        </div>
        <div
          style="text-align: center; font-weight: bold; font-size: 12px; color: #ccc;"
        >
          equal
        </div>
        <div
          style="text-align: center; font-weight: bold; font-size: 12px; color: #ccc;"
        >
          equalZero
        </div>
      </div>

      <!-- regular row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(3, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 60px;">
          regular
        </div>
        ${renderRadialSetpointDemo({
          label: 'bar at 45°, setpoint at 60°',
          angleSetpoint: 60,
          atAngleSetpoint: false,
          fillEndAngle: 45,
          state: InstrumentState.active,
          priority: Priority.regular,
        })}
        ${renderRadialSetpointDemo({
          label: 'bar at 45°, setpoint at 45°',
          angleSetpoint: 45,
          atAngleSetpoint: true,
          fillEndAngle: 45,
          state: InstrumentState.active,
          priority: Priority.regular,
        })}
        ${renderRadialSetpointDemo({
          label: 'bar at 0°, setpoint at 0°',
          angleSetpoint: 0,
          atAngleSetpoint: true,
          fillEndAngle: 0,
          state: InstrumentState.active,
          priority: Priority.regular,
        })}
      </div>

      <!-- enhanced row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(3, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 60px;">
          enhanced
        </div>
        ${renderRadialSetpointDemo({
          label: 'bar at 45°, setpoint at 60°',
          angleSetpoint: 60,
          atAngleSetpoint: false,
          fillEndAngle: 45,
          state: InstrumentState.active,
          priority: Priority.enhanced,
        })}
        ${renderRadialSetpointDemo({
          label: 'bar at 45°, setpoint at 45°',
          angleSetpoint: 45,
          atAngleSetpoint: true,
          fillEndAngle: 45,
          state: InstrumentState.active,
          priority: Priority.enhanced,
        })}
        ${renderRadialSetpointDemo({
          label: 'bar at 0°, setpoint at 0°',
          angleSetpoint: 0,
          atAngleSetpoint: true,
          fillEndAngle: 0,
          state: InstrumentState.active,
          priority: Priority.enhanced,
        })}
      </div>

      <!-- focus row (touching=true, no newAngleSetpoint) -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(3, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 60px;">
          focus
        </div>
        ${renderRadialSetpointDemo({
          label: 'touching, bar at 45°, setpoint at 60°',
          angleSetpoint: 60,
          atAngleSetpoint: false,
          touching: true,
          fillEndAngle: 45,
          state: InstrumentState.active,
          priority: Priority.enhanced,
        })}
        ${renderRadialSetpointDemo({
          label: 'touching, bar at 45°, setpoint at 45°',
          angleSetpoint: 45,
          atAngleSetpoint: true,
          touching: true,
          fillEndAngle: 45,
          state: InstrumentState.active,
          priority: Priority.enhanced,
        })}
        ${renderRadialSetpointDemo({
          label: 'touching, bar at 0°, setpoint at 0°',
          angleSetpoint: 0,
          atAngleSetpoint: true,
          touching: true,
          fillEndAngle: 0,
          state: InstrumentState.active,
          priority: Priority.enhanced,
        })}
      </div>

      <!-- newSetpoint row (dual markers) -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(3, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 60px;">
          newSetpoint
        </div>
        ${renderRadialSetpointDemo({
          label: 'bar at 45°, setpoint at 60°, new at 80°',
          angleSetpoint: 60,
          atAngleSetpoint: false,
          fillEndAngle: 45,
          state: InstrumentState.active,
          priority: Priority.enhanced,
          newAngleSetpoint: 80,
        })}
        ${renderRadialSetpointDemo({
          label: 'bar at 45°, setpoint at 45°, new at 60°',
          angleSetpoint: 45,
          atAngleSetpoint: true,
          fillEndAngle: 45,
          state: InstrumentState.active,
          priority: Priority.enhanced,
          newAngleSetpoint: 60,
        })}
        ${renderRadialSetpointDemo({
          label: 'bar at 0°, setpoint at 0°, new at 30°',
          angleSetpoint: 0,
          atAngleSetpoint: true,
          fillEndAngle: 0,
          state: InstrumentState.active,
          priority: Priority.enhanced,
          newAngleSetpoint: 30,
        })}
      </div>

      <!-- disabled row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(3, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 60px;">
          disabled
        </div>
        ${renderRadialSetpointDemo({
          label: 'bar at 45°, setpoint at 60°',
          angleSetpoint: 60,
          atAngleSetpoint: false,
          fillEndAngle: 45,
          state: InstrumentState.off,
        })}
        ${renderRadialSetpointDemo({
          label: 'bar at 45°, setpoint at 45°',
          angleSetpoint: 45,
          atAngleSetpoint: true,
          fillEndAngle: 45,
          state: InstrumentState.off,
        })}
        ${renderRadialSetpointDemo({
          label: 'bar at 0°, setpoint at 0°',
          angleSetpoint: 0,
          atAngleSetpoint: true,
          fillEndAngle: 0,
          state: InstrumentState.off,
        })}
      </div>

      <!-- Note -->
      <div style="font-size: 11px; color: #666; font-style: italic;">
        Note: "focus" row shows the marker in focus state triggered by
        touching=true (no newAngleSetpoint). "newSetpoint" row shows dual-marker
        mode triggered by setting newAngleSetpoint — the original setpoint is
        dimmed (0.75 opacity) while the new setpoint shows in focus state.
        "equalZero" is auto-derived when angleSetpoint is within
        angleSetpointAtZeroDeadband (default 0.5°).
      </div>
    </div>
  `,
};

// =============================================================================
// Interactive Flow Story
// =============================================================================

/**
 * **Setpoint Adjustment Flow** - Interactive demo showing setpoint adjustment UX
 *
 * This story demonstrates the complete setpoint adjustment workflow:
 *
 * 1. **t=0 (At setpoint)**: Bar is filled to 40, setpoint is at 40 (equal state - 80% size)
 * 2. **t=1 (Initiate adjustment)**: User starts adjusting, newSetpoint appears at same position
 * 3. **t=2 (Move new setpoint)**: newSetpoint moves to 80, original setpoint stays dimmed at 40
 * 4. **t=3 (Confirm)**: newSetpoint confirmed, bar animates to 80, original setpoint moves to 80
 *
 * The `newSetpoint` property enables showing both current and proposed setpoint positions
 * simultaneously, with the original dimmed (0.75 opacity) while adjusting.
 *
 * Tertiary tickmarks are shown during adjustment (tertiaryTickmarkInterval=2).
 */
export const SetpointAdjustmentFlow: StoryObj = {
  tags: ['!snapshot'],
  name: 'Setpoint Adjustment Flow (interactive)',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div style="font-size: 14px; color: #888;">
        Click "Play" in the Interactions panel to watch the setpoint adjustment
        animation, or use the buttons below for manual control.
      </div>
      <obc-gauge-horizontal
        id="setpoint-demo"
        minValue="0"
        maxValue="100"
        side="top"
        primaryTickmarkInterval="20"
        secondaryTickmarkInterval="10"
        tertiaryTickmarkInterval="2"
        priority="enhanced"
        fillMode="${FillMode.fill}"
        fillMin="0"
        fillMax="40"
        value="40"
        setpoint="40"
        state="active"
        animateSetpoint
      ></obc-gauge-horizontal>

      <div
        style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;"
      >
        <button id="btn-reset" style="padding: 8px 16px; cursor: pointer;">
          Reset (t=0)
        </button>
        <button id="btn-initiate" style="padding: 8px 16px; cursor: pointer;">
          Initiate (t=1)
        </button>
        <button id="btn-move" style="padding: 8px 16px; cursor: pointer;">
          Move (t=2)
        </button>
        <button id="btn-confirm" style="padding: 8px 16px; cursor: pointer;">
          Confirm (t=3)
        </button>
      </div>

      <div
        id="status"
        style="font-size: 12px; color: #666; font-family: monospace;"
      >
        State: t=0 (at setpoint) | value=40, setpoint=40, newSetpoint=undefined
      </div>
    </div>
  `,
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);

    // Wait for component to render
    await new Promise((r) => setTimeout(r, 500));

    // Get DOM elements
    const gauge = canvasElement.querySelector(
      '#setpoint-demo'
    ) as HTMLElement & {
      value: number;
      fillMax: number;
      setpoint: number;
      newSetpoint: number | undefined;
    };
    const status = canvasElement.querySelector('#status') as HTMLElement;

    if (!gauge || !status) return;

    // Animation proxy – GSAP interpolates numeric fields, we push them to the component in onUpdate
    const anim = {value: 40, setpoint: 40, newSetpoint: 40};

    const updateStatus = (state: string) => {
      const ns = gauge.newSetpoint;
      status.textContent = `State: ${state} | value=${Math.round(anim.value)}, setpoint=${Math.round(anim.setpoint)}, newSetpoint=${ns !== undefined ? Math.round(anim.newSetpoint) : 'undefined'}`;
    };

    /** Kill every running tween that targets the proxy */
    const killAll = () => gsap.killTweensOf(anim);

    // Get buttons
    const btnReset = canvas.getByRole('button', {name: /Reset/});
    const btnInitiate = canvas.getByRole('button', {name: /Initiate/});
    const btnMove = canvas.getByRole('button', {name: /Move/});
    const btnConfirm = canvas.getByRole('button', {name: /Confirm/});

    // ── Button handlers (work both via auto-play and manual clicks) ──

    btnReset.onclick = () => {
      killAll();
      anim.value = 40;
      anim.setpoint = 40;
      anim.newSetpoint = 40;
      gauge.value = 40;
      gauge.fillMax = 40;
      gauge.setpoint = 40;
      gauge.newSetpoint = undefined;
      updateStatus('t=0 (at setpoint)');
    };

    btnInitiate.onclick = () => {
      killAll();
      anim.newSetpoint = anim.setpoint;
      gauge.newSetpoint = anim.setpoint;
      updateStatus('t=1 (initiate)');
    };

    btnMove.onclick = () => {
      killAll();
      // Start from wherever newSetpoint currently is (or fall back to setpoint)
      if (gauge.newSetpoint === undefined) {
        gauge.newSetpoint = anim.setpoint;
      }
      anim.newSetpoint = gauge.newSetpoint;

      gsap.to(anim, {
        newSetpoint: 80,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          gauge.newSetpoint = anim.newSetpoint;
          updateStatus('t=2 (move)');
        },
      });
    };

    btnConfirm.onclick = () => {
      killAll();
      const target = Math.round(gauge.newSetpoint ?? 80);

      // Component handles the setpoint slide + newSetpoint fade-out via CSS transition
      gauge.setpoint = target;
      gauge.newSetpoint = undefined;

      // Sync proxy for value animation
      anim.value = gauge.value;
      anim.setpoint = target;

      // Value / bar fill follows (simulates vessel response)
      gsap.to(anim, {
        value: target,
        duration: 1.5,
        ease: 'power1.out',
        onUpdate: () => {
          gauge.value = anim.value;
          gauge.fillMax = anim.value;
          updateStatus('t=3 (confirm)');
        },
      });
    };

    // ── Auto-play sequence ──

    // t=0 – reset
    await userEvent.click(btnReset);
    await new Promise((r) => setTimeout(r, 1000));

    // t=1 – initiate
    await userEvent.click(btnInitiate);
    await new Promise((r) => setTimeout(r, 1200));

    // t=2 – move newSetpoint (1.5 s animation + 1 s pause)
    await userEvent.click(btnMove);
    await new Promise((r) => setTimeout(r, 3000));

    // t=3 – confirm (1.5 s animation + 1 s pause)
    await userEvent.click(btnConfirm);
    await new Promise((r) => setTimeout(r, 3000));
  },
};

/**
 * **Setpoint Radial Adjustment Flow** - Interactive demo showing radial setpoint adjustment UX
 *
 * This story demonstrates the complete setpoint adjustment workflow for radial instruments:
 *
 * 1. **t=0 (At setpoint)**: Fill at 30°, setpoint at 30° (equal state - 80% size)
 * 2. **t=1 (Initiate adjustment)**: User starts adjusting, newAngleSetpoint appears at same position
 * 3. **t=2 (Move new setpoint)**: newAngleSetpoint moves to 60°, original setpoint stays dimmed at 30°
 * 4. **t=3 (Confirm)**: newAngleSetpoint confirmed, fill animates to 60°, original setpoint moves to 60°
 *
 * The `newAngleSetpoint` property enables showing both current and proposed setpoint positions
 * simultaneously, with the original dimmed (0.75 opacity) while adjusting.
 *
 * Zero state is auto-derived when `angleSetpoint` is within `angleSetpointAtZeroDeadband` (default 0.5°).
 */
export const SetpointRadialAdjustmentFlow: StoryObj = {
  tags: ['!snapshot'],
  name: 'Setpoint Radial Adjustment Flow (interactive)',
  render: () => {
    // Initial barAreas and areas for 30° fill
    const initialBarAreas = [
      {
        startAngle: 0,
        endAngle: 30,
        fillColor: 'var(--instrument-enhanced-tertiary-color)',
      },
    ];
    const areas = [
      {
        startAngle: -90,
        endAngle: 90,
        roundInsideCut: true,
        roundOutsideCut: true,
      },
    ];

    return html`
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="font-size: 14px; color: #888;">
          Click "Play" in the Interactions panel to watch the radial setpoint
          adjustment animation, or use the buttons below for manual control.
        </div>
        <div style="width: 200px; height: 200px;">
          <obc-watch
            id="radial-setpoint-demo"
            .barAreas=${initialBarAreas}
            .areas=${areas}
            .watchCircleType=${WatchCircleType.double}
            .angleSetpoint=${30}
            .atAngleSetpoint=${true}
            .animateSetpoint=${true}
            .state=${InstrumentState.active}
            .priority=${Priority.enhanced}
          ></obc-watch>
        </div>

        <div
          style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;"
        >
          <button
            id="btn-radial-reset"
            style="padding: 8px 16px; cursor: pointer;"
          >
            Reset (t=0)
          </button>
          <button
            id="btn-radial-initiate"
            style="padding: 8px 16px; cursor: pointer;"
          >
            Initiate (t=1)
          </button>
          <button
            id="btn-radial-move"
            style="padding: 8px 16px; cursor: pointer;"
          >
            Move (t=2)
          </button>
          <button
            id="btn-radial-confirm"
            style="padding: 8px 16px; cursor: pointer;"
          >
            Confirm (t=3)
          </button>
        </div>

        <div
          id="radial-status"
          style="font-size: 12px; color: #666; font-family: monospace;"
        >
          State: t=0 (at setpoint) | barEndAngle=30°, angleSetpoint=30°,
          newAngleSetpoint=undefined
        </div>
      </div>
    `;
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);

    // Wait for component to render
    await new Promise((r) => setTimeout(r, 500));

    // Get DOM elements
    const watch = canvasElement.querySelector(
      '#radial-setpoint-demo'
    ) as HTMLElement & {
      barAreas: Array<{
        startAngle: number;
        endAngle: number;
        fillColor: string;
      }>;
      angleSetpoint: number;
      newAngleSetpoint: number | undefined;
      atAngleSetpoint: boolean;
    };
    const status = canvasElement.querySelector('#radial-status') as HTMLElement;

    if (!watch || !status) return;

    // Helper to create barAreas with a specific end angle
    const createBarAreas = (endAngle: number) => [
      {
        startAngle: 0,
        endAngle,
        fillColor: 'var(--instrument-enhanced-tertiary-color)',
      },
    ];

    // Animation proxy – GSAP interpolates numeric fields, we push them to the component in onUpdate
    const anim = {
      barEndAngle: 30,
      angleSetpoint: 30,
      newAngleSetpoint: 30,
    };

    const updateStatus = (state: string) => {
      const ns = watch.newAngleSetpoint;
      status.textContent = `State: ${state} | barEndAngle=${Math.round(anim.barEndAngle)}°, angleSetpoint=${Math.round(anim.angleSetpoint)}°, newAngleSetpoint=${ns !== undefined ? Math.round(anim.newAngleSetpoint) + '°' : 'undefined'}`;
    };

    /** Kill every running tween that targets the proxy */
    const killAll = () => gsap.killTweensOf(anim);

    // Get buttons
    const btnReset = canvas.getByRole('button', {name: /Reset/});
    const btnInitiate = canvas.getByRole('button', {name: /Initiate/});
    const btnMove = canvas.getByRole('button', {name: /Move/});
    const btnConfirm = canvas.getByRole('button', {name: /Confirm/});

    // ── Button handlers (work both via auto-play and manual clicks) ──

    btnReset.onclick = () => {
      killAll();
      anim.barEndAngle = 30;
      anim.angleSetpoint = 30;
      anim.newAngleSetpoint = 30;
      watch.barAreas = createBarAreas(30);
      watch.angleSetpoint = 30;
      watch.atAngleSetpoint = true;
      watch.newAngleSetpoint = undefined;
      updateStatus('t=0 (at setpoint)');
    };

    btnInitiate.onclick = () => {
      killAll();
      anim.newAngleSetpoint = anim.angleSetpoint;
      watch.newAngleSetpoint = anim.angleSetpoint;
      watch.atAngleSetpoint = false;
      updateStatus('t=1 (initiate)');
    };

    btnMove.onclick = () => {
      killAll();
      if (watch.newAngleSetpoint === undefined) {
        watch.newAngleSetpoint = anim.angleSetpoint;
      }
      anim.newAngleSetpoint = watch.newAngleSetpoint;

      gsap.to(anim, {
        newAngleSetpoint: 60,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          watch.newAngleSetpoint = anim.newAngleSetpoint;
          updateStatus('t=2 (move)');
        },
      });
    };

    btnConfirm.onclick = () => {
      killAll();
      const target = Math.round(watch.newAngleSetpoint ?? 60);

      // Component handles the setpoint slide + newAngleSetpoint fade-out via CSS transition
      watch.angleSetpoint = target;
      watch.newAngleSetpoint = undefined;

      // Sync proxy for bar animation
      anim.angleSetpoint = target;
      anim.barEndAngle = watch.barAreas?.[0]?.endAngle ?? 30;

      // Bar fill follows (simulates vessel response)
      gsap.to(anim, {
        barEndAngle: target,
        duration: 1.5,
        ease: 'power1.out',
        onUpdate: () => {
          watch.barAreas = createBarAreas(anim.barEndAngle);
          updateStatus('t=3 (confirm)');
        },
        onComplete: () => {
          watch.atAngleSetpoint = true;
        },
      });
    };

    // ── Auto-play sequence ──

    // t=0 – reset
    await userEvent.click(btnReset);
    await new Promise((r) => setTimeout(r, 1000));

    // t=1 – initiate
    await userEvent.click(btnInitiate);
    await new Promise((r) => setTimeout(r, 1200));

    // t=2 – move newAngleSetpoint (1.5 s animation + 1 s pause)
    await userEvent.click(btnMove);
    await new Promise((r) => setTimeout(r, 3000));

    // t=3 – confirm (1.5 s animation + 1 s pause)
    await userEvent.click(btnConfirm);
    await new Promise((r) => setTimeout(r, 3000));
  },
};

/**
 * **Setpoint Azimuth Thruster Adjustment Flow** - Interactive demo showing multi-setpoint animation
 *
 * This story demonstrates the setpoint animation on an azimuth-thruster, which has **two independent
 * setpoint axes**: angle (radial, via `<obc-watch>`) and thrust (linear, via `thruster()`).
 *
 * Both axes animate simultaneously during confirm (t=3):
 * - Angle setpoint slides from 30° → 120° on the radial ring (CSS transition)
 * - Thrust setpoint slides from 25% → 70% on the linear bar (CSS transition)
 * - Both departing new-setpoint markers fade out at the same time
 *
 * Angular transitions always take the shortest path via CSS-safe accumulated
 * angles, so even large or wraparound deltas animate correctly.
 */
export const SetpointAzimuthThrusterFlow: StoryObj<{
  thrustDuration: number;
  angleDuration: number;
}> = {
  tags: ['!snapshot'],
  name: 'Setpoint Azimuth Thruster Flow (interactive)',
  args: {
    thrustDuration: 2,
    angleDuration: 10,
  },
  argTypes: {
    thrustDuration: {
      name: 'Thrust anim duration (s)',
      control: {type: 'range', min: 0.5, max: 20, step: 0.5},
    },
    angleDuration: {
      name: 'Angle anim duration (s)',
      control: {type: 'range', min: 0.5, max: 30, step: 0.5},
    },
  },
  render: (args) => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px;"
      data-thrust-duration=${args.thrustDuration}
      data-angle-duration=${args.angleDuration}
    >
      <div style="font-size: 14px; color: #888;">
        Click "Play" in the Interactions panel to watch the dual-axis setpoint
        animation, or use the buttons below for manual control.
      </div>
      <div style="width: 280px; height: 280px;">
        <obc-azimuth-thruster
          id="azimuth-demo"
          .angle=${30}
          .angleSetpoint=${30}
          .thrustSetpoint=${25}
          .thrust=${25}
          .state=${InstrumentState.active}
          .priority=${Priority.enhanced}
          .animateSetpoint=${true}
          .primaryTickmarkInterval=${45}
          .secondaryTickmarkInterval=${5}
          .tertiaryTickmarkInterval=${1}
          .showLabels=${true}
          .tickmarksInside=${true}
        ></obc-azimuth-thruster>
      </div>

      <div
        style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;"
      >
        <button id="btn-at-reset" style="padding: 8px 16px; cursor: pointer;">
          Reset (t=0)
        </button>
        <button
          id="btn-at-initiate"
          style="padding: 8px 16px; cursor: pointer;"
        >
          Initiate (t=1)
        </button>
        <button id="btn-at-move" style="padding: 8px 16px; cursor: pointer;">
          Move (t=2)
        </button>
        <button id="btn-at-confirm" style="padding: 8px 16px; cursor: pointer;">
          Confirm (t=3)
        </button>
      </div>

      <div
        id="at-status"
        style="font-size: 12px; color: #666; font-family: monospace;"
      >
        State: t=0 (at setpoint) | angle=30°, angleSP=30°, thrust=25%,
        thrustSP=25%
      </div>
    </div>
  `,
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);

    // Wait for component to render
    await new Promise((r) => setTimeout(r, 500));

    // Get DOM elements
    const at = canvasElement.querySelector('#azimuth-demo') as HTMLElement & {
      angle: number;
      angleSetpoint: number | undefined;
      newAngleSetpoint: number | undefined;
      thrust: number;
      thrustSetpoint: number | undefined;
      touching: boolean;
    };
    const status = canvasElement.querySelector('#at-status') as HTMLElement;

    if (!at || !status) return;

    // Target values for the adjustment
    const ANGLE_FROM = 30;
    const ANGLE_TO = 120; // delta = 90°
    const THRUST_FROM = 25;
    const THRUST_TO = 70;

    // Animation proxy
    const anim = {
      angle: ANGLE_FROM,
      thrust: THRUST_FROM,
      newAngle: ANGLE_FROM,
      newThrust: THRUST_FROM,
    };

    const updateStatus = (state: string) => {
      const nAngle = at.newAngleSetpoint;
      status.textContent = `State: ${state} | angle=${Math.round(anim.angle)}°, angleSP=${Math.round(at.angleSetpoint ?? 0)}°, newAngleSP=${nAngle !== undefined ? Math.round(nAngle) + '°' : 'n/a'}, thrust=${Math.round(anim.thrust)}%, thrustSP=${Math.round(at.thrustSetpoint ?? 0)}%, newThrustSP=${Math.round(anim.newThrust)}%`;
    };

    /** Kill every running tween that targets the proxy */
    const killAll = () => gsap.killTweensOf(anim);

    // Get buttons
    const btnReset = canvas.getByRole('button', {name: /Reset/});
    const btnInitiate = canvas.getByRole('button', {name: /Initiate/});
    const btnMove = canvas.getByRole('button', {name: /Move/});
    const btnConfirm = canvas.getByRole('button', {name: /Confirm/});

    // ── Button handlers ──

    btnReset.onclick = () => {
      killAll();
      anim.angle = ANGLE_FROM;
      anim.thrust = THRUST_FROM;
      anim.newAngle = ANGLE_FROM;
      anim.newThrust = THRUST_FROM;
      at.angle = ANGLE_FROM;
      at.angleSetpoint = ANGLE_FROM;
      at.newAngleSetpoint = undefined;
      at.thrust = THRUST_FROM;
      at.thrustSetpoint = THRUST_FROM;
      (at as unknown as {newThrustSetpoint?: number}).newThrustSetpoint =
        undefined;
      at.touching = false;
      updateStatus('t=0 (at setpoint)');
    };

    btnInitiate.onclick = () => {
      killAll();
      // Start adjustment: show new setpoint at current position for both axes
      anim.newAngle = at.angleSetpoint ?? ANGLE_FROM;
      anim.newThrust = at.thrustSetpoint ?? THRUST_FROM;
      at.newAngleSetpoint = anim.newAngle;
      (at as unknown as {newThrustSetpoint?: number}).newThrustSetpoint =
        anim.newThrust;
      at.touching = true;
      updateStatus('t=1 (initiate)');
    };

    btnMove.onclick = () => {
      killAll();
      // Ensure we're in adjustment mode
      if (at.newAngleSetpoint === undefined) {
        at.newAngleSetpoint = at.angleSetpoint ?? ANGLE_FROM;
        anim.newAngle = at.newAngleSetpoint;
        (at as unknown as {newThrustSetpoint?: number}).newThrustSetpoint =
          at.thrustSetpoint ?? THRUST_FROM;
        anim.newThrust = at.thrustSetpoint ?? THRUST_FROM;
        at.touching = true;
      }

      // Animate both newSetpoints simultaneously
      gsap.to(anim, {
        newAngle: ANGLE_TO,
        newThrust: THRUST_TO,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          at.newAngleSetpoint = anim.newAngle;
          (at as unknown as {newThrustSetpoint?: number}).newThrustSetpoint =
            anim.newThrust;
          updateStatus('t=2 (move)');
        },
      });
    };

    btnConfirm.onclick = () => {
      killAll();
      const targetAngle = Math.round(at.newAngleSetpoint ?? ANGLE_TO);
      const targetThrust = Math.round(anim.newThrust);

      // Read slider-controlled durations from data-attributes
      const wrapper = canvasElement.querySelector(
        '[data-thrust-duration]'
      ) as HTMLElement | null;
      const thrustDur = parseFloat(wrapper?.dataset.thrustDuration ?? '2');
      const angleDur = parseFloat(wrapper?.dataset.angleDuration ?? '10');

      // Component handles the setpoint slide + fade-out via CSS transition
      at.angleSetpoint = targetAngle;
      at.newAngleSetpoint = undefined;
      at.thrustSetpoint = targetThrust;
      (at as unknown as {newThrustSetpoint?: number}).newThrustSetpoint =
        undefined;
      at.touching = false;

      // Sync proxy for vessel response animation
      anim.angle = at.angle;
      anim.thrust = at.thrust;

      // Vessel responds — thrust catches up (faster)
      gsap.to(anim, {
        thrust: targetThrust,
        duration: thrustDur,
        ease: 'sine.inOut',
        onUpdate: () => {
          at.thrust = anim.thrust;
          updateStatus('t=3 (confirm)');
        },
      });

      // Vessel responds — angle catches up (slower)
      gsap.to(anim, {
        angle: targetAngle,
        duration: angleDur,
        ease: 'sine.inOut',
        onUpdate: () => {
          at.angle = anim.angle;
          updateStatus('t=3 (confirm)');
        },
      });
    };

    // ── Auto-play sequence ──

    // t=0 – reset
    await userEvent.click(btnReset);
    await new Promise((r) => setTimeout(r, 1000));

    // t=1 – initiate
    await userEvent.click(btnInitiate);
    await new Promise((r) => setTimeout(r, 1200));

    // t=2 – move both axes (1.5 s animation + 1 s pause)
    await userEvent.click(btnMove);
    await new Promise((r) => setTimeout(r, 3000));

    // t=3 – confirm (angle is the longest axis; wait for it + 1 s pause)
    await userEvent.click(btnConfirm);
    const wrapperEl = canvasElement.querySelector(
      '[data-angle-duration]'
    ) as HTMLElement | null;
    const longestDur = parseFloat(wrapperEl?.dataset.angleDuration ?? '10');
    await new Promise((r) => setTimeout(r, longestDur * 1000 + 1000));
  },
};
