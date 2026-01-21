import { LitElement, TemplateResult, html } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';
import '../automation-button/automation-button.js';
import {
  AutomationButtonDirection,
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

export class ObcAbstractAutomationButton extends LitElement {
  @property({ type: Boolean }) hideReadoutStack: boolean = false;
  @property({ type: Boolean }) hasIdTag: boolean = false;
  @property({ type: String }) readoutPosition: AutomationButtonReadoutPosition =
    AutomationButtonReadoutPosition.bottom;
  @property({ type: String }) readoutSize: AutomationButtonReadoutStackSize =
    AutomationButtonReadoutStackSize.regular;
  @property({ type: Boolean }) alert: boolean = false;
  @property({ type: String }) alertFrameType: ObcAlertFrameType =
    ObcAlertFrameType.SmallSideFlip;
  @property({ type: String }) alertFrameThickness: ObcAlertFrameThickness =
    ObcAlertFrameThickness.Small;
  @property({ type: String }) alertFrameStatus: ObcAlertFrameStatus =
    ObcAlertFrameStatus.Alarm;
  @property({ type: Boolean }) progress: boolean = false;
  @property({ type: String }) tag: string = '';
  @property({ type: String }) variant: AutomationButtonVariant =
    AutomationButtonVariant.regular;
  @property({ type: String }) direction: AutomationButtonDirection =
    AutomationButtonDirection.forward;

  get icon(): TemplateResult {
    throw new Error('Method "icon" must be implemented in subclass');
  }

  get _on(): boolean {
    throw new Error('Method "_on" must be implemented in subclass');
  }

  get extraReadouts(): AutomationButtonReadoutStack[] {
    return [];
  }

  @queryAssignedElements({ slot: 'badge-top-right' })
  badgeTopRight!: HTMLElement[];
  @queryAssignedElements({ slot: 'badge-top-left' })
  badgeTopLeft!: HTMLElement[];
  @queryAssignedElements({ slot: 'badge-bottom-left' })
  badgeBottomLeft!: HTMLElement[];
  @queryAssignedElements({ slot: 'badge-bottom-right' })
  badgeBottomRight!: HTMLElement[];

  private getBadgeSpacer(): boolean {
    if (this.hideReadoutStack) {
      return false;
    }
    if (this.readoutPosition === AutomationButtonReadoutPosition.top) {
      return this.badgeTopRight.length > 0 || this.badgeTopLeft.length > 0;
    } else if (this.readoutPosition === AutomationButtonReadoutPosition.bottom) {
      return this.badgeBottomLeft.length > 0 || this.badgeBottomRight.length > 0;
    } else if (this.readoutPosition === AutomationButtonReadoutPosition.left) {
      return this.badgeTopLeft.length > 0 || this.badgeBottomLeft.length > 0;
    } else if (this.readoutPosition === AutomationButtonReadoutPosition.right) {
      return this.badgeTopRight.length > 0 || this.badgeBottomRight.length > 0;
    }
    return false;
  }

  private handleBadgeSlotChange() {
    this.requestUpdate();
  }

  override render() {
    const readouts: AutomationButtonReadoutStack[] = [...this.extraReadouts];
    const tagValue: AutomationButtonReadoutStackTag | null = this.tag
      ? { value: this.parseTagToNumber(this.tag) }
      : null;

    return html`<obc-automation-button
      .state=${this._on
        ? AutomationButtonState.open
        : AutomationButtonState.closed}
      .readouts=${readouts}
      .tag=${tagValue}
      .hideReadoutStack=${this.hideReadoutStack}
      .hasIdTag=${this.hasIdTag}
      .readoutPosition=${this.readoutPosition}
      .readoutSize=${this.readoutSize}
      ?alert=${this.alert}
      .alertFrameType=${this.alertFrameType}
      .alertFrameThickness=${this.alertFrameThickness}
      .alertFrameStatus=${this.alertFrameStatus}
      ?progress=${this.progress}
      .variant=${this.variant}
      .direction=${this.direction}
      .hasBadgeSpacer=${this.getBadgeSpacer()}
    >
      ${this.icon}
        <slot name="badge-top-right" slot="badge-top-right" @slotchange=${this.handleBadgeSlotChange}></slot>
        <slot name="badge-top-left" slot="badge-top-left" @slotchange=${this.handleBadgeSlotChange}></slot>
        <slot name="badge-bottom-left" slot="badge-bottom-left" @slotchange=${this.handleBadgeSlotChange}></slot>
        <slot name="badge-bottom-right" slot="badge-bottom-right" @slotchange=${this.handleBadgeSlotChange}></slot>
    </obc-automation-button>`;
  }

  private parseTagToNumber(tag: string): number {
    const num = parseInt(tag.replace(/#/g, ''), 10);
    return isNaN(num) ? 0 : num;
  }
}
