import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWaypointAddIec as ObiWaypointAddIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-waypoint-add-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-waypoint-add-iec.js';

@Component({
  selector: 'obi-waypoint-add-iec',
  template: '<ng-content></ng-content>',
})
export class ObiWaypointAddIec {
  private _el: ObiWaypointAddIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWaypointAddIecElement>,
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

