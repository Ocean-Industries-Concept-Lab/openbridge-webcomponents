import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayAnalogClosed as ObiThreewayAnalogClosedElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-analog-closed.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-analog-closed.js';

@Component({
  selector: 'obi-threeway-analog-closed',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayAnalogClosed {
  private _el: ObiThreewayAnalogClosedElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayAnalogClosedElement>,
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

