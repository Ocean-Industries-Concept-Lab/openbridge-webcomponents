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
import type {ObcAlertButton as ObcAlertButtonElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-button/alert-button.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-button/alert-button.js';

@Component({
  selector: 'obc-alert-button',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcAlertButton {
  private _el: ObcAlertButtonElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcAlertButtonElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
    this._el.addEventListener('click', (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.clickEvent.emit(e);
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
  set flatWhenIdle(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.flatWhenIdle = v));
  }

  get flatWhenIdle() {
    return this._el.flatWhenIdle;
  }
  
  @Input()
  set standalone(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.standalone = v));
  }

  get standalone() {
    return this._el.standalone;
  }
  
  @Input()
  set counter(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.counter = v));
  }

  get counter() {
    return this._el.counter;
  }
  

  
  @Output()
  clickEvent = new EventEmitter<unknown>();
  
}

