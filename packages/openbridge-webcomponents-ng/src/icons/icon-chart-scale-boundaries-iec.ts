import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartScaleBoundariesIec as ObiChartScaleBoundariesIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-scale-boundaries-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-scale-boundaries-iec.js';

@Component({
  selector: 'obi-chart-scale-boundaries-iec',
  template: '<ng-content></ng-content>',
})
export class ObiChartScaleBoundariesIec {
  private _el: ObiChartScaleBoundariesIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartScaleBoundariesIecElement>,
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

