import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSimplifiedBeaconMinorSafeWater as ObiSimplifiedBeaconMinorSafeWaterElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-beacon-minor-safe-water.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-beacon-minor-safe-water.js';

@Component({
  selector: 'obi-simplified-beacon-minor-safe-water',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSimplifiedBeaconMinorSafeWater {
  private _el: ObiSimplifiedBeaconMinorSafeWaterElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSimplifiedBeaconMinorSafeWaterElement>,
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

