import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTwowayAcuatorGeneral75 as ObiTwowayAcuatorGeneral75Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-acuator-general-75.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-acuator-general-75.js';

@Component({
  selector: 'obi-twoway-acuator-general-75',
  template: '<ng-content></ng-content>',
})
export class ObiTwowayAcuatorGeneral75 {
  private _el: ObiTwowayAcuatorGeneral75Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTwowayAcuatorGeneral75Element>,
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

