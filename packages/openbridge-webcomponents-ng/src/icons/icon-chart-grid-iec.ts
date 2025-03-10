import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartGridIec as ObiChartGridIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-grid-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-grid-iec.js';

@Component({
  selector: 'obi-chart-grid-iec',
  template: '<ng-content></ng-content>',
})
export class ObiChartGridIec {
  private _el: ObiChartGridIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartGridIecElement>,
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

