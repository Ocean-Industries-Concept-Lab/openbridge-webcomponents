import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartUnknown as ObiChartUnknownElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-unknown.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-unknown.js';

@Component({
  selector: 'obi-chart-unknown',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartUnknown {
  private _el: ObiChartUnknownElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartUnknownElement>,
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

