import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiNotificationFilled as ObiNotificationFilledElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-notification-filled.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-notification-filled.js';

@Component({
  selector: 'obi-notification-filled',
  template: '<ng-content></ng-content>',
})
export class ObiNotificationFilled {
  private _el: ObiNotificationFilledElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiNotificationFilledElement>,
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

