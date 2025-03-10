import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayAcuatorGenericClosedBottom as ObiThreewayAcuatorGenericClosedBottomElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-generic-closed-bottom.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-generic-closed-bottom.js';

@Component({
  selector: 'obi-threeway-acuator-generic-closed-bottom',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayAcuatorGenericClosedBottom {
  private _el: ObiThreewayAcuatorGenericClosedBottomElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayAcuatorGenericClosedBottomElement>,
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

