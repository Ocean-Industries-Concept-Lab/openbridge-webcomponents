import {html, unsafeCSS, TemplateResult, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap, StyleInfo} from 'lit/directives/style-map.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractPoiObject} from '../building-blocks/poi-object/abstract-poi-object.js';
import {
  ObcPoiObjectType,
  ObcPoiObjectStyle,
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

type AtonColorTokens = {
  primary: string;
  secondary: string;
  onPrimary: string;
};

const ATON_COLORS: Record<string, AtonColorTokens> = {
  green: {
    primary: 'var(--overlay-navigation-green-primary-color)',
    secondary: 'var(--overlay-navigation-green-secondary-color)',
    onPrimary: 'var(--overlay-navigation-green-on-primary-color, #005f43)',
  },
  red: {
    primary: 'var(--overlay-navigation-red-primary-color)',
    secondary: 'var(--overlay-navigation-red-secondary-color)',
    onPrimary: 'var(--overlay-navigation-red-on-primary-color, #863d3c)',
  },
  yellow: {
    primary: 'var(--overlay-navigation-yellow-primary-color)',
    secondary: 'var(--overlay-navigation-yellow-secondary-color)',
    onPrimary: 'var(--overlay-navigation-yellow-on-primary-color, #635200)',
  },
};

@customElement('obc-poi-object-aton')
export class ObcPoiObjectAton extends ObcAbstractPoiObject {
  @property({type: String}) type: ObcPoiObjectAtonType =
    ObcPoiObjectAtonType.Regular;

  @property({type: String})
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

  private get isIndicator(): boolean {
    return this.type === ObcPoiObjectAtonType.Indicator;
  }

  private get isStatic(): boolean {
    return (
      this.state === ObcPoiObjectState.StaticUnchecked ||
      this.state === ObcPoiObjectState.StaticChecked
    );
  }

  private get isAlert(): boolean {
    return (
      this.state === ObcPoiObjectState.Caution ||
      this.state === ObcPoiObjectState.Warning ||
      this.state === ObcPoiObjectState.Alarm
    );
  }

  private get usesAlarmCircle(): boolean {
    return this.isAtonType && this.state === ObcPoiObjectState.Alarm;
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (!this.isInteractive) return;
    if (e.target !== e.currentTarget) return;
    if (e.key === ' ') {
      e.preventDefault();
    } else if (e.key === 'Enter' && !e.repeat) {
      e.preventDefault();
      this.click();
    }
  }

  private handleKeyUp(e: KeyboardEvent) {
    if (!this.isInteractive) return;
    if (e.target !== e.currentTarget) return;
    if (e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  }

  private get innerState(): ObcPoiObjectState {
    if (this.isIndicator && this.isAlert) {
      return ObcPoiObjectState.Activated;
    }
    return this.state;
  }

  override get colorStyleVars(): StyleInfo {
    const tokens = ATON_COLORS[this.objectStyle];
    if (!tokens) return {};

    const isIndicatorNonStatic = this.isIndicator && !this.isStatic;

    return {
      '--overlay-container-background-color': tokens.primary,
      '--overlay-border-outline-color': tokens.secondary,
      '--normal-enabled-background-color': tokens.primary,
      '--normal-enabled-border-color': tokens.secondary,
      '--flat-enabled-background-color': tokens.primary,
      '--flat-enabled-border-color': tokens.secondary,
      '--flat-hover-background-color': `color-mix(in srgb, ${tokens.primary} 85%, white)`,
      '--flat-pressed-background-color': `color-mix(in srgb, ${tokens.primary} 75%, white)`,
      '--element-neutral-color': isIndicatorNonStatic
        ? tokens.primary
        : tokens.onPrimary,
      '--element-active-color': isIndicatorNonStatic
        ? tokens.primary
        : tokens.onPrimary,
      '--indicator-stroke-color': isIndicatorNonStatic
        ? tokens.onPrimary
        : tokens.primary,
    };
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

  private renderAtonDiamond(): TemplateResult {
    return html`
      <div class="aton-diamond-frame">
        <div class="aton-diamond-background" part="background-frame"></div>
        <div class="aton-icon-container">
          <slot></slot>
        </div>
      </div>
    `;
  }

  private renderBasePoiObject(styleVars: StyleInfo = this.colorStyleVars) {
    return html`
      <obc-poi-object
        exportparts="background-frame"
        style=${styleMap(styleVars)}
        .type=${this.baseType}
        .objectStyle=${ObcPoiObjectStyle.Regular}
        .state=${this.innerState}
        ?interactive=${this.interactive}
      >
        <slot></slot>
      </obc-poi-object>
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

    if (this.isAtonType && !this.usesAlarmCircle) {
      return html`
        <div
          class=${classMap(wrapperClasses)}
          role=${this.isInteractive ? 'button' : nothing}
          tabindex=${this.isInteractive ? '0' : nothing}
          @keydown=${this.handleKeyDown}
          @keyup=${this.handleKeyUp}
        >
          ${this.renderAtonDiamond()}
        </div>
      `;
    }

    return html`
      <div class=${classMap(wrapperClasses)}>
        ${this.renderBasePoiObject(
          this.usesAlarmCircle ? {} : this.colorStyleVars
        )}
      </div>
    `;
  }

  static override styles = [
    ...ObcAbstractPoiObject.styles,
    unsafeCSS(componentStyle),
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-object-aton': ObcPoiObjectAton;
  }
}
