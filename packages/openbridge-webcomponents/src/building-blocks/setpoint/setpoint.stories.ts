import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {userEvent, within} from 'storybook/test';

// Import the bar-vertical component for displaying setpoints in context
import '../bar-vertical/bar-vertical.js';
// Import gauge-horizontal for the adjustment flow demo
import '../../navigation-instruments/gauge-horizontal/gauge-horizontal.js';
// Import watch for radial setpoint demos
import '../../navigation-instruments/watch/watch.js';
import {WatchCircleType} from '../../navigation-instruments/watch/watch.js';

// Import setpoint types for documentation
import {SetpointColorMode} from '../../svghelpers/setpoint.js';

// Import types needed for bar-vertical configuration
import {InstrumentState} from '../../navigation-instruments/types.js';
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
 * - **Enhanced**: Uses `--instrument-enhanced-*-color` palette (typically for inCommand state)
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
    enhanced: {
      description: 'Use enhanced color palette (brighter, for inCommand)',
      control: {type: 'boolean'},
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
    enhanced: true,
    state: InstrumentState.inCommand,
    autoAtSetpointDeadband: 1,
    setpointAtZeroDeadband: 0.5,
  },
  render: (args) => html`
    <obc-bar-vertical
      minValue="-50"
      maxValue="50"
      height="280"
      side="${ExternalScaleSide.right}"
      primaryTickbarsInterval="25"
      secondaryTickbarsInterval="5"
      hasBar
      scaleBackground
      borderRadiusPosition="${BorderRadiusPosition.innerFirstChild}"
      .enhanced=${args.enhanced}
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
  enhanced?: boolean;
  setpointColorMode?: SetpointColorMode;
  setpoint: number;
  newSetpoint?: number;
  value: number;
  state: InstrumentState;
  touching?: boolean;
}) {
  const {
    label,
    enhanced = false,
    setpointColorMode,
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
        primaryTickbarsInterval="25"
        secondaryTickbarsInterval="5"
        hasBar
        scaleBackground
        borderRadiusPosition="${BorderRadiusPosition.innerFirstChild}"
        .enhanced=${enhanced}
        .setpointColorMode=${setpointColorMode}
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
    enhanced: true,
    state: InstrumentState.inCommand,
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
    enhanced: true,
    state: InstrumentState.inCommand,
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
    enhanced: true,
    state: InstrumentState.inCommand,
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
    enhanced: true,
    state: InstrumentState.inCommand,
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
 * - **Row 1**: active state (SetpointColorMode: regular)
 * - **Row 2**: inCommand state (SetpointColorMode: enhanced)
 * - **Row 3**: adjusting/touching - dual-marker mode via `newSetpoint`
 * - **Row 4**: loading/off (disabled) - uses tertiary/gray color
 *
 * The `newSetpoint` property enables showing both current and proposed setpoint
 * positions simultaneously, with the original dimmed (0.75 opacity) while the
 * new setpoint shows in focus state.
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

      <!-- active row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(3, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 80px;">
          active (SetpointColorMode: regular)
        </div>
        ${renderSetpointDemo({
          label: 'value ≠ setpoint',
          setpointColorMode: SetpointColorMode.regular,
          setpoint: 40,
          value: 20,
          state: InstrumentState.inCommand,
        })}
        ${renderSetpointDemo({
          label: 'value = setpoint',
          setpointColorMode: SetpointColorMode.regular,
          setpoint: 40,
          value: 40,
          state: InstrumentState.inCommand,
        })}
        ${renderSetpointDemo({
          label: 'both = 0',
          setpointColorMode: SetpointColorMode.regular,
          setpoint: 0,
          value: 0,
          state: InstrumentState.inCommand,
        })}
      </div>

      <!-- inCommand row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(3, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 80px;">
          inCommand (SetpointColorMode: enhanced)
        </div>
        ${renderSetpointDemo({
          label: 'value ≠ setpoint',
          setpointColorMode: SetpointColorMode.enhanced,
          setpoint: 40,
          value: 20,
          state: InstrumentState.inCommand,
        })}
        ${renderSetpointDemo({
          label: 'value = setpoint',
          setpointColorMode: SetpointColorMode.enhanced,
          setpoint: 40,
          value: 40,
          state: InstrumentState.inCommand,
        })}
        ${renderSetpointDemo({
          label: 'both = 0',
          setpointColorMode: SetpointColorMode.enhanced,
          setpoint: 0,
          value: 0,
          state: InstrumentState.inCommand,
        })}
      </div>

      <!-- adjusting/touching row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(3, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 80px;">
          adjusting/touching
        </div>
        ${renderSetpointDemo({
          label: 'setpoint at 20, new at 40',
          setpointColorMode: SetpointColorMode.enhanced,
          setpoint: 20,
          newSetpoint: 40,
          value: 20,
          state: InstrumentState.inCommand,
        })}
        ${renderSetpointDemo({
          label: 'setpoint at 40, new at 30',
          setpointColorMode: SetpointColorMode.enhanced,
          setpoint: 40,
          newSetpoint: 30,
          value: 40,
          state: InstrumentState.inCommand,
        })}
        ${renderSetpointDemo({
          label: 'setpoint at 0, new at 20',
          setpointColorMode: SetpointColorMode.enhanced,
          setpoint: 0,
          newSetpoint: 20,
          value: 0,
          state: InstrumentState.inCommand,
        })}
      </div>

      <!-- Disabled state row (via InstrumentState.off) -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(3, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 80px;">
          loading/off (disabled)
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

      <!-- Note about adjusting state -->
      <div style="font-size: 11px; color: #666; font-style: italic;">
        Note: "adjusting/touching" row shows dual-marker mode triggered by
        setting newSetpoint. The original setpoint is dimmed (0.75 opacity)
        while the new setpoint shows in focus state. "equalZero" is auto-derived
        when setpoint is within setpointAtZeroDeadband (default 0.5).
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
  state: InstrumentState;
  /** Fill arc end angle (start is always 0 for this demo) */
  fillEndAngle?: number;
  /** Optional color mode override */
  colorMode?: SetpointColorMode;
}) {
  const {
    label,
    angleSetpoint,
    newAngleSetpoint,
    atAngleSetpoint = false,
    state,
    fillEndAngle,
    colorMode,
  } = config;

  // Determine bar fill color based on colorMode (if provided) or state
  const effectiveColorMode =
    colorMode ??
    (state === InstrumentState.inCommand
      ? SetpointColorMode.enhanced
      : SetpointColorMode.regular);
  const fillColor =
    effectiveColorMode === SetpointColorMode.enhanced
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
          .angleSetpoint=${angleSetpoint}
          .newAngleSetpoint=${newAngleSetpoint}
          .atAngleSetpoint=${atAngleSetpoint}
          .colorMode=${colorMode}
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
 * The `newAngleSetpoint` property enables showing both current and proposed
 * setpoint positions simultaneously, with the original dimmed (0.75 opacity)
 * while the new setpoint shows in focus state.
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

      <!-- active row (via colorMode override) -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(3, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 60px;">
          active (SetpointColorMode: regular)
        </div>
        ${renderRadialSetpointDemo({
          label: 'bar at 45°, setpoint at 60°',
          angleSetpoint: 60,
          atAngleSetpoint: false,
          fillEndAngle: 45,
          state: InstrumentState.inCommand,
          colorMode: SetpointColorMode.regular,
        })}
        ${renderRadialSetpointDemo({
          label: 'bar at 45°, setpoint at 45°',
          angleSetpoint: 45,
          atAngleSetpoint: true,
          fillEndAngle: 45,
          state: InstrumentState.inCommand,
          colorMode: SetpointColorMode.regular,
        })}
        ${renderRadialSetpointDemo({
          label: 'bar at 0°, setpoint at 0°',
          angleSetpoint: 0,
          atAngleSetpoint: true,
          fillEndAngle: 0,
          state: InstrumentState.inCommand,
          colorMode: SetpointColorMode.regular,
        })}
      </div>

      <!-- inCommand row (enhanced colors) -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(3, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 60px;">
          inCommand (SetpointColorMode: enhanced)
        </div>
        ${renderRadialSetpointDemo({
          label: 'bar at 45°, setpoint at 60°',
          angleSetpoint: 60,
          atAngleSetpoint: false,
          fillEndAngle: 45,
          state: InstrumentState.inCommand,
        })}
        ${renderRadialSetpointDemo({
          label: 'bar at 45°, setpoint at 45°',
          angleSetpoint: 45,
          atAngleSetpoint: true,
          fillEndAngle: 45,
          state: InstrumentState.inCommand,
        })}
        ${renderRadialSetpointDemo({
          label: 'bar at 0°, setpoint at 0°',
          angleSetpoint: 0,
          atAngleSetpoint: true,
          fillEndAngle: 0,
          state: InstrumentState.inCommand,
        })}
      </div>

      <!-- adjusting row (shows dual markers when newAngleSetpoint is defined) -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(3, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 60px;">
          adjusting/touching
        </div>
        ${renderRadialSetpointDemo({
          label: 'bar at 45°, setpoint at 60°, new at 80°',
          angleSetpoint: 60,
          atAngleSetpoint: false,
          fillEndAngle: 45,
          state: InstrumentState.inCommand,
          newAngleSetpoint: 80,
        })}
        ${renderRadialSetpointDemo({
          label: 'bar at 45°, setpoint at 45°, new at 60°',
          angleSetpoint: 45,
          atAngleSetpoint: true,
          fillEndAngle: 45,
          state: InstrumentState.inCommand,
          newAngleSetpoint: 60,
        })}
        ${renderRadialSetpointDemo({
          label: 'bar at 0°, setpoint at 0°, new at 30°',
          angleSetpoint: 0,
          atAngleSetpoint: true,
          fillEndAngle: 0,
          state: InstrumentState.inCommand,
          newAngleSetpoint: 30,
        })}
      </div>

      <!-- Disabled state row (via InstrumentState.off) -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(3, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 60px;">
          loading/off (disabled)
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

      <!-- Note about adjusting state -->
      <div style="font-size: 11px; color: #666; font-style: italic;">
        Note: "adjusting/touching" row shows dual-marker mode triggered by
        setting newAngleSetpoint. The original setpoint is dimmed (0.75 opacity)
        while the new setpoint shows in focus state. "equalZero" is auto-derived
        when angleSetpoint is within angleSetpointAtZeroDeadband (default 0.5°).
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
 * Tertiary tickmarks are shown during adjustment (tertiaryTickbarsInterval=2).
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
        primaryTickbarsInterval="20"
        secondaryTickbarsInterval="10"
        tertiaryTickbarsInterval="2"
        enhanced
        fillMode="${FillMode.fill}"
        fillMin="0"
        fillMax="40"
        value="40"
        setpoint="40"
        state="inCommand"
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

    // Helper to update status display
    const updateStatus = (
      state: string,
      value: number,
      setpoint: number,
      newSetpoint: number | undefined
    ) => {
      status.textContent = `State: ${state} | value=${value}, setpoint=${setpoint}, newSetpoint=${newSetpoint ?? 'undefined'}`;
    };

    // Get buttons
    const btnReset = canvas.getByRole('button', {name: /Reset/});
    const btnInitiate = canvas.getByRole('button', {name: /Initiate/});
    const btnMove = canvas.getByRole('button', {name: /Move/});
    const btnConfirm = canvas.getByRole('button', {name: /Confirm/});

    // Wire up button handlers (for manual interaction after play completes)
    btnReset.onclick = () => {
      gauge.value = 40;
      gauge.fillMax = 40;
      gauge.setpoint = 40;
      gauge.newSetpoint = undefined;
      updateStatus('t=0 (at setpoint)', 40, 40, undefined);
    };

    btnInitiate.onclick = () => {
      gauge.newSetpoint = 40;
      updateStatus('t=1 (initiate)', 40, 40, 40);
    };

    btnMove.onclick = () => {
      gauge.newSetpoint = 80;
      updateStatus('t=2 (move)', 40, 40, 80);
    };

    btnConfirm.onclick = () => {
      gauge.newSetpoint = undefined;
      gauge.setpoint = 80;
      gauge.fillMax = 80;
      gauge.value = 80;
      updateStatus('t=3 (confirm)', 80, 80, undefined);
    };

    // Step 1: Ensure we're at initial state (t=0)
    await userEvent.click(btnReset);
    await new Promise((r) => setTimeout(r, 1000));

    // Step 2: Initiate adjustment (t=1)
    await userEvent.click(btnInitiate);
    await new Promise((r) => setTimeout(r, 1500));

    // Step 3: Move newSetpoint to 80 (t=2)
    await userEvent.click(btnMove);
    await new Promise((r) => setTimeout(r, 2000));

    // Step 4: Confirm the new setpoint (t=3)
    await userEvent.click(btnConfirm);
    await new Promise((r) => setTimeout(r, 1000));
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
            .state=${InstrumentState.inCommand}
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

    // Helper to update status display
    const updateStatus = (
      state: string,
      barEndAngle: number,
      angleSetpoint: number,
      newAngleSetpoint: number | undefined
    ) => {
      status.textContent = `State: ${state} | barEndAngle=${barEndAngle}°, angleSetpoint=${angleSetpoint}°, newAngleSetpoint=${newAngleSetpoint !== undefined ? newAngleSetpoint + '°' : 'undefined'}`;
    };

    // Get buttons
    const btnReset = canvas.getByRole('button', {name: /Reset/});
    const btnInitiate = canvas.getByRole('button', {name: /Initiate/});
    const btnMove = canvas.getByRole('button', {name: /Move/});
    const btnConfirm = canvas.getByRole('button', {name: /Confirm/});

    // Wire up button handlers (for manual interaction after play completes)
    btnReset.onclick = () => {
      watch.barAreas = createBarAreas(30);
      watch.angleSetpoint = 30;
      watch.atAngleSetpoint = true;
      watch.newAngleSetpoint = undefined;
      updateStatus('t=0 (at setpoint)', 30, 30, undefined);
    };

    btnInitiate.onclick = () => {
      watch.newAngleSetpoint = 30;
      updateStatus('t=1 (initiate)', 30, 30, 30);
    };

    btnMove.onclick = () => {
      watch.newAngleSetpoint = 60;
      updateStatus('t=2 (move)', 30, 30, 60);
    };

    btnConfirm.onclick = () => {
      watch.newAngleSetpoint = undefined;
      watch.angleSetpoint = 60;
      watch.barAreas = createBarAreas(60);
      watch.atAngleSetpoint = true;
      updateStatus('t=3 (confirm)', 60, 60, undefined);
    };

    // Step 1: Ensure we're at initial state (t=0)
    await userEvent.click(btnReset);
    await new Promise((r) => setTimeout(r, 1000));

    // Step 2: Initiate adjustment (t=1)
    await userEvent.click(btnInitiate);
    await new Promise((r) => setTimeout(r, 1500));

    // Step 3: Move newAngleSetpoint to 60° (t=2)
    await userEvent.click(btnMove);
    await new Promise((r) => setTimeout(r, 2000));

    // Step 4: Confirm the new setpoint (t=3)
    await userEvent.click(btnConfirm);
    await new Promise((r) => setTimeout(r, 1000));
  },
};
