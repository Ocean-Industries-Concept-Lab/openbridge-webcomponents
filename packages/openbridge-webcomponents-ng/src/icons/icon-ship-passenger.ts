import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiShipPassenger as ObiShipPassengerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship-passenger.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship-passenger.js';

@Component({
  selector: 'obi-ship-passenger',
  template: '<ng-content></ng-content>',
})
export class ObiShipPassenger {
  private _el: ObiShipPassengerElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiShipPassengerElement>,
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

