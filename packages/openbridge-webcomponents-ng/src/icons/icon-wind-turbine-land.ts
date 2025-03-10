import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWindTurbineLand as ObiWindTurbineLandElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-turbine-land.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-turbine-land.js';

@Component({
  selector: 'obi-wind-turbine-land',
  template: '<ng-content></ng-content>',
})
export class ObiWindTurbineLand {
  private _el: ObiWindTurbineLandElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWindTurbineLandElement>,
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

