import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTwowayAnalogClosed as ObiTwowayAnalogClosedElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-analog-closed.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-analog-closed.js';

@Component({
  selector: 'obi-twoway-analog-closed',
  template: '<ng-content></ng-content>',
})
export class ObiTwowayAnalogClosed {
  private _el: ObiTwowayAnalogClosedElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTwowayAnalogClosedElement>,
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

