import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryHorizontalCharging100 as ObiBatteryHorizontalCharging100Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-horizontal-charging-100.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-horizontal-charging-100.js';

@Component({
  selector: 'obi-battery-horizontal-charging-100',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBatteryHorizontalCharging100 {
  private _el: ObiBatteryHorizontalCharging100Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryHorizontalCharging100Element>,
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

