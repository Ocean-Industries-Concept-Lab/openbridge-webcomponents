import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAisAtonMobileVirtualIec as ObiAisAtonMobileVirtualIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-aton-mobile-virtual-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-aton-mobile-virtual-iec.js';

@Component({
  selector: 'obi-ais-aton-mobile-virtual-iec',
  template: '<ng-content></ng-content>',
})
export class ObiAisAtonMobileVirtualIec {
  private _el: ObiAisAtonMobileVirtualIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAisAtonMobileVirtualIecElement>,
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

