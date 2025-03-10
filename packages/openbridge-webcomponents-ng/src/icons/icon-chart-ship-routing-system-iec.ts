import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartShipRoutingSystemIec as ObiChartShipRoutingSystemIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-ship-routing-system-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-ship-routing-system-iec.js';

@Component({
  selector: 'obi-chart-ship-routing-system-iec',
  template: '<ng-content></ng-content>',
})
export class ObiChartShipRoutingSystemIec {
  private _el: ObiChartShipRoutingSystemIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartShipRoutingSystemIecElement>,
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

