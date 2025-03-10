import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartPaperSymbolIec as ObiChartPaperSymbolIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-paper-symbol-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-paper-symbol-iec.js';

@Component({
  selector: 'obi-chart-paper-symbol-iec',
  template: '<ng-content></ng-content>',
})
export class ObiChartPaperSymbolIec {
  private _el: ObiChartPaperSymbolIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartPaperSymbolIecElement>,
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

