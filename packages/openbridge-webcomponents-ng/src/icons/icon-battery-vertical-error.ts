import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryVerticalError as ObiBatteryVerticalErrorElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-error.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-error.js';

@Component({
  selector: 'obi-battery-vertical-error',
  template: '<ng-content></ng-content>',
})
export class ObiBatteryVerticalError {
  private _el: ObiBatteryVerticalErrorElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryVerticalErrorElement>,
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

