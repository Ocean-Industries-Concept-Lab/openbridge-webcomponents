import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMotionTmResetProposal2 as ObiMotionTmResetProposal2Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-motion-tm-reset-proposal-2.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-motion-tm-reset-proposal-2.js';

@Component({
  selector: 'obi-motion-tm-reset-proposal-2',
  template: '<ng-content></ng-content>',
})
export class ObiMotionTmResetProposal2 {
  private _el: ObiMotionTmResetProposal2Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMotionTmResetProposal2Element>,
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

