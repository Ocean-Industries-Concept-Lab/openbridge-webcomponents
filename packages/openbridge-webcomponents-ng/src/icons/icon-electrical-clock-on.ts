import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiElectricalClockOn as ObiElectricalClockOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-electrical-clock-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-electrical-clock-on.js';

@Component({
  selector: 'obi-electrical-clock-on',
  template: '<ng-content></ng-content>',
})
export class ObiElectricalClockOn {
  private _el: ObiElectricalClockOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiElectricalClockOnElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set useCssColor(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.useCssColor = v));
  }

  get useCssColor() {
    return this._el.useCssColor;
  }
  

  
}

