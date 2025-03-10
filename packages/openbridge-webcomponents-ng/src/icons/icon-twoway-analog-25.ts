import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTwowayAnalog25 as ObiTwowayAnalog25Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-analog-25.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-analog-25.js';

@Component({
  selector: 'obi-twoway-analog-25',
  template: '<ng-content></ng-content>',
})
export class ObiTwowayAnalog25 {
  private _el: ObiTwowayAnalog25Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTwowayAnalog25Element>,
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

