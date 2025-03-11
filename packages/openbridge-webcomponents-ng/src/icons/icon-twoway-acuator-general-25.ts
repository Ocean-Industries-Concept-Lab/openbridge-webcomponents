import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTwowayAcuatorGeneral25 as ObiTwowayAcuatorGeneral25Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-acuator-general-25.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-acuator-general-25.js';

@Component({
  selector: 'obi-twoway-acuator-general-25',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTwowayAcuatorGeneral25 {
  private _el: ObiTwowayAcuatorGeneral25Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTwowayAcuatorGeneral25Element>,
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

