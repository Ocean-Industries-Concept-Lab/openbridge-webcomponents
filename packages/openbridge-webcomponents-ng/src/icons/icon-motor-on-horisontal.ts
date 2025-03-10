import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMotorOnHorisontal as ObiMotorOnHorisontalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-motor-on-horisontal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-motor-on-horisontal.js';

@Component({
  selector: 'obi-motor-on-horisontal',
  template: '<ng-content></ng-content>',
})
export class ObiMotorOnHorisontal {
  private _el: ObiMotorOnHorisontalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMotorOnHorisontalElement>,
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

