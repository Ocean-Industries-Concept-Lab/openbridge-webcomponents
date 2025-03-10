import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartPlainBoundariesIec as ObiChartPlainBoundariesIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-plain-boundaries-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-plain-boundaries-iec.js';

@Component({
  selector: 'obi-chart-plain-boundaries-iec',
  template: '<ng-content></ng-content>',
})
export class ObiChartPlainBoundariesIec {
  private _el: ObiChartPlainBoundariesIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartPlainBoundariesIecElement>,
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

