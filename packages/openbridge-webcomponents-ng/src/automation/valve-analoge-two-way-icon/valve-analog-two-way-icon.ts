import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObcValveAnalogTwoWayIcon as ObcValveAnalogTwoWayIconElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/valve-analoge-two-way-icon/valve-analog-two-way-icon.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/valve-analoge-two-way-icon/valve-analog-two-way-icon.js';

@Component({
  selector: 'obc-valve-analog-two-way-icon',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcValveAnalogTwoWayIcon {
  private _el: ObcValveAnalogTwoWayIconElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcValveAnalogTwoWayIconElement>,
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
  set closed(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.closed = v));
  }

  get closed() {
    return this._el.closed;
  }
  

  
}

