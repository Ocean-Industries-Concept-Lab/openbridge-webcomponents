import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayAcuatorPistonInleftLeft25 as ObiThreewayAcuatorPistonInleftLeft25Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-piston-inleft-left-25.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-acuator-piston-inleft-left-25.js';

@Component({
  selector: 'obi-threeway-acuator-piston-inleft-left-25',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiThreewayAcuatorPistonInleftLeft25 {
  private _el: ObiThreewayAcuatorPistonInleftLeft25Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayAcuatorPistonInleftLeft25Element>,
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

