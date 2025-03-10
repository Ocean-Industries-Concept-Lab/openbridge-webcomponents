import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlertheaderGroupIec as ObiAlertheaderGroupIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alertheader-group-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alertheader-group-iec.js';

@Component({
  selector: 'obi-alertheader-group-iec',
  template: '<ng-content></ng-content>',
})
export class ObiAlertheaderGroupIec {
  private _el: ObiAlertheaderGroupIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlertheaderGroupIecElement>,
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

