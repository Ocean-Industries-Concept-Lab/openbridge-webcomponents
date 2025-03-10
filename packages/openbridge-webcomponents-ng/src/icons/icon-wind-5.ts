import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWind5 as ObiWind5Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-5.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-5.js';

@Component({
  selector: 'obi-wind-5',
  template: '<ng-content></ng-content>',
})
export class ObiWind5 {
  private _el: ObiWind5Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWind5Element>,
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

