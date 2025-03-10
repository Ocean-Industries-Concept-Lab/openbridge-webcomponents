import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryHorizontal50 as ObiBatteryHorizontal50Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-horizontal-50.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-horizontal-50.js';

@Component({
  selector: 'obi-battery-horizontal-50',
  template: '<ng-content></ng-content>',
})
export class ObiBatteryHorizontal50 {
  private _el: ObiBatteryHorizontal50Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryHorizontal50Element>,
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

