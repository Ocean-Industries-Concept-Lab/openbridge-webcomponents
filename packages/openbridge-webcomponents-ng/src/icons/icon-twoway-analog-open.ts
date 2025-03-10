import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTwowayAnalogOpen as ObiTwowayAnalogOpenElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-analog-open.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-analog-open.js';

@Component({
  selector: 'obi-twoway-analog-open',
  template: '<ng-content></ng-content>',
})
export class ObiTwowayAnalogOpen {
  private _el: ObiTwowayAnalogOpenElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTwowayAnalogOpenElement>,
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

