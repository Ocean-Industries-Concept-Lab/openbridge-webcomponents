import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTwowayAcuatorPiston25 as ObiTwowayAcuatorPiston25Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-acuator-piston-25.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-acuator-piston-25.js';

@Component({
  selector: 'obi-twoway-acuator-piston-25',
  template: '<ng-content></ng-content>',
})
export class ObiTwowayAcuatorPiston25 {
  private _el: ObiTwowayAcuatorPiston25Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTwowayAcuatorPiston25Element>,
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

