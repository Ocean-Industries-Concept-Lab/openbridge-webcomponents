import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryVerticalCharging100 as ObiBatteryVerticalCharging100Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-charging-100.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-charging-100.js';

@Component({
  selector: 'obi-battery-vertical-charging-100',
  template: '<ng-content></ng-content>',
})
export class ObiBatteryVerticalCharging100 {
  private _el: ObiBatteryVerticalCharging100Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryVerticalCharging100Element>,
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

