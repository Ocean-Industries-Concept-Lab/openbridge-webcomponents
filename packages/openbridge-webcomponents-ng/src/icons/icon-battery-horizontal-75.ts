import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryHorizontal75 as ObiBatteryHorizontal75Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-horizontal-75.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-horizontal-75.js';

@Component({
  selector: 'obi-battery-horizontal-75',
  template: '<ng-content></ng-content>',
})
export class ObiBatteryHorizontal75 {
  private _el: ObiBatteryHorizontal75Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryHorizontal75Element>,
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

