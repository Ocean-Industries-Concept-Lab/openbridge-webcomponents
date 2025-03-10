import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCursorSetpoint as ObiCursorSetpointElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-setpoint.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-setpoint.js';

@Component({
  selector: 'obi-cursor-setpoint',
  template: '<ng-content></ng-content>',
})
export class ObiCursorSetpoint {
  private _el: ObiCursorSetpointElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCursorSetpointElement>,
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

