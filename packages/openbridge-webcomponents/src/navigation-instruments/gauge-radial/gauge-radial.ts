import {LitElement, html} from 'lit';
import {customElement} from '../../decorator.js';
import {property} from 'lit/decorators.js';
import {AdviceType} from '../watch/advice.js';
import {SetpointColorMode} from '../../svghelpers/setpoint.js';
import '../../building-blocks/instrument-radial/instrument-radial.js';

export enum ObcGaugeRadialType {
  filled = 'filled',
  bar = 'bar',
  needle = 'needle',
}

export interface GaugeRadialAdvice {
  minValue: number;
  maxValue: number;
  type: AdviceType;
  hinted: boolean;
}

@customElement('obc-gauge-radial')
export class ObcGaugeRadial extends LitElement {
  @property({type: Number}) value = 0;
  @property({type: Number}) setpoint: number | undefined;
  @property({type: Boolean}) atSetpoint: boolean = false;
  @property({type: Boolean}) atSetpointZero: boolean = false;
  @property({type: Boolean}) setpointFocused: boolean = false;
  @property({type: String}) setpointColorMode: SetpointColorMode | undefined;
  @property({type: Boolean}) touching: boolean = false;
  @property({type: Boolean}) disableAutoAtSetpoint: boolean = false;
  @property({type: Number}) autoAtSetpointDeadband: number = 2;
  @property({type: Number}) maxValue = 100;
  @property({type: Number}) minValue = 0;
  @property({type: Boolean}) labels: boolean = false;
  @property({type: Number}) primaryTickmarkInterval = 50;
  @property({type: Number}) secondaryTickmarkInterval = 10;
  @property({type: Boolean}) enhanced: boolean = false;
  @property({type: String}) type: ObcGaugeRadialType =
    ObcGaugeRadialType.filled;
  @property({type: Array, attribute: false}) advices: GaugeRadialAdvice[] = [];

  getAngle(v: number): number {
    const hasNegative = this.minValue < 0;
    if (hasNegative) {
      return (v / this.maxValue) * 135;
    } else {
      return (v / this.maxValue) * 270 - 135;
    }
  }

  private get _barColor(): string {
    if (this.type === ObcGaugeRadialType.filled) {
      return this._needleColor;
    }
    return this.enhanced
      ? 'var(--instrument-enhanced-tertiary-color)'
      : 'var(--instrument-regular-tertiary-color)';
  }

  override render() {
    const barColor = this._barColor;

    return html`
      <obc-instrument-radial
        .value=${this.value}
        .setpoint=${this.setpoint}
        .atSetpointZero=${this.atSetpointZero}
        .setpointFocused=${this.setpointFocused}
        .setpointColorMode=${this.setpointColorMode}
        .touching=${this.touching}
        .disableAutoAtSetpoint=${this.disableAutoAtSetpoint}
        .autoAtSetpointDeadband=${this.autoAtSetpointDeadband}
        .maxValue=${this.maxValue}
        .minValue=${this.minValue}
        .getAngle=${this.getAngle}
        .needleColor=${this._needleColor}
        .barColor=${barColor}
        .labels=${this.labels}
        .primaryTickmarkInterval=${this.primaryTickmarkInterval}
        .secondaryTickmarkInterval=${this.secondaryTickmarkInterval}
        .type=${this.type}
        .needleType=${this.type}
        .advices=${this.advices}
      >
      </obc-instrument-radial>
    `;
  }

  private get _needleColor(): string {
    return this.enhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-gauge-radial': ObcGaugeRadial;
  }
}
