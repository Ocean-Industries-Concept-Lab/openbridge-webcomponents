import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlertheaderGroupLargeIec as ObiAlertheaderGroupLargeIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alertheader-group-large-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alertheader-group-large-iec.js';

@Component({
  selector: 'obi-alertheader-group-large-iec',
  template: '<ng-content></ng-content>',
})
export class ObiAlertheaderGroupLargeIec {
  private _el: ObiAlertheaderGroupLargeIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlertheaderGroupLargeIecElement>,
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

