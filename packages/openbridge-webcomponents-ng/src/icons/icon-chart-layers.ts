import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartLayers as ObiChartLayersElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-layers.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-layers.js';

@Component({
  selector: 'obi-chart-layers',
  template: '<ng-content></ng-content>',
})
export class ObiChartLayers {
  private _el: ObiChartLayersElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartLayersElement>,
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

