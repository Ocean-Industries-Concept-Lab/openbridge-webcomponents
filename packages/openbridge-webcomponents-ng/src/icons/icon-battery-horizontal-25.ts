import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryHorizontal25 as ObiBatteryHorizontal25Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-horizontal-25.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-horizontal-25.js';

@Component({
  selector: 'obi-battery-horizontal-25',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBatteryHorizontal25 {
  private _el: ObiBatteryHorizontal25Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryHorizontal25Element>,
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

