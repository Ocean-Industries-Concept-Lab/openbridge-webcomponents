import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiOwnShipIec as ObiOwnShipIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-own-ship-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-own-ship-iec.js';

@Component({
  selector: 'obi-own-ship-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiOwnShipIec {
  private _el: ObiOwnShipIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiOwnShipIecElement>,
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

