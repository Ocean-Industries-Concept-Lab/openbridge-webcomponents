import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayAcuatorGenericInleftRight0 as ObiThreewayAcuatorGenericInleftRight0Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-generic-inleft-right-0.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-generic-inleft-right-0.js';

@Component({
  selector: 'obi-threeway-acuator-generic-inleft-right-0',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayAcuatorGenericInleftRight0 {
  private _el: ObiThreewayAcuatorGenericInleftRight0Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayAcuatorGenericInleftRight0Element>,
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

