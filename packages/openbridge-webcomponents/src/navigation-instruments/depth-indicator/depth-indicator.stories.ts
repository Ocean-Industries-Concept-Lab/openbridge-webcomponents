import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {LitElement, html, type HTMLTemplateResult} from 'lit';
import {
  ObcDepthIndicator,
  ObcDepthIndicatorVariant,
} from './depth-indicator.js';
import './depth-indicator.js';

const DEPTH_INDICATOR_LAYOUT_PX = 48;

function deptIndicatorDecorator(story: () => unknown): HTMLTemplateResult {
  return html`<div
    style="width: ${DEPTH_INDICATOR_LAYOUT_PX}px; height: ${DEPTH_INDICATOR_LAYOUT_PX}px; box-sizing: border-box"
  >
    ${story()}
  </div>`;
}

const SAMPLE_VALUES = [
  0.43, 0.73, 0.57, 0.5, 0.22, 0.46, 0.42, 0.45, 0.29, 0.26, 0.25, 0.3, 0.34,
  0.34, 0.35, 0.43, 0.54, 0.73, 0.6, 0.64, 0.81, 0.19, 0.47, 0.4, 0.35, 0.27,
  0.31, 0.38, 0.66, 0.37, 0.4, 0.43,
];

class DepthIndicatorStreamingDemoElement extends LitElement {
  private timer?: number;
  private values: number[] = SAMPLE_VALUES.slice(-16);

  override connectedCallback(): void {
    super.connectedCallback();

    if (this.timer) return;
    this.timer = window.setInterval(() => {
      const next = Math.max(
        0,
        Math.min(1, (Math.random() + Math.random()) / 2)
      );
      this.values = [...this.values.slice(1), next];
      this.requestUpdate();
    }, 250);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  override render(): HTMLTemplateResult {
    return html`<obc-depth-indicator
      .variant=${ObcDepthIndicatorVariant.outline}
      .values=${this.values}
    ></obc-depth-indicator>`;
  }
}

if (!customElements.get('obc-depth-indicator-streaming-demo')) {
  customElements.define(
    'obc-depth-indicator-streaming-demo',
    DepthIndicatorStreamingDemoElement
  );
}

const meta: Meta<typeof ObcDepthIndicator> = {
  title: 'Indicators/Depth Indicator',
  tags: ['autodocs', '6.0'],
  component: 'obc-depth-indicator',
  parameters: {
    layout: 'centered',
  },
  args: {
    variant: ObcDepthIndicatorVariant.outline,
    values: SAMPLE_VALUES,
  },
} satisfies Meta<ObcDepthIndicator>;

export default meta;
type Story = StoryObj<ObcDepthIndicator>;

export const Outline: Story = {
  decorators: [deptIndicatorDecorator],
  args: {
    variant: ObcDepthIndicatorVariant.outline,
  },
};

export const Filled: Story = {
  decorators: [deptIndicatorDecorator],
  args: {
    variant: ObcDepthIndicatorVariant.filled,
  },
};

export const StreamingDemo: Story = {
  tags: ['skip-test'],
  decorators: [deptIndicatorDecorator],
  render: () =>
    html`<obc-depth-indicator-streaming-demo></obc-depth-indicator-streaming-demo>`,
};
