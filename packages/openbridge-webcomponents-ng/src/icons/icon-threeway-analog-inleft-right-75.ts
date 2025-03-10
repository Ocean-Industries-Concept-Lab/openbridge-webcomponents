import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayAnalogInleftRight75 as ObiThreewayAnalogInleftRight75Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-analog-inleft-right-75.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-analog-inleft-right-75.js';

@Component({
  selector: 'obi-threeway-analog-inleft-right-75',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayAnalogInleftRight75 {
  private _el: ObiThreewayAnalogInleftRight75Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayAnalogInleftRight75Element>,
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

