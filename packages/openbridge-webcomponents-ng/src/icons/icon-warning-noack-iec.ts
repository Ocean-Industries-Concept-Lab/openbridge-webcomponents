import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWarningNoackIec as ObiWarningNoackIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-warning-noack-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-warning-noack-iec.js';

@Component({
  selector: 'obi-warning-noack-iec',
  template: '<ng-content></ng-content>',
})
export class ObiWarningNoackIec {
  private _el: ObiWarningNoackIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWarningNoackIecElement>,
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

