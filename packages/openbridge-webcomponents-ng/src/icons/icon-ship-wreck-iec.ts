import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiShipWreckIec as ObiShipWreckIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship-wreck-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship-wreck-iec.js';

@Component({
  selector: 'obi-ship-wreck-iec',
  template: '<ng-content></ng-content>',
})
export class ObiShipWreckIec {
  private _el: ObiShipWreckIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiShipWreckIecElement>,
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

