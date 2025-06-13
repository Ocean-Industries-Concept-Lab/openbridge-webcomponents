import {LitElement, TemplateResult, html} from 'lit';
import {property} from 'lit/decorators.js';
import '../automation-button/automation-button.js';
import {
  AutomationBottonLabelStyle,
  AutomationButtonDirection,
  AutomationButtonDirectonValueLabel,
  AutomationButtonLabelDirection,
  AutomationButtonLabelPosition,
  AutomationButtonLabelSize,
  AutomationButtonState,
  AutomationButtonTagLabel,
  AutomationButtonVariant,
} from '../automation-button/automation-button.js';
import '../../icons/icon-motor-on-vertical.js';
import '../../icons/icon-motor-off-vertical.js';
import '../../icons/icon-motor-on-horisontal.js';
import '../../icons/icon-motor-off-horisontal.js';

export abstract class ObcAbstractAutomationButton extends LitElement {
  @property({type: String}) labelPosition: AutomationButtonLabelPosition =
    AutomationButtonLabelPosition.bottom;
  @property({type: String}) labelSize: AutomationButtonLabelSize =
    AutomationButtonLabelSize.regular;
  @property({type: String}) labelStyle: AutomationBottonLabelStyle =
    AutomationBottonLabelStyle.regular;
  @property({type: Boolean}) alert: boolean = false;
  @property({type: Boolean}) progress: boolean = false;
  @property({type: Boolean}) on: boolean = false;
  @property({type: Number}) speedInPercent: number = 0;
  @property({type: String}) tag: string = '';
  @property({type: Boolean}) vertical: boolean = false;
  @property({type: String}) variant: AutomationButtonVariant =
    AutomationButtonVariant.regular;
  @property({type: String}) direction: AutomationButtonDirection =
    AutomationButtonDirection.forward;
  @property({type: String}) labelDirection: AutomationButtonLabelDirection =
    AutomationButtonLabelDirection.right;

  abstract get icon(): TemplateResult;

  override render() {
    const labels = [
      {
        type: 'direction',
        value: this.speedInPercent,
        nDigits: 3,
        unit: 'percent',
        direction: this.labelDirection,
      } as AutomationButtonDirectonValueLabel,
      {
        type: 'tag',
        text: this.tag,
        showHash: true,
      } as AutomationButtonTagLabel,
    ];
    return html`<obc-automation-button
      .state=${this.on
        ? AutomationButtonState.open
        : AutomationButtonState.closed}
      .labels=${labels}
      .labelPosition=${this.labelPosition}
      .labelSize=${this.labelSize}
      .labelStyle=${this.labelStyle}
      ?alert=${this.alert}
      ?progress=${this.progress}
      .variant=${this.variant}
      .direction=${this.direction}
    >
      ${this.icon}
    </obc-automation-button>`;
  }
}
