import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiShipHighspeed as ObiShipHighspeedElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship-highspeed.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship-highspeed.js';

@Component({
  selector: 'obi-ship-highspeed',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiShipHighspeed {
  private _el: ObiShipHighspeedElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiShipHighspeedElement>,
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

