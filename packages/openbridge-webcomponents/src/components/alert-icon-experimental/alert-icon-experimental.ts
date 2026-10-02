import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './alert-icon-experimental.css?inline';
import {FlashingSpeed, type ResolvedFlashingSpeed} from '../../types.js';
import {FlashingController} from '../../palettes/flashing-controller.js';
import type {
  AlertPresentation,
  AlertSetAside,
} from '../../alert-system/alert-system.js';
import {AlertStandardController} from '../../alert-system/alert-systems.js';

/**
 * `<obc-alert-icon-experimental>` – The icon of one alert, drawn by the alert
 * standard it follows.
 *
 * The standard supplies the glyph for a criticality and a state, a second
 * frame when it flashes, and the tempo (`alert-system/`). The icon only
 * cross-fades the two frames through `FlashingController`, so every flashing
 * element lights up together, and knows no standard of its own. A standard
 * registered from outside the library draws through it unchanged.
 *
 * ### Features
 * - **Standard:** `standard` names it, or the default standard
 *   (`setDefaultAlertStandard`) applies.
 * - **Glyph:** `criticality` and `state`, in the terms of that standard.
 *   Nothing renders for a criticality or a state the standard does not have.
 * - **Set aside:** `setAside` lets a standard stop the flash, as ISA-18.2 does
 *   for a shelved or suppressed alarm.
 * - **Tempo:** `flashingSpeed` `default` takes the standard's tempo; `fast`,
 *   `slow` and `very-slow` force one while the icon flashes, and `fixed`
 *   holds it steady.
 *
 * ### Usage Guidelines
 * Like the stable `obc-alert-icon`, the icon fills the box it sits in, such
 * as a menu item's icon slot or a table cell; size that box.
 *
 * @property standard - The standard of `criticality` and `state`, such as `iec-62923` or `isa-18.2`; the default standard when unset.
 * @property criticality - How critical the alert is, in the terms of its standard.
 * @property state - Where the alert stands, in the terms of its standard.
 * @property setAside - Why the alert is set aside; some standards stop its flash then.
 * @property flashingSpeed - `default` takes the standard's tempo; `fast`, `slow` and `very-slow` force one while the icon flashes; `fixed` holds it steady.
 * @experimental
 */
@customElement('obc-alert-icon-experimental')
export class ObcAlertIconExperimental extends LitElement {
  @property({type: String}) standard?: string;
  @property({type: String}) criticality = '';
  @property({type: String}) state = '';
  @property({type: String}) setAside?: AlertSetAside;
  @property({type: String}) flashingSpeed: FlashingSpeed =
    FlashingSpeed.Default;

  private readonly standardController = new AlertStandardController(this);

  protected readonly flashing = new FlashingController(
    this,
    () => this.resolvedFlashingSpeed
  );

  private get presentation(): AlertPresentation | undefined {
    const {system} = this.standardController;
    if (
      !system.criticalities.includes(this.criticality) ||
      !system.states.includes(this.state)
    ) {
      return undefined;
    }
    return system.present(this.criticality, this.state, {
      setAside: this.setAside,
    });
  }

  get resolvedFlashingSpeed(): ResolvedFlashingSpeed {
    const presentation = this.presentation;
    if (
      !presentation ||
      presentation.flash === FlashingSpeed.Fixed ||
      presentation.glyph.flashFrame === undefined
    ) {
      return FlashingSpeed.Fixed;
    }
    return this.flashingSpeed === FlashingSpeed.Default
      ? presentation.flash
      : this.flashingSpeed;
  }

  override render() {
    const presentation = this.presentation;
    if (!presentation) {
      return nothing;
    }
    const {frame, flashFrame} = presentation.glyph;
    const tempo = this.resolvedFlashingSpeed;
    if (tempo === FlashingSpeed.Fixed) {
      return html`<div class="wrapper"><div class="frame">${frame}</div></div>`;
    }
    return html`<div class="wrapper flash-${tempo}">
      <div class="frame">${frame}</div>
      <div class="flash-frame">${flashFrame}</div>
    </div>`;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-icon-experimental': ObcAlertIconExperimental;
  }
}
