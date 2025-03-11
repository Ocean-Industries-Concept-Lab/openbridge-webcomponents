import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMotionTmResetProposal1 as ObiMotionTmResetProposal1Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-motion-tm-reset-proposal-1.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-motion-tm-reset-proposal-1.js';

@Component({
  selector: 'obi-motion-tm-reset-proposal-1',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMotionTmResetProposal1 {
  private _el: ObiMotionTmResetProposal1Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMotionTmResetProposal1Element>,
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

