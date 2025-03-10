import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAisSarAircraftHelicopterIec as ObiAisSarAircraftHelicopterIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-sar-aircraft-helicopter-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-sar-aircraft-helicopter-iec.js';

@Component({
  selector: 'obi-ais-sar-aircraft-helicopter-iec',
  template: '<ng-content></ng-content>',
})
export class ObiAisSarAircraftHelicopterIec {
  private _el: ObiAisSarAircraftHelicopterIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAisSarAircraftHelicopterIecElement>,
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

