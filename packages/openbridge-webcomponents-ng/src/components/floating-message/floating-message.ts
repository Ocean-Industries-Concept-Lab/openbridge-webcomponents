import {
  Component,
  ElementRef,
  NgZone,
  Input,
  EventEmitter,
  Output

} from '@angular/core';
import {ObcFloatingMessageType, ObcFloatingMessageDirection, ObcFloatingMessageLineType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/floating-message/floating-message.js';
export type {ObcFloatingMessageType, ObcFloatingMessageDirection, ObcFloatingMessageLineType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/floating-message/floating-message.js';
import type {ObcFloatingMessage as ObcFloatingMessageElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/floating-message/floating-message.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/floating-message/floating-message.js';

@Component({
  selector: 'obc-floating-message',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcFloatingMessage {
  private _el: ObcFloatingMessageElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcFloatingMessageElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
    this._el.addEventListener('action-click', (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.actionClickEvent.emit(e as CustomEvent<void>);
    });
    
    this._el.addEventListener('action2-click', (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.action2ClickEvent.emit(e as CustomEvent<void>);
    });
    
    this._el.addEventListener('dismiss-click', (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.dismissClickEvent.emit(e as CustomEvent<void>);
    });
    
  }

  
  @Input()
  set type(v: ObcFloatingMessageType) {
    this._ngZone.runOutsideAngular(() => (this._el.type = v));
  }

  get type() {
    return this._el.type;
  }
  
  @Input()
  set direction(v: ObcFloatingMessageDirection) {
    this._ngZone.runOutsideAngular(() => (this._el.direction = v));
  }

  get direction() {
    return this._el.direction;
  }
  
  @Input()
  set hasTimestamp(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.hasTimestamp = v));
  }

  get hasTimestamp() {
    return this._el.hasTimestamp;
  }
  
  @Input()
  set hasDay(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.hasDay = v));
  }

  get hasDay() {
    return this._el.hasDay;
  }
  
  @Input()
  set action(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.action = v));
  }

  get action() {
    return this._el.action;
  }
  
  @Input()
  set action2(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.action2 = v));
  }

  get action2() {
    return this._el.action2;
  }
  
  @Input()
  set lineType(v: ObcFloatingMessageLineType) {
    this._ngZone.runOutsideAngular(() => (this._el.lineType = v));
  }

  get lineType() {
    return this._el.lineType;
  }
  

  
  @Output()
  actionClickEvent = new EventEmitter<CustomEvent<void>>();
  
  @Output()
  action2ClickEvent = new EventEmitter<CustomEvent<void>>();
  
  @Output()
  dismissClickEvent = new EventEmitter<CustomEvent<void>>();
  
}

