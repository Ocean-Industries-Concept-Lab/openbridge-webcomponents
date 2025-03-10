import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlertheaderAggregatedIec as ObiAlertheaderAggregatedIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alertheader-aggregated-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alertheader-aggregated-iec.js';

@Component({
  selector: 'obi-alertheader-aggregated-iec',
  template: '<ng-content></ng-content>',
})
export class ObiAlertheaderAggregatedIec {
  private _el: ObiAlertheaderAggregatedIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlertheaderAggregatedIecElement>,
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

