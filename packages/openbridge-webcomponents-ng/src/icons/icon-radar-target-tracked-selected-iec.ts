import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRadarTargetTrackedSelectedIec as ObiRadarTargetTrackedSelectedIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-target-tracked-selected-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-target-tracked-selected-iec.js';

@Component({
  selector: 'obi-radar-target-tracked-selected-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRadarTargetTrackedSelectedIec {
  private _el: ObiRadarTargetTrackedSelectedIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRadarTargetTrackedSelectedIecElement>,
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

