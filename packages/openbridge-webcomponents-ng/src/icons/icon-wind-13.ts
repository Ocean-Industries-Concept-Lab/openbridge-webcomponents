import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWind13 as ObiWind13Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-13.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-13.js';

@Component({
  selector: 'obi-wind-13',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWind13 {
  private _el: ObiWind13Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWind13Element>,
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

