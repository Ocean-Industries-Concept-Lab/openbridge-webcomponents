import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiNotificationAdviceActive as ObiNotificationAdviceActiveElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-notification-advice-active.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-notification-advice-active.js';

@Component({
  selector: 'obi-notification-advice-active',
  template: '<ng-content></ng-content>',
})
export class ObiNotificationAdviceActive {
  private _el: ObiNotificationAdviceActiveElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiNotificationAdviceActiveElement>,
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

