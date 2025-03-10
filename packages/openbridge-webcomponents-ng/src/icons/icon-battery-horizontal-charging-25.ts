import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryHorizontalCharging25 as ObiBatteryHorizontalCharging25Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-horizontal-charging-25.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-horizontal-charging-25.js';

@Component({
  selector: 'obi-battery-horizontal-charging-25',
  template: '<ng-content></ng-content>',
})
export class ObiBatteryHorizontalCharging25 {
  private _el: ObiBatteryHorizontalCharging25Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryHorizontalCharging25Element>,
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

