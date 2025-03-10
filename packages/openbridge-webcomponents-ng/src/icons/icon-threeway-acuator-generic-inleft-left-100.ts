import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayAcuatorGenericInleftLeft100 as ObiThreewayAcuatorGenericInleftLeft100Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-generic-inleft-left-100.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-generic-inleft-left-100.js';

@Component({
  selector: 'obi-threeway-acuator-generic-inleft-left-100',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayAcuatorGenericInleftLeft100 {
  private _el: ObiThreewayAcuatorGenericInleftLeft100Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayAcuatorGenericInleftLeft100Element>,
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

