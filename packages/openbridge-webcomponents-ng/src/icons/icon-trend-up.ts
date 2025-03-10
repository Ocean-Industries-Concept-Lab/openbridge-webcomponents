import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTrendUp as ObiTrendUpElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-trend-up.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-trend-up.js';

@Component({
  selector: 'obi-trend-up',
  template: '<ng-content></ng-content>',
})
export class ObiTrendUp {
  private _el: ObiTrendUpElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTrendUpElement>,
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

