import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayAcuatorPistonInleftBottom0 as ObiThreewayAcuatorPistonInleftBottom0Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-piston-inleft-bottom-0.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-piston-inleft-bottom-0.js';

@Component({
  selector: 'obi-threeway-acuator-piston-inleft-bottom-0',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayAcuatorPistonInleftBottom0 {
  private _el: ObiThreewayAcuatorPistonInleftBottom0Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayAcuatorPistonInleftBottom0Element>,
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

