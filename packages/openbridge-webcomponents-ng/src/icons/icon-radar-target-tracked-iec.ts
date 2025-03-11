import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRadarTargetTrackedIec as ObiRadarTargetTrackedIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-target-tracked-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-target-tracked-iec.js';

@Component({
  selector: 'obi-radar-target-tracked-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRadarTargetTrackedIec {
  private _el: ObiRadarTargetTrackedIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRadarTargetTrackedIecElement>,
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

