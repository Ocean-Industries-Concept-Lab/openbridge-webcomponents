import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartSimplifiedSymbolsIec as ObiChartSimplifiedSymbolsIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-simplified-symbols-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-simplified-symbols-iec.js';

@Component({
  selector: 'obi-chart-simplified-symbols-iec',
  template: '<ng-content></ng-content>',
})
export class ObiChartSimplifiedSymbolsIec {
  private _el: ObiChartSimplifiedSymbolsIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartSimplifiedSymbolsIecElement>,
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

