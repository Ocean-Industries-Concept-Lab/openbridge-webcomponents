import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWindTurbineOcean as ObiWindTurbineOceanElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-turbine-ocean.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-turbine-ocean.js';

@Component({
  selector: 'obi-wind-turbine-ocean',
  template: '<ng-content></ng-content>',
})
export class ObiWindTurbineOcean {
  private _el: ObiWindTurbineOceanElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWindTurbineOceanElement>,
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

