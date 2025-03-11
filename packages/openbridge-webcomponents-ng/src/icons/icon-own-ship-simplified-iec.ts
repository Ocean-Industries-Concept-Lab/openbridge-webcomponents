import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiOwnShipSimplifiedIec as ObiOwnShipSimplifiedIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-own-ship-simplified-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-own-ship-simplified-iec.js';

@Component({
  selector: 'obi-own-ship-simplified-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiOwnShipSimplifiedIec {
  private _el: ObiOwnShipSimplifiedIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiOwnShipSimplifiedIecElement>,
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

