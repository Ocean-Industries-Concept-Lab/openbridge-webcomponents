import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiElectricalClockOff as ObiElectricalClockOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-electrical-clock-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-electrical-clock-off.js';

@Component({
  selector: 'obi-electrical-clock-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiElectricalClockOff {
  private _el: ObiElectricalClockOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiElectricalClockOffElement>,
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

