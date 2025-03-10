import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayAcuatorGenericInleftLeft0 as ObiThreewayAcuatorGenericInleftLeft0Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-generic-inleft-left-0.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-generic-inleft-left-0.js';

@Component({
  selector: 'obi-threeway-acuator-generic-inleft-left-0',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayAcuatorGenericInleftLeft0 {
  private _el: ObiThreewayAcuatorGenericInleftLeft0Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayAcuatorGenericInleftLeft0Element>,
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

