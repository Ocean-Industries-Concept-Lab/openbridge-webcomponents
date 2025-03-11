import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWind1 as ObiWind1Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-1.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wind-1.js';

@Component({
  selector: 'obi-wind-1',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWind1 {
  private _el: ObiWind1Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWind1Element>,
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

