import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSimplifiedBuoyCardinalWest as ObiSimplifiedBuoyCardinalWestElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-buoy-cardinal-west.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-buoy-cardinal-west.js';

@Component({
  selector: 'obi-simplified-buoy-cardinal-west',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSimplifiedBuoyCardinalWest {
  private _el: ObiSimplifiedBuoyCardinalWestElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSimplifiedBuoyCardinalWestElement>,
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

