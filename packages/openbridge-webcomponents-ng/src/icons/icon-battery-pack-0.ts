import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryPack0 as ObiBatteryPack0Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-pack-0.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-pack-0.js';

@Component({
  selector: 'obi-battery-pack-0',
  template: '<ng-content></ng-content>',
})
export class ObiBatteryPack0 {
  private _el: ObiBatteryPack0Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryPack0Element>,
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

