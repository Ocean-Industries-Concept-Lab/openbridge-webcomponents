import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryHorizontalLow as ObiBatteryHorizontalLowElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-horizontal-low.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-horizontal-low.js';

@Component({
  selector: 'obi-battery-horizontal-low',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBatteryHorizontalLow {
  private _el: ObiBatteryHorizontalLowElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryHorizontalLowElement>,
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

