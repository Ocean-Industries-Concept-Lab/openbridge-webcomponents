import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiNotificationAdvice as ObiNotificationAdviceElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-notification-advice.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-notification-advice.js';

@Component({
  selector: 'obi-notification-advice',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiNotificationAdvice {
  private _el: ObiNotificationAdviceElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiNotificationAdviceElement>,
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

