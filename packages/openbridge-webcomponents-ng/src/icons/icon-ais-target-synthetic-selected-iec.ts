import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAisTargetSyntheticSelectedIec as ObiAisTargetSyntheticSelectedIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-target-synthetic-selected-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-target-synthetic-selected-iec.js';

@Component({
  selector: 'obi-ais-target-synthetic-selected-iec',
  template: '<ng-content></ng-content>',
})
export class ObiAisTargetSyntheticSelectedIec {
  private _el: ObiAisTargetSyntheticSelectedIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAisTargetSyntheticSelectedIecElement>,
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

