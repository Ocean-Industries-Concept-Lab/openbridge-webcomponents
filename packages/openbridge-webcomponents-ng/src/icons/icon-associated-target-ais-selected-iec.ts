import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAssociatedTargetAisSelectedIec as ObiAssociatedTargetAisSelectedIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-associated-target-ais-selected-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-associated-target-ais-selected-iec.js';

@Component({
  selector: 'obi-associated-target-ais-selected-iec',
  template: '<ng-content></ng-content>',
})
export class ObiAssociatedTargetAisSelectedIec {
  private _el: ObiAssociatedTargetAisSelectedIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAssociatedTargetAisSelectedIecElement>,
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

