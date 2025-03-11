import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWind4 as ObiWind4Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-4.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-4.js';

@Component({
  selector: 'obi-wind-4',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWind4 {
  private _el: ObiWind4Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWind4Element>,
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

