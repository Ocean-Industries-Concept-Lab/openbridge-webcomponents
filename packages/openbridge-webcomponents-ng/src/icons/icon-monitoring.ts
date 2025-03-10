import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMonitoring as ObiMonitoringElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-monitoring.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-monitoring.js';

@Component({
  selector: 'obi-monitoring',
  template: '<ng-content></ng-content>',
})
export class ObiMonitoring {
  private _el: ObiMonitoringElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMonitoringElement>,
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

