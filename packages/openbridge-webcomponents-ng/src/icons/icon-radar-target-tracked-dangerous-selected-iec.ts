import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRadarTargetTrackedDangerousSelectedIec as ObiRadarTargetTrackedDangerousSelectedIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-target-tracked-dangerous-selected-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-target-tracked-dangerous-selected-iec.js';

@Component({
  selector: 'obi-radar-target-tracked-dangerous-selected-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRadarTargetTrackedDangerousSelectedIec {
  private _el: ObiRadarTargetTrackedDangerousSelectedIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRadarTargetTrackedDangerousSelectedIecElement>,
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

