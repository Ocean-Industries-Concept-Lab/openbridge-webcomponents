import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryVerticalFull as ObiBatteryVerticalFullElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-full.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-full.js';

@Component({
  selector: 'obi-battery-vertical-full',
  template: '<ng-content></ng-content>',
})
export class ObiBatteryVerticalFull {
  private _el: ObiBatteryVerticalFullElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryVerticalFullElement>,
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

