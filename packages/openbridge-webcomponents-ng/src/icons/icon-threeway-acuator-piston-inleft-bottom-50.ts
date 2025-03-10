import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayAcuatorPistonInleftBottom50 as ObiThreewayAcuatorPistonInleftBottom50Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-piston-inleft-bottom-50.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-piston-inleft-bottom-50.js';

@Component({
  selector: 'obi-threeway-acuator-piston-inleft-bottom-50',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayAcuatorPistonInleftBottom50 {
  private _el: ObiThreewayAcuatorPistonInleftBottom50Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayAcuatorPistonInleftBottom50Element>,
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

