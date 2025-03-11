import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWind2 as ObiWind2Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-2.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-2.js';

@Component({
  selector: 'obi-wind-2',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWind2 {
  private _el: ObiWind2Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWind2Element>,
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

