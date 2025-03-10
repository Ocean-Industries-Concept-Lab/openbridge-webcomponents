import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWind9 as ObiWind9Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-9.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-9.js';

@Component({
  selector: 'obi-wind-9',
  template: '<ng-content></ng-content>',
})
export class ObiWind9 {
  private _el: ObiWind9Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWind9Element>,
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

