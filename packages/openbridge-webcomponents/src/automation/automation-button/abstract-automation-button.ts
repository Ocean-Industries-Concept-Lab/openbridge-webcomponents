import {LitElement, TemplateResult, html} from 'lit';
import {property} from 'lit/decorators.js';
import '../automation-button/automation-button.js';
import {
  AutomationButtonDirection,
  AutomationButtonLabelDirection,
  AutomationButtonLabelPosition,
  AutomationButtonState,
  AutomationButtonVariant,
} from '../automation-button/automation-button.js';
import {
  AutomationButtonReadoutStack,
  AutomationButtonReadoutStackSize,
  AutomationButtonReadoutStackTag,
} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import {
  ObcAlertFrameStatus,
  ObcAlertFrameThickness,
  ObcAlertFrameType,
} from '../../components/alert-frame/alert-frame.js';

export class ObcAbstractAutomationButton extends LitElement {
  @property({type: String}) labelPosition: AutomationButtonLabelPosition =
    AutomationButtonLabelPosition.bottom;
  @property({type: String}) labelSize: AutomationButtonReadoutStackSize =
    AutomationButtonReadoutStackSize.regular;
  @property({type: Boolean}) alert: boolean = false;
  @property({type: String}) alertFrameType: ObcAlertFrameType =
    ObcAlertFrameType.SmallSideFlip;
  @property({type: String}) alertFrameThickness: ObcAlertFrameThickness =
    ObcAlertFrameThickness.Small;
  @property({type: String}) alertFrameStatus: ObcAlertFrameStatus =
    ObcAlertFrameStatus.Alarm;
  @property({type: Boolean}) progress: boolean = false;
  @property({type: Boolean}) on: boolean = false;
  @property({type: Number}) speedInPercent: number = 0;
  @property({type: String}) tag: string = '';
  @property({type: String}) variant: AutomationButtonVariant =
    AutomationButtonVariant.regular;
  @property({type: String}) direction: AutomationButtonDirection =
    AutomationButtonDirection.forward;
  @property({type: String}) labelDirection: AutomationButtonLabelDirection =
    AutomationButtonLabelDirection.right;

  get icon(): TemplateResult {
    throw new Error('Method "icon" must be implemented in subclass');
  }

  override render() {
    const readouts: AutomationButtonReadoutStack[] = [];
    
    if (this.speedInPercent !== undefined && this.speedInPercent !== null) {
      readouts.push({
        type: 'value',
        value: this.speedInPercent,
        nDigits: 3,
        unit: '%',
        direction: this.labelDirection,
        hasIcon: true,
      });
    }

    const tagValue: AutomationButtonReadoutStackTag | null = this.tag
      ? { value: this.parseTagToNumber(this.tag) }
      : null;

    return html`<obc-automation-button
      .state=${this.on
        ? AutomationButtonState.open
        : AutomationButtonState.closed}
      .readouts=${readouts}
      .tag=${tagValue}
      .labelPosition=${this.labelPosition}
      .labelSize=${this.labelSize}
      ?alert=${this.alert}
      .alertFrameType=${this.alertFrameType}
      .alertFrameThickness=${this.alertFrameThickness}
      .alertFrameStatus=${this.alertFrameStatus}
      ?progress=${this.progress}
      .variant=${this.variant}
      .direction=${this.direction}
    >
      ${this.icon}
    </obc-automation-button>`;
  }

  private parseTagToNumber(tag: string): number {
    const num = parseInt(tag.replace(/#/g, ''), 10);
    return isNaN(num) ? 0 : num;
  }
}
