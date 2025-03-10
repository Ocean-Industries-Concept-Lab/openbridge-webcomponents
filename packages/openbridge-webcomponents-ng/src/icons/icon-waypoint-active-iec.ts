import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWaypointActiveIec as ObiWaypointActiveIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-waypoint-active-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-waypoint-active-iec.js';

@Component({
  selector: 'obi-waypoint-active-iec',
  template: '<ng-content></ng-content>',
})
export class ObiWaypointActiveIec {
  private _el: ObiWaypointActiveIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWaypointActiveIecElement>,
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

