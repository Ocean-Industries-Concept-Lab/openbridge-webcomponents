import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSimplifiedBeaconMajorSafeWater as ObiSimplifiedBeaconMajorSafeWaterElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-beacon-major-safe-water.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-beacon-major-safe-water.js';

@Component({
  selector: 'obi-simplified-beacon-major-safe-water',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSimplifiedBeaconMajorSafeWater {
  private _el: ObiSimplifiedBeaconMajorSafeWaterElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSimplifiedBeaconMajorSafeWaterElement>,
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

