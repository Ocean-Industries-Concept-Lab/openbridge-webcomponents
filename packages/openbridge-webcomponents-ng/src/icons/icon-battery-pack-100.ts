import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryPack100 as ObiBatteryPack100Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-pack-100.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-pack-100.js';

@Component({
  selector: 'obi-battery-pack-100',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBatteryPack100 {
  private _el: ObiBatteryPack100Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryPack100Element>,
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

