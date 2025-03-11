import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartIsolatedDangers as ObiChartIsolatedDangersElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-isolated-dangers.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-isolated-dangers.js';

@Component({
  selector: 'obi-chart-isolated-dangers',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartIsolatedDangers {
  private _el: ObiChartIsolatedDangersElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartIsolatedDangersElement>,
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

