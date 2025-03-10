import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTrend as ObiTrendElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-trend.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-trend.js';

@Component({
  selector: 'obi-trend',
  template: '<ng-content></ng-content>',
})
export class ObiTrend {
  private _el: ObiTrendElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTrendElement>,
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

