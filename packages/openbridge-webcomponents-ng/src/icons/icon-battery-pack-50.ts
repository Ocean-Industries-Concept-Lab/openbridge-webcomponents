import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryPack50 as ObiBatteryPack50Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-pack-50.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-pack-50.js';

@Component({
  selector: 'obi-battery-pack-50',
  template: '<ng-content></ng-content>',
})
export class ObiBatteryPack50 {
  private _el: ObiBatteryPack50Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryPack50Element>,
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

