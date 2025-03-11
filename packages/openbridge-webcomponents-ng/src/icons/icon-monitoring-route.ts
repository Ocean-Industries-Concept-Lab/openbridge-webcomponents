import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMonitoringRoute as ObiMonitoringRouteElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-monitoring-route.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-monitoring-route.js';

@Component({
  selector: 'obi-monitoring-route',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMonitoringRoute {
  private _el: ObiMonitoringRouteElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMonitoringRouteElement>,
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

