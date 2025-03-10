import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTwowayAcuatorPistonOpen as ObiTwowayAcuatorPistonOpenElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-acuator-piston-open.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-acuator-piston-open.js';

@Component({
  selector: 'obi-twoway-acuator-piston-open',
  template: '<ng-content></ng-content>',
})
export class ObiTwowayAcuatorPistonOpen {
  private _el: ObiTwowayAcuatorPistonOpenElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTwowayAcuatorPistonOpenElement>,
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

