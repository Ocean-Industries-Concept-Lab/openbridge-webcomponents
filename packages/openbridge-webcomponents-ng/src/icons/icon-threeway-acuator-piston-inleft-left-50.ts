import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayAcuatorPistonInleftLeft50 as ObiThreewayAcuatorPistonInleftLeft50Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-piston-inleft-left-50.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-piston-inleft-left-50.js';

@Component({
  selector: 'obi-threeway-acuator-piston-inleft-left-50',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayAcuatorPistonInleftLeft50 {
  private _el: ObiThreewayAcuatorPistonInleftLeft50Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayAcuatorPistonInleftLeft50Element>,
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

