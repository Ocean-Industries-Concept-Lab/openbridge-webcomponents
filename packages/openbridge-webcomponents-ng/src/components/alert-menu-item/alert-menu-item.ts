import {
  Component,
  ElementRef,
  NgZone,
  Input,
  EventEmitter,
  Output

} from '@angular/core';


import type {ObcAlertMenuItem as ObcAlertMenuItemElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-menu-item/alert-menu-item.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-menu-item/alert-menu-item.js';

@Component({
  selector: 'obc-alert-menu-item',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcAlertMenuItem {
  private _el: ObcAlertMenuItemElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcAlertMenuItemElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
    this._el.addEventListener('ack-click', (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.ackClickEvent.emit(e);
    });
    
  }

  
  @Input()
  set message(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.message = v));
  }

  get message() {
    return this._el.message;
  }
  
  @Input()
  set time(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.time = v));
  }

  get time() {
    return this._el.time;
  }
  
  @Input()
  set timeSince(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.timeSince = v));
  }

  get timeSince() {
    return this._el.timeSince;
  }
  
  @Input()
  set acknowledgeble(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.acknowledgeble = v));
  }

  get acknowledgeble() {
    return this._el.acknowledgeble;
  }
  
  @Input()
  set acknowledged(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.acknowledged = v));
  }

  get acknowledged() {
    return this._el.acknowledged;
  }
  
  @Input()
  set narrowBreakpointPx(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.narrowBreakpointPx = v));
  }

  get narrowBreakpointPx() {
    return this._el.narrowBreakpointPx;
  }
  

  
  @Output()
  ackClickEvent = new EventEmitter<unknown>();
  
}

