import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {InstrumentFieldSize} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/instrument-field/instrument-field.js';
export type {InstrumentFieldSize} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/instrument-field/instrument-field.js';
import type {ObcInstrumentField as ObcInstrumentFieldElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/instrument-field/instrument-field.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/instrument-field/instrument-field.js';

@Component({
  selector: 'obc-instrument-field',
  template: '<ng-content></ng-content>',
})
export class ObcInstrumentField {
  private _el: ObcInstrumentFieldElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcInstrumentFieldElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set size(v: InstrumentFieldSize) {
    this._ngZone.runOutsideAngular(() => (this._el.size = v));
  }

  get size() {
    return this._el.size;
  }
  
  @Input()
  set setpoint(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.setpoint = v));
  }

  get setpoint() {
    return this._el.setpoint;
  }
  
  @Input()
  set hasSetpoint(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.hasSetpoint = v));
  }

  get hasSetpoint() {
    return this._el.hasSetpoint;
  }
  
  @Input()
  set value(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.value = v));
  }

  get value() {
    return this._el.value;
  }
  
  @Input()
  set degree(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.degree = v));
  }

  get degree() {
    return this._el.degree;
  }
  
  @Input()
  set maxDigits(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.maxDigits = v));
  }

  get maxDigits() {
    return this._el.maxDigits;
  }
  
  @Input()
  set fractionDigits(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.fractionDigits = v));
  }

  get fractionDigits() {
    return this._el.fractionDigits;
  }
  
  @Input()
  set tag(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.tag = v));
  }

  get tag() {
    return this._el.tag;
  }
  
  @Input()
  set unit(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.unit = v));
  }

  get unit() {
    return this._el.unit;
  }
  
  @Input()
  set source(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.source = v));
  }

  get source() {
    return this._el.source;
  }
  
  @Input()
  set hasSource(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.hasSource = v));
  }

  get hasSource() {
    return this._el.hasSource;
  }
  

  
}

