import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAisTargetDangerousSelectedIec as ObiAisTargetDangerousSelectedIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-target-dangerous-selected-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-target-dangerous-selected-iec.js';

@Component({
  selector: 'obi-ais-target-dangerous-selected-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAisTargetDangerousSelectedIec {
  private _el: ObiAisTargetDangerousSelectedIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAisTargetDangerousSelectedIecElement>,
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

