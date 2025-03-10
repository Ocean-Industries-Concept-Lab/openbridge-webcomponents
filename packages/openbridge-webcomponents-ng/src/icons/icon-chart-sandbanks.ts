import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartSandbanks as ObiChartSandbanksElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-sandbanks.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-sandbanks.js';

@Component({
  selector: 'obi-chart-sandbanks',
  template: '<ng-content></ng-content>',
})
export class ObiChartSandbanks {
  private _el: ObiChartSandbanksElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartSandbanksElement>,
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

