import {
  Component,
  ElementRef,
  NgZone,
  Input,
  EventEmitter,
  Output

} from '@angular/core';
import {AlertType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/types';
export type {AlertType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/types';
import type {ObcAlertTopbarElement as ObcAlertTopbarElementElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-topbar-element/alert-topbar-element.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-topbar-element/alert-topbar-element.js';

@Component({
  selector: 'obc-alert-topbar-element',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcAlertTopbarElement {
  private _el: ObcAlertTopbarElementElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcAlertTopbarElementElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
    this._el.addEventListener('muteclick', (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.muteclickEvent.emit(e);
    });
    
    this._el.addEventListener('ackclick', (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.ackclickEvent.emit(e);
    });
    
    this._el.addEventListener('alertclick', (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.alertclickEvent.emit(e);
    });
    
    this._el.addEventListener('messageclick', (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.messageclickEvent.emit(e);
    });
    
  }

  
  @Input()
  set nAlerts(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.nAlerts = v));
  }

  get nAlerts() {
    return this._el.nAlerts;
  }
  
  @Input()
  set alertType(v: AlertType) {
    this._ngZone.runOutsideAngular(() => (this._el.alertType = v));
  }

  get alertType() {
    return this._el.alertType;
  }
  
  @Input()
  set showAck(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.showAck = v));
  }

  get showAck() {
    return this._el.showAck;
  }
  
  @Input()
  set alertMuted(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.alertMuted = v));
  }

  get alertMuted() {
    return this._el.alertMuted;
  }
  
  @Input()
  set minimized(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.minimized = v));
  }

  get minimized() {
    return this._el.minimized;
  }
  
  @Input()
  set maxWidth(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.maxWidth = v));
  }

  get maxWidth() {
    return this._el.maxWidth;
  }
  

  
  @Output()
  muteclickEvent = new EventEmitter<unknown>();
  
  @Output()
  ackclickEvent = new EventEmitter<unknown>();
  
  @Output()
  alertclickEvent = new EventEmitter<unknown>();
  
  @Output()
  messageclickEvent = new EventEmitter<unknown>();
  
}

