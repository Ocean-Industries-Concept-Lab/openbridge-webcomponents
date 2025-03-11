import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiStabilisationIndicatorGroundIec as ObiStabilisationIndicatorGroundIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-stabilisation-indicator-ground-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-stabilisation-indicator-ground-iec.js';

@Component({
  selector: 'obi-stabilisation-indicator-ground-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiStabilisationIndicatorGroundIec {
  private _el: ObiStabilisationIndicatorGroundIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiStabilisationIndicatorGroundIecElement>,
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

