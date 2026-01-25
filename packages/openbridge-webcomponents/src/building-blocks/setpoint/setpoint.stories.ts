import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';

// Import the bar-vertical component for displaying setpoints in context
import '../bar-vertical/bar-vertical.js';

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
 * | `equalZero` | Input = Output = 0 | 80% + 4px offset | Filled |
 * | `focus` | User is actively adjusting | 100% | Filled + Border |
 *
 * ## Color Modes
 *
 * - **Regular**: Uses `--instrument-regular-*-color` palette
 * - **Enhanced**: Uses `--instrument-enhanced-*-color` palette (typically for inCommand state)
 * - **Disabled**: Uses `--instrument-frame-tertiary-color` (tertiary/disabled color)
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
- **equalZero**: Both value and setpoint are at zero - 80% size + 4px outward offset
- **focus**: User is actively adjusting - full size, filled with tertiary color and 2px border

## Color Modes

Each state can be rendered in three color palettes:
- **Regular**: For non-priority states
- **Enhanced**: For in-command/priority states (brighter colors)
- **Disabled**: For disabled state (tertiary/gray color)

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
 * AND shifts 4px outward from the scale to avoid overlapping with
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
 * - **Row 3**: Disabled color mode
 * - **Columns**: notEqual, equal, equalZero, focus
 *
 * NOTE: The "Disabled" row shows the `disabled` COLOR MODE applied to all visual states.
 * SetpointColorMode.disabled affects color only (tertiary color).
 * Parent instruments control when to use disabled color mode based on their state.
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

      <!-- Disabled color mode row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(4, 1fr); gap: 16px; align-items: flex-start;"
      >
        <div style="font-size: 12px; color: #888; padding-top: 80px;">
          Disabled
        </div>
        ${renderSetpointDemo({
          label: 'value ≠ setpoint',
          colorMode: SetpointColorMode.disabled,
          setpoint: 40,
          value: 20,
          state: InstrumentState.inCommand,
        })}
        ${renderSetpointDemo({
          label: 'value = setpoint',
          colorMode: SetpointColorMode.disabled,
          setpoint: 40,
          value: 40,
          state: InstrumentState.inCommand,
        })}
        ${renderSetpointDemo({
          label: 'both = 0',
          colorMode: SetpointColorMode.disabled,
          setpoint: 0,
          value: 0,
          state: InstrumentState.inCommand,
        })}
        ${renderSetpointDemo({
          label: 'focused=true',
          colorMode: SetpointColorMode.disabled,
          setpoint: 30,
          value: 10,
          state: InstrumentState.inCommand,
          focused: true,
        })}
      </div>
    </div>
  `,
};
