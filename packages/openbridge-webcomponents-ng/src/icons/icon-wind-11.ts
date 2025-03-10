import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWind11 as ObiWind11Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-11.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-11.js';

@Component({
  selector: 'obi-wind-11',
  template: '<ng-content></ng-content>',
})
export class ObiWind11 {
  private _el: ObiWind11Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWind11Element>,
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

