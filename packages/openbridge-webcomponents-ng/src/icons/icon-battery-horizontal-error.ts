import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryHorizontalError as ObiBatteryHorizontalErrorElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-horizontal-error.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-horizontal-error.js';

@Component({
  selector: 'obi-battery-horizontal-error',
  template: '<ng-content></ng-content>',
})
export class ObiBatteryHorizontalError {
  private _el: ObiBatteryHorizontalErrorElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryHorizontalErrorElement>,
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

