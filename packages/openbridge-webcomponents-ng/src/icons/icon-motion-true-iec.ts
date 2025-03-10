import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMotionTrueIec as ObiMotionTrueIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-motion-true-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-motion-true-iec.js';

@Component({
  selector: 'obi-motion-true-iec',
  template: '<ng-content></ng-content>',
})
export class ObiMotionTrueIec {
  private _el: ObiMotionTrueIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMotionTrueIecElement>,
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

