import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartSubmarineCables as ObiChartSubmarineCablesElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-submarine-cables.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-submarine-cables.js';

@Component({
  selector: 'obi-chart-submarine-cables',
  template: '<ng-content></ng-content>',
})
export class ObiChartSubmarineCables {
  private _el: ObiChartSubmarineCablesElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartSubmarineCablesElement>,
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

