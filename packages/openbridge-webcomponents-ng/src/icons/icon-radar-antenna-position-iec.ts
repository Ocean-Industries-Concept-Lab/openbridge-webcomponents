import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRadarAntennaPositionIec as ObiRadarAntennaPositionIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-antenna-position-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-antenna-position-iec.js';

@Component({
  selector: 'obi-radar-antenna-position-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRadarAntennaPositionIec {
  private _el: ObiRadarAntennaPositionIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRadarAntennaPositionIecElement>,
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

