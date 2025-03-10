import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAisSarVesselIec as ObiAisSarVesselIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-sar-vessel-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-sar-vessel-iec.js';

@Component({
  selector: 'obi-ais-sar-vessel-iec',
  template: '<ng-content></ng-content>',
})
export class ObiAisSarVesselIec {
  private _el: ObiAisSarVesselIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAisSarVesselIecElement>,
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

