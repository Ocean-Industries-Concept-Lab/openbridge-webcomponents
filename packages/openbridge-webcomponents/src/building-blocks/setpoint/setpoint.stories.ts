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
import {
  SetpointVisualState,
  SetpointColorMode,
} from '../../svghelpers/setpoint.js';

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
    visualState: {
      description: 'The visual state of the setpoint marker',
      control: {type: 'select'},
      options: Object.values(SetpointVisualState),
    },
    colorMode: {
      description: 'The color palette to use',
      control: {type: 'select'},
      options: Object.values(SetpointColorMode),
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

// Helper to render a bar-vertical with specific setpoint state
function renderSetpointDemo(config: {
  label: string;
  enhanced?: boolean;
  colorMode?: SetpointColorMode;
  setpoint: number;
  value: number;
  state: InstrumentState;
  focused?: boolean;
}) {
  const {
    label,
    enhanced = false,
    colorMode,
    setpoint,
    value,
    state,
    focused = false,
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
        .colorMode=${colorMode}
        fillMode="${FillMode.fill}"
        .value=${value}
        .setpoint=${setpoint}
        .state=${state}
        .focused=${focused}
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
 * Configuration:
 * - `value: 20` (different from setpoint)
 * - `setpoint: 40`
 * - `state: inCommand`
 */
export const NotEqual: Story = {
  name: 'notEqual (Input ≠ Output)',
  render: () => html`
    <div style="display: flex; gap: 60px; align-items: flex-start;">
      ${renderSetpointDemo({
        label: 'Regular',
        enhanced: false,
        setpoint: 40,
        value: 20,
        state: InstrumentState.inCommand,
      })}
      ${renderSetpointDemo({
        label: 'Enhanced',
        enhanced: true,
        setpoint: 40,
        value: 20,
        state: InstrumentState.inCommand,
      })}
    </div>
  `,
};

/**
 * **equal** - Input = Output
 *
 * The setpoint marker shrinks to 80% size when the current value
 * equals the setpoint (within the deadband tolerance).
 *
 * Configuration:
 * - `value: 40` (same as setpoint)
 * - `setpoint: 40`
 * - `state: inCommand`
 * - `autoAtSetpointDeadband: 1`
 */
export const Equal: Story = {
  name: 'equal (Input = Output)',
  render: () => html`
    <div style="display: flex; gap: 60px; align-items: flex-start;">
      ${renderSetpointDemo({
        label: 'Regular',
        enhanced: false,
        setpoint: 40,
        value: 40,
        state: InstrumentState.inCommand,
      })}
      ${renderSetpointDemo({
        label: 'Enhanced',
        enhanced: true,
        setpoint: 40,
        value: 40,
        state: InstrumentState.inCommand,
      })}
    </div>
  `,
};

/**
 * **equalZero** - Input = Output = 0
 *
 * When both value and setpoint are at zero, the marker shrinks to 80%
 * AND shifts 8px outward from the scale to avoid overlapping with
 * the zero position indicator.
 *
 * Configuration:
 * - `value: 0`
 * - `setpoint: 0`
 * - `state: inCommand`
 * - `setpointAtZeroDeadband: 0.5`
 */
export const EqualZero: Story = {
  name: 'equalZero (Input = Output = 0)',
  render: () => html`
    <div style="display: flex; gap: 60px; align-items: flex-start;">
      ${renderSetpointDemo({
        label: 'Regular',
        enhanced: false,
        setpoint: 0,
        value: 0,
        state: InstrumentState.inCommand,
      })}
      ${renderSetpointDemo({
        label: 'Enhanced',
        enhanced: true,
        setpoint: 0,
        value: 0,
        state: InstrumentState.inCommand,
      })}
    </div>
  `,
};

/**
 * **focus** - User is actively adjusting
 *
 * When the user is actively adjusting the setpoint (e.g., dragging),
 * the marker displays as a filled triangle with a 2px border at full size.
 *
 * Colors:
 * - **Regular**: Fill `--instrument-regular-tertiary-color`, border `--instrument-regular-secondary-color`
 * - **Enhanced**: Fill `--base-blue-100`, border `--element-neutral-enhanced-color`
 *
 * Configuration:
 * - `focused: true`
 * - `setpoint: 30`
 * - `value: 10`
 */
export const Focus: Story = {
  name: 'focus (User adjusting)',
  render: () => html`
    <div style="display: flex; gap: 60px; align-items: flex-start;">
      ${renderSetpointDemo({
        label: 'Regular',
        enhanced: false,
        setpoint: 30,
        value: 10,
        state: InstrumentState.inCommand,
        focused: true,
      })}
      ${renderSetpointDemo({
        label: 'Enhanced',
        enhanced: true,
        setpoint: 30,
        value: 10,
        state: InstrumentState.inCommand,
        focused: true,
      })}
    </div>
  `,
};

// =============================================================================
// Comparison Story
// =============================================================================

/**
 * **Visual State Comparison**
 *
 * Side-by-side comparison of all setpoint visual states across color modes.
 *
 * Grid layout (4×3):
 * - **Row 1**: Regular color mode
 * - **Row 2**: Enhanced color mode
 * - **Row 3**: Disabled state (via `InstrumentState.off`)
 * - **Columns**: notEqual, equal, equalZero, focus
 *
 * NOTE: The "Disabled" row shows the disabled state applied to all visual states.
 * Disabled is a separate boolean flag, auto-derived from instrument state (loading/off).
 * When disabled, the setpoint uses tertiary color regardless of the underlying color mode.
 */
export const SetpointComparison: Story = {
  name: 'Visual State Comparison',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Header row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(4, 1fr); gap: 16px; align-items: center;"
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
        <div
          style="text-align: center; font-weight: bold; font-size: 12px; color: #ccc;"
        >
          focus
        </div>
      </div>

      <!-- Regular row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(4, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 80px;">
          Regular
        </div>
        ${renderSetpointDemo({
          label: 'value ≠ setpoint',
          colorMode: SetpointColorMode.regular,
          setpoint: 40,
          value: 20,
          state: InstrumentState.inCommand,
        })}
        ${renderSetpointDemo({
          label: 'value = setpoint',
          colorMode: SetpointColorMode.regular,
          setpoint: 40,
          value: 40,
          state: InstrumentState.inCommand,
        })}
        ${renderSetpointDemo({
          label: 'both = 0',
          colorMode: SetpointColorMode.regular,
          setpoint: 0,
          value: 0,
          state: InstrumentState.inCommand,
        })}
        ${renderSetpointDemo({
          label: 'focused=true',
          colorMode: SetpointColorMode.regular,
          setpoint: 30,
          value: 10,
          state: InstrumentState.inCommand,
          focused: true,
        })}
      </div>

      <!-- Enhanced row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(4, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 80px;">
          Enhanced
        </div>
        ${renderSetpointDemo({
          label: 'value ≠ setpoint',
          colorMode: SetpointColorMode.enhanced,
          setpoint: 40,
          value: 20,
          state: InstrumentState.inCommand,
        })}
        ${renderSetpointDemo({
          label: 'value = setpoint',
          colorMode: SetpointColorMode.enhanced,
          setpoint: 40,
          value: 40,
          state: InstrumentState.inCommand,
        })}
        ${renderSetpointDemo({
          label: 'both = 0',
          colorMode: SetpointColorMode.enhanced,
          setpoint: 0,
          value: 0,
          state: InstrumentState.inCommand,
        })}
        ${renderSetpointDemo({
          label: 'focused=true',
          colorMode: SetpointColorMode.enhanced,
          setpoint: 30,
          value: 10,
          state: InstrumentState.inCommand,
          focused: true,
        })}
      </div>

      <!-- Disabled state row (via InstrumentState.off) -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(4, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 80px;">
          Disabled
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
        ${renderSetpointDemo({
          label: 'focused=true',
          setpoint: 30,
          value: 10,
          state: InstrumentState.off,
          focused: true,
        })}
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
  atAngleSetpoint?: boolean;
  atAngleSetpointZero?: boolean;
  state: InstrumentState;
  focused?: boolean;
  /** Fill arc end angle (start is always 0 for this demo) */
  fillEndAngle?: number;
  /** Optional color mode override */
  colorMode?: SetpointColorMode;
}) {
  const {
    label,
    angleSetpoint,
    atAngleSetpoint = false,
    atAngleSetpointZero = false,
    state,
    focused = false,
    fillEndAngle,
    colorMode,
  } = config;

  // Determine bar fill color based on state
  const fillColor =
    state === InstrumentState.inCommand
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
      <div style="width: 160px; height: 160px;">
        <obc-watch
          .state=${state}
          .angleSetpoint=${angleSetpoint}
          .atAngleSetpoint=${atAngleSetpoint}
          .atAngleSetpointZero=${atAngleSetpointZero}
          .focused=${focused}
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
 * **Visual State Comparison (Radial)**
 *
 * Side-by-side comparison of all setpoint visual states for radial instruments (watch).
 *
 * Grid layout (4×4):
 * - **Row 1**: Regular color mode (via colorMode override)
 * - **Row 2**: inCommand state (enhanced colors)
 * - **Row 3**: active state (regular colors, maps to focus visual state)
 * - **Row 4**: Disabled state (via `InstrumentState.off`)
 * - **Columns**: notEqual, equal, equalZero, focus
 *
 * Each watch shows:
 * - A half-circle arc area (like WithBarAreas story)
 * - A filled bar area from 0° to 45° (consistent across all demos)
 * - A setpoint marker at appropriate angle to demonstrate the visual state
 *
 * Visual state mapping:
 * - **notEqual**: bar at 45°, setpoint at 60° (different positions)
 * - **equal**: bar at 45°, setpoint at 45° (same position, atSetpoint=true)
 * - **equalZero**: bar at 0°, setpoint at 0° (both at zero)
 * - **focus**: bar at 45°, setpoint at 30° (focused=true)
 */
export const SetpointComparisonRadial: Story = {
  name: 'Visual State Comparison (Radial)',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Header row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(4, 1fr); gap: 16px; align-items: center;"
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
        <div
          style="text-align: center; font-weight: bold; font-size: 12px; color: #ccc;"
        >
          focus
        </div>
      </div>

      <!-- Regular row (via colorMode override) -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(4, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 60px;">
          Regular
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
          atAngleSetpointZero: true,
          fillEndAngle: 0,
          state: InstrumentState.inCommand,
          colorMode: SetpointColorMode.regular,
        })}
        ${renderRadialSetpointDemo({
          label: 'bar at 45°, setpoint at 30°',
          angleSetpoint: 30,
          atAngleSetpoint: false,
          fillEndAngle: 45,
          state: InstrumentState.inCommand,
          colorMode: SetpointColorMode.regular,
          focused: true,
        })}
      </div>

      <!-- inCommand row (enhanced colors) -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(4, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 60px;">
          inCommand
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
          atAngleSetpointZero: true,
          fillEndAngle: 0,
          state: InstrumentState.inCommand,
        })}
        ${renderRadialSetpointDemo({
          label: 'bar at 45°, setpoint at 30°',
          angleSetpoint: 30,
          atAngleSetpoint: false,
          fillEndAngle: 45,
          state: InstrumentState.inCommand,
          focused: true,
        })}
      </div>

      <!-- active row (regular colors, always focus visual state) -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(4, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 60px;">
          active
        </div>
        ${renderRadialSetpointDemo({
          label: 'bar at 45°, setpoint at 60°',
          angleSetpoint: 60,
          atAngleSetpoint: false,
          fillEndAngle: 45,
          state: InstrumentState.active,
        })}
        ${renderRadialSetpointDemo({
          label: 'bar at 45°, setpoint at 45°',
          angleSetpoint: 45,
          atAngleSetpoint: true,
          fillEndAngle: 45,
          state: InstrumentState.active,
        })}
        ${renderRadialSetpointDemo({
          label: 'bar at 0°, setpoint at 0°',
          angleSetpoint: 0,
          atAngleSetpoint: true,
          atAngleSetpointZero: true,
          fillEndAngle: 0,
          state: InstrumentState.active,
        })}
        ${renderRadialSetpointDemo({
          label: 'bar at 45°, setpoint at 30°',
          angleSetpoint: 30,
          atAngleSetpoint: false,
          fillEndAngle: 45,
          state: InstrumentState.active,
          focused: true,
        })}
      </div>

      <!-- Disabled state row (via InstrumentState.off) -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(4, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 60px;">
          off (disabled)
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
          atAngleSetpointZero: true,
          fillEndAngle: 0,
          state: InstrumentState.off,
        })}
        ${renderRadialSetpointDemo({
          label: 'bar at 45°, setpoint at 30°',
          angleSetpoint: 30,
          atAngleSetpoint: false,
          fillEndAngle: 45,
          state: InstrumentState.off,
          focused: true,
        })}
      </div>

      <!-- Note about active state -->
      <div style="font-size: 11px; color: #666; font-style: italic;">
        Note: "active" state always maps to "focus" visual state regardless of
        atSetpoint/focused values. This preserves the original watch.ts behavior
        where active state used the outlined triangle appearance.
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
