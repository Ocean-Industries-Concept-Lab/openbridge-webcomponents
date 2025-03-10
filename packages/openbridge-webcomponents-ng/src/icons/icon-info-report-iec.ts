import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiInfoReportIec as ObiInfoReportIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-info-report-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-info-report-iec.js';

@Component({
  selector: 'obi-info-report-iec',
  template: '<ng-content></ng-content>',
})
export class ObiInfoReportIec {
  private _el: ObiInfoReportIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiInfoReportIecElement>,
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

