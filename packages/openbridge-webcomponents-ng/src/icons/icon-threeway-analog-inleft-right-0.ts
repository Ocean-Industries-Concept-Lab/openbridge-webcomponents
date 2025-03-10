import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayAnalogInleftRight0 as ObiThreewayAnalogInleftRight0Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-analog-inleft-right-0.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-analog-inleft-right-0.js';

@Component({
  selector: 'obi-threeway-analog-inleft-right-0',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayAnalogInleftRight0 {
  private _el: ObiThreewayAnalogInleftRight0Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayAnalogInleftRight0Element>,
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

