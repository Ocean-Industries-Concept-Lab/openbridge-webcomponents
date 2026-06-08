import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, TemplateResult} from 'lit';
import '../../components/navigation-item/navigation-item.js';
import type {ObcReadout} from './readout.js';
import {
  ReadoutSetpointFormat,
  ReadoutSetpointSize,
} from '../readout-setpoint/readout-setpoint.js';
import {
  ReadoutDirection,
  ReadoutSetpointInteraction,
  ReadoutAlertState,
  ReadoutVariant,
  ReadoutStackVerticalAlignment,
} from './readout.js';
import {Priority} from '../types.js';
import './readout.js';
import {
  ReadoutAdviceFormat,
  ReadoutAdviceState,
} from '../readout-advice/readout-advice.js';

const meta: Meta<ObcReadout> = {
  title: 'Instruments/Readout',
  tags: ['autodocs', '6.0', 'wip'],
  component: 'obc-readout',
  args: {
    value: 10,
    hasDegree: true,
    hasSetpoint: true,
    setpointValue: 12,
    setpointSecondaryValue: 14,
    adviceValue: 16,
    adviceSecondaryValue: 18,
    label: 'SOG',
    unit: 'kn',
    minValueLength: 3,
    variant: ReadoutVariant.regular,
    valuePriority: Priority.regular,
    direction: ReadoutDirection.vertical,
  },
  argTypes: {
    value: {
      control: {
        type: 'number',
      },
    },
    variant: {
      control: {
        type: 'select',
      },
      options: Object.values(ReadoutVariant),
    },
    valuePriority: {
      control: {
        type: 'select',
      },
      options: Object.values(Priority),
    },
    alertState: {
      control: {
        type: 'select',
      },
      options: Object.values(ReadoutAlertState),
    },
    setpointInteraction: {
      control: {
        type: 'select',
      },
      options: Object.values(ReadoutSetpointInteraction),
    },
    direction: {
      control: {
        type: 'select',
      },
      options: Object.values(ReadoutDirection),
    },
    setpointSize: {
      control: {
        type: 'select',
      },
      options: Object.values(ReadoutSetpointSize),
    },
    alignment: {
      control: {
        type: 'select',
      },
      options: Object.values(ReadoutStackVerticalAlignment),
    },
    adviceFormat: {
      control: {
        type: 'select',
      },
      options: Object.values(ReadoutAdviceFormat),
    },
    adviceState: {
      control: {
        type: 'select',
      },
      options: Object.values(ReadoutAdviceState),
    },
    setpointFormat: {
      control: {
        type: 'select',
      },
      options: Object.values(ReadoutSetpointFormat),
    },
  },
} satisfies Meta<ObcReadout>;

export default meta;
type Story = StoryObj<ObcReadout>;

export const Default: Story = {
  args: {},
  render: (args) => renderComponent(args as ObcReadout),
};

export const Vertical: Story = {
  args: {
    direction: ReadoutDirection.vertical,
  },
  render: (args) => {
    return html`
      ${renderVariant(args, (args) =>
        renderInteractionModes(args, renderComponent)
      )}
    `;
  },
};

export const Horizontal: Story = {
  args: {
    direction: ReadoutDirection.horizontal,
  },
  render: (args) => {
    return html`
      ${renderVariant(args, (args) =>
        renderInteractionModes(args, renderComponent)
      )}
    `;
  },
};

const renderVariant = (
  args: ObcReadout,
  renderComponent: (args: ObcReadout) => TemplateResult | TemplateResult[]
): TemplateResult[] => {
  const variants = Object.values(ReadoutVariant);
  return variants.map((variant) => {
    return html`
      <div style="margin-top: 20px;">Variant: ${variant}</div>
      ${renderComponent({...args, variant: variant} as ObcReadout)}
    `;
  });
};

const renderInteractionModes = (
  args: ObcReadout,
  renderComponent: (args: ObcReadout) => TemplateResult
): TemplateResult => {
  const interactionModes = Object.values(ReadoutSetpointInteraction);
  return html`
    <div
      style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; align-items: center;
      justify-items: center;"
    >
      <div>Interaction Mode</div>
      ${interactionModes.map((interactionMode) => {
        return html` <div>${interactionMode}</div> `;
      })}
      <div>Value != SetPoint</div>
      ${interactionModes.map((interactionMode) => {
        return html` ${renderComponent({
          ...args,
          setpointInteraction: interactionMode,
        } as ObcReadout)}`;
      })}
      <div>Value == SetPoint</div>
      ${interactionModes.map((interactionMode) => {
        return html` ${renderComponent({
          ...args,
          setpointInteraction: interactionMode,
          setpointValue: args.value,
        } as ObcReadout)}`;
      })}
    </div>
  `;
};

function renderComponent(args: ObcReadout): TemplateResult {
  return html`
    <obc-readout
      .variant=${args.variant}
      .valuePriority=${args.valuePriority}
      .alertState=${args.alertState}
      .direction=${args.direction}
      .setpointInteraction=${args.setpointInteraction}
      .setpointSize=${args.setpointSize}
      .value=${args.value}
      .hasDegree=${args.hasDegree}
      .hasSetpoint=${args.hasSetpoint}
      .setpointValue=${args.setpointValue}
      .setpointSecondaryValue=${args.setpointSecondaryValue}
      .label=${args.label}
      .unit=${args.unit}
      .minValueLength=${args.minValueLength}
      .setpointFormat=${args.setpointFormat}
      .hug=${args.hug}
      .hasAdvice=${args.hasAdvice}
      .adviceValue=${args.adviceValue}
      .adviceSecondaryValue=${args.adviceSecondaryValue}
      .adviceFormat=${args.adviceFormat}
      .adviceState=${args.adviceState}
      .src=${args.src}
      .hasSetpointDivider=${args.hasSetpointDivider}
      .hasSourceDivider=${args.hasSourceDivider}
      .valueHasHintedZeros=${args.valueHasHintedZeros}
      .fractionDigits=${args.fractionDigits}
      .alignment=${args.alignment}
      .off=${args.off}
    >
    </obc-readout>
  `;
}

export const Off: Story = {
  args: {
    off: true,
    hasSetpoint: false,
  },
  render: (args) => renderComponent(args as ObcReadout),
};

export const Center: Story = {
  args: {
    value: 100,
    hasDegree: false,
    hasSetpoint: true,
    setpointValue: 12,
    setpointSecondaryValue: 14,
    adviceValue: 16,
    adviceSecondaryValue: 18,
    label: 'SOG',
    unit: 'kn',
    minValueLength: 0,
    variant: 'regular',
    valuePriority: 'regular',
    direction: 'vertical',
    alignment: 'center',
  },

  render: (args) => renderComponent(args as ObcReadout),
};

export const AlertLowIntegrity: Story = {
  args: {
    value: 42,
    label: 'RPM',
    unit: 'rpm',
    alertState: ReadoutAlertState.lowIntegrity,
  },
  render: (args) => renderComponent(args as ObcReadout),
};

export const AlertInvalid: Story = {
  args: {
    value: 42,
    label: 'RPM',
    unit: 'rpm',
    alertState: ReadoutAlertState.invalid,
  },
  render: (args) => renderComponent(args as ObcReadout),
};
