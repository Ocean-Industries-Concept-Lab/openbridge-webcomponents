import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAisTargetSyntheticNocogIec as ObiAisTargetSyntheticNocogIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-target-synthetic-nocog-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-target-synthetic-nocog-iec.js';

@Component({
  selector: 'obi-ais-target-synthetic-nocog-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAisTargetSyntheticNocogIec {
  private _el: ObiAisTargetSyntheticNocogIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAisTargetSyntheticNocogIecElement>,
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

