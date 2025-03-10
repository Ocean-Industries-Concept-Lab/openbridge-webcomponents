import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWind3 as ObiWind3Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-3.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-3.js';

@Component({
  selector: 'obi-wind-3',
  template: '<ng-content></ng-content>',
})
export class ObiWind3 {
  private _el: ObiWind3Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWind3Element>,
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

