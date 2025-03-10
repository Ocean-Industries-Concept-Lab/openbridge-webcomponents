import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiJoystick as ObiJoystickElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-joystick.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-joystick.js';

@Component({
  selector: 'obi-joystick',
  template: '<ng-content></ng-content>',
})
export class ObiJoystick {
  private _el: ObiJoystickElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiJoystickElement>,
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

