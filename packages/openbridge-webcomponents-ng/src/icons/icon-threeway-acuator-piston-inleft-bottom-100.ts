import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayAcuatorPistonInleftBottom100 as ObiThreewayAcuatorPistonInleftBottom100Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-piston-inleft-bottom-100.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-piston-inleft-bottom-100.js';

@Component({
  selector: 'obi-threeway-acuator-piston-inleft-bottom-100',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiThreewayAcuatorPistonInleftBottom100 {
  private _el: ObiThreewayAcuatorPistonInleftBottom100Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayAcuatorPistonInleftBottom100Element>,
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

