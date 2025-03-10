import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTwowayAnalog10 as ObiTwowayAnalog10Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-analog-10.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-analog-10.js';

@Component({
  selector: 'obi-twoway-analog-10',
  template: '<ng-content></ng-content>',
})
export class ObiTwowayAnalog10 {
  private _el: ObiTwowayAnalog10Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTwowayAnalog10Element>,
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

