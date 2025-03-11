import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartTidalIec as ObiChartTidalIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-tidal-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-tidal-iec.js';

@Component({
  selector: 'obi-chart-tidal-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartTidalIec {
  private _el: ObiChartTidalIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartTidalIecElement>,
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

