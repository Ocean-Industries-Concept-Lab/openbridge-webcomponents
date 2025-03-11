import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObcRadio as ObcRadioElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/radio/radio.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/radio/radio.js';

@Component({
  selector: 'obc-radio',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcRadio {
  private _el: ObcRadioElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcRadioElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set label(v: string | undefined) {
    this._ngZone.runOutsideAngular(() => (this._el.label = v));
  }

  get label() {
    return this._el.label;
  }
  
  @Input()
  set name(v: string | undefined) {
    this._ngZone.runOutsideAngular(() => (this._el.name = v));
  }

  get name() {
    return this._el.name;
  }
  
  @Input()
  set value(v: string | undefined) {
    this._ngZone.runOutsideAngular(() => (this._el.value = v));
  }

  get value() {
    return this._el.value;
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
  
  @Input()
  set inputId(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.inputId = v));
  }

  get inputId() {
    return this._el.inputId;
  }
  

  
}

