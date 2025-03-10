import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryHorizontalCharging50 as ObiBatteryHorizontalCharging50Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-horizontal-charging-50.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-horizontal-charging-50.js';

@Component({
  selector: 'obi-battery-horizontal-charging-50',
  template: '<ng-content></ng-content>',
})
export class ObiBatteryHorizontalCharging50 {
  private _el: ObiBatteryHorizontalCharging50Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryHorizontalCharging50Element>,
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

