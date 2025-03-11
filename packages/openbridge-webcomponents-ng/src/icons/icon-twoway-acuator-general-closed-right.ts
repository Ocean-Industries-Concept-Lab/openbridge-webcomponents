import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTwowayAcuatorGeneralClosedRight as ObiTwowayAcuatorGeneralClosedRightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-acuator-general-closed-right.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-acuator-general-closed-right.js';

@Component({
  selector: 'obi-twoway-acuator-general-closed-right',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTwowayAcuatorGeneralClosedRight {
  private _el: ObiTwowayAcuatorGeneralClosedRightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTwowayAcuatorGeneralClosedRightElement>,
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

