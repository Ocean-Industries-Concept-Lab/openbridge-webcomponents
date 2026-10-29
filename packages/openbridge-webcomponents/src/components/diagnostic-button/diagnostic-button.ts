import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {localized, msg} from '@lit/localize';
import componentStyle from './diagnostic-button.css?inline';
import {customElement} from '../../decorator.js';
import '../alert-button-item/alert-button-item.js';
import '../alert-frame/diagnostic-badge.js';

/**
 * `<obc-diagnostic-button>` – The top bar's diagnostic button: the asterisk
 * and the number of diagnostics, selected while its menu is showing.
 *
 * The diagnostic counterpart of `obc-alert-button`: `obc-alert-button-item`
 * with the diagnostic asterisk in its icon slot and a name of its own. It
 * opens `obc-diagnostic-menu`, as the alert button opens the alert menu.
 *
 * ---
 *
 * ### Features
 * - **Counter:** `nAlerts` is drawn next to the asterisk; 0 shows the
 *   asterisk alone.
 * - **Activated:** `activated` draws the selected style while the diagnostic
 *   menu is showing.
 * - **Name:** "Diagnostics, 3" is announced, and repeated when the count
 *   changes; `aria-label` replaces it.
 *
 * ---
 *
 * ### Usage Guidelines
 * - Slot it into `obc-top-bar`'s `diagnostics` slot, after the alert button,
 *   or place it in a toolbar on its own.
 * - Open the menu from `click` the way a bar button opens a menu: flip a
 *   flag of your own, bind it to the menu's `open` and to `activated`, and
 *   reset it on the menu's `close`.
 * - A native button, so Enter and Space activate it
 *   ([APG button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)).
 *   Left out: nothing.
 * - **TODO(designer):** the design draws a six-armed asterisk with rounded
 *   arms that is not in the icon library; the button draws
 *   `obi-diagnostic-badge`, the sharp asterisk of the diagnostic alert icon,
 *   until the icon is added (#1396).
 *
 * ---
 *
 * ### Example
 *
 * ```html
 * <obc-diagnostic-button nAlerts="3" activated></obc-diagnostic-button>
 * ```
 *
 * @property nAlerts - Number of diagnostics, drawn as the counter; 0 shows the asterisk alone.
 * @property activated - Draws the selected style while the diagnostic menu is showing; bind it to the flag that drives the menu's `open`.
 * @property ariaLabel - Accessible name forwarded to the inner `<button>`, mapped to the `aria-label` attribute; replaces the generated "Diagnostics, 3". `aria-labelledby` is not supported: ID references cannot cross the shadow boundary.
 * @fires click - Fired when the button is clicked.
 * @experimental
 */
@customElement('obc-diagnostic-button')
@localized()
export class ObcDiagnosticButton extends LitElement {
  @property({type: Number}) nAlerts = 0;
  @property({type: Boolean}) activated = false;

  // Reactive so a consumer changing the name re-renders the inner button.
  @property({type: String, attribute: 'aria-label'})
  override ariaLabel: string | null = null;

  private get accessibleName(): string {
    if (this.ariaLabel) {
      return this.ariaLabel;
    }
    return this.nAlerts > 0
      ? `${msg('Diagnostics')}, ${this.nAlerts}`
      : msg('Diagnostics');
  }

  override render() {
    return html`<obc-alert-button-item
      class="item"
      .nAlerts=${this.nAlerts}
      counter
      .activated=${this.activated}
      aria-label=${this.accessibleName}
      ><obi-diagnostic-badge slot="icon"></obi-diagnostic-badge
    ></obc-alert-button-item>`;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-diagnostic-button': ObcDiagnosticButton;
  }
}
