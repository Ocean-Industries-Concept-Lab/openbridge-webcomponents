import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAssociatedTargetAisIec as ObiAssociatedTargetAisIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-associated-target-ais-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-associated-target-ais-iec.js';

@Component({
  selector: 'obi-associated-target-ais-iec',
  template: '<ng-content></ng-content>',
})
export class ObiAssociatedTargetAisIec {
  private _el: ObiAssociatedTargetAisIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAssociatedTargetAisIecElement>,
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

