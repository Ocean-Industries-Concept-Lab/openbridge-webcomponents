import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayAnalogInleftLeft0 as ObiThreewayAnalogInleftLeft0Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-analog-inleft-left-0.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-analog-inleft-left-0.js';

@Component({
  selector: 'obi-threeway-analog-inleft-left-0',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiThreewayAnalogInleftLeft0 {
  private _el: ObiThreewayAnalogInleftLeft0Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayAnalogInleftLeft0Element>,
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

