import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryVertical75 as ObiBatteryVertical75Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-75.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-75.js';

@Component({
  selector: 'obi-battery-vertical-75',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBatteryVertical75 {
  private _el: ObiBatteryVertical75Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryVertical75Element>,
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

