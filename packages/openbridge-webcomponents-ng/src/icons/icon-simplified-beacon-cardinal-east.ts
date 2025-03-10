import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSimplifiedBeaconCardinalEast as ObiSimplifiedBeaconCardinalEastElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-beacon-cardinal-east.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-beacon-cardinal-east.js';

@Component({
  selector: 'obi-simplified-beacon-cardinal-east',
  template: '<ng-content></ng-content>',
})
export class ObiSimplifiedBeaconCardinalEast {
  private _el: ObiSimplifiedBeaconCardinalEastElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSimplifiedBeaconCardinalEastElement>,
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

