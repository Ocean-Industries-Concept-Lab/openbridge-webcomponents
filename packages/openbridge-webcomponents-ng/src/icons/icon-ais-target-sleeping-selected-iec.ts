import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAisTargetSleepingSelectedIec as ObiAisTargetSleepingSelectedIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-target-sleeping-selected-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-target-sleeping-selected-iec.js';

@Component({
  selector: 'obi-ais-target-sleeping-selected-iec',
  template: '<ng-content></ng-content>',
})
export class ObiAisTargetSleepingSelectedIec {
  private _el: ObiAisTargetSleepingSelectedIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAisTargetSleepingSelectedIecElement>,
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

