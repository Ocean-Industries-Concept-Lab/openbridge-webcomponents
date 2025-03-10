import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTrendDown as ObiTrendDownElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-trend-down.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-trend-down.js';

@Component({
  selector: 'obi-trend-down',
  template: '<ng-content></ng-content>',
})
export class ObiTrendDown {
  private _el: ObiTrendDownElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTrendDownElement>,
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

