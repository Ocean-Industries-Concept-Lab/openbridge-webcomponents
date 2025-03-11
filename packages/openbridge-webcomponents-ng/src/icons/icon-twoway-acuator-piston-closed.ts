import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTwowayAcuatorPistonClosed as ObiTwowayAcuatorPistonClosedElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-acuator-piston-closed.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-acuator-piston-closed.js';

@Component({
  selector: 'obi-twoway-acuator-piston-closed',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTwowayAcuatorPistonClosed {
  private _el: ObiTwowayAcuatorPistonClosedElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTwowayAcuatorPistonClosedElement>,
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

