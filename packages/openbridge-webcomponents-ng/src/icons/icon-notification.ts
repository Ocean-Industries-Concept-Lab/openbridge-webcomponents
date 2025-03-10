import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiNotification as ObiNotificationElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-notification.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-notification.js';

@Component({
  selector: 'obi-notification',
  template: '<ng-content></ng-content>',
})
export class ObiNotification {
  private _el: ObiNotificationElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiNotificationElement>,
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

