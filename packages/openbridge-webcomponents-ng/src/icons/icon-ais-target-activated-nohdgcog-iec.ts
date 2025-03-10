import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAisTargetActivatedNohdgcogIec as ObiAisTargetActivatedNohdgcogIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-target-activated-nohdgcog-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-target-activated-nohdgcog-iec.js';

@Component({
  selector: 'obi-ais-target-activated-nohdgcog-iec',
  template: '<ng-content></ng-content>',
})
export class ObiAisTargetActivatedNohdgcogIec {
  private _el: ObiAisTargetActivatedNohdgcogIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAisTargetActivatedNohdgcogIecElement>,
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

