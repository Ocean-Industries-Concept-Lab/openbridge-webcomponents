import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRadarLongPulseIec as ObiRadarLongPulseIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-long-pulse-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-long-pulse-iec.js';

@Component({
  selector: 'obi-radar-long-pulse-iec',
  template: '<ng-content></ng-content>',
})
export class ObiRadarLongPulseIec {
  private _el: ObiRadarLongPulseIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRadarLongPulseIecElement>,
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

