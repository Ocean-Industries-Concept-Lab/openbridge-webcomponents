import {LitElement, html} from 'lit';
import {customElement} from '../../decorator.js';
import {property} from 'lit/decorators.js';
import {AdviceType} from '../watch/advice.js';
import {SetpointMixin} from '../../svghelpers/setpoint-mixin.js';
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

@customElement('obc-rot-sector')
export class ObcRotSector extends SetpointMixin(LitElement) {
  @property({type: Number}) value = 0;
  @property({type: Number}) maxValue = 100;
  @property({type: Boolean}) labels: boolean = false;
  @property({type: Number}) primaryTickmarkInterval = 50;
  @property({type: Number}) secondaryTickmarkInterval = 10;
  @property({type: Boolean}) enhanced: boolean = false;
  @property({type: Boolean}) portStarboard: boolean = false;
  @property({type: Array, attribute: false}) advices: GaugeRadialAdvice[] = [];

  getAngle(v: number): number {
    return (v / this.maxValue) * 60;
  }

  get _type(): ObcGaugeRadialType {
    return ObcGaugeRadialType.bar;
  }

  private get _barColor(): string {
    if (!this.enhanced) {
      return 'var(--instrument-regular-tertiary-color)';
    }

    if (this.portStarboard) {
      if (this.value > 0) {
        return 'var(--instrument-starboard-secondary-color)';
      }
      return 'var(--instrument-port-secondary-color)';
    }

    return 'var(--instrument-enhanced-tertiary-color)';
  }

  override render() {
    const barColor = this._barColor;

    return html`
      <obc-instrument-radial
        .value=${this.value}
        .setpoint=${this.setpoint}
        .newSetpoint=${this.newSetpoint}
        .setpointAtZeroDeadband=${this.setpointAtZeroDeadband}
        .setpointColorMode=${this.setpointColorMode}
        .touching=${this.touching}
        .disableAutoAtSetpoint=${this.disableAutoAtSetpoint}
        .autoAtSetpointDeadband=${this.autoAtSetpointDeadband}
        .maxValue=${this.maxValue}
        .minValue=${-this.maxValue}
        .getAngle=${this.getAngle}
        .needleColor=${this._needleColor}
        .barColor=${barColor}
        .labels=${this.labels}
        .primaryTickmarkInterval=${this.primaryTickmarkInterval}
        .secondaryTickmarkInterval=${this.secondaryTickmarkInterval}
        .type=${this._type}
        .needleType=${this._type}
        .advices=${this.advices}
        .clipBottom=${50}
      >
      </obc-instrument-radial>
    `;
  }

  private get _needleColor(): string {
    if (!this.enhanced) {
      return 'var(--instrument-regular-secondary-color)';
    }

    if (this.portStarboard) {
      if (this.value > 0) {
        return 'var(--instrument-starboard-primary-color)';
      }
      if (this.value < 0) {
        return 'var(--instrument-port-primary-color)';
      }
      return 'var(--instrument-regular-secondary-color)';
    }

    return 'var(--instrument-enhanced-secondary-color)';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-rot-sector': ObcRotSector;
  }
}
