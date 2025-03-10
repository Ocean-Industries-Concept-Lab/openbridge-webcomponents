import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRadarRangeIec as ObiRadarRangeIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-range-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-range-iec.js';

@Component({
  selector: 'obi-radar-range-iec',
  template: '<ng-content></ng-content>',
})
export class ObiRadarRangeIec {
  private _el: ObiRadarRangeIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRadarRangeIecElement>,
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

