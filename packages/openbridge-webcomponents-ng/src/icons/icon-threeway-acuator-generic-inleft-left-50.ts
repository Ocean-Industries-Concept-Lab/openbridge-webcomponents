import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayAcuatorGenericInleftLeft50 as ObiThreewayAcuatorGenericInleftLeft50Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-generic-inleft-left-50.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-generic-inleft-left-50.js';

@Component({
  selector: 'obi-threeway-acuator-generic-inleft-left-50',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayAcuatorGenericInleftLeft50 {
  private _el: ObiThreewayAcuatorGenericInleftLeft50Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayAcuatorGenericInleftLeft50Element>,
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

