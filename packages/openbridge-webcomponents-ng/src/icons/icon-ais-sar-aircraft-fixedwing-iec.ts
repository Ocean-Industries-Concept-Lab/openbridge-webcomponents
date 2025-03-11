import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAisSarAircraftFixedwingIec as ObiAisSarAircraftFixedwingIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-sar-aircraft-fixedwing-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-sar-aircraft-fixedwing-iec.js';

@Component({
  selector: 'obi-ais-sar-aircraft-fixedwing-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAisSarAircraftFixedwingIec {
  private _el: ObiAisSarAircraftFixedwingIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAisSarAircraftFixedwingIecElement>,
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

