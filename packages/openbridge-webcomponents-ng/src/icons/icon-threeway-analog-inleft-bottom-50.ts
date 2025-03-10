import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayAnalogInleftBottom50 as ObiThreewayAnalogInleftBottom50Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-analog-inleft-bottom-50.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-analog-inleft-bottom-50.js';

@Component({
  selector: 'obi-threeway-analog-inleft-bottom-50',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayAnalogInleftBottom50 {
  private _el: ObiThreewayAnalogInleftBottom50Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayAnalogInleftBottom50Element>,
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

