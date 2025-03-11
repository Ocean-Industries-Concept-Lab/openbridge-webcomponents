import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObcValveAnalogThreeWayIcon as ObcValveAnalogThreeWayIconElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/valve-analog-three-way-icon/valve-analog-three-way-icon.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/valve-analog-three-way-icon/valve-analog-three-way-icon.js';

@Component({
  selector: 'obc-valve-analog-three-way-icon',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcValveAnalogThreeWayIcon {
  private _el: ObcValveAnalogThreeWayIconElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcValveAnalogThreeWayIconElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set value(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.value = v));
  }

  get value() {
    return this._el.value;
  }
  
  @Input()
  set value2(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.value2 = v));
  }

  get value2() {
    return this._el.value2;
  }
  
  @Input()
  set closed(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.closed = v));
  }

  get closed() {
    return this._el.closed;
  }
  
  @Input()
  set horisontal(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.horisontal = v));
  }

  get horisontal() {
    return this._el.horisontal;
  }
  

  
}

