import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWaypointNextIec as ObiWaypointNextIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-waypoint-next-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-waypoint-next-iec.js';

@Component({
  selector: 'obi-waypoint-next-iec',
  template: '<ng-content></ng-content>',
})
export class ObiWaypointNextIec {
  private _el: ObiWaypointNextIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWaypointNextIecElement>,
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

