import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartFullLightLines as ObiChartFullLightLinesElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-full-light-lines.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-full-light-lines.js';

@Component({
  selector: 'obi-chart-full-light-lines',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartFullLightLines {
  private _el: ObiChartFullLightLinesElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartFullLightLinesElement>,
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

