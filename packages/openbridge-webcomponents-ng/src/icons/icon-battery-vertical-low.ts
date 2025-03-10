import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryVerticalLow as ObiBatteryVerticalLowElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-low.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-low.js';

@Component({
  selector: 'obi-battery-vertical-low',
  template: '<ng-content></ng-content>',
})
export class ObiBatteryVerticalLow {
  private _el: ObiBatteryVerticalLowElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryVerticalLowElement>,
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

