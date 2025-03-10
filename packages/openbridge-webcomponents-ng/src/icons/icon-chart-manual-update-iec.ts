import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartManualUpdateIec as ObiChartManualUpdateIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-manual-update-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-manual-update-iec.js';

@Component({
  selector: 'obi-chart-manual-update-iec',
  template: '<ng-content></ng-content>',
})
export class ObiChartManualUpdateIec {
  private _el: ObiChartManualUpdateIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartManualUpdateIecElement>,
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

