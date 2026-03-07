import {html, css, unsafeCSS, nothing, TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractPoiObject} from '../building-blocks/poi-object/abstract-poi-object.js';
import {
  ObcPoiObjectType,
  ObcPoiObjectState,
} from '../building-blocks/poi-object/poi-object.js';
import componentStyle from './poi-object-aton.css?inline';

export enum ObcPoiObjectAtonType {
  Indicator = 'indicator',
  Regular = 'regular',
  Large = 'large',
  AtoN = 'aton',
  NUp = 'n-up',
  NUpLarge = 'n-up-large',
}

export enum ObcPoiObjectAtonStyle {
  Regular = 'regular',
  Green = 'green',
  Red = 'red',
  Yellow = 'yellow',
}

export enum ObcPoiObjectAtonState {
  Unchecked = 'unchecked',
  Checked = 'checked',
  StaticUnchecked = 'static-unchecked',
  StaticChecked = 'static-checked',
  Activated = 'activated',
  Overlapped = 'overlapped',
  Caution = 'caution',
  Warning = 'warning',
  Alarm = 'alarm',
}

@customElement('obc-poi-object-aton')
export class ObcPoiObjectAton extends ObcAbstractPoiObject {
  @property({type: String}) type: ObcPoiObjectAtonType =
    ObcPoiObjectAtonType.Regular;

  @property({type: String})
  // @ts-expect-error — widening type to include AtoN-specific styles
  override objectStyle: ObcPoiObjectAtonStyle = ObcPoiObjectAtonStyle.Regular;

  @property({type: String})
  // @ts-expect-error — widening type to include alert states
  override state: ObcPoiObjectAtonState = ObcPoiObjectAtonState.Unchecked;

  private get isAtonType(): boolean {
    return this.type === ObcPoiObjectAtonType.AtoN;
  }

  private get isAlertState(): boolean {
    return (
      this.state === ObcPoiObjectAtonState.Caution ||
      this.state === ObcPoiObjectAtonState.Warning ||
      this.state === ObcPoiObjectAtonState.Alarm
    );
  }

  override get baseType(): ObcPoiObjectType {
    switch (this.type) {
      case ObcPoiObjectAtonType.Indicator:
        return ObcPoiObjectType.Indicator;
      case ObcPoiObjectAtonType.Regular:
        return ObcPoiObjectType.Regular;
      case ObcPoiObjectAtonType.Large:
        return ObcPoiObjectType.Large;
      case ObcPoiObjectAtonType.NUp:
        return ObcPoiObjectType.NUp;
      case ObcPoiObjectAtonType.NUpLarge:
        return ObcPoiObjectType.NUpLarge;
      default:
        return ObcPoiObjectType.Regular;
    }
  }

  private get mappedBaseState(): ObcPoiObjectState {
    if (this.isAlertState) {
      return ObcPoiObjectState.Unchecked;
    }
    return this.state as unknown as ObcPoiObjectState;
  }

  override get icon(): TemplateResult {
    return html`<slot></slot>`;
  }

  private renderAlertFrame(): TemplateResult | typeof nothing {
    if (!this.isAlertState) return nothing;
    return html`
      <div class="alert-frame">
        <div class="alert-frame-background">
          <div class="alert-frame-foreground"></div>
        </div>
      </div>
    `;
  }

  private renderAtonDiamond(): TemplateResult {
    return html`
      <div class="aton-diamond-frame">
        <div class="aton-diamond-background"></div>
        ${this.renderAlertFrame()}
        <div class="aton-icon-container">
          <slot></slot>
        </div>
      </div>
    `;
  }

  override render() {
    const wrapperClasses = {
      'aton-wrapper': true,
      [`type-${this.type}`]: true,
      [`style-${this.objectStyle}`]: true,
      [`state-${this.state}`]: true,
      'is-alert': this.isAlertState,
    };

    if (this.isAtonType) {
      return html`
        <div class=${classMap(wrapperClasses)}>${this.renderAtonDiamond()}</div>
      `;
    }

    return html`
      <div class=${classMap(wrapperClasses)}>
        ${this.renderAlertFrame()}
        <obc-poi-object
          .type=${this.baseType}
          .objectStyle=${'regular'}
          .state=${this.mappedBaseState}
          ?interactive=${this.interactive}
        >
          <slot></slot>
        </obc-poi-object>
      </div>
    `;
  }

  static override styles = [
    css`
      :host {
        display: contents;
      }
    `,
    unsafeCSS(componentStyle),
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-object-aton': ObcPoiObjectAton;
  }
}
