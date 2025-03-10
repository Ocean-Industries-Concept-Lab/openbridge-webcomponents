import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTwowayAcuatorPistonClosedLeft as ObiTwowayAcuatorPistonClosedLeftElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-acuator-piston-closed-left.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-acuator-piston-closed-left.js';

@Component({
  selector: 'obi-twoway-acuator-piston-closed-left',
  template: '<ng-content></ng-content>',
})
export class ObiTwowayAcuatorPistonClosedLeft {
  private _el: ObiTwowayAcuatorPistonClosedLeftElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTwowayAcuatorPistonClosedLeftElement>,
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

