import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiShipYacht as ObiShipYachtElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship-yacht.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship-yacht.js';

@Component({
  selector: 'obi-ship-yacht',
  template: '<ng-content></ng-content>',
})
export class ObiShipYacht {
  private _el: ObiShipYachtElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiShipYachtElement>,
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

