import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAisTargetActivatedNohdgcogSelectedIec as ObiAisTargetActivatedNohdgcogSelectedIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-target-activated-nohdgcog-selected-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-target-activated-nohdgcog-selected-iec.js';

@Component({
  selector: 'obi-ais-target-activated-nohdgcog-selected-iec',
  template: '<ng-content></ng-content>',
})
export class ObiAisTargetActivatedNohdgcogSelectedIec {
  private _el: ObiAisTargetActivatedNohdgcogSelectedIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAisTargetActivatedNohdgcogSelectedIecElement>,
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

