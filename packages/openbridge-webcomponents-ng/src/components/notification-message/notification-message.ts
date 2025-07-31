import {
  Component,
  ElementRef,
  NgZone,
  Input,
  EventEmitter,
  Output

} from '@angular/core';
import {ObcNotificationMessageAction} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/notification-message/notification-message.js';
export type {ObcNotificationMessageAction} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/notification-message/notification-message.js';
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
    
    this._el.addEventListener('message-click', (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.messageClickEvent.emit(e);
    });
    
    this._el.addEventListener('action-click', (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.actionClickEvent.emit(e);
    });
    
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
  
  @Input()
  set hasSecondaryIcon(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.hasSecondaryIcon = v));
  }

  get hasSecondaryIcon() {
    return this._el.hasSecondaryIcon;
  }
  
  @Input()
  set action(v: ObcNotificationMessageAction) {
    this._ngZone.runOutsideAngular(() => (this._el.action = v));
  }

  get action() {
    return this._el.action;
  }
  

  
  @Output()
  messageClickEvent = new EventEmitter<unknown>();
  
  @Output()
  actionClickEvent = new EventEmitter<unknown>();
  
}

