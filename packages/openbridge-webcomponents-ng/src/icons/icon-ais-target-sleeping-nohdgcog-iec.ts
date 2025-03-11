import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAisTargetSleepingNohdgcogIec as ObiAisTargetSleepingNohdgcogIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-target-sleeping-nohdgcog-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-target-sleeping-nohdgcog-iec.js';

@Component({
  selector: 'obi-ais-target-sleeping-nohdgcog-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAisTargetSleepingNohdgcogIec {
  private _el: ObiAisTargetSleepingNohdgcogIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAisTargetSleepingNohdgcogIecElement>,
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

