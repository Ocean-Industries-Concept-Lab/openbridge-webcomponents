import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRadarTargetAcquisitionStateAutoIec as ObiRadarTargetAcquisitionStateAutoIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-target-acquisition-state-auto-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-target-acquisition-state-auto-iec.js';

@Component({
  selector: 'obi-radar-target-acquisition-state-auto-iec',
  template: '<ng-content></ng-content>',
})
export class ObiRadarTargetAcquisitionStateAutoIec {
  private _el: ObiRadarTargetAcquisitionStateAutoIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRadarTargetAcquisitionStateAutoIecElement>,
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

