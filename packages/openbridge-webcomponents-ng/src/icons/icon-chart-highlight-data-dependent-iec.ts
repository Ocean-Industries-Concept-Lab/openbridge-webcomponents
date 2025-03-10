import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartHighlightDataDependentIec as ObiChartHighlightDataDependentIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-highlight-data-dependent-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-highlight-data-dependent-iec.js';

@Component({
  selector: 'obi-chart-highlight-data-dependent-iec',
  template: '<ng-content></ng-content>',
})
export class ObiChartHighlightDataDependentIec {
  private _el: ObiChartHighlightDataDependentIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartHighlightDataDependentIecElement>,
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

