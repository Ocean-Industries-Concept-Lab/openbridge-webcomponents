import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryVertical25 as ObiBatteryVertical25Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-25.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-25.js';

@Component({
  selector: 'obi-battery-vertical-25',
  template: '<ng-content></ng-content>',
})
export class ObiBatteryVertical25 {
  private _el: ObiBatteryVertical25Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryVertical25Element>,
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

