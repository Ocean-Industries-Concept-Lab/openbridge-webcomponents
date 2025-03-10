import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryVerticalChargingLow as ObiBatteryVerticalChargingLowElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-charging-low.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-charging-low.js';

@Component({
  selector: 'obi-battery-vertical-charging-low',
  template: '<ng-content></ng-content>',
})
export class ObiBatteryVerticalChargingLow {
  private _el: ObiBatteryVerticalChargingLowElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryVerticalChargingLowElement>,
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

