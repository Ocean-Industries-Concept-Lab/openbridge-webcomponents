import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryHorizontalNotification as ObiBatteryHorizontalNotificationElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-horizontal-notification.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-horizontal-notification.js';

@Component({
  selector: 'obi-battery-horizontal-notification',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBatteryHorizontalNotification {
  private _el: ObiBatteryHorizontalNotificationElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryHorizontalNotificationElement>,
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

