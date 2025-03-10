import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryPack70 as ObiBatteryPack70Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-pack-70.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-pack-70.js';

@Component({
  selector: 'obi-battery-pack-70',
  template: '<ng-content></ng-content>',
})
export class ObiBatteryPack70 {
  private _el: ObiBatteryPack70Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryPack70Element>,
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

