import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAisAtonMobilePhysicalIec as ObiAisAtonMobilePhysicalIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-aton-mobile-physical-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-aton-mobile-physical-iec.js';

@Component({
  selector: 'obi-ais-aton-mobile-physical-iec',
  template: '<ng-content></ng-content>',
})
export class ObiAisAtonMobilePhysicalIec {
  private _el: ObiAisAtonMobilePhysicalIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAisAtonMobilePhysicalIecElement>,
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

