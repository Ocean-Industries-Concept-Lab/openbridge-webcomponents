import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartIsolatedDangersFilled as ObiChartIsolatedDangersFilledElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-isolated-dangers-filled.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-isolated-dangers-filled.js';

@Component({
  selector: 'obi-chart-isolated-dangers-filled',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartIsolatedDangersFilled {
  private _el: ObiChartIsolatedDangersFilledElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartIsolatedDangersFilledElement>,
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

