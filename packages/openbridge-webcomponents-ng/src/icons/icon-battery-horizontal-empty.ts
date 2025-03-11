import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryHorizontalEmpty as ObiBatteryHorizontalEmptyElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-horizontal-empty.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-horizontal-empty.js';

@Component({
  selector: 'obi-battery-horizontal-empty',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBatteryHorizontalEmpty {
  private _el: ObiBatteryHorizontalEmptyElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryHorizontalEmptyElement>,
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

