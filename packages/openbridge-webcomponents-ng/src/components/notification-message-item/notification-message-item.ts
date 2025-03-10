import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObcNotificationMessageItem as ObcNotificationMessageItemElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/notification-message-item/notification-message-item.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/notification-message-item/notification-message-item.js';

@Component({
  selector: 'obc-notification-message-item',
  template: '<ng-content></ng-content>',
})
export class ObcNotificationMessageItem {
  private _el: ObcNotificationMessageItemElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcNotificationMessageItemElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set time(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.time = v));
  }

  get time() {
    return this._el.time;
  }
  

  
}

