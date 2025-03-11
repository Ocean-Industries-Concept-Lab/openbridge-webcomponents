import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayAcuatorGenericClosedLeft as ObiThreewayAcuatorGenericClosedLeftElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-generic-closed-left.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-generic-closed-left.js';

@Component({
  selector: 'obi-threeway-acuator-generic-closed-left',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiThreewayAcuatorGenericClosedLeft {
  private _el: ObiThreewayAcuatorGenericClosedLeftElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayAcuatorGenericClosedLeftElement>,
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

