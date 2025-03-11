import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBatteryVerticalCharging75 as ObiBatteryVerticalCharging75Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-charging-75.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-battery-vertical-charging-75.js';

@Component({
  selector: 'obi-battery-vertical-charging-75',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBatteryVerticalCharging75 {
  private _el: ObiBatteryVerticalCharging75Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBatteryVerticalCharging75Element>,
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

