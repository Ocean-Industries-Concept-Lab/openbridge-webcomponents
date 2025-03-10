import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayAcuatorPistonInleftRight25 as ObiThreewayAcuatorPistonInleftRight25Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-piston-inleft-right-25.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-piston-inleft-right-25.js';

@Component({
  selector: 'obi-threeway-acuator-piston-inleft-right-25',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayAcuatorPistonInleftRight25 {
  private _el: ObiThreewayAcuatorPistonInleftRight25Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayAcuatorPistonInleftRight25Element>,
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

