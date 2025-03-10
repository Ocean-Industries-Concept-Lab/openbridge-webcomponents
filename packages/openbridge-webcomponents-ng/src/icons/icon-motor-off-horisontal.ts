import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMotorOffHorisontal as ObiMotorOffHorisontalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-motor-off-horisontal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-motor-off-horisontal.js';

@Component({
  selector: 'obi-motor-off-horisontal',
  template: '<ng-content></ng-content>',
})
export class ObiMotorOffHorisontal {
  private _el: ObiMotorOffHorisontalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMotorOffHorisontalElement>,
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

