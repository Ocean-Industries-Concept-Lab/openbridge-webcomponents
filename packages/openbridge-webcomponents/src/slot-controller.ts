import {ReactiveControllerHost, LitElement, ReactiveController} from 'lit';

export class SlotController implements ReactiveController {
  private host: LitElement & ReactiveControllerHost;
  private slotName: string;
  public hasAssignedElements = false;
  private hasRendered = false;

  constructor(host: LitElement & ReactiveControllerHost, slotName: string) {
    this.host = host;
    this.slotName = slotName;
    this.host.addController(this);
  }

  hostUpdated(): void {
    if (!this.hasRendered) {
      this.hasRendered = true;
      const slot = this.host.shadowRoot?.querySelector(
        `slot[name="${this.slotName}"]`
      ) as HTMLSlotElement | null;

      if (slot) {
        this.hasAssignedElements = slot.assignedElements().length > 0;
        slot.addEventListener('slotchange', () => this.handleSlotChange(slot));
        this.host.requestUpdate(); // Notify Lit to re-render
      } else {
        console.error(
          `SlotController: Slot with name "${this.slotName}" not found in host`
        );
      }
    }
  }

  private handleSlotChange(slot: HTMLSlotElement) {
    this.hasAssignedElements = slot.assignedElements().length > 0;
    this.host.requestUpdate();
  }
}
