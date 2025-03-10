import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlertheaderAggregatedLargeIec as ObiAlertheaderAggregatedLargeIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alertheader-aggregated-large-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alertheader-aggregated-large-iec.js';

@Component({
  selector: 'obi-alertheader-aggregated-large-iec',
  template: '<ng-content></ng-content>',
})
export class ObiAlertheaderAggregatedLargeIec {
  private _el: ObiAlertheaderAggregatedLargeIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlertheaderAggregatedLargeIecElement>,
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

