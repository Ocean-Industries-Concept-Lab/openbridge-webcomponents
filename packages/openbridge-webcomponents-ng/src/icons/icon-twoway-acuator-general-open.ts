import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTwowayAcuatorGeneralOpen as ObiTwowayAcuatorGeneralOpenElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-acuator-general-open.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-acuator-general-open.js';

@Component({
  selector: 'obi-twoway-acuator-general-open',
  template: '<ng-content></ng-content>',
})
export class ObiTwowayAcuatorGeneralOpen {
  private _el: ObiTwowayAcuatorGeneralOpenElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTwowayAcuatorGeneralOpenElement>,
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

