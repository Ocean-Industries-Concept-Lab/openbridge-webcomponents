import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChart as ObiChartElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart.js';

@Component({
  selector: 'obi-chart',
  template: '<ng-content></ng-content>',
})
export class ObiChart {
  private _el: ObiChartElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartElement>,
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

