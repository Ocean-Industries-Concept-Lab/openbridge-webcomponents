import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayAcuatorPistonInleftRight100 as ObiThreewayAcuatorPistonInleftRight100Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-piston-inleft-right-100.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-piston-inleft-right-100.js';

@Component({
  selector: 'obi-threeway-acuator-piston-inleft-right-100',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayAcuatorPistonInleftRight100 {
  private _el: ObiThreewayAcuatorPistonInleftRight100Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayAcuatorPistonInleftRight100Element>,
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

