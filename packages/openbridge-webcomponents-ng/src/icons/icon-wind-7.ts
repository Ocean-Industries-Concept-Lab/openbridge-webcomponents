import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWind7 as ObiWind7Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-7.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-7.js';

@Component({
  selector: 'obi-wind-7',
  template: '<ng-content></ng-content>',
})
export class ObiWind7 {
  private _el: ObiWind7Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWind7Element>,
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

