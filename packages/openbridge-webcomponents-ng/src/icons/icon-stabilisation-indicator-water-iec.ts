import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiStabilisationIndicatorWaterIec as ObiStabilisationIndicatorWaterIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-stabilisation-indicator-water-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-stabilisation-indicator-water-iec.js';

@Component({
  selector: 'obi-stabilisation-indicator-water-iec',
  template: '<ng-content></ng-content>',
})
export class ObiStabilisationIndicatorWaterIec {
  private _el: ObiStabilisationIndicatorWaterIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiStabilisationIndicatorWaterIecElement>,
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

