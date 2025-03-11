import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartBoundaryIec as ObiChartBoundaryIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-boundary-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-boundary-iec.js';

@Component({
  selector: 'obi-chart-boundary-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartBoundaryIec {
  private _el: ObiChartBoundaryIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartBoundaryIecElement>,
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

