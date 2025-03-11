import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTwowayAcuatorPiston75 as ObiTwowayAcuatorPiston75Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-acuator-piston-75.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-acuator-piston-75.js';

@Component({
  selector: 'obi-twoway-acuator-piston-75',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTwowayAcuatorPiston75 {
  private _el: ObiTwowayAcuatorPiston75Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTwowayAcuatorPiston75Element>,
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

