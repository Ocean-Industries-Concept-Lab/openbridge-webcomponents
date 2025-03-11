import {
  Component,
  ElementRef,
  NgZone,
  Input,
  EventEmitter,
  Output

} from '@angular/core';


import type {ObcAlertMenu as ObcAlertMenuElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-menu/alert-menu.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-menu/alert-menu.js';

@Component({
  selector: 'obc-alert-menu',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcAlertMenu {
  private _el: ObcAlertMenuElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcAlertMenuElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
    this._el.addEventListener('ack-all-click', (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.ackAllClickEvent.emit(e);
    });
    
    this._el.addEventListener('alert-list-click', (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.alertListClickEvent.emit(e);
    });
    
  }

  
  @Input()
  set empty(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.empty = v));
  }

  get empty() {
    return this._el.empty;
  }
  

  
  @Output()
  ackAllClickEvent = new EventEmitter<unknown>();
  
  @Output()
  alertListClickEvent = new EventEmitter<unknown>();
  
}

