import {html, css, unsafeCSS, TemplateResult} from 'lit';
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

export {ObcPoiObjectState as ObcPoiObjectAtonState};

@customElement('obc-poi-object-aton')
export class ObcPoiObjectAton extends ObcAbstractPoiObject {
  @property({type: String}) type: ObcPoiObjectAtonType =
    ObcPoiObjectAtonType.Regular;

  @property({type: String})
  // @ts-expect-error — widening type to include AtoN-specific styles
  override objectStyle: ObcPoiObjectAtonStyle = ObcPoiObjectAtonStyle.Regular;

  private get isAtonType(): boolean {
    return this.type === ObcPoiObjectAtonType.AtoN;
  }

  private get isOverlapped(): boolean {
    return this.state === ObcPoiObjectState.Overlapped;
  }

  private get isInteractive(): boolean {
    return this.interactive && !this.isOverlapped;
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

  override get icon(): TemplateResult {
    return html`<slot></slot>`;
  }

  private renderAtonDiamond(): TemplateResult {
    return html`
      <div class="aton-diamond-frame">
        <div class="aton-diamond-background"></div>
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
      interactive: this.isInteractive,
    };

    if (this.isAtonType) {
      return html`
        <div class=${classMap(wrapperClasses)}>${this.renderAtonDiamond()}</div>
      `;
    }

    return html`
      <div class=${classMap(wrapperClasses)}>
        <obc-poi-object
          exportparts="background-frame"
          .type=${this.baseType}
          .objectStyle=${'regular'}
          .state=${this.state}
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
