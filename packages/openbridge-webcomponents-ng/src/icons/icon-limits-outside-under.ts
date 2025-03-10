import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLimitsOutsideUnder as ObiLimitsOutsideUnderElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-limits-outside-under.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-limits-outside-under.js';

@Component({
  selector: 'obi-limits-outside-under',
  template: '<ng-content></ng-content>',
})
export class ObiLimitsOutsideUnder {
  private _el: ObiLimitsOutsideUnderElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLimitsOutsideUnderElement>,
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

