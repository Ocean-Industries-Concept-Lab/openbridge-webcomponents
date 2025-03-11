import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartCatzocIec as ObiChartCatzocIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-catzoc-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-catzoc-iec.js';

@Component({
  selector: 'obi-chart-catzoc-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartCatzocIec {
  private _el: ObiChartCatzocIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartCatzocIecElement>,
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

