import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRadarShortPulseIec as ObiRadarShortPulseIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-short-pulse-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-short-pulse-iec.js';

@Component({
  selector: 'obi-radar-short-pulse-iec',
  template: '<ng-content></ng-content>',
})
export class ObiRadarShortPulseIec {
  private _el: ObiRadarShortPulseIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRadarShortPulseIecElement>,
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

