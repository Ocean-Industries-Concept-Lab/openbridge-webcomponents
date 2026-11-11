import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {localized} from '@lit/localize';
import componentStyle from './alert-menu-item-experimental.css?inline';
import '../message-menu-item/message-menu-item.js';
import '../alert-icon-experimental/alert-icon-experimental.js';
import {ObcMessageMenuItemSize} from '../message-menu-item/message-menu-item.js';
import {customElement} from '../../decorator.js';
import {AlertStandardController} from '../../alert-system/configured-alert-standard.js';
import {
  alertActionLabel,
  findAlertStateDefinition,
} from '../../alert-system/read-standard-alert.js';

export type ObcAlertMenuItemExperimentalActionClickEvent = CustomEvent<{
  actionId: string;
}>;

/**
 * `<obc-alert-menu-item-experimental>` – One alert in an alert menu, drawn by
 * the configured alert standard.
 *
 * The item takes the alert's `criticality` and `state`, and reads the rest
 * from the standard (`setAlertStandard()`, `alert-system/`): the icon, the
 * actions the alert offers as buttons, and the glyph shown where it offers
 * none.
 *
 * ### Features
 * - **Icon:** `obc-alert-icon-experimental` for the criticality and state.
 * - **Actions:** the first two actions the state offers become buttons with
 *   the labels the standard gives them; a click fires `action-click` with the
 *   action's id.
 * - **No action:** a state that offers no action shows the glyph its standard
 *   defines for that, such as the IEC 62923 "acknowledge not allowed" icon.
 * - **Text:** `title`, `description`, `day` and `time`, as slots or
 *   properties, and an optional secondary `icon`.
 *
 * ### Usage Guidelines
 * Place the items in `obc-alert-menu-experimental` or
 * `obc-alert-list-experimental`, which show and hide them by the filters
 * their states are included in. Update `state` when the alert changes; the
 * item never changes it itself.
 *
 * @property criticality - How critical the alert is, in the terms of its standard.
 * @property state - Where the alert stands, in the terms of its standard.
 * @property title - The title of the alert.
 * @property description - The description of the alert.
 * @property day - The day label of the alert, such as "Yesterday".
 * @property time - The time label of the alert, such as "14:30".
 * @property hasIcon - Whether to render the secondary `icon` slot.
 * @property open - Whether the item is expanded; a click on the item toggles it.
 * @property size - Whether the text takes one line or several.
 * @property animateIntro - Whether the item plays its intro animation; the alert list sets it for new items.
 * @slot title - Title content; the `title` property when left empty.
 * @slot description - Description content; the `description` property when left empty.
 * @slot icon - Secondary icon, such as the source of the alert.
 * @fires {ObcAlertMenuItemExperimentalActionClickEvent} action-click - Fired when the user clicks an action button, with the id of the action.
 * @fires {CustomEvent<void>} item-click - Fired when the user clicks the item.
 * @experimental
 */
@customElement('obc-alert-menu-item-experimental')
@localized()
export class ObcAlertMenuItemExperimental extends LitElement {
  @property({type: String, reflect: true}) criticality = '';
  @property({type: String, reflect: true}) state = '';
  @property({type: String}) override title = '';
  @property({type: String}) description = '';
  @property({type: String}) day = '';
  @property({type: String}) time = '';
  @property({type: Boolean}) hasIcon = false;
  @property({type: Boolean}) open = false;
  @property({type: String}) size: ObcMessageMenuItemSize =
    ObcMessageMenuItemSize.SingleLine;
  @property({type: Boolean}) animateIntro = false;

  protected readonly alertStandardController = new AlertStandardController(
    this
  );

  private get stateDefinition() {
    return findAlertStateDefinition({
      criticality: this.criticality,
      state: this.state,
    });
  }

  private get actionIdsShownAsButtons(): readonly string[] {
    return (this.stateDefinition?.offeredActions ?? []).slice(0, 2);
  }

  private labelOfActionButton(index: number): string {
    const actionId = this.actionIdsShownAsButtons[index];
    return actionId === undefined ? '' : alertActionLabel(actionId);
  }

  private handleMessageClick(event: Event) {
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent('item-click'));
    this.open = !this.open;
  }

  private handleActionButtonClick(event: Event, index: number) {
    event.stopPropagation();
    const actionId = this.actionIdsShownAsButtons[index];
    if (actionId === undefined) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent('action-click', {
        detail: {actionId},
      }) as ObcAlertMenuItemExperimentalActionClickEvent
    );
  }

  override render() {
    const offersNoAction = this.actionIdsShownAsButtons.length === 0;
    const glyphShownInsteadOfActions = offersNoAction
      ? this.stateDefinition?.glyphShownInsteadOfActions
      : undefined;
    return html`
      <obc-message-menu-item
        .title=${this.title}
        .description=${this.description}
        .day=${this.day}
        .time=${this.time}
        .primaryActionLabel=${this.labelOfActionButton(0)}
        .secondaryActionLabel=${this.labelOfActionButton(1)}
        .size=${this.size}
        .open=${this.open}
        .hasSecondaryIcon=${this.hasIcon}
        .hasTrailingIcon=${offersNoAction}
        enhancedIcon
        hasPrimaryIcon
        @message-click=${this.handleMessageClick}
        @primary-action-click=${(event: Event) =>
          this.handleActionButtonClick(event, 0)}
        @secondary-action-click=${(event: Event) =>
          this.handleActionButtonClick(event, 1)}
      >
        <obc-alert-icon-experimental
          slot="primary-icon"
          .criticality=${this.criticality}
          .state=${this.state}
        ></obc-alert-icon-experimental>
        <slot name="title" slot="title">${this.title}</slot>
        <slot name="description" slot="description">${this.description}</slot>
        ${
          this.hasIcon
            ? html`<slot name="icon" slot="secondary-icon"></slot>`
            : nothing
        }
        ${
          glyphShownInsteadOfActions
            ? html`<span
                slot="trailing-icon"
                class="glyph-shown-instead-of-actions"
                >${glyphShownInsteadOfActions}</span
              >`
            : nothing
        }
      </obc-message-menu-item>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-menu-item-experimental': ObcAlertMenuItemExperimental;
  }
}
