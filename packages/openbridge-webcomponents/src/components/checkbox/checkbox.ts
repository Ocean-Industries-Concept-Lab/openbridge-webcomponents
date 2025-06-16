import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '../../icons/icon-check-mixed.js';
import '../../icons/icon-check-google.js';
import componentStyle from './checkbox.css?inline';

type CheckboxStatus = 'unchecked' | 'checked' | 'mixed';

@customElement('obc-checkbox')
export class ObcCheckbox extends LitElement {
  @property({type: String}) status: CheckboxStatus = 'unchecked';
  @property({type: Boolean}) disabled: boolean = false;
  @property({type: String}) label: string = 'Checkbox item';
  @property({type: String}) ariaDescribedby: string = '';
  @property({type: String}) ariaControls: string = ''; // IDs of controlled checkboxes
  @property({type: Boolean}) isMixed: boolean = false; // Whether this is a mixed-state parent

  // Memory for previous selection states
  private previousChildStates: Map<string, CheckboxStatus> = new Map();

  override connectedCallback() {
    super.connectedCallback();
    if (this.isMixed && this.ariaControls) {
      // Listen for changes from child checkboxes
      document.addEventListener(
        'child-checkbox-changed',
        this.handleChildChange
      );
      // Initial status calculation with a delay to ensure children are rendered
      this.updateComplete.then(() => {
        setTimeout(() => {
          this.calculateStatusFromChildren();
        }, 0);
      });
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener(
      'child-checkbox-changed',
      this.handleChildChange
    );
  }

  private handleChildChange = () => {
    if (this.isMixed) {
      // When children change manually, update their "last state"
      const childIds = this.ariaControls.split(' ').filter((id) => id.trim());

      // Get all child checkboxes by their IDs
      const childCheckboxes = childIds
        .map((id) => document.getElementById(id))
        .filter(
          (el) => el && el.tagName.toLowerCase() === 'obc-checkbox'
        ) as ObcCheckbox[];

      const enabledChildren = childCheckboxes.filter(
        (child) => !child.disabled
      );

      // Always update the last state when children change manually
      this.updateLastStates(enabledChildren);
      this.calculateStatusFromChildren();
    }
  };

  private calculateStatusFromChildren() {
    if (!this.ariaControls) return;

    const childIds = this.ariaControls.split(' ').filter((id) => id.trim());
    const childCheckboxes = childIds
      .map((id) => document.getElementById(id))
      .filter(
        (el) => el && el.tagName.toLowerCase() === 'obc-checkbox'
      ) as ObcCheckbox[];

    if (childCheckboxes.length === 0) return;

    // Only count non-disabled children
    const enabledChildren = childCheckboxes.filter((child) => !child.disabled);
    const checkedEnabledChildren = enabledChildren.filter(
      (child) => child.status === 'checked'
    );

    if (checkedEnabledChildren.length === 0) {
      this.status = 'unchecked';
    } else if (checkedEnabledChildren.length === enabledChildren.length) {
      this.status = 'checked';
    } else {
      this.status = 'mixed';
    }
  }

  private toggleStatus() {
    if (this.disabled) return;

    if (this.isMixed && this.ariaControls) {
      // Mixed-state checkbox: toggle all children
      this.toggleAllChildren();
    } else {
      // Regular checkbox: simple toggle
      this.status = this.status === 'checked' ? 'unchecked' : 'checked';
    }

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          status: this.status,
          disabled: this.disabled,
        },
        bubbles: true,
      })
    );

    // Notify parent if this is a child checkbox
    if (!this.isMixed) {
      this.dispatchEvent(
        new CustomEvent('child-checkbox-changed', {
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private toggleAllChildren() {
    if (!this.ariaControls) return;

    const childIds = this.ariaControls.split(' ').filter((id) => id.trim());
    const childCheckboxes = childIds
      .map((id) => document.getElementById(id))
      .filter(
        (el) => el && el.tagName.toLowerCase() === 'obc-checkbox'
      ) as ObcCheckbox[];

    const enabledChildren = childCheckboxes.filter((child) => !child.disabled);

    // W3C Standard Mixed-State Checkbox Behavior:
    if (this.status === 'unchecked') {
      // UNCHECKED: Either restore last saved state OR check all if no previous state exists
      if (this.hasAnyLastChecked(enabledChildren)) {
        this.restoreLastStates(enabledChildren);
      } else {
        this.setAllChildren(enabledChildren, 'checked');
      }
    } else if (this.status === 'mixed') {
      // MIXED: Complete the selection by checking all remaining unchecked items
      this.updateLastStates(enabledChildren); // Save current mixed state before changing
      this.setAllChildren(enabledChildren, 'checked');
    } else if (this.status === 'checked') {
      // CHECKED: Uncheck everything
      this.setAllChildren(enabledChildren, 'unchecked');
    }

    // Recalculate parent status based on new child states
    this.calculateStatusFromChildren();
  }

  // Check if we have any previously saved "checked" states to restore
  private hasAnyLastChecked(children: ObcCheckbox[]): boolean {
    return children.some((child) => {
      const lastState = this.previousChildStates.get(child.id);
      return lastState === 'checked';
    });
  }

  // Save the current state of all children as "last state" for future restoration
  private updateLastStates(children: ObcCheckbox[]) {
    children.forEach((child) => {
      this.previousChildStates.set(child.id, child.status);
    });
  }

  // Restore children to their previously saved states
  private restoreLastStates(children: ObcCheckbox[]) {
    children.forEach((child) => {
      const lastState = this.previousChildStates.get(child.id);
      if (lastState) {
        child.status = lastState;
      } else {
        // Fallback: if no saved state exists, default to unchecked
        child.status = 'unchecked';
      }
      this.triggerChildChangeEvent(child);
    });
  }

  // Set all children to the same status (checked or unchecked)
  private setAllChildren(children: ObcCheckbox[], status: CheckboxStatus) {
    children.forEach((child) => {
      child.status = status;
      this.triggerChildChangeEvent(child);
    });
  }

  private triggerChildChangeEvent(child: ObcCheckbox) {
    child.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          status: child.status,
          disabled: child.disabled,
        },
        bubbles: true,
      })
    );
  }

  private handleKeydown(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Space') {
      e.preventDefault();
      this.toggleStatus();
    }
  }

  override get ariaChecked() {
    switch (this.status) {
      case 'checked':
        return 'true';
      case 'mixed':
        return 'mixed';
      case 'unchecked':
      default:
        return 'false';
    }
  }

  private get cssClasses() {
    return `checkbox-container status-${this.status} state-${this.disabled ? 'disabled' : 'enabled'}`;
  }

  override render() {
    return html`
      <div class="visually-hidden">
        <div
          class="${this.cssClasses}"
          role="checkbox"
          aria-checked="${this.ariaChecked}"
          aria-labelledby="checkbox-label"
          aria-describedby="${this.ariaDescribedby}"
          aria-controls="${this.ariaControls || ''}"
          ?aria-disabled="${this.disabled}"
          tabindex="${this.disabled ? '-1' : '0'}"
          ?disabled="${this.disabled}"
          @click=${this.toggleStatus}
          @keydown=${this.handleKeydown}
        >
          <div class="checkbox-box">
            ${this.status === 'checked'
              ? html`<obi-check-google
                  class="checkbox-icon"
                ></obi-check-google>`
              : this.status === 'mixed'
                ? html`<obi-check-mixed
                    class="checkbox-icon"
                  ></obi-check-mixed>`
                : html`<span class="checkbox-icon"></span>`}
          </div>
          <div class="checkbox-label-container">
            <span id="checkbox-label" class="checkbox-label">
              ${this.label}
            </span>
          </div>
        </div>
      </div>
    `;
  }

  static override styles = [unsafeCSS(componentStyle)];
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-checkbox': ObcCheckbox;
  }
}
