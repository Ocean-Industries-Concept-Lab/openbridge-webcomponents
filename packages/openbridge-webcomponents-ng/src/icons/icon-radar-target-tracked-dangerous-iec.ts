import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRadarTargetTrackedDangerousIec as ObiRadarTargetTrackedDangerousIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-target-tracked-dangerous-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-target-tracked-dangerous-iec.js';

@Component({
  selector: 'obi-radar-target-tracked-dangerous-iec',
  template: '<ng-content></ng-content>',
})
export class ObiRadarTargetTrackedDangerousIec {
  private _el: ObiRadarTargetTrackedDangerousIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRadarTargetTrackedDangerousIecElement>,
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

