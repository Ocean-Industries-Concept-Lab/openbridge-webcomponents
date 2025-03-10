import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRadarTargetAcquisitionStateIec as ObiRadarTargetAcquisitionStateIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-target-acquisition-state-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-target-acquisition-state-iec.js';

@Component({
  selector: 'obi-radar-target-acquisition-state-iec',
  template: '<ng-content></ng-content>',
})
export class ObiRadarTargetAcquisitionStateIec {
  private _el: ObiRadarTargetAcquisitionStateIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRadarTargetAcquisitionStateIecElement>,
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

