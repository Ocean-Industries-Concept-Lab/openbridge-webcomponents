import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryVerticalNotification as ObiBatteryVerticalNotificationElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-notification.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-notification.js';

@Component({
  selector: 'obi-battery-vertical-notification',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBatteryVerticalNotification {
  private _el: ObiBatteryVerticalNotificationElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryVerticalNotificationElement>,
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

