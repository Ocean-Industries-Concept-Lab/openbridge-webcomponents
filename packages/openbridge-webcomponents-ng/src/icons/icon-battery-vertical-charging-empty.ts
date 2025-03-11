import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryVerticalChargingEmpty as ObiBatteryVerticalChargingEmptyElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-charging-empty.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-charging-empty.js';

@Component({
  selector: 'obi-battery-vertical-charging-empty',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBatteryVerticalChargingEmpty {
  private _el: ObiBatteryVerticalChargingEmptyElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryVerticalChargingEmptyElement>,
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

