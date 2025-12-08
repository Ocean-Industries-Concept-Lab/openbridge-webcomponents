import {LitElement, css, html} from 'lit';
import {property} from 'lit/decorators.js';
import '../automation-button/automation-button.js';
import {
  AutomationButtonLabelDirection,
  AutomationButtonReadoutPosition,
  AutomationButtonState,
  AutomationButtonVariant,
} from '../automation-button/automation-button.js';
import {
  AutomationButtonReadoutStack,
  AutomationButtonReadoutStackSize,
  AutomationButtonReadoutStackTag,
} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import {Direction} from '../../types.js';
import '../valve-analoge-two-way-icon/valve-analog-two-way-icon.js';
import {customElement} from '../../decorator.js';

@customElement('obc-valve')
export class ObcValve extends LitElement {
  @property({type: String}) readoutPosition: AutomationButtonReadoutPosition =
    AutomationButtonReadoutPosition.bottom;
  @property({type: String}) readoutSize: AutomationButtonReadoutStackSize =
    AutomationButtonReadoutStackSize.regular;
  @property({type: Boolean}) alert: boolean = false;
  @property({type: Boolean}) progress: boolean = false;
  @property({type: String}) tag: string = '';
  @property({type: String}) direction: Direction = Direction.Right;
  @property({type: Number}) value: number = 100;
  @property({type: Boolean}) closed: boolean = false;
  @property({type: Boolean}) showDirectionLabel: boolean = false;
  @property({type: String}) variant: AutomationButtonVariant =
    AutomationButtonVariant.regular;

  private mapDirectionToLabelDirection(
    direction: Direction
  ): AutomationButtonLabelDirection {
    switch (direction) {
      case Direction.Up:
        return AutomationButtonLabelDirection.up;
      case Direction.Down:
        return AutomationButtonLabelDirection.down;
      case Direction.Left:
        return AutomationButtonLabelDirection.left;
      case Direction.Right:
        return AutomationButtonLabelDirection.right;
    }
  }

  override render() {
    const readouts: AutomationButtonReadoutStack[] = [];

    if (this.showDirectionLabel) {
      readouts.push({
        type: 'value',
        value: this.value,
        nDigits: 3,
        unit: '%',
        direction: this.mapDirectionToLabelDirection(this.direction),
        hasIcon: true,
      });
    }

    const tagValue: AutomationButtonReadoutStackTag | null = this.tag
      ? {value: this.parseTagToNumber(this.tag)}
      : null;

    return html`
      <obc-automation-button
        .state=${this.closed
          ? AutomationButtonState.closed
          : AutomationButtonState.open}
        .readouts=${readouts}
        .tag=${tagValue}
        .readoutPosition=${this.readoutPosition}
        .readoutSize=${this.readoutSize}
        ?alert=${this.alert}
        ?progress=${this.progress}
        .variant=${this.variant}
      >
        <obc-valve-analog-two-way-icon
          class=${[Direction.Up, Direction.Down].includes(this.direction)
            ? 'vertical'
            : 'horizontal'}
          slot="icon"
          ?closed=${this.closed}
        ></obc-valve-analog-two-way-icon>
        <slot name="badge-top-right"></slot>
        <slot name="badge-top-left"></slot>
        <slot name="badge-bottom-left"></slot>
        <slot name="badge-bottom-right"></slot>
      </obc-automation-button>
    `;
  }

  private parseTagToNumber(tag: string): number {
    const num = parseInt(tag.replace(/#/g, ''), 10);
    return isNaN(num) ? 0 : num;
  }

  static override styles = css`
    .vertical {
      transform: rotate(90deg);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-valve': ObcValve;
  }
}
