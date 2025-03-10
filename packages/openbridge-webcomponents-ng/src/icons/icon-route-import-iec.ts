import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRouteImportIec as ObiRouteImportIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-route-import-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-route-import-iec.js';

@Component({
  selector: 'obi-route-import-iec',
  template: '<ng-content></ng-content>',
})
export class ObiRouteImportIec {
  private _el: ObiRouteImportIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRouteImportIecElement>,
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

