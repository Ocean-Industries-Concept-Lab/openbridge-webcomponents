import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryVerticalEmpty as ObiBatteryVerticalEmptyElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-empty.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-empty.js';

@Component({
  selector: 'obi-battery-vertical-empty',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBatteryVerticalEmpty {
  private _el: ObiBatteryVerticalEmptyElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryVerticalEmptyElement>,
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

