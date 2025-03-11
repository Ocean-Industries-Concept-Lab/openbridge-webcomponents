import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartSymbolizedBoundariesIec as ObiChartSymbolizedBoundariesIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-symbolized-boundaries-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-symbolized-boundaries-iec.js';

@Component({
  selector: 'obi-chart-symbolized-boundaries-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartSymbolizedBoundariesIec {
  private _el: ObiChartSymbolizedBoundariesIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartSymbolizedBoundariesIecElement>,
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

