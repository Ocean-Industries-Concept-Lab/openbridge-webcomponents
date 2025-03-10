import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiElectricalClock as ObiElectricalClockElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-electrical-clock.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-electrical-clock.js';

@Component({
  selector: 'obi-electrical-clock',
  template: '<ng-content></ng-content>',
})
export class ObiElectricalClock {
  private _el: ObiElectricalClockElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiElectricalClockElement>,
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

