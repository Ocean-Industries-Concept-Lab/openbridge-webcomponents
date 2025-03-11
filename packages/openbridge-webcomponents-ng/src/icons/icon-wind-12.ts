import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWind12 as ObiWind12Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-12.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-12.js';

@Component({
  selector: 'obi-wind-12',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWind12 {
  private _el: ObiWind12Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWind12Element>,
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

