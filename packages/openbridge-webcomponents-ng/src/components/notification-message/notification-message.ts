import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObcNotificationMessage as ObcNotificationMessageElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/notification-message/notification-message.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/notification-message/notification-message.js';

@Component({
  selector: 'obc-notification-message',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcNotificationMessage {
  private _el: ObcNotificationMessageElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcNotificationMessageElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set large(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.large = v));
  }

  get large() {
    return this._el.large;
  }
  
  @Input()
  set empty(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.empty = v));
  }

  get empty() {
    return this._el.empty;
  }
  

  
}

