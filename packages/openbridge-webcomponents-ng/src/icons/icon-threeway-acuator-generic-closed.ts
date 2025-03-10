import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayAcuatorGenericClosed as ObiThreewayAcuatorGenericClosedElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-generic-closed.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-generic-closed.js';

@Component({
  selector: 'obi-threeway-acuator-generic-closed',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayAcuatorGenericClosed {
  private _el: ObiThreewayAcuatorGenericClosedElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayAcuatorGenericClosedElement>,
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

