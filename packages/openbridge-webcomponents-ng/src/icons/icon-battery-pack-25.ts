import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryPack25 as ObiBatteryPack25Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-pack-25.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-pack-25.js';

@Component({
  selector: 'obi-battery-pack-25',
  template: '<ng-content></ng-content>',
})
export class ObiBatteryPack25 {
  private _el: ObiBatteryPack25Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryPack25Element>,
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

