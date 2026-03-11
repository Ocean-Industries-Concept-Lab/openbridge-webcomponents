import {LitElement, TemplateResult, html, nothing} from 'lit';
import {property, queryAssignedElements} from 'lit/decorators.js';
import '../automation-button/automation-button.js';
import {
  AutomationButtonDirection,
  AutomationButtonPositioning,
  AutomationButtonReadoutPosition,
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
import '../automation-badge/automation-badge.js';

export class ObcAbstractAutomationButton extends LitElement {
  @property({type: Boolean, attribute: false}) showReadoutStack: boolean = true;
  @property({type: Boolean}) hasIdTag: boolean = false;
  @property({type: String}) readoutPosition: AutomationButtonReadoutPosition =
    AutomationButtonReadoutPosition.bottom;
  @property({type: String}) readoutSize: AutomationButtonReadoutStackSize =
    AutomationButtonReadoutStackSize.regular;
  @property({type: String}) positioning: AutomationButtonPositioning =
    AutomationButtonPositioning.point;
  @property({type: Boolean}) alert: boolean = false;
  @property({type: String}) alertFrameType: ObcAlertFrameType =
    ObcAlertFrameType.SmallSideFlip;
  @property({type: String}) alertFrameThickness: ObcAlertFrameThickness =
    ObcAlertFrameThickness.Small;
  @property({type: String}) alertFrameStatus: ObcAlertFrameStatus =
    ObcAlertFrameStatus.Alarm;
  @property({type: Boolean, attribute: false}) showAlertCategoryIcon: boolean =
    true;
  @property({type: Boolean}) showAlertIcon: boolean = false;
  @property({type: Boolean}) progress: boolean = false;
  @property({type: String}) tag: string = '';
  @property({type: String}) direction: AutomationButtonDirection =
    AutomationButtonDirection.forward;
  @property({type: Boolean}) badgeAuto: boolean = false;
  @property({type: Boolean}) badgeCommandLocked: boolean = false;
  @property({type: Boolean}) badgeDuty: boolean = false;
  @property({type: Boolean}) badgeAlertOff: boolean = false;

  get icon(): TemplateResult {
    throw new Error('Method "icon" must be implemented in subclass');
  }

  get _on(): boolean {
    throw new Error('Method "_on" must be implemented in subclass');
  }

  get _variant(): AutomationButtonVariant {
    // @ts-expect-error - property should be defined in subclass
    return this.variant as AutomationButtonVariant;
  }

  get extraReadouts(): AutomationButtonReadoutStack[] {
    return [];
  }

  @queryAssignedElements({slot: 'badge-top-right'})
  badgeTopRight!: HTMLElement[];
  @queryAssignedElements({slot: 'badge-top-left'})
  badgeTopLeft!: HTMLElement[];
  @queryAssignedElements({slot: 'badge-bottom-left'})
  badgeBottomLeft!: HTMLElement[];
  @queryAssignedElements({slot: 'badge-bottom-right'})
  badgeBottomRight!: HTMLElement[];

  private getBadgeSpacer(): boolean {
    if (!this.showReadoutStack) {
      return false;
    }
    const topLeft = this.badgeTopLeft.length > 0 || this.badgeAuto;
    const topRight = this.badgeTopRight.length > 0 || this.badgeAlertOff;
    const bottomLeft = this.badgeBottomLeft.length > 0 || this.badgeDuty;
    const bottomRight =
      this.badgeBottomRight.length > 0 || this.badgeCommandLocked;
    if (this.readoutPosition === AutomationButtonReadoutPosition.top) {
      return topRight || topLeft;
    } else if (
      this.readoutPosition === AutomationButtonReadoutPosition.bottom
    ) {
      return bottomLeft || bottomRight;
    } else if (this.readoutPosition === AutomationButtonReadoutPosition.left) {
      return topLeft || bottomLeft;
    } else if (this.readoutPosition === AutomationButtonReadoutPosition.right) {
      return topRight || bottomRight;
    }
    return false;
  }

  private handleBadgeSlotChange() {
    this.requestUpdate();
  }

  override render() {
    const readouts: AutomationButtonReadoutStack[] = [...this.extraReadouts];
    const tagValue: AutomationButtonReadoutStackTag | null = this.tag
      ? {value: this.parseTagToNumber(this.tag)}
      : null;

    return html`<obc-automation-button
      .state=${this._on
        ? AutomationButtonState.open
        : AutomationButtonState.closed}
      .readouts=${readouts}
      .tag=${tagValue}
      .showReadoutStack=${this.showReadoutStack}
      .hasIdTag=${this.hasIdTag}
      .readoutPosition=${this.readoutPosition}
      .readoutSize=${this.readoutSize}
      ?alert=${this.alert}
      .alertFrameType=${this.alertFrameType}
      .alertFrameThickness=${this.alertFrameThickness}
      .alertFrameStatus=${this.alertFrameStatus}
      .showAlertCategoryIcon=${this.showAlertCategoryIcon}
      .showAlertIcon=${this.showAlertIcon}
      ?progress=${this.progress}
      .variant=${this._variant}
      .direction=${this.direction}
      .hasBadgeSpacer=${this.getBadgeSpacer()}
      .positioning=${this.positioning}
    >
      ${this.icon}
      <slot
        name="badge-top-right"
        slot="badge-top-right"
        @slotchange=${this.handleBadgeSlotChange}
      >
        ${this.badgeAlertOff
          ? html`<obc-automation-badge type="alert-off"></obc-automation-badge>`
          : nothing}
      </slot>
      <slot
        name="badge-top-left"
        slot="badge-top-left"
        @slotchange=${this.handleBadgeSlotChange}
      >
        ${this.badgeAuto
          ? html`<obc-automation-badge type="auto"></obc-automation-badge>`
          : nothing}
      </slot>
      <slot
        name="badge-bottom-left"
        slot="badge-bottom-left"
        @slotchange=${this.handleBadgeSlotChange}
      >
        ${this.badgeDuty
          ? html`<obc-automation-badge type="duty"></obc-automation-badge>`
          : nothing}
      </slot>
      <slot
        name="badge-bottom-right"
        slot="badge-bottom-right"
        @slotchange=${this.handleBadgeSlotChange}
      >
        ${this.badgeCommandLocked
          ? html`<obc-automation-badge
              type="command-locked"
            ></obc-automation-badge>`
          : nothing}
      </slot>
    </obc-automation-button>`;
  }

  private parseTagToNumber(tag: string): number {
    const num = parseInt(tag.replace(/#/g, ''), 10);
    return isNaN(num) ? 0 : num;
  }
}
