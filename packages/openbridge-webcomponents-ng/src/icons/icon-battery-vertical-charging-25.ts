import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryVerticalCharging25 as ObiBatteryVerticalCharging25Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-charging-25.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-charging-25.js';

@Component({
  selector: 'obi-battery-vertical-charging-25',
  template: '<ng-content></ng-content>',
})
export class ObiBatteryVerticalCharging25 {
  private _el: ObiBatteryVerticalCharging25Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryVerticalCharging25Element>,
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

