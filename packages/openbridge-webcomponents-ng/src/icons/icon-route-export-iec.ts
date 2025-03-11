import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRouteExportIec as ObiRouteExportIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-route-export-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-route-export-iec.js';

@Component({
  selector: 'obi-route-export-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRouteExportIec {
  private _el: ObiRouteExportIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRouteExportIecElement>,
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

