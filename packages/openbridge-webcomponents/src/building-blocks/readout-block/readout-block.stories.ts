import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, nothing} from 'lit';
import {
  ReadoutBlockVariant,
  ReadoutBlockSize,
  ReadoutBlockDataQuality,
  ObcTextboxFontWeight,
  ObcTextboxAlignment,
} from './readout-block.js';
import './readout-block.js';
import '../../icons/icon-placeholder.js';
import {
  ObcAlertFrameMode,
  ObcAlertFrameType,
} from '../../components/alert-frame/alert-frame.js';
import {AlertType} from '../../types.js';

const NONE = 'none';

type BlockArgs = {
  variant: ReadoutBlockVariant;
  value: number;
  size: ReadoutBlockSize;
  enhanced: boolean;
  weight: ObcTextboxFontWeight;
  hasDegree: boolean;
  hasIcon: boolean;
  fractionDigits: number;
  maxDigits: number;
  hintedZeros: boolean;
  spaceReserver: string;
  off: boolean;
  offText: string;
  alignment: ObcTextboxAlignment;
  dataQuality: ReadoutBlockDataQuality | typeof NONE;
};

// A faithful single-block render. The block inherits its colour from the host
// context (the list-item normally drives it), so standalone it shows the neutral
// default tone; `enhanced` switches to the accent tone.
function renderBlock(args: Partial<BlockArgs>) {
  return html`
    <obc-readout-block
      .variant=${args.variant ?? ReadoutBlockVariant.value}
      .value=${args.value ?? null}
      .size=${args.size ?? ReadoutBlockSize.small}
      .enhanced=${args.enhanced ?? false}
      .weight=${args.weight ?? ObcTextboxFontWeight.regular}
      .hasDegree=${args.hasDegree ?? false}
      .hasIcon=${args.hasIcon ?? false}
      .fractionDigits=${args.fractionDigits ?? 0}
      .maxDigits=${args.maxDigits ?? 0}
      .hintedZeros=${args.hintedZeros ?? false}
      .spaceReserver=${args.spaceReserver || undefined}
      .off=${args.off ?? false}
      .offText=${args.offText ?? 'OFF'}
      .alignment=${args.alignment ?? ObcTextboxAlignment.Right}
      .dataQuality=${args.dataQuality === NONE ? undefined : args.dataQuality}
    >
      ${args.hasIcon
        ? html`<obi-placeholder slot="icon"></obi-placeholder>`
        : nothing}
    </obc-readout-block>
  `;
}

const themedDecorator = (story: () => unknown) => html`
  <div
    data-obc-theme="day"
    style="background: var(--container-background-color); padding: 24px; display: inline-block;"
  >
    ${story()}
  </div>
`;

const showcaseStyle = `
  .rb-grid { display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-end; }
  .rb-card {
    display: flex; flex-direction: column; gap: 8px; align-items: flex-start;
    padding: 12px; border-radius: 8px; background: rgba(0, 0, 0, 0.03);
  }
  .rb-card-title {
    font: 10px/1.2 var(--global-typography-ui-label-font-family, sans-serif);
    text-transform: uppercase; letter-spacing: 0.06em; color: var(--element-neutral-color, #777);
  }
  .rb-cell { outline: 1px dashed rgba(0, 0, 0, 0.12); }
`;

type ShowcaseCard = {title: string; args: Partial<BlockArgs>};

function renderShowcase(cards: ShowcaseCard[]) {
  return html`
    <style>
      ${showcaseStyle}
    </style>
    <div class="rb-grid">
      ${cards.map(
        (card) => html`
          <div class="rb-card">
            <div class="rb-card-title">${card.title}</div>
            <div class="rb-cell">${renderBlock(card.args)}</div>
          </div>
        `
      )}
    </div>
  `;
}

const meta = {
  title: 'Building Blocks/Readout Block',
  tags: ['autodocs', '6.0', 'wip'],
  component: 'obc-readout-block',
  decorators: [themedDecorator],
  parameters: {
    docs: {
      description: {
        component:
          'The most atomic readout primitive — a single cap-height, ' +
          'width-reservable numeric segment (value / setpoint / advice). It is the ' +
          'building block used inside `obc-readout-list-item` (and, in a future ' +
          'refactor, inside `obc-readout`); it is not normally used on its own. ' +
          'Colour is inherited from the host context, so standalone it shows the ' +
          'neutral tone.',
      },
    },
  },
  render: (args) => renderBlock(args),
  args: {
    variant: ReadoutBlockVariant.value,
    value: 123,
    size: ReadoutBlockSize.small,
    enhanced: false,
    weight: ObcTextboxFontWeight.regular,
    hasDegree: false,
    hasIcon: false,
    fractionDigits: 0,
    maxDigits: 0,
    hintedZeros: false,
    spaceReserver: '',
    off: false,
    offText: 'OFF',
    alignment: ObcTextboxAlignment.Right,
    dataQuality: NONE,
  },
  argTypes: {
    value: {control: {type: 'number'}},
    variant: {
      control: {type: 'select'},
      options: Object.values(ReadoutBlockVariant),
    },
    size: {
      control: {type: 'select'},
      options: Object.values(ReadoutBlockSize),
    },
    weight: {
      control: {type: 'select'},
      options: Object.values(ObcTextboxFontWeight),
    },
    alignment: {
      control: {type: 'select'},
      options: Object.values(ObcTextboxAlignment),
    },
    fractionDigits: {control: {type: 'number', min: 0, step: 1}},
    maxDigits: {control: {type: 'number', min: 0, step: 1}},
    spaceReserver: {control: {type: 'text'}},
    offText: {control: {type: 'text'}},
    dataQuality: {
      control: {type: 'select'},
      options: [NONE, ...Object.values(ReadoutBlockDataQuality)],
    },
  },
} satisfies Meta<BlockArgs>;

export default meta;
type Story = StoryObj<BlockArgs>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () =>
    renderShowcase([
      {title: 'value', args: {variant: ReadoutBlockVariant.value, value: 123}},
      {
        title: 'setpoint',
        args: {variant: ReadoutBlockVariant.setpoint, value: 120},
      },
      {
        title: 'advice',
        args: {variant: ReadoutBlockVariant.advice, value: 118},
      },
    ]),
};

export const Sizes: Story = {
  render: () =>
    renderShowcase(
      [
        ReadoutBlockSize.small,
        ReadoutBlockSize.medium,
        ReadoutBlockSize.large,
      ].map((size) => ({
        title: size,
        args: {size, value: 123, hasDegree: true},
      }))
    ),
};

export const Tone: Story = {
  render: () =>
    renderShowcase([
      {title: 'regular', args: {value: 123, enhanced: false}},
      {title: 'enhanced', args: {value: 123, enhanced: true}},
    ]),
};

export const Weight: Story = {
  render: () =>
    renderShowcase(
      [
        ObcTextboxFontWeight.regular,
        ObcTextboxFontWeight.semibold,
        ObcTextboxFontWeight.bold,
      ].map((weight) => ({title: weight, args: {value: 123, weight}}))
    ),
};

export const Degree: Story = {
  render: () =>
    renderShowcase([
      {title: 'no degree', args: {value: 287}},
      {title: 'degree', args: {value: 287, hasDegree: true}},
    ]),
};

/**
 * `off` renders `offText` (default `"OFF"`) in place of the value.
 */
export const OffText: Story = {
  render: () =>
    renderShowcase([
      {title: 'OFF (default)', args: {off: true}},
      {title: 'custom', args: {off: true, offText: 'unavailable'}},
    ]),
};

/**
 * Hinted zeros pad the integer part up to `maxDigits` as muted leading zeros.
 * When enabled they take priority over `spaceReserver` (they already fill to
 * `maxDigits`, so an explicit reserver is ignored).
 */
export const HintedZeros: Story = {
  render: () =>
    renderShowcase([
      {title: 'value 8, maxDigits 4', args: {value: 8, maxDigits: 4}},
      {
        title: 'hinted zeros',
        args: {value: 8, maxDigits: 4, hintedZeros: true},
      },
      {
        title: 'hinted zeros + fraction',
        args: {value: 8, maxDigits: 4, fractionDigits: 1, hintedZeros: true},
      },
      {
        title: 'hinted wins over reserver',
        args: {
          value: 8,
          maxDigits: 4,
          hintedZeros: true,
          spaceReserver: '00000000',
        },
      },
    ]),
};

/**
 * `maxDigits` reserves INTEGER digits only — independent of `fractionDigits`
 * (the decimal point and fraction digits never count toward `maxDigits`).
 */
export const MaxDigitsAndFractionDigits: Story = {
  render: () =>
    renderShowcase([
      {title: 'maxDigits 4', args: {value: 12, maxDigits: 4}},
      {
        title: 'maxDigits 4, frac 1',
        args: {value: 12, maxDigits: 4, fractionDigits: 1},
      },
      {
        title: 'maxDigits 4, frac 2',
        args: {value: 12.5, maxDigits: 4, fractionDigits: 2},
      },
    ]),
};

export const Alignment: Story = {
  render: () =>
    renderShowcase(
      [
        ObcTextboxAlignment.Left,
        ObcTextboxAlignment.Center,
        ObcTextboxAlignment.Right,
      ].map((alignment) => ({
        title: alignment,
        // A wide reserver makes the alignment within the reserved width visible.
        args: {value: 12, alignment, spaceReserver: '00000'},
      }))
    ),
};

export const DataQuality: Story = {
  render: () =>
    renderShowcase([
      {title: 'nominal', args: {value: 123}},
      {
        title: 'low-integrity',
        args: {value: 123, dataQuality: ReadoutBlockDataQuality.lowIntegrity},
      },
      {
        title: 'invalid',
        args: {value: 123, dataQuality: ReadoutBlockDataQuality.invalid},
      },
      {title: 'null (dash)', args: {value: undefined}},
    ]),
};

export const Alert: Story = {
  render: () => html`
    <style>
      ${showcaseStyle}
    </style>
    <div class="rb-grid">
      <div class="rb-card">
        <div class="rb-card-title">value alert (warning)</div>
        <div class="rb-cell">
          <obc-readout-block
            .variant=${ReadoutBlockVariant.value}
            .value=${123}
            .alert=${{
              status: AlertType.Warning,
              mode: ObcAlertFrameMode.ackedActive,
              type: ObcAlertFrameType.Regular,
            }}
          ></obc-readout-block>
        </div>
      </div>
    </div>
  `,
};
