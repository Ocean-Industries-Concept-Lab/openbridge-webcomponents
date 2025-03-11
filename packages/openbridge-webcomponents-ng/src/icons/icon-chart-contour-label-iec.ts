import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartContourLabelIec as ObiChartContourLabelIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-contour-label-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-contour-label-iec.js';

@Component({
  selector: 'obi-chart-contour-label-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartContourLabelIec {
  private _el: ObiChartContourLabelIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartContourLabelIecElement>,
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

