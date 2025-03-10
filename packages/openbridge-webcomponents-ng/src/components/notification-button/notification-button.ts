import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObcNotificationButton as ObcNotificationButtonElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/notification-button/notification-button.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/notification-button/notification-button.js';

@Component({
  selector: 'obc-notification-button',
  template: '<ng-content></ng-content>',
})
export class ObcNotificationButton {
  private _el: ObcNotificationButtonElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcNotificationButtonElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set openRight(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.openRight = v));
  }

  get openRight() {
    return this._el.openRight;
  }
  
  @Input()
  set openLeft(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.openLeft = v));
  }

  get openLeft() {
    return this._el.openLeft;
  }
  
  @Input()
  set cornerLeft(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.cornerLeft = v));
  }

  get cornerLeft() {
    return this._el.cornerLeft;
  }
  
  @Input()
  set cornerRight(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.cornerRight = v));
  }

  get cornerRight() {
    return this._el.cornerRight;
  }
  
  @Input()
  set icon(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.icon = v));
  }

  get icon() {
    return this._el.icon;
  }
  
  @Input()
  set disabled(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.disabled = v));
  }

  get disabled() {
    return this._el.disabled;
  }
  
  @Input()
  set indent(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.indent = v));
  }

  get indent() {
    return this._el.indent;
  }
  

  
}

