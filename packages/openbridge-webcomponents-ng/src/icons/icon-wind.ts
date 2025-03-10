import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWind as ObiWindElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind.js';

@Component({
  selector: 'obi-wind',
  template: '<ng-content></ng-content>',
})
export class ObiWind {
  private _el: ObiWindElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWindElement>,
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

