import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {ObcElevatedCardPosition, ObcElevatedCardSize} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/elevated-card/elevated-card';
export type {ObcElevatedCardPosition, ObcElevatedCardSize} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/elevated-card/elevated-card';
import type {ObcElevatedCardRadio as ObcElevatedCardRadioElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/elevated-card-radio/elevated-card-radio.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/elevated-card-radio/elevated-card-radio.js';

@Component({
  selector: 'obc-elevated-card-radio',
  template: '<ng-content></ng-content>',
})
export class ObcElevatedCardRadio {
  private _el: ObcElevatedCardRadioElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcElevatedCardRadioElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set position(v: ObcElevatedCardPosition) {
    this._ngZone.runOutsideAngular(() => (this._el.position = v));
  }

  get position() {
    return this._el.position;
  }
  
  @Input()
  set size(v: ObcElevatedCardSize) {
    this._ngZone.runOutsideAngular(() => (this._el.size = v));
  }

  get size() {
    return this._el.size;
  }
  
  @Input()
  set graphicBorder(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.graphicBorder = v));
  }

  get graphicBorder() {
    return this._el.graphicBorder;
  }
  
  @Input()
  set border(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.border = v));
  }

  get border() {
    return this._el.border;
  }
  
  @Input()
  set name(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.name = v));
  }

  get name() {
    return this._el.name;
  }
  
  @Input()
  set value(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.value = v));
  }

  get value() {
    return this._el.value;
  }
  
  @Input()
  set label(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.label = v));
  }

  get label() {
    return this._el.label;
  }
  
  @Input()
  set checked(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.checked = v));
  }

  get checked() {
    return this._el.checked;
  }
  
  @Input()
  set disabled(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.disabled = v));
  }

  get disabled() {
    return this._el.disabled;
  }
  
  @Input()
  set required(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.required = v));
  }

  get required() {
    return this._el.required;
  }
  

  
}

