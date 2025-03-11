import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSimplifiedBuoyCardinalEast as ObiSimplifiedBuoyCardinalEastElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-buoy-cardinal-east.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-buoy-cardinal-east.js';

@Component({
  selector: 'obi-simplified-buoy-cardinal-east',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSimplifiedBuoyCardinalEast {
  private _el: ObiSimplifiedBuoyCardinalEastElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSimplifiedBuoyCardinalEastElement>,
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

